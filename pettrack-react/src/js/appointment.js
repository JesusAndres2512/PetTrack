const API_URL = 'http://localhost:8002';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('appointmentForm');
  const msg = document.getElementById('msg');
  const goToList = document.getElementById('goToList');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const pet_name = document.getElementById('pet_name').value.trim();
    const owner_name = document.getElementById('owner_name').value.trim();
    const date = document.getElementById('date').value;
    const reason = document.getElementById('reason').value.trim();

    if (!pet_name || !owner_name || !date || !reason) {
      msg.textContent = 'Por favor completa todos los campos.';
      msg.classList.add('error');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/appointments/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ pet_name, owner_name, date, reason })
      });

      const data = await response.json();

      if (response.ok) {
        msg.textContent = 'Cita guardada exitosamente';
        msg.classList.remove('error');
        form.reset();
      } else {
        msg.textContent = data.detail || 'Error al guardar la cita';
        msg.classList.add('error');
      }
    } catch (error) {
      msg.textContent = 'Error de conexión con el servidor';
      msg.classList.add('error');
    }
  });

  goToList.addEventListener('click', () => {
    window.location.href = 'appointments_list.html';
  });
});
