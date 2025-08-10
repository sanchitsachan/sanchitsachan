<?php
/**
 * Front Page template
 */
if (!defined('ABSPATH')) { exit; }
get_header();
?>

<section class="hero" id="top" role="region" aria-label="Hero">
  <div class="container hero__inner">
    <h1><?php echo esc_html__('Fish & Wine at its Best', 'ocean-cyprus'); ?></h1>
    <p><?php echo esc_html__('A seaside escape of authentic Cypriot flavors. Fresh catch, Mediterranean mezze, and a curated wine list — steps from the marina.', 'ocean-cyprus'); ?></p>
    <div style="margin-top:16px; display:flex; gap:12px;">
      <a href="#reserve" class="oc-btn"><?php esc_html_e('Book a Table', 'ocean-cyprus'); ?></a>
      <a href="#menu" class="oc-btn oc-btn--outline"><?php esc_html_e('View Menu', 'ocean-cyprus'); ?></a>
    </div>
  </div>
</section>

<div class="oc-stripes"></div>

<section class="section section--alt" aria-label="Intro">
  <div class="container intro">
    <div>
      <h2 class="section-title"><?php esc_html_e('A Seaside Escape of Authentic Cypriot Flavors', 'ocean-cyprus'); ?></h2>
      <p><?php esc_html_e('From dawn trawls to twilight toasts, our kitchen brings the Mediterranean to your table: grilled octopus, seabass carpaccio, and mezze for sharing. Pair it with crisp island wines.', 'ocean-cyprus'); ?></p>
      <p><?php esc_html_e('Savor the breeze on our terrace as fishing boats drift by the harbor.', 'ocean-cyprus'); ?></p>
    </div>
    <aside class="card">
      <img src="<?php echo esc_url( get_template_directory_uri() . '/assets/images/side.jpg'); ?>" alt="Fishing by the sea" />
      <div class="card__body">
        <strong><?php esc_html_e('Today’s Catch Highlights', 'ocean-cyprus'); ?></strong>
        <p class="muted">Branzino • Red mullet • Calamari</p>
      </div>
    </aside>
  </div>
</section>

<section class="section" aria-label="Info">
  <div class="container info-bar">
    <div class="info-box">
      <h3><?php esc_html_e('Reserve a Table', 'ocean-cyprus'); ?></h3>
      <p class="muted"><?php esc_html_e('Instant confirmation', 'ocean-cyprus'); ?></p>
      <a id="reserve" href="tel:+35700000000" class="oc-btn"><?php esc_html_e('Call +357 00 000 000', 'ocean-cyprus'); ?></a>
    </div>
    <div class="info-box">
      <h3><?php esc_html_e('Opening Hours', 'ocean-cyprus'); ?></h3>
      <p>Mon–Fri: 12:00–23:00<br>Sat–Sun: 10:00–23:00</p>
    </div>
  </div>
</section>

<section class="section section--alt" aria-label="Map">
  <div class="container">
    <div class="map-wrap">
      <iframe title="Map" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=Limassol%20Marina&output=embed"></iframe>
    </div>
  </div>
</section>

<section class="section" id="menu" aria-label="Gallery">
  <div class="container">
    <h2 class="section-title"><?php esc_html_e('Taste the Mediterranean', 'ocean-cyprus'); ?></h2>
    <div class="gallery">
      <img src="<?php echo esc_url( get_template_directory_uri() . '/assets/images/gallery-1.jpg'); ?>" alt="Seafood mezze" />
      <img src="<?php echo esc_url( get_template_directory_uri() . '/assets/images/gallery-2.jpg'); ?>" alt="Wine by the sea" />
      <img src="<?php echo esc_url( get_template_directory_uri() . '/assets/images/gallery-3.jpg'); ?>" alt="Grilled prawns" />
    </div>
  </div>
</section>

<section class="section section--alt" aria-label="Callout">
  <div class="container">
    <div class="callout">
      <h3 style="margin:0 0 8px;"><?php esc_html_e('Have a Special Occasion?', 'ocean-cyprus'); ?></h3>
      <p style="margin:0 0 16px;">
        <?php esc_html_e('From intimate anniversaries to seaside receptions — we’ll craft a memorable experience.', 'ocean-cyprus'); ?>
      </p>
      <a href="#contact" class="oc-btn"><?php esc_html_e('Plan Your Event', 'ocean-cyprus'); ?></a>
    </div>
  </div>
</section>

<section class="section" aria-label="Testimonials">
  <div class="container">
    <h2 class="section-title"><?php esc_html_e('Guests Say', 'ocean-cyprus'); ?></h2>
    <div class="testimonials">
      <div class="testimonial">“<?php esc_html_e('Freshest seafood we had on the island. The view is a dream.', 'ocean-cyprus'); ?>” — Anna</div>
      <div class="testimonial">“<?php esc_html_e('Incredible octopus and a wine list to match.', 'ocean-cyprus'); ?>” — Mark</div>
      <div class="testimonial">“<?php esc_html_e('Perfect for sunset dinners with friends.', 'ocean-cyprus'); ?>” — Eleni</div>
    </div>
  </div>
</section>

<section class="section section--alt" id="contact" aria-label="Contact">
  <div class="container contact">
    <div>
      <h2 class="section-title"><?php esc_html_e('Contact Us', 'ocean-cyprus'); ?></h2>
      <p><strong><?php esc_html_e('Address', 'ocean-cyprus'); ?>:</strong> 123 Seaside Ave, Limassol, Cyprus</p>
      <p><strong><?php esc_html_e('Phone', 'ocean-cyprus'); ?>:</strong> <a href="tel:+35700000000">+357 00 000 000</a></p>
      <p><strong><?php esc_html_e('Email', 'ocean-cyprus'); ?>:</strong> <a href="mailto:hello@example.com">hello@example.com</a></p>
    </div>
    <div>
      <form action="#" method="post" onsubmit="return false;">
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
          <input type="text" name="name" placeholder="<?php esc_attr_e('Your name', 'ocean-cyprus'); ?>" required />
          <input type="email" name="email" placeholder="<?php esc_attr_e('Email address', 'ocean-cyprus'); ?>" required />
        </div>
        <textarea name="message" rows="5" placeholder="<?php esc_attr_e('How can we help?', 'ocean-cyprus'); ?>" required style="margin-top:12px;"></textarea>
        <button type="submit" class="oc-btn" style="margin-top:12px;">
          <?php esc_html_e('Send Message', 'ocean-cyprus'); ?>
        </button>
        <p class="muted" style="margin-top:8px;">Tip: Install a contact form plugin (e.g., Contact Form 7) and replace this with a shortcode.</p>
      </form>
    </div>
  </div>
</section>

<?php get_footer(); ?>