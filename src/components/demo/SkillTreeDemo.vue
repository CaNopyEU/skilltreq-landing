<script setup lang="ts">
import { ref, computed, provide, onMounted, onUnmounted } from 'vue';
import { VueFlow } from '@vue-flow/core';
import '@vue-flow/core/dist/style.css';
import '@vue-flow/core/dist/theme-default.css';
import DemoSkillNode from './DemoSkillNode.vue';
import DemoSkillEdge from './DemoSkillEdge.vue';
import { buildLayout } from './useGraphLayout';
import { skills, progress, categories } from './demoData';
import type { NodeStatus, DemoMove, DemoProgress, DemoCategory } from './types';

const props = defineProps<{
  translations: Record<string, string>;
}>();

// Build maps for injection
const skillsMap = computed(() => new Map<string, DemoMove>(skills.map((s) => [s.id, s])));
const progressMap = computed(
  () => new Map<string, DemoProgress>(Object.entries(progress) as [string, DemoProgress][]),
);
const categoriesMap = computed(
  () => new Map<string, DemoCategory>(categories.map((c) => [c.id, c])),
);

// Compute effective status (locked -> unlocked when all prereqs met)
const statusMap = computed(() => {
  const map = new Map<string, NodeStatus>();
  for (const skill of skills) {
    const stored = progress[skill.id]?.status ?? 'locked';
    if (stored === 'locked' && skill.requires.length > 0) {
      const allPrereqsMet = skill.requires.every((reqId) => {
        const reqStatus = progress[reqId]?.status;
        return reqStatus === 'completed' || reqStatus === 'mastered';
      });
      map.set(skill.id, allPrereqsMet ? 'unlocked' : 'locked');
    } else {
      map.set(skill.id, stored);
    }
  }
  return map;
});

// Provide data to child components
const translationsRef = computed(() => props.translations);
provide('skillsMap', skillsMap);
provide('progressMap', progressMap);
provide('categoriesMap', categoriesMap);
provide('statusMap', statusMap);
provide('translations', translationsRef);

// Graph layout
const { nodes: layoutNodes, edges: layoutEdges } = buildLayout(skills, 'TB');

// Tooltip state
const tooltip = ref<{
  visible: boolean;
  x: number;
  y: number;
  skillId: string;
} | null>(null);

function onNodeClick(event: { node: { id: string }; event: MouseEvent }) {
  const skillId = event.node.id;
  const skill = skillsMap.value.get(skillId);
  if (!skill) return;

  const rect = (event.event.currentTarget as HTMLElement)
    ?.closest('.vue-flow')
    ?.getBoundingClientRect();
  if (!rect) return;

  tooltip.value = {
    visible: true,
    x: event.event.clientX - rect.left,
    y: event.event.clientY - rect.top - 10,
    skillId,
  };
}

function onPaneClick() {
  tooltip.value = null;
}

function tooltipSkillName(skillId: string): string {
  const key = `demo.skill.${skillId}`;
  return props.translations[key] || skillsMap.value.get(skillId)?.name || skillId;
}

function tooltipStatusLabel(skillId: string): string {
  const status = statusMap.value.get(skillId) ?? 'locked';
  const key = `demo.status.${status}`;
  return props.translations[key] || status;
}

function tooltipProgress(skillId: string): string | null {
  const skill = skillsMap.value.get(skillId);
  const prog = progressMap.value.get(skillId);
  if (!skill || !prog || prog.currentStep === 0) return null;
  return `${prog.currentStep}/${skill.progressions}`;
}

// IntersectionObserver to pause animations off-screen
const graphIsPaused = ref(false);
provide('graphIsPaused', graphIsPaused);

const containerRef = ref<HTMLElement | null>(null);
let observer: IntersectionObserver | null = null;

onMounted(() => {
  if (containerRef.value) {
    observer = new IntersectionObserver(
      ([entry]) => {
        graphIsPaused.value = !entry.isIntersecting;
      },
      { threshold: 0.1 },
    );
    observer.observe(containerRef.value);
  }
});

onUnmounted(() => {
  observer?.disconnect();
});
</script>

<template>
  <div ref="containerRef" class="demo-tree-container">
    <VueFlow
      :nodes="layoutNodes"
      :edges="layoutEdges"
      :node-types="{ 'demo-node': DemoSkillNode }"
      :edge-types="{ 'demo-edge': DemoSkillEdge }"
      fit-view-on-init
      :nodes-draggable="false"
      :nodes-connectable="false"
      :edges-updatable="false"
      :pan-on-drag="false"
      :pan-on-scroll="false"
      :zoom-on-scroll="false"
      :zoom-on-pinch="false"
      :zoom-on-double-click="false"
      :prevent-scrolling="false"
      @node-click="onNodeClick"
      @pane-click="onPaneClick"
    />

    <!-- Tooltip -->
    <Transition name="tooltip-fade">
      <div
        v-if="tooltip?.visible"
        class="demo-tooltip"
        :style="{
          left: `${tooltip.x}px`,
          top: `${tooltip.y}px`,
        }"
      >
        <div class="demo-tooltip__name">{{ tooltipSkillName(tooltip.skillId) }}</div>
        <div class="demo-tooltip__status">
          {{ tooltipStatusLabel(tooltip.skillId) }}
          <span v-if="tooltipProgress(tooltip.skillId)" class="demo-tooltip__progress">
            {{ tooltipProgress(tooltip.skillId) }}
          </span>
        </div>
        <a
          href="https://www.skilltreq.app/"
          class="demo-tooltip__cta"
          data-umami-event="cta-try-free"
        >
          {{ translations['demo.tooltip.cta'] || 'Try in app' }} &rarr;
        </a>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.demo-tree-container {
  width: 100%;
  height: 100%;
  position: relative;
}

/* Override Vue Flow theme for our design tokens */
.demo-tree-container :deep(.vue-flow) {
  background: transparent;
}

.demo-tree-container :deep(.vue-flow__pane) {
  cursor: default;
}

/* Hide minimap, controls, attribution */
.demo-tree-container :deep(.vue-flow__minimap),
.demo-tree-container :deep(.vue-flow__controls),
.demo-tree-container :deep(.vue-flow__attribution) {
  display: none;
}

/* Tooltip */
.demo-tooltip {
  position: absolute;
  transform: translate(-50%, -100%);
  background: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: 0.5rem;
  padding: 0.625rem 0.75rem;
  z-index: 20;
  pointer-events: auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  min-width: 8rem;
  text-align: center;
}

.demo-tooltip__name {
  font-weight: 600;
  font-size: 0.875rem;
  color: var(--text-primary);
  margin-bottom: 0.25rem;
}

.demo-tooltip__status {
  font-size: 0.75rem;
  color: var(--text-secondary);
  margin-bottom: 0.375rem;
}

.demo-tooltip__progress {
  opacity: 0.7;
  margin-left: 0.25rem;
}

.demo-tooltip__cta {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--accent);
  text-decoration: none;
  transition: color 0.15s;
}

.demo-tooltip__cta:hover {
  color: var(--accent-hover);
}

/* Tooltip transition */
.tooltip-fade-enter-active,
.tooltip-fade-leave-active {
  transition:
    opacity 0.15s ease,
    transform 0.15s ease;
}

.tooltip-fade-enter-from,
.tooltip-fade-leave-to {
  opacity: 0;
  transform: translate(-50%, calc(-100% + 4px));
}
</style>
