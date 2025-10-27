import AppBar from '@/components/appbar';
import { DatePicker } from '@/components/date-picker';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Text } from '@/components/ui/text';
import { useCreateTransaction } from '@/hooks/wallets/transaction/useCreateTransaction';
import { money } from '@/utils/format-money';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Controller } from 'react-hook-form';
import { View } from 'react-native';

function Add() {
  const { id, tId } = useLocalSearchParams();
  const { control, handleSubmit, errors, onSubmit, value, setValue } = useCreateTransaction({
    id: id as string,
    tId: tId as string | undefined,
  });
  return (
    <>
      <AppBar title={tId ? 'Edit Transaction' : 'Add Transaction'} leftContent="back" />
      <View className="flex-1 gap-8 p-4">
        <View>
          <Tabs
            value={value}
            onValueChange={(val) => setValue(val as 'income' | 'outcome')}
            className="">
            <TabsList className="w-full">
              <TabsTrigger value="income" className="w-1/2">
                <Text>Income</Text>
              </TabsTrigger>
              <TabsTrigger value="outcome" className="w-1/2">
                <Text>Expense</Text>
              </TabsTrigger>
            </TabsList>
            {/* <TabsContent value="sign-in"></TabsContent> */}
            <View className="flex flex-col gap-5">
              <View>
                <Controller
                  control={control}
                  name="title"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <>
                      <Label htmlFor="title">Title</Label>
                      <Input
                        placeholder="Title"
                        autoCapitalize="none"
                        autoCorrect={false}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                      />
                    </>
                  )}
                />
                {errors.title && (
                  <Text className="text-sm text-red-600">{errors.title.message}</Text>
                )}
              </View>

              <View>
                <Controller
                  control={control}
                  name="date"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <>
                      <Label htmlFor="date">Date</Label>
                      <DatePicker placeholder="Date" date={value} onChange={onChange} />
                    </>
                  )}
                />
                {errors.date && <Text className="text-sm text-red-600">{errors.date.message}</Text>}
              </View>
              <View>
                <Controller
                  control={control}
                  name="note"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <>
                      <Label htmlFor="note">Note</Label>
                      <Input
                        placeholder="Note"
                        autoCapitalize="none"
                        autoCorrect={false}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                      />
                    </>
                  )}
                />
                {errors.note && <Text className="text-sm text-red-600">{errors.note.message}</Text>}
              </View>

              <View>
                <Controller
                  control={control}
                  name="amount"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <>
                      <Label htmlFor="amount">Amount</Label>
                      <Input
                        placeholder="Amount"
                        onBlur={onBlur}
                        onChangeText={(e) => {
                          const numericValue = e.replace(/[^\d]/g, '');
                          onChange(numericValue);
                        }}
                        keyboardType="numeric"
                        value={money(value)}
                      />
                    </>
                  )}
                />
                {errors.note && <Text className="text-sm text-red-600">{errors.note.message}</Text>}
              </View>
              <View>
                <Button onPress={handleSubmit(onSubmit)}>
                  <Text>Save</Text>
                </Button>
              </View>
            </View>
          </Tabs>
        </View>
      </View>
    </>
  );
}

export default Add;
