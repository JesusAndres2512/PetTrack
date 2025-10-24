document.getElementById('appointment-form').addEventListener('submit', async (e) => {
  e.preventDefault()
  const body = {
    pet_name: document.getElementById('pet_name').value,
    owner_name: document.getElementById('owner_name').value,
    date: document.getElementById('date').value,
    reason: document.getElementById('reason').value,
  }

  const res = await fetch('http://localhost:8001/appointments/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  })

  const data = await res.json()
  alert('Cita agendada con ID: ' + data.id)
})
