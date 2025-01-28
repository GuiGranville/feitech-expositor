import { CreateUsuarioRequest } from "@/constants/interfaces";
import React from "react";
import { ImageBackground, ScrollView, StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { Button, Checkbox } from "react-native-paper";
import RNPickerSelect from 'react-native-picker-select'
import { TextInputMask } from 'react-native-masked-text';
import { usuarioController } from "@/controllers/usuario/usuario";
import { useNavigation } from "expo-router";
import { StackNavigationProp } from "@react-navigation/stack";
import { StackParamList } from "./_layout";


type NavigationProps = StackNavigationProp<StackParamList>;
export function Register() {

    const [checked, setChecked] = React.useState(false);
    const navigate = useNavigation<NavigationProps>();
    const [usuarioForm, setUsuarioForm] = React.useState({} as CreateUsuarioRequest);

    const generos = [
        { label: 'Masculino', value: 1 },
        { label: 'Feminino', value: 2 },
        { label: 'Outro', value: 3 },
    ]

    async function handleRegister() {
        await usuarioController.registrarUsuario(usuarioForm)
        .then((response) => {
            if(response.status === 201) {
                alert(`${response.data.message}. Rediredirecionando ao login !`)
                setTimeout(() => {
                    navigate.navigate('Login')
                }, 2000);

            }
            if(response.status === 400) {
                return alert("Usuário já cadastrado")
            }
        })
        .catch((error) => {
            console.log(error)
            alert(`Ocorreu um erro ao registrar o usuário`)
        })
    }

    return (
        <ImageBackground source={require('../assets/images/background.jpg')}>
            <ScrollView>
            <View style={styles.containerPaiRegister}>
                
                    <View style={styles.containerInputs}>
                        <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Preencha os campos a baixo</Text>
                        <View style={styles.containerInputsInput}>
                            <Text>Nome Completo</Text>
                            <TextInput style={styles.inputStyle} placeholder="Digite seu nome completo" onChange={(e) => {setUsuarioForm({...usuarioForm, nm_usuario: e.nativeEvent.text})}}/>
                        </View>
                        <View style={styles.containerInputsInput}>
                            <Text>CPF ou CNPJ</Text>
                            <TextInputMask type="cpf" value={usuarioForm.cpf_cnpj} style={styles.inputStyle} placeholder="Digite seu CPF ou CNPJ" onChange={(e) => {setUsuarioForm({...usuarioForm, cpf_cnpj: e.nativeEvent.text})}}/>
                        </View>
                        <View style={styles.containerInputsInput}>
                            <Text>Genêro</Text>
                            <View style={styles.inputSelect}>
                                <RNPickerSelect placeholder={{ label: 'Selecione uma opção', value: null }} style={{ placeholder: { color: '#aaaaaa' } }} items={generos} onValueChange={(e) => {setUsuarioForm({...usuarioForm, cd_genero: e})}}/>
                            </View>
                            
                        </View>
                        <View style={styles.containerInputsInput}>
                            <Text>Telefone</Text>
                            <TextInputMask type="cel-phone" value={usuarioForm.telefone} style={styles.inputStyle} placeholder="Digite seu telefone" onChange={(e) => {setUsuarioForm({...usuarioForm, telefone: e.nativeEvent.text})}}/>
                        </View>
                        <View style={styles.containerInputsInput}>
                            <Text>Email</Text>
                            <TextInput keyboardType="email-address" style={styles.inputStyle} placeholder="Digite seu email" onChange={(e) => {setUsuarioForm({...usuarioForm, email: e.nativeEvent.text})}}/>
                        </View>
                        <View style={styles.containerInputsInput}>
                            <Text>Senha</Text>
                            <TextInput secureTextEntry style={styles.inputStyle} placeholder="Digite sua senha" onChange={(e) => {setUsuarioForm({...usuarioForm, senha: e.nativeEvent.text})}}/>
                        </View>
                        <View style={styles.containerInputsInput}>
                            <Text>Escola ou Empresa</Text>
                            <TextInput style={styles.inputStyle} placeholder="Digite sua escola ou empresa" onChange={(e) => {setUsuarioForm({...usuarioForm, empresa_escola: e.nativeEvent.text})}}/>
                        </View>
                        <View style={styles.containerInputsInput}>
                            <Text>Função ou Cargo</Text>
                            <TextInput style={styles.inputStyle} placeholder="Digite sua função ou cargo" onChange={(e) => {setUsuarioForm({...usuarioForm, funcao_cargo: e.nativeEvent.text})}}/>
                        </View>
                        <View style={styles.containerInputsInput}>
                            <Text>Data de Nascimento</Text>
                            <TextInputMask type="datetime" value={usuarioForm.data_nascimento} style={styles.inputStyle} placeholder="Digite sua data de nascimento" onChange={(e) => {setUsuarioForm({...usuarioForm, data_nascimento: e.nativeEvent.text})}}/>
                        </View>
                        <View style={styles.containerInputsInput}>
                            <Text>Idade</Text>
                            <TextInput keyboardType="numeric" style={styles.inputStyle} placeholder="Digite sua idade" onChange={(e) => {setUsuarioForm({...usuarioForm, idade: Number(e.nativeEvent.text)})}}/>
                        </View>
                        <View style={[styles.containerInputsInput, { flexDirection: 'row', alignItems: 'center' }]}>
                            <Checkbox status={checked ? 'checked' : 'unchecked'} onPress={() => setChecked(!checked)} color="#4adaf3"/>
                            <Text style={{ flexWrap: 'wrap'}}>Concordo com os termos de uso</Text>
                        </View>
                        <View style={styles.containerInputsInput}>
                            <Button style={{ backgroundColor: '#4adaf3', width: '100%', height: 40, borderRadius: 10 }} 
                            textColor="#fff" onPress={() => {handleRegister()}}>Cadastrar</Button>
                        </View>
                    </View>
               
            </View>
            </ScrollView>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    containerPaiRegister :{
        width: '100%',
        height: '100%',
        padding: 10,
        paddingTop: 70,
    },
    containerInputs: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
        padding: 10,
        gap: 15,
        borderRadius: 15
    },
    containerInputsInput: {
        width: '100%',
        gap: 5
    },
    inputStyle: {
        width: '100%',
        height: 45,
        backgroundColor: '#fff',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#cdcdcd',
        paddingLeft: 10
    },
    inputSelect:{
        width: '100%',
        height: 45,
        backgroundColor: '#fff',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#cdcdcd',
        justifyContent: 'center'
    }
})