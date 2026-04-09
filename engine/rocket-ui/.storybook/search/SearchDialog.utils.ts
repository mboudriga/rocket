import type Fuse from 'fuse.js';
import { useCallback, useMemo, useState } from 'react';
import type { IconType } from 'react-icons';
import { AiOutlineLink } from 'react-icons/ai';
import { BiHide } from 'react-icons/bi';
import { HiOutlineCursorClick } from 'react-icons/hi';
import { ImSpinner6 } from 'react-icons/im';
import { LuLayers } from 'react-icons/lu';
import { MdOutlineList } from 'react-icons/md';
import { RiImageLine, RiLayoutMasonryLine } from 'react-icons/ri';
import { TbTypography } from 'react-icons/tb';

import { createSearchIndex, type SearchComponent, type SearchResult } from './searchData';

export type MatchTier = 'best' | 'related' | 'description';

export interface TieredResult {
  component: SearchComponent;
  tier: MatchTier;
  matchedRelated?: string;
  matches?: ReadonlyArray<Fuse.FuseResultMatch>;
}

interface SearchOutput {
  results: Array<TieredResult>;
  resultCount: number;
}

/** Classify a Fuse result into a match tier based on which field matched */
const classifyResult = (result: SearchResult): TieredResult => {
  const matchedKeys = result.matches?.map((m) => m.key) ?? [];

  if (matchedKeys.includes('name')) {
    return { component: result.item, tier: 'best', matches: result.matches };
  }

  if (matchedKeys.includes('related')) {
    const relatedMatch = result.matches?.find((m) => m.key === 'related');
    return {
      component: result.item,
      tier: 'related',
      matchedRelated: relatedMatch?.value,
      matches: result.matches,
    };
  }

  return { component: result.item, tier: 'description', matches: result.matches };
};

/** Hook: search components with tiered results */
export const useComponentSearch = (query: string): SearchOutput => {
  const fuse = useMemo(() => createSearchIndex(), []);

  return useMemo(() => {
    if (!query.trim()) {
      return { results: [], resultCount: 0 };
    }

    const raw = fuse.search(query, { limit: 20 });
    const results = raw.map(classifyResult);
    return { results, resultCount: results.length };
  }, [fuse, query]);
};

/** Navigate to a Storybook story */
export const navigateToStory = (storyPath: string): void => {
  const target = window.top ?? window;
  const url = new URL(target.location.href);
  url.searchParams.set('path', storyPath);
  target.location.href = url.toString();
};

// ─── Click Tracking ──────────────────────────────────────────────

const STORAGE_KEY = 'rocket-search-clicks';
const MAX_DISPLAYED = 5;

const readClicks = (): Record<string, number> => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
};

const writeClicks = (data: Record<string, number>): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {}
};

/** Hook: track component clicks and return top names for suggestions */
export const useClickTracking = () => {
  const [clicks, setClicks] = useState<Record<string, number>>(readClicks);

  const topNames = useMemo(() => {
    const entries = Object.entries(clicks);
    return entries
      .sort(([, a], [, b]) => b - a)
      .slice(0, MAX_DISPLAYED)
      .map(([name]) => name);
  }, [clicks]);

  const recordClick = useCallback((name: string) => {
    setClicks((prev) => {
      const next = { ...prev, [name]: (prev[name] ?? 0) + 1 };
      writeClicks(next);
      return next;
    });
  }, []);

  return { topNames, recordClick };
};

/** Category → icon mapping */
export const CATEGORY_ICONS: Record<string, IconType> = {
  Layout: RiLayoutMasonryLine,
  Form: HiOutlineCursorClick,
  Overlay: LuLayers,
  Display: MdOutlineList,
  Feedback: ImSpinner6,
  Typography: TbTypography,
  Navigation: AiOutlineLink,
  Media: RiImageLine,
  Disclosure: BiHide,
};

/** Category → color palette mapping */
export const CATEGORY_COLOR: Record<string, string> = {
  Layout: 'blue',
  Form: 'green',
  Overlay: 'purple',
  Display: 'orange',
  Feedback: 'yellow',
  Typography: 'cyan',
  Navigation: 'teal',
  Media: 'pink',
  Disclosure: 'red',
};

// ─── Category Grouping ──────────────────────────────────────────

const CATEGORY_ORDER = [
  'Layout',
  'Form',
  'Overlay',
  'Display',
  'Feedback',
  'Typography',
  'Navigation',
  'Media',
  'Disclosure',
];

export interface CategoryGroup {
  category: string;
  items: Array<TieredResult>;
}

/** Group tiered results by component category in a stable order */
export const groupByCategory = (items: Array<TieredResult>): Array<CategoryGroup> => {
  const map = new Map<string, Array<TieredResult>>();
  for (const item of items) {
    const cat = item.component.category;
    if (!map.has(cat)) {
      map.set(cat, []);
    }
    map.get(cat)?.push(item);
  }
  return CATEGORY_ORDER.filter((cat) => map.has(cat)).map((cat) => ({
    category: cat,
    items: map.get(cat)?.sort((a, b) => a.component.name.localeCompare(b.component.name)),
  }));
};

/** Accessible result count label for live region */
export const resultCountLabel = (count: number, query: string): string => {
  if (!query.trim()) {
    return `${count} suggested components`;
  }
  if (count === 0) {
    return `No results for ${query}`;
  }
  return `${count} result${count !== 1 ? 's' : ''} for ${query}`;
};
