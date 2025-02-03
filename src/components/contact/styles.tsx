import {StyleSheet} from 'react-native';

export const contactCardItemStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  innerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    height: 60,
    width: 60,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 6,
    justifyContent: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  job: {
    fontSize: 14,
  },
  btnContainer: {
    position: 'absolute',

    right: 24,
    zIndex: 999,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  buttonPressed: {
    transform: [{scale: 0.95}],
    opacity: 0.9,
  },
  avatarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 1000,
  },
  avatarText: {
    fontWeight: '600',
    fontSize: 18,
  },
  sectionHeader: {
    padding: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    elevation: 2,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  sectionHeaderText: {
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
});
