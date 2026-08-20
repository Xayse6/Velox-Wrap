import { useEffect, useState } from "react";

import {
    inserirUsuario,
    buscarUsuario,
    editarUsuario,
} from "../../usuario/services/usuarioService";

export default function useUserForm(id?: string) {
    // ==========================================
    // ESTADOS
    // ==========================================

    const [nome, setNome] = useState<string>("");
    const [cpf, setCpf] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [senha, setSenha] = useState<string>("");

    const [carregando, setCarregando] = useState(false);

    const [mensagem, setMensagem] = useState("");

    const [tipoMensagem, setTipoMensagem] =
        useState<"sucesso" | "erro" | "">("");

    const modoEdicao = Boolean(id);

    // ==========================================
    // LIMPAR MENSAGEM
    // ==========================================

    const limparMensagem = () => {
        setMensagem("");
        setTipoMensagem("");
    };

    // ==========================================
    // BUSCAR USUÁRIO PARA EDIÇÃO
    // ==========================================

    useEffect(() => {
        if (!id) {
            return;
        }

        const carregarUsuario = async () => {
            try {
                setCarregando(true);
                limparMensagem();

                const usuario = await buscarUsuario(id);

                setNome(usuario.nome_Usuario ?? "");
                setCpf(usuario.cpf_Usuario ?? "");
                setEmail(usuario.email_Usuario ?? "");

                // Não carregamos a senha do banco.
                // O campo permanece vazio.
                setSenha("");
            } catch (error) {
                console.error(
                    "Erro ao carregar usuário:",
                    error
                );

                setMensagem(
                    error instanceof Error
                        ? error.message
                        : "Não foi possível carregar o usuário."
                );

                setTipoMensagem("erro");
            } finally {
                setCarregando(false);
            }
        };

        carregarUsuario();
    }, [id]);

    // ==========================================
    // CADASTRAR USUÁRIO
    // ==========================================

    const cadastrar = async (): Promise<boolean> => {
        if (!nome || !cpf || !email || !senha) {
            setMensagem(
                "Preencha todos os campos obrigatórios."
            );

            setTipoMensagem("erro");

            return false;
        }

        try {
            setCarregando(true);
            limparMensagem();

            await inserirUsuario({
                nome_Usuario: nome,
                cpf_Usuario: cpf,
                email_Usuario: email,
                senha_Usuario: senha,
            });

            setMensagem(
                "Usuário cadastrado com sucesso!"
            );

            setTipoMensagem("sucesso");

            setNome("");
            setCpf("");
            setEmail("");
            setSenha("");

            return true;
        } catch (error) {
            console.error(
                "Erro ao cadastrar usuário:",
                error
            );

            setMensagem(
                error instanceof Error
                    ? error.message
                    : "Não foi possível cadastrar o usuário."
            );

            setTipoMensagem("erro");

            return false;
        } finally {
            setCarregando(false);
        }
    };

    // ==========================================
    // EDITAR USUÁRIO
    // ==========================================

    const editar = async (): Promise<boolean> => {
        if (!id) {
            return false;
        }

        if (!nome || !cpf || !email) {
            setMensagem(
                "Nome, CPF e e-mail são obrigatórios."
            );

            setTipoMensagem("erro");

            return false;
        }

        try {
            setCarregando(true);
            limparMensagem();

            await editarUsuario(id, {
                nome_Usuario: nome,
                cpf_Usuario: cpf,
                email_Usuario: email,

                // Só envia senha se o usuário digitou uma nova.
                ...(senha
                    ? { senha_Usuario: senha }
                    : {}),
            });

            setMensagem(
                "Usuário atualizado com sucesso!"
            );

            setTipoMensagem("sucesso");

            return true;
        } catch (error) {
            console.error(
                "Erro ao atualizar usuário:",
                error
            );

            setMensagem(
                error instanceof Error
                    ? error.message
                    : "Não foi possível atualizar o usuário."
            );

            setTipoMensagem("erro");

            return false;
        } finally {
            setCarregando(false);
        }
    };

    // ==========================================
    // RETORNO
    // ==========================================

    return {
        nome,
        setNome,

        cpf,
        setCpf,

        email,
        setEmail,

        senha,
        setSenha,

        carregando,

        cadastrar,
        editar,

        modoEdicao,

        mensagem,
        tipoMensagem,

        limparMensagem,
    };
}