// Product data and behaviors (moved from productos.html)
// Base de datos de productos
const productos = {
  // BOLSAS
  1: {
    nombre: 'Bio-Origing Pack',
    imagenes: ['img/bolsas2.jpeg', 'img/bolsas3.jpeg', 'img/bolsas4.jpeg', 'img/bolsas5.jpeg', 'img/bolsas6.jpeg', 'img/bolsas7.jpeg', 'img/bolsas1.jpeg'],
    descripcion: 'Materiales: Kraft natural, Bagazo de caña y Bond de alta resistencia.;Barrera Pro: Interior trilaminado (metalizado) contra luz, oxígeno y humedad.;Sellado: Compatibles con termosellado para máxima seguridad.;Impresión a 1 Tinta (Minimalista/Económica).;Impresión Full Color (Impacto total).;Opcional Premium: Adición de Peel Stick (re-sellable) para abrir y cerrar el empaque múltiples veces (costo adicional).;Perfil: 100% ecológicas, ideales para tostadores y emprendimientos.',
    descripcion_larga: ''
  },
  2: {
    nombre: 'Cajas Plegadizas Packaging',
    imagenes: [ 'img/cajaabigail1.jpeg','img/cajaabigail2.jpeg','img/cajaabigail3.jpeg','img/cajaabigail4.jpeg'],
    descripcion: 'Materiales a la Medida;Cajas en Maule de distintos calibres para máxima protección.;Línea Bio-Sostenible: Opciones en Ibema (fibras maderables naturales) y EarthPact (100% fibra de bagazo de caña). Ecología real y certificada.;Impresión y Acabados;Impresión de alta fidelidad desde 1 tinta hasta Full Color.;Terminados de lujo para diferenciarte: Estampados metalizados, brillos UV sectorizados y plastificados.',
    descripcion_larga: ''
  },
  3: {
    nombre: 'Bolsas De Alto Calibre',
    imagenes: ['img/BOLSASDEALTOCALIBRE2.jpeg','img/BOLSASDEALTOCALIBRE3.jpeg','img/BOLSASDEALTOCALIBRE4.jpeg','img/BOLSASDEALTOCALIBRE5.jpeg','img/BOLSASDEALTOCALIBRE1.jpeg'],
    descripcion: 'Materiales a tu Medida: Elige Cote resistente (gramaje adaptable) o Ibema ecológico (biodegradable y fuerte).;Acabados Personalizados: Tú decides el estilo: cinta o cordón.;Impresión de Alta Fidelidad: Desde una tinta hasta Full Color vibrante.;Toque Premium: Estampados metalizados, brillos UV sectorizados y plastificados (mate o brillante) para diferenciarte.',
    descripcion_larga: ''
  },
  // CAJAS
  4: {
    nombre: 'Packaging Bolsa Termosellada',
    imagenes: ['img/bolsapollo2.jpeg', 'img/bolsapollo1.jpeg',  'img/bolsapollo3.jpeg', 'img/bolsapollo5.jpeg', 'img/bolsapollo6.jpeg','img/bolsapollo7.jpeg','img/bolsapollo1.jpeg','img/bolsapollo11.jpeg'],
    descripcion: 'tecnología de Cierre: Termosellado hermético de alta seguridad.;Barrera Interna: Recubrimiento antigrasa y líquidos (Cero filtraciones).;Bagazo de Caña: 100% biodegradable/compostable. Sin deforestación (Fibra residual).;Kraft: Fibra natural biodegradable de alta resistencia.;Bond: Papel blanco reciclable para máxima nitidez de impresión.;Impresión: Personalizada desde 1 tinta hasta Full Color.;Uso: Domicilios y transporte de alimentos de alta temperatura.',
    descripcion_larga: ''
  },
  5: {
    nombre: 'Eco-Corp',
    imagenes: ['img/vaso1.jpeg', 'img/vaso2.jpeg','img/vaso3.jpeg','img/vaso4.jpeg'],
    descripcion: 'Material: Bagazo de caña de azúcar (100% biodegradable y compostable).;Capacidades (Vasos): 4oz, 7oz, 9oz, 12oz y 16oz.;Variedad: Incluye Bowls y Contenedores para alimentos.;Resistencia Térmica: Aptos para bebidas y alimentos fríos y calientes.;;Personalización: Tampografía de alta calidad: Logo a 1 tinta directamente en el producto.;Fajillas Premium: Opción a full color para marcas que buscan máximo impacto visual.',
    descripcion_larga: ''
  },
  6: {
    nombre: 'PREMIER PACK',
    imagenes: ['img/cajamx1.jpeg','img/cajamx2.jpeg','img/cajamx5.jpeg','img/cajamx4.jpeg'],
    descripcion: 'Material: Cartón rígido de alta resistencia (No se dobla);Cierre: Tapa con imanes ocultos para un ajuste perfecto;Impresión: Full Color (4x4) por fuera y por dentro con calidad fotográfica.;Medidas: Fabricación 100% a la medida de tu producto.;Acabados Especiales Estampados en Dorado, Plateado, etc, para resaltar tu marca.;Texturas: Opciones de plastificado Mate (elegante) o Brillante (llamativo).',
    descripcion_larga: ''
  },
  7: {
    nombre: 'Caja Arboreo',
    imagenes: ['img/Caja_Arboreo.jpg', 'img/Caja_arboreo2.jpg'],
    descripcion: 'Material fresco de tacto frío transpirable;Diseño exclusivo;Silueta ajustada;Excelente resistencia al deterioro;Ideal para el uso diario.',
    descripcion_larga: ''
  },
  // VASOS
  8: {
    nombre: 'Vasos Impresos',
    imagenes: ['img/vasos.jpg', 'img/vasos_cafe.jpg', 'img/vaso_negros.jpg'],
    descripcion: 'Material fresco de tacto frío transpirable;Diseño exclusivo;Silueta ajustada;Excelente resistencia al deterioro;Ideal para el uso diario.',
    descripcion_larga: 'aasadsadsadd'
  }
};

