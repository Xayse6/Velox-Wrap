import '../fragments/css/App.css'

function App() {


return (
    <>
      <nav className="side-nav">
        <div className="side-header">
          <div className="logo-box">
          </div>

          <div>
            <h1>Emerald Hills</h1>
            <p>Sector 7-B</p>
          </div>
        </div>

        <div className="nav-links">

          <a className="nav-link" href="#">
            <span>Dashboard</span>
          </a>

          <a className="nav-link" href="#">
            <span>Live Map</span>
          </a>

          <a className="nav-link active" href="#">
            <span>Herd Profile</span>
          </a>

          <a className="nav-link" href="#">
            <span>Analytics</span>
          </a>
        </div>

        <div className="side-footer">
          <button className="add-animal-button">
            Add New Animal
          </button>

          <a className="footer-link" href="#">
            <span>Help Center</span>
          </a>

          <a className="footer-link" href="#">
            <span>Log Out</span>
          </a>
        </div>
      </nav>

      <main className="main-content">

        <header className="top-nav">
          <div className="top-left">

            <div className="search-box">
              <input
                type="text"
                placeholder="Buscar em AgroPulse Pro..."
              />
            </div>

            <h1 className="mobile-brand">AgroPulse Pro</h1>
          </div>

          <div className="top-actions">
            <div className="profile-image">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDzParzxpojdOwI7sWZ0kVcB5INkMztX31m-kPKXGKEcq4GLlmM02G5Kegg26dmZusxjrSWvb-2pEXhEu2UgL3IkYjNnKQ4jPNmy1tbgz-__W7z8IYtveoKQKOvQNeCxndtjNZQ-NGkojr9aWo0AkBsIAovZW6gXNyeUPgS9ZDiEJqsssY4oeL7e1jE5PYMnZm-MLeLZ7Oa5dlZQyQAml4rRZi9KX5fLYUE7odgGr7kTh5RO1Z0AofRbQ"
                alt="Ranch Manager Profile"
              />
            </div>
          </div>
        </header>

        <div className="canvas">
          <div className="content-container">
            
            <div className="page-header">
              <div>
                <div className="breadcrumbs">
                  <a href="#">Herd Profile</a>

                  <span className="current">
                    Brahman #402
                  </span>
                </div>

                <h2 className="page-title">
                  Animal #402

                  <span className="status-badge">
                    SAUDÁVEL
                  </span>
                </h2>
              </div>
            </div>

            <div className="bento-grid">
              <div className="identity-card card">
                <div className="animal-image-container">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCJlOj0OkDhjktF4eLDTbM4iiow1y3UzWEoz0toIKR6dKpko33XisTuiloMI0yd1hhbID95Zabc1MG-EwKuu-HoTabT8HILwUMb3XakvB3PBEHDRhjBy_9KzbNy2yBZrPTPPepKEkqAn7vLZfV88E-8Nym6_dSdbj21Rvdz1v8CJgnk1UDNEqMfBnmjZ1r62kuqzkYrg0epOQYYLnh5UHleZrqyXS-l05t-hWp6KgZhSVtDPmAljugJEg"
                    alt="Brahman #402"
                  />

                  <div className="location-badge">
                    Setor 7-B
                  </div>
                </div>

                <div className="identity-content">

                  <h3 className="section-title">
                    Detalhes de Identificação
                  </h3>

                  <dl className="details-grid">

                    <div>
                      <dt>Raça</dt>
                      <dd>Brahman</dd>
                    </div>

                    <div>
                      <dt>Idade</dt>
                      <dd>24 meses</dd>
                    </div>

                    <div>
                      <dt>Peso Atual</dt>
                      <dd className="weight">
                        450 <span>kg</span>
                      </dd>
                    </div>

                    <div>
                      <dt>Ganho Médio</dt>
                      <dd className="gain">
                        +1.2 kg/dia
                      </dd>
                    </div>

                  </dl>

                  <div className="card-actions">
                    <button className="primary-button">
                      Registrar Vacina
                    </button>

                    <button className="secondary-button">
                      Mover de Setor
                    </button>
                  </div>
                </div>
              </div>

              <div className="right-column">
                <div className="card chart-card">

                  <div className="card-header">
                    <h3 className="section-title no-border">
                      Histórico de Peso
                    </h3>

                    <select>
                      <option>Últimos 12 meses</option>
                      <option>Últimos 6 meses</option>
                      <option>Desde o nascimento</option>
                    </select>
                  </div>

                  <div className="chart-area">

                    <div className="y-axis">
                      <span>500</span>
                      <span>400</span>
                      <span>300</span>
                      <span>200</span>
                      <span>0</span>
                    </div>

                    <svg
                      className="weight-chart"
                      preserveAspectRatio="none"
                      viewBox="0 0 100 100"
                    >
                      <defs>
                        <linearGradient
                          id="gradientPrimary"
                          x1="0"
                          x2="0"
                          y1="0"
                          y2="1"
                        >
                          <stop
                            offset="0%"
                            stopColor="#012d1d"
                            stopOpacity="0.2"
                          />

                          <stop
                            offset="100%"
                            stopColor="#012d1d"
                            stopOpacity="0"
                          />
                        </linearGradient>
                      </defs>

                      <line
                        stroke="#e0e3e5"
                        strokeDasharray="2,2"
                        strokeWidth="0.5"
                        x1="0"
                        x2="100"
                        y1="20"
                        y2="20"
                      />

                      <line
                        stroke="#e0e3e5"
                        strokeDasharray="2,2"
                        strokeWidth="0.5"
                        x1="0"
                        x2="100"
                        y1="40"
                        y2="40"
                      />

                      <line
                        stroke="#e0e3e5"
                        strokeDasharray="2,2"
                        strokeWidth="0.5"
                        x1="0"
                        x2="100"
                        y1="60"
                        y2="60"
                      />

                      <line
                        stroke="#e0e3e5"
                        strokeDasharray="2,2"
                        strokeWidth="0.5"
                        x1="0"
                        x2="100"
                        y1="80"
                        y2="80"
                      />

                      <polygon
                        fill="url(#gradientPrimary)"
                        points="0,80 10,75 20,68 30,60 40,55 50,48 60,40 70,30 80,22 90,15 100,10 100,100 0,100"
                      />

                      <polyline
                        fill="none"
                        points="0,80 10,75 20,68 30,60 40,55 50,48 60,40 70,30 80,22 90,15 100,10"
                        stroke="#012d1d"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                      />

                      <circle
                        cx="100"
                        cy="10"
                        fill="#ffffff"
                        r="2.5"
                        stroke="#012d1d"
                        strokeWidth="1.5"
                      />
                    </svg>

                    <div className="x-axis">
                      <span>Jan</span>
                      <span>Mar</span>
                      <span>Mai</span>
                      <span>Jul</span>
                      <span>Set</span>
                      <span>Nov</span>
                    </div>
                  </div>
                </div>

                <div className="card timeline-card">

                  <div className="card-header">
                    <h3 className="section-title no-border">
                      Linha do Tempo de Saúde
                    </h3>

                    <button className="history-button">
                      Ver Histórico Completo
                    </button>
                  </div>

                  <div className="timeline">

                    <div className="timeline-item">

                      <div className="timeline-dot health">
                        <div />
                      </div>

                      <div className="timeline-content">

                        <div className="timeline-main">
                          <div>
                            <h4>
                              Último Check-up Veterinário
                            </h4>

                            <p>
                              Exame clínico geral. Animal apresenta
                              excelente escore corporal (EC 4.0).
                              Nenhuma anomalia detectada.
                            </p>
                          </div>

                          <span className="date">
                            12 Out 2023
                          </span>
                        </div>

                        <div className="doctor">
                          <span>
                            Dr. Carlos Mendes
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="timeline-item">

                      <div className="timeline-dot vaccine">
                        <div />
                      </div>

                      <div className="timeline-content">

                        <div className="timeline-main">
                          <div>
                            <h4>
                              Vacinação Contra Aftosa
                            </h4>

                            <p>
                              Dose reforço aplicada. Lote vacina:
                              AF-2023-B. Sem reações adversas reportadas.
                            </p>
                          </div>

                          <span className="date">
                            28 Set 2023
                          </span>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>

              </div>
            </div>

            <div className="bottom-spacer" />
          </div>
        </div>
      </main>
      <nav className="mobile-nav">

        <a href="#">

          <span>Dashboard</span>
        </a>

        <a href="#">

          <span>Map</span>
        </a>

        <a href="#" className="mobile-nav-active">
          <div>

          </div>
          <span>Herd</span>
        </a>

        <a href="#">

          <span>Analytics</span>
        </a>

      </nav>
    </>
  );
}

export default App
