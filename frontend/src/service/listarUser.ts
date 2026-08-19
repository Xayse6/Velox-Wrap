const API_URL = "http://localhost:3000/api/usuarios";

export async function listarUsuarios() {
    const response = await fetch(API_URL);

    if (!response.ok) {
        throw new Error("Erro ao buscar usuários");
    }

    return response.json();
}
