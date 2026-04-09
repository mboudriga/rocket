import Fuse from 'fuse.js';

export interface SearchComponent {
  name: string;
  category: string;
  description: string;
  related: Array<string>;
  storyPath: string;
}

export type SearchResult = Fuse.FuseResult<SearchComponent>;

const storyPath = (category: string, name: string): string =>
  `/story/components-${category.toLowerCase()}-${name.toLowerCase()}--component`;

// ─── Layout ──────────────────────────────────────────────────────────
const LAYOUT: Array<SearchComponent> = [
  {
    name: 'Box',
    category: 'Layout',
    description: 'Base layout primitive that renders a div with all style props.',
    related: ['Flex', 'Grid', 'Center', 'Circle'],
    storyPath: storyPath('layout', 'box'),
  },
  {
    name: 'Flex',
    category: 'Layout',
    description:
      'One-dimensional flexbox layout with Flex.V and Flex.H sub-components. Supports the polymorphic as prop for semantic HTML.',
    related: ['Grid', 'Center', 'Wrap', 'Splitter', 'Box'],
    storyPath: storyPath('layout', 'flex'),
  },
  {
    name: 'Grid',
    category: 'Layout',
    description: 'Two-dimensional CSS Grid layout for rows and columns.',
    related: ['Flex', 'Center', 'Wrap', 'Splitter', 'Box'],
    storyPath: storyPath('layout', 'grid'),
  },
  {
    name: 'Center',
    category: 'Layout',
    description: 'Centers its child both horizontally and vertically.',
    related: ['Flex', 'Circle', 'Box', 'EmptyState'],
    storyPath: storyPath('layout', 'center'),
  },
  {
    name: 'Circle',
    category: 'Layout',
    description: 'Renders a circular container with a fixed size.',
    related: ['Avatar', 'Badge', 'Center', 'Float', 'ProgressCircle'],
    storyPath: storyPath('layout', 'circle'),
  },
  {
    name: 'Divider',
    category: 'Layout',
    description: 'Visual separator line between content sections.',
    related: ['Flex', 'Fieldset', 'Card', 'Toolbar'],
    storyPath: storyPath('layout', 'divider'),
  },
  {
    name: 'Float',
    category: 'Layout',
    description: 'Positions a child element floating relative to its parent.',
    related: ['Circle', 'Badge', 'Avatar', 'Box'],
    storyPath: storyPath('layout', 'float'),
  },
  {
    name: 'ScrollArea',
    category: 'Layout',
    description: 'Scrollable container with a max height constraint.',
    related: ['Splitter', 'Carousel', 'Box', 'Flex'],
    storyPath: storyPath('layout', 'scrollarea'),
  },
  {
    name: 'Splitter',
    category: 'Layout',
    description: 'Resizable split panels with a drag handle.',
    related: ['Flex', 'Grid', 'Tabs', 'ScrollArea'],
    storyPath: storyPath('layout', 'splitter'),
  },
  {
    name: 'Wrap',
    category: 'Layout',
    description: 'Flex container that wraps children to the next line when they overflow.',
    related: ['Flex', 'Grid', 'Tag', 'Badge'],
    storyPath: storyPath('layout', 'wrap'),
  },
];

