import type { Marca, DadosMarca } from "../types/marca";

const API_URL = "http://localhost:3000/api/marcas";

// ==========================================
// LISTAR MARCAS
// ==========================================

export async function getMarcas(): Promise<Marca[]> {
    const response = await fetch(API_URL);

    const dados = await response.json();

    if (!response.ok) {
        throw new Error(
            dados.mensagem || "Erro ao buscar marcas"
        );
    }

    return dados;
}

// ==========================================
// BUSCAR MARCA POR ID
// ==========================================

export async function buscarMarca(
    id: string
): Promise<Marca> {
    const response = await fetch(`${API_URL}/${id}`);

    const dados = await response.json();

    if (!response.ok) {
        throw new Error(
            dados.mensagem || "Erro ao buscar marca"
        );
    }

    return dados;
}

// ==========================================
// CADASTRAR MARCA
// ==========================================

export async function inserirMarca(
    marca: DadosMarca
): Promise<Marca> {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(marca),
    });

    const dados = await response.json();

    if (!response.ok) {
        throw new Error(
            dados.mensagem || "Erro ao cadastrar marca"
        );
    }

    return dados;
}

// ==========================================
// EDITAR MARCA
// ==========================================

export async function editarMarca(
    id: string,
    dados: DadosMarca
): Promise<Marca> {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(dados),
    });

    const resultado = await response.json();

    if (!response.ok) {
        throw new Error(
            resultado.mensagem || "Erro ao atualizar marca"
        );
    }

    return resultado;
}

// ==========================================
// EXCLUIR MARCA
// ==========================================

export async function deleteMarca(
    id_Marca: number
): Promise<void> {
    const response = await fetch(
        `${API_URL}/${id_Marca}`,
        {
            method: "DELETE",
        }
    );

    const resultado = await response.json();

    if (!response.ok) {
        throw new Error(
            resultado.mensagem || "Erro ao excluir marca"
        );
    }
}