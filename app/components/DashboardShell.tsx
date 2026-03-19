"use client";

import { AppShell, Burger, Group, NavLink, Title, ActionIcon, Tooltip, TextInput, Avatar, Text, Menu, Divider, Indicator } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconDashboard, IconSettings, IconUsers, IconLogout, IconBell, IconClock,
  IconSearch, IconMail, IconMoon, IconChevronDown, IconFile, IconLock,
  IconClipboardCheck, IconComponents, IconStar, IconChartBar, IconForms, IconTable, IconMap, IconLayoutGrid, IconAppWindow,
  IconPalette
} from '@tabler/icons-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAppTheme } from '../context/ThemeContext';


export function DashboardShell({ children }: { children: React.ReactNode }) {
  const [opened, { toggle }] = useDisclosure();
  const pathname = usePathname();
  const router = useRouter();
  const { primaryColor } = useAppTheme();

  const handleLogout = () => {
    // Here you would clear cookies/localstorage
    router.push('/login');
  };

  // Dynamic theme colors
  const darkNavBg = primaryColor;
  const lightGreyBg = "#F4F7FC";


  return (
    <AppShell
      layout="alt"
      header={{ height: 60 }}
      navbar={{
        width: 260,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
      bg={lightGreyBg}
    >
      <AppShell.Header bg="white" withBorder={false}>
        <Group h="100%" px="md" justify="space-between">
          <Group>
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" color="gray" />
          </Group>
          <Group gap="sm">
            <Group gap="xs" visibleFrom="xs" style={{ cursor: 'pointer' }}>
              <Text size="sm" c="dimmed">🇺🇸 English</Text>
              <IconChevronDown size={14} color="gray" />
            </Group>

            <Indicator color="red" size={9} offset={5}>
              <ActionIcon variant="subtle" color="gray" size="lg">
                <IconMail size={20} />
              </ActionIcon>
            </Indicator>

            <Indicator color="red" size={9} offset={5}>
              <ActionIcon variant="subtle" color="gray" size="lg">
                <IconBell size={20} />
              </ActionIcon>
            </Indicator>

            <ActionIcon variant="subtle" color="gray" size="lg">
              <IconSettings size={20} />
            </ActionIcon>

            <ActionIcon variant="subtle" color="gray" size="lg">
              <IconMoon size={20} />
            </ActionIcon>

            <Menu shadow="md" width={200}>
              <Menu.Target>
                <Group gap="xs" style={{ cursor: 'pointer', marginLeft: 10 }}>
                  <Avatar radius="xl" size="sm" src="https://i.pravatar.cc/150?img=5" />
                  <Text size="sm" fw={500} visibleFrom="sm" c="dark">Jennifer</Text>
                  <IconChevronDown size={14} color="gray" />
                </Group>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item leftSection={<IconSettings size={14} />}>Settings</Menu.Item>
                <Menu.Item 
                  leftSection={<IconLogout size={14} />} 
                  color="red" 
                  onClick={handleLogout}
                >
                  Logout
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar bg={darkNavBg} c="gray.4" p="md" bd="none">
        <style dangerouslySetInnerHTML={{__html: `
          .custom-navlink {
            border-radius: 8px;
            margin-bottom: 4px;
            color: white !important;
            border: 1px solid transparent;
            transition: all 0.2s ease;
          }
          .custom-navlink[data-active="true"] {
            background-color: rgba(0, 0, 0, 0.2) !important;
            border: 1px solid #339af0 !important;
          }
          .custom-navlink:hover {
            background-color: rgba(0, 0, 0, 0.1) !important;
            border: 1px solid #339af0 !important;
          }
          .custom-navlink .mantine-NavLink-label {
            color: white !important;
          }
          .custom-navlink .mantine-NavLink-section {
            color: white !important;
          }
        `}} />
        <Group mb="xl" px="sm">
          <IconClipboardCheck color="white" size={28} />
          <Title order={4} c="white" style={{ fontFamily: 'var(--font-roboto), sans-serif' }}>Approval System</Title>
        </Group>

        <Divider my="md" color="white" opacity={0.2} />
        
        <NavLink
          component={Link}
          href="/"
          label="Dashboards"
          leftSection={<IconPalette size={18} stroke={1.5} />}
          active={pathname === '/'}
          onClick={toggle}
          variant="filled"
          className="custom-navlink"
          rightSection={<Text size="xs" bg="orange.6" c="white" px={8} py={2} style={{ borderRadius: 10 }}>99+</Text>}
        />
        <NavLink
          component={Link}
          href="/application"
          label="Application"
          leftSection={<IconAppWindow size={18} stroke={1.5} />}
          active={pathname === '/application'}
          onClick={toggle}
          variant="filled"
          className="custom-navlink"
        />
        <NavLink
          component={Link}
          href="/settings"
          label="Settings"
          leftSection={<IconSettings size={18} stroke={1.5} />}
          active={pathname === '/settings'}
          onClick={toggle}
          variant="filled"
          className="custom-navlink"
          rightSection={<IconChevronDown size={14} color="white" />}
        />
        <NavLink
          component={Link}
          href="/user-management"
          label="User Management"
          leftSection={<IconUsers size={18} stroke={1.5} />}
          active={pathname === '/user-management'}
          onClick={toggle}
          variant="filled"
          className="custom-navlink"
        />

      </AppShell.Navbar>

      <AppShell.Main>
        {children}
      </AppShell.Main>
    </AppShell>
  );
}