// ─── Form ────────────────────────────────────────────────────────────
const FORM: Array<SearchComponent> = [
  {
    name: 'Button',
    category: 'Form',
    description:
      'Triggers actions like form submissions, opening overlays, or confirming operations.',
    related: ['IconButton', 'Link', 'Switch', 'SegmentedControl'],
    storyPath: storyPath('form', 'button'),
  },
  {
    name: 'IconButton',
    category: 'Form',
    description: 'Icon-only button for compact actions that require an accessibility label.',
    related: ['Button', 'Toolbar', 'Menu', 'Tooltip'],
    storyPath: storyPath('form', 'iconbutton'),
  },
  {
    name: 'Input',
    category: 'Form',
    description: 'Single-line text input with integrated label, hint, and error props.',
    related: ['Textarea', 'PasswordInput', 'NumberInput', 'Select', 'TagsInput'],
    storyPath: storyPath('form', 'input'),
  },
  {
    name: 'Textarea',
    category: 'Form',
    description: 'Multi-line text input with resize control and integrated field props.',
    related: ['Input', 'RichTextEditor', 'Editable'],
    storyPath: storyPath('form', 'textarea'),
  },
  {
    name: 'PasswordInput',
    category: 'Form',
    description: 'Password field with built-in visibility toggle button.',
    related: ['Input', 'PinInput'],
    storyPath: storyPath('form', 'passwordinput'),
  },
  {
    name: 'NumberInput',
    category: 'Form',
    description: 'Numeric input with increment/decrement buttons and min/max constraints.',
    related: ['Input', 'Slider', 'Rating', 'PinInput'],
    storyPath: storyPath('form', 'numberinput'),
  },
  {
    name: 'PinInput',
    category: 'Form',
    description: 'Individual character input fields for PIN codes and OTP verification.',
    related: ['Input', 'PasswordInput', 'NumberInput'],
    storyPath: storyPath('form', 'pininput'),
  },
  {
    name: 'Select',
    category: 'Form',
    description: 'Dropdown list for choosing one option from a predefined set.',
    related: ['Combobox', 'RadioGroup', 'SegmentedControl', 'Listbox', 'TagsInput'],
    storyPath: storyPath('form', 'select'),
  },
  {
    name: 'Combobox',
    category: 'Form',
    description: 'Searchable dropdown with type-ahead filtering for large option sets.',
    related: ['Select', 'TagsInput', 'Listbox', 'Input'],
    storyPath: storyPath('form', 'combobox'),
  },
  {
    name: 'Checkbox',
    category: 'Form',
    description: 'Boolean toggle for accepting terms, enabling features, or multi-select lists.',
    related: ['Switch', 'RadioGroup', 'Listbox', 'SegmentedControl'],
    storyPath: storyPath('form', 'checkbox'),
  },
  {
    name: 'Switch',
    category: 'Form',
    description: 'Toggle switch for binary on/off settings with immediate effect.',
    related: ['Checkbox', 'RadioGroup', 'SegmentedControl', 'Button'],
    storyPath: storyPath('form', 'switch'),
  },
  {
    name: 'RadioGroup',
    category: 'Form',
    description: 'Mutually exclusive option selection displayed as a visible list of choices.',
    related: ['Select', 'SegmentedControl', 'Combobox', 'Checkbox', 'Listbox'],
    storyPath: storyPath('form', 'radiogroup'),
  },
  {
    name: 'Slider',
    category: 'Form',
    description: 'Draggable range input for selecting numeric values or ranges.',
    related: ['NumberInput', 'Rating', 'SegmentedControl', 'Progress'],
    storyPath: storyPath('form', 'slider'),
  },
  {
    name: 'Rating',
    category: 'Form',
    description: 'Star-based rating input for collecting or displaying scores.',
    related: ['Slider', 'NumberInput', 'Progress', 'Badge'],
    storyPath: storyPath('form', 'rating'),
  },
  {
    name: 'DatePicker',
    category: 'Form',
    description: 'Calendar-based date selection for single dates, ranges, or datetimes.',
    related: ['Input', 'Select', 'NumberInput'],
    storyPath: storyPath('form', 'datepicker'),
  },
  {
    name: 'ColorPicker',
    category: 'Form',
    description: 'Color selection input with swatch, spectrum, and value editing.',
    related: ['ColorSwatch', 'Select', 'RadioGroup', 'Badge'],
    storyPath: storyPath('form', 'colorpicker'),
  },
  {
    name: 'FileUpload',
    category: 'Form',
    description: 'File input with drag-and-drop support and file type filtering.',
    related: ['Input', 'Avatar', 'Image'],
    storyPath: storyPath('form', 'fileupload'),
  },
  {
    name: 'TagsInput',
    category: 'Form',
    description: 'Multi-value input where users type and press Enter to add tags.',
    related: ['Select', 'Combobox', 'Listbox', 'Tag', 'Input'],
    storyPath: storyPath('form', 'tagsinput'),
  },
  {
    name: 'Listbox',
    category: 'Form',
    description:
      'Visible list of selectable items for single or multi-select with optional grouping.',
    related: ['Select', 'Combobox', 'Checkbox', 'RadioGroup', 'List'],
    storyPath: storyPath('form', 'listbox'),
  },
  {
    name: 'SegmentedControl',
    category: 'Form',
    description: 'Horizontal button group for switching between mutually exclusive views.',
    related: ['Tabs', 'RadioGroup', 'Switch', 'Button'],
    storyPath: storyPath('form', 'segmentedcontrol'),
  },
  {
    name: 'Editable',
    category: 'Form',
    description: 'Inline text that becomes an input on click for in-place editing.',
    related: ['Input', 'Textarea', 'RichTextEditor'],
    storyPath: storyPath('form', 'editable'),
  },
  {
    name: 'FieldWrapper',
    category: 'Form',
    description: 'Standalone wrapper that adds label, hint, and error to custom form elements.',
    related: ['Fieldset', 'Input', 'Form', 'Alert'],
    storyPath: storyPath('form', 'fieldwrapper'),
  },
  {
    name: 'Fieldset',
    category: 'Form',
    description: 'Groups related form fields with a legend, helper text, and error text.',
    related: ['FieldWrapper', 'Form', 'Card', 'Accordion'],
    storyPath: storyPath('form', 'fieldset'),
  },
  {
    name: 'Form',
    category: 'Form',
    description: 'Form container that wraps fields and handles submission.',
    related: ['Fieldset', 'FieldWrapper', 'Button', 'Input'],
    storyPath: storyPath('form', 'form'),
  },
];

