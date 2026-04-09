import {
  Box,
  Input as ChakraInput,
  Switch as ChakraSwitch,
  IconButton,
  Separator,
  Text,
} from '@chakra-ui/react';
import { Global } from '@emotion/react';
import { EditorContent, useEditorState } from '@tiptap/react';
import { useEffect, useId, useMemo, useRef, useState } from 'react';
import {
  LuBold,
  LuCode,
  LuHighlighter,
  LuItalic,
  LuLink,
  LuList,
  LuListOrdered,
  LuStrikethrough,
  LuUnderline,
} from 'react-icons/lu';
import { popFieldWrapperProps } from '../../../utils';
import { Button } from '../../Form/Button';
import { FieldWrapper } from '../../Form/FieldWrapper';
import { Flex } from '../../Layout/Flex';
import { Popover } from '../../Overlay/Popover';
import { useRichTextEditor } from './hooks/useRichTextEditor';
import {
  type RichTextEditorContentProps,
  type RichTextEditorContextValue,
  type RichTextEditorControlGroupProps,
  type RichTextEditorControlProps,
  RichTextEditorDefaultProps,
  type RichTextEditorFooterProps,
  type RichTextEditorLinkControlProps,
  type RichTextEditorProps,
  type RichTextEditorSeparatorProps,
  type RichTextEditorToolbarProps,
} from './RichTextEditor.types';
import { RichTextEditorContext, useRichTextEditorContext } from './RichTextEditorContext';
import {
  containerDisabledStyles,
  containerInvalidStyles,
  containerStyles,
  contentStyles,
  controlGroupStyles,
  footerOverLimitStyles,
  footerStyles,
  sizeMap,
  toolbarStyles,
} from './styles/RichTextEditor.styles';

// ============================================================================
// Root Component
// ============================================================================

const RichTextEditorRoot = ({
  ref,
  id,
  value,
  defaultValue,
  onChange,
  placeholder = RichTextEditorDefaultProps.placeholder,
  characterLimit,
  showCharacterCount = RichTextEditorDefaultProps.showCharacterCount,
  editable = RichTextEditorDefaultProps.editable,
  autofocus,
  size = RichTextEditorDefaultProps.size ?? 'md',
  minHeight,
  maxHeight,
  enterToSend = RichTextEditorDefaultProps.enterToSend,
  onSend,
  children,
  disabled = RichTextEditorDefaultProps.disabled,
  readOnly = RichTextEditorDefaultProps.readOnly,
  invalid = RichTextEditorDefaultProps.invalid,
  ...props
}: RichTextEditorProps & {
  ref?: React.Ref<HTMLDivElement>;
}) => {
  const { poppedProps, otherProps } = popFieldWrapperProps(props);

  const { editor, characterCount, wordCount, isOverLimit } = useRichTextEditor({
    defaultValue,
    value,
    onChange,
    placeholder,
    characterLimit,
    editable: editable && !disabled && !readOnly,
    autofocus,
    enterToSend,
    onSend,
  });

  const contextValue = useMemo<RichTextEditorContextValue>(
    () => ({
      editor,
      size,
      disabled: !!disabled,
      readOnly: !!readOnly,
    }),
    [editor, size, disabled, readOnly]
  );

  const containerStyleProps = {
    ...containerStyles,
    ...(disabled && containerDisabledStyles),
    ...(invalid && containerInvalidStyles),
  };

  // If no children provided, render default layout
  const content = children ?? (
    <>
      <RichTextEditorToolbar>
        <RichTextEditorControlGroup>
          <BoldControl />
          <ItalicControl />
          <UnderlineControl />
          <StrikeControl />
        </RichTextEditorControlGroup>
        <RichTextEditorSeparator />
        <RichTextEditorControlGroup>
          <HighlightControl />
          <LinkControl />
          <CodeControl />
        </RichTextEditorControlGroup>
        <RichTextEditorSeparator />
        <RichTextEditorControlGroup>
          <BulletListControl />
          <OrderedListControl />
        </RichTextEditorControlGroup>
      </RichTextEditorToolbar>
      <RichTextEditorContent minHeight={minHeight} maxHeight={maxHeight} />
      {showCharacterCount && (
        <RichTextEditorFooter>
          <Flex.H justify="space-between" width="100%">
            <Box>{wordCount} words</Box>
            <Box {...(isOverLimit && footerOverLimitStyles)}>
              {characterCount}
              {characterLimit && ` / ${characterLimit}`} characters
            </Box>
          </Flex.H>
        </RichTextEditorFooter>
      )}
    </>
  );

  return (
    <RichTextEditorContext.Provider value={contextValue}>
      <FieldWrapper
        {...poppedProps}
        id={id}
        disabled={disabled}
        invalid={invalid}
        readOnly={readOnly}
      >
        <Box ref={ref} {...containerStyleProps} {...otherProps}>
          {content}
        </Box>
      </FieldWrapper>
    </RichTextEditorContext.Provider>
  );
};

