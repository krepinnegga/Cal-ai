import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { useSetAtom } from 'jotai';
import { analysisAtom } from '@/atoms/analysis';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
const fakeResponse = require('@/assets/response.json');

export default function Index() {
  const router = useRouter();
  const setAnalysis = useSetAtom(analysisAtom);

  const captureImage = async (camera = false) => {
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
      <LinearGradient
          colors={['#f7f9fc', '#eef2f6']}
          style={styles.container}
      >
        <View style={styles.header}>
          <Text style={styles.title}>NutriScan</Text>
          <Text style={styles.subtitle}>Snap a photo to analyze your meal's nutritional value</Text>
        </View>

        <Image
            source={{ uri: 'https://images.unsplash.com/photo-1606787366850-de6330128bfc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80' }}
            style={styles.illustration}
            resizeMode="contain"
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity
              style={[styles.button, styles.cameraButton]}
              onPress={() => captureImage(true)}
              activeOpacity={0.8}
          >
            <Ionicons name="camera" size={24} color="white" />
            <Text style={styles.buttonText}>Take Photo</Text>
          </TouchableOpacity>

          <TouchableOpacity
              style={[styles.button, styles.galleryButton]}
              onPress={() => captureImage(false)}
              activeOpacity={0.8}
          >
            <MaterialIcons name="photo-library" size={24} color="white" />
            <Text style={styles.buttonText}>Choose from Gallery</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.footerText}>
          Powered by Gemini-AI (gemini-2.0-flash).
        </Text>
      </LinearGradient>
  );
}

const styles= StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2d3748',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#718096',
    textAlign: 'center',
    maxWidth: 300,
  },
  illustration: {
    width: 300,
    height: 200,
    marginBottom: 40,
    borderRadius: 12,
  },
  buttonContainer: {
    width: '100%',
    gap: 16,
    marginBottom: 30,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    gap: 10,
  },
  cameraButton: {
    backgroundColor: '#3b82f6',
  },
  galleryButton: {
    backgroundColor: '#10b981',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  footerText: {
    color: '#718096',
    fontSize: 14,
    marginTop: 20,
  },
});
