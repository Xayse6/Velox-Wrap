import { useEffect, useState } from "react";

import {
    getUsuarios,
    deleteUsuario,
} from "../services/usuarioService";

import type { Usuario } from "../types/user";

export default function useUsers() {

    const [usuarios, setUsuarios] =
        useState<Usuario[]>([]);

    const [carregando, setCarregando] =
        useState(true);

    const [erro, setErro] =
        useState("");

    // ==========================================
    // CARREGAR USUÁRIOS
    // ==========================================

    useEffect(() => {

        async function carregarUsuarios() {

            try {

                setCarregando(true);
                setErro("");

                const dados =
                    await getUsuarios();

                setUsuarios(dados);

            } catch (error) {

                console.error(
                    "Erro ao carregar usuários:",
                    error
                );

                setErro(
                    error instanceof Error
                        ? error.message
                        : "Não foi possível carregar os usuários."
                );

            } finally {

                setCarregando(false);

            }
        }

        carregarUsuarios();

    }, []);

    // ==========================================
    // EXCLUIR USUÁRIO
    // ==========================================

    const deleteUsuarioById = async (
        id_Usuario: number
    ) => {

        const confirmar =
            window.confirm(
                "Tem certeza que deseja excluir este usuário?"
            );

        if (!confirmar) {
            return;
        }

        try {

            await deleteUsuario(
                id_Usuario
            );

            setUsuarios(
                (usuariosAtuais) =>
                    usuariosAtuais.filter(
                        (usuario) =>
                            usuario.id_Usuario !==
                            id_Usuario
                    )
            );

        } catch (error) {

            console.error(
                "Erro ao excluir usuário:",
                error
            );

            alert(
                error instanceof Error
                    ? error.message
                    : "Não foi possível excluir o usuário."
            );
        }
    };

    // ==========================================
    // RETORNO
    // ==========================================

    return {
        usuarios,
        carregando,
        erro,
        deleteUser: deleteUsuarioById,
    };
}