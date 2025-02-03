import {View, FlatList, StyleSheet, Text} from 'react-native';
import React, {useEffect} from 'react';
import {useContactStore} from '../../../store/store';
import ContactCardItem from '../../../components/contact/ContactCardItem';
import {useThemeColors} from '../../../store/themeStore';
import {defaultScreenStyles} from '../../../styles/defaultScreenStyles';
import Icon from 'react-native-vector-icons/Entypo';

export default function FavoritesScreen() {
  const {favorites, fetchFavorites, loading} = useContactStore();
  const theme = useThemeColors();

  useEffect(() => {
    fetchFavorites();
  }, []);

  return (
    <View
      style={[
        defaultScreenStyles.container,
        {backgroundColor: theme.colors.background},
      ]}>
      <FlatList
        data={favorites}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => <ContactCardItem item={item} />}
        refreshing={loading}
        onRefresh={fetchFavorites}
        ListEmptyComponent={EmptyListComponent}
        contentContainerStyle={favorites.length === 0 && styles.listContainer}
      />
    </View>
  );
}

const EmptyListComponent = () => {
  const {colors} = useThemeColors();

  return (
    <View style={styles.emptyContainer}>
      <Icon name="star-outline" size={50} color={colors.secondary} />
      <Text style={[styles.emptyTitle, {color: colors.text}]}>
        No Favorites Yet
      </Text>
      <Text style={[styles.emptySubtitle, {color: colors.secondary}]}>
        Add contacts to favorites to see them here
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});
