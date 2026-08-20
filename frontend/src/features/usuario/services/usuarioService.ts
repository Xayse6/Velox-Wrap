import type {
    Usuario,
    DadosUsuario,
    DadosEditarUsuario,
} from "../types/user";

const API_URL = "http://localhost:3000/api";

export async function getUsuarios(): Promise<Usuario[]> {
    const response = await fetch(`${API_URL}/usuarios`);

    if (!response.ok) {
        throw new Error("Erro ao buscar usuários");
    }

    return response.json();
}

export async function buscarUsuario(
    id: string
): Promise<Usuario> {
    const response = await fetch(
        `${API_URL}/usuarios/${id}`
    );

    if (!response.ok) {
        const erro = await response.json();

        throw new Error(
            erro.mensagem || "Erro ao buscar usuário"
        );
    }

    return response.json();
}

export async function inserirUsuario(
    dados: DadosUsuario
): Promise<Usuario> {
    const response = await fetch(
        `${API_URL}/usuarios`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dados),
        }
    );

    if (!response.ok) {
        const erro = await response.json();

        throw new Error(
            erro.mensagem || "Erro ao cadastrar usuário"
        );
    }

    return response.json();
}

export async function editarUsuario(
    id: string,
    dados: DadosEditarUsuario
): Promise<Usuario> {
    const response = await fetch(
        `${API_URL}/usuarios/${id}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dados),
        }
    );

    if (!response.ok) {
        const erro = await response.json();

        throw new Error(
            erro.mensagem || "Erro ao atualizar usuário"
        );
    }

    const resultado = await response.json();

    return resultado.usuario;
}

export async function deleteUsuario(
    id: number
): Promise<void> {
    const response = await fetch(
        `${API_URL}/usuarios/${id}`,
        {
            method: "DELETE",
        }
    );

    if (!response.ok) {
        const erro = await response.json();

        throw new Error(
            erro.mensagem || "Erro ao excluir usuário"
        );
    }
}