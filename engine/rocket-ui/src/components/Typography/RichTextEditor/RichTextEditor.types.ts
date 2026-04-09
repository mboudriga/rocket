import type { BoxProps } from '@chakra-ui/react';
import type { Editor } from '@tiptap/react';
import type { ReactNode } from 'react';

// ============================================================================
// Main Component Props
// ============================================================================

export interface RichTextEditorProps extends Omit<BoxProps, 'onChange' | 'defaultValue'> {
  /** Orientation of the field wrapper */
  orientation?: 'vertical' | 'horizontal';
  /** Label displayed above/beside the editor */
  label?: string;
  /** Hint text displayed below the editor */
  hint?: string;
  /** Error message - replaces hint when present */
  error?: string;
  /** Disables the editor */
  disabled?: boolean;
  /** Marks the field as invalid */
  invalid?: boolean;
  /** Makes the editor read-only */
  readOnly?: boolean;
  /** Marks the field as required */
  required?: boolean;

  /** HTML content value (controlled) */
  value?: string;
  /** Initial HTML content (uncontrolled) */
  defaultValue?: string;
  /** Called when content changes with HTML string */
  onChange?: (value: string) => void;

  /** Placeholder text when editor is empty */
  placeholder?: string;
  /** Maximum character count */
  characterLimit?: number;
  /** Whether to show character count in footer */
  showCharacterCount?: boolean;
  /** Whether the editor is editable */
  editable?: boolean;
  /** Auto-focus behavior */
  autofocus?: boolean | 'start' | 'end';

  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Minimum height of the content area */
  minHeight?: string | number;
  /** Maximum height of the content area */
  maxHeight?: string | number;

  /** Enable enter-to-send mode (for chat interfaces) */
  enterToSend?: boolean;
  /** Called when enter is pressed in enterToSend mode */
  onSend?: (value: string) => void;

  /** Child components (Toolbar, Content, Footer) */
  children?: ReactNode;
}

export const RichTextEditorDefaultProps: Partial<RichTextEditorProps> = {
  orientation: 'vertical',
  label: '',
  hint: '',
  error: '',
  disabled: false,
  invalid: false,
  readOnly: false,
  required: false,
  placeholder: '',
  showCharacterCount: false,
  editable: true,
  size: 'md',
  enterToSend: false,
};

// ============================================================================
// Context Value
// ============================================================================

export interface RichTextEditorContextValue {
  editor: Editor | null;
  size: 'sm' | 'md' | 'lg';
  disabled: boolean;
  readOnly: boolean;
}

// ============================================================================
// Sub-Component Props
// ============================================================================

export interface RichTextEditorToolbarProps extends BoxProps {
  children?: ReactNode;
}

export interface RichTextEditorControlGroupProps extends BoxProps {
  children?: ReactNode;
}

export interface RichTextEditorSeparatorProps extends BoxProps {
  orientation?: 'horizontal' | 'vertical';
}

export interface RichTextEditorContentProps extends Omit<BoxProps, 'children'> {
  /** Override minimum height */
  minHeight?: string | number;
  /** Override maximum height */
  maxHeight?: string | number;
}

export interface RichTextEditorFooterProps extends BoxProps {
  children?: ReactNode;
}

// ============================================================================
// Control Props
// ============================================================================

export interface RichTextEditorControlProps {
  /** Override size from context */
  size?: 'sm' | 'md' | 'lg';
  /** Override disabled from context */
  disabled?: boolean;
  /** Custom aria-label */
  'aria-label'?: string;
}

export interface RichTextEditorLinkControlProps extends RichTextEditorControlProps {
  /** Placeholder text for URL input field */
  placeholder?: string;
}

// ============================================================================
// Hook Types
// ============================================================================

export interface UseRichTextEditorOptions {
  /** Initial HTML content */
  defaultValue?: string;
  /** Controlled HTML content */
  value?: string;
  /** Called when content changes */
  onChange?: (value: string) => void;
  /** Placeholder text */
  placeholder?: string;
  /** Maximum characters */
  characterLimit?: number;
  /** Whether editor is editable */
  editable?: boolean;
  /** Auto-focus on mount */
  autofocus?: boolean | 'start' | 'end';
  /** Enable enter-to-send */
  enterToSend?: boolean;
  /** Called when enter pressed (enterToSend mode) */
  onSend?: (value: string) => void;
}

export interface UseRichTextEditorReturn {
  /** The Tiptap editor instance */
  editor: Editor | null;
  /** Whether the editor content is empty */
  isEmpty: boolean;
  /** Current character count */
  characterCount: number;
  /** Current word count */
  wordCount: number;
  /** Whether character limit is exceeded */
  isOverLimit: boolean;
  /** Clear editor content */
  clear: () => void;
  /** Focus the editor */
  focus: () => void;
  /** Blur the editor */
  blur: () => void;
  /** Get HTML content */
  getHTML: () => string;
  /** Get plain text content */
  getText: () => string;
}
