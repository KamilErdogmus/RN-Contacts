import {StyleSheet} from 'react-native';
import {useThemeColors} from '../../store/themeStore';

export const useRecentCardStyles = () => {
  const theme = useThemeColors();
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.card,
      marginHorizontal: 8,
      padding: 8,
      marginVertical: 12,
      borderRadius: 12,
      shadowColor: theme.colors.text,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    avatarContainer: {
      marginRight: 16,
    },
    infoContainer: {
      flex: 1,
      justifyContent: 'center',
    },
    callTypeContainer: {
      padding: 8,
      justifyContent: 'center',
      alignItems: 'center',
    },
    name: {
      fontSize: 16,
      fontWeight: '600',
      marginBottom: 4,
    },
    phone: {
      fontSize: 14,
      marginBottom: 2,
    },
    date: {
      fontSize: 12,
    },
    deleteAction: {
      backgroundColor: theme.colors.danger,
      justifyContent: 'center',
      alignItems: 'center',
      width: 70,
      marginHorizontal: 8,
      marginVertical: 12,
      borderRadius: 12,
      shadowColor: theme.colors.shadow,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    deleteButton: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100%',
    },
  });
};
