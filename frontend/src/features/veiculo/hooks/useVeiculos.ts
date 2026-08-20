import { useEffect, useState } from "react";

import {
    getVeiculos,
    deleteVeiculo,
} from "../services/veiculosService";

import type { Veiculo } from "../types/veiculo";


export default function useVeiculos() {

    const [veiculos, setVeiculos] = useState<Veiculo[]>([]);

    const [carregando, setCarregando] = useState(true);

    const [erro, setErro] = useState("");



    useEffect(() => {

        async function carregarVeiculos() {

            try {

                setCarregando(true);

                setErro("");

                const dados = await getVeiculos();

                setVeiculos(dados);


            } catch (error) {

                console.error(
                    "Erro ao carregar veículos:",
                    error
                );

                setErro(
                    "Não foi possível carregar os veículos."
                );


            } finally {

                setCarregando(false);

            }

        }


        carregarVeiculos();

    }, []);




    const deleteVeiculoById = async (
        id_Veiculo: number
    ) => {


        const confirmar = window.confirm(
            "Tem certeza que deseja excluir este veículo?"
        );


        if (!confirmar) {
            return;
        }



        try {


            await deleteVeiculo(id_Veiculo);



            setVeiculos(
                (veiculosAtuais) =>
                    veiculosAtuais.filter(
                        (veiculo) =>
                            veiculo.id_Veiculo !== id_Veiculo
                    )
            );



        } catch (error) {


            console.error(
                "Erro ao excluir veículo:",
                error
            );


            alert(
                "Não foi possível excluir o veículo."
            );

        }

    };




    return {

        veiculos,

        carregando,

        erro,

        deleteVeiculo: deleteVeiculoById,

    };

}