// Obtener el ID del producto desde la URL
function obtenerIdProducto() {
  const params = new URLSearchParams(window.location.search);
  return params.get('id') || '1';
}



// Cargar producto
function cargarProducto() {
  const id = obtenerIdProducto();
  const producto = productos[id];

  if (!producto) {
    const container = document.querySelector('.producto-detalle-container');
    if (container) container.innerHTML = '<h2>Producto no encontrado</h2>';
    return;
  }

  // Cargar fotos y miniaturas
  fotosProducto = producto.imagenes || [producto.imagen];
  fotoActual = 0;

  const nombreEl = document.getElementById('productoNombre');
  if (nombreEl) nombreEl.textContent = producto.nombre;

  const imgMain = document.getElementById('productoImg');
  if (imgMain) {
    imgMain.style.opacity = 0;
    imgMain.onload = () => { imgMain.style.transition = 'opacity 280ms ease'; imgMain.style.opacity = 1; };
    imgMain.src = fotosProducto[0];
  }

  // Crear indicadores
  crearIndicadores();

  // Crear miniaturas debajo de la foto
  let thumbs = document.getElementById('thumbs');
  if (!thumbs) {
    thumbs = document.createElement('div');
    thumbs.id = 'thumbs';
    thumbs.className = 'thumbs';
    const container = document.querySelector('.carousel-fotos');
    if (container) container.appendChild(thumbs);
  }
  if (thumbs) {
    thumbs.innerHTML = '';
    fotosProducto.forEach((src, i) => {
      const t = document.createElement('button');
      t.className = `thumb ${i === fotoActual ? 'active' : ''}`;
      t.type = 'button';
      t.setAttribute('aria-label', `Ver foto ${i+1}`);
      t.innerHTML = `<img src="${src}" alt="Miniatura ${i+1}" loading="lazy" width="120" height="90">`;
      t.addEventListener('click', function(e){
        irAFoto(i);
        const pf = document.querySelector('.producto-foto');
        if (pf) {
          pf.classList.add('show-arrows');
          setTimeout(()=> pf.classList.remove('show-arrows'), 4000);
        }
      });
      thumbs.appendChild(t);
    });
  }

  // Crear lista de características
  const lista = document.getElementById('productoDesc');
  if (lista) {
    lista.innerHTML = "";
    (producto.descripcion || '').split(";").forEach(desc => {
      if (desc.trim()) {
        const li = document.createElement("li");
        li.textContent = desc.trim();
        lista.appendChild(li);
      }
    });
  }

  // Mostrar descripción mínima tomada de `descripcion_larga` (editable en el código)
  const descEl = document.getElementById('productoDescripcion');
  if (descEl) {
    const fullDesc = (producto.descripcion_larga || '').trim();
    // build a short preview (first sentence or 140 chars)
    let preview = fullDesc.split('. ')[0] || fullDesc;
    if (preview.length < 40 && fullDesc.length > preview.length) preview = fullDesc.slice(0, 140) + (fullDesc.length > 140 ? '...' : '');
    else if (fullDesc.length > preview.length) preview = preview + (fullDesc.length > preview.length ? '...' : '');
    descEl.dataset.full = fullDesc;
    descEl.textContent = preview;
    descEl.setAttribute('aria-expanded', 'false');
    descEl.classList.remove('open');
    descEl.style.cursor = fullDesc ? 'pointer' : '';
  }
}


