import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { ChevronDown } from 'lucide-react-native';
import dayjs from 'dayjs';
import { Text } from '../ui/text';
import { Button } from '@/components/ui/button';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import MonthCalendar from '../calendar/month';
import { cn } from '@/lib/utils';

export interface MonthPickerProps {
  date?: string;
  onChange?: (date: string | undefined) => void;
  placeholder?: string;
}

export function MonthPicker({ date, onChange, placeholder }: MonthPickerProps) {
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | undefined>(
    date ? dayjs(date) : undefined
  );

  const handleSelect = (date: dayjs.Dayjs) => {
    setSelectedDate(date);
    onChange?.(date.format('YYYY-MM'));
  };

  return (
    <View className="w-full">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className={cn('w-full flex-row items-center justify-between')}>
            <Text className="text-base font-normal">
              {selectedDate ? selectedDate.format('MMMM YYYY') : (placeholder ?? 'Select month')}
            </Text>
            <ChevronDown size={18} color="#666" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-[300px] p-3" align="start">
          <MonthCalendar selectedDate={selectedDate} onSelect={handleSelect} />
        </PopoverContent>
      </Popover>
    </View>
  );
}
