import { Button, Card, Flex, Input, Text } from '@rocket/ui';
import { useEffect, useState } from 'react';
import { LuDatabase, LuPlus, LuSearch, LuTrash } from 'react-icons/lu';
import { PageHeader } from '@/components/common';
import { getAllKeys, getItem, removeItem, setItem } from '@/services/preferences';

export function Storage() {
  const [key, setKey] = useState('');
  const [value, setValue] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [keys, setKeys] = useState<string[]>([]);

  async function refreshKeys() {
    const allKeys = await getAllKeys();
    setKeys(allKeys);
  }

  useEffect(() => {
    refreshKeys();
  }, []);

  async function handleSet() {
    if (!key) return;
    await setItem(key, value);
    setResult(`Saved "${key}" = "${value}"`);
    refreshKeys();
  }

  async function handleGet() {
    if (!key) return;
    const val = await getItem(key);
    setResult(val !== null ? `"${key}" = "${val}"` : `Key "${key}" not found`);
  }

  async function handleRemove() {
    if (!key) return;
    await removeItem(key);
    setResult(`Removed "${key}"`);
    refreshKeys();
  }

  return (
    <Flex.V gap="6">
      <PageHeader title="Storage" description="Persistent key-value storage with Preferences" />

      <Card>
        <Flex.V gap="4">
          <Input
            label="Key"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder="Enter a key"
          />
          <Input
            label="Value"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Enter a value"
          />
          <Flex.H gap="3" wrap="wrap">
            <Button colorPalette="blue" onClick={handleSet} flex="1" minWidth="100px">
              <LuPlus /> Set
            </Button>
            <Button
              colorPalette="teal"
              variant="outline"
              onClick={handleGet}
              flex="1"
              minWidth="100px"
            >
              <LuSearch /> Get
            </Button>
            <Button
              colorPalette="red"
              variant="outline"
              onClick={handleRemove}
              flex="1"
              minWidth="100px"
            >
              <LuTrash /> Remove
            </Button>
          </Flex.H>
        </Flex.V>
      </Card>

      {result && (
        <Card colorPalette="blue">
          <Text color="blue.fg">{result}</Text>
        </Card>
      )}

      <Card>
        <Flex.V gap="3">
          <Flex.H align="center" gap="2">
            <LuDatabase size={16} />
            <Text fontWeight="medium">Stored Keys ({keys.length})</Text>
          </Flex.H>
          {keys.length > 0 ? (
            <Flex.V gap="2">
              {keys.map((k) => (
                <Flex.H
                  key={k}
                  align="center"
                  justify="space-between"
                  px="3"
                  py="2"
                  bg="bg.subtle"
                  rounded="md"
                >
                  <Text fontSize="sm">{k}</Text>
                  <Button
                    size="sm"
                    variant="ghost"
                    colorPalette="red"
                    onClick={async () => {
                      await removeItem(k);
                      refreshKeys();
                    }}
                  >
                    <LuTrash />
                  </Button>
                </Flex.H>
              ))}
            </Flex.V>
          ) : (
            <Text fontSize="sm" color="fg.muted">
              No keys stored yet
            </Text>
          )}
        </Flex.V>
      </Card>
    </Flex.V>
  );
}
