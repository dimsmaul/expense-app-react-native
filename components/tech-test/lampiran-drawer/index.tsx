import React, { useEffect, useState } from 'react';
import Modal from 'react-native-modal';
import { View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import * as DocumentPicker from 'expo-document-picker';
import { useReimburseStore } from '@/store/reimburse';

interface LampiranDrawerProps {
  open: boolean;
  onClose: () => void;
  isEdit?: boolean;
  initialValues?: {
    index?: number;
    uri: string[];
    nominal: string;
    keterangan: string;
  };
}

export const LampiranDrawer = ({ open, onClose, initialValues, isEdit }: LampiranDrawerProps) => {
  const { lampiranBukti, setReimburseData } = useReimburseStore();
  const [uri, setUri] = useState<string[]>([]);
  const [nominal, setNominal] = useState('');
  const [keterangan, setKeterangan] = useState('');

  const handlePickFiles = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: ['image/*', 'application/pdf'],
      multiple: true,
    });

    if (!result.canceled && result.assets) {
      setUri([...uri, ...result.assets.map((f) => f.uri)]);
    }
  };

  useEffect(() => {
    // console.log('initialValues', initialValues);
    if (initialValues && open) {
      setUri(initialValues.uri);
      setNominal(initialValues.nominal);
      setKeterangan(initialValues.keterangan);
    }
  }, [initialValues, open]);

  const handleSave = () => {
    const newLampiran = [...lampiranBukti];
    if (isEdit && initialValues?.index !== undefined) {
      newLampiran[initialValues.index] = { uri, nominal, keterangan };
    } else {
      newLampiran.push({ uri, nominal, keterangan });
    }
    setReimburseData({ lampiranBukti: newLampiran });
    setUri([]);
    setNominal('');
    setKeterangan('');
    onClose();
  };

  return (
    <Modal
      isVisible={open}
      onBackdropPress={onClose}
      onSwipeComplete={onClose}
      swipeDirection="down"
      style={{ justifyContent: 'flex-end', margin: 0 }}>
      <View className="h-[70%] rounded-t-2xl p-4 bg-background">
        <Text className="mb-3 text-lg font-bold">Tambah Lampiran Bukti</Text>

        <ScrollView showsVerticalScrollIndicator={false}>
          <Label>File</Label>
          <TouchableOpacity
            onPress={handlePickFiles}
            className="mb-3 mt-1 rounded-md border border-border p-3">
            <Text>Pilih file...</Text>
          </TouchableOpacity>

          {uri.length > 0 && (
            <View className="mb-4 flex-row flex-wrap gap-2">
              {uri.map((item, index) =>
                item.endsWith('.pdf') ? (
                  <View
                    key={index}
                    className="h-[60px] w-[60px] items-center justify-center rounded-md border border-border bg-gray-100">
                    <Text className="text-xs">PDF</Text>
                  </View>
                ) : (
                  <Image
                    key={index}
                    source={{ uri: item }}
                    style={{ width: 60, height: 60, borderRadius: 8 }}
                  />
                )
              )}
            </View>
          )}

          <Label>Nominal</Label>
          <Input
            placeholder="Nominal"
            keyboardType="numeric"
            value={nominal}
            onChangeText={setNominal}
            className="mb-3"
          />

          <Label>Keterangan</Label>
          <Input
            placeholder="Keterangan"
            value={keterangan}
            onChangeText={setKeterangan}
            className="mb-5"
          />

          <Button onPress={handleSave} className="mb-2">
            <Text>Simpan</Text>
          </Button>
          <Button variant="outline" onPress={onClose}>
            <Text>Batal</Text>
          </Button>
        </ScrollView>
      </View>
    </Modal>
  );
};
