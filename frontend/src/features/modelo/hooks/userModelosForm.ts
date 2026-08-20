import { useEffect, useState } from "react";

import {
    buscarModelo,
    editarModelo,
    inserirModelo,
} from "../services/modeloService";

import { getMarcas } from "../../marca/services/marcaService";
import type { Marca } from "../../marca/types/marca";

export default function useModeloForm(id?: string) {

    // =========================================================
    // ESTADOS DO MODELO
    // =========================================================

    const [nomeModelo, setNomeModelo] = useState("");
    const [anoModelo, setAnoModelo] = useState("");
    const [idMarca, setIdMarca] = useState("");

    // =========================================================
    // ESTADO DAS MARCAS
    // =========================================================

    const [marcas, setMarcas] = useState<Marca[]>([]);

    // =========================================================
    // ESTADOS DA TELA
    // =========================================================

    const [carregando, setCarregando] = useState(false);

    const [mensagem, setMensagem] = useState("");

    const [tipoMensagem, setTipoMensagem] = useState<
        "sucesso" | "erro"
    >("sucesso");

    const modoEdicao = Boolean(id);

    // =========================================================
    // CARREGAR MARCAS
    // =========================================================

    useEffect(() => {

        let ativo = true;

        async function carregarMarcas() {

            try {

                const dados = await getMarcas();

                if (!ativo) {
                    return;
                }

                setMarcas(dados);

            } catch (error) {

                if (!ativo) {
                    return;
                }

                console.error(
                    "Erro ao carregar marcas:",
                    error
                );

                setMensagem(
                    error instanceof Error
                        ? error.message
                        : "Erro ao carregar marcas"
                );

                setTipoMensagem("erro");
            }
        }

        carregarMarcas();

        return () => {
            ativo = false;
        };

    }, []);

    // =========================================================
    // CARREGAR MODELO PARA EDIÇÃO
    // =========================================================

    useEffect(() => {

        if (!id) {
            return;
        }

        // Depois dessa validação, idModelo é definitivamente string
        const idModelo: string = id;

        let ativo = true;

        async function carregarModelo() {

            try {

                setCarregando(true);

                const modelo = await buscarModelo(idModelo);

                if (!ativo) {
                    return;
                }

                setNomeModelo(
                    modelo.nome_Modelo
                );

                setAnoModelo(
                    String(modelo.ano_Modelo)
                );

                setIdMarca(
                    String(modelo.id_Marca)
                );

            } catch (error) {

                if (!ativo) {
                    return;
                }

                console.error(
                    "Erro ao carregar modelo:",
                    error
                );

                setMensagem(
                    error instanceof Error
                        ? error.message
                        : "Erro ao carregar modelo"
                );

                setTipoMensagem("erro");

            } finally {

                if (ativo) {
                    setCarregando(false);
                }
            }
        }

        carregarModelo();

        return () => {
            ativo = false;
        };

    }, [id]);

    // =========================================================
    // CADASTRAR MODELO
    // =========================================================

    async function cadastrar(): Promise<boolean> {

        // -----------------------------------------------------
        // VALIDAÇÕES
        // -----------------------------------------------------

        if (!nomeModelo.trim()) {

            setMensagem(
                "Digite o nome do modelo"
            );

            setTipoMensagem("erro");

            return false;
        }

        if (!anoModelo) {

            setMensagem(
                "Digite o ano do modelo"
            );

            setTipoMensagem("erro");

            return false;
        }

        if (!idMarca) {

            setMensagem(
                "Selecione uma marca"
            );

            setTipoMensagem("erro");

            return false;
        }

        // -----------------------------------------------------
        // ENVIO
        // -----------------------------------------------------

        try {

            setCarregando(true);
            setMensagem("");

            await inserirModelo({

                nome_modelo:
                    nomeModelo.trim(),

                ano_modelo:
                    Number(anoModelo),

                id_marca:
                    Number(idMarca),

            });

            setMensagem(
                "Modelo cadastrado com sucesso!"
            );

            setTipoMensagem("sucesso");

            return true;

        } catch (error) {

            console.error(
                "Erro ao cadastrar modelo:",
                error
            );

            setMensagem(
                error instanceof Error
                    ? error.message
                    : "Erro ao cadastrar modelo"
            );

            setTipoMensagem("erro");

            return false;

        } finally {

            setCarregando(false);
        }
    }

    // =========================================================
    // EDITAR MODELO
    // =========================================================

    async function editar(): Promise<boolean> {

        // -----------------------------------------------------
        // VERIFICAR ID
        // -----------------------------------------------------

        if (!id) {

            setMensagem(
                "ID do modelo não informado"
            );

            setTipoMensagem("erro");

            return false;
        }

        // -----------------------------------------------------
        // ID GARANTIDO COMO STRING
        // -----------------------------------------------------

        const idModelo: string = id;

        // -----------------------------------------------------
        // VALIDAÇÕES
        // -----------------------------------------------------

        if (!nomeModelo.trim()) {

            setMensagem(
                "Digite o nome do modelo"
            );

            setTipoMensagem("erro");

            return false;
        }

        if (!anoModelo) {

            setMensagem(
                "Digite o ano do modelo"
            );

            setTipoMensagem("erro");

            return false;
        }

        if (!idMarca) {

            setMensagem(
                "Selecione uma marca"
            );

            setTipoMensagem("erro");

            return false;
        }

        // -----------------------------------------------------
        // ENVIO
        // -----------------------------------------------------

        try {

            setCarregando(true);
            setMensagem("");

            await editarModelo(
                idModelo,
                {
                    nome_modelo:
                        nomeModelo.trim(),

                    ano_modelo:
                        Number(anoModelo),

                    id_marca:
                        Number(idMarca),
                }
            );

            setMensagem(
                "Modelo atualizado com sucesso!"
            );

            setTipoMensagem("sucesso");

            return true;

        } catch (error) {

            console.error(
                "Erro ao atualizar modelo:",
                error
            );

            setMensagem(
                error instanceof Error
                    ? error.message
                    : "Erro ao atualizar modelo"
            );

            setTipoMensagem("erro");

            return false;

        } finally {

            setCarregando(false);
        }
    }

    // =========================================================
    // LIMPAR MENSAGEM
    // =========================================================

    function limparMensagem() {

        setMensagem("");

        setTipoMensagem("sucesso");
    }

    // =========================================================
    // RETORNO
    // =========================================================

    return {

        // Modelo
        nomeModelo,
        anoModelo,
        idMarca,

        setNomeModelo,
        setAnoModelo,
        setIdMarca,

        // Marcas
        marcas,

        // Estado
        carregando,

        // Operações
        cadastrar,
        editar,

        // Mensagens
        mensagem,
        tipoMensagem,
        limparMensagem,

        // Modo
        modoEdicao,
    };
}