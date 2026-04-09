import { FaChevronRight } from 'react-icons/fa';
import {
  Box,
  Center,
  Flex,
  type FlexProps,
  Grid,
  type GridProps,
  Icon,
  type StyleProps,
  Text,
} from '../../../src';

import { EXTERNAL_LINKS } from './WelcomeLinks.utils';

const EASING = 'cubic-bezier(0.22,1,0.36,1)';

export const WelcomeLinks = () => {
  const renderLinks =
    EXTERNAL_LINKS?.map(({ name, description, link, icon, iconComponent: IconComponent }) => (
      <a
        key={name}
        href={link}
        target="_blank"
        rel="noreferrer"
        aria-label={`${name} documentation (opens in new tab)`}
        style={{ textDecoration: 'none', color: 'inherit' }}
      >
        <Flex.V {...LinkBoxStyles}>
          <Center {...IconStyles} className="link-icon">
            {IconComponent ? <IconComponent /> : <Icon as={icon} boxSize="7" />}
          </Center>

          <Text fontSize="xl" fontWeight="medium">
            {name}
          </Text>

          <Text color="fg.muted" fontSize="sm" lineHeight="tall">
            {description}
          </Text>

          <Flex.H alignItems="center" gap={2} className="link-cta" color="red.fg">
            <Box
              className="link-arrow"
              display="inline-flex"
              transition={`transform 0.2s ${EASING}`}
            >
              <FaChevronRight size={10} />
            </Box>
            <Text fontSize="sm" fontWeight="medium">
              View docs
            </Text>
          </Flex.H>
        </Flex.V>
      </a>
    )) || null;

  return (
    <>
      <Text marginTop={16} {...TitleStyles}>
        External Documentation
      </Text>

      <Grid
        columns={{ base: 1, tabletLG: 2, desktopMD: 3, desktopLG: 4 } as GridProps['columns']}
        columnGap={10}
        rowGap={6}
      >
        {renderLinks}
      </Grid>
    </>
  );
};

const TitleStyles: StyleProps = {
  fontSize: 'xl',
  fontWeight: 'medium',
  lineHeight: '0.7',
  marginBottom: 8,
};

const LinkBoxStyles: FlexProps = {
  gap: 3,
  padding: 5,
  borderRadius: 'xl',
  bg: 'bg.surface',
  cursor: 'pointer',
  transition: `transform 0.2s ${EASING}, box-shadow 0.25s ${EASING}`,
  css: {
    '&:hover': {
      transform: 'translateY(-3px)',
      boxShadow:
        '0 8px 24px rgba(0,0,0,0.1), 0 4px 16px color-mix(in srgb, var(--chakra-colors-red-solid) 15%, transparent)',
    },
    '&:active': {
      transform: 'translateY(0)',
      transition: 'transform 0.1s',
    },
    '&:hover .link-icon': {
      transform: 'scale(1.08)',
      background: 'var(--chakra-colors-red-subtle)',
      color: 'var(--chakra-colors-red-fg)',
    },
    '&:hover .link-cta': {
      color: 'var(--chakra-colors-red-fg)',
    },
    '&:hover .link-arrow': {
      transform: 'translateX(3px)',
    },
  },
};

const IconStyles: StyleProps = {
  width: 'fit-content',
  bg: 'bg.muted',
  padding: 3,
  borderRadius: 'lg',
  transition: `all 0.2s ${EASING}`,
};
