import {
    useEffect,
    useState,
} from "react";

import {
    buscarVeiculo,
    editarVeiculo,
    getModelos,
    getUsuarios,
    inserirVeiculo,
} from "../services/veiculosService";

import type { Usuario } from "../../perfil/types/user";
import type { Modelo } from "../../modelo/types/modelo";


export default function useVeiculoForm(
    id?: string
) {

    // ==========================================
    // ESTADOS DO VEÍCULO
    // ==========================================

    const [idUsuario, setIdUsuario] = useState("");
    const [idModelo, setIdModelo] = useState("");


    // ==========================================
    // USUÁRIOS E MODELOS
    // ==========================================

    const [usuarios, setUsuarios] =
        useState<Usuario[]>([]);

    const [modelos, setModelos] =
        useState<Modelo[]>([]);


    // ==========================================
    // ESTADOS DA TELA
    // ==========================================

    const [carregando, setCarregando] =
        useState(false);

    const [carregandoDados, setCarregandoDados] =
        useState(true);

    const [mensagem, setMensagem] =
        useState("");

    const [tipoMensagem, setTipoMensagem] =
        useState<"sucesso" | "erro">("sucesso");


    // ==========================================
    // MODO DE EDIÇÃO
    // ==========================================

    const modoEdicao = Boolean(id);


    // ==========================================
    // CARREGAR DADOS
    // ==========================================

    useEffect(() => {

        async function carregarDados() {

            try {

                setCarregandoDados(true);
                setMensagem("");


                const [
                    usuariosDados,
                    modelosDados,
                ] = await Promise.all([
                    getUsuarios(),
                    getModelos(),
                ]);


                setUsuarios(usuariosDados);
                setModelos(modelosDados);


                // ==================================
                // BUSCAR VEÍCULO PARA EDIÇÃO
                // ==================================

                if (id) {

                    const veiculo =
                        await buscarVeiculo(id);


                    setIdUsuario(
                        String(
                            veiculo.id_Usuario
                        )
                    );


                    setIdModelo(
                        String(
                            veiculo.id_Modelo
                        )
                    );

                }


            } catch (error) {

                console.error(
                    "Erro ao carregar dados:",
                    error
                );


                setMensagem(
                    error instanceof Error
                        ? error.message
                        : "Erro ao carregar dados"
                );


                setTipoMensagem("erro");


            } finally {

                setCarregandoDados(false);

            }

        }


        carregarDados();

    }, [id]);


    // ==========================================
    // CADASTRAR
    // ==========================================

    async function cadastrar(): Promise<boolean> {

        if (!idUsuario || !idModelo) {

            setMensagem(
                "Selecione o usuário e o modelo."
            );

            setTipoMensagem("erro");

            return false;
        }


        try {

            setCarregando(true);
            setMensagem("");


            await inserirVeiculo({
                id_Usuario: Number(idUsuario),
                id_Modelo: Number(idModelo),
            });


            setMensagem(
                "Veículo cadastrado com sucesso!"
            );

            setTipoMensagem("sucesso");

            return true;


        } catch (error) {

            console.error(
                "Erro ao cadastrar veículo:",
                error
            );


            setMensagem(
                error instanceof Error
                    ? error.message
                    : "Erro ao cadastrar veículo"
            );


            setTipoMensagem("erro");

            return false;


        } finally {

            setCarregando(false);

        }

    }


    // ==========================================
    // EDITAR
    // ==========================================

    async function editar(): Promise<boolean> {

        if (!id) {
            return false;
        }


        if (!idUsuario || !idModelo) {

            setMensagem(
                "Selecione o usuário e o modelo."
            );

            setTipoMensagem("erro");

            return false;
        }


        try {

            setCarregando(true);
            setMensagem("");


            await editarVeiculo(
                id,
                {
                    id_Usuario: Number(idUsuario),
                    id_Modelo: Number(idModelo),
                }
            );


            setMensagem(
                "Veículo atualizado com sucesso!"
            );

            setTipoMensagem("sucesso");

            return true;


        } catch (error) {

            console.error(
                "Erro ao atualizar veículo:",
                error
            );


            setMensagem(
                error instanceof Error
                    ? error.message
                    : "Erro ao atualizar veículo"
            );


            setTipoMensagem("erro");

            return false;


        } finally {

            setCarregando(false);

        }

    }


    // ==========================================
    // LIMPAR MENSAGEM
    // ==========================================

    function limparMensagem() {

        setMensagem("");
        setTipoMensagem("sucesso");

    }


    // ==========================================
    // RETORNO
    // ==========================================

    return {

        idUsuario,
        idModelo,

        setIdUsuario,
        setIdModelo,

        usuarios,
        modelos,

        carregando,
        carregandoDados,

        cadastrar,
        editar,

        mensagem,
        tipoMensagem,

        limparMensagem,

        modoEdicao,

    };

}