import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/postconsulta-recompensas.css";

const PostconsultaRecompensas = () => {
  const navigate = useNavigate();

  // -----------------------------
  // ESTADOS PRINCIPALES
  // -----------------------------
  const [followData, setFollowData] = useState([
    { id: 1, pet: "Rocky — Ana Pérez", type: "Seguimiento de recuperación", date: "2025-05-12", time: "10:00", status: "Pendiente", notes: "Revisar sutura", pointsOnComplete: 100 },
    { id: 2, pet: "Luna — Carlos R.", type: "Vacunación programada", date: "2025-06-02", time: "16:30", status: "Enviado recordatorio", notes: "Vacuna antirrábica", pointsOnComplete: 100 },
    { id: 3, pet: "Milo — Laura S.", type: "Encuesta de satisfacción", date: "2025-04-30", time: "09:00", status: "Completado", notes: "Excelente recuperación", pointsOnComplete: 30 },
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  // -----------------------------
  // ESTADOS PARA MODALES
  // -----------------------------
  const [showNewFollowModal, setShowNewFollowModal] = useState(false);
  const [showSurveyModal, setShowSurveyModal] = useState(false);
  const [selectedFollow, setSelectedFollow] = useState(null);

  const [newFollow, setNewFollow] = useState({
    pet: "",
    owner: "",
    type: "",
    date: "",
    time: "",
  });

  const [surveyData, setSurveyData] = useState({ rating: "", comment: "" });

  const rewards = [
    { id: 1, title: "Cepillo profesional", desc: "Cepillo ergonómico para perros mediano/grande.", cost: 400, img: "https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&w=600&q=60" },
    { id: 2, title: "Desparasitación (1 aplicación)", desc: "Servicio en clínica, incluye revisión.", cost: 800, img: "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=600&q=60" },
    { id: 3, title: "Snack saludable (pack)", desc: "Pack de snacks naturales para mascotas.", cost: 250, img: "https://www.shutterstock.com/shutterstock/photos/479587543/display_1500/stock-photo-healthy-dog-food-isolated-on-white-479587543.jpg" },
  ];

  // -----------------------------
  // FUNCIONES PRINCIPALES
  // -----------------------------
  const handleSearchChange = (e) => setSearchTerm(e.target.value.toLowerCase());

  const filteredFollowData = followData.filter(f => {
    const matchesSearch = f.pet.toLowerCase().includes(searchTerm)
      || f.type.toLowerCase().includes(searchTerm)
      || f.status.toLowerCase().includes(searchTerm);
    const matchesFilter = filterStatus ? f.status === filterStatus : true;
    return matchesSearch && matchesFilter;
  });

  const markComplete = (id) => {
    setFollowData(followData.map(f => f.id === id ? { ...f, status: "Completado" } : f));
  };

  const handleFilter = () => {
    const status = prompt("Filtrar por estado (Pendiente, Enviado recordatorio, Completado):");
    if (status) setFilterStatus(status);
  };

  const handleOpenNewFollow = () => {
    setShowNewFollowModal(true);
    setNewFollow({ pet: "", owner: "", type: "", date: "", time: "" });
  };

  const handleSaveNewFollow = () => {
    const { pet, owner, type, date, time } = newFollow;
    if (!pet || !owner || !type || !date || !time) {
      alert("Por favor, completa todos los campos.");
      return;
    }
    const newItem = {
      id: Date.now(),
      pet: `${pet} — ${owner}`,
      type,
      date,
      time,
      status: "Pendiente",
      notes: "Nuevo seguimiento",
      pointsOnComplete: 50
    };
    setFollowData([...followData, newItem]);
    setShowNewFollowModal(false);
  };

  const handleOpenSurvey = (follow) => {
    setSelectedFollow(follow);
    setSurveyData({ rating: "", comment: "" });
    setShowSurveyModal(true);
  };

  const handleSaveSurvey = () => {
    const { rating, comment } = surveyData;
    if (!rating) {
      alert("Por favor, selecciona una calificación.");
      return;
    }
    setFollowData(followData.map(f =>
      f.id === selectedFollow.id
        ? { ...f, notes: `⭐ ${rating} estrellas — ${comment || "Sin comentario"}` }
        : f
    ));
    setShowSurveyModal(false);
    alert("Gracias por tu valoración 😊");
  };

  // -----------------------------
  // RENDER
  // -----------------------------
  return (
    <div className="app postconsulta">
      <header>
        <div className="logo">PT</div>
        <div>
          <h1>PetTrack — Seguimiento Post-Consulta & Recompensas</h1>
          <p>Automatiza el seguimiento posterior y fideliza a tus clientes con puntos y premios.</p>
        </div>
      </header>

      <main className="card seguimiento">
        <h2>Seguimiento Post-Consulta</h2>
        <div className="controls">
          <input
            id="search"
            type="search"
            placeholder="Buscar por mascota, dueño o estado..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button className="btn small" onClick={handleOpenNewFollow}>+ Nuevo seguimiento</button>
          <button className="btn secondary small" onClick={handleFilter}>Filtrar</button>
        </div>

        <section className="follow-list">
          {filteredFollowData.map(f => (
            <div key={f.id} className="follow-item">
              <div className="avatar">{f.pet.slice(0, 2).toUpperCase()}</div>
              <div className="meta">
                <h3>{f.pet}</h3>
                <p>{f.type} • {f.date} {f.time}</p>
                <div className="tag">{f.notes}</div>
              </div>
              <div className="right-actions">
                <div className={f.status === "Completado" ? "pill" : "danger-pill"}>{f.status}</div>
                <div style={{ display: "flex", gap: "8px", marginTop: "6px" }}>
                  <button className="btn secondary small" onClick={() => handleOpenSurvey(f)}>Encuesta</button>
                  <button className="btn small" onClick={() => markComplete(f.id)}>Completado</button>
                </div>
              </div>
            </div>
          ))}
        </section>

        <button className="btn" style={{ marginTop: "10px" }} onClick={() => navigate("/recompensas")}>
          Ver catálogo de recompensas →
        </button>
      </main>

      <aside className="card rewards">
        <h2>Fidelización y Recompensas</h2>
        <p className="muted">Puntos acumulados y catálogo de premios</p>

        <div className="balance">
          <div className="coin">P</div>
          <div>
            <div style={{ fontSize: "13px", color: "var(--muted)" }}>Saldo de puntos</div>
            <div style={{ fontSize: "22px", fontWeight: "800" }}>
              1,460 <span style={{ fontSize: "13px", color: "var(--muted)", fontWeight: "600" }}>pts</span>
            </div>
          </div>
        </div>

        <div className="reward-list">
          {rewards.map(r => (
            <div key={r.id} className="reward-card">
              <img src={r.img} alt={r.title} />
              <div className="info">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontWeight: "800" }}>{r.title}</div>
                    <div style={{ color: "var(--muted)", fontSize: "13px" }}>{r.desc}</div>
                  </div>
                  <div style={{ fontWeight: "800", color: "var(--primary)" }}>{r.cost} pts</div>
                </div>
                <button className="btn">Canjear</button>
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* -----------------------------
            MODAL NUEVO SEGUIMIENTO
          ----------------------------- */}
      {showNewFollowModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Nuevo seguimiento</h3>
            <input type="text" placeholder="Nombre de la mascota" value={newFollow.pet} onChange={(e) => setNewFollow({ ...newFollow, pet: e.target.value })} />
            <input type="text" placeholder="Nombre del dueño" value={newFollow.owner} onChange={(e) => setNewFollow({ ...newFollow, owner: e.target.value })} />
            <input type="text" placeholder="Proceso o tipo de seguimiento" value={newFollow.type} onChange={(e) => setNewFollow({ ...newFollow, type: e.target.value })} />
            <input type="date" value={newFollow.date} onChange={(e) => setNewFollow({ ...newFollow, date: e.target.value })} />
            <input type="time" value={newFollow.time} onChange={(e) => setNewFollow({ ...newFollow, time: e.target.value })} />

            <div className="modal-actions">
              <button className="btn secondary" onClick={() => setShowNewFollowModal(false)}>Cancelar</button>
              <button className="btn" onClick={handleSaveNewFollow}>Guardar</button>
            </div>
          </div>
        </div>
      )}

      {/* -----------------------------
            MODAL ENCUESTA
          ----------------------------- */}
      {showSurveyModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Encuesta de satisfacción</h3>
            <label>Calificación (1 a 5 estrellas):</label>
            <select value={surveyData.rating} onChange={(e) => setSurveyData({ ...surveyData, rating: e.target.value })}>
              <option value="">Seleccionar...</option>
              {[1, 2, 3, 4, 5].map(n => (
                <option key={n} value={n}>{n} ⭐</option>
              ))}
            </select>
            <textarea
              placeholder="Comentarios adicionales..."
              value={surveyData.comment}
              onChange={(e) => setSurveyData({ ...surveyData, comment: e.target.value })}
            />
            <div className="modal-actions">
              <button className="btn secondary" onClick={() => setShowSurveyModal(false)}>Cancelar</button>
              <button className="btn" onClick={handleSaveSurvey}>Enviar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostconsultaRecompensas;
