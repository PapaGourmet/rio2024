import React, { useState, useEffect } from 'react';
import 'react-native-gesture-handler';
import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native';
import DocumentScanner from 'react-native-document-scanner-plugin';
import { FirebaseImageService } from './../../src/services/imageService';
import { CamImages } from './../../src/interfaces/interfaces';
import { Button } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../styles';
import { useAuth } from '../contexts/authcontext';
import { usePayment } from '../contexts/datacontext';




export default function HomeScreen() {
    const [scannedImage, setScannedImage] = useState<any>();
    const [loading, setLoading] = useState(true);
    const _service = new FirebaseImageService()
    const service = new CamImages(_service)
    const navigation = useNavigation<any>();
    const { user } = useAuth()
    const { setPayment } = usePayment()
  
  
    const save = async () => {
      try{
        setLoading(true)
        console.log('setado true')
        const response = await service.addImage(scannedImage, user?.email || "")
        setPayment(response)
        setLoading(false)
        navigation.navigate('Success')
      }catch(e){
        setLoading(false)
        navigation.navigate('Error')
        console.log(e)
      }
      
    }

    const cancel = () => {
        navigation.navigate('Init')
    }
  
    const scanDocument = async () => {
      try {
        // start the document scanner
        const { scannedImages } = await DocumentScanner.scanDocument();
  
        if (scannedImages && scannedImages.length > 0) {
          const uri = scannedImages[0]
          setScannedImage(uri);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      scanDocument()
    }, []);
  
    return (
      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : scannedImage ? (
          <>
            <Image
              source={{ uri: scannedImage }}
              style={styles.image}
              resizeMode="contain"
            />
  
            <Button
                title="coletar dados"
                titleStyle={{ fontWeight: '700' }}
                buttonStyle={{
                  backgroundColor: 'rgba(199, 43, 98, 1)',
                  borderColor: 'transparent',
                  borderWidth: 0,
                  borderRadius: 30,
                }}
                containerStyle={{
                  width: 200,
                  marginHorizontal: 50,
                  marginVertical: 20,
                }}
                onPress={() => {save()}}
            />
  
            <Button
                title="cancelar"
                titleStyle={{ fontWeight: '700' }}
                buttonStyle={{
                  backgroundColor: 'rgba(199, 43, 98, 1)',
                  borderColor: 'transparent',
                  borderWidth: 0,
                  borderRadius: 30,
                }}
                containerStyle={{
                  width: 200,
                  marginHorizontal: 50,
                  marginVertical: 5,
                }}
                onPress={cancel}
            />
            
          </>        
          
        ) : (
          <Text>No image scanned</Text>
        )}
      </View>
    );
  };
  
  