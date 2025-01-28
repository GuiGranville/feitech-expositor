import { authController } from "@/controllers/auth/auth";
import { useEffect, useState } from "react";
import { Alert, ImageBackground, Modal, StyleSheet, Text, TextInput, View } from "react-native";
import { Button } from "react-native-paper";


interface Props {
    visible: boolean
    setVisible: React.Dispatch<React.SetStateAction<boolean>>
}

export function ModalRecuperarSenha(props: Props) {

    const [email, setEmail] = useState('');
    const [tokenApi, setTokenApi] = useState('');
    const [informarToken, setInformarToken] = useState(false);
    const [informaNovaSenha, setInformaNovaSenha] = useState(false);
    const [informarEmail, setInformarEmail] = useState(true);
    const [token, setToken] = useState('');
    const [novaSenha, setNovaSenha] = useState('');
    

    useEffect(() => {
        return () => {
            setInformarToken(false)
            setInformaNovaSenha(false)
            setInformarEmail(true)
            setTokenApi('')
            setEmail('')
            setToken('')
            setNovaSenha('')
        }
    }, [props.visible])

    async function enviaEmail() {

        if(email === '') return Alert.alert('Preencha o email')
        await authController.recuperaSenha(email)
            .then((response) => {
                if (response.status === 200) {
                    setInformarEmail(false)
                    setInformarToken(true)
                    setTokenApi(response.data.messageServer.token)
                    return
                }
                if (response.status === 400) {
                    return Alert.alert('Email não cadastrado')
                }
                return Alert.alert('Ocorreu um erro ao enviar o email')

            })
            .catch((error) => console.log(error))
    }

    async function verificaToken() {
        if(tokenApi === token){
            setInformarToken(false)
            setInformaNovaSenha(true)
            return
        }
    }

    async function enviaNovaSenha(){
        if(novaSenha === '') return Alert.alert('Preencha a nova senha')
        await authController.novaSenha(email, novaSenha)
        .then((response) => {
            if(response.status === 200){
                props.setVisible(false)
                return Alert.alert('Senha alterada com sucesso')
            }
            return Alert.alert('Ocorreu um erro ao alterar a senha')
        })
        .catch((error) => console.log(error))
    }

    return (
        <Modal visible={props.visible}>
            <ImageBackground source={require('../../../assets/images/background.jpg')}>
                <View style={styles.containerPai}>
                    <Button style={{ backgroundColor: '#929292', alignItems: 'center', justifyContent: 'center', width: 100, height: 40, borderRadius: 10, marginLeft: 25, marginTop: 25 }} textColor="#fff" onPress={() => { props.setVisible(false) }}>Voltar</Button>
                    <View style={{ width: '100%', height: '90%', alignItems: 'center', justifyContent: 'center' }}>
                        {informarEmail &&  (
                            <View style={styles.containerItens}>
                                <View style={styles.containerInput}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Recuperar Senha</Text>
                                    <TextInput value={email} onChange={(e) => setEmail(e.nativeEvent.text)} keyboardType="email-address" placeholder="Digite o seu email" style={{ borderWidth: 0.5 }} />
                                </View>
                                <View style={styles.containerButton}>
                                    <Button mode="contained" style={{ width: '60%', backgroundColor: '#4adaf3', alignItems: 'center', justifyContent: 'center' }} onPress={enviaEmail}>Enviar Email</Button>
                                </View>
                            </View>
                        )} 
                        {informarToken && (
                            <View style={styles.containerItens}>
                                <View style={styles.containerInput}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Token Enviado no Email</Text>
                                    <TextInput value={token} onChange={(e) => setToken(e.nativeEvent.text)} placeholder="Insira o token" style={{ borderWidth: 0.5 }} />
                                </View>
                                <View style={styles.containerButton}>
                                    <Button mode="contained" style={{ width: '60%', backgroundColor: '#4adaf3', alignItems: 'center', justifyContent: 'center' }} onPress={verificaToken}>Confirmar</Button>
                                </View>
                            </View>
                        )}
                        {informaNovaSenha && (
                             <View style={styles.containerItens}>
                             <View style={styles.containerInput}>
                                 <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Inserir uma nova senha</Text>
                                 <TextInput value={novaSenha} onChange={(e) => setNovaSenha(e.nativeEvent.text)} placeholder="Digite a nova senha" style={{ borderWidth: 0.5 }} />
                             </View>
                             <View style={styles.containerButton}>
                                 <Button mode="contained" style={{ width: '60%', backgroundColor: '#4adaf3', alignItems: 'center', justifyContent: 'center' }} onPress={enviaNovaSenha}>Salvar Senha</Button>
                             </View>
                         </View>
                        )}

                    </View>
                </View>
            </ImageBackground>
        </Modal>
    )
}


const styles = StyleSheet.create({
    containerPai: {
        width: '100%',
        height: '100%',
    },
    containerItens: {
        width: '80%',
        height: 240,
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        justifyContent: 'center'
    },
    containerInput: {
        gap: 10,
        width: '100%',
    },
    containerButton: {
        width: '100%',
        height: 80,
        alignItems: 'center',
        justifyContent: 'center'
    }
})