import type { Veiculo } from "../types/veiculos";

const API_URL = "http://localhost:3000/api/veiculos";

export async function getVeiculos(): Promise<Veiculo[]> {
    const response = await fetch(API_URL);

    if (!response.ok) {
        throw new Error("Erro ao buscar veículos");
    }

    return response.json();
}

export async function deleteVeiculo(id_Veiculo: number) {
    const response = await fetch(
        `${API_URL}/${id_Veiculo}`,
        {
            method: "DELETE",
        }
    );

    if (!response.ok) {
        throw new Error("Erro ao excluir veículo");
    }

    return response.json();
}