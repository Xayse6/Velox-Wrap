import { useEffect, useState } from "react";

import { inserirUser } from "../../../service/inserirUser";
import { buscarUser } from "../services/buscarUsuario";
import { editarUser } from "../services/editarUsuario";

export default function useUserForm(id?: string) {

    const [nome, setNome] = useState("");
    const [cpf, setCpf] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const [carregando, setCarregando] = useState(false);

    const [mensagem, setMensagem] = useState("");
    const [tipoMensagem, setTipoMensagem] =
        useState<"sucesso" | "erro" | "">("");

    const modoEdicao = Boolean(id);

    const limparMensagem = () => {
        setMensagem("");
        setTipoMensagem("");
    };

    // Buscar usuário quando estiver editando
    useEffect(() => {

        if (!id) return;

        const carregarUsuario = async () => {

            try {
                setCarregando(true);
                limparMensagem();

                const usuario = await buscarUser(id);

                setNome(usuario.nome);
                setCpf(usuario.cpf);
                setEmail(usuario.email);

            } catch (error) {

                console.error(error);

                setMensagem(
                    "Não foi possível carregar o usuário."
                );

                setTipoMensagem("erro");

            } finally {
                setCarregando(false);
            }
        };

        carregarUsuario();

    }, [id]);

    // Cadastro
    const cadastrar = async (): Promise<boolean> => {

        try {

            setCarregando(true);
            limparMensagem();

            await inserirUser({
                nome,
                cpf,
                email,
                senha,
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

            console.error(error);

            setMensagem(
                "Não foi possível cadastrar o usuário."
            );

            setTipoMensagem("erro");

            return false;

        } finally {

            setCarregando(false);
        }
    };

    // Edição
    const editar = async (): Promise<boolean> => {

        if (!id) {
            return false;
        }

        try {

            setCarregando(true);
            limparMensagem();

            await editarUser(id, {
                nome,
                cpf,
                email,
                senha: senha || undefined,
            });

            setMensagem(
                "Usuário atualizado com sucesso!"
            );

            setTipoMensagem("sucesso");

            return true;

        } catch (error) {

            console.error(error);

            setMensagem(
                "Não foi possível atualizar o usuário."
            );

            setTipoMensagem("erro");

            return false;

        } finally {

            setCarregando(false);
        }
    };

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