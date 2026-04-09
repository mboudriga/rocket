import { FileUpload as ChakraFileUpload } from '@chakra-ui/react';
import { useRef } from 'react';
import { LuUpload } from 'react-icons/lu';
import type { StyleProps } from '../../../types';
import { createSyntheticChangeEvent, popFieldWrapperProps } from '../../../utils';
import { FieldWrapper } from '../FieldWrapper';

import type { FileUploadProps } from './FileUpload.types';

const FileUpload = ({
  ref,
  onChange,
  accept,
  ...props
}: FileUploadProps & {
  ref?: React.Ref<HTMLDivElement>;
}) => {
  const { poppedProps, otherProps } = popFieldWrapperProps(props);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (details: { acceptedFiles: Array<File> }) => {
    if (onChange) {
      // Serialize file metadata (can't serialize File objects directly)
      const fileMetadata = details.acceptedFiles.map((file) => ({
        name: file.name,
        size: file.size,
        type: file.type,
        lastModified: file.lastModified,
      }));
      const syntheticEvent = createSyntheticChangeEvent(
        inputRef.current,
        JSON.stringify(fileMetadata)
      );
      // Attach actual files to the event for consumers who need them
      (syntheticEvent as unknown as { files: Array<File> }).files = details.acceptedFiles;
      onChange(syntheticEvent);
    }
  };

  return (
    <FieldWrapper {...poppedProps}>
      <ChakraFileUpload.Root
        ref={ref}
        accept={accept ? [accept] : undefined}
        onFileChange={handleFileChange}
        {...FileUploadStyles}
        {...otherProps}
      >
        <ChakraFileUpload.HiddenInput ref={inputRef} />
        <ChakraFileUpload.Dropzone>
          <LuUpload />
          <ChakraFileUpload.DropzoneContent>
            <div>Drag and drop files here</div>
            <div>or click to browse</div>
          </ChakraFileUpload.DropzoneContent>
        </ChakraFileUpload.Dropzone>
        <ChakraFileUpload.ItemGroup>
          <ChakraFileUpload.Context>
            {({ acceptedFiles }) =>
              acceptedFiles.map((file) => (
                <ChakraFileUpload.Item key={file.name} file={file}>
                  <ChakraFileUpload.ItemPreview />
                  <ChakraFileUpload.ItemName />
                  <ChakraFileUpload.ItemSizeText />
                  <ChakraFileUpload.ItemDeleteTrigger />
                </ChakraFileUpload.Item>
              ))
            }
          </ChakraFileUpload.Context>
        </ChakraFileUpload.ItemGroup>
      </ChakraFileUpload.Root>
    </FieldWrapper>
  );
};

const FileUploadStyles: StyleProps = {
  width: '100%',
};

export { FileUpload };
