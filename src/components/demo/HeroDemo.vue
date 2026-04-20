<script setup lang="ts">
import { ref, computed } from 'vue';
import SkillTreeDemo from './SkillTreeDemo.vue';
import GoalRoadmap from '../goal-picker/GoalRoadmap.vue';
import { FEATURED_GOALS, type LandingGoal } from '../goal-picker/goalData';

const props = defineProps<{
  translations: Record<string, string>;
  locale: string;
  appBaseUrl: string;
  compact?: boolean;
}>();

const selectedGoal = ref<LandingGoal | null>(null);

function selectGoal(goal: LandingGoal) {
  selectedGoal.value = selectedGoal.value?.slug === goal.slug ? null : goal;
}

function goalName(slug: string): string {
  return props.translations[`goals.goal.${slug}`] || slug;
}

const highlightedNodeIds = computed(() => selectedGoal.value?.demoNodeIds ?? []);
const hasTreeHighlight = computed(() => highlightedNodeIds.value.length > 0);

const ctaUrl = computed(() => {
  if (!selectedGoal.value) return `${props.appBaseUrl}/login`;
  return `${props.appBaseUrl}/start?goal=${selectedGoal.value.slug}&locale=${props.locale}`;
});

const ctaText = computed(() => {
  if (!selectedGoal.value) return props.translations['goals.cta.default'] || 'Try free';
  const template = props.translations['goals.cta.selected'] || 'Start training {goal}';
  return template.replace('{goal}', goalName(selectedGoal.value.slug));
});
</script>

<template>
  <div class="hero-demo">
    <!-- Goal cards row -->
    <div class="hero-demo__goals">
      <button
        v-for="goal in FEATURED_GOALS"
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
      <!-- Skill tree (dims when non-calisthenics goal selected) -->
      <div
        class="hero-demo__tree"
        :class="{ 'hero-demo__tree--dimmed': selectedGoal && !hasTreeHighlight }"
      >
        <SkillTreeDemo
          :translations="translations"
          :compact="compact"
          :highlighted-node-ids="highlightedNodeIds"
        />
      </div>

      <!-- Roadmap overlay (non-calisthenics goals or always when selected) -->
      <Transition name="roadmap-slide">
        <div v-if="selectedGoal && !hasTreeHighlight" class="hero-demo__roadmap-overlay">
          <GoalRoadmap
            :path="selectedGoal.path"
            :goal-name="goalName(selectedGoal.slug)"
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
  gap: 1rem;
}

/* ── Goal chips ── */
.hero-demo__goals {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
  max-width: 44rem;
}

.goal-chip {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.375rem 0.75rem 0.375rem 0.375rem;
  border-radius: 2rem;
  border: 1px solid var(--border);
  background: var(--bg-surface);
  cursor: pointer;
  transition:
    border-color 0.15s,
    background 0.15s,
    box-shadow 0.15s,
    transform 0.15s;
}

.goal-chip:hover {
  border-color: var(--accent);
  transform: translateY(-1px);
}

.goal-chip--selected {
  border-color: var(--accent);
  background: color-mix(in srgb, var(--accent) 8%, var(--bg-surface));
  box-shadow: 0 0 0 1px var(--accent), 0 2px 8px var(--accent-glow);
  animation: chip-bounce 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.goal-chip--selected::after {
  content: '';
  position: absolute;
  inset: 0;
  border: 2px solid var(--accent);
  border-radius: 2rem;
  pointer-events: none;
  animation: chip-ring-pulse 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes chip-bounce {
  0% { transform: scale(1); }
  50% { transform: scale(1.08); }
  100% { transform: scale(1); }
}

@keyframes chip-ring-pulse {
  0% { transform: scale(1); opacity: 0.6; }
  100% { transform: scale(1.8); opacity: 0; }
}

.goal-chip__image {
  width: 1.75rem;
  height: 1.75rem;
  border-radius: 50%;
  object-fit: cover;
}

.goal-chip__name {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--text-primary);
  white-space: nowrap;
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
  transition: opacity 0.4s ease, filter 0.4s ease;
}

.hero-demo__tree--dimmed {
  opacity: 0.3;
  filter: blur(1px);
}

/* ── Roadmap overlay (for non-calisthenics goals) ── */
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
  margin-top: 0.5rem;
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
  0%, 100% { box-shadow: 0 4px 16px var(--accent-glow); }
  50% { box-shadow: 0 4px 32px color-mix(in srgb, var(--accent) 50%, transparent); }
}

/* ── CTA text crossfade ── */
.cta-morph-enter-active { transition: opacity 0.2s ease, transform 0.2s ease; }
.cta-morph-leave-active { transition: opacity 0.15s ease, transform 0.15s ease; }
.cta-morph-enter-from { opacity: 0; transform: translateY(0.375rem); }
.cta-morph-leave-to { opacity: 0; transform: translateY(-0.375rem); }

/* ── Roadmap overlay transitions ── */
.roadmap-slide-enter-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.roadmap-slide-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.roadmap-slide-enter-from,
.roadmap-slide-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
