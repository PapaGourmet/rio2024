import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { ThemeProvider, Button, Text } from '@rneui/themed';

const ErrorScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text h3>Error</Text>
        <Text style={styles.text}>An error has occurred. Please try again.</Text>
        <Button title="Retry" containerStyle={styles.button} />
      </View>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 16,
    marginVertical: 5,
    textAlign: 'center',
  },
  button: {
    marginTop: 20,
    width: '100%',
  },
});


export default ErrorScreen;