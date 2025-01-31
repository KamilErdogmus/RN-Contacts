import React from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
} from 'react-native';
import {Formik, FormikHelpers} from 'formik';
import {contactSchema} from '../../utils/validation';
import {useThemeColors} from '../../store/themeStore';

interface ContactFormProps {
  initialValues?: Partial<IContact>;
  onSubmit: (values: IContact, helpers: FormikHelpers<IContact>) => void;
  submitText: string;
}

interface FormField {
  name: keyof IContact;
  label: string;
  keyboardType?: 'default' | 'phone-pad' | 'email-address';
  multiline?: boolean;
}

const formFields: FormField[] = [
  {name: 'name', label: 'Name'},
  {name: 'surname', label: 'Surname'},
  {name: 'phone', label: 'Phone', keyboardType: 'phone-pad'},
  {name: 'email', label: 'Email', keyboardType: 'email-address'},
  {name: 'job', label: 'Job'},
  {name: 'address', label: 'Address', multiline: true},
];

export const ContactForm = ({
  initialValues,
  onSubmit,
  submitText,
}: ContactFormProps) => {
  const theme = useThemeColors();

  const renderInput = (
    field: FormField,
    values: IContact,
    handleChange: (field: string) => (text: string) => void,
    handleBlur: (field: string) => () => void,
    errors: Record<string, string | undefined>,
    touched: Record<string, boolean | undefined>,
  ) => {
    const hasError = touched[field.name] && errors[field.name];

    return (
      <View key={field.name} style={styles.inputContainer}>
        <Text style={[styles.label, {color: theme.colors.text}]}>
          {field.label}
        </Text>
        <TextInput
          value={values[field.name]?.toString() || ''}
          onChangeText={handleChange(field.name)}
          onBlur={handleBlur(field.name)}
          style={[
            styles.input,
            {
              color: theme.colors.text,
              borderColor: hasError ? 'red' : theme.colors.border,
            },
          ]}
          keyboardType={field.keyboardType}
          multiline={field.multiline}
          placeholderTextColor={`${theme.colors.text}80`}
        />
        {hasError && <Text style={styles.errorText}>{errors[field.name]}</Text>}
      </View>
    );
  };

  const initialFormValues: IContact = {
    name: '',
    surname: '',
    phone: '',
    email: '',
    job: '',
    address: '',
    ...initialValues,
  };

  return (
    <Formik<IContact>
      initialValues={initialFormValues}
      validationSchema={contactSchema}
      onSubmit={onSubmit}>
      {({handleChange, handleBlur, handleSubmit, values, errors, touched}) => (
        <View
          style={[
            styles.container,
            {backgroundColor: theme.colors.background},
          ]}>
          {formFields.map(field =>
            renderInput(
              field,
              values,
              handleChange,
              handleBlur,
              errors,
              touched,
            ),
          )}
          <TouchableOpacity
            onPress={() => handleSubmit()}
            style={styles.submitButton}>
            <Text style={styles.submitButtonText}>{submitText}</Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginTop: 4,
  },
  label: {
    fontSize: 14,
    marginBottom: 4,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
  submitButton: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
