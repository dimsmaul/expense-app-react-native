import React, { useState, useMemo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import dayjs, { Dayjs } from 'dayjs';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface CalendarProps {
  onDateSelect?: (date: Dayjs) => void;
  selectedDate?: Dayjs | string | null;
  minDate?: Dayjs | string | null;
  maxDate?: Dayjs | string | null;
}

const CustomCalendar: React.FC<CalendarProps> = ({
  onDateSelect,
  selectedDate,
  minDate,
  maxDate,
}) => {
  const today = dayjs();

  // Normalize dates - convert string to Dayjs or use undefined
  const normalizedSelectedDate = useMemo(() => {
    if (!selectedDate) return undefined;
    return typeof selectedDate === 'string' ? dayjs(selectedDate) : selectedDate;
  }, [selectedDate]);

  const normalizedMinDate = useMemo(() => {
    if (!minDate) return undefined;
    return typeof minDate === 'string' ? dayjs(minDate) : minDate;
  }, [minDate]);

  const normalizedMaxDate = useMemo(() => {
    if (!maxDate) return undefined;
    return typeof maxDate === 'string' ? dayjs(maxDate) : maxDate;
  }, [maxDate]);

  const [currentMonth, setCurrentMonth] = useState(
    normalizedSelectedDate?.month() ?? today.month()
  );
  const [currentYear, setCurrentYear] = useState(normalizedSelectedDate?.year() ?? today.year());

  // Generate years (50 tahun lalu - 50 tahun kedepan)
  const years = useMemo(() => {
    const currentYear = today.year();
    const startYear = currentYear - 5;
    const endYear = currentYear + 5;
    return Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i);
  }, []);

  // Generate months
  const months = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => ({
      value: i,
      label: dayjs().month(i).format('MMMM'),
    }));
  }, []);

  // Generate calendar days
  const calendarDays = useMemo(() => {
    const firstDayOfMonth = dayjs().year(currentYear).month(currentMonth).startOf('month');
    const lastDayOfMonth = dayjs().year(currentYear).month(currentMonth).endOf('month');

    const startDate = firstDayOfMonth.startOf('week');
    const endDate = lastDayOfMonth.endOf('week');

    const days: Dayjs[] = [];
    let current = startDate;

    while (current.isBefore(endDate) || current.isSame(endDate, 'day')) {
      days.push(current);
      current = current.add(1, 'day');
    }

    return days;
  }, [currentMonth, currentYear]);

  const handleDatePress = (date: Dayjs) => {
    if (normalizedMinDate && date.isBefore(normalizedMinDate, 'day')) return;
    if (normalizedMaxDate && date.isAfter(normalizedMaxDate, 'day')) return;
    onDateSelect?.(date);
  };

  const isDateDisabled = (date: Dayjs) => {
    if (normalizedMinDate && date.isBefore(normalizedMinDate, 'day')) return true;
    if (normalizedMaxDate && date.isAfter(normalizedMaxDate, 'day')) return true;
    return false;
  };

  const isToday = (date: Dayjs) => {
    return date.isSame(today, 'day');
  };

  const isSelected = (date: Dayjs) => {
    return normalizedSelectedDate ? date.isSame(normalizedSelectedDate, 'day') : false;
  };

  const isCurrentMonth = (date: Dayjs) => {
    return date.month() === currentMonth;
  };

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <View className="rounded-lg">
      {/* Header dengan Dropdown */}
      <View className="mb-4 flex-row justify-between gap-2">
        <View className="flex-1">
          <Select
            value={{ value: currentMonth.toString(), label: months[currentMonth].label }}
            onValueChange={(option) => {
              if (option?.value) {
                setCurrentMonth(parseInt(option.value));
              }
            }}>
            <SelectTrigger className="h-10 w-full">
              <SelectValue placeholder="Month" />
            </SelectTrigger>
            <SelectContent className="w-[180px]">
              <SelectGroup>
                {months.map((month) => (
                  <SelectItem key={month.value} label={month.label} value={month.value.toString()}>
                    {month.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </View>

        <View className="flex-1">
          <Select
            value={{ value: currentYear.toString(), label: currentYear.toString() }}
            onValueChange={(option) => {
              if (option?.value) {
                setCurrentYear(parseInt(option.value));
              }
            }}>
            <SelectTrigger className="h-10 w-full">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent className="w-[180px]">
              <SelectGroup>
                {years.map((year) => (
                  <SelectItem key={year} label={year.toString()} value={year.toString()}>
                    {year.toString()}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </View>
      </View>

      {/* Week Days Header */}
      <View className="mb-2 flex-row">
        {weekDays.map((day) => (
          <View key={day} className="flex-1 items-center py-2">
            <Text className="text-xs font-semibold text-muted-foreground">{day}</Text>
          </View>
        ))}
      </View>

      {/* Calendar Grid */}
      <View className="flex-row flex-wrap">
        {calendarDays.map((date, index) => {
          const disabled = isDateDisabled(date);
          const today = isToday(date);
          const selected = isSelected(date);
          const currentMonth = isCurrentMonth(date);

          return (
            <TouchableOpacity
              key={index}
              className={`aspect-square w-[14.28%] items-center justify-center rounded-md pb-2 ${today && !selected ? 'bg-accent' : ''} ${selected ? 'bg-primary' : ''} ${disabled ? 'opacity-30' : ''} `}
              onPress={() => handleDatePress(date)}
              disabled={disabled}
              activeOpacity={0.7}>
              <Text
                className={`flex items-center justify-center text-sm ${!currentMonth ? 'text-muted-foreground' : 'text-foreground'} ${today && !selected ? 'font-semibold text-accent-foreground' : ''} ${selected ? 'font-semibold text-primary-foreground' : ''} ${disabled ? 'text-muted-foreground' : ''} `}>
                {date.date()}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default CustomCalendar;

// Contoh penggunaan:
/*
import CustomCalendar from './CustomCalendar';
import dayjs from 'dayjs';

function App() {
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | undefined>(dayjs());

  return (
    <View className="p-5">
      <CustomCalendar
        // Bisa pass Dayjs object atau string
        selectedDate={selectedDate} // atau "2025-01-15"
        onDateSelect={(date) => {
          setSelectedDate(date);
          console.log('Selected date:', date.format('YYYY-MM-DD'));
        }}
        minDate={dayjs().subtract(1, 'year')} // atau "2024-01-01"
        maxDate={dayjs().add(1, 'year')} // atau "2026-12-31"
      />
    </View>
  );
}
*/