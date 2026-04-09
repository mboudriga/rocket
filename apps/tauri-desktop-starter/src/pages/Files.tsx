import { Badge, Button, Card, Flex, Spinner, Table, Text } from '@rocket/ui';
import { LuFolder, LuFolderOpen, LuFile as LuFileIcon } from 'react-icons/lu';
import { useCallback, useState } from 'react';
import { PageHeader } from '@/components/common';
import type { FileEntry } from '@/services/commands';
import { listFiles } from '@/services/commands';

function formatSize(bytes: number): string {
  if (bytes === 0) return '\u2014';
  const units = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / 1024 ** i).toFixed(i > 0 ? 1 : 0)} ${units[i]}`;
}

export function Files() {
  const [files, setFiles] = useState<FileEntry[]>([]);
  const [currentPath, setCurrentPath] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadDir = useCallback(async (path: string) => {
    setLoading(true);
    setError(null);
    try {
      const entries = await listFiles(path);
      setFiles(entries);
      setCurrentPath(path);
    } catch (e) {
      setError(String(e));
    } finally {
      setLoading(false);
    }
  }, []);

  const openFolder = useCallback(async () => {
    const { open } = await import('@tauri-apps/plugin-dialog');
    const selected = await open({ directory: true });
    if (selected) await loadDir(selected);
  }, [loadDir]);

  return (
    <Flex.V gap="6">
      <PageHeader
        title="Files"
        description="Browse files using native filesystem access"
        actions={
          <Button colorPalette="blue" onClick={openFolder}>
            <LuFolderOpen /> Open Folder
          </Button>
        }
      />

      {currentPath && (
        <Text fontSize="sm" color="fg.muted" truncate>
          {currentPath}
        </Text>
      )}

      {error && (
        <Card colorPalette="red">
          <Text color="red.fg">{error}</Text>
        </Card>
      )}

      {loading && (
        <Flex.H justify="center" py="8">
          <Spinner size="lg" />
        </Flex.H>
      )}

      {!loading && files.length > 0 && (
        <Card>
          <Table
            size="sm"
            columns={[
              {
                header: 'Name',
                accessorKey: 'name',
                cell: (row) => {
                  const file = row as unknown as FileEntry;
                  return (
                    <Flex.H
                      align="center"
                      gap="2"
                      cursor={file.is_dir ? 'pointer' : 'default'}
                      onClick={() => file.is_dir && loadDir(file.path)}
                    >
                      {file.is_dir ? (
                        <LuFolder size={16} color="var(--chakra-colors-blue-fg)" />
                      ) : (
                        <LuFileIcon size={16} color="var(--chakra-colors-fg-muted)" />
                      )}
                      <Text fontSize="sm" truncate>
                        {file.name}
                      </Text>
                    </Flex.H>
                  );
                },
              },
              {
                header: 'Type',
                accessorKey: 'is_dir',
                cell: (row) => {
                  const file = row as unknown as FileEntry;
                  return (
                    <Badge variant="subtle" size="sm" colorPalette={file.is_dir ? 'blue' : 'gray'}>
                      {file.is_dir ? 'Folder' : 'File'}
                    </Badge>
                  );
                },
              },
              {
                header: 'Size',
                accessorKey: 'size',
                cell: (row) => {
                  const file = row as unknown as FileEntry;
                  return (
                    <Text fontSize="sm" color="fg.muted">
                      {file.is_dir ? '\u2014' : formatSize(file.size)}
                    </Text>
                  );
                },
              },
            ]}
            data={files as unknown as Record<string, unknown>[]}
          />
        </Card>
      )}

      {!loading && files.length === 0 && !currentPath && (
        <Flex.V align="center" gap="3" py="12" color="fg.muted">
          <LuFolder size={48} />
          <Text>Open a folder to browse files</Text>
        </Flex.V>
      )}
    </Flex.V>
  );
}
