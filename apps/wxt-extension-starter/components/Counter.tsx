import { Button, Flex, Text } from '@rocket/ui';
import { LuMinus, LuPlus, LuRotateCcw } from 'react-icons/lu';

export function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    counterStorage.getValue().then(setCount);
    const unwatch = counterStorage.watch((value: number | null) => setCount(value ?? 0));
    return () => unwatch();
  }, []);

  const increment = async () => {
    const current = await counterStorage.getValue();
    await counterStorage.setValue(current + 1);
  };

  const decrement = async () => {
    const current = await counterStorage.getValue();
    await counterStorage.setValue(current - 1);
  };

  const reset = async () => {
    await counterStorage.setValue(0);
  };

  return (
    <Flex.V gap={2}>
      <Text fontWeight="bold" color="fg.muted" fontSize="sm">
        Counter
      </Text>
      <Flex.H gap={2} align="center">
        <Button size="sm" variant="outline" onClick={decrement}>
          <LuMinus />
        </Button>
        <Text fontWeight="bold" fontSize="lg" minW="40px" textAlign="center">
          {count}
        </Text>
        <Button size="sm" variant="outline" onClick={increment}>
          <LuPlus />
        </Button>
        <Button size="sm" variant="ghost" onClick={reset}>
          <LuRotateCcw />
        </Button>
      </Flex.H>
    </Flex.V>
  );
}
