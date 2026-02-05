(function () {
  function $(selector, root) {
    return (root || document).querySelector(selector);
  }

  function $all(selector, root) {
    return Array.from((root || document).querySelectorAll(selector));
  }

  function onReady(fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn, { once: true });
    } else {
      fn();
    }
  }

  onReady(function () {
    const figures = $all('.catalog-grid .catalog-item');
    const images = figures
      .map((fig) => ({ fig, img: $('img', fig), cap: $('figcaption', fig) }))
      .filter((x) => x.img && x.img.getAttribute('src'));

    if (!images.length) return;

    // Create lightbox DOM
    const lightbox = document.createElement('div');
    lightbox.id = 'catalogLightbox';
    lightbox.className = 'catalog-lightbox';
    lightbox.setAttribute('role', 'dialog');
    lightbox.setAttribute('aria-modal', 'true');
    lightbox.setAttribute('aria-hidden', 'true');
    lightbox.setAttribute('aria-label', 'Vista de imagen');

    lightbox.innerHTML = `
      <button class="catalog-lightbox-close" type="button" aria-label="Cerrar">×</button>
      <figure class="catalog-lightbox-figure">
        <img class="catalog-lightbox-img" alt="">
      </figure>
    `;

    document.body.appendChild(lightbox);

    const btnClose = $('.catalog-lightbox-close', lightbox);
    const lbImg = $('.catalog-lightbox-img', lightbox);
    const lbFigure = $('.catalog-lightbox-figure', lightbox);

    let currentIndex = 0;
    let lastFocus = null;

    function getData(index) {
      const entry = images[index];
      if (!entry) return null;
      const src = entry.img.getAttribute('src') || '';
      const alt = entry.img.getAttribute('alt') || '';
      return { src, alt };
    }

    function setOpen(open) {
      lightbox.classList.toggle('is-open', open);
      lightbox.setAttribute('aria-hidden', open ? 'false' : 'true');
      document.documentElement.style.overflow = open ? 'hidden' : '';

      if (open) {
        btnClose && btnClose.focus();
      } else if (lastFocus && typeof lastFocus.focus === 'function') {
        lastFocus.focus();
      }
    }

    function render(index) {
      const data = getData(index);
      if (!data || !data.src) return;

      currentIndex = index;
      lbImg.src = data.src;
      lbImg.alt = data.alt || 'Imagen de catálogo';

      setOpen(true);
    }

    function open(index) {
      lastFocus = document.activeElement;
      render(index);
    }

    function close() {
      setOpen(false);
    }

    // Bind interactions on catalog
    images.forEach(({ fig }, index) => {
      // keyboard focus
      if (!fig.hasAttribute('tabindex')) fig.tabIndex = 0;

      fig.addEventListener('click', function () {
        open(index);
      });

      fig.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          open(index);
        }
      });
    });

    // Lightbox events
    if (btnClose) btnClose.addEventListener('click', close);
    lightbox.addEventListener('click', function (e) {
      // close when clicking outside image/caption
      if (lbFigure && !lbFigure.contains(e.target)) close();
    });

    document.addEventListener('keydown', function (e) {
      const isOpen = lightbox.classList.contains('is-open');
      if (!isOpen) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        close();
        return;
      }

      // Arrows no longer navigate; only Escape closes.
    });
  });
})();
