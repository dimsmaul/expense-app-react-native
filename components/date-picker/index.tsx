import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { ChevronDown } from 'lucide-react-native';
import dayjs from 'dayjs';
// import { Calendar as RNCalendar } from 'react-native-calendars';
import { Text } from '../ui/text';

import { Button } from '@/components/ui/button';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import CustomCalendar from '../calendar';

export interface DatePickerProps {
  date?: string;
  onChange?: (date: string | undefined) => void;
  placeholder?: string;
}

export function DatePicker({ date, onChange, placeholder }: DatePickerProps) {
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs>(dayjs());

  useEffect(() => {
    if (date) setSelectedDate(dayjs(date));
  }, [date]);

  const handleDateChange = (date: dayjs.Dayjs) => {
    setSelectedDate(date);
    if (onChange) {
      onChange(date.format('YYYY-MM-DD'));
    }
  };

  return (
    <View className="w-full">
      {/* <TesCaledar /> */}
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full flex-row items-center justify-between">
            <Text className="text-base font-normal">
              {selectedDate
                ? dayjs(selectedDate).format('DD MMM YYYY')
                : (placeholder ?? 'Select date')}
            </Text>
            <ChevronDown size={18} color="#666" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-[300px] p-3" align="start">
          <CustomCalendar
            selectedDate={selectedDate}
            onDateSelect={(date) => {
              handleDateChange(date);
              //   console.log('Selected date:', date.format('YYYY-MM-DD'));
            }}
          />
        </PopoverContent>
      </Popover>
    </View>
  );
}
