/**
 * WildCat Studio - WebToApp Studio Pro Official Website
 * Interactive Simulator & Mini Icon Studio Playground
 */

document.addEventListener('DOMContentLoaded', () => {
  initAppSimulator();
  initMiniIconStudio();
  initHashCopy();
  initFaqAccordion();
  initMobileNav();
});

/* ==========================================================================
   1. Interactive App Window Simulator
   ========================================================================== */
function initAppSimulator() {
  const presetButtons = document.querySelectorAll('.preset-btn');
  const viewport = document.getElementById('mockupViewport');
  const addressUrl = document.getElementById('mockupUrl');

  if (!viewport || !presetButtons.length) return;

  const presets = {
    game: {
      url: 'https://app.local/space-arcade/',
      render: () => `
        <div class="view-game">
          <div class="game-canvas-preview">
            <div class="game-starfield"></div>
            <div class="game-hud">
              <span>SCORE: 18,450</span>
              <span>LIVES: 3</span>
              <span>ENGINE: WebGL 60FPS</span>
            </div>
            <div class="game-ship">
              <svg viewBox="0 0 24 24" fill="#60a5fa"><path d="M12 2L2 22h20L12 2zm0 4.5l6.5 13.5h-13L12 6.5z"/></svg>
            </div>
          </div>
        </div>`
    },
    saas: {
      url: 'https://app.local/saas-dashboard-client/',
      render: () => `
        <div class="view-saas">
          <div class="saas-sidebar">
            <div class="saas-nav-item active"></div>
            <div class="saas-nav-item"></div>
            <div class="saas-nav-item"></div>
            <div class="saas-nav-item"></div>
          </div>
          <div class="saas-main">
            <div style="background:rgba(29,104,189,0.18);border:1px solid rgba(29,104,189,0.4);border-radius:6px;padding:6px 12px;font-size:0.75rem;color:#bfdbfe;display:flex;align-items:center;gap:6px;">
              <span>💡</span>
              <span><strong>Packaging Use Case:</strong> Turn your company's React/Vue cloud dashboard or SaaS URL into a fast 32MB native desktop app.</span>
            </div>
            <div class="saas-cards-row">
              <div class="saas-card"><div style="font-size:0.75rem;color:#94a3b8;">Active Users</div><div style="font-size:1.2rem;font-weight:700;">12,842</div></div>
              <div class="saas-card"><div style="font-size:0.75rem;color:#94a3b8;">Conversions</div><div style="font-size:1.2rem;font-weight:700;color:#38bdf8;">+28.4%</div></div>
              <div class="saas-card"><div style="font-size:0.75rem;color:#94a3b8;">RAM Usage</div><div style="font-size:1.2rem;font-weight:700;color:#34d399;">32 MB</div></div>
            </div>
            <div class="saas-chart">
              <div class="chart-bar" style="height: 45%;"></div>
              <div class="chart-bar" style="height: 70%;"></div>
              <div class="chart-bar" style="height: 55%;"></div>
              <div class="chart-bar" style="height: 85%;"></div>
              <div class="chart-bar" style="height: 60%;"></div>
              <div class="chart-bar" style="height: 95%;"></div>
            </div>
          </div>
        </div>`
    },
    media: {
      url: 'https://app.local/soundwave-fm/',
      render: () => `
        <div class="view-media">
          <div style="font-size:0.9rem;font-weight:700;color:#f8fafc;">Now Playing: Synthwave Odyssey (Lossless)</div>
          <div class="audio-bars">
            <div class="audio-bar" style="animation-delay: 0.1s;"></div>
            <div class="audio-bar" style="animation-delay: 0.3s;"></div>
            <div class="audio-bar" style="animation-delay: 0.15s;"></div>
            <div class="audio-bar" style="animation-delay: 0.4s;"></div>
            <div class="audio-bar" style="animation-delay: 0.25s;"></div>
            <div class="audio-bar" style="animation-delay: 0.5s;"></div>
            <div class="audio-bar" style="animation-delay: 0.2s;"></div>
            <div class="audio-bar" style="animation-delay: 0.35s;"></div>
          </div>
          <div style="font-size:0.75rem;color:#94a3b8;">Web Audio API • Latency: 2.1ms</div>
        </div>`
    }
  };

  presetButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      presetButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const presetKey = btn.dataset.preset;
      if (presets[presetKey]) {
        viewport.innerHTML = presets[presetKey].render();
        if (addressUrl) addressUrl.textContent = presets[presetKey].url;
      }
    });
  });
}

