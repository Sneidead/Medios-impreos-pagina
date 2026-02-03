// ======================= 📱 WHATSAPP =======================

// 🔹 Contactar por WhatsApp
function contactarWhatsApp() {
  const mensaje = "Hola! Me gustaría conocer más sobre sus productos. 😊";
  const telefono = "573183061147";
  const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
  window.open(url, "_blank");
}
// Menu modal handlers (guarded)
const menuBtn = document.getElementById("menuBtn");
const closeMenuModalBtn = document.getElementById("closeMenuModal");
const menuModal = document.getElementById("menuModal");
if (menuBtn && menuModal) {
  menuBtn.addEventListener("click", () => {
    menuModal.classList.toggle("active");
    menuBtn.classList.toggle("active");
  });
}

if (closeMenuModalBtn && menuModal && menuBtn) {
  closeMenuModalBtn.addEventListener("click", () => {
    menuModal.classList.remove("active");
    menuBtn.classList.remove("active");
  });
}

if (menuModal) {
  menuModal.addEventListener("click", (e) => {
    if (e.target.id === "menuModal") {
      e.target.classList.remove("active");
      if (menuBtn) menuBtn.classList.remove("active");
    }
  });
}

document.querySelectorAll(".menu-modal-item").forEach(item => {
  item.addEventListener("click", () => {
    if (menuModal) menuModal.classList.remove("active");
    if (menuBtn) menuBtn.classList.remove("active");
  });
});

// Logo modal and animations (guarded)
const logoImg = document.getElementById("logoImg");
const logoModal = document.getElementById("logoModal");
const logoModalClose = document.querySelector(".logo-modal-close");
if (logoImg) {
  // subtle pulse animation on hover
  logoImg.classList.add('logo-animated');
  logoImg.addEventListener('mouseenter', () => logoImg.classList.add('logo-hover'));
  logoImg.addEventListener('mouseleave', () => logoImg.classList.remove('logo-hover'));
  // click to open modal if exists
  if (logoModal) {
    logoImg.style.cursor = 'zoom-in';
    logoImg.addEventListener('click', () => {
      logoModal.classList.add('active');
    });
  }
}

  // Entrance animations: observe elements with .enter-anim and reveal them with a stagger
  function initEntranceAnimations() {
    const cards = Array.from(document.querySelectorAll('.enter-anim'));
    if (!cards.length) return;

    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const index = cards.indexOf(el);
        const delay = Math.min(index * 80, 600);
        setTimeout(() => el.classList.add('visible'), delay);
        obs.unobserve(el);
      });
    }, { threshold: 0 });

    // Immediately reveal elements already in the viewport (helps titles above the fold)
    cards.forEach((el, i) => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) {
        const delay = Math.min(i * 80, 600);
        setTimeout(() => el.classList.add('visible'), delay);
      } else {
        io.observe(el);
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initEntranceAnimations);
  } else {
    initEntranceAnimations();
  }

if (logoModal && logoModalClose) {
  logoModalClose.addEventListener('click', () => logoModal.classList.remove('active'));
  logoModal.addEventListener('click', (e) => {
    if (e.target.id === 'logoModal') logoModal.classList.remove('active');
  });
}

// Close logo modal and other overlays with Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (logoModal && logoModal.classList.contains('active')) logoModal.classList.remove('active');
    if (menuModal && menuModal.classList.contains('active')) menuModal.classList.remove('active');
    if (menuBtn) menuBtn.classList.remove('active');
  }
});

// Dropdown handling (supports #catalogDropdown when used instead of menuModal)
function initCatalogDropdown() {
  const catalogDropdown = document.getElementById('catalogDropdown');
  const btn = document.getElementById('menuBtn');
  if (!btn || !catalogDropdown) return;

  btn.addEventListener('click', (e) => {
    const active = btn.classList.toggle('active');
    catalogDropdown.classList.toggle('active', active);
    btn.setAttribute('aria-expanded', active ? 'true' : 'false');
    catalogDropdown.setAttribute('aria-hidden', active ? 'false' : 'true');
  });

  document.addEventListener('click', (e) => {
    if (!btn.contains(e.target) && !catalogDropdown.contains(e.target)) {
      btn.classList.remove('active');
      catalogDropdown.classList.remove('active');
      btn.setAttribute('aria-expanded', 'false');
      catalogDropdown.setAttribute('aria-hidden', 'true');
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      btn.classList.remove('active');
      catalogDropdown.classList.remove('active');
      btn.setAttribute('aria-expanded', 'false');
      catalogDropdown.setAttribute('aria-hidden', 'true');
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCatalogDropdown);
} else {
  initCatalogDropdown();
}

/* ===================== CONTACT FORM → WHATSAPP ===================== */
(function(){
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', function(e){
    e.preventDefault();
    const nombre = document.getElementById('nombre')?.value || '';
    const email = document.getElementById('email')?.value || '';
    const telefono = document.getElementById('telefono')?.value || '';
    const asunto = document.getElementById('asunto')?.value || '';
    const mensaje = document.getElementById('mensaje')?.value || '';

    // Compose a friendly WhatsApp message
    const lines = [];
    lines.push(`Hola, soy ${nombre}`);
    if (telefono) lines.push(`Teléfono: ${telefono}`);
    if (email) lines.push(`Email: ${email}`);
    if (asunto) lines.push(`Asunto: ${asunto}`);
    if (mensaje) lines.push(`Mensaje: ${mensaje}`);
    lines.push(`(Enviado desde el formulario del sitio)`);

    const text = lines.join('\n');
    const phoneNumber = '573183061147'; // número destino WhatsApp
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;

    // Open WhatsApp (web or app)
    window.open(url, '_blank');
  });
})();

// ===================== ANUNCIO INSTAGRAM =====================
function initAnuncioInstagram() {
  const anuncio = document.getElementById('anuncio-instagram');
  const btnMin = document.getElementById('anuncio-min');
  const btnClose = document.getElementById('anuncio-close');

  if (!anuncio) return;

  if (btnMin) {
    btnMin.addEventListener('click', () => {
      const isCollapsed = anuncio.classList.toggle('anuncio-collapsed');
      btnMin.textContent = isCollapsed ? '+' : '–';
    });
  }

  if (btnClose) {
    btnClose.addEventListener('click', () => {
      anuncio.style.display = 'none';
    });
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAnuncioInstagram);
} else {
  initAnuncioInstagram();
}
