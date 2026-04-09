import { ExampleSection } from '@components/_examples';
import { Box } from '@components/Layout/Box';
import { Divider } from '@components/Layout/Divider';
import { Flex } from '@components/Layout/Flex';
import type { FC } from 'react';
import { FileUpload } from './FileUpload';

export const FileUploadExamples: FC = () => {
  return (
    <Flex.V gap="8">
      {/* Basic */}
      <ExampleSection title="Basic (Single File)">
        <Box width="350px">
          <FileUpload label="Upload document" hint="Max file size: 5MB" />
        </Box>
      </ExampleSection>

      {/* Multiple files */}
      <ExampleSection title="Multiple Files">
        <Box width="350px">
          <FileUpload maxFiles={5} label="Upload files" hint="Up to 5 files allowed" />
        </Box>
      </ExampleSection>

      {/* Accept restrictions */}
      <ExampleSection title="File Type Restrictions">
        <Box width="350px">
          <FileUpload accept="image/*" label="Images only" hint="Accepts: JPG, PNG, GIF, WebP" />
        </Box>
      </ExampleSection>

      {/* With file size limit */}
      <ExampleSection title="With File Size Limit">
        <Box width="350px">
          <FileUpload
            maxFileSize={2 * 1024 * 1024}
            label="Upload file"
            hint="Maximum 2MB per file"
          />
        </Box>
      </ExampleSection>

      {/* States */}
      <ExampleSection title="States">
        <Flex.H gap="4" wrap="wrap">
          <Box width="280px">
            <FileUpload disabled label="Disabled" />
          </Box>
          <Box width="280px">
            <FileUpload invalid error="File is required" label="Invalid" />
          </Box>
          <Box width="280px">
            <FileUpload required label="Required" />
          </Box>
        </Flex.H>
      </ExampleSection>

      <Divider />

      {/* Use case: Profile picture */}
      <ExampleSection title="Use Case: Profile Picture">
        <Box width="350px">
          <FileUpload
            accept="image/*"
            maxFileSize={5 * 1024 * 1024}
            label="Profile Picture"
            hint="Upload a square image, max 5MB"
          />
        </Box>
      </ExampleSection>
    </Flex.V>
  );
};
