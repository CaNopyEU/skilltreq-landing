<script setup lang="ts">
defineProps<{
  path: string[];
  goalName: string;
  translations: Record<string, string>;
}>();
</script>

<template>
  <div class="roadmap">
    <p class="roadmap__title">
      {{
        (translations['goals.roadmap.title'] || 'Your path to {goal}').replace('{goal}', goalName)
      }}
    </p>

    <ol class="roadmap__steps">
      <li
        v-for="(step, i) in path"
        :key="i"
        class="roadmap__step"
        :class="{ 'roadmap__step--goal': i === path.length - 1 }"
        :style="{ '--step-delay': `${i * 80}ms` }"
      >
        <div class="roadmap__dot"></div>
        <div v-if="i < path.length - 1" class="roadmap__line"></div>
        <span class="roadmap__label">{{ step }}</span>
      </li>
    </ol>
  </div>
</template>

<style scoped>
.roadmap {
  padding: 1.25rem 1.5rem;
  border-radius: 0.75rem;
  border: 1px solid var(--border);
  background: var(--bg-surface);
}

.roadmap__title {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-secondary);
  margin: 0 0 1rem;
  text-align: center;
}

.roadmap__steps {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0;
}

.roadmap__step {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  position: relative;
  padding: 0.375rem 0;
  animation: step-enter 0.3s ease both;
  animation-delay: var(--step-delay);
}

.roadmap__dot {
  width: 0.625rem;
  height: 0.625rem;
  border-radius: 50%;
  background: var(--status-in-progress);
  flex-shrink: 0;
  position: relative;
  z-index: 1;
}

.roadmap__step--goal .roadmap__dot {
  width: 0.75rem;
  height: 0.75rem;
  background: var(--accent);
  box-shadow: 0 0 0 3px var(--accent-glow);
  animation: goal-dot-pulse 2s ease-in-out infinite;
  animation-delay: calc(var(--step-delay) + 300ms);
}

@keyframes goal-dot-pulse {
  0%,
  100% {
    box-shadow: 0 0 0 3px var(--accent-glow);
  }
  50% {
    box-shadow:
      0 0 0 6px var(--accent-glow),
      0 0 12px var(--accent-glow);
  }
}

.roadmap__line {
  position: absolute;
  left: calc(0.3125rem - 0.5px);
  top: calc(0.375rem + 0.625rem);
  width: 1px;
  height: calc(100% - 0.25rem);
  background: var(--border-muted);
  transform: scaleY(0);
  transform-origin: top;
  animation: line-draw 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  animation-delay: calc(var(--step-delay) + 150ms);
}

@keyframes line-draw {
  to {
    transform: scaleY(1);
  }
}

.roadmap__label {
  font-size: 0.875rem;
  color: var(--text-body);
  font-weight: 500;
}

.roadmap__step--goal .roadmap__label {
  font-weight: 700;
  color: var(--accent);
}

@keyframes step-enter {
  from {
    opacity: 0;
    transform: translateX(-0.5rem);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
