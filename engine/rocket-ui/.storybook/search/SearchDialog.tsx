import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  LuArrowDown,
  LuArrowRight,
  LuArrowUp,
  LuCornerDownLeft,
  LuSearch,
  LuX,
} from 'react-icons/lu';

import { Badge, Box, Center, Dialog, Flex, Icon, Key, Text } from '../../src';
import {
  CATEGORY_COLOR,
  CATEGORY_ICONS,
  groupByCategory,
  type MatchTier,
  navigateToStory,
  resultCountLabel,
  type TieredResult,
  useClickTracking,
  useComponentSearch,
} from './SearchDialog.utils';
import { SearchHighlight } from './SearchHighlight';
import { SEARCH_COMPONENTS } from './searchData';

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const TIER_CONFIG: Record<MatchTier, { label: string; color: string }> = {
  best: { label: 'Best Matches', color: 'green' },
  related: { label: 'Related', color: 'blue' },
  description: { label: 'Similar', color: 'gray' },
};

const RESULTS_ID = 'search-results-listbox';

export const SearchDialog = ({ open, onOpenChange }: SearchDialogProps) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [bouncing, setBouncing] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  const { results } = useComponentSearch(query);
  const { topNames, recordClick } = useClickTracking();

  // Build suggested components for empty state
  const suggested = useMemo(
    () => topNames.map((name) => SEARCH_COMPONENTS.find((c) => c.name === name)).filter(Boolean),
    [topNames]
  );

  // Flat list for keyboard navigation (tier → category → Fuse relevance)
  const flatResults: Array<TieredResult> = useMemo(() => {
    if (!query.trim()) {
      return suggested.map((c) => ({ component: c!, tier: 'best' as MatchTier }));
    }
    // Re-order results: within each tier, group by category
    const tiers: Array<MatchTier> = ['best', 'related', 'description'];
    const byTier: Record<MatchTier, Array<TieredResult>> = {
      best: [],
      related: [],
      description: [],
    };
    for (const r of results) {
      byTier[r.tier].push(r);
    }
    return tiers.flatMap((tier) => groupByCategory(byTier[tier]).flatMap((g) => g.items));
  }, [query, results, suggested]);

  // Reset selection when results change
  useEffect(() => setSelectedIndex(0), []);

  // Reset query when dialog opens
  useEffect(() => {
    if (open) {
      setQuery('');
      setSelectedIndex(0);
      setBouncing(-1);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  const close = useCallback(() => onOpenChange(false), [onOpenChange]);

  const handleSelect = useCallback(
    (index: number) => {
      const item = flatResults[index];
      if (!item) {
        return;
      }

      recordClick(item.component.name);

      // Bounce micro-interaction
      setBouncing(index);
      setTimeout(() => {
        setBouncing(-1);
        close();
        requestAnimationFrame(() => navigateToStory(item.component.storyPath));
      }, 100);
    },
    [flatResults, close, recordClick]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const len = flatResults.length;
      if (!len) {
        return;
      }

      switch (e.key) {
        case 'ArrowDown': {
          e.preventDefault();
          const next = (selectedIndex + 1) % len;
          setSelectedIndex(next);
          document.getElementById(`search-result-${next}`)?.scrollIntoView({ block: 'nearest' });
          break;
        }
        case 'ArrowUp': {
          e.preventDefault();
          const prev = (selectedIndex - 1 + len) % len;
          setSelectedIndex(prev);
          document.getElementById(`search-result-${prev}`)?.scrollIntoView({ block: 'nearest' });
          break;
        }
        case 'Enter':
          e.preventDefault();
          handleSelect(selectedIndex);
          break;
      }
    },
    [flatResults.length, selectedIndex, handleSelect]
  );

  // Group results by tier for display
  const grouped = useMemo(() => {
    const groups: Record<MatchTier, Array<TieredResult>> = {
      best: [],
      related: [],
      description: [],
    };
    for (const r of flatResults) {
      groups[r.tier].push(r);
    }
    return groups;
  }, [flatResults]);

  // Map from flat index to tier+index for rendering
  let flatIndex = 0;

  return (
    <Dialog
      open={open}
      onOpenChange={({ open: isOpen }) => onOpenChange(isOpen)}
      placement="top"
      size="lg"
      closeOnEscape
      closeOnInteractOutside
      motionPreset="slide-in-top"
      trapFocus
      bodyProps={{ unstyled: true }}
    >
      <Flex.V gap={0} onKeyDown={handleKeyDown}>
        {/* Search input */}
        <Flex.H
          alignItems="center"
          gap={3}
          paddingX={4}
          paddingY={3}
          borderBottomWidth="1px"
          borderColor={{ base: 'rgba(28,27,26,0.08)', _dark: 'rgba(255,255,255,0.08)' }}
        >
          <Icon as={LuSearch} boxSize="5" color="fg.muted" flexShrink={0} />
          <Box
            as="input"
            ref={inputRef}
            value={query}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
            placeholder="Search components..."
            flex="1"
            bg="transparent"
            border="none"
            outline="none"
            fontSize="md"
            color="fg"
            _placeholder={{ color: 'fg.subtle' }}
            role="searchbox"
            aria-autocomplete="list"
            aria-controls={RESULTS_ID}
            aria-activedescendant={
              flatResults.length > 0 ? `search-result-${selectedIndex}` : undefined
            }
          />
          {query && (
            <Box
              as="button"
              onClick={() => {
                setQuery('');
                inputRef.current?.focus();
              }}
              cursor="pointer"
              color="fg.muted"
              _hover={{ color: 'fg' }}
              flexShrink={0}
              aria-label="Clear search"
            >
              <Icon as={LuX} boxSize="4" />
            </Box>
          )}
        </Flex.H>

        {/* Results */}
        <Box
          id={RESULTS_ID}
          role="listbox"
          aria-label="Search results"
          overflowY="auto"
          maxHeight="60vh"
          paddingTop={2}
          data-search-results=""
        >
          {flatResults.length === 0 && query.trim() ? (
            <Center paddingY={10}>
              <Flex.V alignItems="center" gap={2}>
                <Text color="fg.muted" fontWeight="medium">
                  No results for &ldquo;{query}&rdquo;
                </Text>
                <Text color="fg.subtle" fontSize="sm">
                  Try a shorter name or check spelling
                </Text>
                <Box
                  as="button"
                  marginTop={2}
                  fontSize="sm"
                  color="blue.fg"
                  cursor="pointer"
                  _hover={{ textDecoration: 'underline' }}
                  onClick={() => {
                    setQuery('');
                    inputRef.current?.focus();
                  }}
                >
                  <Flex.H alignItems="center" gap={1}>
                    <Text>Browse all components</Text>
                    <Icon as={LuArrowRight} boxSize="3.5" />
                  </Flex.H>
                </Box>
              </Flex.V>
            </Center>
          ) : (
            <>
              {!query.trim() && flatResults.length > 0 && (
                <SectionHeader label="Suggested" id="section-suggested" />
              )}

              {(['best', 'related', 'description'] as Array<MatchTier>).map((tier) => {
                const items = grouped[tier];
                if (!items.length) {
                  return null;
                }
                const config = TIER_CONFIG[tier];
                const sectionId = `section-${tier}`;
                const categoryGroups = groupByCategory(items);

                return (
                  <Box
                    key={tier}
                    role="group"
                    aria-labelledby={query.trim() ? sectionId : undefined}
                  >
                    {query.trim() && tier !== 'best' && (
                      <Box
                        height="1px"
                        bg={{ base: 'rgba(28,27,26,0.08)', _dark: 'rgba(255,255,255,0.08)' }}
                        marginX={4}
                        marginY={2}
                      />
                    )}
                    {query.trim() && (
                      <SectionHeader
                        label={config.label}
                        id={sectionId}
                        count={items.length}
                        countColor={config.color}
                        marginTop={tier === 'best' ? 0 : 1}
                      />
                    )}

                    {categoryGroups.map(({ category, items: catItems }) => (
                      <Box key={category}>
                        {catItems.map((item) => {
                          const idx = flatIndex++;
                          const isSelected = idx === selectedIndex;

                          return (
                            <ResultRow
                              key={item.component.name}
                              item={item}
                              index={idx}
                              isSelected={isSelected}
                              isBouncing={bouncing === idx}
                              onClick={() => handleSelect(idx)}
                              onMouseEnter={() => setSelectedIndex(idx)}
                            />
                          );
                        })}
                      </Box>
                    ))}
                  </Box>
                );
              })}
            </>
          )}
        </Box>

        {/* Live region for screen readers */}
        <Box
          position="absolute"
          width="1px"
          height="1px"
          overflow="hidden"
          clip="rect(0,0,0,0)"
          role="status"
          aria-live="polite"
        >
          {resultCountLabel(flatResults.length, query)}
        </Box>

        {/* Footer */}
        <Flex.H
          alignItems="center"
          gap={4}
          paddingX={4}
          paddingY={2}
          borderTopWidth="1px"
          borderColor={{ base: 'rgba(28,27,26,0.08)', _dark: 'rgba(255,255,255,0.08)' }}
          fontSize="xs"
          color="fg.subtle"
        >
          <Flex.H alignItems="center" gap={1}>
            <Icon as={LuArrowUp} boxSize="3" />
            <Icon as={LuArrowDown} boxSize="3" />
            <Text>Navigate</Text>
          </Flex.H>

          <Flex.H alignItems="center" gap={1}>
            <Icon as={LuCornerDownLeft} boxSize="3" />
            <Text>Open</Text>
          </Flex.H>

          <Flex.H alignItems="center" gap={1}>
            <Key size="sm">esc</Key>
            <Text>Close</Text>
          </Flex.H>

          <Text marginLeft="auto">{flatResults.length} components</Text>
        </Flex.H>
      </Flex.V>
    </Dialog>
  );
};

// ─── Section Header ────────────────────────────────────────────────

interface SectionHeaderProps {
  label: string;
  id: string;
  count?: number;
  countColor?: string;
  marginTop?: number;
}

const SectionHeader = ({ label, id, count, countColor, marginTop = 0 }: SectionHeaderProps) => (
  <Flex.H id={id} alignItems="center" gap={2} paddingX={4} paddingY={1} marginTop={marginTop}>
    <Text
      fontSize="xs"
      fontWeight="semibold"
      color="fg"
      textTransform="uppercase"
      letterSpacing="0.05em"
    >
      {label}
    </Text>
    {count != null && (
      <Badge size="xs" colorPalette={countColor} variant="subtle">
        {count}
      </Badge>
    )}
  </Flex.H>
);

// ─── Result Row ──────────────────────────────────────────────────

interface ResultRowProps {
  item: TieredResult;
  index: number;
  isSelected: boolean;
  isBouncing: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
}

const ResultRow = ({
  item,
  index,
  isSelected,
  isBouncing,
  onClick,
  onMouseEnter,
}: ResultRowProps) => {
  const { component, tier, matchedRelated } = item;
  const color = CATEGORY_COLOR[component.category] ?? 'gray';
  const CategoryIcon = CATEGORY_ICONS[component.category];

  return (
    <Flex.H
      id={`search-result-${index}`}
      role="option"
      aria-selected={isSelected}
      alignItems="center"
      gap={3}
      marginX={2}
      paddingX={3}
      paddingY={2}
      minHeight="44px"
      borderRadius="md"
      cursor="pointer"
      bg={
        isSelected ? { base: 'rgba(28,27,26,0.06)', _dark: 'rgba(255,255,255,0.1)' } : 'transparent'
      }
      _hover={{ bg: { base: 'rgba(28,27,26,0.04)', _dark: 'rgba(255,255,255,0.06)' } }}
      transition="background 80ms"
      transform={isBouncing ? 'scale(0.97)' : undefined}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
    >
      {/* Category icon */}
      {CategoryIcon && (
        <Center
          boxSize="8"
          borderRadius="md"
          flexShrink={0}
          colorPalette={color}
          bg="colorPalette.subtle"
        >
          <Icon as={CategoryIcon} boxSize="4" color="colorPalette.fg" />
        </Center>
      )}

      <Flex.V gap={0.5} flex="1" minWidth={0}>
        <Flex.H alignItems="center" gap={2}>
          <Text fontWeight="semibold" fontSize="sm" truncate>
            <SearchHighlight text={component.name} matches={item.matches} matchKey="name" />
          </Text>
          <Badge size="xs" colorPalette={color} variant="subtle">
            {component.category}
          </Badge>
        </Flex.H>

        <Text fontSize="xs" color="fg.muted" truncate>
          <SearchHighlight
            text={component.description}
            matches={item.matches}
            matchKey="description"
          />
        </Text>

        {tier === 'related' && matchedRelated && (
          <Text fontSize="xs" color="blue.fg" truncate>
            Related to{' '}
            <SearchHighlight text={matchedRelated} matches={item.matches} matchKey="related" />
          </Text>
        )}
      </Flex.V>

      {/* Trailing arrow on selected row */}
      {isSelected && <Icon as={LuArrowRight} boxSize="4" color="fg.subtle" flexShrink={0} />}
    </Flex.H>
  );
};
