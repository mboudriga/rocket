import type { FileUploadRootProps } from '@chakra-ui/react';

export interface FileUploadProps extends Omit<FileUploadRootProps, 'onChange' | 'onFileChange'> {
  orientation?: 'vertical' | 'horizontal';
  label?: string;
  hint?: string;
  error?: string;
  disabled?: boolean;
  invalid?: boolean;
  readOnly?: boolean;
  required?: boolean;
  accept?: string;
  maxFiles?: number;
  maxFileSize?: number;
  allowDrop?: boolean;
  directory?: boolean;
  /** Callback when files change. event.target.value is JSON-stringified array of file metadata. */
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export const FileUploadDefaultProps: FileUploadProps = {
  orientation: 'vertical',
  label: '',
  hint: '',
  error: '',
  disabled: false,
  invalid: false,
  readOnly: false,
  required: false,
  maxFiles: 1,
  allowDrop: true,
  directory: false,
};
