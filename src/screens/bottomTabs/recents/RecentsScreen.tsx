import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {useContactStore} from '../../../store/store';

export default function RecentsScreen() {
  const {recents, fetchRecents} = useContactStore();
  console.log('recentss', recents);
  useEffect(() => {
    fetchRecents();
  }, [fetchRecents]);
  return (
    <View>
      <Text>RecentsScreen</Text>
    </View>
  );
}
