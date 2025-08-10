(function(){
  document.addEventListener('DOMContentLoaded', function(){
    var toggle = document.querySelector('.mobile-toggle');
    var menu = document.getElementById('mobile-menu');
    if (!toggle || !menu) return;
    toggle.addEventListener('click', function(){
      var hidden = menu.hasAttribute('hidden');
      if (hidden) { menu.removeAttribute('hidden'); toggle.setAttribute('aria-expanded','true'); }
      else { menu.setAttribute('hidden',''); toggle.setAttribute('aria-expanded','false'); }
    });
  });
})();