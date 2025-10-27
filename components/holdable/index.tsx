// TODO: need to fix

// import React, { useRef, useState } from 'react';
// import { View, Pressable, GestureResponderEvent } from 'react-native';
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from '@/components/ui/dropdown-menu';
// import { Text } from '../ui/text';

// type HoldableDropdownProps = {
//   children: React.ReactNode;
//   items: { label: string; onClick: () => void }[];
//   holdTime?: number;
//   side?: 'top' | 'bottom' | 'left' | 'right';
//   align?: 'start' | 'center' | 'end';
//   sideOffset?: number;
// };

// const HoldableDropdown: React.FC<HoldableDropdownProps> = ({
//   children,
//   items,
//   holdTime = 800,
//   side = 'top',
//   align = 'start',
//   sideOffset = 8,
// }) => {
//   const [open, setOpen] = useState(false);
//   const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
//   const movedRef = useRef(false);
//   const startPositionRef = useRef({ x: 0, y: 0 });

//   const startHold = (event: GestureResponderEvent) => {
//     movedRef.current = false;
//     startPositionRef.current = {
//       x: event.nativeEvent.pageX,
//       y: event.nativeEvent.pageY,
//     };

//     timerRef.current = setTimeout(() => {
//       if (!movedRef.current) {
//         setOpen(true);
//       }
//     }, holdTime);
//   };

//   const cancelHold = () => {
//     if (timerRef.current) {
//       clearTimeout(timerRef.current);
//       timerRef.current = null;
//     }
//   };

//   const onTouchMove = (event: GestureResponderEvent) => {
//     const moveThreshold = 10; // pixels
//     const deltaX = Math.abs(event.nativeEvent.pageX - startPositionRef.current.x);
//     const deltaY = Math.abs(event.nativeEvent.pageY - startPositionRef.current.y);

//     if (deltaX > moveThreshold || deltaY > moveThreshold) {
//       movedRef.current = true;
//       cancelHold();
//     }
//   };

//   return (
//     <>
//       {/* Backdrop overlay when open */}
//       {open && (
//         <Pressable
//           className="absolute inset-0 z-40 bg-black/20"
//           onPress={() => setOpen(false)}
//           style={{
//             position: 'absolute',
//             top: 0,
//             left: 0,
//             right: 0,
//             bottom: 0,
//           }}
//         />
//       )}

//       <DropdownMenu open={open} onOpenChange={setOpen}>
//         <DropdownMenuTrigger asChild>
//           <Pressable
//             onPressIn={startHold}
//             onPressOut={cancelHold}
//             onTouchMove={onTouchMove}
//             onLongPress={() => {}} // Prevent default long press behavior
//             delayLongPress={holdTime}
//             style={
//               open
//                 ? {
//                     zIndex: 50,
//                   }
//                 : undefined
//             }>
//             {children}
//           </Pressable>
//         </DropdownMenuTrigger>

//         <DropdownMenuContent
//           className="z-50"
//           //   side={side}
//           align={align}
//           sideOffset={sideOffset}>
//           {items.map((item, idx) => (
//             <DropdownMenuItem
//               key={idx}
//               onPress={() => {
//                 item.onClick();
//                 setOpen(false);
//               }}>
//               <Text>{item.label}</Text>
//             </DropdownMenuItem>
//           ))}
//         </DropdownMenuContent>
//       </DropdownMenu>
//     </>
//   );
// };

// export default HoldableDropdown;

// // Contoh penggunaan:
// /*
// import HoldableDropdown from '@/components/holdable-dropdown';
// import { View, Text } from 'react-native';

// function Example() {
//   return (
//     <HoldableDropdown
//       holdTime={800}
//       side="top"
//       align="start"
//       items={[
//         {
//           label: 'Edit',
//           onClick: () => console.log('Edit clicked'),
//         },
//         {
//           label: 'Delete',
//           onClick: () => console.log('Delete clicked'),
//         },
//         {
//           label: 'Share',
//           onClick: () => console.log('Share clicked'),
//         },
//       ]}
//     >
//       <View className="bg-primary p-4 rounded-lg">
//         <Text className="text-primary-foreground">
//           Hold me to open menu
//         </Text>
//       </View>
//     </HoldableDropdown>
//   );
// }
// */
