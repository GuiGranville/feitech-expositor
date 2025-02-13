import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect } from "react";


interface GlobalContextType{
    logado: boolean 
    setLogado: React.Dispatch<React.SetStateAction<boolean>>
    tpUsuario: string
}

export const GlobalContext = React.createContext({} as GlobalContextType);

export function GlobalProvider({ children }: any) {

    const [logado, setLogado] = React.useState(false);
    const [tpUsuario, setTpUsuario] = React.useState('');

    useEffect(() => {
        getTpUsuario();
    }, [])

    async function getTpUsuario() {
        setTpUsuario(JSON.parse(await AsyncStorage.getItem('user') as string).tp_usuario);
    }
    return <GlobalContext.Provider value={{
        logado, setLogado,
        tpUsuario
    }}>{children}</GlobalContext.Provider>;
}