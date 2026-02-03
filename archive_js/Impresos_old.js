// Archivo archivado: Impresos.js
// Contenido movido a archive para limpieza. Revisa antes de eliminar.

// Mostrar/Ocultar catálogo
const menuBtn = document.getElementById("menuBtn");
const dropdown = document.getElementById("dropdown");

if (menuBtn) {
  menuBtn.addEventListener("click", () => {
    dropdown.classList.toggle("show");
  });
}

// Modal de producto
function abrirModal(titulo, imagen, precio, descripcion) {
  document.getElementById("modalTitle").textContent = titulo;
  document.getElementById("modalImg").src = imagen;
  document.getElementById("modalDesc").textContent = descripcion;
  document.getElementById("modalPrice").textContent = precio;

  const btnWhatsApp = document.getElementById("btnWhatsApp");
  const mensaje = `Hola, estoy interesado en el producto: ${titulo} (${precio})`;
  btnWhatsApp.href = `https://wa.me/573183061147?text=${encodeURIComponent(mensaje)}`;

  document.getElementById("modal").style.display = "flex";
}

function cerrarModal() {
  document.getElementById("modal").style.display = "none";
}

// Cerrar modal al hacer clic fuera del contenido
window.onclick = function(event) {
  const modal = document.getElementById("modal");
  if (event.target === modal) modal.style.display = "none";
};