// ─── Overlay ─────────────────────────────────────────────────────────
const OVERLAY: Array<SearchComponent> = [
  {
    name: 'Dialog',
    category: 'Overlay',
    description: 'Focused overlay window that blocks background interaction until dismissed.',
    related: ['AlertDialog', 'Drawer', 'Popover', 'toast'],
    storyPath: storyPath('overlay', 'dialog'),
  },
  {
    name: 'AlertDialog',
    category: 'Overlay',
    description: 'Confirmation dialog for destructive or irreversible actions.',
    related: ['Dialog', 'Drawer', 'Alert', 'toast'],
    storyPath: storyPath('overlay', 'alertdialog'),
  },
  {
    name: 'Drawer',
    category: 'Overlay',
    description: 'Side panel that slides in for forms, navigation, or supplementary content.',
    related: ['Dialog', 'AlertDialog', 'Collapsible', 'Popover'],
    storyPath: storyPath('overlay', 'drawer'),
  },
  {
    name: 'Menu',
    category: 'Overlay',
    description: 'Dropdown action menu triggered by a button or icon.',
    related: ['ContextMenu', 'Menubar', 'Select', 'Popover', 'IconButton'],
    storyPath: storyPath('overlay', 'menu'),
  },
  {
    name: 'ContextMenu',
    category: 'Overlay',
    description: 'Right-click menu for contextual actions on an element.',
    related: ['Menu', 'Menubar', 'Toolbar', 'Popover'],
    storyPath: storyPath('overlay', 'contextmenu'),
  },
  {
    name: 'Popover',
    category: 'Overlay',
    description: 'Click-triggered floating panel for forms, settings, or rich content.',
    related: ['Tooltip', 'HoverCard', 'Dialog', 'Menu'],
    storyPath: storyPath('overlay', 'popover'),
  },
  {
    name: 'Tooltip',
    category: 'Overlay',
    description: 'Hover-triggered hint for describing UI elements.',
    related: ['Popover', 'HoverCard', 'Alert', 'IconButton'],
    storyPath: storyPath('overlay', 'tooltip'),
  },
  {
    name: 'HoverCard',
    category: 'Overlay',
    description: 'Rich hover panel for previewing linked content like user profiles.',
    related: ['Tooltip', 'Popover', 'Card', 'Avatar'],
    storyPath: storyPath('overlay', 'hovercard'),
  },
  {
    name: 'ActionBar',
    category: 'Overlay',
    description: 'Floating bar that appears when items are selected for bulk actions.',
    related: ['Toolbar', 'Menu', 'Table', 'Checkbox'],
    storyPath: storyPath('overlay', 'actionbar'),
  },
  {
    name: 'Portal',
    category: 'Overlay',
    description: 'Renders children into a different DOM node outside the parent tree.',
    related: ['Dialog', 'Drawer', 'Tooltip', 'Popover'],
    storyPath: storyPath('overlay', 'portal'),
  },
];

