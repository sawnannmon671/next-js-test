"use client";

import { Title, Table, Card, Badge, ActionIcon, Group } from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons-react';

export default function UserManagementPage() {
  const users = [
    { id: 1, name: 'Alice Smith', email: 'alice@example.com', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Bob Jones', email: 'bob@example.com', role: 'User', status: 'Inactive' },
    { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', role: 'User', status: 'Active' },
  ];

  const rows = users.map((user) => (
    <Table.Tr key={user.id}>
      <Table.Td>{user.name}</Table.Td>
      <Table.Td>{user.email}</Table.Td>
      <Table.Td>{user.role}</Table.Td>
      <Table.Td>
        <Badge color={user.status === 'Active' ? 'green' : 'gray'}>{user.status}</Badge>
      </Table.Td>
      <Table.Td>
        <Group gap="sm">
          <ActionIcon variant="subtle" color="blue"><IconEdit size={16} /></ActionIcon>
          <ActionIcon variant="subtle" color="red"><IconTrash size={16} /></ActionIcon>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      <Title order={2} mb="md">User Management</Title>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Table striped highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Name</Table.Th>
              <Table.Th>Email</Table.Th>
              <Table.Th>Role</Table.Th>
              <Table.Th>Status</Table.Th>
              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Card>
    </>
  );
}
