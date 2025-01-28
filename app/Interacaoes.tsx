import { CardInteracao } from "@/components/QrCode/CardIteracao/CardInteracao";
import { QrCodeContext } from "@/context/QrCodeContext/QrCodeContext";
import { useContext } from "react";
import { Alert, ImageBackground, PermissionsAndroid, Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import * as Contacts from 'expo-contacts';


export function Interacoes() {

    const { interacoes } = useContext(QrCodeContext);

    const writeContact = async (interacao: any) => {
        console.log(interacao)
        const { status } = await Contacts.requestPermissionsAsync();
        if (status === 'granted') {
            try {

                const contact = {
                    [Contacts.Fields.FirstName]: interacao.nm_usuario,
                    [Contacts.Fields.PhoneNumbers]: [{ number: interacao.telefone }],
                    [Contacts.Fields.Emails]: [{ email: interacao.email }],
                    [Contacts.Fields.JobTitle]: interacao.funcao_cargo,
                    [Contacts.Fields.Company]: interacao.empresa_escola
                }
                const contatoId = await Contacts.addContactAsync(contact as any);

                if(contatoId) {
                    Alert.alert("Sucesso", "Contato salvo com sucesso")
                }else {
                    Alert.alert("Ocorreu um erro", "Ocorreu um erro ")
                }

            } catch (e) {
                console.log(e)
                Alert.alert("Ocorreu um erro", "Ocorreu um erro ")
            }
        }else {
            Alert.alert("Permissão Negada", "Acesso para os contatos foi negado")
        }
    };

    const showAlert = (interacao: any) => {
        Alert.alert(
            "Contato",
            "Deseja salvar esse contato na sua agenda ?",
            [
                {
                    text: "Não",
                    onPress: () => console.log("Action cancelled"),
                    style: "cancel",
                },
                {
                    text: "Sim",
                    onPress: () => writeContact(interacao),
                },
            ]
        );
    };
    return (
        <ImageBackground source={require('../assets/images/background.jpg')} >
            <View style={styles.containerPai}>

                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    {interacoes.length === 0 &&
                        <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#ffffff' }}>Não há interações</Text>
                    }
                    {interacoes.map((interacao: any, index: number) => (
                        <View style={styles.containerCard}>
                            <CardInteracao key={index + 1} interacao={interacao} onPressFuncion={() => { showAlert(interacao) }} />
                        </View>
                    ))}

                </ScrollView>


            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    containerPai: {
        width: '100%',
        height: '100%',
    },
    scrollContainer: {
        padding: 16,
        alignItems: 'center',
        gap: 13,
        width: '100%',
    },
    containerCard: {
        width: '100%',
        height: 170,
    }
})