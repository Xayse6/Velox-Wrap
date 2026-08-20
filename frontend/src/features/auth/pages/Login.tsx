import "../css/Login.css";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import api from "../../../service/api";


export default function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const [carregando, setCarregando] = useState(false);
    const [mensagem, setMensagem] = useState("");


    async function handleSubmit(
        event: React.FormEvent<HTMLFormElement>
    ) {

        event.preventDefault();

        setCarregando(true);
        setMensagem("");

        try {

            const resposta = await api.post("/login", {
                email,
                senha
            });


localStorage.setItem(
    "token",
    resposta.data.token
);

localStorage.setItem(
    "usuario",
    JSON.stringify(resposta.data.usuario)
);

window.dispatchEvent(new Event("login"));

navigate("/");


            setMensagem(
                "Login realizado com sucesso"
            );


            navigate("/");


        } catch (error) {

    console.error(
        "Erro no login:",
        error
    );

    setMensagem(
        "Email ou senha inválidos"
    );

} finally {

            setCarregando(false);

        }
    }


    return (

        <main className="login-form-container">


            <div className="login-form-header">

                <h1>
                    Login
                </h1>

                <p>
                    Entre na plataforma Velox Wrap
                </p>

            </div>



            <div className="login-form-table">


                {mensagem && (

                    <div className="mensagem">

                        {mensagem}

                    </div>

                )}



                <div className="login-form">


                    <form onSubmit={handleSubmit}>


                        <div>

                            <label htmlFor="email">
                                E-mail
                            </label>


                            <input

                                type="email"

                                id="email"

                                placeholder="Digite seu e-mail"

                                value={email}

                                onChange={(event) =>
                                    setEmail(
                                        event.target.value
                                    )
                                }

                                required

                            />

                        </div>



                        <div>

                            <label htmlFor="senha">
                                Senha
                            </label>


                            <input

                                type="password"

                                id="senha"

                                placeholder="Digite sua senha"

                                value={senha}

                                onChange={(event) =>
                                    setSenha(
                                        event.target.value
                                    )
                                }

                                required

                            />

                        </div>



                        <button

                            type="submit"

                            disabled={carregando}

                        >

                            {carregando
                                ? "Entrando..."
                                : "Entrar"
                            }

                        </button>



                    </form>


                </div>




                <div className="login-footer">

                    <p>

                        Ainda não tem conta?{" "}

                        <Link

                            className="no-underline"

                            to="/cadastro"

                        >

                            Criar conta

                        </Link>

                    </p>


                </div>


            </div>


        </main>

    );

}