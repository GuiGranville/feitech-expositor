import { interacaoController } from "@/controllers/interacao/interacao";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../Global/GlobalContext";


interface QrCodeContextType {
    LeituraQrCode: (data: string) => Promise<void>;
    interacoes: any
    setInteracoes: React.Dispatch<React.SetStateAction<any>>
}

export const QrCodeContext = React.createContext({} as QrCodeContextType);

export function QrCodeProvider({ children }: any) {

    const [interacoes, setInteracoes] = React.useState<any>([]);
    const {tpUsuario} = useContext(GlobalContext);

    useEffect(() => {
        getInteracoes()
    }, [])

    async function getInteracoes() {
        const qrCodes = await AsyncStorage.getItem('@qrCode');
        if (qrCodes === null) {
            const cd_usuario = JSON.parse(await AsyncStorage.getItem('user') as string).cd_usuario
            if(tpUsuario !== 'A'){
                await interacaoController.getInteracoes(cd_usuario).then((response) => {
                    setInteracoes(response.data.messageServer)
                    AsyncStorage.setItem('@qrCode', JSON.stringify(response.data.messageServer))
                })
                return
            } 
            await interacaoController.getCheckin(cd_usuario).then((response) => {
                
                setInteracoes(response.data.messageServer)
                AsyncStorage.setItem('@qrCode', JSON.stringify(response.data.messageServer))
            })
            return
        }
        setInteracoes(JSON.parse(qrCodes!))
    }

    async function LeituraQrCode(data: string) {
        try {
            const parsedData = JSON.parse(data);
            const updatedInteracoes = [parsedData, ...interacoes];
            setInteracoes(updatedInteracoes);

            const qrCodes = await AsyncStorage.getItem('@qrCode');
            if (qrCodes === null) {
                await AsyncStorage.setItem('@qrCode', JSON.stringify(updatedInteracoes));
            } else {
                const array = JSON.parse(qrCodes);
                array.unshift(parsedData);
                await AsyncStorage.setItem('@qrCode', JSON.stringify(array));
            }

            const usuarioLogado = await AsyncStorage.getItem('user');
            const interacao = {
                cd_usuario_leu: JSON.parse(usuarioLogado!).cd_usuario,
                cd_usuario_lido: parsedData.cd_usuario
            }

            if(tpUsuario !== 'A') {
                await interacaoController.createInteracao(interacao)
                return
            }
            await interacaoController.registerCheckin(interacao)

            
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <QrCodeContext.Provider value={{
            LeituraQrCode,
            interacoes,
            setInteracoes
        }}>
            {children}
        </QrCodeContext.Provider>
    )
}