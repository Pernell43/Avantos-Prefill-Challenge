import type { FormNode } from '../models/FormTypes.ts';

/**
 * Build a reverse lookup map: formId → list of parents
 */
export function buildParentMap(graph: FormNode[]) {
  const parentMap = new Map<string, string[]>();

  for (const node of graph) {
    for (const downstreamId of node.downstreamFormIds) {
      if (!parentMap.has(downstreamId)) {
        parentMap.set(downstreamId, []);
      }
      parentMap.get(downstreamId)?.push(node.id);
    }
  }

  return parentMap; // This should be a Map, not an object
}

export function getAllAncestors(id: string, parentMap: Map<string, string[]>, visited = new Set<string>()) {
  if (!parentMap.has(id)) return visited;

  for (const parent of parentMap.get(id) || []) {
    if (!visited.has(parent)) {
      visited.add(parent);
      getAllAncestors(parent, parentMap, visited);
    }
  }

  return visited;
}