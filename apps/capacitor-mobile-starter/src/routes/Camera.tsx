import { Box, Button, Card, Flex, Spinner, Text } from '@rocket/ui';
import { useState } from 'react';
import { LuCamera } from 'react-icons/lu';
import { PageHeader } from '@/components/common';
import { takePhoto } from '@/services/camera';

export function Camera() {
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleTakePhoto() {
    setLoading(true);
    setError(null);
    try {
      const image = await takePhoto();
      setPhotoUri(image.webPath ?? null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to take photo');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Flex.V gap="6">
      <PageHeader
        title="Camera"
        description="Capture photos using the device camera"
        actions={
          <Button colorPalette="blue" onClick={handleTakePhoto} disabled={loading}>
            {loading ? <Spinner size="sm" /> : <LuCamera />}
            Take Photo
          </Button>
        }
      />

      {error && (
        <Card colorPalette="red">
          <Text color="red.fg">{error}</Text>
        </Card>
      )}

      {photoUri ? (
        <Card>
          <Box overflow="hidden" rounded="md">
            <img
              src={photoUri}
              alt="Captured"
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </Box>
        </Card>
      ) : (
        <Card>
          <Flex.V align="center" gap="4" py="12">
            <Box color="fg.subtle">
              <LuCamera size={48} />
            </Box>
            <Text color="fg.muted">Tap "Take Photo" to capture an image</Text>
          </Flex.V>
        </Card>
      )}
    </Flex.V>
  );
}
