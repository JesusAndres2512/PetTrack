import React, { useState } from "react";
import "../css/recompensas.css";

export default function Recompensas() {
  const rewards = [
    { id: 1, title: "Baño Premium", desc: "Baño profesional y corte higiénico", cost: 300, img: "https://images.unsplash.com/photo-1596495577886-d920f1fb7238?auto=format&fit=crop&w=600&q=60" },
    { id: 2, title: "Collar Inteligente", desc: "Collar con sensor de actividad", cost: 950, img: "https://images.unsplash.com/photo-1560807707-8cc77767d783?auto=format&fit=crop&w=600&q=60" },
    { id: 3, title: "Consulta gratuita", desc: "Consulta veterinaria sin costo", cost: 1000, img: "https://purina.com.co/sites/default/files/2022-10/purina-consulta-veterinaria-para-mascotas-lo-que-debes-saber.jpg" },
    { id: 4, title: "Juguete interactivo", desc: "Pelota con sensor de movimiento", cost: 450, img: "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?auto=format&fit=crop&w=600&q=60" },
    { id: 5, title: "Plan Vacunación Anual", desc: "Cobertura completa 12 meses", cost: 1500, img: "https://www.animalshealth.es/fileuploads/news/perro-vacunacion-guia-mascota-veterinaria-216624624471.jpg" }
  ];

  const [historial, setHistorial] = useState([
    { fecha: "2025-06-03", nombre: "Cepillo profesional", puntos: 400, estado: "Entregado" },
    { fecha: "2025-07-10", nombre: "Snack saludable (pack)", puntos: 250, estado: "Pendiente" },
    { fecha: "2025-08-18", nombre: "Desparasitación (1 aplicación)", puntos: 800, estado: "Entregado" }
  ]);

  const [filter, setFilter] = useState("all");
  const [mostrarHistorial, setMostrarHistorial] = useState(false);

  const filteredRewards = rewards.filter(r => {
    if (filter === "low") return r.cost < 500;
    if (filter === "medium") return r.cost >= 500 && r.cost <= 1000;
    if (filter === "high") return r.cost > 1000;
    return true;
  });

  const redeem = (id) => {
    const reward = rewards.find(r => r.id === id);
    if (!reward) return;
    const ok = window.confirm(`¿Deseas canjear "${reward.title}" por ${reward.cost} puntos?`);
    if (ok) {
      alert("Canje registrado. Tu solicitud será procesada por la clínica.");
      const nuevo = { fecha: new Date().toISOString().split("T")[0], nombre: reward.title, puntos: reward.cost, estado: "Pendiente" };
      setHistorial(prev => [...prev, nuevo]);
    }
  };

  return (
    <div>
      <header>
        <div className="logo">PT</div>
        <div>
          <h1>PetTrack — Fidelización y Recompensas</h1>
          <p className="subtitle">Gana puntos, canjéalos por premios y consulta tu historial.</p>
        </div>
      </header>

      <main>
        <section className="balance">
          <div className="coin">P</div>
          <div>
            <div className="muted">Saldo actual</div>
            <div className="points">1,460 pts</div>
            <div className="muted">Cliente: Ana Pérez</div>
          </div>
        </section>

        <section className="section">
          <h2>Catálogo de Recompensas</h2>
          <div className="filters">
            {["all", "low", "medium", "high"].map(f => (
              <div
                key={f}
                className={`chip ${filter === f ? "active" : ""}`}
                data-filter={f}
                onClick={() => setFilter(f)}
              >
                {f === "all" && "Todos"}
                {f === "low" && "Menos de 500 pts"}
                {f === "medium" && "500 - 1000 pts"}
                {f === "high" && "Más de 1000 pts"}
              </div>
            ))}
            <button className="btn secondary" onClick={() => setMostrarHistorial(!mostrarHistorial)}>
              {mostrarHistorial ? "Ocultar historial" : "Ver historial"}
            </button>
          </div>

          <div className="reward-grid">
            {filteredRewards.map(r => (
              <div className="reward-card" key={r.id}>
                <img src={r.img} alt={r.title} />
                <div className="info">
                  <div>
                    <h3>{r.title}</h3>
                    <p>{r.desc}</p>
                  </div>
                  <div className="bottom">
                    <div className="price">{r.cost} pts</div>
                    <button className="btn" onClick={() => redeem(r.id)}>Canjear</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {mostrarHistorial && (
            <div className="history" id="historial">
              <h2>Historial de Canjes</h2>
              <table>
                <thead>
                  <tr><th>Fecha</th><th>Recompensa</th><th>Puntos usados</th><th>Estado</th></tr>
                </thead>
                <tbody>
                  {historial.map((h, i) => (
                    <tr key={i}>
                      <td>{h.fecha}</td>
                      <td>{h.nombre}</td>
                      <td>{h.puntos}</td>
                      <td>{h.estado}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
