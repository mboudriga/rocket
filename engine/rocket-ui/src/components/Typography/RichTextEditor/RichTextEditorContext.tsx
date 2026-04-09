import { createContext, useContext } from 'react';

import type { RichTextEditorContextValue } from './RichTextEditor.types';

export const RichTextEditorContext = createContext<RichTextEditorContextValue>({
  editor: null,
  size: 'md',
  disabled: false,
  readOnly: false,
});

export const useRichTextEditorContext = () => useContext(RichTextEditorContext);
