import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Icon, Button } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import {  useAuth } from '../contexts/authcontext';
import { styles } from '../styles';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation<any>();
  const {user, setUser} = useAuth()

  const handleLogin = () => {
    navigation.navigate('Init')
    console.log(user)
  } 

  return (
    <View style={styles.container}>
        <Input
            placeholder='email'
            onChangeText={(text) => {
              setUser({...user, email: text.toLocaleLowerCase()})
            }}
        />
      <Input
            placeholder='senha'
        />
      <Button
              title={'acessar'}
              containerStyle={{
                width: 200,
                marginHorizontal: 50,
                marginVertical: 10,
              }}
              onPress={handleLogin}
            />
    </View>
  );
}

