
       const API_URL = 'http://localhost:8002'; // o 8003 si es directo
document.getElementById('petForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const formData = {
        name: document.getElementById('name').value,
        species: document.getElementById('species').value,
        breed: document.getElementById('breed').value,
        birth_date: document.getElementById('birth_date').value,
        owner_name: document.getElementById('owner_name').value
    };
    const response = await fetch(`${API_URL}/pets/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
    });
    const result = await response.json();
    document.getElementById('response').textContent = JSON.stringify(result, null, 2);
});