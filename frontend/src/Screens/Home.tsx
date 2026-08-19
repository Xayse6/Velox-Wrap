import "../css/Home.css"

export default function home (){
    return(
        <div className="home-page">
            <div className="home-itens">
                <div className="home-txt">
                    <h1>Bem-vindo à Screens!</h1>
                    <p>Esta é uma página inicial criada para testar a estrutura, 
                            o layout e a responsividade do sistema.
                        Aqui você poderá encontrar informações importantes, acessar as principais funcionalidades e 
                            navegar entre as diferentes páginas da aplicação.
                        Teste de conteúdo: este texto serve apenas como exemplo para verificar espaçamentos, alinhamento, 
                            cores, tamanho das fontes e comportamento da página em diferentes tamanhos de tela.
                        Em breve, este espaço poderá receber conteúdos reais, como informações do sistema, indicadores, 
                            avisos e outras funcionalidades.
                    </p>
                </div>
            </div>
        </div>
    );
}