import {View, FlatList} from 'react-native';
import React, {useEffect} from 'react';
import {defaultScreenStyles} from '../../../styles/defaultScreenStyles';
import {useContactStore} from '../../../store/store';
import {
  addNewContact,
  createContactsTable,
  resetDatabase,
  createRecentsTable,
  checkTableStructure,
  resetRecentsTable,
} from '../../../database/Database';
import ContactCardItem from '../../../components/contact/ContactCardItem';
import FloatActionButton from '../../../components/contact/FloatActionButton';

export default function ContactsScreen() {
  const {fetchContacts, contacts} = useContactStore();

  useEffect(() => {
    const initDatabase = async () => {
      try {
        await createContactsTable();
        await createRecentsTable();

        await fetchContacts();
      } catch (error) {
        console.error('Database initialization error:', error);
      }
    };

    initDatabase();
  }, []);

  const handleAddContact = async () => {
    try {
      const testContact = {
        name: 'John',
        surname: 'Doe',
        phone: '555-0123',
        email: 'john@example.com',
        address: '123 Main St',
        job: 'Developer',
      };

      console.log('Adding contact:', testContact);

      await addNewContact(
        testContact.name,
        testContact.surname,
        testContact.phone,
        testContact.email,
        testContact.address,
        testContact.job,
      );

      await fetchContacts();
    } catch (error) {
      console.error('Failed to add contact:', error);
    }
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
