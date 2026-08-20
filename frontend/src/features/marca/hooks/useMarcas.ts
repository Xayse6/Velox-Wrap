import { useEffect, useState } from "react";

import {
    getMarcas,
    deleteMarca,
} from "../services/marcaService";

import type { Marca } from "../types/marca";

export default function useMarcas() {
    const [marcas, setMarcas] = useState<Marca[]>([]);

    const [carregando, setCarregando] = useState(true);

    const [erro, setErro] = useState("");

    useEffect(() => {
        async function loadMarcas() {
            try {
                const data = await getMarcas();

                setMarcas(data);
            } catch (error) {
                console.error(error);

                setErro(
                    "Não foi possível carregar as marcas."
                );
            } finally {
                setCarregando(false);
            }
        }

        loadMarcas();
    }, []);

    const deleteMarcaById = async (
        id_Marca: number
    ) => {
        const confirmar = window.confirm(
            "Tem certeza que deseja excluir esta marca?"
        );

        if (!confirmar) {
            return;
        }

        try {
            await deleteMarca(id_Marca);

            setMarcas((marcasAtuais) =>
                marcasAtuais.filter(
                    (marca) =>
                        marca.id_Marca !== id_Marca
                )
            );
        } catch (error) {
            console.error(error);

            alert(
                "Não foi possível excluir a marca."
            );
        }
    };

    return {
        marcas,
        carregando,
        erro,
        deleteMarca: deleteMarcaById,
    };
}