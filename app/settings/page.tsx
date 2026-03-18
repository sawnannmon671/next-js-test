"use client";

import { Title, Switch, Stack, Card, ColorInput, Text, Group } from '@mantine/core';
import { useAppTheme } from '../context/ThemeContext';


export default function SettingsPage() {
  const { primaryColor, setPrimaryColor } = useAppTheme();

  return (
    <>
      <Title order={2} mb="md">Settings</Title>
      
      <Card shadow="sm" padding="lg" radius="md" withBorder mb="md">
        <Text fw={500} mb="md">Appearance & Theme</Text>
        <Stack>
          <Group justify="space-between">
            <Text size="sm">Primary Theme Color</Text>
            <ColorInput 
              value={primaryColor} 
              onChange={setPrimaryColor} 
              format="hex"
              swatches={['#2e2e2e', '#868e96', '#fa5252', '#e64980', '#be4bdb', '#7950f2', '#4c6ef5', '#228be6', '#15aabf', '#12b886', '#40c057', '#82c91e', '#fab005', '#fd7e14']}
            />
          </Group>
          <Switch label="Dark Mode" description="Automatically switch theme based on system preference" />
        </Stack>
      </Card>

      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Text fw={500} mb="md">Notifications & Security</Text>
        <Stack>
          <Switch label="Enable Notifications" description="Receive daily email summaries" defaultChecked />
          <Switch label="Two-Factor Authentication" description="Require a second verification step" />
        </Stack>
      </Card>
    </>
  );
}
