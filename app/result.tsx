import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import { useAtomValue } from 'jotai';
import { analysisAtom } from '@/atoms/analysis';
import Animated, { FadeIn, FadeInDown, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useLocalSearchParams } from 'expo-router';
import LoadingSkeleton from './components/LoadingSkeleton';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';

const NutritionBadge = ({ label, value }: { label: string; value: string }) => (
  <View className="bg-secondary/10 p-3 rounded-lg items-center mx-1 mb-2 min-w-[80px]">
    <Text className="text-sm text-muted-foreground">{label}</Text>
    <Text className="text-lg font-bold text-primary mt-1">{value}</Text>
  </View>
);

const HealthTag = ({ text, positive }: { text: string; positive: boolean }) => (
  <View className={`px-3 py-1 rounded-full ${positive ? 'bg-green-100' : 'bg-amber-100'} mr-2 mb-2`}>
    <Text className={`text-sm ${positive ? 'text-green-800' : 'text-amber-800'}`}>
      {text}
    </Text>
  </View>
);

const Page = () => {
  const { imageUri } = useLocalSearchParams();
  const analysis = useAtomValue(analysisAtom);
  const [isLoading, setIsLoading] = useState(true);
  const progressWidth = useSharedValue(0);

  useEffect(() => {
    if (analysis) {
      setIsLoading(false);
      // Animate the progress bar when analysis is available
      progressWidth.value = withTiming(analysis.healthScore ?? 0, { duration: 1000 });
    }
  }, [analysis]);


  const animatedStyle = useAnimatedStyle(() => ({
    width: `${progressWidth.value}%`,
  }));

  if (isLoading) return <LoadingSkeleton />;

  return (
    <ScrollView className="flex-1 bg-background" contentContainerStyle={{ paddingBottom: 40 }}>
      {/* Food Image Header - Simplified */}
      <Animated.View entering={FadeIn.duration(600)} className="relative">
        <Image
          source={{ uri: analysis?.image ?? (imageUri as string) }}
          className="w-full h-64"
          resizeMode="cover"
        />
      </Animated.View>

      {/* Food Identification Section */}
      <Animated.View
        entering={FadeInDown.delay(200).duration(500)}
        className="px-4 mt-4"
      >
        <Text className="text-muted-foreground mt-1">
          {analysis?.foodCategory}
        </Text>
        <Text className="text-xl font-bold text-foreground">{analysis?.identifiedFood}</Text>
      </Animated.View>

      {/* Health Score */}
      <Animated.View
        entering={FadeInDown.delay(300).duration(500)}
        className="mx-4 mt-4"
      >
        <View className="bg-card rounded-xl p-4 shadow-md">
          <View className="flex-row items-center justify-between">
            <Text className="text-lg font-semibold">Nutrition Score</Text>
            <View className="flex-row items-center">
              <Ionicons name="heart" size={16} color="#ef4444" />
              <Text className="text-xl font-bold ml-1">
                {analysis?.healthScore ?? 0}/100
              </Text>
            </View>
          </View>
          <View style={styles.progressBarContainer}>
            <Animated.View
              style={[
                styles.progressBarFill,
                animatedStyle,
                {
                  backgroundColor: '#4ade80',
                }
              ]}
            />
          </View>
        </View>
      </Animated.View>

      {/* Quick Nutrition Facts */}
      <Animated.View
        entering={FadeInDown.delay(400).duration(500)}
        className="px-4 mt-6"
      >
        <Text className="text-xl font-bold mb-3">Nutrition at a Glance</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="py-2"
        >
          <NutritionBadge label="Calories" value={analysis?.nutritionFacts.perPortion.calories ?? ''} />
          <NutritionBadge label="Protein" value={`${analysis?.nutritionFacts.perPortion.protein}g`} />
          <NutritionBadge label="Carbs" value={`${analysis?.nutritionFacts.perPortion.carbs}g`} />
          <NutritionBadge label="Fat" value={`${analysis?.nutritionFacts.perPortion.fat}g`} />
          <NutritionBadge label="Fiber" value={`${analysis?.nutritionFacts.perPortion.fiber}g`} />
        </ScrollView>
      </Animated.View>

      {/* Macronutrient Distribution */}
      <Animated.View
        entering={FadeInDown.delay(500).duration(500)}
        className="bg-card mx-4 my-4 p-4 rounded-xl"
      >
        <Text className="text-lg font-bold mb-3">Macronutrient Balance</Text>
        <View className="flex-row h-4 bg-gray-200 rounded-full overflow-hidden">
          {(() => {
            const toPercent = (n: number): `${number}%` => `${n}%` as `${number}%`;
            const protein = parseFloat(analysis?.nutritionFacts.macronutrientDistribution.proteinPercentage ?? '0');
            const carbs = parseFloat(analysis?.nutritionFacts.macronutrientDistribution.carbsPercentage ?? '0');
            const fat = parseFloat(analysis?.nutritionFacts.macronutrientDistribution.fatPercentage ?? '0');
            return (
              <>
                <View className="bg-blue-500" style={{ width: toPercent(protein) }} />
                <View className="bg-green-500" style={{ width: toPercent(carbs) }} />
                <View className="bg-amber-500" style={{ width: toPercent(fat) }} />
              </>
            );
          })()}
        </View>
        <View className="flex-row justify-between mt-2">
          <Text className="text-sm">Protein {analysis?.nutritionFacts.macronutrientDistribution.proteinPercentage}%</Text>
          <Text className="text-sm">Carbs {analysis?.nutritionFacts.macronutrientDistribution.carbsPercentage}%</Text>
          <Text className="text-sm">Fat {analysis?.nutritionFacts.macronutrientDistribution.fatPercentage}%</Text>
        </View>
      </Animated.View>

      {/* Health Tags */}
      <Animated.View
        entering={FadeInDown.delay(600).duration(500)}
        className="px-4 mt-2"
      >
        <Text className="text-lg font-bold mb-2">Key Attributes</Text>
        <View className="flex-row flex-wrap">
          {analysis?.healthBenefits.map((benefit, i) => (
            <HealthTag key={`benefit-${i}`} text={benefit} positive={true} />
          ))}
          {analysis?.potentialConcerns.map((concern, i) => (
            <HealthTag key={`concern-${i}`} text={concern} positive={false} />
          ))}
        </View>
      </Animated.View>

      {/* Detailed Nutrition */}
      <Animated.View
        entering={FadeInDown.delay(700).duration(500)}
        className="mt-6 px-4"
      >
        <Text className="text-xl font-bold mb-4">Detailed Nutrition</Text>
        <View className="bg-card rounded-xl p-5">
          {/* Header Row */}
          <View className="flex-row justify-between pb-3 border-b border-border/20">
            <Text className="font-medium text-muted-foreground w-1/3">Nutrient</Text>
            <Text className="font-medium text-muted-foreground w-1/3 text-center">Per Serving</Text>
            <Text className="font-medium text-muted-foreground w-1/3 text-right">Per 100g</Text>
          </View>

          {/* Data Rows */}
          {(() => {
            const perPortion = (analysis?.nutritionFacts?.perPortion ?? {}) as Record<string, string>;
            const per100g = (analysis?.nutritionFacts?.per100g ?? {}) as Record<string, string>;
            return Object.keys(perPortion).map((key) => (
              <View
                key={key}
                className="flex-row justify-between py-3 border-b border-border/10 last:border-b-0"
              >
                <Text className="font-medium w-1/3 capitalize">{key}</Text>
                <Text className="w-1/3 text-center">{perPortion[key]}</Text>
                <Text className="w-1/3 text-right">{per100g[key] ?? ''}</Text>
              </View>
            ));
          })()}
        </View>
      </Animated.View>

      {/* Additional Info Cards - Now in Column */}
      <Animated.View
        entering={FadeInDown.delay(800).duration(500)}
        className="px-4 mt-6 mb-10"
      >
        <View className="space-y-4">
          {/* Preparation Tips Card */}
          <View className="bg-card p-4 rounded-xl">
            <Text className="font-bold mb-2">Preparation Tips</Text>
            {analysis?.preparationTips.map((tip, i) => (
              <Text key={i} className="text-sm mb-1">• {tip}</Text>
            ))}
          </View>

          {/* Storage Advice Card */}
          <View className="bg-card p-4 mt-4 rounded-xl">
            <Text className="font-bold mb-2">Storage Advice</Text>
            {analysis?.storageRecommendations.map((tip, i) => (
              <Text key={i} className="text-sm mb-1">• {tip}</Text>
            ))}
          </View>
        </View>
      </Animated.View>
    </ScrollView>
  );
};

export default Page;

const styles = StyleSheet.create({
  progressBarContainer: {
    height: 8,
    backgroundColor: '#e5e7eb', // gray-200
    borderRadius: 9999, // full rounded
    overflow: 'hidden',
    marginTop: 8,
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 9999,
  },
});
