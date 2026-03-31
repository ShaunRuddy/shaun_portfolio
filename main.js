(function () {
  const HERO_CARD_ICONS = ['🎓', '💼', '🤖'];
  const HERO_CARD_CLASSES = ['card-edu', 'card-exp', 'card-role'];
  const CONTACT_ICON = { email: '✉', phone: '📞', linkedin: 'in' };

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function contactLinkLabel(type, label) {
    if (type === 'linkedin') return CONTACT_ICON.linkedin + ' LinkedIn';
    return CONTACT_ICON[type] + ' ' + label;
  }

  function initNavMobile(nav, toggle, backdrop, menu, logo) {
    const mq = window.matchMedia('(max-width: 850px)');

    function closeNav() {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open menu');
      document.body.classList.remove('nav-open');
      backdrop.setAttribute('aria-hidden', 'true');
    }

    function openNav() {
      if (!mq.matches) return;
      nav.classList.add('is-open');
      toggle.setAttribute('aria-expanded', 'true');
      toggle.setAttribute('aria-label', 'Close menu');
      document.body.classList.add('nav-open');
      backdrop.setAttribute('aria-hidden', 'false');
    }

    function onToggleClick() {
      if (nav.classList.contains('is-open')) closeNav();
      else openNav();
    }

    toggle.addEventListener('click', onToggleClick);
    backdrop.addEventListener('click', closeNav);

    menu.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', () => {
        if (mq.matches) closeNav();
      });
    });

    logo.addEventListener('click', () => {
      if (mq.matches) closeNav();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) closeNav();
    });

    mq.addEventListener('change', () => {
      if (!mq.matches) closeNav();
    });
  }

  function renderNav(meta, navigation) {
    const nav = document.getElementById('site-nav');
    nav.className = 'site-nav';
    nav.innerHTML = '';

    const logo = document.createElement('a');
    logo.href = '#hero';
    logo.className = 'nav-logo';
    logo.textContent = meta.initials;
    logo.setAttribute('aria-label', 'Back to top');

    const toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'nav-toggle';
    toggle.id = 'nav-toggle';
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-controls', 'nav-menu');
    toggle.setAttribute('aria-label', 'Open menu');
    for (let i = 0; i < 3; i += 1) {
      const bar = document.createElement('span');
      bar.className = 'nav-toggle-bar';
      bar.setAttribute('aria-hidden', 'true');
      toggle.appendChild(bar);
    }

    const backdrop = document.createElement('div');
    backdrop.className = 'nav-backdrop';
    backdrop.id = 'nav-backdrop';
    backdrop.setAttribute('aria-hidden', 'true');

    const menu = document.createElement('div');
    menu.id = 'nav-menu';
    menu.className = 'nav-menu';

    const ul = document.createElement('ul');
    ul.className = 'nav-links';
    navigation.forEach((item) => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = item.href;
      a.textContent = item.label;
      li.appendChild(a);
      ul.appendChild(li);
    });
    menu.appendChild(ul);

    nav.appendChild(logo);
    nav.appendChild(toggle);
    nav.appendChild(backdrop);
    nav.appendChild(menu);

    initNavMobile(nav, toggle, backdrop, menu, logo);
  }

  function renderHero(data) {
    const h = data.hero;
    const headline = h.headline;
    const subtitleHtml = h.subtitleHtml || h.subtitle;

    let ctaHtml = '';
    h.cta.forEach((btn) => {
      const cls = btn.style === 'primary' ? 'btn btn-primary' : 'btn btn-outline';
      ctaHtml += `<a href="${escapeHtml(btn.href)}" class="${cls}">${escapeHtml(btn.label)}</a>`;
    });

    let cardsHtml = '';
    h.summaryCards.forEach((card, i) => {
      const cardClass = HERO_CARD_CLASSES[i] || 'card-edu';
      const icon = HERO_CARD_ICONS[i] || '•';
      const detailLines = card.detail.map((line) => escapeHtml(line)).join('<br>\n');
      cardsHtml += `
      <div class="hero-card ${cardClass}">
        <span class="hc-icon">${icon}</span>
        <div class="hc-label">${escapeHtml(card.label)}</div>
        <div class="hc-value">${escapeHtml(card.value)}</div>
        <div class="hc-detail">${detailLines}</div>
      </div>`;
    });

    document.getElementById('hero-root').innerHTML = `
    <div class="hero-eyebrow">${escapeHtml(h.eyebrow)}</div>
    <h1>${escapeHtml(headline.line1)}<span>${escapeHtml(headline.line2)}</span></h1>
    <p class="hero-sub">${subtitleHtml}</p>
    <div class="hero-cta">${ctaHtml}</div>
    <div class="hero-cards">${cardsHtml}</div>`;
  }

  function renderAbout(data) {
    const a = data.about;
    const headlineHtml = escapeHtml(a.headline).replace(/\n/g, '<br>');
    let parasHtml = '';
    (a.paragraphsHtml || []).forEach((html) => {
      parasHtml += `<p>${html}</p>`;
    });

    let eduHtml = '';
    data.education.forEach((edu) => {
      eduHtml += `
      <div class="edu-card">
        <div class="edu-degree">${escapeHtml(edu.degree)} · ${escapeHtml(edu.years)}</div>
        <div class="edu-title">${escapeHtml(edu.title)}</div>
        <div class="edu-school">${escapeHtml(edu.school)}</div>
      </div>`;
    });

    document.getElementById('about-root').innerHTML = `
    <div class="about-text reveal">
      <div class="section-label">${escapeHtml(a.sectionLabel)}</div>
      <h2>${headlineHtml}</h2>
      ${parasHtml}
    </div>
    <div class="edu-cards reveal">
      <div class="section-label">Education</div>
      ${eduHtml}
    </div>`;
  }

  function renderSkills(data) {
    const s = data.skills;
    let groupsHtml = '';
    s.groups.forEach((g) => {
      let tags = '';
      g.items.forEach((t) => {
        tags += `<span class="tag">${escapeHtml(t)}</span>`;
      });
      groupsHtml += `
      <div class="skill-group">
        <div class="skill-group-title">${escapeHtml(g.title)}</div>
        <div class="skill-tags">${tags}</div>
      </div>`;
    });

    document.getElementById('skills-root').innerHTML = `
    <div class="section-label">${escapeHtml(s.sectionLabel)}</div>
    <h2>${escapeHtml(s.headline)}</h2>
    <div class="skills-grid reveal">${groupsHtml}</div>`;
  }

  function renderExperience(data) {
    const e = data.experience;
    let itemsHtml = '';
    e.roles.forEach((role) => {
      let bullets = '';
      role.bullets.forEach((b) => {
        bullets += `<li>${escapeHtml(b)}</li>`;
      });
      itemsHtml += `
    <div class="exp-item reveal">
      <div class="exp-meta">
        <div class="exp-date">${escapeHtml(role.dateRange)}</div>
        <div class="exp-company">${escapeHtml(role.company)}<br>${escapeHtml(role.location)}</div>
      </div>
      <div>
        <div class="exp-role">${escapeHtml(role.title)}</div>
        <ul class="exp-bullets">${bullets}</ul>
      </div>
    </div>`;
    });

    document.getElementById('experience-root').innerHTML = `
    <div class="section-label">${escapeHtml(e.sectionLabel)}</div>
    <h2>${escapeHtml(e.headline)}</h2>
    ${itemsHtml}`;
  }

  function normalizeProjectImage(img) {
    if (typeof img === 'string' && img.trim()) return { src: img.trim(), alt: '' };
    if (img && typeof img.src === 'string' && img.src.trim()) {
      return { src: img.src.trim(), alt: (img.alt || '').trim() };
    }
    return null;
  }

  function getProjectImages(proj) {
    if (!Array.isArray(proj.images)) return [];
    return proj.images.map(normalizeProjectImage).filter(Boolean);
  }

  function renderProjectMedia(proj) {
    const imgs = getProjectImages(proj);
    const ph = proj.placeholder || {};
    if (imgs.length > 0) {
      if (imgs.length === 1) {
        const alt = imgs[0].alt || proj.title;
        return `<div class="project-media project-media--single"><img src="${escapeHtml(imgs[0].src)}" alt="${escapeHtml(alt)}" loading="lazy" decoding="async"></div>`;
      }
      let inner = '';
      imgs.forEach((im) => {
        inner += `<img src="${escapeHtml(im.src)}" alt="${escapeHtml(im.alt || proj.title)}" loading="lazy" decoding="async">`;
      });
      return `<div class="project-media project-media--multi"><div class="project-media-grid">${inner}</div></div>`;
    }
    if (proj.layout === 'wide' && ph.emoji && ph.label) {
      return `<div class="project-img-placeholder" style="background:linear-gradient(135deg,#0d2137 0%,#1a3455 100%);font-size:0.9rem;color:var(--grey-pale);letter-spacing:1px;flex-direction:column;gap:0.6rem;">
          <span style="font-size:3rem">${ph.emoji}</span>${escapeHtml(ph.label)}
        </div>`;
    }
    return `<div class="project-img-placeholder">${ph.emoji || ''}</div>`;
  }

  function renderProjectCard(proj) {
    const wide = proj.layout === 'wide';
    const cardClass = wide ? 'project-card wide reveal' : 'project-card reveal';
    const mediaHtml = renderProjectMedia(proj);
    const tagLine = proj.tags.map((t) => escapeHtml(t)).join(' · ');
    let bodyHtml = `
        <div class="project-tag">${tagLine}</div>
        <div class="project-title">${escapeHtml(proj.title)}</div>
        <p class="project-desc">${escapeHtml(proj.description)}</p>`;
    if (proj.constraints && proj.constraints.items && proj.constraints.items.length) {
      const constraintText = proj.constraints.items.map((x) => escapeHtml(x)).join(' · ');
      bodyHtml += `<p class="project-desc"><strong style="color:var(--warm)">${escapeHtml(proj.constraints.label)}:</strong> ${constraintText}</p>`;
    }
    bodyHtml += `<div class="project-result">${escapeHtml(proj.result)}</div>`;
    return `<div class="${cardClass}">${mediaHtml}<div class="project-body">${bodyHtml}</div></div>`;
  }

  function renderProjects(data) {
    const p = data.projects;
    const labels = p.categories || {};
    const order = ['hardware', 'software'];
    let html = `
    <div class="section-label">${escapeHtml(p.sectionLabel)}</div>
    <h2>${escapeHtml(p.headline)}</h2>`;

    order.forEach((key) => {
      const items = p[key];
      if (!items || !items.length) return;
      const cat = labels[key] || { title: key, description: '' };
      let gridHtml = '';
      items.forEach((proj) => {
        gridHtml += renderProjectCard(proj);
      });
      const descHtml = cat.description
        ? `<p class="project-category-desc">${escapeHtml(cat.description)}</p>`
        : '';
      html += `
    <div class="project-category">
      <h3 class="project-category-title">${escapeHtml(cat.title)}</h3>
      ${descHtml}
      <div class="projects-grid">${gridHtml}</div>
    </div>`;
    });

    document.getElementById('projects-root').innerHTML = html;
  }

  function renderContact(data) {
    const c = data.contact;
    let linksHtml = '';
    c.links.forEach((link) => {
      const target = link.type === 'linkedin' ? ' target="_blank" rel="noopener noreferrer"' : '';
      const text = contactLinkLabel(link.type, link.label);
      linksHtml += `<a href="${escapeHtml(link.href)}" class="contact-link"${target}>${escapeHtml(text)}</a>`;
    });

    document.getElementById('contact-root').innerHTML = `
    <div class="section-label" style="justify-content:center">${escapeHtml(c.sectionLabel)}</div>
    <h2>${escapeHtml(c.headline)}</h2>
    <p>${escapeHtml(c.body)}</p>
    <div class="contact-links reveal">${linksHtml}</div>
    <p style="font-size:0.78rem;color:var(--grey-mid)">${escapeHtml(c.footerNote)}</p>`;
  }

  function renderFooter(data) {
    const f = data.footer;
    document.getElementById('site-footer').innerHTML = `
    <div class="footer-name">${escapeHtml(f.name)}</div>
    <div class="footer-copy">${escapeHtml(f.credentials)}</div>`;
  }

  function initReveal() {
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('visible'), i * 75);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    reveals.forEach((el) => observer.observe(el));

    document.querySelectorAll('.skills-grid, .projects-grid, .edu-cards').forEach((grid) => {
      grid.querySelectorAll('.reveal').forEach((el, i) => {
        el.style.transitionDelay = `${i * 0.07}s`;
      });
    });
  }

  async function main() {
    const res = await fetch('content.json', { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to load content.json');
    const data = await res.json();

    document.title = data.meta.pageTitle;
    renderNav(data.meta, data.navigation);
    renderHero(data);
    renderAbout(data);
    renderSkills(data);
    renderExperience(data);
    renderProjects(data);
    renderContact(data);
    renderFooter(data);
    initReveal();
  }

  main().catch((err) => {
    console.error(err);
    document.body.insertAdjacentHTML(
      'afterbegin',
      '<p style="padding:2rem;background:#421;color:#fff;font-family:sans-serif">Could not load content. Open this page via a local server (e.g. <code>npx serve</code>) so <code>content.json</code> can be fetched.</p>'
    );
  });
})();
