import {View, Pressable, Animated, Text} from 'react-native';
import React, {useRef} from 'react';
import Feather from 'react-native-vector-icons/Feather';
import Avatar from '../contact/Avatar';
import {convertFullName} from '../../utils/convertFullName';
import {useRecentCardStyles} from './styles';
import {GestureHandlerRootView, Swipeable} from 'react-native-gesture-handler';
import {sizes} from '../../constants/constants';
import {useThemeColors} from '../../store/themeStore';

interface RecentCardsProps {
  item: Recent;
  onPress?: () => void;
  onDelete?: () => void;
}

const getCallTypeIcon = (callType: CallType): string => {
  switch (callType) {
    case 'incoming':
      return 'phone-incoming';
    case 'outgoing':
      return 'phone-forwarded';
    case 'missed':
      return 'phone-missed';
    default:
      return 'phone';
  }
};

const getCallTypeColor = (
  callType: CallType,
  theme: ReturnType<typeof useThemeColors>,
) => {
  switch (callType) {
    case 'incoming':
      return theme.colors.success;
    case 'outgoing':
      return theme.colors.primary;
    case 'missed':
      return theme.colors.danger;
    default:
      return theme.colors.basic;
  }
};

export default function RecentCards({
  item,
  onPress,
  onDelete,
}: RecentCardsProps) {
  const styles = useRecentCardStyles();
  const theme = useThemeColors();
  const swipeableRef = useRef<Swipeable>(null);

  const renderRightActions = (
    progress: Animated.AnimatedInterpolation<number>,
    dragX: Animated.AnimatedInterpolation<number>,
  ) => {
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });

    return (
      <Animated.View style={[styles.deleteAction, {transform: [{scale}]}]}>
        <Pressable
          onPress={() => {
            swipeableRef.current?.close();
            onDelete?.();
          }}
          style={styles.deleteButton}>
          <Feather name="trash" size={24} color={theme.colors.control} />
        </Pressable>
      </Animated.View>
    );
  };

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Swipeable
        ref={swipeableRef}
        renderRightActions={renderRightActions}
        rightThreshold={40}
        overshootRight={false}>
        <Pressable
          style={styles.container}
          onPress={onPress}
          android_ripple={{color: theme.colors.basic}}>
          <View style={styles.avatarContainer}>
            <Avatar
              name={item.name}
              surname={item.surname}
              size={sizes.SMALL}
            />
          </View>

          <View style={styles.infoContainer}>
            <Text style={[styles.name, {color: theme.colors.text}]}>
              {convertFullName(item.name, item.surname)}
            </Text>
            <Text style={[styles.phone, {color: theme.colors.text}]}>
              {item.phone}
            </Text>
            <Text style={[styles.date, {color: theme.colors.hint}]}>
              {new Date(item.date).toLocaleString()}
            </Text>
          </View>

          <View style={styles.callTypeContainer}>
            <Feather
              name={getCallTypeIcon(item.callType)}
              size={20}
              color={getCallTypeColor(item.callType, theme)}
            />
          </View>
        </Pressable>
      </Swipeable>
    </GestureHandlerRootView>
  );
}
