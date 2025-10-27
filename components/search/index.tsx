// import { mdiMagnify } from "@mdi/js";
// import Icon from "@mdi/react";
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Input } from '../ui/input';
import { Search } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';

interface InputSearchDebounceProps {
  defaultValue: string;
  onChange: (val: string) => void;
  className?: string;
}
const InputSearchDebounce: React.FC<InputSearchDebounceProps> = (props) => {
  const { t } = useTranslation();
  const [search, setSearch] = useState(props.defaultValue);

  useEffect(() => {
    const timeout = setTimeout(() => {
      props.onChange(search);
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [search]);

  return (
    <>
      <View className="relative flex-1 flex-row items-center">
        {/* <Search className="text-support-100 absolute left-3" /> */}
        <Input
          //   type={"text"}
          onChange={(e) => {
            // setSearch(e.target.value);
            setSearch(e.nativeEvent.text);
          }}
          defaultValue={props.defaultValue}
          placeholder={t('global.search') }
          className={clsx(
            'bg-primary-100 rounded-md border px-4 py-2 text-foreground focus:outline-none focus:ring-2',
            props.className
          )}
        />
      </View>
    </>
  );
};

export default InputSearchDebounce;
