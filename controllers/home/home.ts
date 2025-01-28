import { api } from "@/services/api";
import { makeRequest } from "@/utils/makeRequest";


class HomeController {
    async getEventos(cd_usuario: number){
        const response = await makeRequest({
            method: 'GET',
            url: `${api}/evento/list?cd_usuario=${cd_usuario}`
        })

        return response
    }

    async postTenhoInteresse(cd_evento: number, cd_usuario: number){
        const response = await makeRequest({
            method: 'POST',
            url: `${api}/evento/interesse`,
            data: {
                cd_evento,
                cd_usuario
            }
        })

        return response
    }
}


export const homeController = new HomeController();