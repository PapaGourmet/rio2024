import { ICamImages, IPayData } from "../interfaces/interfaces";
import axios from 'axios';
import RNFS from 'react-native-fs';
import { useAuth } from "../contexts/authcontext";
const _base= 'https://firebase-upload-image-storage-fczdesenvolvime.replit.app'


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

async function uploadBase64Image(base64String: string): Promise<any> {
  try {
    // Envia os dados base64 para o serviço
    const response = await axios.post(`${_base}/upload`, {
      base64: base64String,
    });

    const { filename } = response.data

    return filename;

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

async function getDataPay(image_url: string): Promise<any> {
  try {
    // Envia os dados base64 para o serviço
    const response = await axios.post('https://rio-2024.replit.app/url', {
      image_url
    });

    
    return response.data;

  } catch (error) {
    if (axios.isAxiosError(error)) {
      // O erro é do Axios
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

async function saveDataPay(data: IPayData): Promise<any> {
  try {
    

    const response = await axios.post(`${_base}/save-payment`, {
      data
    });

    
    return response.data;

  } catch (error) {
    if (axios.isAxiosError(error)) {
      // O erro é do Axios
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
    async addImage(uri: string, email: string): Promise<string | undefined> {

      try {
        const base64  = await uriToBase64(uri)
        const response = await uploadBase64Image(base64)

        const base = 'https://firebasestorage.googleapis.com/v0/b/rio2024-3faa5.appspot.com/o'
        const url = `${base}/${response}?alt=media`

        console.log(url)

        const resp = await getDataPay(url)
        const {CNPJ, TOTAL} = resp

        console.log(CNPJ, TOTAL)

        const payData: IPayData = {
          cnpj: CNPJ,
          valor: TOTAL,
          usuario: email
        }

        const respPaydata = await saveDataPay(payData)
        console.log(respPaydata)
        
        return response;
      } catch (error) {
        console.error('Erro ao fazer upload da imagem: ', error);
        throw error;
      }
    }    
}