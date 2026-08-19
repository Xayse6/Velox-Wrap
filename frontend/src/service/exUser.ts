const API_URL = "http://localhost:3000/api/usuarios";

export async function exUser(idUsuario: number) {
    const response = await fetch(
        `${API_URL}/${idUsuario}`,
        {
            method: "DELETE",
        }
    );

    if (!response.ok) {
        throw new Error("Erro ao excluir usuário");
    }
}