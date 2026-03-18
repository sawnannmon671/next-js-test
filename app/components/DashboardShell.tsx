"use client";

import { AppShell, Burger, Group, NavLink, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconDashboard, IconSettings, IconUsers } from '@tabler/icons-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const [opened, { toggle }] = useDisclosure();
  const pathname = usePathname();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Title order={3}>My Dashboard</Title>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <NavLink
          component={Link}
          href="/"
          label="Dashboard"
          leftSection={<IconDashboard size="1rem" stroke={1.5} />}
          active={pathname === '/'}
          onClick={toggle}
        />
        <NavLink
          component={Link}
          href="/settings"
          label="Settings"
          leftSection={<IconSettings size="1rem" stroke={1.5} />}
          active={pathname === '/settings'}
          onClick={toggle}
        />
        <NavLink
          component={Link}
          href="/user-management"
          label="User Management"
          leftSection={<IconUsers size="1rem" stroke={1.5} />}
          active={pathname === '/user-management'}
          onClick={toggle}
        />
      </AppShell.Navbar>

      <AppShell.Main>
        {children}
      </AppShell.Main>
    </AppShell>
  );
}
