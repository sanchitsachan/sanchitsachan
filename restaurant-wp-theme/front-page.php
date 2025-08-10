<?php get_header(); ?>

<main id="main" class="site-main">
  <?php if (have_posts()) : while (have_posts()) : the_post(); ?>
    <?php
      $hero_image = get_the_post_thumbnail_url(get_the_ID(), 'full');
      if (!$hero_image) {
        $hero_image = get_template_directory_uri() . '/assets/img/hero.jpg';
      }
    ?>
    <section class="hero" style="--hero-image: url('<?php echo esc_url($hero_image); ?>')">
      <div class="container hero-inner">
        <h1 class="hero-title"><?php echo esc_html(seaside_get_mod('seaside_hero_title', 'Fish & Wine at its Best')); ?></h1>
        <p class="hero-subtitle"><?php echo esc_html(seaside_get_mod('seaside_hero_subtitle', 'A seaside escape of authentic Cypriot flavors')); ?></p>
        <a href="<?php echo esc_url(seaside_get_mod('seaside_reserve_url', '#reserve')); ?>" class="btn btn-accent">Reserve a Table</a>
      </div>
    </section>

    <div class="stripe-separator" aria-hidden="true"></div>

    <section class="intro">
      <div class="container grid-2">
        <div>
          <h2 class="section-title">A Seaside Escape of Authentic Cypriot Flavors</h2>
          <div class="section-text">
            <?php the_content(); ?>
          </div>
        </div>
        <div class="intro-card">
          <h3>Today’s Highlights</h3>
          <ul>
            <li>Fresh catch seafood platter</li>
            <li>Grilled octopus with lemon & oregano</li>
            <li>Local white wine pairing</li>
          </ul>
        </div>
      </div>
    </section>

    <section class="pills">
      <div class="container" style="display:flex; gap:.5rem; flex-wrap:wrap; justify-content:center;">
        <?php
          $pills = [
            ['label' => 'Menu', 'mod' => 'seaside_link_menu'],
            ['label' => 'Wine List', 'mod' => 'seaside_link_wine'],
            ['label' => 'Desserts', 'mod' => 'seaside_link_desserts'],
            ['label' => 'Drinks', 'mod' => 'seaside_link_drinks'],
          ];
          foreach ($pills as $pill) :
            $href = seaside_get_mod($pill['mod'], '#');
        ?>
          <a class="btn" style="background:#e7eef7;color:#113458;border-color:#cfe0f5" href="<?php echo esc_url($href); ?>"><?php echo esc_html($pill['label']); ?></a>
        <?php endforeach; ?>
      </div>
    </section>

    <section id="reserve" class="reserve-hours">
      <div class="container grid-2">
        <div class="box">
          <h3>Reserve a Table</h3>
          <p>Call us or book online to secure your spot by the sea.</p>
          <a class="btn btn-primary" href="<?php echo esc_url(seaside_get_mod('seaside_reserve_url', '#')); ?>">Book Now</a>
        </div>
        <div class="box">
          <h3>Opening Hours</h3>
          <pre class="hours"><?php echo esc_html(seaside_get_mod('seaside_hours', "Mon–Fri: 12:00–22:00\nSat–Sun: 10:00–23:00")); ?></pre>
        </div>
      </div>
    </section>

    <section class="map-section">
      <div class="container">
        <?php echo wp_kses_post(seaside_get_mod('seaside_map_embed')); ?>
      </div>
    </section>

    <section class="gallery">
      <div class="container grid-3">
        <?php
          $gallery = [
            get_template_directory_uri() . '/assets/img/g1.jpg',
            get_template_directory_uri() . '/assets/img/g2.jpg',
            get_template_directory_uri() . '/assets/img/g3.jpg',
          ];
          foreach ($gallery as $src) :
        ?>
          <figure class="gallery-item"><img src="<?php echo esc_url($src); ?>" alt="" loading="lazy"></figure>
        <?php endforeach; ?>
      </div>
    </section>

    <section class="contact-section">
      <div class="container grid-2">
        <div>
          <h3>Have a Special Occasion?</h3>
          <p>We host intimate celebrations, anniversaries, and private tastings by the water.</p>
          <ul class="contact">
            <li><strong>Phone:</strong> <a href="tel:<?php echo esc_attr(seaside_get_mod('seaside_phone', '+15551234567')); ?>"><?php echo esc_html(seaside_get_mod('seaside_phone', '+1 (555) 123-4567')); ?></a></li>
            <li><strong>Address:</strong> <?php echo esc_html(seaside_get_mod('seaside_address', '123 Marina Road, Seaside City')); ?></li>
          </ul>
        </div>
        <div>
          <?php if (shortcode_exists('contact-form-7')) { echo do_shortcode('[contact-form-7 id="1" title="Contact form 1"]'); } else { ?>
            <form class="contact-form" method="post" action="#">
              <div class="form-row">
                <input type="text" name="name" placeholder="Your Name" required>
                <input type="email" name="email" placeholder="Email" required>
              </div>
              <textarea name="message" rows="5" placeholder="Message"></textarea>
              <button class="btn btn-primary" type="submit">Send Message</button>
            </form>
          <?php } ?>
        </div>
      </div>
    </section>

  <?php endwhile; endif; ?>
</main>

<?php get_footer(); ?>