export interface Usuario {
    id_Usuario: number;
    nome_Usuario: string;
    cpf_Usuario: string;
    email_Usuario: string;
    senha_Usuario?: string;
}

export interface DadosUsuario {
    nome_Usuario: string;
    cpf_Usuario: string;
    email_Usuario: string;
    senha_Usuario: string;
}

export interface DadosEditarUsuario {
    nome_Usuario: string;
    cpf_Usuario: string;
    email_Usuario: string;
    senha_Usuario?: string;
}