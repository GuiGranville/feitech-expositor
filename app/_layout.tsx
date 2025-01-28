import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { createStackNavigator } from '@react-navigation/stack';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { NavigationContainer } from '@react-navigation/native';
import { useColorScheme } from '@/hooks/useColorScheme';
import TabNavigator from './tab';
import { GlobalProvider } from '@/context/Global/GlobalContext';
import { Login } from './Login';
import { Register } from './Register';


export type StackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
  tab: { logado: boolean; setLogado: (value: boolean) => void };
};

SplashScreen.preventAutoHideAsync();
const Stack = createStackNavigator<StackParamList>();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [logado, setLogado] = useState(false);
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={DefaultTheme}>
      <GlobalProvider>
        {logado ? (
          <Stack.Navigator>
            <Stack.Screen name="tab" options={{ headerShown: false }} component={() => <TabNavigator logado={logado} setLogado={setLogado}/>} />
          </Stack.Navigator>
        ) : (
          <Stack.Navigator>
            <Stack.Screen name="Login" options={{ headerShown: false }} initialParams={{ logado, setLogado }} component={() => <Login />} />
            <Stack.Screen name="Register" options={{ headerShown: false }} component={() => <Register />} />
          </Stack.Navigator>
        )}

      </GlobalProvider>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
