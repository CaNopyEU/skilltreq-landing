<script setup lang="ts">
import { ref, computed, provide, onMounted, onUnmounted, markRaw } from 'vue';
import { VueFlow } from '@vue-flow/core';
import '@vue-flow/core/dist/style.css';
import '@vue-flow/core/dist/theme-default.css';
import DemoSkillNode from './DemoSkillNode.vue';
import DemoSkillEdge from './DemoSkillEdge.vue';
import { buildLayout } from './useGraphLayout';
import type { NodeStatus, DemoMove, DemoProgress, DemoCategory } from './types';

const nodeTypes = { 'demo-node': markRaw(DemoSkillNode) };
const edgeTypes = { 'demo-edge': markRaw(DemoSkillEdge) };

const props = defineProps<{
  translations: Record<string, string>;
  skills: DemoMove[];
  progress: Record<string, DemoProgress>;
  categories: DemoCategory[];
  highlightedNodeIds?: string[];
}>();

// Build maps for injection
const skillsMap = computed(() => new Map<string, DemoMove>(props.skills.map((s) => [s.id, s])));
const progressMap = computed(
  () => new Map<string, DemoProgress>(Object.entries(props.progress) as [string, DemoProgress][]),
);
const categoriesMap = computed(
  () => new Map<string, DemoCategory>(props.categories.map((c) => [c.id, c])),
);

// Compute effective status (locked -> unlocked when all prereqs met)
const statusMap = computed(() => {
  const map = new Map<string, NodeStatus>();
  for (const skill of props.skills) {
    const stored = props.progress[skill.id]?.status ?? 'locked';
    if (stored === 'locked' && skill.requires.length > 0) {
      const allPrereqsMet = skill.requires.every((reqId) => {
        const reqStatus = props.progress[reqId]?.status;
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
provide(
  'compact',
  computed(() => false),
);
provide(
  'highlightedNodeIds',
  computed(() => props.highlightedNodeIds ?? []),
);

// Graph layout (reactive — recomputes when skills change)
const layout = computed(() => buildLayout(props.skills, 'TB'));
const layoutNodes = computed(() => layout.value.nodes);
const layoutEdges = computed(() => layout.value.edges);

// Tooltip state
const tooltip = ref<{
  visible: boolean;
  x: number;
  y: number;
  skillId: string;
  flipDown: boolean;
} | null>(null);

function onNodeClick(event: { node: { id: string }; event: MouseEvent }) {
  const skillId = event.node.id;
  const skill = skillsMap.value.get(skillId);
  if (!skill) return;

  const rect = (event.event.currentTarget as HTMLElement)
    ?.closest('.vue-flow')
    ?.getBoundingClientRect();
  if (!rect) return;

  const x = event.event.clientX - rect.left;
  const y = event.event.clientY - rect.top;
  // Flip tooltip below node if too close to top (tooltip is ~180px tall)
  const nearTop = y < 180;
  tooltip.value = {
    visible: true,
    x,
    y: nearTop ? y + 30 : y - 10,
    skillId,
    flipDown: nearTop,
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

function tooltipDescription(skillId: string): string | null {
  return skillsMap.value.get(skillId)?.description ?? null;
}

function tooltipProgression(skillId: string): string | null {
  const status = statusMap.value.get(skillId);
  // Don't show "Next" for completed/mastered skills
  if (status === 'completed' || status === 'mastered') return null;
  return skillsMap.value.get(skillId)?.progressionPreview ?? null;
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
      :node-types="nodeTypes"
      :edge-types="edgeTypes"
      fit-view-on-init
      :nodes-draggable="false"
      :nodes-connectable="false"
      :nodes-focusable="false"
      :edges-focusable="false"
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
        :class="{ 'demo-tooltip--flip': tooltip.flipDown }"
        :style="{
          left: `${tooltip.x}px`,
          top: `${tooltip.y}px`,
        }"
      >
        <div class="demo-tooltip__name">{{ tooltipSkillName(tooltip.skillId) }}</div>
        <div v-if="tooltipDescription(tooltip.skillId)" class="demo-tooltip__desc">
          {{ tooltipDescription(tooltip.skillId) }}
        </div>
        <div class="demo-tooltip__status">
          {{ tooltipStatusLabel(tooltip.skillId) }}
          <span v-if="tooltipProgress(tooltip.skillId)" class="demo-tooltip__progress">
            {{ tooltipProgress(tooltip.skillId) }}
          </span>
        </div>
        <div v-if="tooltipProgression(tooltip.skillId)" class="demo-tooltip__next">
          Next: {{ tooltipProgression(tooltip.skillId) }}
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

/* Edge trace animation (stroke-dashoffset reveal) */
.demo-tree-container :deep(.edge-trace) {
  stroke-dasharray: var(--edge-length);
  stroke-dashoffset: var(--edge-length);
  animation: edge-draw 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  animation-delay: var(--trace-delay, 0ms);
  filter: drop-shadow(0 0 4px var(--accent-glow));
}

@keyframes edge-draw {
  to {
    stroke-dashoffset: 0;
  }
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

.demo-tooltip--flip {
  transform: translate(-50%, 0);
}

.demo-tooltip__name {
  font-weight: 600;
  font-size: 0.875rem;
  color: var(--text-primary);
  margin-bottom: 0.25rem;
}

.demo-tooltip__desc {
  font-size: 0.6875rem;
  color: var(--text-body);
  line-height: 1.4;
  margin-bottom: 0.375rem;
  max-width: 14rem;
}

.demo-tooltip__status {
  font-size: 0.75rem;
  color: var(--text-secondary);
  margin-bottom: 0.25rem;
}

.demo-tooltip__next {
  font-size: 0.6875rem;
  color: var(--text-muted);
  font-style: italic;
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