// Consultar producto por WhatsApp
function consultarWhatsAppProducto() {
  const id = obtenerIdProducto();
  const producto = productos[id];
  if (!producto) return;

  const nombre = producto.nombre || '';
  const fullDesc = (producto.descripcion || '').replace(/;+\s*/g, '. ');
  // Short description: first segment before ';' or first 140 chars
  let shortDesc = (producto.descripcion || '').split(';')[0] || fullDesc;
  shortDesc = shortDesc.length > 140 ? shortDesc.slice(0,137) + '...' : shortDesc;

  const pagina = window.location.href;
  const mensaje = `Hola! Me interesa este producto:\n\n📦 ${nombre}\nID: ${id}\n\nResumen: ${shortDesc}\n\nDetalles: ${fullDesc}\n\nVer: ${pagina}`;
  // Use the provided WhatsApp contact number
  const telefono = "3245333747";
  const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
  window.open(url, "_blank");
}

// ===== CARRUSEL DE FOTOS =====
let fotoActual = 0;
let fotosProducto = [];

function crearIndicadores() {
  const contenedor = document.getElementById('indicadores');
  if (!contenedor) return;
  contenedor.innerHTML = '';
  fotosProducto.forEach((_, index) => {
    const div = document.createElement('div');
    div.className = `indicador ${index === fotoActual ? 'active' : ''}`;
    div.onclick = () => irAFoto(index);
    contenedor.appendChild(div);
  });
}

function cambiarFoto(direccion) {
  if (fotosProducto.length === 0) return;
  fotoActual = (fotoActual + direccion + fotosProducto.length) % fotosProducto.length;
  const img = document.getElementById('productoImg');
  if (!img) return;
  img.style.opacity = 0;
  img.onload = () => { img.style.transition = 'opacity 280ms ease'; img.style.opacity = 1; };
  img.src = fotosProducto[fotoActual];
  document.querySelectorAll('.indicador').forEach((ind, index) => {
    ind.classList.toggle('active', index === fotoActual);
  });
  document.querySelectorAll('.thumb').forEach((th, i) => th.classList.toggle('active', i === fotoActual));
}

function irAFoto(index) {
  fotoActual = index;
  const img = document.getElementById('productoImg');
  if (!img) return;
  img.style.opacity = 0;
  img.onload = () => { img.style.transition = 'opacity 280ms ease'; img.style.opacity = 1; };
  img.src = fotosProducto[fotoActual];
  document.querySelectorAll('.indicador').forEach((ind, i) => {
    ind.classList.toggle('active', i === fotoActual);
  });
  document.querySelectorAll('.thumb').forEach((th, i) => th.classList.toggle('active', i === fotoActual));
}

// Event listeners moved below

// LIGHTBOX - Ampliar imágenes
function abrirLightbox(imagenSrc) {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  if (lightboxImg) lightboxImg.src = imagenSrc;
  if (lightbox) lightbox.classList.add('active');
}

function cerrarLightbox() {
  const lightbox = document.getElementById('lightbox');
  if (lightbox) lightbox.classList.remove('active');
}

// Dropdown del botón Catálogo - accesibilidad y comportamiento simple
(function(){
  document.addEventListener('DOMContentLoaded', function() {
    const menuBtn = document.getElementById('menuBtn');
    const dropdown = document.getElementById('catalogDropdown');

    if (!menuBtn || !dropdown) return;

    menuBtn.addEventListener('click', function(e) {
      const active = menuBtn.classList.toggle('active');
      dropdown.classList.toggle('active', active);
      menuBtn.setAttribute('aria-expanded', active ? 'true' : 'false');
      dropdown.setAttribute('aria-hidden', active ? 'false' : 'true');
    });

    // Cerrar al hacer clic fuera
    document.addEventListener('click', function(e) {
      if (!menuBtn.contains(e.target) && !dropdown.contains(e.target)) {
        menuBtn.classList.remove('active');
        dropdown.classList.remove('active');
        menuBtn.setAttribute('aria-expanded', 'false');
        dropdown.setAttribute('aria-hidden', 'true');
      }
    });

    // Cerrar con Escape
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        menuBtn.classList.remove('active');
        dropdown.classList.remove('active');
        menuBtn.setAttribute('aria-expanded', 'false');
        dropdown.setAttribute('aria-hidden', 'true');
      }
    });
  });
})();