// ─── Display ─────────────────────────────────────────────────────────
const DISPLAY: Array<SearchComponent> = [
  {
    name: 'Badge',
    category: 'Display',
    description: 'Compact label for status indicators, counts, or categories.',
    related: ['Tag', 'Circle', 'Float', 'Text'],
    storyPath: storyPath('display', 'badge'),
  },
  {
    name: 'Card',
    category: 'Display',
    description: 'Content container with optional header, body, and footer sections.',
    related: ['Box', 'Stat', 'DataList', 'Dialog', 'Accordion'],
    storyPath: storyPath('display', 'card'),
  },
  {
    name: 'Tag',
    category: 'Display',
    description: 'Removable label for user-created categories, filters, or selections.',
    related: ['Badge', 'TagsInput', 'Wrap', 'Checkbox'],
    storyPath: storyPath('display', 'tag'),
  },
  {
    name: 'Stat',
    category: 'Display',
    description: 'Displays a key metric with label, value, and optional trend indicator.',
    related: ['DataList', 'Card', 'Progress', 'Badge', 'Table'],
    storyPath: storyPath('display', 'stat'),
  },
  {
    name: 'Table',
    category: 'Display',
    description: 'Structured data display in rows and columns with sorting and custom cells.',
    related: ['DataList', 'List', 'Timeline', 'Menu', 'Badge'],
    storyPath: storyPath('display', 'table'),
  },
  {
    name: 'DataList',
    category: 'Display',
    description: 'Key-value pair display for detail views and summaries.',
    related: ['Table', 'Stat', 'List', 'Card', 'Timeline'],
    storyPath: storyPath('display', 'datalist'),
  },
  {
    name: 'Timeline',
    category: 'Display',
    description: 'Vertical sequence of events with status indicators and icons.',
    related: ['Steps', 'List', 'Table', 'DataList', 'Progress'],
    storyPath: storyPath('display', 'timeline'),
  },
  {
    name: 'List',
    category: 'Display',
    description: 'Styled list with optional icons and consistent formatting.',
    related: ['Listbox', 'DataList', 'Timeline', 'Table', 'Tag'],
    storyPath: storyPath('display', 'list'),
  },
  {
    name: 'Carousel',
    category: 'Display',
    description: 'Horizontally scrollable slide container with controls and indicators.',
    related: ['Image', 'ScrollArea', 'Tabs', 'Grid'],
    storyPath: storyPath('display', 'carousel'),
  },
  {
    name: 'ColorSwatch',
    category: 'Display',
    description: 'Small color preview circle for displaying color values.',
    related: ['ColorPicker', 'Circle', 'Badge', 'Avatar'],
    storyPath: storyPath('display', 'colorswatch'),
  },
  {
    name: 'QRCode',
    category: 'Display',
    description: 'Generates a QR code image from a string value.',
    related: ['Link', 'Clipboard', 'Image'],
    storyPath: storyPath('display', 'qrcode'),
  },
];

