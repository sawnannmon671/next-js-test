"use client";

import { useForm } from '@mantine/form';
import { 
  TextInput, 
  Button, 
  Group, 
  Select, 
  Stack, 
  Paper, 
  Title, 
  Text, 
  Radio, 
  SimpleGrid, 
  Divider,
  Textarea
} from '@mantine/core';
import { useAppTheme } from '../context/ThemeContext';

interface UserCreateFormProps {
  onCancel?: () => void;
  onSubmit: (values: any) => void;
}

export function UserCreateForm({ onCancel, onSubmit }: UserCreateFormProps) {
  const { primaryColor } = useAppTheme();
  
  const form = useForm({
    initialValues: {
      userType: 'Admin / Staff',
      name: '',
      username: '',
      email: '',
      phone: '',
      role: 'Super Admin',
      kwin: '',
      nrcState: '4/ - ၄',
      nrcTownship: '',
      nrcType: 'Y (ယာယီ)',
      nrcNumber: '',
      region: 'Yangon',
      city: '',
      district: '',
      township: '',
      address: '',
      notes: '',
    },

    validate: {
      name: (value) => (value.length < 1 ? 'အမည် လိုအပ်ပါသည်' : null),
      username: (value) => (value.length < 1 ? 'အသုံးပြုသူအမည် လိုအပ်ပါသည်' : null),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'အီးမေးလ် ပုံစံ မှားယွင်းနေပါသည်'),
    },
  });

  return (
    <Paper shadow="none" p={0} radius="md" bg="transparent">
      {/* User Type Selection */}
      <Paper p="md" mb="xl" withBorder radius="md" bg="blue.0" style={{ borderColor: '#d0ebff' }}>
        <Stack gap="xs">
          <Text fw={700} c="blue.9" size="sm">အကောင့်အမျိုးအစား ရွေးချယ်ပါ</Text>
          <Radio.Group {...form.getInputProps('userType')}>
            <Group>
              <Radio value="Public User" label="Public User" />
              <Radio value="Admin / Staff" label="Admin / Staff" />
            </Group>
          </Radio.Group>
        </Stack>
      </Paper>

      <form onSubmit={form.onSubmit(onSubmit)}>
        <Stack gap="xl">
          {/* Section 1: Basic Information */}
          <section>
            <Title order={4} mb="md" fw={700}>အခြေခံအချက်အလက်များ</Title>
            <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="md">
              <TextInput
                label="အမည်"
                placeholder="ဦးလှမောင်"
                required
                {...form.getInputProps('name')}
              />
              <TextInput
                label="အသုံးပြုသူအမည်"
                placeholder="ဦးလှ"
                required
                {...form.getInputProps('username')}
              />
              <TextInput
                label="အီးမေးလ်"
                placeholder="snanmon56@gmail.com"
                required
                {...form.getInputProps('email')}
              />
              <TextInput
                label="ဖုန်းနံပါတ်"
                placeholder="0959825922"
                required
                {...form.getInputProps('phone')}
              />
              <Select
                label="အက်ဒမင်အဆင့်"
                data={['Super Admin', 'Admin', 'Officer', 'User']}
                required
                {...form.getInputProps('role')}
              />
              <TextInput
                label="admin level"
                placeholder=""
                required
                {...form.getInputProps('kwin')}
              />
            </SimpleGrid>
          </section>

          <Divider my="sm" opacity={0.5} />

          {/* Section 2: NRC / Identification */}
          <section>
            <Title order={4} mb="md" fw={700}>မှတ်ပုံတင်နှင့် အထောက်အထားများ</Title>
            <SimpleGrid cols={{ base: 1, sm: 4 }} spacing="md">
              <Select
                label="ပြည်နယ်/တိုင်း ကုဒ်"
                data={['4/ - ၄', '12/ - ၁၂', '13/ - ၁၃', '9/ - ၉']}
                required
                {...form.getInputProps('nrcState')}
              />
              <Select
                label="မြို့နယ် ကုဒ်"
                placeholder="မြို့နယ်ကုဒ်"
                data={['မြို့နယ်ကုဒ်', 'ဗဟန်း', 'ဒဂုံ']}
                required
                {...form.getInputProps('nrcTownship')}
              />
              <Select
                label="အမျိုးအစား"
                data={['Y (ယာယီ)', 'N (နိုင်)', 'E (ဧည့်)']}
                required
                {...form.getInputProps('nrcType')}
              />
              <TextInput
                label="နံပါတ်"
                placeholder="၁၂၃၄၅၆"
                required
                {...form.getInputProps('nrcNumber')}
              />
            </SimpleGrid>
          </section>

          <Divider my="sm" opacity={0.5} />

          {/* Section 3: Address and Location */}
          <section>
            <Title order={4} mb="md" fw={700}>ဆက်သွယ်ရန်လိပ်စာနှင့် ဒေသ</Title>
            <SimpleGrid cols={{ base: 1, sm: 4 }} spacing="md">
              <Select
                label="တိုင်းဒေသကြီး/ပြည်နယ်"
                data={['Yangon', 'Mandalay', 'Naypyidaw']}
                required
                {...form.getInputProps('region')}
              />
              <Select
                label="မြို့တော်/ခရိုင်ခွဲ"
                placeholder="ရွေးချယ်ပါ"
                data={['ရွေးချယ်ပါ']}
                required
                {...form.getInputProps('city')}
              />
              <Select
                label="ခရိုင်"
                placeholder="ရွေးချယ်ပါ"
                data={['ရွေးချယ်ပါ']}
                required
                {...form.getInputProps('district')}
              />
              <Select
                label="မြို့နယ်"
                placeholder="ရွေးချယ်ပါ"
                data={['ရွေးချယ်ပါ']}
                required
                {...form.getInputProps('township')}
              />
            </SimpleGrid>
            <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md" mt="md">
              <Textarea
                label="နေရပ်လိပ်စာအပြည့်အစုံ"
                placeholder="အမှတ် (၁၂၃)၊ လမ်းမတော်လမ်း..."
                minRows={3}
                {...form.getInputProps('address')}
              />
              <Textarea
                label="မှတ်ချက်"
                placeholder=""
                minRows={3}
                {...form.getInputProps('notes')}
              />
            </SimpleGrid>
          </section>

          {/* Action Buttons */}
          <Group justify="flex-end" mt="xl" gap="md">
            <Button 
              size="md" 
              radius="md" 
              px={30} 
              color="blue.5"
              type="submit"
            >
              တင်သွင်းမည်
            </Button>
            <Button 
              size="md" 
              radius="md" 
              px={30} 
              color="red.5"
              variant="filled"
              onClick={onCancel}
            >
              ပယ်ဖျက်မည်
            </Button>
            <Button 
              size="md" 
              radius="md" 
              px={30} 
              color="green.5"
              variant="filled"
              onClick={() => console.log('Draft saved')}
            >
              သိမ်းဆည်းသည်
            </Button>
          </Group>
        </Stack>
      </form>
    </Paper>
  );
}