// DOM ready logic
window.addEventListener('DOMContentLoaded', function(){
  // load product
  cargarProducto();

  // lightbox click handler
  const lightbox = document.getElementById('lightbox');
  if (lightbox) {
    lightbox.addEventListener('click', function(e) {
      if (e.target === this || e.target.classList.contains('lightbox-close')) {
        cerrarLightbox();
      }
    });
  }

  // click main image -> lightbox
  const productoImg = document.getElementById('productoImg');
  if (productoImg) {
    productoImg.style.cursor = 'pointer';
    productoImg.addEventListener('click', function() { abrirLightbox(this.src); });
  }

  // show arrows on hover
  const pf = document.querySelector('.producto-foto');
  if (pf) {
    pf.addEventListener('mouseenter', () => pf.classList.add('show-arrows'));
    pf.addEventListener('mouseleave', () => pf.classList.remove('show-arrows'));
  }

  // Attach click handlers to arrow buttons (works for buttons added without inline onclick)
  const arrowBtns = document.querySelectorAll('.arrow-foto');
  if (arrowBtns && arrowBtns.length) {
    arrowBtns.forEach(btn => {
      // ensure it's treated as a button when inserted dynamically
      if (!btn.getAttribute('type')) btn.setAttribute('type', 'button');
      btn.addEventListener('click', function(e){
        e.preventDefault();
        const dirAttr = btn.getAttribute('data-dir');
        const dir = dirAttr !== null ? Number(dirAttr) : (btn.classList.contains('left') ? -1 : 1);
        if (!Number.isNaN(dir)) cambiarFoto(dir);
        if (pf) {
          pf.classList.add('show-arrows');
          setTimeout(()=> pf.classList.remove('show-arrows'), 2500);
        }
      });
    });
  }

  // Attach click handler to WhatsApp button via JS (CSP may block inline onclick)
  const whatsappBtn = document.querySelector('.btn-whatsapp');
  if (whatsappBtn) {
    // ensure button is treated as button
    if (!whatsappBtn.getAttribute('type')) whatsappBtn.setAttribute('type', 'button');
    whatsappBtn.addEventListener('click', function(e){
      e.preventDefault();
      consultarWhatsAppProducto();
    });
  }

  // keyboard handling
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') cerrarLightbox();
    if (e.key === 'ArrowLeft') if (document.getElementById('productoImg')) cambiarFoto(-1);
    if (e.key === 'ArrowRight') if (document.getElementById('productoImg')) cambiarFoto(1);
  });

  // Click-to-view for description: toggle preview/full text when user clicks or presses Enter/Space
  (function(){
    const descBox = document.getElementById('productoDescripcion');
    if (!descBox) return;
    const hint = document.createElement('div');
    hint.className = 'desc-hint';
    hint.textContent = 'Haz click para ver más';
    hint.style.display = 'none';
    // insert hint after descBox
    descBox.parentNode.insertBefore(hint, descBox.nextSibling);

    function openDesc() {
      const full = descBox.dataset.full || '';
      if (!full) return;
      descBox.classList.add('open');
      descBox.textContent = full;
      descBox.setAttribute('aria-expanded', 'true');
      hint.style.display = 'none';
    }

    function closeDesc() {
      const full = descBox.dataset.full || '';
      let preview = full.split('. ')[0] || full;
      if (preview.length < 40 && full.length > preview.length) preview = full.slice(0,140) + (full.length > 140 ? '...' : '');
      else if (full.length > preview.length) preview = preview + (full.length > preview.length ? '...' : '');
      descBox.classList.remove('open');
      descBox.textContent = preview;
      descBox.setAttribute('aria-expanded', 'false');
      // show hint only if there's more to read
      hint.style.display = (full && full.length > preview.length) ? '' : 'none';
    }

    // initialize hint visibility
    const initialFull = descBox.dataset.full || '';
    const initialPreview = descBox.textContent || '';
    if (initialFull && initialFull.length > initialPreview.length) hint.style.display = '';

    let expanded = false;
    descBox.addEventListener('click', function(){
      expanded = !expanded;
      if (expanded) openDesc(); else closeDesc();
    });
    descBox.addEventListener('keydown', function(e){
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        expanded = !expanded;
        if (expanded) openDesc(); else closeDesc();
      }
    });
  })();
});
