export interface Marca {
    id_marca: number;
    nome_marca: string;
    sigla_marca: string;
}

export async function buscarMarca(
    id: string
): Promise<Marca> {

    const resposta = await fetch(
        `http://localhost:3000/api/marcas/${id}`
    );

    const dados = await resposta.json();

    if (!resposta.ok) {
        throw new Error(
            dados.mensagem || "Erro ao buscar marca"
        );
    }

    return dados;
}