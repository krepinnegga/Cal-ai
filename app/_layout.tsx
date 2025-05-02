import { router, Stack } from 'expo-router';
import { useRouter } from 'expo-router';
import { View, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import "../global.css";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useSetAtom } from "jotai/index";
import { analysisAtom } from "@/atoms/analysis";
import { Toaster } from 'sonner-native';

export default function RootLayout() {
    const router = useRouter();
    const setAnalysis = useSetAtom(analysisAtom);

    const handleBack = () => {
        setAnalysis(null); // Reset the atom state
        router.dismiss(); // Dismiss the modal
    };

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <View style={{ flex: 1, backgroundColor: '#EEFBFF' }}>
                <StatusBar
                    style="dark"
                    backgroundColor={'#EEFBFF'}
                    translucent={true}
                />

                <Toaster
                    position="top-center"
                    theme="light"
                    richColors
                    closeButton
                />

                <Stack>
                    <Stack.Screen name="index" options={{ headerShown: false }} />
                    <Stack.Screen
                        name="result"
                        options={{
                            presentation: 'modal',
                            title: 'Analyze',
                            gestureEnabled: false,
                            headerLeft: () => (
                                <TouchableOpacity onPress={handleBack}>
                                    <Ionicons name="close" size={24} color="black" />
                                </TouchableOpacity>
                            ),
                        }}
                    />
                </Stack>
            </View>
        </GestureHandlerRootView>
    );
}