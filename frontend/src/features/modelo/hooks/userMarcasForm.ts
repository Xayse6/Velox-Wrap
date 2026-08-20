import { useEffect, useState } from "react";

import { inserirMarca } from "../services/inserirMarca";
import { buscarMarca } from "../services/buscarMarca";
import { editarMarca } from "../services/editarMarca";

export default function useMarcaForm(id?: string) {

    const [nome_marca, setNome_marca] = useState("");
    const [sigla_marca, setSigla_marca] = useState("");

    const [carregando, setCarregando] = useState(false);

    const [mensagem, setMensagem] = useState("");
    const [tipoMensagem, setTipoMensagem] =
        useState<"sucesso" | "erro" | "">("");

    const modoEdicao = Boolean(id);

    const limparMensagem = () => {
        setMensagem("");
        setTipoMensagem("");
    };

    // ==========================================================
    // CARREGAR MARCA PARA EDIÇÃO
    // ==========================================================

    useEffect(() => {

        if (!id) return;

        const carregarMarca = async () => {

            try {

                setCarregando(true);
                limparMensagem();

                const marca = await buscarMarca(id);

                setNome_marca(marca.nome_marca);
                setSigla_marca(marca.sigla_marca);

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

    // ==========================================================
    // CADASTRAR
    // ==========================================================

    const cadastrar = async (): Promise<boolean> => {

        try {

            setCarregando(true);
            limparMensagem();

            await inserirMarca({
                nome_marca,
                sigla_marca,
            });

            setMensagem(
                "Marca cadastrada com sucesso!"
            );

            setTipoMensagem("sucesso");

            setNome_marca("");
            setSigla_marca("");

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

    // ==========================================================
    // EDITAR
    // ==========================================================

    const editar = async (): Promise<boolean> => {

        if (!id) {
            return false;
        }

        try {

            setCarregando(true);
            limparMensagem();

            await editarMarca(id, {
                nome_marca,
                sigla_marca,
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
        nome_marca,
        setNome_marca,

        sigla_marca,
        setSigla_marca,

        carregando,

        cadastrar,
        editar,

        modoEdicao,

        mensagem,
        tipoMensagem,
        limparMensagem,
    };
}