const API_URL = "http://localhost:3000/api/marcas";

export async function inserirMarca(marca: {
    nome_marca: string;
    sigla_marca: string;
}) {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(marca),
    });

    if (!response.ok) {
        throw new Error("Erro ao cadastrar mraca");
    }

    return response.json();
}