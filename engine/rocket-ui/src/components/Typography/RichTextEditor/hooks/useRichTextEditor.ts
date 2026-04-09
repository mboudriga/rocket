import CharacterCount from '@tiptap/extension-character-count';
import Highlight from '@tiptap/extension-highlight';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline';
import type { AnyExtension } from '@tiptap/react';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useCallback, useMemo } from 'react';

import type { UseRichTextEditorOptions, UseRichTextEditorReturn } from '../RichTextEditor.types';

export function useRichTextEditor(options: UseRichTextEditorOptions = {}): UseRichTextEditorReturn {
  const {
    defaultValue = '',
    value,
    onChange,
    placeholder = '',
    characterLimit,
    editable = true,
    autofocus = false,
    enterToSend = false,
    onSend,
  } = options;

  const extensions = useMemo(() => {
    const exts: Array<AnyExtension> = [
      StarterKit.configure({ link: false, underline: false }),
      Underline,
      Highlight.configure({
        multicolor: false,
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          rel: 'noopener noreferrer',
        },
      }),
      Placeholder.configure({
        placeholder,
        emptyEditorClass: 'is-editor-empty',
      }),
    ];

    if (characterLimit) {
      exts.push(
        CharacterCount.configure({
          limit: characterLimit,
        })
      );
    } else {
      exts.push(CharacterCount);
    }

    return exts;
  }, [placeholder, characterLimit]);

  const editor = useEditor({
    extensions,
    content: value ?? defaultValue,
    editable,
    autofocus,
    immediatelyRender: false,
    shouldRerenderOnTransaction: false,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange?.(html);
    },
    editorProps: {
      attributes: {
        role: 'textbox',
        'aria-multiline': 'true',
        'aria-label': placeholder || 'Rich text editor',
      },
      handleKeyDown: (view, event) => {
        if (enterToSend && event.key === 'Enter' && !event.shiftKey) {
          event.preventDefault();
          const html = view.state.doc.textContent.trim() ? (editor?.getHTML() ?? '') : '';
          if (html && onSend) {
            onSend(html);
          }
          return true;
        }
        return false;
      },
      handleClick: (view, pos, event) => {
        // Check for Ctrl+Click (Windows/Linux) or Cmd+Click (Mac)
        if (event.ctrlKey || event.metaKey) {
          // Get the node at clicked position
          const { state } = view;
          const $pos = state.doc.resolve(pos);

          // Check if we're clicking on a link mark
          const marks = $pos.marks();
          const linkMark = [...marks].find((mark) => mark.type.name === 'link');

          if (linkMark?.attrs.href) {
            // Respect the link's target attribute (use '_blank' if set, otherwise '_self')
            const target = linkMark.attrs.target === '_blank' ? '_blank' : '_self';
            window.open(linkMark.attrs.href, target);
            return true; // Handled
          }
        }
        return false; // Not handled, let default behavior proceed
      },
    },
  });

  // Update content when controlled value changes
  // Note: This is handled by useEditor's content prop reactivity

  const isEmpty = useMemo(() => {
    if (!editor) {
      return true;
    }
    return editor.isEmpty;
  }, [editor, editor?.isEmpty]);

  const characterCount = useMemo(() => {
    if (!editor) {
      return 0;
    }
    return editor.storage.characterCount?.characters() ?? 0;
  }, [editor, editor?.storage.characterCount]);

  const wordCount = useMemo(() => {
    if (!editor) {
      return 0;
    }
    return editor.storage.characterCount?.words() ?? 0;
  }, [editor, editor?.storage.characterCount]);

  const isOverLimit = useMemo(() => {
    if (!editor || !characterLimit) {
      return false;
    }
    return characterCount > characterLimit;
  }, [editor, characterLimit, characterCount]);

  const clear = useCallback(() => {
    editor?.commands.clearContent();
  }, [editor]);

  const focus = useCallback(() => {
    editor?.commands.focus();
  }, [editor]);

  const blur = useCallback(() => {
    editor?.commands.blur();
  }, [editor]);

  const getHTML = useCallback(() => {
    return editor?.getHTML() ?? '';
  }, [editor]);

  const getText = useCallback(() => {
    return editor?.getText() ?? '';
  }, [editor]);

  return {
    editor,
    isEmpty,
    characterCount,
    wordCount,
    isOverLimit,
    clear,
    focus,
    blur,
    getHTML,
    getText,
  };
}
