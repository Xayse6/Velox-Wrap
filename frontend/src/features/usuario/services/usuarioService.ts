import type {
    Usuario,
    DadosUsuario,
    DadosEditarUsuario,
} from "../types/user";


const API_URL =
"http://localhost:3000/api";


// pega token salvo no login
function getAuthHeaders(){

    const token =
    localStorage.getItem("token");


    return {
        "Content-Type":"application/json",

        Authorization:
        `Bearer ${token}`
    };

}



// ===============================
// LISTAR USUÁRIOS
// ===============================

export async function getUsuarios(): Promise<Usuario[]> {


    const response = await fetch(
        `${API_URL}/usuarios`,
        {
            headers:getAuthHeaders()
        }
    );


    if(!response.ok){

        const erro =
        await response.json();

        throw new Error(
            erro.mensagem ||
            "Erro ao buscar usuários"
        );

    }


    return response.json();

}




// ===============================
// BUSCAR USUÁRIO POR ID
// ===============================

export async function buscarUsuario(
    id:string
):Promise<Usuario>{


    const response =
    await fetch(
        `${API_URL}/usuarios/${id}`,
        {
            headers:getAuthHeaders()
        }
    );


    if(!response.ok){

        const erro =
        await response.json();


        throw new Error(
            erro.mensagem ||
            "Erro ao buscar usuário"
        );

    }


    return response.json();

}




// ===============================
// CADASTRAR USUÁRIO
// ===============================

export async function inserirUsuario(
    dados:DadosUsuario
):Promise<Usuario>{


    const response =
    await fetch(
        `${API_URL}/usuarios`,
        {

            method:"POST",

            headers:{
                "Content-Type":
                "application/json"
            },

            body:
            JSON.stringify(dados)

        }
    );


    if(!response.ok){

        const erro =
        await response.json();


        throw new Error(
            erro.mensagem ||
            "Erro ao cadastrar usuário"
        );

    }


    return response.json();

}





// ===============================
// EDITAR USUÁRIO
// ===============================

export async function editarUsuario(
    id:string,
    dados:DadosEditarUsuario
):Promise<Usuario>{


    const response =
    await fetch(
        `${API_URL}/usuarios/${id}`,
        {

            method:"PUT",

            headers:
            getAuthHeaders(),

            body:
            JSON.stringify(dados)

        }
    );


    if(!response.ok){

        const erro =
        await response.json();


        throw new Error(
            erro.mensagem ||
            "Erro ao atualizar usuário"
        );

    }


    return response.json();

}





// ===============================
// EXCLUIR USUÁRIO
// ===============================

export async function deleteUsuario(
    id:number
):Promise<void>{


    const response =
    await fetch(
        `${API_URL}/usuarios/${id}`,
        {

            method:"DELETE",

            headers:
            getAuthHeaders()

        }
    );


    if(!response.ok){

        const erro =
        await response.json();


        throw new Error(
            erro.mensagem ||
            "Erro ao excluir usuário"
        );

    }

}