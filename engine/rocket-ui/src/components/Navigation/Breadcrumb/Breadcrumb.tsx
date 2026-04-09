import { Breadcrumb as ChakraBreadcrumb } from '@chakra-ui/react';
import { Fragment, useMemo } from 'react';
import type { StyleProps } from '../../../types';

import type { BreadcrumbProps } from './Breadcrumb.types';

const Breadcrumb = ({
  ref,
  items,
  separator,
  ...props
}: BreadcrumbProps & {
  ref?: React.Ref<HTMLElement>;
}) => {
  const breadcrumbItems = useMemo(
    () =>
      items?.map(({ label, href, current }, index) => (
        <Fragment key={`${label}-${index}`}>
          <ChakraBreadcrumb.Item>
            <ChakraBreadcrumb.Link href={href} aria-current={current ? 'page' : undefined}>
              {label}
            </ChakraBreadcrumb.Link>
          </ChakraBreadcrumb.Item>
          {index < (items?.length || 0) - 1 && (
            <ChakraBreadcrumb.Separator>{separator}</ChakraBreadcrumb.Separator>
          )}
        </Fragment>
      )) || null,
    [items, separator]
  );

  const pathLabel = items?.map((item) => item.label).join(' / ');
  const ariaLabel = pathLabel ? `Breadcrumb: ${pathLabel}` : 'Breadcrumb';

  return (
    <ChakraBreadcrumb.Root ref={ref} aria-label={ariaLabel} {...BreadcrumbStyles} {...props}>
      <ChakraBreadcrumb.List>{breadcrumbItems}</ChakraBreadcrumb.List>
    </ChakraBreadcrumb.Root>
  );
};

const BreadcrumbStyles: StyleProps = {};

export { Breadcrumb };
