import { useEffect, useState } from "react";

import {
    getModelos,
    deleteModelo,
} from "../services/modeloService";

import type { Modelo } from "../types/modelo";

export default function useModelos() {
    const [modelos, setModelos] = useState<Modelo[]>([]);

    const [carregando, setCarregando] = useState(true);

    const [erro, setErro] = useState("");

    useEffect(() => {
        async function loadModelos() {
            try {
                const data = await getModelos();

                setModelos(data);
            } catch (error) {
                console.error(error);

                setErro(
                    "Não foi possível carregar os modelos."
                );
            } finally {
                setCarregando(false);
            }
        }

        loadModelos();
    }, []);

    const deleteModeloById = async (
        id_Modelo: number
    ) => {
        const confirmar = window.confirm(
            "Tem certeza que deseja excluir este modelo?"
        );

        if (!confirmar) {
            return;
        }

        try {
            await deleteModelo(id_Modelo);

            setModelos((modelosAtuais) =>
                modelosAtuais.filter(
                    (modelo) =>
                        modelo.id_Modelo !== id_Modelo
                )
            );
        } catch (error) {
            console.error(error);

            alert(
                "Não foi possível excluir o modelo."
            );
        }
    };

    return {
        modelos,
        carregando,
        erro,
        deleteModelo: deleteModeloById,
    };
}