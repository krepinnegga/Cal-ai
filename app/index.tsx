import { Text, View, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { useSetAtom } from 'jotai';
import { analysisAtom } from '@/atoms/analysis';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
const AppIcon = require('@/assets/images/AppIcon.png');

export default function Index() {
  const router = useRouter();
  const setAnalysis = useSetAtom(analysisAtom);

  const captureImage = async (camera = false) => {
    // Development shortcut
    // if (__DEV__) {
    //   setAnalysis(fakeResponse);
    //   router.push('/result');
    //   return;
    // }

    let result;
    if (camera) {
      await ImagePicker.requestCameraPermissionsAsync();
      result = await ImagePicker.launchCameraAsync({
        mediaTypes: ['images'],
        quality: 1,
        base64: true,
      });
    } else {
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        quality: 1,
        base64: true,
      });
    }

    if (!result.canceled) {
      try {
        const response = await fetch('/api/analyze', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            image: {
              inlineData: {
                data: result.assets[0].base64,
                mimeType: 'image/jpeg',
              },
            },
          }),
        });
        const data = await response.json();
        const foodAnalysis = data.data.foodAnalysis;
        foodAnalysis.image = result.assets[0].uri;
        setAnalysis(foodAnalysis);
        router.push('/result');
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
      <View
          className="flex-1 bg-background justify-center items-center p-6"
      >
        <Animated.View
            entering={FadeIn.delay(100)}
            className="items-center mb-8"
        >
          <Text className="text-4xl font-bold text-primary mb-2">Nutri-Scan</Text>
          <Text className="text-lg text-muted-foreground text-center max-w-[300px]">
            Snap a photo to analyze your meal's nutritional value
          </Text>
        </Animated.View>

        <Animated.View
            entering={FadeIn.delay(300)}
            className="mb-10"
        >
          {/*<Image*/}
          {/*    source={{ uri: 'https://images.unsplash.com/photo-1606787366850-de6330128bfc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80' }}*/}
          {/*    className="w-[280px] h-[200px] rounded-2xl shadow-lg shadow-primary/20 border-2 border-primary/10"*/}
          {/*    resizeMode="cover"*/}
          {/*/>*/}
          <Image
              source={AppIcon}
              className="w-[280px] h-[240px] rounded-2xl shadow-lg shadow-primary/20 border-2 border-primary/10"
              resizeMode="center"
          />
        </Animated.View>

        <View className="w-full gap-5 mb-8">
          <Animated.View entering={FadeInDown.delay(500)}>
            <TouchableOpacity
                className="flex-row items-center justify-center py-5 px-6 rounded-xl bg-primary shadow-lg shadow-primary/30 active:opacity-90 gap-3"
                onPress={() => captureImage(true)}
                activeOpacity={0.8}
            >
              <Ionicons name="camera" size={24} color="hsl(var(--primary-foreground))" />
              <Text className="text-primary-foreground text-lg font-semibold">Take Photo</Text>
            </TouchableOpacity>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(700)}>
            <TouchableOpacity
                className="flex-row items-center justify-center py-5 px-6 rounded-xl bg-accent shadow-lg shadow-accent/30 active:opacity-90 gap-3"
                onPress={() => captureImage(false)}
                activeOpacity={0.8}
            >
              <MaterialIcons name="photo-library" size={24} color="hsl(var(--accent-foreground))" />
              <Text className="text-accent-foreground text-lg font-semibold">Choose from Gallery</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>

        <Animated.View
            entering={FadeIn.delay(900)}
            className="absolute bottom-8"
        >
          <Text className="text-sm text-muted-foreground">
            Powered by <Text className="text-primary">Gemini-AI</Text>
          </Text>
        </Animated.View>
      </View>
  );
}