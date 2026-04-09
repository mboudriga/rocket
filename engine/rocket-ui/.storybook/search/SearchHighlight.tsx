import type { FuseResultMatch, RangeTuple } from 'fuse.js';

import { Box } from '../../src';

interface HighlightRange {
  start: number;
  end: number;
}

function mergeOverlappingRanges(ranges: Array<HighlightRange>): Array<HighlightRange> {
  if (ranges.length <= 1) {
    return ranges;
  }

  const sorted = [...ranges].sort((a, b) => a.start - b.start);
  const first = sorted[0];
  if (!first) {
    return ranges;
  }

  const merged: Array<HighlightRange> = [first];

  for (let i = 1; i < sorted.length; i++) {
    const current = sorted[i];
    const last = merged[merged.length - 1];
    if (!current || !last) {
      continue;
    }

    if (current.start <= last.end) {
      last.end = Math.max(last.end, current.end);
    } else {
      merged.push(current);
    }
  }

  return merged;
}

function getHighlightRanges(
  matches: ReadonlyArray<FuseResultMatch> | undefined,
  key: string
): Array<HighlightRange> {
  if (!matches) {
    return [];
  }

  const match = matches.find((m) => m.key === key);
  if (!match?.indices) {
    return [];
  }

  const ranges = match.indices.map((tuple: RangeTuple) => ({
    start: tuple[0],
    end: tuple[1] + 1,
  }));

  return mergeOverlappingRanges(ranges);
}

function highlightText(
  text: string,
  ranges: Array<HighlightRange>
): Array<{ text: string; highlighted: boolean }> {
  if (ranges.length === 0) {
    return [{ text, highlighted: false }];
  }

  const sortedRanges = [...ranges].sort((a, b) => a.start - b.start);
  const segments: Array<{ text: string; highlighted: boolean }> = [];
  let lastEnd = 0;

  for (const range of sortedRanges) {
    if (range.start > lastEnd) {
      segments.push({ text: text.slice(lastEnd, range.start), highlighted: false });
    }
    segments.push({ text: text.slice(range.start, range.end), highlighted: true });
    lastEnd = range.end;
  }

  if (lastEnd < text.length) {
    segments.push({ text: text.slice(lastEnd), highlighted: false });
  }

  return segments;
}

// ─── Component ──────────────────────────────────────────────────

interface SearchHighlightProps {
  text: string;
  matches?: ReadonlyArray<FuseResultMatch>;
  matchKey: string;
}

export function SearchHighlight({ text, matches, matchKey }: SearchHighlightProps) {
  const ranges = getHighlightRanges(matches, matchKey);
  const segments = highlightText(text, ranges);

  return (
    <>
      {segments.map((segment, index) =>
        segment.highlighted ? (
          <Box
            key={index}
            as="mark"
            bg="yellow.200"
            color="inherit"
            px="0.5"
            borderRadius="sm"
            _dark={{ bg: 'yellow.800', color: 'yellow.100' }}
          >
            {segment.text}
          </Box>
        ) : (
          <span key={index}>{segment.text}</span>
        )
      )}
    </>
  );
}
