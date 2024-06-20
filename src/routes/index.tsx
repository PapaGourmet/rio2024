import {NavigationContainer} from '@react-navigation/native';
import { StackRoutes } from './stach';


export default function RoutesScreens(){
    return (
        <NavigationContainer>
            <StackRoutes />
        </NavigationContainer>
    )
}