import { IconButton } from '@chakra-ui/react';
import { type Editor, useEditorState } from '@tiptap/react';
import type { ReactNode } from 'react';
import type { RichTextEditorControlProps } from '../RichTextEditor.types';
import { useRichTextEditorContext } from '../RichTextEditorContext';
import { sizeMap } from '../styles/RichTextEditor.styles';

export interface CreateBooleanControlOptions {
  /** The Tiptap mark or node name to toggle */
  name: string;
  /** The icon to display */
  icon: ReactNode;
  /** Default aria-label */
  label: string;
  /** Function to toggle the mark/node */
  toggle: (editor: Editor) => void;
  /** Function to check if the mark/node is active */
  isActive?: (editor: Editor) => boolean;
}

/**
 * Factory function to create custom boolean toggle controls.
 *
 * @example
 * ```tsx
 * const SuperscriptControl = createBooleanControl({
 *   name: 'superscript',
 *   icon: <LuSuperscript />,
 *   label: 'Superscript',
 *   toggle: (editor) => editor.chain().focus().toggleSuperscript().run(),
 * });
 * ```
 */
export function createBooleanControl(options: CreateBooleanControlOptions) {
  const { name, icon, label, toggle, isActive: customIsActive } = options;

  const Control = ({
    ref,
    size: propSize,
    disabled: propDisabled,
    'aria-label': ariaLabel = label,
    ...props
  }: RichTextEditorControlProps & {
    ref?: React.Ref<HTMLButtonElement>;
  }) => {
    const { editor, size: contextSize, disabled: contextDisabled } = useRichTextEditorContext();
    const size = propSize ?? contextSize;
    const disabled = propDisabled ?? contextDisabled;

    const state = useEditorState({
      editor,
      selector: ({ editor }) => ({
        isActive: customIsActive
          ? ((editor && customIsActive(editor)) ?? false)
          : (editor?.isActive(name) ?? false),
      }),
    });
    const isActive = state?.isActive ?? false;

    const handleClick = () => {
      if (!editor) {
        return;
      }
      toggle(editor);
    };

    return (
      <IconButton
        ref={ref}
        data-toolbar-item
        aria-label={ariaLabel}
        aria-pressed={isActive}
        variant={isActive ? 'subtle' : 'ghost'}
        size={sizeMap[size].button}
        disabled={disabled || !editor}
        onClick={handleClick}
        {...props}
      >
        {icon}
      </IconButton>
    );
  };

  return Control;
}
