import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { ThemeProvider, Button, Text } from '@rneui/themed';
import { usePayment } from '../contexts/datacontext';
import { useNavigation } from '@react-navigation/native';

interface Ipayment {
  cnpj: string;
  valor: number;
  usuario: string;
  timestamp: number;
  url: string;
}


 const SuccessScreen: React.FC = () => {

    const {payment} = usePayment()
    const navigation = useNavigation<any>();


    function handleReturn(){
        navigation.navigate('Init')
    }
  
    return (
        <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
            <Text h3>Sucesso</Text>

        </View>
        <View style={styles.containerSecundary}>
            <Text style={styles.text}>CNPJ: {payment!.cnpj}</Text>
            <Text style={styles.text}>Valor: R$ {payment!.valor.toFixed(2).toString().replace('.',',')}</Text>
            <Text style={styles.text}>Usuário: {payment!.usuario}</Text>
            <Text style={styles.text}>Hora: {new Date(payment!.timestamp).toLocaleString()}</Text>
            <Text style={styles.text}>URL: {payment!.url}</Text>
            <Button title="OK" containerStyle={styles.button} onPress={handleReturn} />
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

  containerSecundary: {
    flex: 1,
    padding: 20,
  },
  text: {
    fontSize: 16,
    marginVertical: 5,
  },
  button: {
    marginTop: 20,
    width: '100%',
  },
});


export default SuccessScreen;