export interface Usuario {
    idUsuario: number;
    nome: string;
    cpf: string;
    email: string;
}

export async function buscarUser(
    id: string
): Promise<Usuario> {

    const resposta = await fetch(
        `http://localhost:3000/api/usuarios/${id}`
    );

    const dados = await resposta.json();

    if (!resposta.ok) {
        throw new Error(
            dados.mensagem || "Erro ao buscar usuário"
        );
    }

    return dados;
}