interface DadosUsuario {
    nome: string;
    cpf: string;
    email: string;
    senha?: string;
}

export async function editarUser(
    id: string,
    dados: DadosUsuario
) {

    const resposta = await fetch(
        `http://localhost:3000/api/usuarios/${id}`,
        {
            method: "PUT",

            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify(dados),
        }
    );

    const resultado = await resposta.json();

    if (!resposta.ok) {
        throw new Error(
            resultado.mensagem ||
            "Erro ao atualizar usuário"
        );
    }

    return resultado;
}