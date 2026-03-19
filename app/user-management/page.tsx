"use client";

import { useState } from 'react';
import { Title, Table, Card, Badge, ActionIcon, Group, Button, Stack, Text, Anchor } from '@mantine/core';
import { IconEdit, IconTrash, IconUserPlus, IconSearch, IconFilter } from '@tabler/icons-react';
import Link from 'next/link';
import { useAppTheme } from '../context/ThemeContext';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
}

export default function UserManagementPage() {
  const { primaryColor } = useAppTheme();
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: 'Alice Smith', email: 'alice@example.com', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Bob Jones', email: 'bob@example.com', role: 'User', status: 'Inactive' },
    { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', role: 'User', status: 'Active' },
  ]);

  const rows = users.map((user: User) => (
    <Table.Tr key={user.id} style={{ transition: 'background-color 0.2s ease' }}>
      <Table.Td>
        <Group gap="sm">
          <IconUserPlus size={16} color="gray" />
          <Text size="sm" fw={500}>{user.name}</Text>
        </Group>
      </Table.Td>
      <Table.Td>{user.email}</Table.Td>
      <Table.Td>
        <Badge variant="outline" color="blue" radius="sm">{user.role}</Badge>
      </Table.Td>
      <Table.Td>
        <Badge color={user.status === 'Active' ? 'green' : 'gray'} radius="sm">{user.status}</Badge>
      </Table.Td>
      <Table.Td>
        <Group gap="sm">
          <ActionIcon variant="light" color="blue" radius="md" title="Edit User"><IconEdit size={16} /></ActionIcon>
          <ActionIcon variant="light" color="red" radius="md" onClick={() => setUsers(users.filter(u => u.id !== user.id))} title="Delete User"><IconTrash size={16} /></ActionIcon>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Stack gap="xl">
      <Group justify="space-between" align="center">
        <Stack gap={0}>
          <Title order={2}>User Management</Title>
          <Text c="dimmed" size="sm">Manage your team member access and permissions</Text>
        </Stack>
        <Button 
          component={Link}
          href="/user-management/create"
          leftSection={<IconUserPlus size={18} />} 
          size="md" 
          radius="md"
          color={primaryColor}
        >
          Add New User
        </Button>
      </Group>

      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Table verticalSpacing="md" horizontalSpacing="md" striped highlightOnHover>
          <Table.Thead bg="gray.0">
            <Table.Tr>
              <Table.Th>User Details</Table.Th>
              <Table.Th>Email Address</Table.Th>
              <Table.Th>Access Role</Table.Th>
              <Table.Th>Account Status</Table.Th>
              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Card>
    </Stack>
  );
}
