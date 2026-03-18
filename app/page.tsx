import { Button, Container, Title, Text, Group, Stack } from '@mantine/core';

export default function Home() {
  return (
    <Container size="md" py={100}>
      <Stack align="center" gap="lg">
        <Title order={1} ta="center">
          Welcome to Next.js with Mantine!
        </Title>
        <Text size="lg" c="dimmed" ta="center" maw={600}>
          This project was scaffolded with Next.js 14 App Router and Mantine UI. You can now start building your application using Mantine's rich component library.
        </Text>
        
        <Group mt="md">
          <Button component="a" href="https://mantine.dev" target="_blank" size="lg">
            Mantine Docs
          </Button>
          <Button component="a" href="https://nextjs.org/docs" target="_blank" variant="light" size="lg">
            Next.js Docs
          </Button>
        </Group>
      </Stack>
    </Container>
  );
}
