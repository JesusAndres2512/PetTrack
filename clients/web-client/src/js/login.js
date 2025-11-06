const API_URL = 'http://localhost:8002/auth';

async function login(event) {
  event.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (response.ok) {
      // Guardar token JWT y rol en localStorage
      localStorage.setItem('access_token', data.access_token);

      // Decodificar JWT para obtener el rol
      const payload = JSON.parse(atob(data.access_token.split('.')[1]));
      localStorage.setItem('role', payload.role);

      // Redirigir automáticamente al menú
      window.location.href = 'menu.html';
    } else {
      document.getElementById('error-message').textContent =
        data.detail || 'Credenciales incorrectas';
    }
  } catch (error) {
    document.getElementById('error-message').textContent =
      'Error de conexión con el servidor';
  }
}
