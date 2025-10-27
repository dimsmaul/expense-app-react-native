// FIXME: need to remove

import { FlatList, FlatListProps, View, VirtualizedListProps } from 'react-native';
import Empty from '../empty';
import { Text } from '../ui/text';
import Loader from '../loader';

export interface ListProps<ItemT> extends FlatListProps<ItemT> {
  onLoading?: boolean;
  itemHeight?: number;
}

export function List<T>(props: ListProps<T>) {
  // if (props.onLoading) {
  //   return <Loader />;
  // }

  return (
    <>
      <FlatList
        {...props}
        ListFooterComponent={props.ListFooterComponent ?? <View className="h-20" />}
        getItemLayout={(data, index) => ({
          length: props.itemHeight ?? 100,
          offset: (props.itemHeight ?? 100) * index,
          index,
        })}
        ListEmptyComponent={props.onLoading ? <Loader /> : (props.ListEmptyComponent ?? <Empty />)}
      />
    </>
  );
}
