const materias = [
  { id: "intro", nombre: "Intro al Diseño", previas: [] },
  { id: "taller1", nombre: "Taller I", previas: ["intro"] },
  { id: "textil1", nombre: "Textil Básico", previas: ["intro"] },
  { id: "taller2", nombre: "Taller II", previas: ["taller1", "textil1"] }
];

const aprobadas = JSON.parse(localStorage.getItem("aprobadas")) || [];

function render() {
  const container = document.getElementById("materias");
  container.innerHTML = "";

  materias.forEach(m => {
    const btn = document.createElement("button");
    btn.textContent = m.nombre;

    const previasCumplidas = m.previas.every(p => aprobadas.includes(p));

    if (aprobadas.includes(m.id)) {
      btn.className = "approved";
      btn.textContent += " ✅";
    } else if (previasCumplidas) {
      btn.className = "available";
      btn.onclick = () => {
        aprobadas.push(m.id);
        localStorage.setItem("aprobadas", JSON.stringify(aprobadas));
        render();
      };
    } else {
      btn.className = "locked";
      btn.disabled = true;
    }

    container.appendChild(btn);
  });
}

render();
