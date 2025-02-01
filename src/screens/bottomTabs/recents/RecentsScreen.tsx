import {View} from 'react-native';
import React, {useEffect} from 'react';
import {useContactStore} from '../../../store/store';
import {FlatList} from 'react-native';
import RecentCards from '../../../components/recents/RecentCards';
import {SCREENS} from '../../../utils/SCREENS';
import {useNavigation} from '@react-navigation/native';
import {deleteRecent, getContactById} from '../../../database/Database';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {recentScreenStyles as styles} from './styles';
import {useThemeColors} from '../../../store/themeStore';

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
      await deleteRecent(id); // Database fonksiyonu eklenecek
      await fetchRecents(); // Listeyi yenile
    } catch (error) {
      console.error('Delete error:', error);
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
    </View>
  );
}
