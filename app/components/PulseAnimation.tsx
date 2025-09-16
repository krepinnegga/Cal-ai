import Animated, {
    useSharedValue,
    withRepeat,
    withTiming,
    useAnimatedStyle,
    Easing,
} from 'react-native-reanimated';
import { useEffect } from 'react';
import { View, ViewProps } from 'react-native';

interface PulseAnimationProps extends ViewProps {
    children: React.ReactNode;
    duration?: number;
    minOpacity?: number;
    maxOpacity?: number;
}

export default function PulseAnimation({
    children,
    duration = 1000,
    minOpacity = 0.6,
    maxOpacity = 0.9,
    style,
    ...props
}: PulseAnimationProps) {
    const pulse = useSharedValue(minOpacity);

    useEffect(() => {
        pulse.value = withRepeat(
            withTiming(maxOpacity, {
                duration,
                easing: Easing.inOut(Easing.ease),
            }),
            -1, // Infinite repetition
            true // Reverse animation
        );
    }, []);

    const animatedStyle = useAnimatedStyle(() => ({
        opacity: pulse.value,
        transform: [{ scale: 1 + (pulse.value - 0.6) * 0.02 }],
    }));

    return (
        <Animated.View style={[animatedStyle, style]} {...props}>
            {children}
        </Animated.View>
    );
}
