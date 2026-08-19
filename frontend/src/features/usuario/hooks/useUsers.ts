import { useEffect, useState } from "react";

interface Usuario {
    idUsuario: number;
    nome: string;
    cpf: string;
    email: string;
}

export default function Users() {
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState("");

    useEffect(() => {
        fetch("http://localhost:3000/api/usuarios")
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Erro ao buscar usuários");
                }

                return res.json();
            })
            .then((data) => {
                setUsuarios(data);
            })
            .catch((error) => {
                console.error(error);
                setErro("Não foi possível carregar os usuários.");
            })
            .finally(() => {
                setCarregando(false);
            });
    }, []);

    const exUser = async (idUsuario: number) => {
        const confirmar = window.confirm(
            "Tem certeza que deseja excluir este usuário?"
        );

        if (!confirmar) {
            return;
        }

        try {
            const response = await fetch(
                `http://localhost:3000/api/usuarios/${idUsuario}`,
                {
                    method: "DELETE",
                }
            );

            if (!response.ok) {
                throw new Error("Erro ao excluir usuário");
            }

            setUsuarios((usuariosAtuais) =>
                usuariosAtuais.filter(
                    (usuario) => usuario.idUsuario !== idUsuario
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
        exUser,
    };
}