// ============================================================================
// Toolbar Component
// ============================================================================

const RichTextEditorToolbar = ({
  ref,
  children,
  ...props
}: RichTextEditorToolbarProps & {
  ref?: React.Ref<HTMLDivElement>;
}) => {
  return (
    <Box
      ref={ref}
      role="toolbar"
      aria-label="Formatting options"
      display="flex"
      flexDirection="row"
      alignItems="center"
      {...toolbarStyles}
      {...props}
    >
      {children}
    </Box>
  );
};

// ============================================================================
// Control Group Component
// ============================================================================

const RichTextEditorControlGroup = ({
  ref,
  children,
  ...props
}: RichTextEditorControlGroupProps & {
  ref?: React.Ref<HTMLDivElement>;
}) => {
  return (
    <Box
      ref={ref}
      display="flex"
      flexDirection="row"
      alignItems="center"
      {...controlGroupStyles}
      {...props}
    >
      {children}
    </Box>
  );
};

// ============================================================================
// Separator Component
// ============================================================================

const RichTextEditorSeparator = ({
  ref,
  orientation = 'vertical',
  ...props
}: RichTextEditorSeparatorProps & {
  ref?: React.Ref<HTMLDivElement>;
}) => {
  return (
    <Separator
      ref={ref}
      orientation={orientation}
      height={orientation === 'vertical' ? '24px' : undefined}
      marginX={orientation === 'vertical' ? 1 : undefined}
      marginY={orientation === 'horizontal' ? 1 : undefined}
      {...props}
    />
  );
};

// ============================================================================
// Content Component
// ============================================================================

const RichTextEditorContent = ({
  ref,
  minHeight: propMinHeight,
  maxHeight,
  ...props
}: RichTextEditorContentProps & {
  ref?: React.Ref<HTMLDivElement>;
}) => {
  const { editor, size, disabled, readOnly } = useRichTextEditorContext();
  const sizeConfig = sizeMap[size];

  const minHeightValue = propMinHeight ?? sizeConfig.minHeight;

  return (
    <>
      {/* Global styles to override focus-visible on contenteditable elements */}
      <Global
        styles={{
          '.tiptap:focus, .tiptap:focus-visible, .ProseMirror:focus, .ProseMirror:focus-visible, .ProseMirror-focused, [contenteditable]:focus, [contenteditable]:focus-visible':
            {
              outline: 'none !important',
              border: 'none !important',
              boxShadow: 'none !important',
            },
          '.ProseMirror a': {
            color: 'var(--chakra-colors-blue-fg)',
            textDecoration: 'underline',
            cursor: 'pointer',
          },
          '.ProseMirror a:hover': {
            color: 'var(--chakra-colors-blue-fg)',
          },
        }}
      />
      <Box
        ref={ref}
        padding={sizeConfig.padding}
        fontSize={sizeConfig.fontSize}
        minHeight={minHeightValue}
        maxHeight={maxHeight}
        cursor={disabled || readOnly ? 'not-allowed' : 'text'}
        {...contentStyles}
        {...props}
        css={{
          '.ProseMirror': {
            minHeight: 'inherit',
            height: '100%',
          },
          '.ProseMirror p': {
            margin: 0,
          },
          '.ProseMirror em': {
            fontStyle: 'italic',
          },
          '.ProseMirror strong': {
            fontWeight: 'bold',
          },
          '.ProseMirror p.is-editor-empty:first-of-type::before': {
            content: 'attr(data-placeholder)',
            float: 'left',
            color: 'var(--chakra-colors-fg-subtle)',
            pointerEvents: 'none',
            height: 0,
          },
          '.ProseMirror code': {
            backgroundColor: 'var(--chakra-colors-bg-muted)',
            borderRadius: '4px',
            padding: '2px 4px',
            fontFamily: 'monospace',
            fontSize: '0.9em',
          },
          '.ProseMirror pre': {
            backgroundColor: 'var(--chakra-colors-bg-muted)',
            borderRadius: '6px',
            padding: '12px',
            fontFamily: 'monospace',
            fontSize: '0.9em',
            overflow: 'auto',
          },
          '.ProseMirror pre code': {
            backgroundColor: 'transparent',
            padding: 0,
          },
          '.ProseMirror blockquote': {
            borderLeft: '3px solid var(--chakra-colors-border)',
            paddingLeft: '12px',
            marginLeft: 0,
            fontStyle: 'italic',
            color: 'var(--chakra-colors-fg-muted)',
          },
          '.ProseMirror ul, .ProseMirror ol': {
            paddingLeft: '24px',
            margin: '8px 0',
          },
          '.ProseMirror li': {
            marginBottom: '4px',
          },
          '.ProseMirror mark': {
            backgroundColor: 'var(--chakra-colors-yellow-subtle)',
            borderRadius: '2px',
            padding: '0 2px',
          },
          '.ProseMirror hr': {
            border: 'none',
            borderTop: '1px solid var(--chakra-colors-border)',
            margin: '16px 0',
          },
        }}
        onClick={() => editor?.commands.focus()}
      >
        <EditorContent editor={editor} />
      </Box>
    </>
  );
};

