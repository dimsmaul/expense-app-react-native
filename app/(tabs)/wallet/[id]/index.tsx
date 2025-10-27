import AppBar from '@/components/appbar';
import { MonthPicker } from '@/components/date-picker/month';
import { List } from '@/components/list';
import Preview from '@/components/preview';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Icon } from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { useWalletDetail } from '@/hooks/wallets/useWalletDetail';
import { cn } from '@/lib/utils';
import { formatMoney } from '@/utils/format-money';
import dayjs from 'dayjs';
import { router, useLocalSearchParams } from 'expo-router';
import { Edit, Ellipsis, Plus, Trash } from 'lucide-react-native';
import React from 'react';
import { RefreshControl, View } from 'react-native';

function WalletDetail() {
  // get id params
  const { id } = useLocalSearchParams();
  const { data, list, filter, setFilter, handleEditTransaction, handleDeleteTransaction } =
    useWalletDetail({ id: id as string });

  const { data: transaction } = list;
  const transactionItems = transaction?.pages.flatMap((page) => page.items) ?? [];

  return (
    <>
      <AppBar title={data.data?.name} leftContent="back" />
      <View className="p-3">
        <List
          data={transactionItems || []}
          onLoading={list.isLoading || data.isLoading || list.isFetching || data.isFetching}
          ListHeaderComponent={
            <View className="bg-background">
              <View className="flex flex-col gap-1">
                <Text className={cn('text-center text-lg font-semibold')}>
                  {formatMoney(data.data?.balance || 0)}
                </Text>
                <View className="flex flex-row items-center justify-between">
                  <Preview
                    label={'Income'}
                    value={
                      <Text className="text-sm font-semibold text-green-500">
                        {formatMoney(data.data?.totalIncome || 0)}
                      </Text>
                    }
                  />
                  <Preview
                    label={'Expense'}
                    value={
                      <Text className="text-sm font-semibold text-red-500">
                        {formatMoney(data.data?.totalExpense || 0)}
                      </Text>
                    }
                  />
                  <Button
                    variant={'outline'}
                    size={'icon'}
                    onPress={() => router.push(`/wallet/${id}/add`)}>
                    <Icon as={Plus} className="size-5" />
                  </Button>
                </View>
              </View>
              <View className="bg-background pb-3">
                <MonthPicker
                  date={filter}
                  onChange={(e) => setFilter(e || dayjs().format('YYYY-MM'))}
                />
                {/* <Input placeholder="Search" className="rounded-lg border p-2" /> */}
              </View>
            </View>
          }
          className="min-h-full"
          showsVerticalScrollIndicator={false}
          stickyHeaderIndices={[0]}
          keyExtractor={(item) => item.id?.toString()}
          renderItem={({ item }) => {
            return (
              <>
                <View className="mb-3 rounded-md border border-border p-3">
                  <View className="flex flex-row justify-between">
                    <Preview
                      label={'Amount'}
                      value={
                        <Text
                          className={cn(
                            'font-semibold',
                            item.type === 'income' ? 'text-green-500' : 'text-red-500'
                          )}>
                          {formatMoney(item.amount)}
                        </Text>
                      }
                    />
                    <Preview
                      className="flex items-end"
                      label={'Date'}
                      value={dayjs(item.date).format('DD MMM YYYY')}
                    />
                  </View>
                  <View className="flex flex-row items-end justify-between">
                    <Preview label={'Note'} value={item.note} />
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button className="flex" size={'icon'} variant={'outline'}>
                          <Icon as={Ellipsis} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuLabel>
                          <Text>Action</Text>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onPress={() =>
                            handleEditTransaction({
                              wId: item.walletId,
                              tId: item.id,
                            })
                          }>
                          <Icon as={Edit} />
                          <Text>Edit</Text>
                        </DropdownMenuItem>
                        <DropdownMenuItem onPress={() => handleDeleteTransaction({ tId: item.id })}>
                          <Icon as={Trash} />
                          <Text>Delete</Text>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </View>
                </View>
              </>
            );
          }}
        />
      </View>
    </>
  );
}

export default WalletDetail;
