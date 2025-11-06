
  const rewards = [
    { id:1, title:"Baño Premium", desc:"Baño profesional y corte higiénico", cost:300, img:"https://images.unsplash.com/photo-1596495577886-d920f1fb7238?auto=format&fit=crop&w=600&q=60" },
    { id:2, title:"Collar Inteligente", desc:"Collar con sensor de actividad", cost:950, img:"https://images.unsplash.com/photo-1560807707-8cc77767d783?auto=format&fit=crop&w=600&q=60" },
    { id:3, title:"Consulta gratuita", desc:"Consulta veterinaria sin costo", cost:1000, img:"https://purina.com.co/sites/default/files/2022-10/purina-consulta-veterinaria-para-mascotas-lo-que-debes-saber.jpg" },
    { id:4, title:"Juguete interactivo", desc:"Pelota con sensor de movimiento", cost:450, img:"https://images.unsplash.com/photo-1592194996308-7b43878e84a6?auto=format&fit=crop&w=600&q=60" },
    { id:5, title:"Plan Vacunación Anual", desc:"Cobertura completa 12 meses", cost:1500, img:"https://www.animalshealth.es/fileuploads/news/perro-vacunacion-guia-mascota-veterinaria-216624624471.jpg" }
  ];

  const historial = [
    { fecha:"2025-06-03", nombre:"Cepillo profesional", puntos:400, estado:"Entregado" },
    { fecha:"2025-07-10", nombre:"Snack saludable (pack)", puntos:250, estado:"Pendiente" },
    { fecha:"2025-08-18", nombre:"Desparasitación (1 aplicación)", puntos:800, estado:"Entregado" }
  ];

  const grid = document.getElementById("rewardGrid");
  const histBody = document.getElementById("historialBody");

  function renderRewards(filter="all"){
    grid.innerHTML="";
    const filtered = rewards.filter(r=>{
      if(filter==="low") return r.cost<500;
      if(filter==="medium") return r.cost>=500 && r.cost<=1000;
      if(filter==="high") return r.cost>1000;
      return true;
    });
    filtered.forEach(r=>{
      const card = document.createElement("div");
      card.className="reward-card";
      card.innerHTML=`
        <img src="${r.img}" alt="${r.title}">
        <div class="info">
          <div>
            <h3>${r.title}</h3>
            <p>${r.desc}</p>
          </div>
          <div class="bottom">
            <div class="price">${r.cost} pts</div>
            <button class="btn" onclick="redeem(${r.id})">Canjear</button>
          </div>
        </div>`;
      grid.appendChild(card);
    });
  }

  function renderHistorial(){
    histBody.innerHTML="";
    historial.forEach(h=>{
      const tr=document.createElement("tr");
      tr.innerHTML=`<td>${h.fecha}</td><td>${h.nombre}</td><td>${h.puntos}</td><td>${h.estado}</td>`;
      histBody.appendChild(tr);
    });
  }

  function redeem(id){
    const reward = rewards.find(r=>r.id===id);
    if(!reward) return;
    const ok = confirm(`¿Deseas canjear "${reward.title}" por ${reward.cost} puntos?`);
    if(ok){
      alert("Canje registrado. Tu solicitud será procesada por la clínica.");
      historial.push({fecha:new Date().toISOString().split("T")[0], nombre:reward.title, puntos:reward.cost, estado:"Pendiente"});
      renderHistorial();
    }
  }

  // filtros
  document.querySelectorAll(".chip").forEach(ch=>{
    ch.addEventListener("click",()=>{
      document.querySelectorAll(".chip").forEach(c=>c.classList.remove("active"));
      ch.classList.add("active");
      renderRewards(ch.dataset.filter);
    });
  });

  document.getElementById("toggleHistorial").addEventListener("click",()=>{
    const hist=document.getElementById("historial");
    hist.style.display = hist.style.display==="block" ? "none" : "block";
  });

  // inicial
  renderRewards();
  renderHistorial();