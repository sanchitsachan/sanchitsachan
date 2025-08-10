<?php if (!defined('ABSPATH')) { exit; } ?>
<footer class="site-footer" role="contentinfo">
  <div class="container">
    <div class="footer-grid">
      <div>
        <h3 class="section-title" style="color:#fff;"><?php bloginfo('name'); ?></h3>
        <p><?php bloginfo('description'); ?></p>
        <p><strong><?php esc_html_e('Address', 'ocean-cyprus'); ?>:</strong> 123 Seaside Ave, Limassol, Cyprus</p>
        <p><strong><?php esc_html_e('Phone', 'ocean-cyprus'); ?>:</strong> <a style="color:#fff;" href="tel:+35700000000">+357 00 000 000</a></p>
      </div>
      <div>
        <h4 style="margin-top:0; color:#fff;"><?php esc_html_e('Opening Hours', 'ocean-cyprus'); ?></h4>
        <p>Mon–Fri: 12:00 – 23:00<br/>Sat–Sun: 10:00 – 23:00</p>
        <?php if (has_nav_menu('footer')) {
          wp_nav_menu([
            'theme_location' => 'footer',
            'container'      => false,
            'menu_class'     => 'footer-menu',
          ]);
        } ?>
      </div>
      <div>
        <h4 style="margin-top:0; color:#fff;"><?php esc_html_e('Newsletter', 'ocean-cyprus'); ?></h4>
        <form action="#" method="post" onsubmit="return false;">
          <input type="email" placeholder="Email address" required />
          <button class="oc-btn" type="submit"><?php esc_html_e('Subscribe', 'ocean-cyprus'); ?></button>
        </form>
        <p style="opacity:.8; font-size:14px; margin-top:8px;"><?php esc_html_e('Follow us on social media', 'ocean-cyprus'); ?> · ✦ ✦ ✦</p>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="container" style="display:flex; justify-content:space-between; gap:12px;">
        <span>© <?php echo date('Y'); ?> <?php bloginfo('name'); ?> — <?php esc_html_e('All rights reserved.', 'ocean-cyprus'); ?></span>
        <span><a style="color:#d6e2f2;" href="#top"><?php esc_html_e('Back to top', 'ocean-cyprus'); ?></a></span>
      </div>
    </div>
  </div>
</footer>
<?php wp_footer(); ?>
</body>
</html>