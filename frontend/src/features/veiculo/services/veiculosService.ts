const API_URL = "http://localhost:3000/api";

import type { Usuario } from "../../usuario/types/user";
import type { Modelo } from "../../modelo/types/modelo";
import type {
    Veiculo,
    DadosVeiculo,
} from "../types/veiculo";


// ============================================================
// USUÁRIOS
// ============================================================

export async function getUsuarios(): Promise<Usuario[]> {

    const response = await fetch(
        `${API_URL}/usuarios`
    );

    const dados = await response.json();

    if (!response.ok) {
        throw new Error(
            dados.mensagem || "Erro ao buscar usuários"
        );
    }

    return dados;
}


// ============================================================
// MODELOS
// ============================================================

export async function getModelos(): Promise<Modelo[]> {

    const response = await fetch(
        `${API_URL}/modelos`
    );

    const dados = await response.json();

    if (!response.ok) {
        throw new Error(
            dados.mensagem || "Erro ao buscar modelos"
        );
    }

    return dados;
}


// ============================================================
// LISTAR VEÍCULOS
// ============================================================

export async function getVeiculos(): Promise<Veiculo[]> {

    const response = await fetch(
        `${API_URL}/veiculos`
    );

    const dados = await response.json();

    if (!response.ok) {
        throw new Error(
            dados.mensagem || "Erro ao buscar veículos"
        );
    }

    return dados;
}


// ============================================================
// BUSCAR VEÍCULO
// ============================================================

export async function buscarVeiculo(
    id: string
): Promise<Veiculo> {

    const response = await fetch(
        `${API_URL}/veiculos/${id}`
    );

    const dados = await response.json();

    if (!response.ok) {
        throw new Error(
            dados.mensagem || "Erro ao buscar veículo"
        );
    }

    return dados;
}


// ============================================================
// CADASTRAR VEÍCULO
// ============================================================

export async function inserirVeiculo(
    veiculo: DadosVeiculo
): Promise<Veiculo> {

    const response = await fetch(
        `${API_URL}/veiculos`,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify(veiculo),
        }
    );

    const dados = await response.json();

    if (!response.ok) {
        throw new Error(
            dados.mensagem ||
            "Erro ao cadastrar veículo"
        );
    }

    return dados;
}


// ============================================================
// EDITAR VEÍCULO
// ============================================================

export async function editarVeiculo(
    id: string,
    veiculo: DadosVeiculo
): Promise<Veiculo> {

    const response = await fetch(
        `${API_URL}/veiculos/${id}`,
        {
            method: "PUT",

            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify(veiculo),
        }
    );

    const dados = await response.json();

    if (!response.ok) {
        throw new Error(
            dados.mensagem ||
            "Erro ao atualizar veículo"
        );
    }

    return dados;
}


// ============================================================
// EXCLUIR VEÍCULO
// ============================================================

export async function deleteVeiculo(
    id_Veiculo: number
) {

    const response = await fetch(
        `${API_URL}/veiculos/${id_Veiculo}`,
        {
            method: "DELETE",
        }
    );

    const dados = await response.json();

    if (!response.ok) {
        throw new Error(
            dados.mensagem ||
            "Erro ao excluir veículo"
        );
    }

    return dados;
}