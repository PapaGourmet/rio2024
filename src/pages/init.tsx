import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from '@rneui/themed';
import { View, StyleSheet } from 'react-native';
import { Button } from '@rneui/themed';

export default function InitScreen() {
    const navigation = useNavigation<any>();

    function handlePressCam(){
        navigation.navigate('Home')
    }

    function handleLogof(){
        navigation.navigate('Login')
    }

    return (
        <SafeAreaProvider>
        <ThemeProvider>
            <View style={styles.container}>
            <Button title="Press Me" onPress={handlePressCam} />

            <Button title="sair" 
                containerStyle={{
                    width: 200,
                    marginTop: 10
                }}

                onPress={handleLogof} 
              />
            </View>
        </ThemeProvider>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
