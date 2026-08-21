import api from "../../../service/api";

import type { Usuario } from "../../perfil/types/user";

import type {
    Veiculo,
    DadosVeiculo
} from "../types/veiculo";



// ============================================================
// USUÁRIOS
// ============================================================

export async function getUsuarios(): Promise<Usuario[]> {

    const response = await api.get("/usuarios");

    return response.data;

}



// ============================================================
// MODELOS
// ============================================================

export async function getModelos() {

    const response = await api.get("/modelos");

    return response.data;

}



// ============================================================
// LISTAR VEÍCULOS
// ============================================================

export async function getVeiculos(): Promise<Veiculo[]> {

    const response = await api.get("/veiculos");

    return response.data;

}



// ============================================================
// BUSCAR VEÍCULO POR ID
// ============================================================

export async function buscarVeiculo(
    id: string
): Promise<Veiculo> {


    const response = await api.get(
        `/veiculos/${id}`
    );


    return response.data;

}



// ============================================================
// CADASTRAR VEÍCULO
// ============================================================

export async function inserirVeiculo(
    dados: DadosVeiculo
) {


    const response = await api.post(
        "/veiculos",
        dados
    );


    return response.data;

}



// ============================================================
// EDITAR VEÍCULO
// ============================================================

export async function editarVeiculo(
    id: string,
    dados: DadosVeiculo
) {


    const response = await api.put(
        `/veiculos/${id}`,
        dados
    );


    return response.data;

}



// ============================================================
// EXCLUIR VEÍCULO
// ============================================================

export async function deleteVeiculo(
    id_Veiculo: number
) {


    const response = await api.delete(
        `/veiculos/${id_Veiculo}`
    );


    return response.data;

}