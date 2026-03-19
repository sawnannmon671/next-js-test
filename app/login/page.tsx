"use client";

import { useForm } from '@mantine/form';
import { TextInput, PasswordInput, Button, Paper, Title, Text, Container, Group, Anchor, Stack } from '@mantine/core';
import { IconLock, IconUser } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { useAppTheme } from '../context/ThemeContext';
import { useState } from 'react';

export default function LoginPage() {
  const { primaryColor } = useAppTheme();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm({
    initialValues: {
      username: '',
      password: '',
    },

    validate: {
      username: (value) => (value.length < 1 ? 'အသုံးပြုသူအမည် ထည့်သွင်းပါ' : null),
      password: (value) => (value.length < 1 ? 'လျှို့ဝှက်နံပါတ် ထည့်သွင်းပါ' : null),
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    setLoading(true);
    setError(null);
    
    try {
      // Connect to Go Backend API
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (response.ok) {
        // Handle successful login (e.g., save token, redirect)
        router.push('/');
      } else {
        setError(data.message || 'လော့ဂ်အင် ဝင်ရောက်ခြင်း မအောင်မြင်ပါ');
      }
    } catch (err) {
      setError('ဆာဗာနှင့် ချိတ်ဆက်၍ မရပါ');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container size={420} my={80}>
      <Title ta="center" fw={900}>ပြန်လည်ကြိုဆိုပါသည်</Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        အကောင့်မရှိသေးပါက{' '}
        <Anchor size="sm" component="button">
          ဆက်သွယ်ရန်
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            <TextInput 
              label="အသုံးပြုသူအမည်" 
              placeholder="သင့်အသုံးပြုသူအမည်" 
              required 
              leftSection={<IconUser size={16} />}
              {...form.getInputProps('username')}
            />
            <PasswordInput 
              label="လျှို့ဝှက်နံပါတ်" 
              placeholder="သင့်လျှို့ဝှက်နံပါတ်" 
              required 
              leftSection={<IconLock size={16} />}
              {...form.getInputProps('password')}
            />
            
            {error && (
              <Text c="red" size="sm" ta="center">
                {error}
              </Text>
            )}

            <Group justify="space-between" mt="lg">
              <Anchor component="button" size="sm">
                လျှို့ဝှက်နံပါတ် မေ့နေပါသလား?
              </Anchor>
            </Group>
            
            <Button 
              fullWidth 
              mt="xl" 
              size="md" 
              color={primaryColor} 
              type="submit"
              loading={loading}
            >
              လော့ဂ်အင် ဝင်မည်
            </Button>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
}
