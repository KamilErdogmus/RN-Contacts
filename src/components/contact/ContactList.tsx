import {View, Text, SectionList} from 'react-native';
import React, {useMemo} from 'react';
import {useThemeColors} from '../../store/themeStore';
import ContactCardItem from './ContactCardItem';
import {contactCardItemStyles} from './styles';

export default function ContactList({
  contacts,
  refreshing,
  onRefresh,
}: {
  contacts: IContact[];
  refreshing?: boolean;
  onRefresh?: () => void;
}) {
  const sections = useMemo(() => {
    const sortedContacts = [...contacts].sort((a, b) =>
      a.name.localeCompare(b.name),
    );

    const grouped = sortedContacts.reduce(
      (acc: {[key: string]: IContact[]}, contact) => {
        const firstLetter = contact.name.charAt(0).toUpperCase();
        if (!acc[firstLetter]) {
          acc[firstLetter] = [];
        }
        acc[firstLetter].push(contact);
        return acc;
      },
      {},
    );

    return Object.keys(grouped)
      .sort()
      .map(letter => ({
        title: letter,
        data: grouped[letter],
      }));
  }, [contacts]);

  return (
    <SectionList
      sections={sections}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({item}) => <ContactCardItem item={item} />}
      renderSectionHeader={({section: {title}}) => (
        <SectionHeader title={title} />
      )}
      stickySectionHeadersEnabled
      refreshing={refreshing}
      onRefresh={onRefresh}
      ListEmptyComponent={() => (
        <View style={contactCardItemStyles.emptyContainer}>
          <Text style={contactCardItemStyles.emptyText}>No contacts found</Text>
        </View>
      )}
    />
  );
}
function SectionHeader({title}: {title: string}) {
  const {colors} = useThemeColors();

  return (
    <View
      style={[
        contactCardItemStyles.sectionHeader,
        {backgroundColor: colors.card},
      ]}>
      <Text
        style={[
          contactCardItemStyles.sectionHeaderText,
          {color: colors.PRIMARY},
        ]}>
        {title}
      </Text>
    </View>
  );
}