// ─── Feedback ────────────────────────────────────────────────────────
const FEEDBACK: Array<SearchComponent> = [
  {
    name: 'Alert',
    category: 'Feedback',
    description: 'Inline notification banner for contextual messages and warnings.',
    related: ['toast', 'AlertDialog', 'EmptyState', 'Badge'],
    storyPath: storyPath('feedback', 'alert'),
  },
  {
    name: 'EmptyState',
    category: 'Feedback',
    description: 'Placeholder for content areas with no data, with icon, title, and action.',
    related: ['Alert', 'Skeleton', 'Spinner', 'Center'],
    storyPath: storyPath('feedback', 'emptystate'),
  },
  {
    name: 'Spinner',
    category: 'Feedback',
    description: 'Animated loading indicator for pending operations.',
    related: ['Skeleton', 'Progress', 'ProgressCircle', 'Center'],
    storyPath: storyPath('feedback', 'spinner'),
  },
  {
    name: 'Skeleton',
    category: 'Feedback',
    description: 'Loading placeholder that mimics the shape of content being loaded.',
    related: ['Spinner', 'Progress', 'EmptyState', 'Alert'],
    storyPath: storyPath('feedback', 'skeleton'),
  },
  {
    name: 'Progress',
    category: 'Feedback',
    description: 'Horizontal progress bar for showing completion percentage.',
    related: ['ProgressCircle', 'Spinner', 'Slider', 'Steps', 'Rating'],
    storyPath: storyPath('feedback', 'progress'),
  },
  {
    name: 'ProgressCircle',
    category: 'Feedback',
    description: 'Circular progress indicator with optional value display.',
    related: ['Progress', 'Spinner', 'Stat', 'Rating', 'Circle'],
    storyPath: storyPath('feedback', 'progresscircle'),
  },
  {
    name: 'Clipboard',
    category: 'Feedback',
    description: 'Copy-to-clipboard component with button and feedback state.',
    related: ['Code', 'Input', 'Button', 'toast'],
    storyPath: storyPath('feedback', 'clipboard'),
  },
];

// ─── Typography ──────────────────────────────────────────────────────
const TYPOGRAPHY: Array<SearchComponent> = [
  {
    name: 'Heading',
    category: 'Typography',
    description: 'Section heading with semantic HTML level and scalable size.',
    related: ['Text', 'Code', 'Badge', 'Divider'],
    storyPath: storyPath('typography', 'heading'),
  },
  {
    name: 'Text',
    category: 'Typography',
    description: 'Body text with size, weight, color, truncation, and line clamping.',
    related: ['Heading', 'Code', 'Link', 'Key'],
    storyPath: storyPath('typography', 'text'),
  },
  {
    name: 'Code',
    category: 'Typography',
    description: 'Inline code snippet with monospace styling.',
    related: ['Key', 'Text', 'Clipboard', 'Badge'],
    storyPath: storyPath('typography', 'code'),
  },
  {
    name: 'Key',
    category: 'Typography',
    description: 'Keyboard key visual indicator styled as a key cap.',
    related: ['Code', 'Text', 'Tooltip', 'ContextMenu'],
    storyPath: storyPath('typography', 'key'),
  },
  {
    name: 'RichTextEditor',
    category: 'Typography',
    description: 'Tiptap-based WYSIWYG editor with customizable toolbar and chat mode.',
    related: ['Textarea', 'Input', 'Editable'],
    storyPath: storyPath('typography', 'richtexteditor'),
  },
];

