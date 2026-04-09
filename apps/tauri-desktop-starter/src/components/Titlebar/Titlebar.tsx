import { Flex, Heading, IconButton } from '@rocket/ui';
import { LuMinus, LuSquare, LuX } from 'react-icons/lu';
import { usePlatform } from '@/hooks';

const isTauri = typeof window !== 'undefined' && '__TAURI_INTERNALS__' in window;

async function minimizeWindow() {
  if (!isTauri) return;
  const { getCurrentWindow } = await import('@tauri-apps/api/window');
  getCurrentWindow().minimize();
}

async function toggleMaximizeWindow() {
  if (!isTauri) return;
  const { getCurrentWindow } = await import('@tauri-apps/api/window');
  getCurrentWindow().toggleMaximize();
}

async function closeWindow() {
  if (!isTauri) return;
  const { getCurrentWindow } = await import('@tauri-apps/api/window');
  getCurrentWindow().close();
}

function WindowControls({ isMac }: { isMac: boolean }) {
  return (
    <Flex.H gap="0" flexShrink={0}>
      {isMac && (
        <>
          <IconButton
            aria-label="Close"
            variant="ghost"
            size="xs"
            rounded="full"
            onClick={closeWindow}
            _hover={{ bg: 'red.solid', color: 'red.contrast' }}
          >
            <LuX />
          </IconButton>
          <IconButton
            aria-label="Minimize"
            variant="ghost"
            size="xs"
            rounded="full"
            onClick={minimizeWindow}
            _hover={{ bg: 'bg.subtle' }}
          >
            <LuMinus />
          </IconButton>
          <IconButton
            aria-label="Maximize"
            variant="ghost"
            size="xs"
            rounded="full"
            onClick={toggleMaximizeWindow}
            _hover={{ bg: 'bg.subtle' }}
          >
            <LuSquare />
          </IconButton>
        </>
      )}
      {!isMac && (
        <>
          <IconButton
            aria-label="Minimize"
            variant="ghost"
            size="sm"
            rounded="none"
            onClick={minimizeWindow}
            _hover={{ bg: 'bg.subtle' }}
          >
            <LuMinus />
          </IconButton>
          <IconButton
            aria-label="Maximize"
            variant="ghost"
            size="sm"
            rounded="none"
            onClick={toggleMaximizeWindow}
            _hover={{ bg: 'bg.subtle' }}
          >
            <LuSquare />
          </IconButton>
          <IconButton
            aria-label="Close"
            variant="ghost"
            size="sm"
            rounded="none"
            onClick={closeWindow}
            _hover={{ bg: 'red.solid', color: 'red.contrast' }}
          >
            <LuX />
          </IconButton>
        </>
      )}
    </Flex.H>
  );
}

export function Titlebar() {
  const platform = usePlatform();
  const isMac = platform === 'macos';

  return (
    <Flex.H
      data-tauri-drag-region
      align="center"
      height="36px"
      flexShrink={0}
      bg="bg"
      borderBottom="1px solid"
      borderColor="border"
      px="3"
    >
      {isMac && <WindowControls isMac />}

      <Flex.H flex="1" justify="center" data-tauri-drag-region>
        <Heading size="xs" color="fg.muted" fontWeight="medium" data-tauri-drag-region>
          Tauri Starter
        </Heading>
      </Flex.H>

      {!isMac && <WindowControls isMac={false} />}
    </Flex.H>
  );
}
