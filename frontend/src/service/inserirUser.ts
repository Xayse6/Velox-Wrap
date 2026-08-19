const API_URL = "http://localhost:3000/api/usuarios";

export async function inserirUser(usuario: {
    nome: string;
    cpf: string;
    email: string;
    senha: string;
}) {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(usuario),
    });

    if (!response.ok) {
        throw new Error("Erro ao cadastrar usuário");
    }

    return response.json();
}