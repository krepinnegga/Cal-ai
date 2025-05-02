import { Stack } from 'expo-router';
import { useRouter } from 'expo-router';
import {  View, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import "../global.css";

import Ionicons from '@expo/vector-icons/Ionicons';

export default function RootLayout() {
  const router = useRouter();
  return (
   <View style={{ flex: 1, backgroundColor: '#EEFBFF' }}>
       <StatusBar
           style="dark"
           backgroundColor={'#EEFBFF'}
           translucent={true}
       />

    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="result"
        options={{
          presentation: 'modal',
          title: 'Analyze',
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.dismiss()}>
              <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
   </View>
  );
}
