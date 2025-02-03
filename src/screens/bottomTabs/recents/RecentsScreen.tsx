import {View} from 'react-native';
import React, {useEffect} from 'react';
import {useContactStore} from '../../../store/store';
import {FlatList} from 'react-native';
import RecentCards from '../../../components/recents/RecentCards';
import {SCREENS} from '../../../utils/SCREENS';
import {useNavigation} from '@react-navigation/native';
import {
  deleteRecent,
  getContactById,
  addRecentCall,
  getContacts,
} from '../../../database/Database';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {recentScreenStyles as styles} from './styles';
import {useThemeColors} from '../../../store/themeStore';
import FloatActionButton from '../../../components/contact/FloatActionButton';
import Toast from 'react-native-toast-message';

const generateRandomDuration = () => {
  return Math.floor(Math.random() * (300 - 5 + 1) + 5);
};

const callTypes: CallType[] = ['incoming', 'outgoing', 'missed'];
const getRandomCallType = () => {
  return callTypes[Math.floor(Math.random() * callTypes.length)];
};

export default function RecentsScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const {recents, fetchRecents, loading} = useContactStore();
  const theme = useThemeColors();

  useEffect(() => {
    fetchRecents();
  }, [fetchRecents]);

  const handleRecentPress = async (recent: Recent) => {
    try {
      const contact = await getContactById(recent.recent_id);
      navigation.navigate(SCREENS.Detail, {contact});
    } catch (error) {
      console.error('Contact details error:', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteRecent(id);
      await fetchRecents();
      Toast.show({
        type: 'success',
        text1: 'Recent Call Deleted',
        text2: 'Call history entry has been removed',
        position: 'bottom',
        visibilityTime: 2000,
      });
    } catch (error) {
      console.error('Delete error:', error);
      Toast.show({
        type: 'error',
        text1: 'Delete Failed',
        text2: 'Could not delete call history entry',
        position: 'bottom',
        visibilityTime: 2000,
      });
    }
  };

  const handleAddRandomRecent = async () => {
    try {
      const contacts = await getContacts();

      if (contacts.length === 0) {
        Toast.show({
          type: 'error',
          text1: 'No Contacts',
          text2: 'Please add some contacts first',
          position: 'bottom',
          visibilityTime: 2000,
        });
        return;
      }

      for (let i = 0; i < 5; i++) {
        const randomContact =
          contacts[Math.floor(Math.random() * contacts.length)];

        const callType = getRandomCallType();
        const duration = callType === 'missed' ? 0 : generateRandomDuration();

        await addRecentCall(randomContact.id as number, callType, duration);
      }

      await fetchRecents();

      Toast.show({
        type: 'success',
        text1: 'Random Calls Added',
        text2: '5 new random calls have been added to history',
        position: 'bottom',
        visibilityTime: 2000,
      });
    } catch (error) {
      console.error('Failed to add random recents:', error);
      Toast.show({
        type: 'error',
        text1: 'Failed to Add Calls',
        text2: 'Could not add random call history',
        position: 'bottom',
        visibilityTime: 2000,
      });
    }
  };

  return (
    <View
      style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <FlatList
        data={recents}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <RecentCards
            item={item}
            onPress={() => handleRecentPress(item)}
            onDelete={() => handleDelete(item.id)}
          />
        )}
        refreshing={loading}
        onRefresh={fetchRecents}
      />
      <FloatActionButton onPress={handleAddRandomRecent} />
    </View>
  );
}
