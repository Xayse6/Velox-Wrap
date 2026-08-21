import type {
    Usuario,
    DadosUsuario,
    DadosEditarUsuario,
} from "../../perfil/types/user";

import api from "../../../service/api";


export async function getUsuarios(): Promise<Usuario[]> {

    const response = await api.get("/usuarios");

    return response.data;
}



export async function buscarUsuario(
    id:string
): Promise<Usuario>{

    const response = await api.get(
        `/usuarios/${id}`
    );

    return response.data;
}



export async function inserirUsuario(
    dados:DadosUsuario
): Promise<Usuario>{

    const response = await api.post(
        "/usuarios",
        dados
    );

    return response.data;
}



export async function editarUsuario(
    id:string,
    dados:DadosEditarUsuario
): Promise<Usuario>{

    const response = await api.put(
        `/usuarios/${id}`,
        dados
    );

    return response.data;
}



export async function deleteUsuario(
    id:number
): Promise<void>{

    await api.delete(
        `/usuarios/${id}`
    );

}