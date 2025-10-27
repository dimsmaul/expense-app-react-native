import AppBar from '@/components/appbar';
import BarChart from '@/components/barchart';
import { List } from '@/components/list';
import Preview from '@/components/preview';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { useHome } from '@/hooks/home/useHome';
import { useAuthStore } from '@/store/auth';
import { formatMoney } from '@/utils/format-money';
import { toCapitalize } from '@/utils/to-capitalize';
import { router } from 'expo-router';
import { ArrowDownRight, ArrowUpRight, DollarSign } from 'lucide-react-native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, TouchableOpacity, View } from 'react-native';

function Dashboard() {
  const { t } = useTranslation();

  const { user } = useAuthStore();
  const { data } = useHome();

  const { data: list } = data;

  function getGreeting() {
    const hour = new Date().getHours();

    if (hour < 12) return t('greetings.morning');
    if (hour < 18) return t('greetings.afternoon');
    return t('greetings.evening');
  }

  return (
    <>
      <AppBar
        leftContent={
          <View className="flex flex-row items-center gap-3 px-4 py-3">
            <Avatar alt={user?.name || ''}>
              <AvatarFallback>
                <Text>{user?.name?.charAt(0).toUpperCase() ?? 'U'}</Text>
              </AvatarFallback>
            </Avatar>
            <View>
              <Text className="text-sm font-semibold">{getGreeting()}</Text>
              <Text className="text-[12px]">{toCapitalize(user?.name || '')}</Text>
            </View>
          </View>
        }
      />

      <ScrollView>
        <View className="flex flex-col gap-3 p-3">
          <>
            <View className="gap-3 rounded-md border border-border bg-blue-500 p-3 !text-white">
              <View className="flex flex-row items-center gap-2">
                <Icon as={DollarSign} className="size-5 text-white" />
                <Text className="font-semibold text-white">{t('home.total-balance')}</Text>
              </View>
              <Text className="text-2xl font-bold text-white">
                {formatMoney(list?.data?.saldo || 0)}
              </Text>
            </View>
            <View className="flex flex-row gap-3">
              <View className="flex-1 rounded-md border border-border p-3">
                <View className="flex flex-row items-center gap-2">
                  <Icon as={ArrowUpRight} className="text-green-500" />
                  <Text className="text-sm font-normal text-muted-foreground">
                    {t('home.income')}
                  </Text>
                </View>
                <Text className="mt-1 text-lg font-bold text-green-500">
                  {formatMoney(list?.data?.totalIncome || 0)}
                </Text>
              </View>
              <View className="flex-1 rounded-md border border-border p-3">
                <View className="flex flex-row items-center gap-2">
                  <Icon as={ArrowDownRight} className="text-red-500" />
                  <Text className="text-sm font-normal text-muted-foreground">
                    {t('home.expenses')}
                  </Text>
                </View>
                <Text className="mt-1 text-lg font-bold text-red-500">
                  {formatMoney(list?.data?.totalExpense || 0)}
                </Text>
              </View>
            </View>
            <View className="rounded-md border border-border p-3">
              <Text className="font-semibold">{t('home.monthly-expense')}</Text>
              <Text className="text-sm text-muted-foreground">
                {t('home.total-transaction')}: {list?.data?.totalTransaction}
              </Text>
              <BarChart
                list={
                  list?.data?.monthlyExpense?.map((item) => {
                    return { key: item.month, value: item.total };
                  }) || []
                }
                listLabel={[
                  'Jan',
                  'Feb',
                  'Mar',
                  'Apr',
                  'May',
                  'Jun',
                  'Jul',
                  'Aug',
                  'Sep',
                  'Oct',
                  'Nov',
                  'Dec',
                ]}
              />
            </View>
          </>
          <View className="flex flex-row items-center justify-between">
            <Text className="font-semibold">{t('home.your-wallets')}</Text>
            <TouchableOpacity onPress={() => router.push('/wallet')}>
              <Text className="text-sm text-muted-foreground">{t('home.see-all')}</Text>
            </TouchableOpacity>
          </View>
          <List
            data={list?.data?.wallets?.sort((a, b) => b.balance - a.balance).slice(0, 3) || []}
            horizontal
            onLoading={data.isLoading}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <View className="mr-3 flex h-36 w-60 flex-col justify-between rounded-md border border-border p-3">
                <Text className="font-semibold">{item.name}</Text>
                <Preview
                  label={t('home.balance')}
                  value={<Text className="text-xl font-semibold">{formatMoney(item.balance)}</Text>}
                />
              </View>
            )}
          />
        </View>
      </ScrollView>
    </>
  );
}

export default Dashboard;

// export function getGreeting() {
//   const hour = new Date().getHours();

//   if (hour < 12) return 'Morning';
//   if (hour < 18) return 'Afternoon';
//   return 'Evening';
// }
