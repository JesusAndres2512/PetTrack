import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/recompensas.css"; // ✅ reutilizamos el mismo estilo moderno

export default function RewardsUsers() {
  const [rewards, setRewards] = useState([]);
  const [historial, setHistorial] = useState([]);
  const [filter, setFilter] = useState("all");
  const [mostrarHistorial, setMostrarHistorial] = useState(false);
  const userId = "user123"; // 🔹 luego reemplázalo con el usuario autenticado

  // 📥 Obtener catálogo de recompensas desde el backend
  useEffect(() => {
    axios
      .get("http://localhost:8004/rewards")
      .then((res) => setRewards(res.data))
      .catch((err) => console.error("Error al obtener recompensas:", err));
  }, []);

  // 📜 Obtener historial de canjes
  useEffect(() => {
    if (mostrarHistorial) {
      axios
        .get(`http://localhost:8004/redemptions/${userId}`)
        .then((res) => setHistorial(res.data))
        .catch((err) => console.error("Error al obtener historial:", err));
    }
  }, [mostrarHistorial]);

  // 🏅 Registrar canje
  const redeem = (id, title, cost) => {
    const ok = window.confirm(`¿Deseas canjear "${title}" por ${cost} puntos?`);
    if (!ok) return;

    axios
      .post("http://localhost:8004/redeem", {
        user_id: userId,
        reward_id: id,
        reward_name: title,
        points: cost,
      })
      .then(() => alert("🎉 Canje registrado con éxito."))
      .catch(() => alert("❌ Error al registrar el canje."));
  };

  // 🔎 Filtro de recompensas
  const filteredRewards = rewards.filter((r) => {
    if (filter === "low") return r.cost < 500;
    if (filter === "medium") return r.cost >= 500 && r.cost <= 1000;
    if (filter === "high") return r.cost > 1000;
    return true;
  });

  return (
    <div>
      {/* 🔹 Header superior */}
      <header>
        <div className="logo">PT</div>
        <div>
          <h1>PetTrack — Fidelización y Recompensas</h1>
          <p className="subtitle">
            Gana puntos, canjéalos por premios y consulta tu historial.
          </p>
        </div>
      </header>

      <main>
        {/* 🔸 Bloque de saldo */}
        <section className="balance">
          <div className="coin">P</div>
          <div>
            <div className="muted">Saldo actual</div>
            <div className="points">1,460 pts</div>
            <div className="muted">Cliente: Ana Pérez</div>
          </div>
        </section>

        {/* 🔸 Catálogo */}
        <section className="section">
          <h2>Catálogo de Recompensas</h2>

          <div className="filters">
            {["all", "low", "medium", "high"].map((f) => (
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

            <button
              className="btn secondary"
              onClick={() => setMostrarHistorial(!mostrarHistorial)}
            >
              {mostrarHistorial ? "Ocultar historial" : "Ver historial"}
            </button>
          </div>

          {/* 🏆 Grid de recompensas */}
          <div className="reward-grid">
            {filteredRewards.map((r) => (
              <div className="reward-card" key={r.id}>
                <img src={r.img} alt={r.title} />
                <div className="info">
                  <div>
                    <h3>{r.title}</h3>
                    <p>{r.desc}</p>
                  </div>
                  <div className="bottom">
                    <div className="price">{r.cost} pts</div>
                    <button className="btn" onClick={() => redeem(r.id, r.title, r.cost)}>
                      Canjear
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 📜 Historial de canjes */}
          {mostrarHistorial && (
            <div className="history" id="historial">
              <h2>Historial de Canjes</h2>
              <table>
                <thead>
                  <tr>
                    <th>Fecha</th>
                    <th>Recompensa</th>
                    <th>Puntos usados</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {historial.map((h, i) => (
                    <tr key={i}>
                      <td>{new Date(h.created_at).toLocaleDateString()}</td>
                      <td>{h.reward_name}</td>
                      <td>{h.points}</td>
                      <td>{h.status}</td>
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
