"use client";

import { Title, Text, Card, Stack, Box } from '@mantine/core';

export default function ApplicationPage() {
  return (
    <Box p="md">
      <Title order={2} mb="md">Application</Title>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Stack>
          <Text size="lg" fw={500}>Application Overview</Text>
          <Text c="dimmed">
            This is the main application workspace. You can add your core business logic, 
            forms, and operational data here.
          </Text>
        </Stack>
      </Card>
    </Box>
  );
}
