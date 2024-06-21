import React from 'react';
import 'react-native-gesture-handler';
import RoutesScreens from './src/routes';
import { AuthProvider } from './src/contexts/authcontext';
import { DataProvider } from './src/contexts/datacontext';


export default  () => {

  return (
    <AuthProvider>
      <DataProvider>
        <RoutesScreens />
      </DataProvider>
    </AuthProvider>
  )
   
};
