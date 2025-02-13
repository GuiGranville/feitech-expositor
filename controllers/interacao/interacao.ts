import { CreateInteracaoRequest } from "@/constants/interfaces";
import { api } from "@/services/api";
import { makeRequest } from "@/utils/makeRequest";



class InteracaoController {
    async createInteracao(interacao: CreateInteracaoRequest){
        const response = await makeRequest({
            method: 'POST',
            url: `${api}/interacao/create`,
            data: {
                cd_usuario_leu: interacao.cd_usuario_leu,
                cd_usuario_lido: interacao.cd_usuario_lido
            }

        })

        return response
    }
    async getInteracoes(cd_usuario: number){
        const response = await makeRequest({
            method: 'GET',
            url: `${api}/interacao/list?cd_usuario=${cd_usuario}`
        })
        return response
    }

    async registerCheckin(interacao: CreateInteracaoRequest){
        const response = await makeRequest({
            method: 'POST',
            url: `${api}/interacao/checkin`,
            data: {
                cd_usuario_leu: interacao.cd_usuario_leu,
                cd_usuario_lido: interacao.cd_usuario_lido
            }
        })
        return response
    }

    async getCheckin(cd_usuario: number){
        const response = await makeRequest({
            method: 'GET',
            url: `${api}/interacao/getAllCheckin?cd_usuario=${cd_usuario}`
        })
        return response
    }
}

export const interacaoController = new InteracaoController();