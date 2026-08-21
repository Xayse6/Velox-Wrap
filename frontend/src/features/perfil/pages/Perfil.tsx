import "../css/Perfil.css";
import { useState } from "react";


interface Usuario {
    id:number;
    nome:string;
    email:string;
    tipo:string;
}

export default function Perfil(){

    const [usuario] = useState<Usuario | null>(()=>{


        const dados = localStorage.getItem("usuario");


        return dados 
            ? JSON.parse(dados)
            : null;


    });



    if(!usuario){

        return (

            <main className="perfil-container">

                <h1>
                    Usuário não encontrado
                </h1>

            </main>

        );

    }



    return (

        <main className="perfil-container">


            <section className="perfil-card">


                <div className="perfil-header">


                    <div className="avatar">

                        {usuario.nome
                            .charAt(0)
                            .toUpperCase()
                        }

                    </div>


                    <div>

                        <h1>
                            {usuario.nome}
                        </h1>


                        <p>
                            {usuario.tipo}
                        </p>

                    </div>


                </div>



                <div className="perfil-info">


                    <div>

                        <span>ID</span>

                        <strong>
                            {usuario.id}
                        </strong>

                    </div>



                    <div>

                        <span>Nome</span>

                        <strong>
                            {usuario.nome}
                        </strong>

                    </div>



                    <div>

                        <span>Email</span>

                        <strong>
                            {usuario.email}
                        </strong>

                    </div>



                    <div>

                        <span>Tipo</span>

                        <strong>
                            {usuario.tipo}
                        </strong>

                    </div>


                </div>


            </section>


        </main>

    );

}