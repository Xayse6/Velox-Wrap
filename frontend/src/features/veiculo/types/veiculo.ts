export interface Veiculo {
    id_Veiculo: number;
    id_Usuario: number;
    id_Modelo: number;

    nome_Usuario: string;
    nome_Modelo: string;
    ano_Modelo: number;

    id_Marca: number;
    nome_Marca: string;
    sigla_Marca: string;
}

export interface DadosVeiculo {
    id_Usuario: number;
    id_Modelo: number;
}