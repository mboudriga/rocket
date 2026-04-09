import { Skeleton as ChakraSkeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react';

import type { SkeletonProps } from './Skeleton.types';

const Skeleton = ({
  ref,
  ...props
}: SkeletonProps & {
  ref?: React.Ref<HTMLDivElement>;
}) => {
  const isLoading = props.loading === true || undefined;
  return <ChakraSkeleton ref={ref} aria-hidden={isLoading} aria-busy={isLoading} {...props} />;
};

const SkeletonNotation = Object.assign(Skeleton, {
  Circle: SkeletonCircle,
  Text: SkeletonText,
});

export { SkeletonNotation as Skeleton };
