import LerQrCode from "@/components/QrCode/LerQrCode/LerQrCode";
import React, { useContext, useEffect } from "react";
import {  StyleSheet, Text, View } from "react-native";
import {Button } from "react-native-paper"
import QRCode from 'react-native-qrcode-svg';
import {useCameraPermissions} from "expo-camera"
import AsyncStorage from "@react-native-async-storage/async-storage";
import { QrCodeContext } from "@/context/QrCodeContext/QrCodeContext";

export function QrCode() {
    const [open, setOpen] = React.useState(false);

    const {setInteracoes} = useContext(QrCodeContext);
    const [permissions, requestPermission] = useCameraPermissions();
    const [usuarioInfos, setUsuarioInfos] = React.useState({} as { cd_usuario: number, nm_usuario: string, email: string, telefone: string, empresa_escola: string, funcao_cargo: string });

    async function storage() {
        const user = await AsyncStorage.getItem('user');
        setUsuarioInfos({
            cd_usuario: JSON.parse(user!).cd_usuario,
            nm_usuario: JSON.parse(user!).nm_usuario,
            email: JSON.parse(user!).email,
            telefone: JSON.parse(user!).telefone,
            empresa_escola: JSON.parse(user!).empresa_escola,
            funcao_cargo: JSON.parse(user!).funcao_cargo
        })
    }
    useEffect(() => {
        storage()
    }, [])


    const jsonString = JSON.stringify(usuarioInfos);
    return (
        <View style={styles.containerPai}>
            <View style={styles.containerHeader}>
                <Button style={{ backgroundColor: '#4adaf3', alignItems: 'center', justifyContent: 'center', width: 150, height: 40, borderRadius: 10 }} textColor="#fff" onPress={() => {requestPermission(), setOpen(true)}}>Ler Qr Code</Button>
            </View>
            <View style={styles.containerQrCode}>
                <QRCode
                    value={jsonString}
                    size={250}
                    color="black"
                    backgroundColor="white"
                />
            </View>
            <View style={styles.containerInfos}>
                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Dados que aparecem no QR Code:</Text>
                <View style={styles.containerInfos}>
                    <Text>Nome: {usuarioInfos.nm_usuario}</Text>
                    <Text>Email: {usuarioInfos.email}</Text>
                    <Text>Telefone: {usuarioInfos.telefone}</Text>
                </View>
            </View>
            <LerQrCode open={open} setOpen={setOpen}/>
        </View>
    );
}

const styles = StyleSheet.create({
    containerPai: {
        width: '100%',
        height: '100%',
        padding: 25,
        gap: 20
    },
    containerHeader: {
        width: '100%',
        height: 50,
        justifyContent: 'flex-end',
        display: 'flex',
        flexDirection: 'row',

    },
    containerQrCode: {
        alignItems: 'center',
        width: '100%',
    },
    containerInfos: {
        width: '100%',
        gap: 5
    }
});