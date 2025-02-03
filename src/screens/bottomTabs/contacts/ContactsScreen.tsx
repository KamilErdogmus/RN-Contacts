import {View, FlatList} from 'react-native';
import React, {useEffect} from 'react';
import {defaultScreenStyles} from '../../../styles/defaultScreenStyles';
import {useContactStore} from '../../../store/store';
import {
  createContactsTable,
  resetDatabase,
  createRecentsTable,
  resetRecentsTable,
  addNewContact,
} from '../../../database/Database';
import ContactCardItem from '../../../components/contact/ContactCardItem';
import FloatActionButton from '../../../components/contact/FloatActionButton';
import {SCREENS} from '../../../utils/SCREENS';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useThemeColors} from '../../../store/themeStore';
import Toast from 'react-native-toast-message';

const randomNames = [
  'John',
  'Jane',
  'Mike',
  'Sarah',
  'David',
  'Emma',
  'James',
  'Emily',
];
const randomSurnames = [
  'Smith',
  'Johnson',
  'Williams',
  'Brown',
  'Jones',
  'Garcia',
  'Miller',
  'Davis',
];
const randomJobs = [
  'Engineer',
  'Doctor',
  'Teacher',
  'Designer',
  'Developer',
  'Manager',
  'Artist',
  'Writer',
];

// Rastgele telefon numarası oluşturma
const generateRandomPhone = () => {
  return `+90${Math.floor(Math.random() * 1000000000)
    .toString()
    .padStart(9, '0')}`;
};

// Rastgele email oluşturma
const generateRandomEmail = (name: string, surname: string) => {
  return `${name.toLowerCase()}.${surname.toLowerCase()}@example.com`;
};

// Rastgele adres oluşturma
const generateRandomAddress = () => {
  const streets = ['Main St', 'Park Ave', 'Broadway', 'Oak St', 'Maple Ave'];
  const cities = ['Istanbul', 'Ankara', 'Izmir', 'Antalya', 'Bursa'];
  return `${Math.floor(Math.random() * 1000)} ${
    streets[Math.floor(Math.random() * streets.length)]
  }, ${cities[Math.floor(Math.random() * cities.length)]}`;
};

export default function ContactsScreen() {
  const {fetchContacts, contacts} = useContactStore();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const theme = useThemeColors();

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
  const handleAddRandomPeople = async () => {
    try {
      // 5 random kişi ekle
      for (let i = 0; i < 5; i++) {
        const name =
          randomNames[Math.floor(Math.random() * randomNames.length)];
        const surname =
          randomSurnames[Math.floor(Math.random() * randomSurnames.length)];
        const phone = generateRandomPhone();
        const email = generateRandomEmail(name, surname);
        const address = generateRandomAddress();
        const job = randomJobs[Math.floor(Math.random() * randomJobs.length)];

        await addNewContact(name, surname, phone, email, address, job);
      }

      await fetchContacts(); // Listeyi güncelle
      Toast.show({
        type: 'success',
        text1: 'Random Contacts Added',
        text2: '5 new random contacts have been added successfully',
        position: 'bottom',
        visibilityTime: 2000,
      });
    } catch (error) {
      console.error('Failed to add random contacts:', error);
      Toast.show({
        type: 'error',
        text1: 'Failed to Add Contacts',
        text2: 'Could not add random contacts. Please try again.',
        position: 'bottom',
        visibilityTime: 2000,
      });
    }
  };

  return (
    <View
      style={[
        defaultScreenStyles.container,
        {backgroundColor: theme.colors.background},
      ]}>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={contacts}
        renderItem={({item}) => <ContactCardItem item={item} />}
      />
      <FloatActionButton onPress={handleAddContact} />
      <FloatActionButton onPress={handleAddRandomPeople} alt={140} />
    </View>
  );
}
