import {View, FlatList} from 'react-native';
import React, {useEffect} from 'react';
import {defaultScreenStyles} from '../../../styles/defaultScreenStyles';
import {useContactStore} from '../../../store/store';
import {
  createContactsTable,
  resetDatabase,
  createRecentsTable,
  resetRecentsTable,
} from '../../../database/Database';
import ContactCardItem from '../../../components/contact/ContactCardItem';
import FloatActionButton from '../../../components/contact/FloatActionButton';
import {SCREENS} from '../../../utils/SCREENS';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export default function ContactsScreen() {
  const {fetchContacts, contacts} = useContactStore();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    const initDatabase = async () => {
      try {
        await resetDatabase();
        await resetRecentsTable();
        await createContactsTable();
        await createRecentsTable();
        await fetchContacts();
      } catch (error) {
        console.error('Database initialization error:', error);
      }
    };

    initDatabase();
  }, []);

  const handleAddContact = () => {
    navigation.navigate(SCREENS.ContactForm, {mode: 'add'});
  };

  return (
    <View style={defaultScreenStyles.container}>
      <FlatList
        keyExtractor={item => item.id.toString()}
        data={contacts}
        renderItem={({item}) => <ContactCardItem item={item} />}
      />
      <FloatActionButton onPress={handleAddContact} />
    </View>
  );
}
