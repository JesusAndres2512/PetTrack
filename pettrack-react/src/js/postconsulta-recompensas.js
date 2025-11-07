const followData = [
  { id:1, pet:"Rocky — Ana Pérez", type:"Seguimiento de recuperación", date:"2025-05-12", time:"10:00", status:"Pendiente", notes:"Revisar sutura", pointsOnComplete:100 },
  { id:2, pet:"Luna — Carlos R.", type:"Vacunación programada", date:"2025-06-02", time:"16:30", status:"Enviado recordatorio", notes:"Vacuna antirrábica", pointsOnComplete:100 },
  { id:3, pet:"Milo — Laura S.", type:"Encuesta de satisfacción", date:"2025-04-30", time:"09:00", status:"Completado", notes:"Excelente recuperación", pointsOnComplete:30 }
];

const rewards = [
  { id:1, title:"Cepillo profesional", desc:"Cepillo ergonómico para perros mediano/grande.", cost:400, img:"https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&w=600&q=60" },
  { id:2, title:"Desparasitación (1 aplicación)", desc:"Servicio en clínica, incluye revisión.", cost:800, img:"https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=600&q=60" },
  { id:3, title:"Snack saludable (pack)", desc:"Pack de snacks naturales para mascotas.", cost:250, img:"https://www.shutterstock.com/shutterstock/photos/479587543/display_1500/stock-photo-healthy-dog-food-isolated-on-white-479587543.jpg" }
];

const followList = document.getElementById('followList');
const rewardList = document.getElementById('rewardList');

function renderFollows() {
  followList.innerHTML = "";
  followData.sort((a,b)=> a.status === "Pendiente" ? -1 : 1).forEach(f=>{
    const item = document.createElement('div');
    item.className = 'follow-item';
    item.innerHTML = `
      <div class="avatar">${(f.pet.split(' ')[0]||'M').slice(0,2).toUpperCase()}</div>
      <div class="meta">
        <h3>${f.pet}</h3>
        <p>${f.type} • ${f.date} ${f.time}</p>
        <div class="tag">${f.notes}</div>
      </div>
      <div class="right-actions">
        <div class="${f.status === 'Completado' ? 'pill' : 'danger-pill'}">${f.status}</div>
        <div style="display:flex;gap:8px;margin-top:6px">
          <button class="btn secondary small" onclick="openSurvey(${f.id})">Enviar encuesta</button>
          <button class="btn small" onclick="markComplete(${f.id})">Marcar completado</button>
        </div>
      </div>`;
    followList.appendChild(item);
  });
}

function renderRewards() {
  rewardList.innerHTML = "";
  rewards.forEach(r=>{
    const c = document.createElement('div');
    c.className = 'reward-card';
    c.innerHTML = `
      <img src="${r.img}" alt="${r.title}" />
      <div class="info">
        <div style="display:flex;justify-content:space-between;align-items:center">
          <div>
            <div style="font-weight:800">${r.title}</div>
            <div style="color:var(--muted);font-size:13px">${r}.desc}</div>
          </div>
          <div style="font-weight:800;color:var(--primary)">${r.cost} pts</div>
        </div>
        <button class="btn" onclick="redeem(${r.id})">Canjear</button>
      </div>`;
    rewardList.appendChild(c);
  });
}
