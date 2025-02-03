import {View} from 'react-native';
import React, {useEffect, useState, useCallback} from 'react';
import {useContactStore} from '../../../store/store';
import {FlatList} from 'react-native';
import RecentCards from '../../../components/recents/RecentCards';
import {SCREENS} from '../../../utils/SCREENS';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {deleteRecent, getContactById} from '../../../database/Database';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {recentScreenStyles as styles} from './styles';
import {useThemeColors} from '../../../store/themeStore';
import Toast from 'react-native-toast-message';
import {convertFullName} from '../../../utils/convertFullName';

export default function RecentsScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const {recents, fetchRecents, setCurrentDetailName} = useContactStore();
  const theme = useThemeColors();
  const [isRefreshing, setIsRefreshing] = useState(false);

  useFocusEffect(
    useCallback(() => {
      fetchRecents();
    }, [fetchRecents]),
  );

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', () => {
      fetchRecents();
    });

    return unsubscribe;
  }, [navigation, fetchRecents]);

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await fetchRecents();
    setIsRefreshing(false);
  }, [fetchRecents]);

  const handleRecentPress = useCallback(
    async (recent: Recent) => {
      try {
        const contact = await getContactById(recent.recent_id);
        setCurrentDetailName(convertFullName(contact.name, contact.surname));
        navigation.navigate(SCREENS.Detail, {contact});
      } catch (error) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Could not load contact details',
          position: 'bottom',
          visibilityTime: 2000,
        });
      }
    },
    [navigation, setCurrentDetailName],
  );

  const handleDelete = useCallback(
    async (id: number) => {
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
        Toast.show({
          type: 'error',
          text1: 'Delete Failed',
          text2: 'Could not delete call history entry',
          position: 'bottom',
          visibilityTime: 2000,
        });
      }
    },
    [fetchRecents],
  );

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
        refreshing={isRefreshing}
        onRefresh={handleRefresh}
        onEndReachedThreshold={0.5}
        maxToRenderPerBatch={10}
        windowSize={10}
      />
    </View>
  );
}
