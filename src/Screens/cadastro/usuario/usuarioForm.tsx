import "../../../css/usuario/usuarioForm.css";

import { Link } from "react-router-dom";

export default function usuarioForm() {
  return (
    <main className="usuarios-form-container">
        <div className="usuarios-form-header">
            <div>
                <h1>Criar Conta</h1>
            </div>
            <div>
                <p>Preencha os dados abaixos para se cadastrar na plataforma.</p>
            </div>
        </div>
        
        <div className="table-container">
            <table className="usuario-form-table ">
                <div className="UserForm-form">
                    <form>
                        <div>
                            <label htmlFor="name">Nome Completo</label>
                            <input
                                type="name"
                                id="name"
                                name="name"
                                placeholder="Digite seu nome"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="email">E-mail</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Digite seu e-mail"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="password">Senha</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Digite sua senha"
                                required
                            />
                        </div>
                        <button type="submit">
                            Entrar
                        </button>
                    </form>
                </div>
                <div className="UserForm-footer">
                    <p>
                        Já tem uma conta?{" "}
                        <Link className="no-underline" to="/UserLogin">
                            Entre aqui
                        </Link>
                    </p>
                </div>
            </table>
        </div>
    </main>
  );
}