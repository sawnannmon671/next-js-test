"use client";

import { Title, Text, Card, Grid } from '@mantine/core';

export default function Home() {
  return (
    <>
      <Title order={2} mb="md">Dashboard Overview</Title>
      <Grid>
        <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Title order={4}>Total Users</Title>
            <Text size="xl" fw={700} mt="md">1,234</Text>
          </Card>
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Title order={4}>Active Sessions</Title>
            <Text size="xl" fw={700} mt="md">423</Text>
          </Card>
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Title order={4}>System Status</Title>
            <Text size="xl" fw={700} c="green" mt="md">Online</Text>
          </Card>
        </Grid.Col>
      </Grid>
    </>
  );
}
