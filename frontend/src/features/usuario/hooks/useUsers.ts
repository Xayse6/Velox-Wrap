import { useEffect, useState } from "react";

import { getUsers, deleteUser } from "../services/usuarioService";
import type { User } from "../types/user";

export default function useUsers() {
    const [usuarios, setUsuarios] = useState<User[]>([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState("");

    useEffect(() => {
        async function loadUsers() {
            try {
                const data = await getUsers();

                setUsuarios(data);
            } catch (error) {
                console.error(error);
                setErro("Não foi possível carregar os usuários.");
            } finally {
                setCarregando(false);
            }
        }

        loadUsers();
    }, []);

    const deleteUserById = async (idUsuario: number) => {
        const confirmar = window.confirm(
            "Tem certeza que deseja excluir este usuário?"
        );

        if (!confirmar) {
            return;
        }

        try {
            await deleteUser(idUsuario);

            setUsuarios((usuariosAtuais) =>
                usuariosAtuais.filter(
                    (usuario) => usuario.idusuario !== idUsuario
                )
            );
        } catch (error) {
            console.error(error);
            alert("Não foi possível excluir o usuário.");
        }
    };

    return {
        usuarios,
        carregando,
        erro,
        deleteUser: deleteUserById,
    };
}