// ─── Navigation ──────────────────────────────────────────────────────
const NAVIGATION: Array<SearchComponent> = [
  {
    name: 'Link',
    category: 'Navigation',
    description: 'Anchor element for navigation with external link support.',
    related: ['Button', 'Breadcrumb', 'Tabs', 'Menu'],
    storyPath: storyPath('navigation', 'link'),
  },
  {
    name: 'Breadcrumb',
    category: 'Navigation',
    description: 'Navigation trail showing the current page location in a hierarchy.',
    related: ['Link', 'Tabs', 'Steps', 'Menu'],
    storyPath: storyPath('navigation', 'breadcrumb'),
  },
  {
    name: 'Menubar',
    category: 'Navigation',
    description: 'Horizontal application-level menu bar with dropdowns.',
    related: ['Menu', 'ContextMenu', 'Toolbar', 'Tabs'],
    storyPath: storyPath('navigation', 'menubar'),
  },
  {
    name: 'Toolbar',
    category: 'Navigation',
    description: 'Grouped action bar for related icon buttons and controls.',
    related: ['ActionBar', 'Menubar', 'IconButton', 'SegmentedControl'],
    storyPath: storyPath('navigation', 'toolbar'),
  },
];

// ─── Media ───────────────────────────────────────────────────────────
const MEDIA: Array<SearchComponent> = [
  {
    name: 'Avatar',
    category: 'Media',
    description: 'User avatar with image, initials fallback, and size variants.',
    related: ['Image', 'Circle', 'HoverCard', 'Menu'],
    storyPath: storyPath('media', 'avatar'),
  },
  {
    name: 'Image',
    category: 'Media',
    description: 'Optimized image element with alt text and loading fallback.',
    related: ['Avatar', 'AspectRatio', 'Icon', 'Carousel'],
    storyPath: storyPath('media', 'image'),
  },
  {
    name: 'Icon',
    category: 'Media',
    description: 'Wrapper for rendering icon components with consistent sizing.',
    related: ['IconButton', 'Avatar', 'Badge', 'Circle'],
    storyPath: storyPath('media', 'icon'),
  },
  {
    name: 'AspectRatio',
    category: 'Media',
    description: 'Constrains child content to a fixed width-to-height ratio.',
    related: ['Image', 'Avatar', 'Box', 'Carousel'],
    storyPath: storyPath('media', 'aspectratio'),
  },
];

// ─── Disclosure ──────────────────────────────────────────────────────
const DISCLOSURE: Array<SearchComponent> = [
  {
    name: 'Accordion',
    category: 'Disclosure',
    description: 'Vertically stacked collapsible sections with expand/collapse.',
    related: ['Tabs', 'Collapsible', 'Steps', 'Fieldset', 'Card'],
    storyPath: storyPath('disclosure', 'accordion'),
  },
  {
    name: 'Tabs',
    category: 'Disclosure',
    description: 'Horizontal tab navigation for switching between content panels.',
    related: ['SegmentedControl', 'Accordion', 'Steps', 'Select'],
    storyPath: storyPath('disclosure', 'tabs'),
  },
  {
    name: 'Steps',
    category: 'Disclosure',
    description: 'Step indicator for multi-step wizards and sequential processes.',
    related: ['Tabs', 'Timeline', 'Progress', 'Breadcrumb', 'Accordion'],
    storyPath: storyPath('disclosure', 'steps'),
  },
];

/** All searchable components */
export const SEARCH_COMPONENTS: Array<SearchComponent> = [
  ...LAYOUT,
  ...FORM,
  ...OVERLAY,
  ...DISPLAY,
  ...FEEDBACK,
  ...TYPOGRAPHY,
  ...NAVIGATION,
  ...MEDIA,
  ...DISCLOSURE,
];

/** Create a configured Fuse.js search index */
export const createSearchIndex = (): Fuse<SearchComponent> =>
  new Fuse(SEARCH_COMPONENTS, {
    keys: [
      { name: 'name', weight: 4 },
      { name: 'related', weight: 3 },
      { name: 'description', weight: 2 },
    ],
    threshold: 0.35,
    includeMatches: true,
    useExtendedSearch: true,
  });
