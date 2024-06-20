import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../pages/home';
import LoginScreen from '../pages/login';
import InitScreen from '../pages/init';

const Stack = createStackNavigator();

export function StackRoutes() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Init" component={InitScreen} />
    </Stack.Navigator>
  );
}