// ============================================================================
// Footer Component
// ============================================================================

const RichTextEditorFooter = ({
  ref,
  children,
  ...props
}: RichTextEditorFooterProps & {
  ref?: React.Ref<HTMLDivElement>;
}) => {
  return (
    <Box
      ref={ref}
      display="flex"
      flexDirection="row"
      alignItems="center"
      {...footerStyles}
      {...props}
    >
      {children}
    </Box>
  );
};

// ============================================================================
// Control Components
// ============================================================================

const BoldControl = ({
  ref,
  size: propSize,
  disabled: propDisabled,
  'aria-label': ariaLabel = 'Bold',
  ...props
}: RichTextEditorControlProps & {
  ref?: React.Ref<HTMLButtonElement>;
}) => {
  const { editor, size: contextSize, disabled: contextDisabled } = useRichTextEditorContext();
  const size = propSize ?? contextSize;
  const disabled = propDisabled ?? contextDisabled;
  const state = useEditorState({
    editor,
    selector: ({ editor }) => ({ isActive: editor?.isActive('bold') ?? false }),
  });
  const isActive = state?.isActive ?? false;

  return (
    <IconButton
      ref={ref}
      data-toolbar-item
      aria-label={ariaLabel}
      aria-pressed={isActive}
      variant={isActive ? 'subtle' : 'ghost'}
      size={sizeMap[size].button}
      disabled={disabled || !editor}
      onClick={() => editor?.chain().focus().toggleBold().run()}
      {...props}
    >
      <LuBold />
    </IconButton>
  );
};

const ItalicControl = ({
  ref,
  size: propSize,
  disabled: propDisabled,
  'aria-label': ariaLabel = 'Italic',
  ...props
}: RichTextEditorControlProps & {
  ref?: React.Ref<HTMLButtonElement>;
}) => {
  const { editor, size: contextSize, disabled: contextDisabled } = useRichTextEditorContext();
  const size = propSize ?? contextSize;
  const disabled = propDisabled ?? contextDisabled;
  const state = useEditorState({
    editor,
    selector: ({ editor }) => ({ isActive: editor?.isActive('italic') ?? false }),
  });
  const isActive = state?.isActive ?? false;

  return (
    <IconButton
      ref={ref}
      data-toolbar-item
      aria-label={ariaLabel}
      aria-pressed={isActive}
      variant={isActive ? 'subtle' : 'ghost'}
      size={sizeMap[size].button}
      disabled={disabled || !editor}
      onClick={() => editor?.chain().focus().toggleItalic().run()}
      {...props}
    >
      <LuItalic />
    </IconButton>
  );
};

