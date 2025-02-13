import { StackNavigationProp } from '@react-navigation/stack';
import { authController } from "@/controllers/auth/auth";
import React, { useEffect, useState } from "react";
import { Button, Image, ImageBackground, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, View } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from "@react-navigation/native";
import { StackParamList } from './_layout';
import { ModalRecuperarSenha } from '@/components/Login/ModalRecuperarSenha/ModalRecuperarSenha';

type NavigationProps = StackNavigationProp<StackParamList>;

export function Login() {

    const route = useRoute();
    const navigate = useNavigation<NavigationProps>();
    const { logado, setLogado } = route.params as { logado: boolean, setLogado: React.Dispatch<React.SetStateAction<boolean>> };
    const [errorLogin, setErrorLogin] = useState(false)
    const [modalRecuperarSenha, setModalRecuperarSenha] = useState(false)
    const [inputs, setInputs] = useState({
        email: '',
        senha: ''
    })

    useEffect(() => {
        async function verificaLogin() {
            await AsyncStorage.getItem('user')
                .then(async (user) => {
                    if (user) {
                        setLogado(true)
                    }
                })
        }
        verificaLogin()
    }, [])

    async function Login() {
        const response = await authController.login(inputs.email, inputs.senha)
       
        if (response.status === 400) {
            setErrorLogin(true)
        }
        if (response.status === 200) {
            setErrorLogin(false)
            setLogado(true)
            await AsyncStorage.setItem('user', JSON.stringify(response.data.messageServer.userInformation))
            await AsyncStorage.setItem('token', JSON.stringify(response.data.messageServer.token))
            if(response.data.messageServer.userInformation.tp_usuario === "A"){
                alert("Acesso de Administrador")
            }
        }
    }

    function register() {
        navigate.navigate('Register')
    }
    return (
        <ImageBackground source={require('../assets/images/background.jpg')}>

            <View style={styles.containerPai}>
                <View style={styles.containerImgFeitech}>
                    <Image source={require('../assets/images/logo-login.png')} style={{ width: '100%', height: '50%' }} />
                </View>
                <View style={styles.containerLogin}>
                    <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center', borderBottomWidth: 1, height: 50 }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Bem Vindo Expositor</Text>
                    </View>
                    <View style={styles.containerLoginInputs}>
                        <View style={styles.containerLoginInputsInput}>
                            <Text>Email</Text>
                            <KeyboardAvoidingView behavior='position'>
                                <TextInput keyboardType='email-address' style={styles.input} onChange={(e) => setInputs({ ...inputs, email: e.nativeEvent.text })} />
                            </KeyboardAvoidingView>
                        </View>
                        <View style={styles.containerLoginInputsInput}>
                            <Text>Senha</Text>
                            <KeyboardAvoidingView behavior='position'>
                                <TextInput style={styles.input} secureTextEntry onChange={(e) => setInputs({ ...inputs, senha: e.nativeEvent.text })} />
                            </KeyboardAvoidingView>
                            {errorLogin && <Text style={{ color: 'red', marginTop: 5 }}>Email ou senha incorretos</Text>}
                        </View>
                    </View>
                    <View style={styles.containerButtons}>
                        <Text style={{ color: '#00a896', width: '60%' }} onPress={() => setModalRecuperarSenha(true)}>Esqueci minha senha</Text>
                        <View style={styles.containerButtonsButton}>
                            <Button title="Entrar" color={'#4adaf3'} onPress={() => Login()} />
                        </View>
                    </View>
                </View>
                <ModalRecuperarSenha visible={modalRecuperarSenha} setVisible={setModalRecuperarSenha} />
            </View>

        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    containerPai: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    containerLogin: {
        width: '80%',
        height: '50%',
        backgroundColor: '#fff',
        borderRadius: 10
    },
    containerImgFeitech: {
        width: '80%',
        height: '25%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    containerLoginInputs: {
        width: '100%',
        height: '45%',
        gap: 20,
        paddingTop: 20,
        paddingLeft: 20
    },
    containerLoginInputsInput: {
        width: '100%',
        justifyContent: 'center'
    },
    input: {
        borderWidth: 1,
        borderColor: '#aaaaaa',
        width: '93%',
        borderRadius: 5
    },
    containerButtons: {
        width: '100%',
        height: '45%',
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 20
    },
    containerButtonsButton: {
        width: '100%',
        height: '60%',
        gap: 10,
        justifyContent: 'flex-end'
    }
})