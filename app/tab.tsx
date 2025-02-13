import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeProvider } from '@/context/HomeContext/HomeContext';
import { Ionicons } from '@expo/vector-icons';
import { QrCode } from './QrCode';
import { Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { QrCodeProvider } from '@/context/QrCodeContext/QrCodeContext';
import { Interacoes } from './Interacaoes';
import { useContext } from 'react';
import { GlobalContext } from '@/context/Global/GlobalContext';

const Tab = createBottomTabNavigator();

interface props {
    logado: boolean
    setLogado: React.Dispatch<React.SetStateAction<boolean>>
}

function TabNavigator(props: props) {

    const {tpUsuario} = useContext(GlobalContext);
    
    async function logout() {
        await AsyncStorage.removeItem('user')
        await AsyncStorage.removeItem('token')
        await AsyncStorage.removeItem('@qrCode')
        props.setLogado(false)
    }
    return (
        <QrCodeProvider>
        <Tab.Navigator initialRouteName={ tpUsuario === 'A' ? 'Lista Checkin' : 'Interações'}>
            <Tab.Screen name={ tpUsuario === 'A' ? "Lista Checkin" : "Interações"} component={() => <Interacoes />}
                options={{ tabBarIcon: ({ color, size }) => (<Ionicons name="book-outline" color={color} size={size} />), headerRight: () => (
                    <Button 
                    style={{ backgroundColor: '#929292', alignItems: 'center', justifyContent: 'center', width: 40, height: 40, borderRadius: 5, marginRight: 15 }} 
                    textColor="#fff" onPress={() => {logout()}}>
                        Sair
                    </Button>
                )}}
            /> 

            <Tab.Screen name={tpUsuario === 'A' ? "Realizar Checkin" : "Qr Code"} component={() =><QrCode />}
                options={{ tabBarIcon: ({ color, size }) => (<Ionicons name="qr-code-outline" color={color} size={size} />),  headerRight: () => (
                    <Button 
                    style={{ backgroundColor: '#929292', alignItems: 'center', justifyContent: 'center', width: 40, height: 40, borderRadius: 5, marginRight: 15 }} 
                    textColor="#fff" onPress={() => {logout()}}>
                        Sair
                    </Button>
                ), }} />
               
        </Tab.Navigator>
        </QrCodeProvider>
    )
}

export default TabNavigator;