const UnderlineControl = ({
  ref,
  size: propSize,
  disabled: propDisabled,
  'aria-label': ariaLabel = 'Underline',
  ...props
}: RichTextEditorControlProps & {
  ref?: React.Ref<HTMLButtonElement>;
}) => {
  const { editor, size: contextSize, disabled: contextDisabled } = useRichTextEditorContext();
  const size = propSize ?? contextSize;
  const disabled = propDisabled ?? contextDisabled;
  const state = useEditorState({
    editor,
    selector: ({ editor }) => ({ isActive: editor?.isActive('underline') ?? false }),
  });
  const isActive = state?.isActive ?? false;

  return (
    <IconButton
      ref={ref}
      data-toolbar-item
      aria-label={ariaLabel}
      aria-pressed={isActive}
      variant={isActive ? 'subtle' : 'ghost'}
      size={sizeMap[size].button}
      disabled={disabled || !editor}
      onClick={() => editor?.chain().focus().toggleUnderline().run()}
      {...props}
    >
      <LuUnderline />
    </IconButton>
  );
};

const StrikeControl = ({
  ref,
  size: propSize,
  disabled: propDisabled,
  'aria-label': ariaLabel = 'Strikethrough',
  ...props
}: RichTextEditorControlProps & {
  ref?: React.Ref<HTMLButtonElement>;
}) => {
  const { editor, size: contextSize, disabled: contextDisabled } = useRichTextEditorContext();
  const size = propSize ?? contextSize;
  const disabled = propDisabled ?? contextDisabled;
  const state = useEditorState({
    editor,
    selector: ({ editor }) => ({ isActive: editor?.isActive('strike') ?? false }),
  });
  const isActive = state?.isActive ?? false;

  return (
    <IconButton
      ref={ref}
      data-toolbar-item
      aria-label={ariaLabel}
      aria-pressed={isActive}
      variant={isActive ? 'subtle' : 'ghost'}
      size={sizeMap[size].button}
      disabled={disabled || !editor}
      onClick={() => editor?.chain().focus().toggleStrike().run()}
      {...props}
    >
      <LuStrikethrough />
    </IconButton>
  );
};

const HighlightControl = ({
  ref,
  size: propSize,
  disabled: propDisabled,
  'aria-label': ariaLabel = 'Highlight',
  ...props
}: RichTextEditorControlProps & {
  ref?: React.Ref<HTMLButtonElement>;
}) => {
  const { editor, size: contextSize, disabled: contextDisabled } = useRichTextEditorContext();
  const size = propSize ?? contextSize;
  const disabled = propDisabled ?? contextDisabled;
  const state = useEditorState({
    editor,
    selector: ({ editor }) => ({ isActive: editor?.isActive('highlight') ?? false }),
  });
  const isActive = state?.isActive ?? false;

  return (
    <IconButton
      ref={ref}
      data-toolbar-item
      aria-label={ariaLabel}
      aria-pressed={isActive}
      variant={isActive ? 'subtle' : 'ghost'}
      size={sizeMap[size].button}
      disabled={disabled || !editor}
      onClick={() => editor?.chain().focus().toggleHighlight().run()}
      {...props}
    >
      <LuHighlighter />
    </IconButton>
  );
};

