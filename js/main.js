/**
 * WildCat Studio - WebToApp Studio Pro Official Website
 * Interactive Simulator & Mini Icon Studio Playground
 */

document.addEventListener('DOMContentLoaded', () => {
  initAppSimulator();
  initMiniIconStudio();
  initMiniSplashStudio();
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


/* ==========================================================================
   2b. Interactive Mini Splash Studio Playground
   ========================================================================== */
function initMiniSplashStudio() {
  const canvas = document.getElementById('webSplashCanvas');
  const titleInput = document.getElementById('webSplashTitle');
  const subtitleInput = document.getElementById('webSplashSubtitle');
  const fontSelect = document.getElementById('webSplashFont');
  const paletteSwatches = document.querySelectorAll('#webSplashPalettes .color-swatch');
  const indicatorBtns = document.querySelectorAll('#webSplashIndicators .shape-btn');
  const fadeBtn = document.getElementById('btnSimulateWebFade');
  const windowMockup = document.getElementById('webSplashWindow');

  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let title = 'My Desktop App';
  let subtitle = 'Loading Application...';
  let font = 'system';
  let bg1 = '#0f172a';
  let bg2 = '#1e293b';
  let indicator = 'bar';
  const accentColor = '#38bdf8';

  function drawRoundedRect(x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
  }

  function renderSplash() {
    const width = 960;
    const height = 640;

    // 1. Reset path & clear
    ctx.clearRect(0, 0, width, height);
    ctx.beginPath();

    ctx.save();

    // 2. Background gradient
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, bg1);
    grad.addColorStop(1, bg2);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // 3. Subtle radial center glow
    const radial = ctx.createRadialGradient(width / 2, height / 2 - 40, 10, width / 2, height / 2 - 40, 380);
    radial.addColorStop(0, 'rgba(255, 255, 255, 0.06)');
    radial.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = radial;
    ctx.fillRect(0, 0, width, height);

    // 4. Center App Logo Monogram
    const logoCenterY = 220;
    const logoSize = 130;
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = 'rgba(29, 104, 189, 0.35)';
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.7)';
    ctx.lineWidth = 4;
    drawRoundedRect((width - logoSize) / 2, logoCenterY - (logoSize / 2), logoSize, logoSize, 30);
    ctx.fill();
    ctx.stroke();

    // Lightning bolt in center
    ctx.beginPath();
    ctx.font = '64px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = '#38bdf8';
    ctx.shadowBlur = 18;
    ctx.fillText('⚡', width / 2, logoCenterY);
    ctx.restore();
    ctx.beginPath();

    // 5. Typography selection
    let fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    if (font === 'geometric') fontFamily = '"Trebuchet MS", Impact, Arial Black, sans-serif';
    else if (font === 'serif') fontFamily = 'Georgia, "Times New Roman", serif';
    else if (font === 'mono') fontFamily = 'Consolas, "Courier New", monospace';

    // 6. Title
    ctx.font = `bold 42px ${fontFamily}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.6)';
    ctx.shadowBlur = 12;
    ctx.shadowOffsetY = 4;
    ctx.fillStyle = '#ffffff';
    ctx.fillText(title, width / 2, 410);

    // 7. Subtitle
    ctx.font = `500 22px ${fontFamily}`;
    ctx.shadowBlur = 8;
    ctx.shadowOffsetY = 2;
    ctx.globalAlpha = 0.8;
    ctx.fillStyle = '#94a3b8';
    ctx.fillText(subtitle, width / 2, 465);
    ctx.globalAlpha = 1.0;
    ctx.shadowColor = 'transparent';

    // 8. Startup Indicator
    if (indicator === 'bar') {
      const barW = 320;
      const barH = 8;
      const barX = (width - barW) / 2;
      const barY = 540;

      // Track
      ctx.beginPath();
      ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
      drawRoundedRect(barX, barY, barW, barH, 4);
      ctx.fill();

      // Active fill
      ctx.beginPath();
      ctx.fillStyle = accentColor;
      ctx.shadowColor = accentColor;
      ctx.shadowBlur = 12;
      drawRoundedRect(barX, barY, barW * 0.65, barH, 4);
      ctx.fill();
      ctx.shadowColor = 'transparent';
      ctx.beginPath();
    } else if (indicator === 'ring') {
      const ringX = width / 2;
      const ringY = 545;
      const radius = 16;

      ctx.beginPath();
      ctx.arc(ringX, ringY, radius, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.lineWidth = 4;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(ringX, ringY, radius, -Math.PI / 2, Math.PI * 0.85);
      ctx.strokeStyle = accentColor;
      ctx.lineWidth = 4;
      ctx.shadowColor = accentColor;
      ctx.shadowBlur = 10;
      ctx.stroke();
      ctx.shadowColor = 'transparent';
      ctx.beginPath();
    } else if (indicator === 'dots') {
      const dotY = 545;
      const dots = [
        { x: width / 2 - 24, r: 5, alpha: 0.5 },
        { x: width / 2, r: 7, alpha: 1.0 },
        { x: width / 2 + 24, r: 5, alpha: 0.5 }
      ];
      dots.forEach(d => {
        ctx.beginPath();
        ctx.arc(d.x, dotY, d.r, 0, Math.PI * 2);
        ctx.fillStyle = accentColor;
        ctx.globalAlpha = d.alpha;
        ctx.shadowColor = accentColor;
        ctx.shadowBlur = 8;
        ctx.fill();
      });
      ctx.globalAlpha = 1.0;
      ctx.shadowColor = 'transparent';
      ctx.beginPath();
    }

    // 1px inner border
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
    ctx.lineWidth = 2;
    ctx.strokeRect(1, 1, width - 2, height - 2);

    ctx.restore();
    ctx.beginPath();
  }

  // Event Listeners
  if (titleInput) {
    titleInput.addEventListener('input', (e) => {
      title = e.target.value.trim() || 'My Application';
      renderSplash();
    });
  }

  if (subtitleInput) {
    subtitleInput.addEventListener('input', (e) => {
      subtitle = e.target.value.trim() || 'Loading Application...';
      renderSplash();
    });
  }

  if (fontSelect) {
    fontSelect.addEventListener('change', (e) => {
      font = e.target.value;
      renderSplash();
    });
  }

  paletteSwatches.forEach(swatch => {
    swatch.addEventListener('click', () => {
      paletteSwatches.forEach(s => s.classList.remove('active'));
      swatch.classList.add('active');
      bg1 = swatch.dataset.bg1 || '#0f172a';
      bg2 = swatch.dataset.bg2 || '#1e293b';
      renderSplash();
    });
  });

  indicatorBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      indicatorBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      indicator = btn.dataset.ind || 'bar';
      renderSplash();
    });
  });

  if (fadeBtn && windowMockup) {
    fadeBtn.addEventListener('click', () => {
      windowMockup.style.opacity = '0';
      windowMockup.style.transform = 'scale(0.96)';
      setTimeout(() => {
        windowMockup.style.opacity = '1';
        windowMockup.style.transform = 'scale(1)';
      }, 1500);
    });
  }

  renderSplash();
}
