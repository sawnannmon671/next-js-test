"use client";

import { useRouter } from 'next/navigation';
import { UserCreateForm } from '../UserCreateForm';
import { Container, Title, Button, Group, Breadcrumbs, Anchor, Stack, Paper } from '@mantine/core';
import { IconChevronLeft } from '@tabler/icons-react';
import Link from 'next/link';
import { useAppTheme } from '../../context/ThemeContext';

export default function CreateUserPage() {
  const router = useRouter();

  const handleBack = () => {
    router.push('/user-management');
  };

  const handleSubmit = (values: any) => {
    console.log('User data to save:', values);
    // Here you would typically call your Go gRPC backend via an API route
    // For now, let's just go back to the list
    router.push('/user-management');
  };

  const items = [
    { title: 'Dashboard', href: '/' },
    { title: 'User Management', href: '/user-management' },
    { title: 'Create User', href: '#' },
  ].map((item, index) => (
    <Anchor component={Link} href={item.href} key={index} c="dimmed" size="sm">
      {item.title}
    </Anchor>
  ));

  return (
    <Container size="xl" py="xl">
      <Stack gap="xl">
        <Breadcrumbs>{items}</Breadcrumbs>

        <Title order={2} fw={700}>Create New User</Title>

        <Paper withBorder p="xl" radius="md" shadow="sm">
          <UserCreateForm onCancel={handleBack} onSubmit={handleSubmit} />
        </Paper>
      </Stack>
    </Container>
  );
}
