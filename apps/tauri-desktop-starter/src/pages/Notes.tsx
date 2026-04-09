import {
  Button,
  Card,
  Flex,
  IconButton,
  Input,
  Spinner,
  Text,
  Textarea,
} from '@rocket/ui';
import { LuPencil, LuPlus, LuStickyNote, LuTrash } from 'react-icons/lu';
import { useCallback, useEffect, useState } from 'react';
import { PageHeader } from '@/components/common';
import { useNotesStore } from '@/stores/notes-store';

export function Notes() {
  const { notes, loading, fetchNotes, addNote, updateNote, removeNote } = useNotesStore();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  const handleSave = useCallback(async () => {
    if (!title.trim()) return;
    if (editingId) {
      await updateNote(editingId, title, content);
      setEditingId(null);
    } else {
      await addNote(title, content);
    }
    setTitle('');
    setContent('');
  }, [title, content, editingId, addNote, updateNote]);

  const handleEdit = useCallback(
    (id: string) => {
      const note = notes.find((n) => n.id === id);
      if (!note) return;
      setTitle(note.title);
      setContent(note.content);
      setEditingId(id);
    },
    [notes],
  );

  const handleCancel = useCallback(() => {
    setTitle('');
    setContent('');
    setEditingId(null);
  }, []);

  return (
    <Flex.V gap="6">
      <PageHeader title="Notes" description="Persistent notes stored locally on your machine" />

      <Card>
        <Flex.V gap="3">
          <Input
            label="Title"
            placeholder="Note title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Textarea
            label="Content"
            placeholder="Write your note..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
          />
          <Flex.H gap="2" justify="flex-end">
            {editingId && (
              <Button variant="ghost" onClick={handleCancel}>
                Cancel
              </Button>
            )}
            <Button colorPalette="blue" onClick={handleSave} disabled={!title.trim()}>
              <LuPlus /> {editingId ? 'Update' : 'Add'} Note
            </Button>
          </Flex.H>
        </Flex.V>
      </Card>

      {loading && (
        <Flex.H justify="center" py="8">
          <Spinner size="lg" />
        </Flex.H>
      )}

      {!loading && notes.length === 0 && (
        <Flex.V align="center" gap="3" py="12" color="fg.muted">
          <LuStickyNote size={48} />
          <Text>No notes yet. Create your first note above.</Text>
        </Flex.V>
      )}

      <Flex.V gap="3">
        {notes.map((note) => (
          <Card key={note.id}>
            <Flex.H justify="space-between" align="start" gap="4">
              <Flex.V gap="1" flex="1">
                <Text fontWeight="semibold">{note.title}</Text>
                <Text color="fg.muted" fontSize="sm" whiteSpace="pre-wrap">
                  {note.content}
                </Text>
                <Text color="fg.subtle" fontSize="xs" mt="1">
                  {new Date(note.updated_at).toLocaleString()}
                </Text>
              </Flex.V>
              <Flex.H gap="1" flexShrink={0}>
                <IconButton
                  aria-label="Edit"
                  variant="ghost"
                  size="sm"
                  onClick={() => handleEdit(note.id)}
                >
                  <LuPencil />
                </IconButton>
                <IconButton
                  aria-label="Delete"
                  variant="ghost"
                  size="sm"
                  colorPalette="red"
                  onClick={() => removeNote(note.id)}
                >
                  <LuTrash />
                </IconButton>
              </Flex.H>
            </Flex.H>
          </Card>
        ))}
      </Flex.V>
    </Flex.V>
  );
}
