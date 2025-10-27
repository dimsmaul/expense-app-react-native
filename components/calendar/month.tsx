import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import dayjs from 'dayjs';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { Icon } from '../ui/icon';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react-native';

interface MonthCalendarProps {
  selectedDate?: dayjs.Dayjs;
  onSelect?: (date: dayjs.Dayjs) => void;
}

const MonthCalendar: React.FC<MonthCalendarProps> = ({ selectedDate, onSelect }) => {
  const [year, setYear] = useState(selectedDate?.year() ?? dayjs().year());

  const months = Array.from({ length: 12 }, (_, i) => ({
    label: dayjs().month(i).format('MMM'),
    value: i,
  }));

  return (
    <View className="w-full items-center">
      <View className="mb-4 w-full flex-row items-center justify-between px-2">
        <TouchableOpacity onPress={() => setYear(year - 1)} className="px-3 py-1">
          {/* <Text className="text-lg font-semibold">{'<'}</Text> */}
          <Icon as={ChevronLeft} className="size-7 font-semibold" />
        </TouchableOpacity>
        <Text className="text-lg font-semibold">{year}</Text>
        <TouchableOpacity onPress={() => setYear(year + 1)} className="px-3 py-1">
          {/* <Text className="text-lg font-semibold">{'>'}</Text> */}
          <Icon as={ChevronRight} className="size-7 font-semibold" />
        </TouchableOpacity>
      </View>

      <View className="flex-row flex-wrap justify-between">
        {months.map((month) => {
          const isSelected =
            selectedDate && selectedDate.month() === month.value && selectedDate.year() === year;

          return (
            <TouchableOpacity
              key={month.value}
              onPress={() => onSelect?.(dayjs().year(year).month(month.value))}
              className={cn(
                'm-1 w-[30%] items-center rounded-lg py-3',
                isSelected ? 'bg-primary' : 'bg-muted'
              )}>
              <Text
                className={cn(
                  'text-base',
                  isSelected ? 'font-semibold text-primary-foreground' : 'text-foreground'
                )}>
                {month.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default MonthCalendar;
