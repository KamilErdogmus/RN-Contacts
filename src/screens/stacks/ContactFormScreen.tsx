import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import {ContactForm} from '../../components/contact/ContactForm';
import {useContactStore} from '../../store/store';
import {addNewContact, updateContact} from '../../database/Database';
import {useThemeColors} from '../../store/themeStore';
import {SCREENS} from '../../utils/SCREENS';
import Toast from 'react-native-toast-message';

export default function ContactFormScreen() {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RootStackParamList, SCREENS.ContactForm>>();
  const {fetchContacts} = useContactStore();
  const theme = useThemeColors();

  const {mode, contact} = route.params;
  const isEditMode = mode === 'edit';

  const handleSubmit = async (values: IContact) => {
    try {
      if (isEditMode) {
        await updateContact(contact!.id!, values);
        Toast.show({
          type: 'success',
          text1: 'Contact Updated',
          text2: 'Contact information has been updated',
          position: 'bottom',
          visibilityTime: 2000,
        });
      } else {
        await addNewContact(
          values.name,
          values.surname,
          values.phone,
          values.email,
          values.address,
          values.job,
        );
        Toast.show({
          type: 'success',
          text1: 'Contact Added',
          text2: 'New contact has been added successfully',
          position: 'bottom',
          visibilityTime: 2000,
        });
      }
      await fetchContacts();
      navigation.goBack();
    } catch (error) {
      console.error(`Failed to ${mode} contact:`, error);
      Toast.show({
        type: 'error',
        text1: `${isEditMode ? 'Update' : 'Add'} Failed`,
        text2: `Could not ${
          isEditMode ? 'update' : 'add'
        } contact. Please try again.`,
        position: 'bottom',
        visibilityTime: 2000,
      });
    }
  };

  return (
    <View
      style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <ContactForm
        initialValues={isEditMode ? contact : undefined}
        onSubmit={handleSubmit}
        submitText={isEditMode ? 'Update Contact' : 'Add Contact'}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
