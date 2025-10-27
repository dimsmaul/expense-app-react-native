import React, { useState } from 'react';
import { View, ScrollView, Image } from 'react-native';
import AppBar from '@/components/appbar';
import { DatePicker } from '@/components/date-picker';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Text } from '@/components/ui/text';
import { useReimburseStore } from '@/store/reimburse';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { LampiranDrawer } from '@/components/tech-test/lampiran-drawer';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { formatMoney } from '@/utils/format-money';
import { Button } from '@/components/ui/button';
import { Edit, Trash } from 'lucide-react-native';
import { Icon } from '@/components/ui/icon';

const validationSchema = z.object({
  tanggal: z.string().min(1, 'Tanggal wajib diisi'),
  jenisKlaim: z.string().min(1, 'Jenis klaim wajib diisi'),
  detail: z.string().min(1, 'Detail wajib diisi'),
  lampiranBukti: z
    .array(
      z.object({
        uri: z.array(z.string().min(1)),
        nominal: z.string().optional(),
        keterangan: z.string().optional(),
      })
    )
    .optional(),
});

const ReimburseAdd = () => {
  const { lampiranBukti, tanggal, detail, jenisKlaim, setReimburseData } = useReimburseStore();
  const [openDrawer, setOpenDrawer] = useState<{
    open: boolean;
    isEdit?: boolean;
    initialValue: {
      index?: number;
      uri: string[];
      nominal: string;
      keterangan: string;
    };
  }>({
    open: false,
    isEdit: false,
    initialValue: {
      index: undefined,
      uri: [],
      nominal: '',
      keterangan: '',
    },
  });

  const { control, handleSubmit } = useForm<z.infer<typeof validationSchema>>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      tanggal: tanggal || '',
      jenisKlaim: jenisKlaim || '',
      detail: detail || '',
      lampiranBukti: [],
    },
  });

  const handleRemoveLampiran = (index: number) => {
    const updatedLampiran = [...lampiranBukti];
    updatedLampiran.splice(index, 1);
    useReimburseStore.getState().setReimburseData({ lampiranBukti: updatedLampiran });
  };

  const handlePreview = (index: number) => {
    const lampiran = lampiranBukti[index];
    setOpenDrawer({
      open: true,
      isEdit: true,
      initialValue: {
        index: index,
        uri: lampiran.uri,
        nominal: lampiran.nominal,
        keterangan: lampiran.keterangan,
      },
    });
  };

  const handleSave = (value: z.infer<typeof validationSchema>) => {
    setReimburseData({
      tanggal: value.tanggal,
      jenisKlaim: value.jenisKlaim,
      detail: value.detail,
    });
  };

  return (
    <>
      <AppBar title="Pengajuan Reimburse" />
      <ScrollView className="p-3">
        <View className="gap-2 rounded-md border border-border p-3">
          <Text className="mb-2 font-bold">Detail Pengajuan</Text>

          {/* Tanggal */}
          <Controller
            control={control}
            name="tanggal"
            render={({ field: { onChange, value } }) => (
              <>
                <Label>Tanggal</Label>
                <DatePicker placeholder="Tanggal" date={value} onChange={onChange} />
              </>
            )}
          />

          {/* Jenis Klaim */}
          <Controller
            control={control}
            name="jenisKlaim"
            render={({ field: { onChange, value } }) => (
              <>
                <Label>Jenis Klaim</Label>
                <Select
                  onValueChange={(option) => {
                    if (option?.value) {
                      onChange(option.value);
                    }
                  }}
                  value={{
                    value: value,
                    label: value,
                  }}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Jenis Klaim" />
                  </SelectTrigger>
                  <SelectContent className="w-[200px]">
                    {['Kesehatan', 'Transportasi', 'Makan', 'Akomodasi'].map((jenis) => (
                      <SelectItem key={jenis} value={jenis} label={jenis} />
                    ))}
                  </SelectContent>
                </Select>
              </>
            )}
          />

          {/* Detail */}
          <Controller
            control={control}
            name="detail"
            render={({ field: { onChange, value } }) => (
              <>
                <Label>Detail</Label>
                <Input
                  placeholder="Detail pengajuan"
                  value={value}
                  onChangeText={onChange}
                  multiline
                  className="h-32"
                />
              </>
            )}
          />
        </View>

        {/* Lampiran */}
        <View className="mt-4 rounded-md border border-border p-3">
          <Text className="mb-2 font-bold">Lampiran Bukti</Text>
          {lampiranBukti.length > 0 ? (
            lampiranBukti.map((item, index) => (
              <View
                key={index}
                className="mb-2 flex flex-row justify-between rounded-md border border-border p-2">
                <View className="flex flex-row items-center gap-2">
                  <Image
                    source={{ uri: item.uri[0] }}
                    style={{ width: 60, height: 60, borderRadius: 8 }}
                  />
                  <View>
                    <Text>{item.keterangan}</Text>
                    <Text>{formatMoney(parseInt(item.nominal))}</Text>
                  </View>
                </View>
                <View className="flex flex-row items-center gap-2">
                  <Button variant={'outline'} size={'icon'} onPress={() => handlePreview(index)}>
                    <Icon as={Edit} />
                  </Button>
                  <Button
                    variant={'outline'}
                    size={'icon'}
                    onPress={() => handleRemoveLampiran(index)}>
                    <Icon as={Trash} />
                  </Button>
                </View>
              </View>
            ))
          ) : (
            <Text className="mb-2 text-gray-500">Belum ada lampiran</Text>
          )}

          <Button onPress={() => setOpenDrawer({ ...openDrawer, open: true })}>
            <Text className="text-center">Tambah Lampiran</Text>
          </Button>
        </View>
        <Button onPress={handleSubmit(handleSave)} className="mt-6">
          <Text>Ajukan Reimburse</Text>
        </Button>
      </ScrollView>

      <LampiranDrawer
        open={openDrawer.open}
        initialValues={openDrawer.initialValue}
        isEdit={openDrawer.isEdit}
        onClose={() =>
          setOpenDrawer({
            open: false,
            isEdit: false,
            initialValue: { uri: [], nominal: '', keterangan: '' },
          })
        }
      />
    </>
  );
};

export default ReimburseAdd;
