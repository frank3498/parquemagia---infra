const attractions = [
  { id: "montana", name: "Montaña Rusa Mágica", desc: "Velocidad y vueltas increíbles", minAge: 10 },
  { id: "carrusel", name: "Carrusel Encantado", desc: "Ideal para los más pequeños", minAge: 0 },
  { id: "casa", name: "Casa del Misterio", desc: "Aventura con sorpresas", minAge: 8 },
  { id: "rueda", name: "Rueda Gigante", desc: "Vistas panorámicas del parque", minAge: 0 },
];

document.getElementById('year').textContent = new Date().getFullYear();
const list = document.getElementById('atracciones-list');
const select = document.getElementById('attractionSelect');

function renderAttractions(){
  list.innerHTML = '';
  select.innerHTML = '';
  attractions.forEach(a=>{
    // tarjetas
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `<h3>${a.name}</h3><p>${a.desc}</p><small>Edad mínima: ${a.minAge}</small>`;
    list.appendChild(card);
    // opciones
    const opt = document.createElement('option');
    opt.value = a.id;
    opt.textContent = a.name;
    select.appendChild(opt);
  });
}

document.getElementById('btnVerAtracciones').addEventListener('click', ()=>{
  document.getElementById('atracciones').scrollIntoView({behavior:'smooth'});
});

document.getElementById('formTicket').addEventListener('submit', async (e)=>{
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const age = parseInt(document.getElementById('age').value,10);
  const attractionId = select.value;
  const attraction = attractions.find(x=>x.id===attractionId);
  const resultDiv = document.getElementById('result');

  if(age < attraction.minAge){
    resultDiv.innerHTML = `<p style="color:crimson">Lo sentimos, edad mínima ${attraction.minAge} años para ${attraction.name}.</p>`;
    return;
  }

  // Simulación de llamada a backend (reservación demo)
  try{
    const res = await fetch('/api/reservar', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({name, age, attractionId})
    });
    const data = await res.json();
    if(res.ok){
      resultDiv.innerHTML = `<p style="color:green">${data.message}</p>`;
    } else {
      resultDiv.innerHTML = `<p style="color:crimson">Error: ${data.error || 'No se pudo reservar'}</p>`;
    }
  } catch(err){
    resultDiv.innerHTML = `<p style="color:crimson">Error de conexión: ${err.message}</p>`;
  }
});

renderAttractions();