const LinkControl = ({
  ref,
  size: propSize,
  disabled: propDisabled,
  'aria-label': ariaLabel = 'Link',
  placeholder = 'https://example.com',
  ...props
}: RichTextEditorLinkControlProps & {
  ref?: React.Ref<HTMLButtonElement>;
}) => {
  const { editor, size: contextSize, disabled: contextDisabled } = useRichTextEditorContext();
  const size = propSize ?? contextSize;
  const disabled = propDisabled ?? contextDisabled;
  const state = useEditorState({
    editor,
    selector: ({ editor }) => ({ isActive: editor?.isActive('link') ?? false }),
  });
  const isActive = state?.isActive ?? false;

  const linkInputId = useId();
  const [isOpen, setIsOpen] = useState(false);
  const [url, setUrl] = useState('');
  const [openInNewTab, setOpenInNewTab] = useState(true);
  const savedSelectionRef = useRef<{ from: number; to: number } | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const prevIsOpenRef = useRef(false);

  // Pre-fill URL and target when editing existing link - ONLY on open transition
  useEffect(() => {
    const justOpened = isOpen && !prevIsOpenRef.current;
    const justClosed = !isOpen && prevIsOpenRef.current;

    if (justOpened) {
      // Popover just opened - initialize form values
      if (isActive) {
        // Editing an existing link - pre-fill with current values
        const currentUrl = editor?.getAttributes('link').href || '';
        const currentTarget = editor?.getAttributes('link').target;
        setUrl(currentUrl);
        setOpenInNewTab(currentTarget === '_blank');
      } else {
        // Creating a new link - use defaults
        setUrl('');
        setOpenInNewTab(true);
      }
    } else if (justClosed) {
      // Popover just closed - reset for next time
      setUrl('');
      setOpenInNewTab(true);
    }

    // Update the ref for next render
    prevIsOpenRef.current = isOpen;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, editor?.getAttributes, isActive]); // Only depend on isOpen - read isActive/editor only when needed

  // Save selection BEFORE popover opens (on mouse down)
  const handleTriggerMouseDown = (e: React.MouseEvent) => {
    // Prevent the button from stealing focus before we capture selection
    e.preventDefault();
    if (editor) {
      const { from, to } = editor.state.selection;
      savedSelectionRef.current = { from, to };
    }
  };

  // Focus input after popover opens (replaces autoFocus)
  useEffect(() => {
    if (isOpen && inputRef.current) {
      const timeoutId = setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
      return () => clearTimeout(timeoutId);
    }
  }, [isOpen]);

  // Helper: Normalize URL by adding https:// if no protocol specified
  const normalizeUrl = (urlString: string): string => {
    const hasProtocol = /^https?:\/\//i.test(urlString);
    return hasProtocol ? urlString : `https://${urlString}`;
  };

  // Helper: Reset state after link operation
  const resetLinkState = () => {
    setIsOpen(false);
    savedSelectionRef.current = null;
    setUrl('');
    setOpenInNewTab(true);
  };

  // Helper: Apply link to editor with selection handling
  const applyLinkToEditor = (linkUrl: string, selection: { from: number; to: number } | null) => {
    if (!editor) {
      return;
    }

    const linkAttrs = {
      href: linkUrl,
      target: openInNewTab ? '_blank' : null,
    };

    if (selection) {
      editor.chain().focus().setTextSelection(selection).setLink(linkAttrs).run();
    } else {
      editor.chain().focus().extendMarkRange('link').setLink(linkAttrs).run();
    }
  };

  // Helper: Remove link from editor
  const removeLinkFromEditor = (selection: { from: number; to: number } | null) => {
    if (!editor) {
      return;
    }

    if (selection) {
      editor.chain().focus().setTextSelection(selection).unsetLink().run();
    } else {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
    }
  };

  const applyLink = () => {
    if (!editor) {
      return;
    }

    const trimmed = url.trim();
    const selection = savedSelectionRef.current;
    const hasNoTextSelected = selection && selection.from === selection.to && !isActive;

    if (hasNoTextSelected) {
      resetLinkState();
      return;
    }

    if (trimmed === '') {
      removeLinkFromEditor(selection);
    } else {
      applyLinkToEditor(normalizeUrl(trimmed), selection);
    }

    resetLinkState();
  };

  const removeLink = () => {
    removeLinkFromEditor(savedSelectionRef.current);
    resetLinkState();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      applyLink();
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <Popover
      open={isOpen}
      onOpenChange={(details) => {
        if (!details.open) {
          savedSelectionRef.current = null;
        }
        setIsOpen(details.open);
      }}
      autoFocus={false}
      lazyMount={false}
      hasArrow
      hasCloseButton={false}
      trigger={
        <IconButton
          ref={ref}
          data-toolbar-item
          aria-label={ariaLabel}
          aria-pressed={isActive}
          variant={isActive ? 'subtle' : 'ghost'}
          size={sizeMap[size].button}
          disabled={disabled || !editor}
          onMouseDown={handleTriggerMouseDown}
          {...props}
        >
          <LuLink />
        </IconButton>
      }
    >
      <Flex.V gap={2}>
        <ChakraInput
          ref={inputRef}
          id={linkInputId}
          aria-label="Link URL"
          placeholder={placeholder}
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={handleKeyDown}
          size="sm"
        />
        <Flex.H align="center" gap={2}>
          <ChakraSwitch.Root
            size="sm"
            checked={openInNewTab}
            onCheckedChange={(e) => setOpenInNewTab(e.checked)}
          >
            <ChakraSwitch.HiddenInput />
            <ChakraSwitch.Control>
              <ChakraSwitch.Thumb />
            </ChakraSwitch.Control>
          </ChakraSwitch.Root>
          <Text fontSize="sm">Open in new tab</Text>
        </Flex.H>
        <Flex.H gap={2}>
          <Button size="sm" onClick={applyLink}>
            {isActive ? 'Update' : 'Add'} Link
          </Button>
          {isActive && (
            <Button size="sm" variant="ghost" onClick={removeLink}>
              Remove
            </Button>
          )}
        </Flex.H>
      </Flex.V>
    </Popover>
  );
};

