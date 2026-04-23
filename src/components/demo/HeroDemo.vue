<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import SkillTreeDemo from './SkillTreeDemo.vue';
import GoalRoadmap from '../goal-picker/GoalRoadmap.vue';
import { DEMO_LIBRARIES } from './demoData';
import { GOALS_BY_LIBRARY, type LandingGoal } from '../goal-picker/goalData';

const props = defineProps<{
  translations: Record<string, string>;
  locale: string;
  appBaseUrl: string;
  compact?: boolean;
}>();

// ── Auto-play config ──
const AUTO_PLAY_DELAY_MS = 1000;
const CYCLE_DURATION_MS = 4000;
const RESUME_AFTER_MS = 15000;

// ── Library state ──
const activeLibraryIndex = ref(0);
const activeLibrary = computed(() => DEMO_LIBRARIES[activeLibraryIndex.value]);
const libraryGoals = computed(() => GOALS_BY_LIBRARY.get(activeLibrary.value.id) ?? []);

// ── Goal state ──
const selectedGoal = ref<LandingGoal | null>(null);

// ── Auto-play state ──
const isAutoPlaying = ref(false);
const autoPlayProgress = ref(0);
const isVisible = ref(true);
const prefersReducedMotion = ref(false);
const lastInteractionTime = ref(0);
const containerRef = ref<HTMLElement | null>(null);

let rafId: number | null = null;
let cycleStartTime = 0;
let observer: IntersectionObserver | null = null;

// ── Library selection ──
function selectLibrary(index: number) {
  stopAutoPlay();
  activeLibraryIndex.value = index;
  // Auto-select default goal for this library
  const defaultSlug = activeLibrary.value.defaultGoalSlug;
  selectedGoal.value = libraryGoals.value.find((g) => g.slug === defaultSlug) ?? null;
}

// ── Goal selection ──
function selectGoal(goal: LandingGoal) {
  stopAutoPlay();
  selectedGoal.value = selectedGoal.value?.slug === goal.slug ? null : goal;
}

function goalName(slug: string): string {
  return props.translations[`goals.goal.${slug}`] || slug;
}

function libraryName(id: string): string {
  return props.translations[`demo.library.${id}`] || id;
}

// ── Computed ──
const highlightedNodeIds = computed(() => {
  if (props.compact) return []; // mobile: use roadmap instead
  return selectedGoal.value?.demoNodeIds ?? [];
});

const hasTreeHighlight = computed(() => highlightedNodeIds.value.length > 0);

const showRoadmapOverlay = computed(() => {
  if (!selectedGoal.value) return false;
  if (props.compact) return true; // mobile: always roadmap
  return !hasTreeHighlight.value;
});

const ctaUrl = computed(() => {
  if (!selectedGoal.value) return `${props.appBaseUrl}/login`;
  return `${props.appBaseUrl}/start?goal=${selectedGoal.value.slug}&locale=${props.locale}`;
});

const ctaText = computed(() => {
  if (!selectedGoal.value) return props.translations['goals.cta.default'] || 'Try free';
  const template = props.translations['goals.cta.selected'] || 'Start training {goal}';
  return template.replace('{goal}', goalName(selectedGoal.value.slug));
});

// ── Auto-play controls ──
function startAutoPlay() {
  isAutoPlaying.value = true;
  cycleStartTime = performance.now();
  autoPlayProgress.value = 0;
}

function advanceCarousel() {
  activeLibraryIndex.value = (activeLibraryIndex.value + 1) % DEMO_LIBRARIES.length;
  const lib = DEMO_LIBRARIES[activeLibraryIndex.value];
  const goals = GOALS_BY_LIBRARY.get(lib.id) ?? [];
  selectedGoal.value = goals.find((g) => g.slug === lib.defaultGoalSlug) ?? null;
  cycleStartTime = performance.now();
  autoPlayProgress.value = 0;
}

function stopAutoPlay() {
  isAutoPlaying.value = false;
  autoPlayProgress.value = 0;
  lastInteractionTime.value = performance.now();
}

// ── rAF loop ──
function autoPlayTick(now: number) {
  if (!isVisible.value || prefersReducedMotion.value) {
    rafId = requestAnimationFrame(autoPlayTick);
    return;
  }

  // Resume after inactivity
  if (!isAutoPlaying.value && lastInteractionTime.value > 0) {
    if (now - lastInteractionTime.value >= RESUME_AFTER_MS) {
      advanceCarousel();
      startAutoPlay();
    }
    rafId = requestAnimationFrame(autoPlayTick);
    return;
  }

  if (!isAutoPlaying.value) {
    rafId = requestAnimationFrame(autoPlayTick);
    return;
  }

  const elapsed = now - cycleStartTime;
  autoPlayProgress.value = Math.min(1, elapsed / CYCLE_DURATION_MS);

  if (elapsed >= CYCLE_DURATION_MS) {
    advanceCarousel();
  }

  rafId = requestAnimationFrame(autoPlayTick);
}

