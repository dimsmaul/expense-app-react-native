import React from 'react';
import { View, Text } from 'react-native';
import clsx from 'clsx';

export interface BarChartProps {
  list: {
    key: number; // bulan 1–12
    value: number;
  }[];
  listLabel: string[];
}

const BarChart: React.FC<BarChartProps> = ({ list, listLabel }) => {
  const currentMonth = new Date().getMonth(); // ex: Oct = 9
  const last5MonthsIndex = Array.from({ length: 5 }, (_, i) => (currentMonth - 4 + i + 12) % 12);

  // Ambil hanya 5 bulan terakhir
  const filteredList = last5MonthsIndex.map((idx) => {
    const found = list.find((item) => item.key === idx + 1);
    return found || { key: idx + 1, value: 0 };
  });

  const filteredLabels = last5MonthsIndex.map((idx) => listLabel[idx]);

  const maxValue = Math.max(...filteredList.map((item) => item.value), 1);

  return (
    <View className="flex flex-col items-center justify-end">
      <View className="h-48 w-full flex-row items-end justify-between px-2">
        {filteredList.map((item, index) => {
          const heightPercent = (item.value / maxValue) * 100;

          return (
            <View key={item.key} className="mx-1 flex-1 items-center">
              <View
                style={{ height: `${heightPercent / 1.5}%` }}
                className={clsx(
                  'w-10 rounded-md bg-blue-500',
                  heightPercent === 0 && 'bg-gray-300'
                )}
              />

              <Text numberOfLines={1} className="mt-1 w-8 text-center text-xs text-gray-600">
                {filteredLabels[index] ?? item.key}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default BarChart;
