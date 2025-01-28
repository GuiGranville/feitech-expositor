import { api } from "@/services/api";
import { makeRequest } from "@/utils/makeRequest";


class AuthController{
    async login(email: string, senha: string){
        const response = await makeRequest({
            method: 'POST',
            url: `${api}/auth/loginExpositor`,
            data: {
                email,
                senha
            }
        })
        return response
    }


    async recuperaSenha(email:string){
        const response = await makeRequest({
            method: 'POST',
            url: `${api}/auth/recuperarSenha`,
            data: {
                email
            }
        })
        return response
    }

    async novaSenha(email: string, senha: string){
        const response = await makeRequest({
            method: 'POST',
            url: `${api}/auth/novaSenha`,
            data: {
                email,
                senha
            }
        })
        return response
    }
}

export const authController = new AuthController();