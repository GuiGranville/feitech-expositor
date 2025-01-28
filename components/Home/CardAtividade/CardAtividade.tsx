import { Evento } from "@/constants/interfaces";
import { StyleSheet, Text, View, Image } from "react-native";
import moment from "moment";
import { Button } from "react-native-paper";
import { homeController } from "@/controllers/home/home";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext } from "react";
import { HomeContext } from "@/context/HomeContext/HomeContext";



interface CardAtividadeProps {
    evento: Evento
}
export function CardAtividade(props: CardAtividadeProps) {

    const {handleTenhoInteresse} = useContext(HomeContext)

    return (
        <View style={styles.containerPai}>
            <View style={styles.containerImagem}>
                <Image source={require('../../../assets/images/feitech-image.jpg')} style={styles.imagem}/>
            </View>
            <View style={styles.containerInformacoes}>
                <Text style={styles.containerInformacoesTitulo}>
                    {props.evento.nm_evento}
                </Text>
                <Text style={styles.containerInformacoesData}>
                    Data: {moment(props.evento.dt_evento).format('DD/MM/YYYY HH:mm')}
                </Text>
                <Text style={styles.containerInformacoesLocal}>Local: {props.evento.nm_local}</Text>
                <Text style={styles.containerInformacoesDescricao}>
                    {props.evento.descricao}
                </Text>
            </View>
            <View style={styles.containerButton}>
                {props.evento.interesse ? <Button mode="contained" style={{ width: 200, height: 40, borderRadius: 10, backgroundColor: '#959899'}}>Já tenho interesse</Button> : null}
                {props.evento.interesse ? null : <Button mode="contained" style={{ width: 200, height: 40, borderRadius: 10, backgroundColor: '#4adaf3'}} onPress={() => handleTenhoInteresse(props.evento.cd_evento)}>Tenho interesse</Button>}
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    containerPai: {
        width: '100%',
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: '#ffffff',
        borderRadius: 10,
        paddingBottom: 20,
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'
    },
    containerImagem: {
        width: '100%',
        height: 200
    },
    imagem: {
        width: '100%',
        height: '100%'
    },

    containerInformacoes: {
        width: '100%',
        minHeight: 200,
    },
    containerButton: {
        width: '100%',
        height: 50 ,
        alignItems: 'center', 
    },
    containerInformacoesTitulo: {
        width: '100%',
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10
    },
    containerInformacoesData: {
        width: '100%',
    },
    containerInformacoesLocal: {
        width: '100%',
        fontWeight: 'bold'
    },
    containerInformacoesDescricao: {
        width: '100%',
    }
})