

export interface Evento {
    cd_evento: number,
    descricao: string,
    imagem: string,
    link_evento: string,
    dt_evento: string,
    cd_local: number,
    encerrado: string,
    nm_evento: string,
    nm_local: string,
	interesse?: boolean,
}

export interface CreateUsuarioRequest {
    nm_usuario: string,
    cpf_cnpj: string,
    email: string,
	senha: string ,
	tp_usuario: string,
	razao_social: string ,
	inscricao_estadual: string,
	telefone: string,
	endereco: string ,
	nm_responsavel: string ,
	cpf_responsavel: string,
	foto: string,
	funcao_cargo: string,
	idade: number,
	data_nascimento: string,
	empresa_escola: string ,
	qr_code: string,
	cd_genero: number,
	dt_criado: string, 
}


export interface CreateInteracaoRequest{
	cd_usuario_leu: number,
	cd_usuario_lido: number,
}
