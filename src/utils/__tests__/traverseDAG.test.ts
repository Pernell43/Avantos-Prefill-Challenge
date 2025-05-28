import { buildParentMap, getAllAncestors } from '../traverseDAG';
import { describe, it, expect } from 'vitest';

const mockGraph = [
  { id: 'A', downstreamFormIds: ['B', 'C'], fields: [], name: 'Form A' },
  { id: 'B', downstreamFormIds: ['D'], fields: [], name: 'Form B' },
  { id: 'C', downstreamFormIds: ['D'], fields: [], name: 'Form C' },
  { id: 'D', downstreamFormIds: [], fields: [], name: 'Form D' },
];

describe('DAG Traversal Utilities', () => {
  it('builds parent map correctly', () => {
    const map = buildParentMap(mockGraph);
    expect(map.get('B')).toEqual(['A']);
    expect(map.get('D')).toEqual(['B', 'C']);
  });

  it('gets all ancestors of a node', () => {
    const parentMap = buildParentMap(mockGraph);
    const ancestors = getAllAncestors('D', parentMap);
    expect(Array.from(ancestors).sort()).toEqual(['A', 'B', 'C'].sort());
  });

  it('returns empty set for root node', () => {
    const parentMap = buildParentMap(mockGraph);
    const ancestors = getAllAncestors('A', parentMap);
    expect(ancestors.size).toBe(0);
  });
});