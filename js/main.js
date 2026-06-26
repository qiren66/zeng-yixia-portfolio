/* ============================================================
   ZENG YIXIA Portfolio — Obys-style Interaction System
   Modules: Preloader | Cursor | Lenis | SplitText | ScrollTrigger
   ============================================================ */
(function () {
  'use strict';

  // ===== Globals =====
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const hasGSAP = typeof window.gsap !== 'undefined';
  const hasLenis = typeof window.Lenis !== 'undefined';
  const hasST = typeof window.ScrollTrigger !== 'undefined';
  const hasSplit = typeof window.SplitText !== 'undefined';
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouch = window.matchMedia('(hover: none) and (pointer: coarse)').matches;

  if (hasGSAP && hasST) gsap.registerPlugin(ScrollTrigger);

  // ============================================================
  // MODULE 1: i18n (bilingual support)
  // ============================================================
  const i18n = {
    zh: {
      'nav.about': '关于', 'nav.projects': '项目', 'nav.gallery': '画廊', 'nav.contact': '联系',
      'hero.pretitle': '交互产品设计', 'hero.name': '曾奕霞',
      'hero.school': '燕山大学 · 产品设计专业', 'hero.scrollHint': '向下滚动探索',
      'about.title': '关于我', 'about.subtitle': 'About the Designer',
      'about.bio': '我是曾奕霞,一名来自燕山大学产品设计专业的学生。专注于交通工具设计与装备设计方向,致力于将美学与功能完美融合。',
      'about.bio2': '绩点排名专业第一(1/24),多次获得国家级A类设计竞赛奖项,拥有5项专利授权。我相信好的设计源于对生活的深刻洞察与对技术的精准把控。',
      'about.statProjects': '6+', 'about.statProjectsLabel': '完整项目',
      'about.statPatentsLabel': '项专利授权', 'about.statAwardsLabel': '国家级奖项',
      'about.tag1': '交通工具设计', 'about.tag2': '概念产品设计', 'about.tag3': 'UI界面设计',
      'about.tag4': '信息可视化', 'about.tag5': '手绘表现',
      'about.highlight1': '国家励志奖学金 × 4', 'about.highlight2': '校级一等奖学金 × 4',
      'about.highlight3': '米兰设计周国赛一等奖',
      'projects.title': '精选项目', 'projects.subtitle': 'Selected Works',
      'projects.p1cat': '概念交通工具', 'projects.p1name': '睿翼 MINI',
      'projects.p1desc': '仿生鹰膜式内海通勤飞行器方案设计 · 含UI界面系统',
      'projects.p2cat': '智能移动系统', 'projects.p2desc': 'AI时代人本主义创造力系统概念车 · 270度全景座舱',
      'projects.p3cat': '赛车设计', 'projects.p3name': 'GAC 赛博赛车',
      'projects.p3desc': '赛博朋克风格广汽合作概念赛车 · 肌肉流线型语言',
      'projects.p4cat': '越野SUV', 'projects.p4desc': '极致硬核越野SUV设计方案 · 黑/绿野双版本',
      'projects.p5cat': '信息可视化', 'projects.p5desc': '船舶知识图谱信息可视化海报 + 品牌周边衍生品设计',
      'gallery.title': '创作画廊', 'gallery.subtitle': 'Gallery & Sketches',
      'gallery.fig1': '人物数字绘画系列', 'gallery.fig2': '产品设计手绘合集',
      'contact.title': '联系我', 'contact.subtitle': 'Get in Touch',
      'contact.text': '如果你对我的作品感兴趣,或者有任何合作意向,欢迎随时联系我。',
      'contact.phone': '电话: 19833536564', 'contact.school': '燕山大学 · 产品设计',
      'footer.pretitle': '我的设计之旅不止于此,期待与你再次相遇', 'footer.credit1': '2023-2026'
    },
    en: {
      'nav.about': 'About', 'nav.projects': 'Works', 'nav.gallery': 'Gallery', 'nav.contact': 'Contact',
      'hero.pretitle': 'Interaction Product Design', 'hero.name': 'ZENG YIXIA',
      'hero.school': 'Yanshan University · Product Design', 'hero.scrollHint': 'Scroll to explore',
      'about.title': 'About Me', 'about.subtitle': 'About the Designer',
      'about.bio': "I am Zeng Yixia, a product design student at Yanshan University. Specializing in transportation and equipment design, I strive to perfectly fuse aesthetics with functionality.",
      'about.bio2': 'Ranked 1st in the major (GPA 1/24), with multiple national A-level design competition awards and 5 granted patents.',
      'about.statProjects': '6+', 'about.statProjectsLabel': 'Full Projects',
      'about.statPatentsLabel': 'Patents Granted', 'about.statAwardsLabel': 'National Awards',
      'about.tag1': 'Transport Design', 'about.tag2': 'Concept Products', 'about.tag3': 'UI Design',
      'about.tag4': 'Data Visualization', 'about.tag5': 'Hand Sketching',
      'about.highlight1': 'National Encouragement Scholarship x4', 'about.highlight2': 'First-class Scholarship x4',
      'about.highlight3': 'Milan Design Week National 1st Prize',
      'projects.title': 'Selected Projects', 'projects.subtitle': 'Selected Works',
      'projects.p1cat': 'Concept Vehicle', 'projects.p1name': 'RUIYI MINI',
      'projects.p1desc': 'Bionic eagle-membrane inshore commuter aircraft design with UI system',
      'projects.p2cat': 'Smart Mobility', 'projects.p2desc': 'Humanistic creativity system concept car for AI era with 270° panoramic cockpit',
      'projects.p3cat': 'Racing Car', 'projects.p3name': 'GAC Cyber Racing',
      'projects.p3desc': 'Cyberpunk-style GAC collaboration concept racing car with muscular lines',
      'projects.p4cat': 'Off-road SUV', 'projects.p4desc': 'Extreme hardcore off-road SUV design in black / green dual versions',
      'projects.p5cat': 'Info Visualization', 'projects.p5desc': 'Ship knowledge graph infographic poster + brand merchandising design',
      'gallery.title': 'Creative Gallery', 'gallery.subtitle': 'Gallery & Sketches',
      'gallery.fig1': 'Digital Portrait Series', 'gallery.fig2': 'Product Design Sketches',
      'contact.title': 'Get in Touch', 'contact.subtitle': 'Get in Touch',
      'contact.text': 'If you are interested in my work or have any collaboration ideas, feel free to reach out.',
      'contact.phone': 'Tel: 19833536564', 'contact.school': 'Yanshan University · Product Design',
      'footer.pretitle': 'My design journey goes beyond this. Looking forward to meeting you again.', 'footer.credit1': '2023-2026'
    }
  };

  let currentLang = document.documentElement.getAttribute('data-lang') || 'zh';
  let splitsReady = false; // Track whether SplitText has been initialized

  function setLanguage(lang, isToggle = false) {
    currentLang = lang;
    document.documentElement.setAttribute('data-lang', lang);
    const toggle = $('#langToggle');
    if (toggle) toggle.textContent = lang === 'zh' ? 'EN' : '中文';

    // Update all i18n elements
    $$('[data-i18n]').forEach(function (el) {
      const key = el.getAttribute('data-i18n');
      if (i18n[lang] && i18n[lang][key]) el.textContent = i18n[lang][key];
    });
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';

    // Re-split text after language change (only if splits were already initialized and this is a toggle)
    if (isToggle && splitsReady && window.App) {
      window.App.splitText.reinit();
    }
  }

  // ============================================================
  // MODULE 2: Custom SplitText (char/line splitting + reveal)
  // ============================================================
  const SplitTextMgr = {
    splits: [],

    init() {
      // Always use manual splitting — more reliable than GSAP SplitText plugin
      // which adds inline position:relative and transform that conflict with yPercent
      this.splitManual();
      splitsReady = true;
    },

    splitWithPlugin() {
      $$('[data-split]').forEach((el) => {
        const type = el.getAttribute('data-split-type') || 'chars';
        const split = new SplitText(el, {
          type: type === 'lines' ? 'lines,chars' : 'chars,words',
          linesClass: 'split-line',
          charsClass: 'char',
          wordsClass: 'split-word'
        });

        // Wrap each line in overflow hidden for reveal effect
        if (split.lines) {
          split.lines.forEach((line) => {
            const wrapper = document.createElement('span');
            wrapper.style.display = 'block';
            wrapper.style.overflow = 'hidden';
            line.parentNode.insertBefore(wrapper, line);
            wrapper.appendChild(line);
          });
        }

        this.splits.push({ el, split, type });
      });
    },

    splitManual() {
      $$('[data-split]').forEach((el) => {
        const text = el.textContent.trim();
        const type = el.getAttribute('data-split-type') || 'chars';
        el.innerHTML = '';

        if (type === 'lines') {
          // Wrap entire text in a single line with overflow hidden
          // (true line-breaking requires layout measurement; this is a simplified approach)
          const lineWrapper = document.createElement('span');
          lineWrapper.className = 'split-line';
          lineWrapper.style.display = 'block';
          lineWrapper.style.overflow = 'hidden';

          const innerWrap = document.createElement('span');
          innerWrap.className = 'split-line-inner';
          innerWrap.style.display = 'block';

          text.split('').forEach((char) => {
            const charSpan = document.createElement('span');
            charSpan.className = 'char';
            charSpan.textContent = char === ' ' ? '\u00A0' : char;
            innerWrap.appendChild(charSpan);
          });
          lineWrapper.appendChild(innerWrap);
          el.appendChild(lineWrapper);
        } else {
          // chars type: just split into characters
          text.split('').forEach((char) => {
            const charSpan = document.createElement('span');
            charSpan.className = 'char';
            charSpan.textContent = char === ' ' ? '\u00A0' : char;
            el.appendChild(charSpan);
          });
        }

        // Set initial hidden state via GSAP (not CSS) to avoid transform conflicts
        if (hasGSAP) {
          gsap.set($$('.char', el), { yPercent: 110 });
        }
      });
    },

    // Reveal chars with stagger (Obys-style: slide up from below)
    reveal(el, delay = 0) {
      const chars = $$('.char', el);
      if (chars.length === 0) return;

      if (hasGSAP) {
        gsap.set(chars, { yPercent: 110 });
        gsap.to(chars, {
          yPercent: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.025,
          delay: delay
        });
      } else {
        // CSS fallback
        chars.forEach((c, i) => {
          c.style.transition = 'transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)';
          c.style.transitionDelay = (delay + i * 0.025) + 's';
          c.style.transform = 'translateY(0)';
        });
      }
    },

    reinit() {
      // Clean up old splits
      this.splits.forEach(({ el, split }) => {
        if (split && split.revert) split.revert();
      });
      this.splits = [];
      // Clear any remaining inline styles on split elements
      $$('[data-split]').forEach((el) => {
        el.removeAttribute('style');
      });
      // Re-split
      this.init();
      // Re-trigger scroll animations for new chars
      if (window.App && window.App.scrollAnims) {
        window.App.scrollAnims.textReveal();
      }
      // Reveal hero title
      this.triggerAllReveals();
    },

    triggerAllReveals() {
      // Trigger reveals for elements already in viewport
      $$('[data-split]').forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          this.reveal(el);
        }
      });
    }
  };

  // ============================================================
  // MODULE 3: Custom Cursor (Obys-style: lerp + text labels)
  // ============================================================
  const Cursor = {
    cursor: null,
    inner: null,
    target: { x: 0, y: 0 },
    pos: { x: 0, y: 0 },
    speed: 0.1,
    animate: false,
    splitter: null,
    elements: [],

    init() {
      this.cursor = $('#cursor');
      this.inner = $('#cursorInner');
      if (!this.cursor || !this.inner) return;
      if (isTouch) return;

      this.elements = $$('[data-cursor]');
      this.attachEvents();
      this.update();
    },

    attachEvents() {
      window.addEventListener('mousemove', (e) => {
        this.target.x = e.clientX;
        this.target.y = e.clientY;
        this.animate = true;
      });

      this.elements.forEach((el) => {
        el.addEventListener('mouseenter', (e) => this.onEnter(e, el));
        el.addEventListener('mouseleave', () => this.onLeave());
      });
    },

    onEnter(e, el) {
      const label = el.getAttribute('data-cursor') || 'VIEW';
      const theme = el.getAttribute('data-cursor-theme') || 'light';

      this.inner.innerHTML = '';
      const labelEl = document.createElement('span');
      labelEl.className = 'cursor__label';
      labelEl.textContent = label;
      this.inner.appendChild(labelEl);

      // Split label into chars
      const chars = label.split('');
      labelEl.innerHTML = chars.map(c => `<span class="char">${c}</span>`).join('');

      // Set theme
      this.cursor.setAttribute('cursor-theme', theme);
      document.body.classList.add('cursor-active');

      // Animate chars in (Obys-style: slide up from below)
      if (hasGSAP) {
        gsap.fromTo(labelEl.querySelectorAll('.char'),
          { yPercent: 110 },
          { yPercent: 0, duration: 0.4, ease: 'power3.out', stagger: 0.02 }
        );
      }
    },

    onLeave() {
      const labelEl = this.inner.querySelector('.cursor__label');
      document.body.classList.remove('cursor-active');

      if (labelEl && hasGSAP) {
        gsap.to(labelEl.querySelectorAll('.char'), {
          yPercent: -110,
          duration: 0.25,
          ease: 'power3.out',
          stagger: 0.02,
          onComplete: () => {
            this.inner.innerHTML = '';
            this.cursor.removeAttribute('cursor-theme');
          }
        });
      } else {
        this.inner.innerHTML = '';
        this.cursor.removeAttribute('cursor-theme');
      }
    },

    update() {
      if (this.animate) {
        // Lerp (linear interpolation) for smooth trailing
        this.pos.x += (this.target.x - this.pos.x) * this.speed;
        this.pos.y += (this.target.y - this.pos.y) * this.speed;

        // Update CSS variables
        document.documentElement.style.setProperty('--cursor-x', this.pos.x);
        document.documentElement.style.setProperty('--cursor-y', this.pos.y);

        // Stop when close enough
        if (Math.abs(this.target.x - this.pos.x) < 0.1 && Math.abs(this.target.y - this.pos.y) < 0.1) {
          this.animate = false;
        }
      }
      requestAnimationFrame(() => this.update());
    }
  };

  // ============================================================
  // MODULE 4: Preloader (Obys-style: letter reveal + progress)
  // ============================================================
  const Preloader = {
    holder: null,
    letters: [],
    progressEl: null,
    progress: 0,
    startTime: 0,
    duration: 2800,

    init() {
      this.holder = $('#preloader');
      if (!this.holder) { this.done(); return; }
      if (reduceMotion) { this.done(); return; }

      this.letters = $$('.preloader__letter', this.holder);
      this.progressEl = $('[data-preloader-progress]', this.holder);

      // Wait for fonts then start
      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(() => this.animate());
      } else {
        setTimeout(() => this.animate(), 200);
      }
    },

    animate() {
      const tl = gsap.timeline({
        onComplete: () => this.done()
      });

      // 1. Reveal letters one by one (slide up from below)
      tl.to(this.letters, {
        y: '0%',
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.06
      });

      // 2. Animate progress counter 000 → 100
      const counter = { val: 0 };
      tl.to(counter, {
        val: 100,
        duration: 1.8,
        ease: 'power2.inOut',
        onUpdate: () => {
          if (this.progressEl) {
            this.progressEl.textContent = String(Math.round(counter.val)).padStart(3, '0');
          }
        }
      }, '-=0.4');

      // 3. Hold briefly
      tl.to({}, { duration: 0.3 });

      // 4. Hide letters (slide down)
      tl.to(this.letters, {
        y: '110%',
        duration: 0.5,
        ease: 'power3.in',
        stagger: 0.02
      }, '+=0.1');

      // 5. Fade out preloader
      tl.to(this.holder, {
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out'
      }, '-=0.2');
    },

    done() {
      if (this.holder) {
        this.holder.classList.add('is-done');
        setTimeout(() => { this.holder.style.display = 'none'; }, 800);
      }
      // Trigger initial hero animations
      if (window.App) window.App.heroIntro();
    }
  };

  // ============================================================
  // MODULE 5: Lenis Smooth Scroll
  // ============================================================
  const SmoothScroll = {
    lenis: null,

    init() {
      if (!hasLenis || reduceMotion) {
        this.fallback();
        return;
      }

      this.lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        smoothTouch: false,
      });

      // Sync with GSAP ScrollTrigger
      if (hasGSAP && hasST) {
        this.lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add((time) => this.lenis.raf(time * 1000));
        gsap.ticker.lagSmoothing(0);
      } else {
        const raf = (time) => {
          this.lenis.raf(time);
          requestAnimationFrame(raf);
        };
        requestAnimationFrame(raf);
      }

      // Smooth anchor links
      $$('[data-scroll]').forEach((link) => {
        link.addEventListener('click', (e) => {
          const href = link.getAttribute('href');
          if (href && href.startsWith('#')) {
            e.preventDefault();
            const target = $(href);
            if (target) {
              this.lenis.scrollTo(target, { offset: 0 });
            }
          }
        });
      });

      // Nav hide/show on scroll
      const nav = $('#nav');
      if (nav) {
        let lastY = 0;
        this.lenis.on('scroll', ({ scroll }) => {
          const y = scroll || 0;
          if (y > 100 && y > lastY) {
            nav.classList.add('hidden');
          } else {
            nav.classList.remove('hidden');
          }
          lastY = y;
        });
      }
    },

    fallback() {
      // Native smooth scroll for anchors
      $$('[data-scroll]').forEach((link) => {
        link.addEventListener('click', (e) => {
          const href = link.getAttribute('href');
          if (href && href.startsWith('#')) {
            e.preventDefault();
            const target = $(href);
            if (target) target.scrollIntoView({ behavior: 'smooth' });
          }
        });
      });
    },

    scrollTo(target, opts = {}) {
      if (this.lenis) {
        this.lenis.scrollTo(target, opts);
      } else if (target instanceof HTMLElement) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    },

    stop() { if (this.lenis) this.lenis.stop(); },
    start() { if (this.lenis) this.lenis.start(); }
  };

  // ============================================================
  // MODULE 6: ScrollTrigger Animations (parallax + reveal)
  // ============================================================
  const ScrollAnims = {
    init() {
      if (!hasGSAP || !hasST) {
        this.fallbackReveal();
        return;
      }

      this.parallax();
      this.textReveal();
      this.projectReveal();
      this.galleryReveal();
    },

    // Parallax: elements with [data-parallax] move at different speeds
    parallax() {
      $$('[data-parallax]').forEach((el) => {
        const speed = parseFloat(el.getAttribute('data-parallax-speed')) || 0.1;

        gsap.to(el, {
          y: () => speed * window.innerHeight * -1,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
            invalidateOnRefresh: true
          }
        });
      });
    },

    // Text reveal: [data-split] elements animate chars on scroll
    textReveal() {
      $$('[data-split]').forEach((el) => {
        // Skip hero (animated on load)
        if (el.closest('.hero')) return;

        const chars = $$('.char', el);
        if (chars.length === 0) return;

        gsap.set(chars, { yPercent: 110 });

        ScrollTrigger.create({
          trigger: el,
          start: 'top 85%',
          onEnter: () => {
            gsap.to(chars, {
              yPercent: 0,
              duration: 0.8,
              ease: 'power3.out',
              stagger: 0.025
            });
          },
          onLeaveBack: () => {
            gsap.set(chars, { yPercent: 110 });
          }
        });
      });
    },

    // Project items: header + content + image reveal
    projectReveal() {
      $$('.proj-item').forEach((item) => {
        const header = $('.proj-item__header', item);
        const content = $('.proj-item__content', item);
        const image = $('.proj-item__image', item);

        ScrollTrigger.create({
          trigger: item,
          start: 'top 60%',
          onEnter: () => {
            item.classList.add('is-visible', 'in-view');
          },
          onLeaveBack: () => {
            item.classList.remove('in-view');
          }
        });
      });

      // Progress bar update
      this.projectProgress();
    },

    projectProgress() {
      const sections = $$('.proj-item');
      const total = sections.length;
      const progressBar = $('#projectsProgressBar');
      const dotsContainer = $('#projectsDots');

      // Build dots
      if (dotsContainer && dotsContainer.children.length === 0) {
        for (let i = 0; i < total; i++) {
          const btn = document.createElement('button');
          btn.className = 'projects__dot' + (i === 0 ? ' is-active' : '');
          btn.setAttribute('aria-label', 'Go to project ' + (i + 1));
          btn.addEventListener('click', () => {
            SmoothScroll.scrollTo(sections[i]);
          });
          dotsContainer.appendChild(btn);
        }
      }

      const updateProgress = (idx) => {
        if (progressBar) {
          const pct = ((idx + 1) / total) * 100;
          progressBar.style.setProperty('--progress', pct + '%');
          const barAfter = progressBar;
          if (barAfter) barAfter.style.setProperty('--progress-w', pct + '%');
        }
        if (dotsContainer) {
          $$('.projects__dot', dotsContainer).forEach((d, i) => {
            d.classList.toggle('is-active', i === idx);
          });
        }
      };

      // Observe which project is most visible
      if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
              const idx = parseInt(entry.target.getAttribute('data-proj-index'), 10);
              updateProgress(idx);
            }
          });
        }, { threshold: [0, 0.5, 0.8], rootMargin: '-10% 0px -10% 0px' });

        sections.forEach((s) => observer.observe(s));
      }
    },

    galleryReveal() {
      $$('[data-reveal]').forEach((el) => {
        ScrollTrigger.create({
          trigger: el,
          start: 'top 85%',
          onEnter: () => el.classList.add('is-visible'),
          onLeaveBack: () => el.classList.remove('is-visible')
        });
      });
    },

    fallbackReveal() {
      if ('IntersectionObserver' in window) {
        const obs = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible', 'in-view');
            }
          });
        }, { threshold: 0.15 });
        $$('[data-reveal], .proj-item').forEach((el) => obs.observe(el));
      } else {
        $$('[data-reveal], .proj-item').forEach((el) => el.classList.add('is-visible'));
      }
    }
  };

  // ============================================================
  // MODULE 7: Modal (project detail lightbox)
  // ============================================================
  const projectImageSets = {
    ruiyi: {
      title: { zh: '睿翼 MINI', en: 'RUIYI MINI' },
      desc: { zh: '仿生鹰膜式内海通勤飞行器方案设计 · 含UI界面系统', en: 'Bionic eagle-membrane inshore commuter aircraft design with UI system' },
      images: [
        'assets/images/projects/ruiyi/p2.jpg',
        'assets/images/projects/ruiyi/p3.jpg',
        'assets/images/projects/ruiyi/p4.jpg',
        'assets/images/projects/ruiyi/p5.jpg',
        'assets/images/projects/ruiyi/p6.jpg',
        'assets/images/projects/ruiyi/p7.jpg',
        'assets/images/projects/ruiyi/p8.jpg'
      ]
    },
    hyptec: {
      title: { zh: 'HYPTEC SEED', en: 'HYPTEC SEED' },
      desc: { zh: 'AI时代人本主义创造力系统概念车 · 270度全景座舱', en: 'Humanistic creativity concept car for AI era with 270° panoramic cockpit' },
      images: [
        'assets/images/projects/hyptec/p9.jpg',
        'assets/images/projects/hyptec/p10.jpg',
        'assets/images/projects/hyptec/p11.jpg',
        'assets/images/projects/hyptec/p12.jpg',
        'assets/images/projects/hyptec/p13.jpg',
        'assets/images/projects/hyptec/p14.jpg',
        'assets/images/projects/hyptec/p15.jpg',
        'assets/images/projects/hyptec/p16.jpg',
        'assets/images/projects/hyptec/p17.jpg'
      ]
    },
    gac: {
      title: { zh: 'GAC 赛博赛车', en: 'GAC Cyber Racing' },
      desc: { zh: '赛博朋克风格广汽合作概念赛车 · 肌肉流线型语言', en: 'Cyberpunk-style GAC collaboration concept racing car with muscular lines' },
      images: [
        'assets/images/projects/gac/p18.jpg',
        'assets/images/projects/gac/p19.jpg',
        'assets/images/projects/gac/p20.jpg',
        'assets/images/projects/gac/p21.jpg',
        'assets/images/projects/gac/p22.jpg',
        'assets/images/projects/gac/p23.jpg'
      ]
    },
    kaiqing: {
      title: { zh: 'KAIQING HANYU', en: 'KAIQING HANYU' },
      desc: { zh: '极致硬核越野SUV设计方案 · 黑/绿野双版本', en: 'Extreme hardcore off-road SUV design in black / green dual versions' },
      images: [
        'assets/images/projects/kaiqing/p24.jpg',
        'assets/images/projects/kaiqing/p25.jpg',
        'assets/images/projects/kaiqing/p26.jpg',
        'assets/images/projects/kaiqing/p27.jpg'
      ]
    },
    seaworld: {
      title: { zh: 'SEA WORLD', en: 'SEA WORLD' },
      desc: { zh: '船舶知识图谱信息可视化海报 + 品牌周边衍生品设计', en: 'Ship knowledge graph infographic poster + brand merchandising design' },
      images: [
        'assets/images/projects/seaworld/p28.jpg',
        'assets/images/projects/seaworld/p29.jpg',
        'assets/images/projects/seaworld/p30.jpg',
        'assets/images/projects/seaworld/p31.jpg'
      ]
    }
  };

  const galleryImages = [
    { src: 'assets/images/gallery/p33.jpg', alt: '人物数字绘画系列' },
    { src: 'assets/images/gallery/p34.jpg', alt: '产品设计手绘合集' }
  ];

  const Modal = {
    modal: null,
    img: null,
    images: [],
    idx: 0,
    mode: null, // 'project' or 'gallery'
    currentProject: null,

    init() {
      this.modal = $('#modal');
      this.img = $('#modalImage');
      if (!this.modal || !this.img) return;

      // Direct click handlers on project images
      $$('.proj-item').forEach((item) => {
        const projIndex = parseInt(item.getAttribute('data-proj-index'), 10);
        const projKeys = Object.keys(projectImageSets);
        const projKey = projKeys[projIndex];
        if (!projKey) return;

        const imageEl = $('.proj-item__image', item);
        if (imageEl) {
          imageEl.style.cursor = 'pointer';
          imageEl.addEventListener('click', (e) => {
            e.stopPropagation();
            this.openProject(projKey, 0);
          });
        }
      });

      // Gallery image click handlers
      $$('.gallery__item').forEach((el, i) => {
        el.style.cursor = 'pointer';
        el.addEventListener('click', (e) => {
          e.stopPropagation();
          this.openGallery(i);
        });
      });

      // Fallback: document-level event delegation for project images
      // (ensures clicks work even if Lenis/transforms interfere)
      document.addEventListener('click', (e) => {
        if (this.modal.classList.contains('is-active')) return; // ignore clicks when modal open

        const projImage = e.target.closest('.proj-item__image');
        if (projImage) {
          const projItem = projImage.closest('.proj-item');
          if (projItem) {
            const projIndex = parseInt(projItem.getAttribute('data-proj-index'), 10);
            const projKeys = Object.keys(projectImageSets);
            const projKey = projKeys[projIndex];
            if (projKey) {
              e.preventDefault();
              this.openProject(projKey, 0);
            }
          }
          return;
        }

        const galleryItem = e.target.closest('.gallery__item');
        if (galleryItem) {
          const items = $$('.gallery__item');
          const idx = items.indexOf(galleryItem);
          if (idx >= 0) {
            e.preventDefault();
            this.openGallery(idx);
          }
        }
      });

      $('#modalClose')?.addEventListener('click', () => this.close());
      $('#modalPrev')?.addEventListener('click', () => this.nav(-1));
      $('#modalNext')?.addEventListener('click', () => this.nav(1));

      document.addEventListener('keydown', (e) => {
        if (!this.modal.classList.contains('is-active')) return;
        if (e.key === 'Escape') this.close();
        if (e.key === 'ArrowLeft') this.nav(-1);
        if (e.key === 'ArrowRight') this.nav(1);
      });

      this.modal.addEventListener('click', (e) => {
        if (e.target === this.modal) this.close();
      });
    },

    openProject(projKey, startIdx) {
      const proj = projectImageSets[projKey];
      if (!proj) return;
      this.mode = 'project';
      this.currentProject = projKey;
      this.images = proj.images.map(src => ({ src, alt: proj.title.zh }));
      this.idx = startIdx || 0;
      this.updateView();
      this.showModal();
    },

    openGallery(startIdx) {
      this.mode = 'gallery';
      this.currentProject = null;
      this.images = galleryImages;
      this.idx = startIdx || 0;
      this.updateView();
      this.showModal();
    },

    updateView() {
      const item = this.images[this.idx];
      this.img.src = item.src;
      this.img.alt = item.alt;

      const counter = $('#modalCounter');
      if (counter) counter.textContent = (this.idx + 1) + ' / ' + this.images.length;

      // Update modal info
      const titleEl = $('#modalTitle');
      const descEl = $('#modalDesc');
      if (this.mode === 'project' && this.currentProject) {
        const proj = projectImageSets[this.currentProject];
        const lang = currentLang || 'zh';
        if (titleEl) titleEl.textContent = proj.title[lang];
        if (descEl) descEl.textContent = proj.desc[lang];
        $('#modalInfo').style.display = '';
      } else {
        if (titleEl) titleEl.textContent = item.alt;
        if (descEl) descEl.textContent = '';
        $('#modalInfo').style.display = '';
      }
    },

    showModal() {
      this.modal.classList.add('is-active');
      SmoothScroll.stop();
      if (hasGSAP) {
        gsap.fromTo(this.img, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.4, ease: 'power2.out' });
      }
    },

    close() {
      if (hasGSAP) {
        gsap.to(this.img, {
          opacity: 0, scale: 0.95, duration: 0.25, ease: 'power2.in',
          onComplete: () => {
            this.modal.classList.remove('is-active');
            SmoothScroll.start();
          }
        });
      } else {
        this.modal.classList.remove('is-active');
        SmoothScroll.start();
      }
    },

    nav(dir) {
      this.idx = (this.idx + dir + this.images.length) % this.images.length;
      this.updateView();
    }
  };

  // ============================================================
  // MODULE 8: Hero intro animation (after preloader)
  // ============================================================
  function heroIntro() {
    const heroTitle = $('.hero__title');
    const heroPretitle = $('.hero__pretitle');
    const heroName = $('.hero__name');
    const heroSchool = $('.hero__school');
    const scrollHint = $('.hero__scroll-hint');

    if (hasGSAP) {
      const tl = gsap.timeline({ delay: 0.2 });

      // Title chars: set to hidden first, then slide up
      const titleChars = $$('.char', heroTitle);
      if (titleChars.length > 0) {
        gsap.set(titleChars, { yPercent: 110 });
        tl.to(titleChars, {
          yPercent: 0,
          duration: 1,
          ease: 'power3.out',
          stagger: 0.04
        });
      }

      // Other hero elements fade in
      if (heroPretitle) tl.fromTo(heroPretitle, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6');
      if (heroName) tl.fromTo(heroName, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6');
      if (heroSchool) tl.fromTo(heroSchool, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6');
      if (scrollHint) tl.to(scrollHint, { opacity: 1, duration: 0.6, ease: 'power2.out' }, '-=0.3');
    } else {
      // CSS fallback
      [heroPretitle, heroName, heroSchool, scrollHint].forEach((el) => {
        if (el) { el.style.opacity = '1'; el.style.transform = 'none'; }
      });
    }
  }

  // ============================================================
  // MAIN APP
  // ============================================================
  let _initDone = false;

  window.App = {
    splitText: SplitTextMgr,
    scrollAnims: ScrollAnims,
    heroIntro: heroIntro,

    init() {
      if (_initDone) return; // Prevent multiple init calls
      _initDone = true;

      // 1. Set language (no reinit on first call)
      setLanguage(currentLang);

      // 2. Split text (must happen before animations)
      SplitTextMgr.init();

      // 3. Cursor (skip on touch)
      if (!isTouch) Cursor.init();

      // 4. Smooth scroll
      SmoothScroll.init();

      // 5. Scroll animations
      ScrollAnims.init();

      // 6. Modal
      Modal.init();

      // 7. Language toggle
      $('#langToggle')?.addEventListener('click', () => {
        setLanguage(currentLang === 'zh' ? 'en' : 'zh', true);
      });

      // 8. Start preloader (which triggers heroIntro on complete)
      if (!reduceMotion && hasGSAP) {
        Preloader.init();
      } else {
        Preloader.done();
      }

      console.log('%c ZENG YIXIA Portfolio — Obys Style ', 'background:#0a0a0a;color:#fff;padding:6px 12px;border-radius:4px;font-weight:bold;');
    }
  };

  // Start when DOM is ready AND fonts are loaded
  function startup() {
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => window.App.init());
    } else {
      window.App.init();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startup);
  } else {
    startup();
  }

})();
