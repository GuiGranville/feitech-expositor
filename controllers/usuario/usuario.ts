import { CreateUsuarioRequest } from "@/constants/interfaces";
import { api } from "@/services/api";
import { makeRequest } from "@/utils/makeRequest";



class UsuarioController {

    async registrarUsuario(usuario: CreateUsuarioRequest) {
        const response = await makeRequest({
            method: 'POST',
            url: `${api}/usuario/create`,
            data: {
               usuario
            }
        })
        return response
    }
}


export const usuarioController = new UsuarioController();