<footer class="site-footer">
  <div class="container footer-top">
    <div class="footer-col">
      <h3 class="footer-title">About</h3>
      <p>Fresh seafood and curated wines by the sea. A modern tribute to authentic Cypriot flavors.</p>
      <?php if (has_nav_menu('footer')): ?>
      <nav class="footer-nav" aria-label="Footer">
        <?php wp_nav_menu(['theme_location' => 'footer', 'container' => false, 'menu_class' => 'menu']); ?>
      </nav>
      <?php endif; ?>
    </div>
    <div class="footer-col">
      <h3 class="footer-title">Opening Hours</h3>
      <pre class="hours"><?php echo esc_html(seaside_get_mod('seaside_hours', "Mon–Fri: 12:00–22:00\nSat–Sun: 10:00–23:00")); ?></pre>
    </div>
    <div class="footer-col">
      <h3 class="footer-title">Contact</h3>
      <ul class="contact">
        <li><strong>Phone:</strong> <a href="tel:<?php echo esc_attr(seaside_get_mod('seaside_phone', '+15551234567')); ?>"><?php echo esc_html(seaside_get_mod('seaside_phone', '+1 (555) 123-4567')); ?></a></li>
        <li><strong>Address:</strong> <?php echo esc_html(seaside_get_mod('seaside_address', '123 Marina Road, Seaside City')); ?></li>
      </ul>
      <a class="btn btn-outline" href="<?php echo esc_url(seaside_get_mod('seaside_reserve_url', '#reserve')); ?>">Book a Table</a>
    </div>
  </div>
  <div class="container footer-bottom">
    <p>© <?php echo esc_html(date('Y')); ?> <?php bloginfo('name'); ?>. All rights reserved.</p>
  </div>
</footer>
<?php wp_footer(); ?>
</body>
</html>