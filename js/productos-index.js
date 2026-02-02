// Toggle "Ver más" descriptions on product cards
document.addEventListener('DOMContentLoaded', function(){
  const buttons = document.querySelectorAll('.ver-mas-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', function(e){
      const card = btn.closest('.producto');
      if (!card) return;
      const desc = card.querySelector('.card-desc');
      if (!desc) return;
      const open = desc.classList.toggle('open');
      btn.textContent = open ? 'Ver menos' : 'Ver más';
      // smooth scroll into view on mobile when opening
      if (open) {
        setTimeout(()=> {
          card.scrollIntoView({behavior:'smooth', block:'center'});
        }, 160);
      }
    });
  });
});