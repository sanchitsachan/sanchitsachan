(function(){
  function smoothScrollTo(targetY){
    window.scrollTo({ top: targetY, behavior: 'smooth' });
  }
  document.addEventListener('click', function(e){
    var a = e.target.closest('a[href^="#"]');
    if (!a) return;
    var id = a.getAttribute('href');
    if (id.length <= 1) return;
    var el = document.querySelector(id);
    if (!el) return;
    e.preventDefault();
    var y = el.getBoundingClientRect().top + window.pageYOffset - 64;
    smoothScrollTo(y);
  }, false);
})();