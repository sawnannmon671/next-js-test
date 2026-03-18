"use client";

import { Title, Text, Card, Grid, Group, Breadcrumbs, Anchor, Flex, Paper, Box, Table, Badge, Avatar, Divider } from '@mantine/core';
import { IconEye, IconWallet, IconShoppingBag, IconUsersGroup } from '@tabler/icons-react';
import { useAppTheme } from './context/ThemeContext';


export default function Home() {
  const { primaryColor } = useAppTheme();
  const items = [

    { title: 'Approval System', href: '#' },
    { title: 'Dashboards', href: '#' },
    { title: 'Welcome!', href: '#' },
  ].map((item, index) => (
    <Anchor href={item.href} key={index} size="sm" c="dimmed">
      {item.title}
    </Anchor>
  ));

  return (
    <Box p="md">
      {/* Top Header Breadcrumb */}
      <Group justify="space-between" mb="xl">
        <Title order={3} fw={400} c="dark.7">Welcome!</Title>
        <Breadcrumbs>{items}</Breadcrumbs>
      </Group>

      {/* 4 Stat Cards */}
      <Grid gutter="md" mb="xl">
        {/* Daily Visits */}
        <Grid.Col span={{ base: 12, sm: 6, lg: 3 }}>
          <Card padding="lg" radius="md" bg="#FF5E7E" c="white" style={{ position: 'relative', overflow: 'hidden' }}>
            <Text size="xs" fw={700} tt="uppercase" mb="xs">DAILY VISITS</Text>
            <Title order={1} fw={400} mb="xs">8,652</Title>
            <Group gap="xs">
              <Text size="xs" fw={700}>2.97%</Text>
              <Text size="xs" opacity={0.8}>Since last month</Text>
            </Group>
            <IconEye size={50} style={{ position: 'absolute', right: 20, top: '50%', transform: 'translateY(-50%)', opacity: 0.3 }} />
          </Card>
        </Grid.Col>

        {/* Revenue */}
        <Grid.Col span={{ base: 12, sm: 6, lg: 3 }}>
          <Card padding="lg" radius="md" bg="#8C8CDC" c="white" style={{ position: 'relative', overflow: 'hidden' }}>
            <Text size="xs" fw={700} tt="uppercase" mb="xs">REVENUE</Text>
            <Title order={1} fw={400} mb="xs">$9,254.62</Title>
            <Group gap="xs">
              <Text size="xs" fw={700}>18.25%</Text>
              <Text size="xs" opacity={0.8}>Since last month</Text>
            </Group>
            <IconWallet size={50} style={{ position: 'absolute', right: 20, top: '50%', transform: 'translateY(-50%)', opacity: 0.3 }} />
          </Card>
        </Grid.Col>

        {/* Orders */}
        <Grid.Col span={{ base: 12, sm: 6, lg: 3 }}>
          <Card padding="lg" radius="md" bg={primaryColor} c="white" style={{ position: 'relative', overflow: 'hidden' }}>
            <Text size="xs" fw={700} tt="uppercase" mb="xs">ORDERS</Text>
            <Title order={1} fw={400} mb="xs">753</Title>
            <Group gap="xs">
              <Text size="xs" fw={700}>-5.75%</Text>
              <Text size="xs" opacity={0.8}>Since last month</Text>
            </Group>
            <IconShoppingBag size={50} style={{ position: 'absolute', right: 20, top: '50%', transform: 'translateY(-50%)', opacity: 0.3 }} />
          </Card>
        </Grid.Col>

        {/* Users */}
        <Grid.Col span={{ base: 12, sm: 6, lg: 3 }}>
          <Card padding="lg" radius="md" bg="#3BC8BA" c="white" style={{ position: 'relative', overflow: 'hidden' }}>
            <Text size="xs" fw={700} tt="uppercase" mb="xs">USERS</Text>
            <Title order={1} fw={400} mb="xs">63,154</Title>
            <Group gap="xs">
              <Text size="xs" fw={700}>8.21%</Text>
              <Text size="xs" opacity={0.8}>Since last month</Text>
            </Group>
            <IconUsersGroup size={50} style={{ position: 'absolute', right: 20, top: '50%', transform: 'translateY(-50%)', opacity: 0.3 }} />
          </Card>
        </Grid.Col>
      </Grid>

      {/* Charts / Lower Section Placeholders */}
      <Grid gutter="md">
        <Grid.Col span={{ base: 12, md: 8 }}>
          <Paper shadow="sm" p="md" radius="md" withBorder style={{ minHeight: 400 }}>
            <Group justify="space-between" mb="md">
              <Title order={5} fw={500} c="dimmed">Weekly Sales Report</Title>
              <Group gap="xs">
                {/* Window control icons placeholder */}
                <Text size="sm" c="dimmed">◯ - x</Text>
              </Group>
            </Group>
            
            {/* Very rough placeholder for the bar chart look using Flex */}
            <Flex h={250} align="flex-end" justify="space-around" mt="xl" mx="xl" style={{ borderBottom: '1px solid #eee' }}>
              <div style={{ width: 30, height: '60%', backgroundColor: primaryColor }} />
              <div style={{ width: 30, height: '80%', backgroundColor: primaryColor }} />
              <div style={{ width: 30, height: '50%', backgroundColor: primaryColor }} />
              <div style={{ width: 30, height: '90%', backgroundColor: primaryColor }} />
              <div style={{ width: 30, height: '40%', backgroundColor: primaryColor }} />
              <div style={{ width: 30, height: '70%', backgroundColor: primaryColor }} />
            </Flex>
          </Paper>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 4 }}>
          <Paper shadow="sm" p="md" radius="md" withBorder style={{ minHeight: 400 }}>
            <Group justify="space-between" mb="md">
              <Title order={5} fw={500} c="dimmed">Yearly Sales Report</Title>
              <Text size="sm" c="dimmed">◯ - x</Text>
            </Group>
            <Flex h={150} align="center" justify="center" mt="xl">
              <Text c="dimmed">[ Line Chart Placeholder ]</Text>
            </Flex>
            <Divider my="md" />
            <Text size="xl" fw={700}>69.25%</Text>
            <Text size="xs" c="dimmed">US DOLLAR SHARE</Text>
          </Paper>
        </Grid.Col>
      </Grid>
      {/* Lower Section (Chat & Projects) Placeholders */}
      <Grid gutter="md" mt="md">
        <Grid.Col span={{ base: 12, md: 4 }}>
          <Paper shadow="sm" p="md" radius="md" withBorder style={{ minHeight: 300 }}>
            <Group justify="space-between" mb="md">
              <Title order={5} fw={500} c="dimmed">Chat</Title>
              <Text size="sm" c="dimmed">◯ - x</Text>
            </Group>
            <Group mb="md">
              <Avatar radius="xl" src="https://i.pravatar.cc/150?img=5" />
              <div>
                <Text size="sm" fw={500}>Geneva</Text>
                <Text size="xs" c="dimmed">Hello!</Text>
              </div>
            </Group>
            <Group justify="flex-end" mb="md">
              <div style={{ textAlign: 'right' }}>
                <Text size="sm" fw={500}>Jennifer</Text>
                <Text size="xs" bg="rgba(0,0,0,0.05)" c={primaryColor} p={8} style={{ borderRadius: 8, border: `1px solid ${primaryColor}22` }}>Hi, How are you? What about our next...</Text>
              </div>
              <Avatar radius="xl" src="https://i.pravatar.cc/150?img=5" />
            </Group>
          </Paper>
        </Grid.Col>
        
        <Grid.Col span={{ base: 12, md: 8 }}>
          <Paper shadow="sm" p="md" radius="md" withBorder style={{ minHeight: 300 }}>
            <Group justify="space-between" mb="md">
              <Title order={5} fw={500} c="dimmed">Projects</Title>
              <Text size="sm" c="dimmed">◯ - x</Text>
            </Group>
            <Table verticalSpacing="sm">
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>#</Table.Th>
                  <Table.Th>Project Name</Table.Th>
                  <Table.Th>Start Date</Table.Th>
                  <Table.Th>Due Date</Table.Th>
                  <Table.Th>Status</Table.Th>
                  <Table.Th>Assign</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                <Table.Tr>
                  <Table.Td>1</Table.Td>
                  <Table.Td>Approval System Admin v1</Table.Td>
                  <Table.Td>01/01/2015</Table.Td>
                  <Table.Td>26/04/2015</Table.Td>
                  <Table.Td><Badge color={primaryColor} variant="light">Released</Badge></Table.Td>
                  <Table.Td>Techzaa Studio</Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td>2</Table.Td>
                  <Table.Td>Approval System Frontend v1</Table.Td>
                  <Table.Td>01/01/2015</Table.Td>
                  <Table.Td>26/04/2015</Table.Td>
                  <Table.Td><Badge color={primaryColor} variant="light">Released</Badge></Table.Td>
                  <Table.Td>Techzaa Studio</Table.Td>
                </Table.Tr>
              </Table.Tbody>
            </Table>
          </Paper>
        </Grid.Col>
      </Grid>
    </Box>
  );
}
