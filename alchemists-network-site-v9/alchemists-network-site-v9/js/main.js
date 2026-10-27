(() => {
  const cfg = window.ALCHEMISTS_CONFIG || {};
  const links = cfg.whatsapp || {};
  const labels = cfg.interests || {};
  const formReady = cfg.ghlFormId && cfg.ghlFormId !== 'PASTE_GHL_FORM_ID_HERE';
  const TRACK_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'ref'];

  // Small safe wrappers: private browsing can block storage, the site must still work.
  const session = {
    get: (k) => { try { return sessionStorage.getItem(k); } catch (e) { return null; } },
    set: (k, v) => { try { sessionStorage.setItem(k, v); } catch (e) {} }
  };
  const local = {
    get: (k) => { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: (k, v) => { try { localStorage.setItem(k, v); } catch (e) {} }
  };

  // 1. Remember where the visitor came from (tracking links, SOP Chapter 8).
  const params = new URLSearchParams(window.location.search);
  TRACK_KEYS.forEach((k) => {
    const v = params.get(k);
    if (v) session.set('an_' + k, v.toLowerCase().trim());
  });

  // 2. Plain WhatsApp links (used only as a fallback or on other pages).
  document.querySelectorAll('[data-whatsapp]').forEach((el) => {
    const key = el.dataset.whatsapp;
    if (links[key]) el.href = links[key];
  });

  // 3. Interest cards open the join form dialog.
  const joinDialog = document.getElementById('join-dialog');
  const joinTitle = document.getElementById('join-title');
  const joinFrame = document.querySelector('.join-frame') || document.getElementById('join-form-frame');
  const joinClose = document.getElementById('join-close');

  const closeJoin = () => {
    if (!joinDialog) return;
    if (typeof joinDialog.close === 'function' && joinDialog.open) {
      joinDialog.close();
    } else {
      joinDialog.removeAttribute('open');
      joinDialog.style.display = 'none';
    }
    document.documentElement.classList.remove('dialog-open');
    document.body.classList.remove('dialog-open');
  };

  if (joinClose) {
    joinClose.addEventListener('click', closeJoin);
  }

  const joinChangeTopic = document.getElementById('join-change-topic');
  if (joinChangeTopic) {
    joinChangeTopic.addEventListener('click', () => {
      closeJoin();
      const target = document.querySelector('#interests');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

  if (joinDialog) {
    // Close on backdrop click (clicking outside the dialog card)
    joinDialog.addEventListener('click', (event) => {
      if (event.target === joinDialog) {
        closeJoin();
      }
    });
    // Handle native cancel/close (e.g., ESC key pressed)
    joinDialog.addEventListener('close', () => {
      document.documentElement.classList.remove('dialog-open');
      document.body.classList.remove('dialog-open');
    });
    joinDialog.addEventListener('cancel', () => {
      document.documentElement.classList.remove('dialog-open');
      document.body.classList.remove('dialog-open');
    });
  }

  // Handle GoHighLevel form submission
  window.addEventListener('message', (event) => {
    if (!event.data) return;
    const isSubmit = Array.isArray(event.data) && event.data[0] === 'set-sticky-contacts';
    if (isSubmit) {
      const key = (local.get('an_interest') || session.get('an_interest') || 'general').toLowerCase();
      // If testing on localhost, file protocol, or a preview domain, navigate to local /join/
      if (window.location.hostname !== 'www.alchemistsnetwork.com') {
        setTimeout(() => {
          window.location.href = './join/?interest=' + encodeURIComponent(key);
        }, 400);
      }
    }
  });

  const buildFormUrl = (key) => {
    const url = new URL(cfg.ghlFormBaseUrl + cfg.ghlFormId);
    if (key && labels[key]) {
      url.searchParams.set('interest', labels[key]);
    }
    TRACK_KEYS.forEach((k) => {
      const v = session.get('an_' + k);
      if (v) url.searchParams.set(k, v);
    });
    return url.toString();
  };

  const openJoin = (key) => {
    const hasInterest = Boolean(key && labels[key]);
    if (hasInterest) {
      local.set('an_interest', key);
      session.set('an_interest', key);
    } else {
      key = null;
      try { localStorage.removeItem('an_interest'); } catch (e) {}
      try { sessionStorage.removeItem('an_interest'); } catch (e) {}
    }

    // Form not connected yet: behave exactly like the old site.
    if (!formReady || !joinDialog || !joinFrame) {
      const fallbackKey = key || 'general';
      if (links[fallbackKey]) window.open(links[fallbackKey], '_blank', 'noopener');
      return;
    }

    if (joinTitle) {
      joinTitle.textContent = hasInterest ? ('Join ' + labels[key]) : 'Join Alchemists Network';
    }
    const src = buildFormUrl(key);
    if (joinFrame.getAttribute('src') !== src) {
      joinFrame.setAttribute('src', src);
    }

    if (typeof joinDialog.showModal === 'function') {
      if (!joinDialog.open) joinDialog.showModal();
    } else {
      joinDialog.setAttribute('open', '');
      joinDialog.style.display = 'block';
    }
    document.documentElement.classList.add('dialog-open');
    document.body.classList.add('dialog-open');
  };

  document.querySelectorAll('[data-interest]').forEach((el) => {
    el.addEventListener('click', (event) => {
      event.preventDefault();
      openJoin(el.dataset.interest);
    });
  });

  // 4. Smooth scrolling for in-page links.
  document.querySelectorAll('[data-scroll]').forEach((el) => {
    el.addEventListener('click', (event) => {
      const target = document.querySelector(el.dataset.scroll);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // 5. Mobile menu.
  const menuButton = document.querySelector('.menu-button');
  const nav = document.querySelector('.site-nav');
  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      menuButton.setAttribute('aria-expanded', String(open));
    });
    nav.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => {
      nav.classList.remove('is-open');
      menuButton.setAttribute('aria-expanded', 'false');
    }));
  }

  // 6. Auto-open join form if specified in URL query params (?join, ?form, ?interest=finance) or hash (#join).
  const hasJoinParam = params.has('join') || params.has('form');
  const interestParam = (params.get('interest') || '').toLowerCase().trim();
  const joinParam = (params.get('join') || params.get('form') || '').toLowerCase().trim();

  const hashVal = window.location.hash ? window.location.hash.replace(/^#/, '').toLowerCase().trim() : '';
  const hashInterest = hashVal.replace(/^join-?/, '');

  let shouldOpen = false;
  let targetInterest = null;

  if (labels[interestParam]) {
    shouldOpen = true;
    targetInterest = interestParam;
  } else if (labels[joinParam]) {
    shouldOpen = true;
    targetInterest = joinParam;
  } else if (labels[hashInterest] && hashInterest !== '') {
    shouldOpen = true;
    targetInterest = hashInterest;
  } else if (hasJoinParam || hashVal === 'join' || hashVal === 'form' || interestParam === 'none') {
    // Open with NO option selected
    shouldOpen = true;
    targetInterest = null;
  }

  if (shouldOpen) {
    setTimeout(() => {
      openJoin(targetInterest);
    }, 150);
  }

  // 7. Footer year.
  const year = document.querySelector('[data-year]');
  if (year) year.textContent = new Date().getFullYear();
})();
