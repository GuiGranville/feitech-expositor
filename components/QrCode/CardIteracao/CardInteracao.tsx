import { StyleSheet, Text, View, Pressable } from "react-native";



interface Props {
    interacao: {
        nm_usuario: string,
        email: string,
        telefone: string,
        funcao_cargo: string,
        empresa_escola: string,
    }
    onPressFuncion?: () => void
}

export function CardInteracao(props: Props) {

    return (
        <Pressable onPress={props.onPressFuncion}>
            <View style={styles.containerPai}>
                <View style={styles.containerInfos}>
                    <View style={styles.containerCadaInfo}>
                        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Nome:</Text>
                        <Text style={{ fontWeight: 'bold', fontSize: 16, flexWrap: 'wrap' }}>{props.interacao.nm_usuario}</Text>
                    </View>
                    <View style={styles.containerCadaInfo}>
                        <Text>Contato:</Text>
                        <Text>{props.interacao.telefone}</Text>
                    </View>
                    <View style={styles.containerCadaInfo}>
                        <Text>Email:</Text>
                        <Text>{props.interacao.email}</Text>
                    </View>
                    <View style={styles.containerCadaInfo}>
                        <Text>Empresa ou Escola:</Text>
                        <Text>{props.interacao.empresa_escola}</Text>
                    </View>
                    <View style={styles.containerCadaInfo}>
                        <Text>Função ou Cargo:</Text>
                        <Text style={{ flexWrap: 'wrap' }}>{props.interacao.funcao_cargo}</Text>
                    </View>
                </View>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    containerPai: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10
    },
    containerInfos: {
        width: '100%',
        height: '100%',
        gap: 7
    },
    containerCadaInfo: {
        width: '100%',
        flexDirection: 'row',
        gap: 5,
        alignItems: 'center'
    }
})