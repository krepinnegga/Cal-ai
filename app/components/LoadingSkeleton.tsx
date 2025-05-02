import PulseAnimation from "@/app/components/PulseAnimation";
import {ActivityIndicator, Text, View} from "react-native";

const LoadingSkeleton = () => {
    return (
        <View className="flex-1 p-6">
            {/* Image Placeholder */}
            <PulseAnimation className="mb-6">
                <View className="w-full h-80 bg-gray-200/80 dark:bg-gray-700/80 rounded-2xl" />
            </PulseAnimation>

            {/* Title Placeholder */}
            <View className="mb-8">
                <PulseAnimation className="mb-2">
                    <View className="h-8 bg-gray-200/80 dark:bg-gray-700/80 rounded-full w-3/4" />
                </PulseAnimation>
                <PulseAnimation>
                    <View className="h-5 bg-gray-200/80 dark:bg-gray-700/80 rounded-full w-1/2" />
                </PulseAnimation>
            </View>

            {/* Nutrition Grid Placeholder */}
            <View className="flex-row flex-wrap -mx-2 mb-8">
                {[...Array(8)].map((_, i) => (
                    <PulseAnimation key={i} className="w-1/2 p-2">
                        <View className="bg-gray-200/80 dark:bg-gray-700/80 p-4 rounded-xl h-20" />
                    </PulseAnimation>
                ))}
            </View>

            {/* Loading Indicator */}
            <View className="mt-12 items-center">
                <ActivityIndicator size="large" color="hsl(var(--primary))" />
                <PulseAnimation className="mt-4">
                    <Text className="text-muted-foreground mt-4">Analyzing your meal...</Text>
                </PulseAnimation>
            </View>
        </View>
    );
};

export default LoadingSkeleton;