import { useState } from "react";
import { inserirUser } from "../service/inserirUser";

export default function useUserForm() {

    const [nome, setNome] = useState("");
    const [cpf, setCpf] = useState("");

    const [carregando, setCarregando] = useState(false);

    const [mensagem, setMensagem] = useState("");
    const [tipoMensagem, setTipoMensagem] =
        useState<"sucesso" | "erro" | "">("");

    const limparMensagem = () => {
        setMensagem("");
        setTipoMensagem("");
    };

    const cadastrar = async (): Promise<boolean> => {
    try {
        setCarregando(true);
        limparMensagem();

        await inserirUser({
            nome,
            cpf,
        });

        setMensagem("Usuário cadastrado com sucesso!");
        setTipoMensagem("sucesso");

        setNome("");
        setCpf("");

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

    return {
        nome,
        setNome,

        cpf,
        setCpf,

        carregando,

        cadastrar,

        mensagem,
        tipoMensagem,
        limparMensagem,
    };
}