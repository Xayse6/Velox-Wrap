import { useEffect, useState } from "react";

import {
    getVeiculos,
    deleteVeiculo,
} from "../services/veiculosService";

import type { Veiculo } from "../types/veiculos";

export default function useVeiculos() {

    const [veiculos, setVeiculos] = useState<Veiculo[]>([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState("");

    useEffect(() => {

        async function loadVeiculos() {

            try {

                const data = await getVeiculos();

                setVeiculos(data);

            } catch (error) {

                console.error(error);

                setErro(
                    "Não foi possível carregar os veículos."
                );

            } finally {

                setCarregando(false);
            }
        }

        loadVeiculos();

    }, []);

    const deleteVeiculoById = async (id_veiculo: number) => {

        const confirmar = window.confirm(
            "Tem certeza que deseja excluir este veículo?"
        );

        if (!confirmar) {
            return;
        }

        try {

            await deleteVeiculo(id_veiculo);

            setVeiculos((veiculosAtuais) =>
                veiculosAtuais.filter(
                    (veiculo) =>
                        veiculo.id_veiculo !== id_veiculo
                )
            );

        } catch (error) {

            console.error(error);

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