/* ==========================================================================
   2. Interactive Mini Icon Studio Playground
   ========================================================================== */
function initMiniIconStudio() {
  const textInput = document.getElementById('studioInitials');
  const shapeBtns = document.querySelectorAll('.shape-btn');
  const swatches = document.querySelectorAll('.color-swatch');
  const iconTargets = document.querySelectorAll('.icon-render-target');

  let currentText = 'WCS';
  let currentShape = 'squircle';
  let currentGradient = 'linear-gradient(135deg, #1d68bd, #e11d48)';

  const shapeRadii = {
    squircle: '28%',
    circle: '50%',
    rounded: '14px',
    square: '4px'
  };

  function updateMockups() {
    iconTargets.forEach(target => {
      target.textContent = currentText;
      target.style.borderRadius = shapeRadii[currentShape];
      target.style.background = currentGradient;
    });
  }

  if (textInput) {
    textInput.addEventListener('input', (e) => {
      currentText = (e.target.value.trim() || 'WCS').toUpperCase().slice(0, 4);
      updateMockups();
    });
  }

  shapeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      shapeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentShape = btn.dataset.shape;
      updateMockups();
    });
  });

  swatches.forEach(swatch => {
    swatch.addEventListener('click', () => {
      swatches.forEach(s => s.classList.remove('active'));
      swatch.classList.add('active');
      const gradient = getComputedStyle(swatch).backgroundImage;
      if (gradient && gradient !== 'none') {
        currentGradient = gradient;
        updateMockups();
      }
    });
  });

  updateMockups();
}

/* ==========================================================================
   3. One-Click SHA-256 Copy
   ========================================================================== */
function initHashCopy() {
  const copyButtons = document.querySelectorAll('.copy-hash-btn');

  copyButtons.forEach(btn => {
    btn.addEventListener('click', async () => {
      const hash = btn.dataset.hash;
      if (!hash) return;

      try {
        await navigator.clipboard.writeText(hash);
        const originalText = btn.textContent;
        btn.textContent = 'Copied!';
        btn.style.borderColor = '#10b981';
        btn.style.color = '#34d399';

        setTimeout(() => {
          btn.textContent = originalText;
          btn.style.borderColor = '';
          btn.style.color = '';
        }, 2000);
      } catch (err) {
        console.error('Clipboard copy failed:', err);
      }
    });
  });
}

/* ==========================================================================
   4. FAQ Accordion
   ========================================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    if (question && answer) {
      question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        faqItems.forEach(otherItem => {
          otherItem.classList.remove('active');
          const otherAnswer = otherItem.querySelector('.faq-answer');
          if (otherAnswer) otherAnswer.style.maxHeight = null;
        });

        if (!isActive) {
          item.classList.add('active');
          answer.style.maxHeight = answer.scrollHeight + 'px';
        }
      });
    }
  });
}

/* ==========================================================================
   5. Mobile Navigation
   ========================================================================== */
function initMobileNav() {
  const toggle = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      const isVisible = getComputedStyle(navLinks).display !== 'none';
      if (isVisible) {
        navLinks.style.display = 'none';
      } else {
        navLinks.style.display = 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '72px';
        navLinks.style.left = '0';
        navLinks.style.right = '0';
        navLinks.style.background = '#0a0f1d';
        navLinks.style.padding = '24px';
        navLinks.style.borderBottom = '1px solid rgba(255,255,255,0.1)';
      }
    });
  }
}
