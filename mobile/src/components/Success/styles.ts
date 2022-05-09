import { StyleSheet } from 'react-native';
import { theme } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    alignItems:'center',
  },
  image: {
    width: 36,
    height: 36,
    marginTop: 42
  },
  title: {
    fontSize: 24,
    fontFamily: theme.fonts.medium,
    color: theme.colors.text_primary,
    marginTop: 10,
  },
  button: {
    height:40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.surface_secondary,
    borderRadius: 4,
    paddingHorizontal: 24,
    marginTop: 24,
    marginBottom: 56
  },
  buttonTitle: {
    fontSize: 18,
    color: theme.colors.text_primary,
    fontFamily: theme.fonts.medium
  }
});