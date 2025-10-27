import React from 'react';
import { Alert, RefreshControl, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Text } from '@/components/ui/text';
import AppBar from '@/components/appbar';
import { List } from '@/components/list';
import { useWallet } from '@/hooks/wallets/useWallet';
import { formatMoney } from '@/utils/format-money';
import InputSearchDebounce from '@/components/search';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Plus } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';

export default function WalletsScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const { list, search, setSearch, handleDelete } = useWallet();
  const { data, fetchNextPage, isLoading, refetch, isRefetching, isFetching } = list;

  const wallets = data?.pages.flatMap((page) => page.items) ?? [];

  return (
    <>
      <AppBar title={t('wallets.wallets')} />

      <View className="flex-1 p-3">
        <List
          data={wallets || []}
          onLoading={isLoading || isFetching}
          // refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refetch} />}
          ListHeaderComponent={
            <View className="mb-3 flex flex-row items-center justify-center gap-3">
              <InputSearchDebounce
                defaultValue={search}
                onChange={(val: string) => setSearch(val)}
              />
              <Button
                size="icon"
                variant="outline"
                onPress={() => router.push('/wallet/action' as any)}>
                <Icon as={Plus} className="size-5" />
              </Button>
            </View>
          }
          renderItem={({ item }) => (
            <>
              <TouchableOpacity
                onLongPress={() =>
                  Alert.alert(
                    // 'Action',
                    // 'Choose an action for this wallet',
                    t('wallets.wallet-action-alert.title'),
                    t('wallets.wallet-action-alert.message'),
                    [
                      {
                        text: t('wallets.wallet-action-alert.edit'),
                        onPress: () => router.push(`/wallet/action?id=${item.id}`),
                      },
                      {
                        text: t('wallets.wallet-action-alert.delete'),
                        style: 'destructive',
                        onPress: () => handleDelete(item.id),
                      },
                      { text: t('wallets.wallet-action-alert.cancel'), style: 'cancel' },
                    ],
                    { cancelable: true }
                  )
                }
                className="mb-3 rounded-md border border-border p-3"
                onPress={() => router.push(`/wallet/${item.id}`)}>
                <View className="flex-row items-center justify-between">
                  <View className="flex-1 flex-row items-center gap-3">
                    <View className="flex-1">
                      <Text className="text-base font-semibold text-foreground">{item.name}</Text>
                      <Text className="text-sm text-muted-foreground">{item.type}</Text>
                    </View>
                  </View>
                  <View className="items-end">
                    <Text className="text-base font-bold text-foreground">
                      {formatMoney(item.balance)}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </>
          )}
          onScrollEndDrag={() => fetchNextPage()}
        />

        {/* <View className="absolute bottom-0 left-0 right-0 border-t border-border bg-background p-5">
          <Button onPress={() => router.push('/wallet-form' as any)}>
            <Text>+ Add Wallet</Text>
          </Button>
        </View> */}
      </View>
    </>
  );
}
