window.onload = function() {
  const role = localStorage.getItem('role');

  // Si no hay rol, volver al login
  if (!role) {
    window.location.href = 'login.html';
    return;
  }

  // Si es doctor, ocultar "Agendar Cita"
  if (role === 'doctor') {
    const appointmentLink = document.querySelector('a[href="appointment.html"]');
    if (appointmentLink) appointmentLink.style.display = 'none';
  }

  // Mostrar el rol actual en el footer
  const footer = document.querySelector('.footer');
  footer.innerHTML += `<p>Rol actual: ${role}</p>`;
};

function logout() {
  const confirmLogout = confirm("¿Estás seguro que deseas cerrar sesión?");
  if (confirmLogout) {
    localStorage.removeItem('access_token');
    localStorage.removeItem('role');
    window.location.href = 'login.html';
  }
}
