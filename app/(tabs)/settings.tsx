import Constants from 'expo-constants';
import { StyleSheet } from 'react-native';

import { Text, View } from '@/components/Themed';

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ayarlar</Text>
      <Text style={styles.subtitle}>Sürüm {Constants.expoConfig?.version ?? '-'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    marginTop: 8,
    fontSize: 16,
    opacity: 0.7,
  },
});
