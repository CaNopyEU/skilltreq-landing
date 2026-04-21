<script setup lang="ts">
import { ref, computed } from 'vue';
import { FEATURED_GOALS, type LandingGoal } from './goalData';
import GoalRoadmap from './GoalRoadmap.vue';

const props = defineProps<{
  translations: Record<string, string>;
  locale: string;
  appBaseUrl: string;
}>();

const selectedGoal = ref<LandingGoal | null>(null);

function selectGoal(goal: LandingGoal) {
  selectedGoal.value = selectedGoal.value?.slug === goal.slug ? null : goal;
}

function goalName(slug: string): string {
  return props.translations[`goals.goal.${slug}`] || slug;
}

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
  <div class="goal-picker">
    <div class="goal-picker__grid">
      <button
        v-for="goal in FEATURED_GOALS"
        :key="goal.slug"
        class="goal-card"
        :class="{ 'goal-card--selected': selectedGoal?.slug === goal.slug }"
        :aria-pressed="selectedGoal?.slug === goal.slug"
        @click="selectGoal(goal)"
      >
        <img :src="goal.image" :alt="goalName(goal.slug)" class="goal-card__image" />
        <span class="goal-card__name">{{ goalName(goal.slug) }}</span>
      </button>
    </div>

    <Transition name="roadmap-reveal">
      <div v-if="selectedGoal" class="goal-picker__roadmap">
        <GoalRoadmap
          :path="selectedGoal.path"
          :goal-name="goalName(selectedGoal.slug)"
          :translations="translations"
        />
      </div>
    </Transition>

    <div class="goal-picker__cta">
      <a
        :href="ctaUrl"
        class="goal-picker__btn"
        data-umami-event="cta-goal-start"
        :data-umami-event-goal="selectedGoal?.slug ?? 'none'"
      >
        {{ ctaText }} &rarr;
      </a>
    </div>
  </div>
</template>

<style scoped>
.goal-picker {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.goal-picker__grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
  width: 100%;
  max-width: 40rem;
}

@media (min-width: 640px) {
  .goal-picker__grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

.goal-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem;
  border-radius: 0.75rem;
  border: 1px solid var(--border);
  background: var(--bg-surface);
  cursor: pointer;
  transition:
    border-color 0.15s,
    transform 0.15s,
    box-shadow 0.15s;
}

.goal-card:hover {
  border-color: var(--accent);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.goal-card--selected {
  border-color: var(--accent);
  background: color-mix(in srgb, var(--accent) 6%, var(--bg-surface));
  box-shadow:
    0 0 0 1px var(--accent),
    0 4px 16px var(--accent-glow);
}

.goal-card__image {
  width: 4rem;
  height: 4rem;
  border-radius: 0.5rem;
  object-fit: cover;
}

@media (min-width: 640px) {
  .goal-card__image {
    width: 5rem;
    height: 5rem;
  }
}

.goal-card__name {
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--text-primary);
  text-align: center;
  line-height: 1.3;
}

.goal-picker__roadmap {
  width: 100%;
  max-width: 28rem;
}

.goal-picker__cta {
  margin-top: 0.5rem;
}

.goal-picker__btn {
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

.goal-picker__btn:hover {
  background-color: var(--accent-hover);
  box-shadow: 0 4px 16px var(--accent-glow);
  transform: translateY(-1px);
}

.goal-picker__btn:active {
  transform: translateY(0);
}

/* Roadmap reveal transition */
.roadmap-reveal-enter-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}

.roadmap-reveal-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}

.roadmap-reveal-enter-from,
.roadmap-reveal-leave-to {
  opacity: 0;
  transform: translateY(-0.5rem);
}
</style>
