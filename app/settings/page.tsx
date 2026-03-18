"use client";

import { Title, Switch, Stack, Card } from '@mantine/core';

export default function SettingsPage() {
  return (
    <>
      <Title order={2} mb="md">Settings</Title>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Stack>
          <Switch label="Enable Notifications" description="Receive daily email summaries" defaultChecked />
          <Switch label="Dark Mode" description="Automatically switch theme based on system preference" />
          <Switch label="Two-Factor Authentication" description="Require a second verification step" />
        </Stack>
      </Card>
    </>
  );
}
