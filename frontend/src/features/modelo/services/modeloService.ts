import type { Modelo, DadosModelo } from "../types/modelo";

const API_URL = "http://localhost:3000/api/modelos";

// ==========================================
// LISTAR MODELOS
// ==========================================

export async function getModelos(): Promise<Modelo[]> {
    const response = await fetch(API_URL);

    const dados = await response.json();

    if (!response.ok) {
        throw new Error(
            dados.mensagem || "Erro ao buscar modelos"
        );
    }

    return dados;
}

// ==========================================
// BUSCAR MODELO POR ID
// ==========================================

export async function buscarModelo(
    id: string
): Promise<Modelo> {

    const response = await fetch(
        `${API_URL}/${id}`
    );

    const dados = await response.json();

    if (!response.ok) {
        throw new Error(
            dados.mensagem || "Erro ao buscar modelo"
        );
    }

    return dados;
}

// ==========================================
// CADASTRAR MODELO
// ==========================================

export async function inserirModelo(
    modelo: DadosModelo
): Promise<Modelo> {

    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(modelo),
    });

    const dados = await response.json();

    if (!response.ok) {
        throw new Error(
            dados.mensagem || "Erro ao cadastrar modelo"
        );
    }

    return dados;
}

// ==========================================
// EDITAR MODELO
// ==========================================

export async function editarModelo(
    id: string,
    dados: DadosModelo
): Promise<Modelo> {

    const response = await fetch(
        `${API_URL}/${id}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dados),
        }
    );

    const resultado = await response.json();

    if (!response.ok) {
        throw new Error(
            resultado.mensagem ||
            "Erro ao atualizar modelo"
        );
    }

    return resultado;
}

// ==========================================
// EXCLUIR MODELO
// ==========================================

export async function deleteModelo(
    id_Modelo: number
): Promise<void> {

    const response = await fetch(
        `${API_URL}/${id_Modelo}`,
        {
            method: "DELETE",
        }
    );

    const resultado = await response.json();

    if (!response.ok) {
        throw new Error(
            resultado.mensagem ||
            "Erro ao excluir modelo"
        );
    }
}