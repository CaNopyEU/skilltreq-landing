<script setup lang="ts">
import { computed, inject, ref, type Ref } from 'vue';
import { getBezierPath, type EdgeProps } from '@vue-flow/core';
import { resolveEdgeVariant } from './resolveEdgeVariant';
import type { NodeStatus } from './types';

const props = defineProps<EdgeProps>();
const statusMap = inject<Ref<Map<string, NodeStatus>>>('statusMap')!;
const graphIsPaused = inject<Ref<boolean>>('graphIsPaused', ref(false));

const pathData = computed(
  () =>
    getBezierPath({
      sourceX: props.sourceX,
      sourceY: props.sourceY,
      sourcePosition: props.sourcePosition,
      targetX: props.targetX,
      targetY: props.targetY,
      targetPosition: props.targetPosition,
    })[0],
);

const sourceStatus = computed(() => statusMap.value.get(props.source) ?? 'locked');
const targetStatus = computed(() => statusMap.value.get(props.target) ?? 'locked');
const variant = computed(() => resolveEdgeVariant(sourceStatus.value, targetStatus.value));

const gradientId = computed(() => `mtc-grad-${props.id}`);

const strokeColor = computed(() => {
  switch (variant.value) {
    case 'locked_dashed':
    case 'locked_solid':
      return 'var(--status-locked)';
    case 'available':
      return 'var(--status-unlocked)';
    case 'in_progress':
      return 'var(--status-in-progress)';
    case 'completed':
      return 'var(--status-completed)';
    case 'mastered':
      return 'var(--status-mastered)';
    case 'mastered_to_completed':
      return `url(#${gradientId.value})`;
    default:
      return 'var(--status-locked)';
  }
});

const isActive = computed(() => targetStatus.value === 'in_progress');
const isAvailable = computed(() => variant.value === 'available');
const isMasteredEdge = computed(() => variant.value === 'mastered' && !isActive.value);
const isMasteredToCompleted = computed(() => variant.value === 'mastered_to_completed');
const isDashed = computed(() => variant.value === 'locked_dashed');

const strokeDashArray = computed(() => (isDashed.value ? '4 6' : 'none'));

const strokeWidth = computed(() => {
  if (variant.value === 'available') return 1.5;
  return 1;
});

const strokeOpacity = computed(() => {
  if (variant.value === 'locked_dashed') return 0.25;
  if (variant.value === 'locked_solid') return 0.4;
  if (variant.value === 'available') return 0.65;
  if (isActive.value) return 0.35;
  return 0.6;
});

// Particle speed
const PARTICLE_SPEED = 120;

const edgeDistance = computed(() => {
  const dx = props.targetX - props.sourceX;
  const dy = props.targetY - props.sourceY;
  return Math.sqrt(dx * dx + dy * dy);
});

const energyDuration = computed(() => {
  const dist = Math.max(40, edgeDistance.value);
  return `${(dist / PARTICLE_SPEED).toFixed(2)}s`;
});

const mpathId = computed(() => `ep-${props.id}`);
</script>

<template>
  <g>
    <!-- Gradient def for mastered_to_completed edge -->
    <defs v-if="isMasteredToCompleted">
      <linearGradient
        :id="gradientId"
        gradientUnits="userSpaceOnUse"
        :x1="props.sourceX"
        :y1="props.sourceY"
        :x2="props.targetX"
        :y2="props.targetY"
      >
        <stop offset="0%" stop-color="var(--status-mastered)" />
        <stop offset="100%" stop-color="var(--status-completed)" />
      </linearGradient>
    </defs>

    <!-- Invisible path for mpath reference -->
    <path :id="mpathId" :d="pathData" fill="none" stroke="none" />

    <!-- Available line -- teal pulse -->
    <path
      v-if="isAvailable"
      :d="pathData"
      fill="none"
      :stroke="strokeColor"
      :stroke-width="strokeWidth"
      stroke-opacity="0.5"
    >
      <animate
        attributeName="stroke-opacity"
        values="0.35;0.65;0.35"
        dur="2.5s"
        repeatCount="indefinite"
      />
    </path>

    <!-- Mastered line -- gold shimmer pulse -->
    <path
      v-if="isMasteredEdge"
      :d="pathData"
      fill="none"
      :stroke="strokeColor"
      :stroke-width="strokeWidth"
      stroke-opacity="0.5"
    >
      <animate
        attributeName="stroke-opacity"
        values="0.4;0.85;0.4"
        dur="3s"
        repeatCount="indefinite"
      />
    </path>

    <!-- Mastered->Completed gradient line -->
    <path
      v-else-if="isMasteredToCompleted"
      :d="pathData"
      fill="none"
      :stroke="strokeColor"
      :stroke-width="strokeWidth"
      stroke-opacity="0.55"
    >
      <animate
        attributeName="stroke-opacity"
        values="0.4;0.7;0.4"
        dur="3s"
        repeatCount="indefinite"
      />
    </path>

    <!-- Regular base line -->
    <path
      v-else
      :d="pathData"
      fill="none"
      :stroke="strokeColor"
      :stroke-width="strokeWidth"
      :stroke-opacity="strokeOpacity"
      :stroke-dasharray="strokeDashArray"
    />

    <!-- Electric particle -- edges flowing into in_progress skills -->
    <template v-if="isActive && !graphIsPaused">
      <!-- Trailing aura -->
      <circle r="5" :fill="strokeColor" fill-opacity="0.08">
        <animateMotion :dur="energyDuration" repeatCount="indefinite" rotate="auto">
          <mpath :href="`#${mpathId}`" />
        </animateMotion>
      </circle>

      <!-- Main particle -->
      <circle r="3.5" :fill="strokeColor">
        <animate
          attributeName="fill-opacity"
          values="0.35;0.55;0.3;0.5;0.4"
          dur="0.4s"
          repeatCount="indefinite"
        />
        <animateMotion :dur="energyDuration" repeatCount="indefinite" rotate="auto">
          <mpath :href="`#${mpathId}`" />
        </animateMotion>
      </circle>

      <!-- Bright core -->
      <circle r="1.8" fill="white">
        <animate
          attributeName="fill-opacity"
          values="0.8;1;0.75;1;0.85"
          dur="0.4s"
          repeatCount="indefinite"
        />
        <animateMotion :dur="energyDuration" repeatCount="indefinite" rotate="auto">
          <mpath :href="`#${mpathId}`" />
        </animateMotion>
      </circle>
    </template>
  </g>
</template>
