import { Docs } from '../../templates';

// Match the exported name to the name in the title (removes the sidebar sub-folder)
export const How_To_Style = () => (
  <Docs.Template title="How To Style">
    <Docs.Code title="Style Props" code={STYLING_CODE}>
      All @rocket/ui components accept styles as props, but passing styles directly as props can
      pollute the JSX. To avoid this we define the styles in objects and destructure them into the
      components. This also lets styles be re-used and extended. You can import StyleProps to type
      the styles.
    </Docs.Code>

    <Docs.Code title="Dynamic Styles" code={STYLING_DYNAMIC_CODE}>
      If you need to dynamically update the styles, use a function which returns an object.
    </Docs.Code>

    <Docs.Code title="Inline Styles" language="javascript" code={STYLING_INLINE_PROP}>
      If you're applying two or less styles then it is not considered clutter, and you can pass them
      directly as props. You may still want to define them if they get reused though.
    </Docs.Code>

    <Docs.Code title="Extending Styles" code={STYLING_DESTRUCTURED}>
      You can extend styles by destructuring.
    </Docs.Code>
  </Docs.Template>
);

export default {
  title: 'Documentation/Usage/How To Style',
  component: How_To_Style,
};

const STYLING_CODE = `import { Box, StyleProps } from '@rocket/ui';

<Box {...BoxStyles} />;

const BoxStyles: StyleProps = {
    height: '100%'
    width: '100%',
    background: 'green.600',
};`;

const STYLING_DYNAMIC_CODE = `import { Box, StyleProps } from '@rocket/ui';

<Box {...BoxStyles(params)} />;

const BoxStyles = (params): StyleProps => {
    return {
        height: condition ? '50%' : '100%',
        width: condition ? '50%' : '100%',
        background: 'green.600',
    };
};`;

const STYLING_INLINE_PROP = `import { Box, StyleProps } from '@rocket/ui';

<Box height="100%" width="100%" />;`;

const STYLING_DESTRUCTURED = `import { Box, StyleProps } from '@rocket/ui';

<Box {...BoxStyles} />;
<Box {...ExtendedBoxStyles} />;

const BoxStyles: StyleProps = {
    height: '100%'
    width: '100%',
    background: 'green.600',
};

const ExtendedBoxStyles: StyleProps = {
  ...BoxStyles,
  height: '50%'
  border: '1px solid',
  borderRadius: 'md',
};`;