// ── Lifecycle ──
onMounted(() => {
  const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
  prefersReducedMotion.value = mql.matches;
  mql.addEventListener('change', (e) => {
    prefersReducedMotion.value = e.matches;
  });

  if (prefersReducedMotion.value) {
    const lib = DEMO_LIBRARIES[0];
    const goals = GOALS_BY_LIBRARY.get(lib.id) ?? [];
    selectedGoal.value = goals.find((g) => g.slug === lib.defaultGoalSlug) ?? null;
    return;
  }

  observer = new IntersectionObserver(
    ([entry]) => {
      isVisible.value = entry.isIntersecting;
    },
    { threshold: 0.1 },
  );
  if (containerRef.value) observer.observe(containerRef.value);

  rafId = requestAnimationFrame(autoPlayTick);

  setTimeout(() => {
    const lib = DEMO_LIBRARIES[0];
    const goals = GOALS_BY_LIBRARY.get(lib.id) ?? [];
    selectedGoal.value = goals.find((g) => g.slug === lib.defaultGoalSlug) ?? null;
    startAutoPlay();
  }, AUTO_PLAY_DELAY_MS);
});

onUnmounted(() => {
  if (rafId !== null) cancelAnimationFrame(rafId);
  observer?.disconnect();
});
</script>

<template>
  <div ref="containerRef" class="hero-demo">
    <!-- Library chips (top row) -->
    <div class="hero-demo__libraries">
      <button
        v-for="(lib, i) in DEMO_LIBRARIES"
        :key="lib.id"
        class="library-chip"
        :class="{
          'library-chip--active': activeLibraryIndex === i,
          'library-chip--auto': isAutoPlaying && activeLibraryIndex === i,
        }"
        @click="selectLibrary(i)"
      >
        <span class="library-chip__name">{{ libraryName(lib.id) }}</span>
        <div
          v-if="isAutoPlaying && activeLibraryIndex === i"
          class="library-chip__progress"
          :style="{ transform: `scaleX(${autoPlayProgress})` }"
        />
      </button>
    </div>

    <!-- Goal chips (sub-row, filtered by library) -->
    <div class="hero-demo__goals">
      <button
        v-for="goal in libraryGoals"
        :key="goal.slug"
        class="goal-chip"
        :class="{ 'goal-chip--selected': selectedGoal?.slug === goal.slug }"
        :aria-pressed="selectedGoal?.slug === goal.slug"
        @click="selectGoal(goal)"
      >
        <img :src="goal.image" :alt="goalName(goal.slug)" class="goal-chip__image" />
        <span class="goal-chip__name">{{ goalName(goal.slug) }}</span>
      </button>
    </div>

    <!-- Tree + Roadmap area -->
    <div class="hero-demo__visual">
      <!-- Skill tree (keyed by library for clean remount) -->
      <div
        :key="activeLibrary.id"
        class="hero-demo__tree"
        :class="{ 'hero-demo__tree--dimmed': showRoadmapOverlay }"
      >
        <SkillTreeDemo
          :translations="translations"
          :skills="activeLibrary.skills"
          :progress="activeLibrary.progress"
          :categories="activeLibrary.categories"
          :highlighted-node-ids="highlightedNodeIds"
        />
      </div>

      <!-- Roadmap overlay (mobile: always, desktop: when no tree highlight) -->
      <Transition name="roadmap-slide">
        <div
          v-if="showRoadmapOverlay"
          :key="selectedGoal?.slug"
          class="hero-demo__roadmap-overlay"
        >
          <GoalRoadmap
            :path="selectedGoal!.path"
            :goal-name="goalName(selectedGoal!.slug)"
            :translations="translations"
          />
        </div>
      </Transition>
    </div>

    <!-- CTA -->
    <div class="hero-demo__cta">
      <a
        :href="ctaUrl"
        class="hero-demo__btn"
        :class="{ 'hero-demo__btn--active': selectedGoal }"
        data-umami-event="cta-goal-start"
        :data-umami-event-goal="selectedGoal?.slug ?? 'none'"
      >
        <Transition name="cta-morph" mode="out-in">
          <span :key="ctaText">{{ ctaText }} &rarr;</span>
        </Transition>
      </a>
    </div>
  </div>
</template>

<style scoped>
.hero-demo {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}

