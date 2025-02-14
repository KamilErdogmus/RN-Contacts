import {View} from 'react-native';
import React, {useCallback, useEffect} from 'react';
import {defaultScreenStyles} from '../../../styles/defaultScreenStyles';
import {useContactStore} from '../../../store/store';
import {
  createContactsTable,
  createRecentsTable,
  createFavoritesTable,
} from '../../../database/Database';
import FloatActionButton from '../../../components/contact/FloatActionButton';
import {SCREENS} from '../../../utils/SCREENS';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useThemeColors} from '../../../store/themeStore';
import ContactList from '../../../components/contact/ContactList';
import SearchBar from '../../../components/contact/SearchBar';

export default function ContactsScreen() {
  const {
    contacts,
    searchQuery,
    filteredContacts,
    setSearchQuery,
    fetchContacts,
    loading,
  } = useContactStore();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const theme = useThemeColors();
  const displayedContacts = searchQuery ? filteredContacts : contacts;

  useEffect(() => {
    const initDatabase = async () => {
      try {
        await createContactsTable();
        await createRecentsTable();
        await createFavoritesTable();
        await fetchContacts();
      } catch (error) {}
    };

    initDatabase();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchContacts();
    }, [fetchContacts]),
  );

  const handleAddContact = () => {
    navigation.navigate(SCREENS.ContactForm, {mode: 'add'});
  };

  return (
    <View
      style={[
        defaultScreenStyles.container,
        {backgroundColor: theme.colors.background},
      ]}>
      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search by name or phone..."
      />
      <ContactList
        contacts={displayedContacts}
        refreshing={loading}
        onRefresh={fetchContacts}
      />
      <FloatActionButton onPress={handleAddContact} />
    </View>
  );
}
