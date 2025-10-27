import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Text } from '@/components/ui/text';
import { Stack } from 'expo-router';
import * as React from 'react';
import { View } from 'react-native';
import z from 'zod';
import { Controller } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { unauth } from '@/config/unauth';
import { useAuth } from '@/hooks/auth/useAuth';

export default function Screen() {
  // // const { colorScheme } = useColorScheme();
  // const router = useRouter();
  // const { token, user } = useAuthStore();
  const { control, handleSubmit, errors, value, setValue, onSubmit } = useAuth();

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <View className="flex-1 items-center justify-center gap-8 p-4">
        <View>
          <Tabs
            value={value}
            onValueChange={(val) => setValue(val as 'sign-in' | 'sign-up')}
            className="">
            <TabsList className="w-full">
              <TabsTrigger value="sign-in" className="w-1/2">
                <Text>Sign In</Text>
              </TabsTrigger>
              <TabsTrigger value="sign-up" className="w-1/2">
                <Text>Sign Up</Text>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="sign-in">
              <View className="rounded-md border border-border p-3">
                <View className="flex flex-col gap-5">
                  <View>
                    <Controller
                      control={control}
                      name="email"
                      render={({ field: { onChange, onBlur, value } }) => (
                        <>
                          <Label htmlFor="email">Email</Label>
                          <Input
                            placeholder="Email"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoCorrect={false}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                          />
                        </>
                      )}
                    />
                    {errors.email && (
                      <Text className="text-sm text-red-600">{errors.email.message}</Text>
                    )}
                  </View>
                  <View>
                    <Controller
                      control={control}
                      name="password"
                      render={({ field: { onChange, onBlur, value } }) => (
                        <>
                          <Label htmlFor="password">Password</Label>
                          <Input
                            placeholder="Password"
                            secureTextEntry
                            autoCapitalize="none"
                            autoCorrect={false}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                          />
                        </>
                      )}
                    />
                    {errors.password && (
                      <Text className="text-sm text-red-600">{errors.password.message}</Text>
                    )}
                  </View>
                  <View>
                    <Button onPress={handleSubmit(onSubmit)}>
                      <Text>Sign In</Text>
                    </Button>
                  </View>
                </View>
              </View>
            </TabsContent>
            <TabsContent value="sign-up">
              <View className="rounded-md border border-border p-3">
                <View className="flex flex-col gap-5">
                  <View>
                    <Controller
                      control={control}
                      name="name"
                      render={({ field: { onChange, onBlur, value } }) => (
                        <>
                          <Label htmlFor="name">Name</Label>
                          <Input
                            placeholder="Name"
                            autoCapitalize="none"
                            autoCorrect={false}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                          />
                        </>
                      )}
                    />
                    {(errors as { name: object }).name && (
                      <Text className="text-sm text-red-600">
                        {(errors as { name: { message: string } }).name.message}
                      </Text>
                    )}
                  </View>
                  <View>
                    <Controller
                      control={control}
                      name="email"
                      render={({ field: { onChange, onBlur, value } }) => (
                        <>
                          <Label htmlFor="email">Email</Label>
                          <Input
                            placeholder="Email"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoCorrect={false}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                          />
                        </>
                      )}
                    />
                    {errors.email && (
                      <Text className="text-sm text-red-600">{errors.email.message}</Text>
                    )}
                  </View>
                  <View>
                    <Controller
                      control={control}
                      name="password"
                      render={({ field: { onChange, onBlur, value } }) => (
                        <>
                          <Label htmlFor="password">Password</Label>
                          <Input
                            placeholder="Password"
                            secureTextEntry
                            autoCapitalize="none"
                            autoCorrect={false}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                          />
                        </>
                      )}
                    />
                    {errors.password && (
                      <Text className="text-sm text-red-600">{errors.password.message}</Text>
                    )}
                  </View>
                  <View>
                    <Button onPress={handleSubmit(onSubmit)}>
                      <Text>Sign Up</Text>
                    </Button>
                  </View>
                </View>
              </View>
            </TabsContent>
          </Tabs>
        </View>
      </View>
      {/* <Stack.Screen options={SCREEN_OPTIONS} />
      <View className="flex-1 items-center justify-center gap-8 p-4">
        <Image source={LOGO[colorScheme ?? 'light']} style={IMAGE_STYLE} resizeMode="contain" />
        <View className="gap-2 p-4">
          <Text className="ios:text-foreground font-mono text-sm text-muted-foreground">
            1. Edit <Text variant="code">app/index.tsx</Text> to get started.
          </Text>
          <Text className="ios:text-foreground font-mono text-sm text-muted-foreground">
            2. Save to see your changes instantly.
          </Text>
        </View>
        <View className="flex-row gap-2">
          <Link href="https://reactnativereusables.com" asChild>
            <Button>
              <Text>Browse the Docs</Text>
            </Button>
          </Link>
          <Link href="https://github.com/founded-labs/react-native-reusables" asChild>
            <Button variant="ghost">
              <Text>Star the Repo</Text>
              <Icon as={StarIcon} />
            </Button>
          </Link>
        </View>
      </View> */}
    </>
  );
}

const formSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
});

const formSignUpSchema = formSchema.extend({
  name: z.string().min(2),
});

const handleSendApi = async (
  data: z.infer<typeof formSchema> | z.infer<typeof formSignUpSchema>,
  type: 'sign-in' | 'sign-up'
) => {
  const response = await unauth.post(`/auth/${type}`, data);
  return response.data;
};
