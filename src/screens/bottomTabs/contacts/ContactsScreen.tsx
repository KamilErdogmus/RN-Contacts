import {View, FlatList, Pressable, Text} from 'react-native';
import React, {useEffect} from 'react';
import {defaultScreenStyles} from '../../../styles/defaultScreenStyles';
import {useContactStore} from '../../../store/store';
import {
  addNewContact,
  createContactsTable,
  resetDatabase,
} from '../../../database/Database';
import ContactCardItem from '../../../components/contact/ContactCardItem';

export default function ContactsScreen() {
  const {fetchContacts, contacts} = useContactStore();
  useEffect(() => {
    const initDatabase = async () => {
      try {
        // await resetDatabase();
        await createContactsTable();
        await fetchContacts();
      } catch (error) {
        console.error('Database initialization error:', error);
      }
    };

    initDatabase();
  }, []);

  const handleAddContact = async () => {
    try {
      console.log('Contact ekleme başladı'); // Debug log

      await addNewContact(
        'Test',
        'User',
        '1234567890',
        'test@test.com',
        'Test Address',
        'Developer',
      );

      console.log('Contact eklendi, liste güncelleniyor'); // Debug log

      await fetchContacts();

      console.log('Liste güncellendi'); // Debug log
    } catch (error) {
      console.error('Contact adding error:', error);
    }
  };

  return (
    <View style={defaultScreenStyles.container}>
      <Pressable onPress={handleAddContact}>
        <Text>Oluşturrr</Text>
      </Pressable>
      <FlatList
        keyExtractor={item => item.id.toString()}
        data={contacts}
        renderItem={({item}) => <ContactCardItem item={item} />}
      />
    </View>
  );
}