const CodeControl = ({
  ref,
  size: propSize,
  disabled: propDisabled,
  'aria-label': ariaLabel = 'Code',
  ...props
}: RichTextEditorControlProps & {
  ref?: React.Ref<HTMLButtonElement>;
}) => {
  const { editor, size: contextSize, disabled: contextDisabled } = useRichTextEditorContext();
  const size = propSize ?? contextSize;
  const disabled = propDisabled ?? contextDisabled;
  const state = useEditorState({
    editor,
    selector: ({ editor }) => ({ isActive: editor?.isActive('code') ?? false }),
  });
  const isActive = state?.isActive ?? false;

  return (
    <IconButton
      ref={ref}
      data-toolbar-item
      aria-label={ariaLabel}
      aria-pressed={isActive}
      variant={isActive ? 'subtle' : 'ghost'}
      size={sizeMap[size].button}
      disabled={disabled || !editor}
      onClick={() => editor?.chain().focus().toggleCode().run()}
      {...props}
    >
      <LuCode />
    </IconButton>
  );
};

const BulletListControl = ({
  ref,
  size: propSize,
  disabled: propDisabled,
  'aria-label': ariaLabel = 'Bullet List',
  ...props
}: RichTextEditorControlProps & {
  ref?: React.Ref<HTMLButtonElement>;
}) => {
  const { editor, size: contextSize, disabled: contextDisabled } = useRichTextEditorContext();
  const size = propSize ?? contextSize;
  const disabled = propDisabled ?? contextDisabled;
  const state = useEditorState({
    editor,
    selector: ({ editor }) => ({ isActive: editor?.isActive('bulletList') ?? false }),
  });
  const isActive = state?.isActive ?? false;

  return (
    <IconButton
      ref={ref}
      data-toolbar-item
      aria-label={ariaLabel}
      aria-pressed={isActive}
      variant={isActive ? 'subtle' : 'ghost'}
      size={sizeMap[size].button}
      disabled={disabled || !editor}
      onClick={() => editor?.chain().focus().toggleBulletList().run()}
      {...props}
    >
      <LuList />
    </IconButton>
  );
};

const OrderedListControl = ({
  ref,
  size: propSize,
  disabled: propDisabled,
  'aria-label': ariaLabel = 'Ordered List',
  ...props
}: RichTextEditorControlProps & {
  ref?: React.Ref<HTMLButtonElement>;
}) => {
  const { editor, size: contextSize, disabled: contextDisabled } = useRichTextEditorContext();
  const size = propSize ?? contextSize;
  const disabled = propDisabled ?? contextDisabled;
  const state = useEditorState({
    editor,
    selector: ({ editor }) => ({ isActive: editor?.isActive('orderedList') ?? false }),
  });
  const isActive = state?.isActive ?? false;

  return (
    <IconButton
      ref={ref}
      data-toolbar-item
      aria-label={ariaLabel}
      aria-pressed={isActive}
      variant={isActive ? 'subtle' : 'ghost'}
      size={sizeMap[size].button}
      disabled={disabled || !editor}
      onClick={() => editor?.chain().focus().toggleOrderedList().run()}
      {...props}
    >
      <LuListOrdered />
    </IconButton>
  );
};

// ============================================================================
// Controls Object
// ============================================================================

const Control = {
  Bold: BoldControl,
  Italic: ItalicControl,
  Underline: UnderlineControl,
  Strike: StrikeControl,
  Highlight: HighlightControl,
  Link: LinkControl,
  Code: CodeControl,
  BulletList: BulletListControl,
  OrderedList: OrderedListControl,
};

// ============================================================================
// Compound Component Export
// ============================================================================

const RichTextEditor = Object.assign(RichTextEditorRoot, {
  Toolbar: RichTextEditorToolbar,
  ControlGroup: RichTextEditorControlGroup,
  Separator: RichTextEditorSeparator,
  Content: RichTextEditorContent,
  Footer: RichTextEditorFooter,
  Control,
});

export { RichTextEditor };
