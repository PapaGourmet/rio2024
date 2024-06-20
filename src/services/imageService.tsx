import { CamImages, ICamImages } from "../interfaces/interfaces";
import axios, { AxiosError } from 'axios';
import RNFS from 'react-native-fs';
async function uriToBase64(uri: string): Promise<string> {
  try {
    // Lê o arquivo na URI como base64
    const base64Data = await RNFS.readFile(uri, 'base64');
    
    return base64Data;
  } catch (error) {
    console.error('Erro ao converter URI para Blob:', error);
    throw error;
  }
}

async function uploadBase64Image(base64String: string): Promise<void> {
  try {
    // Envia os dados base64 para o serviço
    const response = await axios.post('https://firebase-upload-image-storage-fczdesenvolvime.replit.app/upload', {
      base64: base64String,
    });

    console.log('Resposta do servidor:', response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // O erro é do Axios
      console.error('Erro ao fazer upload da imagem:', error.message);
      console.error('Erro do Axios:', error.response?.data);
    } else if (error instanceof Error) {
      // O erro é uma instância genérica de Error
      console.error('Erro genérico:', error.message);
    } else {
      // Outro tipo de erro
      console.error('Erro desconhecido:', error);
    }
  }
}


export class FirebaseImageService implements ICamImages {
    async addImage(uri: string): Promise<string> {

      try {
        const response  = await uriToBase64(uri)
        await uploadBase64Image(response)
        
        return response;
      } catch (error) {
        console.error('Erro ao fazer upload da imagem: ', error);
        throw error;
      }
    }    
}