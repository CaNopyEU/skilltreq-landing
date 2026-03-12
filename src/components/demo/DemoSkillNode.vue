<script setup lang="ts">
import { computed, inject, type Ref } from 'vue';
import { Handle, type NodeProps } from '@vue-flow/core';
import type { NodeStatus, DemoMove, DemoProgress, DemoCategory } from './types';

const props = defineProps<NodeProps>();

const skillsMap = inject<Ref<Map<string, DemoMove>>>('skillsMap')!;
const progressMap = inject<Ref<Map<string, DemoProgress>>>('progressMap')!;
const categoriesMap = inject<Ref<Map<string, DemoCategory>>>('categoriesMap')!;
const statusMap = inject<Ref<Map<string, NodeStatus>>>('statusMap')!;
const translationsMap = inject<Ref<Record<string, string>>>('translations')!;

const skillId = computed(() => props.data.skillId as string);
const skill = computed(() => skillsMap.value.get(skillId.value)!);
const prog = computed(() => progressMap.value.get(skillId.value)!);
const category = computed(() => categoriesMap.value.get(skill.value.categoryId));
const status = computed(() => statusMap.value.get(skillId.value) ?? 'locked');

const categoryHex = computed(() => category.value?.color ?? '#6b7280');
const statusCssVar = computed(() => `var(--status-${status.value.replace('_', '-')})`);

const bgColor = computed(() => {
  if (status.value === 'unlocked') {
    return `color-mix(in srgb, var(--status-unlocked) 8%, var(--bg-surface))`;
  }
  return `color-mix(in srgb, ${statusCssVar.value} 12%, var(--bg-surface))`;
});

const fillColor = computed(() => `color-mix(in srgb, ${statusCssVar.value} 35%, transparent)`);

const borderColor = computed(() => {
  if (status.value === 'unlocked') return 'var(--status-unlocked)';
  return statusCssVar.value;
});

const isMastered = computed(() => status.value === 'mastered');
const isInProgress = computed(() => status.value === 'in_progress');
const isLocked = computed(() => status.value === 'locked');
const isUnlocked = computed(() => status.value === 'unlocked');

const glowShadow = computed(() => {
  if (isUnlocked.value) {
    return `0 0 0 1px var(--status-unlocked-glow), 0 0 10px var(--status-unlocked-glow)`;
  }
  if (isLocked.value) return 'none';
  const v = `var(--status-${status.value.replace('_', '-')}-glow)`;
  return `0 0 0 1px ${v}, 0 0 14px ${v}, inset 0 0 8px ${v}`;
});

const nodeOpacity = computed(() => {
  if (isUnlocked.value) return 0.85;
  if (isLocked.value) return 0.6;
  return 1;
});

const totalSteps = computed(() => skill.value.progressions);
const fillWidth = computed(() => {
  if (totalSteps.value === 0) {
    const s = status.value;
    return s === 'completed' || s === 'mastered' ? '100%' : '0%';
  }
  const pct = Math.min(100, (prog.value.currentStep / totalSteps.value) * 100);
  return `${pct}%`;
});

const displayName = computed(() => {
  const key = `demo.skill.${skillId.value}`;
  return translationsMap.value[key] || skill.value.abbr || skill.value.name;
});
</script>

<template>
  <div
    class="demo-skill-node"
    :class="{
      'demo-skill-node--mastered': isMastered,
      'demo-skill-node--in-progress': isInProgress,
      'demo-skill-node--unlocked': isUnlocked,
    }"
    :style="{
      background: bgColor,
      borderColor,
      boxShadow: glowShadow,
      opacity: nodeOpacity,
    }"
  >
    <Handle type="target" :position="props.targetPosition" />

    <div
      v-if="totalSteps > 0"
      class="demo-skill-node__fill"
      :style="{ width: fillWidth, backgroundColor: fillColor }"
    ></div>

    <div class="demo-skill-node__name">{{ displayName }}</div>

    <div class="demo-skill-node__category-bar" :style="{ backgroundColor: categoryHex }"></div>

    <Handle type="source" :position="props.sourcePosition" />
  </div>
</template>

<style scoped>
.demo-skill-node {
  width: 160px;
  height: 60px;
  border: 2px solid;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  padding: 0 0.5rem;
  box-sizing: border-box;
  overflow: hidden;
  transition:
    transform 0.15s ease,
    opacity 0.15s ease,
    box-shadow 0.15s ease;
}

.demo-skill-node:hover {
  transform: scale(1.04);
  z-index: 10;
}

.demo-skill-node--mastered .demo-skill-node__name {
  background: linear-gradient(
    90deg,
    var(--status-mastered) 0%,
    color-mix(in srgb, var(--status-mastered) 60%, #fff) 50%,
    var(--status-mastered) 100%
  );
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: shimmer 3s linear infinite;
}

.demo-skill-node__fill {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  transition: width 0.35s ease;
  pointer-events: none;
  z-index: 0;
}

.demo-skill-node__name {
  padding-top: 0.625rem;
  position: relative;
  z-index: 1;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: var(--node-text);
}

.demo-skill-node__category-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
  z-index: 2;
  pointer-events: none;
}

/* In-progress glow pulse */
.demo-skill-node--in-progress {
  animation: node-pulse 2.5s ease-in-out infinite;
}

@keyframes node-pulse {
  0%, 100% {
    box-shadow:
      0 0 0 1px var(--status-in-progress-glow),
      0 0 14px var(--status-in-progress-glow),
      inset 0 0 8px var(--status-in-progress-glow);
  }
  50% {
    box-shadow:
      0 0 0 2px var(--status-in-progress-glow),
      0 0 22px var(--status-in-progress-glow),
      inset 0 0 12px var(--status-in-progress-glow);
  }
}

/* Hide handle dots */
:deep(.vue-flow__handle) {
  opacity: 0;
  pointer-events: none;
}
</style>
