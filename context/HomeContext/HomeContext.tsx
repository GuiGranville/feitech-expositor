import { Evento } from "@/constants/interfaces";
import { homeController } from "@/controllers/home/home";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect } from "react";


interface props{
    children?: React.ReactNode
}
interface HomeContextType {
    eventos: Evento[],
    setEventos: React.Dispatch<React.SetStateAction<Evento[]>>
    getEventos: () => Promise<void>
    handleTenhoInteresse: (cd_evento: number) => Promise<void>
}
export const HomeContext = React.createContext({} as HomeContextType);

export const HomeProvider = ({ children }: props) => {
    const [eventos, setEventos] = React.useState<Evento[]>([]);

    useEffect(() => {
        getEventos()
    }, [])

    async function getEventos() {
        const cdUsuario = JSON.parse(await AsyncStorage.getItem('user') as string).cd_usuario
        await homeController.getEventos(cdUsuario)
        .then((response) => {
            if(response.status !== 200) return alert('Ocorreu um erro ao buscar os eventos')
            setEventos(response.data.messageServer)
        })
        .catch((error) => {
            alert(`Ocorreu um erro ao buscar os eventos: ${error}`)
            console.log(error)
        })
    }


    async function handleTenhoInteresse(cd_evento: number) {
        await homeController.postTenhoInteresse(cd_evento, JSON.parse(await AsyncStorage.getItem('user') as string).cd_usuario)
        .then((response) => {
            for(const evento of eventos) {
                if(evento.cd_evento === cd_evento) {
                    evento.interesse = true
                }
            }
            setEventos([...eventos])  
        })
        .catch((error) => console.log(error))
    }

    return <HomeContext.Provider value={{
        eventos, setEventos,
        getEventos, handleTenhoInteresse
    }}>
        {children}
    </HomeContext.Provider>;
}