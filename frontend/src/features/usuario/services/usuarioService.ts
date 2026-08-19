const API_URL = "http://localhost:3000/api/usuarios";

export async function getUsers() {
    const response = await fetch(API_URL);

    if (!response.ok) {
        throw new Error("Erro ao buscar usuários");
    }

    return response.json();
}

export async function deleteUser(idUsuario: number) {
    const response = await fetch(`${API_URL}/${idUsuario}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error("Erro ao excluir usuário");
    }

    return response.json();
}