/* ── Library chips (top row) ── */
.hero-demo__libraries {
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  gap: 0.5rem;
  max-width: 100%;
  overflow-x: auto;
  scrollbar-width: none;
  -webkit-overflow-scrolling: touch;
  padding: 0.25rem;
}

.hero-demo__libraries::-webkit-scrollbar {
  display: none;
}

.library-chip {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  border: 1px solid var(--border);
  background: var(--bg-surface);
  cursor: pointer;
  overflow: hidden;
  transition:
    border-color 0.15s,
    background 0.15s,
    box-shadow 0.15s,
    transform 0.15s;
}

.library-chip:hover {
  border-color: var(--accent);
  transform: translateY(-1px);
}

.library-chip--active {
  border-color: var(--accent);
  background: color-mix(in srgb, var(--accent) 8%, var(--bg-surface));
  box-shadow:
    0 0 0 1px var(--accent),
    0 2px 8px var(--accent-glow);
}

.library-chip--auto {
  border-color: color-mix(in srgb, var(--accent) 40%, var(--border));
}

.library-chip__name {
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--text-primary);
  white-space: nowrap;
}

.library-chip__progress {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--accent);
  border-radius: 0 0 2rem 2rem;
  transform-origin: left;
  pointer-events: none;
  opacity: 0.6;
}

/* ── Goal chips (sub-row) ── */
.hero-demo__goals {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.375rem;
  min-height: 2rem;
}

.goal-chip {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.625rem 0.25rem 0.25rem;
  border-radius: 2rem;
  border: 1px solid var(--border-muted);
  background: var(--bg-muted);
  cursor: pointer;
  font-size: 0.6875rem;
  transition:
    border-color 0.15s,
    background 0.15s,
    box-shadow 0.15s;
}

.goal-chip:hover {
  border-color: var(--accent);
}

.goal-chip--selected {
  border-color: var(--accent);
  background: color-mix(in srgb, var(--accent) 10%, var(--bg-muted));
  box-shadow: 0 0 0 1px var(--accent);
}

.goal-chip__image {
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 50%;
  object-fit: cover;
}

.goal-chip__name {
  font-weight: 500;
  color: var(--text-secondary);
  white-space: nowrap;
}

.goal-chip--selected .goal-chip__name {
  color: var(--text-primary);
}

/* ── Visual area ── */
.hero-demo__visual {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: 0.75rem;
  border: 1px solid var(--border);
  background: var(--bg-surface);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
  overflow: hidden;
}

@media (max-width: 767px) {
  .hero-demo__visual {
    aspect-ratio: 3 / 4;
  }
}

.hero-demo__tree {
  width: 100%;
  height: 100%;
  transition:
    opacity 0.4s ease,
    filter 0.4s ease;
}

.hero-demo__tree--dimmed {
  opacity: 0.3;
  filter: blur(1px);
}

/* ── Roadmap overlay ── */
.hero-demo__roadmap-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  z-index: 10;
  backdrop-filter: blur(6px);
  background: color-mix(in srgb, var(--bg-surface) 40%, transparent);
}

/* ── CTA ── */
.hero-demo__cta {
  margin-top: 0.25rem;
}

.hero-demo__btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: var(--accent);
  color: #ffffff;
  padding: 0.75rem 2rem;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 1rem;
  text-decoration: none;
  transition:
    background-color 0.15s,
    box-shadow 0.15s,
    transform 0.15s;
}

.hero-demo__btn:hover {
  background-color: var(--accent-hover);
  box-shadow: 0 4px 16px var(--accent-glow);
  transform: translateY(-1px);
}

.hero-demo__btn:active {
  transform: translateY(0);
}

.hero-demo__btn--active {
  animation: cta-glow-pulse 2s ease-in-out infinite;
}

@keyframes cta-glow-pulse {
  0%,
  100% {
    box-shadow: 0 4px 16px var(--accent-glow);
  }
  50% {
    box-shadow: 0 4px 32px color-mix(in srgb, var(--accent) 50%, transparent);
  }
}

/* ── CTA text crossfade ── */
.cta-morph-enter-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}
.cta-morph-leave-active {
  transition:
    opacity 0.15s ease,
    transform 0.15s ease;
}
.cta-morph-enter-from {
  opacity: 0;
  transform: translateY(0.375rem);
}
.cta-morph-leave-to {
  opacity: 0;
  transform: translateY(-0.375rem);
}

/* ── Roadmap overlay transitions ── */
.roadmap-slide-enter-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}

.roadmap-slide-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}

.roadmap-slide-enter-from,
.roadmap-slide-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

/* ── Reduced motion ── */
@media (prefers-reduced-motion: reduce) {
  .library-chip__progress {
    display: none;
  }
}
</style>
