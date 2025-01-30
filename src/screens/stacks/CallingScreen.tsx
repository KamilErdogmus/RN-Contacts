import {View, Text, Pressable, SafeAreaView} from 'react-native';
import React from 'react';
import {RouteProp, useRoute, useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {SCREENS} from '../../utils/SCREENS';
import {callingScreenStyles as styles} from './styles';
import Avatar from '../../components/contact/Avatar';
import {convertFullName} from '../../utils/convertFullName';
import {sizes} from '../../constants/constants';
import {COLORS} from '../../theme/COLORS';

export default function CallingScreen() {
  const route = useRoute<RouteProp<RootStackParamList, SCREENS.Calling>>();
  const navigation = useNavigation();
  const {phone, name, surname} = route.params.contact;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.userInfo}>
        <Avatar name={name} surname={surname} size={sizes.LARGE} />
        <Text style={styles.name}>{convertFullName(name, surname)}</Text>
        <Text style={styles.status}>Dialing...</Text>
        <Text style={styles.phone}>{phone}</Text>
      </View>

      <View style={styles.controls}>
        <View style={styles.upperControls}>
          <Pressable style={styles.controlButton}>
            <Icon name="volume-high-outline" size={24} color={COLORS.WHITE} />
            <Text style={styles.buttonText}>Speaker</Text>
          </Pressable>

          <Pressable style={styles.controlButton}>
            <Icon name="mic-off-outline" size={24} color={COLORS.WHITE} />
            <Text style={styles.buttonText}>Mute</Text>
          </Pressable>

          <Pressable style={styles.controlButton}>
            <Icon name="keypad-outline" size={24} color={COLORS.WHITE} />
            <Text style={styles.buttonText}>Keypad</Text>
          </Pressable>
        </View>

        <Pressable
          onPress={() => navigation.goBack()}
          style={styles.endCallButton}>
          <Icon name="call" size={32} color={COLORS.WHITE} />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
