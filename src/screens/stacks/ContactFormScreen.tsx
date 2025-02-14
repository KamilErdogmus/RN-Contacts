import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import {ContactForm} from '../../components/contact/ContactForm';
import {useContactStore} from '../../store/store';
import {addNewContact, updateContact} from '../../database/Database';
import {useThemeColors} from '../../store/themeStore';
import {SCREENS} from '../../utils/SCREENS';
import Toast from 'react-native-toast-message';
import {FormikHelpers} from 'formik';
import {convertFullName} from '../../utils/convertFullName';

export default function ContactFormScreen() {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RootStackParamList, SCREENS.ContactForm>>();

  const theme = useThemeColors();

  const {mode, contact} = route.params;
  const isEditMode = mode === 'edit';

  const handleSubmit = async (
    values: IContact,
    helpers: FormikHelpers<IContact>,
  ) => {
    try {
      if (isEditMode && contact) {
        await updateContact(contact.id as number, values);
        await useContactStore.getState().fetchContacts();
        const updatedFullName = convertFullName(values.name, values.surname);
        useContactStore.getState().setCurrentDetailName(updatedFullName);

        Toast.show({
          type: 'success',
          text1: 'Contact Updated',
          text2: 'Contact has been successfully updated',
          position: 'bottom',
          visibilityTime: 2000,
        });

        setTimeout(() => {
          navigation.goBack();
        }, 100);
      } else {
        await addNewContact(values);
        await useContactStore.getState().fetchContacts();
        useContactStore.getState().triggerRefresh();

        Toast.show({
          type: 'success',
          text1: 'Contact Added',
          text2: 'New contact has been successfully added',
          position: 'bottom',
          visibilityTime: 2000,
        });

        navigation.goBack();
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: isEditMode ? 'Update Failed' : 'Add Failed',
        text2: 'Please try again',
        position: 'bottom',
        visibilityTime: 2000,
      });
      helpers.setSubmitting(false);
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
