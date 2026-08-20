const API_URL = "http://localhost:3000/api/marcas";

export async function getMarcas() {
    const response = await fetch(API_URL);

    if (!response.ok) {
        throw new Error("Erro ao buscar marcas");
    }

    return response.json();
}

export async function deleteMarca(id_Marca: number) {
    const response = await fetch(`${API_URL}/${id_Marca}`, {
            method: "DELETE",
    });

    if (!response.ok) {
        throw new Error("Erro ao excluir marca");
    }

    return response.json();
}