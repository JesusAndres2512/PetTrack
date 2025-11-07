/* register.js */
    const API_URL = 'http://localhost:8002/auth';

    document.getElementById('registerForm').addEventListener('submit', async function (e) {
      e.preventDefault();

      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const full_name = document.getElementById('full_name').value;
      const role = document.getElementById('role').value;

      try {
        const response = await fetch(`${API_URL}/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password, full_name, role })
        });

        const data = await response.json();

        if (response.ok) {
          alert('Registro exitoso. Ahora puedes iniciar sesión');
          window.location.href = 'login.html';
        } else {
          document.getElementById('error-message').textContent =
            data.detail || 'Error al registrar';
        }
      } catch (error) {
        document.getElementById('error-message').textContent =
          'No se pudo conectar al servidor';
      }
    });
