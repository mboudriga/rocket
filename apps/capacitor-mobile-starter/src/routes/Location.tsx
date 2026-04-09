import { Badge, Box, Button, Card, Flex, Heading, Spinner, Text } from '@rocket/ui';
import { useState } from 'react';
import { LuMapPin } from 'react-icons/lu';
import { PageHeader } from '@/components/common';
import { getCurrentPosition } from '@/services/geolocation';

export function Location() {
  const [coords, setCoords] = useState<{
    latitude: number;
    longitude: number;
    accuracy: number;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleGetLocation() {
    setLoading(true);
    setError(null);
    try {
      const position = await getCurrentPosition();
      setCoords({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        accuracy: position.coords.accuracy,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get location');
    } finally {
      setLoading(false);
    }
  }

  const locationCards = coords
    ? ([
        { key: 'lat', label: 'Latitude', value: coords.latitude.toFixed(6), color: 'blue' },
        { key: 'lng', label: 'Longitude', value: coords.longitude.toFixed(6), color: 'green' },
        { key: 'acc', label: 'Accuracy', value: `${coords.accuracy.toFixed(1)}m`, color: 'purple' },
      ] as const)
    : [];

  return (
    <Flex.V gap="6">
      <PageHeader
        title="Location"
        description="Get device geolocation"
        actions={
          <Button colorPalette="blue" onClick={handleGetLocation} disabled={loading}>
            {loading ? <Spinner size="sm" /> : <LuMapPin />}
            Get Location
          </Button>
        }
      />

      {error && (
        <Card colorPalette="red">
          <Text color="red.fg">{error}</Text>
        </Card>
      )}

      {locationCards.length > 0 ? (
        <Flex.H gap="4" wrap="wrap">
          {locationCards.map(({ key, label, value, color }) => (
            <Card key={key} colorPalette={color} minWidth="200px" flex="1">
              <Flex.V gap="3">
                <Text fontSize="sm" color="fg.muted" fontWeight="medium">
                  {label}
                </Text>
                <Flex.H align="center" gap="2">
                  <Heading size="md">{value}</Heading>
                  <Badge colorPalette={color} variant="subtle" size="sm">
                    {key}
                  </Badge>
                </Flex.H>
              </Flex.V>
            </Card>
          ))}
        </Flex.H>
      ) : (
        !loading && (
          <Card>
            <Flex.V align="center" gap="4" py="12">
              <Box color="fg.subtle">
                <LuMapPin size={48} />
              </Box>
              <Text color="fg.muted">Tap "Get Location" to fetch coordinates</Text>
            </Flex.V>
          </Card>
        )
      )}
    </Flex.V>
  );
}
