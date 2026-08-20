export interface DadosMarca {
    nome_marca: string;
    sigla_marca: string;
}

export async function editarMarca(
    id: string,
    dados: DadosMarca
) {

    const resposta = await fetch(
        `http://localhost:3000/api/marcas/${id}`,
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
            "Erro ao atualizar marca"
        );
    }

    return resultado;
}