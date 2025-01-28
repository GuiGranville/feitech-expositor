import { QrCodeContext } from "@/context/QrCodeContext/QrCodeContext";
import { CameraView } from "expo-camera";
import { useContext } from "react";
import { Alert, Modal, Platform, StatusBar, StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";


interface Props {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function LerQrCode(props: Props) {

    const {LeituraQrCode} = useContext(QrCodeContext)

    return (
        <Modal visible={props.open}>
            <View style={styles.containerPai}>
                {Platform.OS === "android" ? <StatusBar hidden/> : null}
                <Button style={{ backgroundColor: '#929292', alignItems: 'center', justifyContent: 'center', width: 100, height: 40, borderRadius: 10, position: 'absolute', top: 10, left: 10, zIndex: 1 }} textColor="#fff" onPress={() => {props.setOpen(false)}}>Voltar</Button>
                <CameraView style={styles.camera} facing="back" onBarcodeScanned={({ data }) => {LeituraQrCode(data), props.setOpen(false)}}/>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    containerPai: {
        width: '100%',
        height: '100%',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
      },
      instructions: {
        fontSize: 16,
        color: '#333',
        marginTop: 10,
      },
    camera: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    }  
});