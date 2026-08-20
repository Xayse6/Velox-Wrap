const API_URL = "http://localhost:3000/api/modelos";

export async function getModelos() {
    const response = await fetch(API_URL);

    if (!response.ok) {
        throw new Error("Erro ao buscar modelos");
    }

    return response.json();
}

export async function deleteModelo(id_Modelo: number) {
    const response = await fetch(
        `${API_URL}/${id_Modelo}`,
        {
            method: "DELETE",
        }
    );

    if (!response.ok) {
        throw new Error("Erro ao excluir modelo");
    }

    return response.json();
}