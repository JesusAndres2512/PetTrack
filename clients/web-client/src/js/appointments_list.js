const API_URL = 'http://localhost:8002';

document.addEventListener('DOMContentLoaded', async () => {
  const container = document.getElementById('appointmentsContainer');

  try {
    const response = await fetch(`${API_URL}/appointments/`);
    const data = await response.json();

    if (response.ok) {
      if (data.length === 0) {
        container.innerHTML = '<p>No hay citas agendadas.</p>';
        return;
      }

      container.classList.remove('loading');
      container.innerHTML = '';

      data.forEach(cita => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
          <h3>${cita.pet_name}</h3>
          <p><strong>Dueño:</strong> ${cita.owner_name}</p>
          <p><strong>Fecha:</strong> ${new Date(cita.date).toLocaleString()}</p>
          <p><strong>Motivo:</strong> ${cita.reason}</p>
          <button onclick="window.location.href='appointment.html?id=${cita.id}'">Editar</button>
        `;
        container.appendChild(card);
      });
    } else {
      container.classList.remove('loading');
      container.innerHTML = `<p class="error">${data.detail || 'Error al cargar las citas'}</p>`;
    }

  } catch (error) {
    container.classList.remove('loading');
    container.innerHTML = '<p class="error">Error de conexión con el servidor</p>';
  }
});
