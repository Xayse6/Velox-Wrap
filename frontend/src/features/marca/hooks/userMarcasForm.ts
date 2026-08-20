import { useEffect, useState } from "react";

import {
    buscarMarca,
    editarMarca,
    inserirMarca,
} from "../services/marcaService";

export default function useMarcaForm(id?: string) {
    const [nome_Marca, setNome_Marca] = useState("");

    const [sigla_Marca, setSigla_Marca] = useState("");

    const [carregando, setCarregando] = useState(false);

    const [mensagem, setMensagem] = useState("");

    const [tipoMensagem, setTipoMensagem] =
        useState<"sucesso" | "erro" | "">("");

    const modoEdicao = Boolean(id);

    const limparMensagem = () => {
        setMensagem("");
        setTipoMensagem("");
    };

    useEffect(() => {
        if (!id) return;

        const carregarMarca = async () => {
            try {
                setCarregando(true);

                limparMensagem();

                const marca = await buscarMarca(id);

                setNome_Marca(marca.nome_Marca);

                setSigla_Marca(marca.sigla_Marca);
            } catch (error) {
                console.error(error);

                setMensagem(
                    "Não foi possível carregar a marca."
                );

                setTipoMensagem("erro");
            } finally {
                setCarregando(false);
            }
        };

        carregarMarca();
    }, [id]);

    const cadastrar = async (): Promise<boolean> => {
        try {
            setCarregando(true);

            limparMensagem();

            await inserirMarca({
                nome_Marca,
                sigla_Marca,
            });

            setMensagem(
                "Marca cadastrada com sucesso!"
            );

            setTipoMensagem("sucesso");

            setNome_Marca("");

            setSigla_Marca("");

            return true;
        } catch (error) {
            console.error(error);

            setMensagem(
                "Não foi possível cadastrar a marca."
            );

            setTipoMensagem("erro");

            return false;
        } finally {
            setCarregando(false);
        }
    };

    const editar = async (): Promise<boolean> => {
        if (!id) {
            return false;
        }

        try {
            setCarregando(true);

            limparMensagem();

            await editarMarca(id, {
                nome_Marca,
                sigla_Marca,
            });

            setMensagem(
                "Marca atualizada com sucesso!"
            );

            setTipoMensagem("sucesso");

            return true;
        } catch (error) {
            console.error(error);

            setMensagem(
                "Não foi possível atualizar a marca."
            );

            setTipoMensagem("erro");

            return false;
        } finally {
            setCarregando(false);
        }
    };

    return {
        nome_Marca,
        setNome_Marca,

        sigla_Marca,
        setSigla_Marca,

        carregando,

        cadastrar,
        editar,

        modoEdicao,

        mensagem,
        tipoMensagem,

        limparMensagem,
    };
}