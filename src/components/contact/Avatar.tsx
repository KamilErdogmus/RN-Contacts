import {View, Text} from 'react-native';
import React from 'react';
import {contactCardItemStyles} from './styles';
import {getInitialLetters} from '../../utils/convertFullName';

export default function Avatar({
  name,
  surname,
}: {
  name: string;
  surname: string;
}) {
  return (
    <View style={contactCardItemStyles.container}>
      <Text>{getInitialLetters(name, surname)}</Text>
    </View>
  );
}
