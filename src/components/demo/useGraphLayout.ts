import dagre from '@dagrejs/dagre';
import { Position } from '@vue-flow/core';
import type { DemoMove } from './types';

export interface GraphNode {
  id: string;
  type: string;
  position: { x: number; y: number };
  sourcePosition: Position;
  targetPosition: Position;
  data: Record<string, unknown>;
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  type: string;
}

const NODE_W = 160;
const NODE_H = 60;

export function buildLayout(
  skills: DemoMove[],
  direction: 'TB' | 'LR' = 'TB',
): { nodes: GraphNode[]; edges: GraphEdge[] } {
  const g = new dagre.graphlib.Graph();
  g.setGraph({ rankdir: direction, nodesep: 60, ranksep: 80 });
  g.setDefaultEdgeLabel(() => ({}));

  for (const skill of skills) {
    g.setNode(skill.id, { width: NODE_W, height: NODE_H });
  }

  const skillIds = new Set(skills.map((s) => s.id));
  const edges: GraphEdge[] = [];

  for (const skill of skills) {
    for (const reqId of skill.requires) {
      if (skillIds.has(reqId)) {
        g.setEdge(reqId, skill.id);
        edges.push({
          id: `${reqId}->${skill.id}`,
          source: reqId,
          target: skill.id,
          type: 'demo-edge',
        });
      }
    }
  }

  dagre.layout(g);

  const sourcePos = direction === 'LR' ? Position.Right : Position.Bottom;
  const targetPos = direction === 'LR' ? Position.Left : Position.Top;

  const nodes: GraphNode[] = skills.map((skill) => {
    const node = g.node(skill.id);
    return {
      id: skill.id,
      type: 'demo-node',
      position: { x: node.x - NODE_W / 2, y: node.y - NODE_H / 2 },
      sourcePosition: sourcePos,
      targetPosition: targetPos,
      data: { skillId: skill.id },
    };
  });

  return { nodes, edges };
}
