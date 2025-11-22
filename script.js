// ============================================
// Theme Toggle
// ============================================

const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('.theme-icon');
const html = document.documentElement;

// Load saved theme or default to light
const savedTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
}

// ============================================
// Mobile Menu Toggle
// ============================================

const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ============================================
// Performance Optimization: Debounce
// ============================================

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ============================================
// Smooth Scroll & Active Navigation
// ============================================

const sections = document.querySelectorAll('section[id]');
const navbar = document.getElementById('navbar');

function updateActiveNav() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLink?.classList.add('active');
        } else {
            navLink?.classList.remove('active');
        }
    });

    // Navbar background on scroll
    if (scrollY > 50) {
        navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }
}

// Use optimized scroll handler with debounce
const optimizedScrollHandler = debounce(updateActiveNav, 10);
window.addEventListener('scroll', optimizedScrollHandler, { passive: true });
updateActiveNav();

// ============================================
// Typing Animation
// ============================================

const typingText = document.getElementById('typingText');
const phrases = [
    'npm install awesome-project',
    'git commit -m "Initial commit"',
    'docker-compose up',
    'npm run dev',
    'code --version'
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeText() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        typingText.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typingText.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
        typingSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingSpeed = 500;
    }

    setTimeout(typeText, typingSpeed);
}

// Start typing animation after a delay
setTimeout(() => {
    typeText();
}, 1000);

// ============================================
// Intersection Observer for Animations
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for fade-in animation
const animateElements = document.querySelectorAll(
    '.project-card, .skill-category, .about-text, .about-image'
);

animateElements.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(el);
});

// ============================================
// Skill Progress Bars Animation
// ============================================

const skillProgressBars = document.querySelectorAll('.skill-progress');

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progress = entry.target.getAttribute('data-progress');
            entry.target.style.width = `${progress}%`;
            entry.target.style.opacity = '1';
        }
    });
}, { threshold: 0.5 });

skillProgressBars.forEach(bar => {
    bar.style.width = '0';
    bar.style.opacity = '0';
    skillObserver.observe(bar);
});

// ============================================
// Contact Form Handling
// ============================================

const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };

    // Simulate form submission
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    submitButton.textContent = 'Отправка...';
    submitButton.disabled = true;

    // Simulate API call
    setTimeout(() => {
        submitButton.textContent = 'Отправлено! ✓';
        submitButton.style.background = 'linear-gradient(135deg, #27c93f 0%, #20b836 100%)';
        
        // Reset form
        contactForm.reset();
        
        // Reset button after 3 seconds
        setTimeout(() => {
            submitButton.textContent = originalText;
            submitButton.disabled = false;
            submitButton.style.background = '';
        }, 3000);

        // Show success message (you can replace this with actual form submission)
        console.log('Form submitted:', formData);
    }, 1500);
});

// ============================================
// Parallax Effect for Hero Section
// ============================================

const heroBackground = document.querySelector('.hero-background');
const orbs = document.querySelectorAll('.gradient-orb');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroSection = document.querySelector('.hero');
    const heroHeight = heroSection.offsetHeight;
    
    if (scrolled < heroHeight) {
        orbs.forEach((orb, index) => {
            const speed = (index + 1) * 0.5;
            const yPos = -(scrolled * speed);
            orb.style.transform = `translateY(${yPos}px)`;
        });
    }
});

// ============================================
// Cursor Effect (Optional Enhancement)
// ============================================

let cursor = null;
let cursorFollower = null;

function createCursor() {
    cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: var(--accent-primary);
        position: fixed;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.1s ease;
        display: none;
    `;
    
    cursorFollower = document.createElement('div');
    cursorFollower.className = 'cursor-follower';
    cursorFollower.style.cssText = `
        width: 30px;
        height: 30px;
        border: 2px solid var(--accent-primary);
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 9998;
        transition: all 0.3s ease;
        opacity: 0.5;
        display: none;
    `;
    
    document.body.appendChild(cursor);
    document.body.appendChild(cursorFollower);
}

// Only enable cursor effect on desktop
if (window.matchMedia('(min-width: 768px)').matches) {
    createCursor();
    
    // Добавляем класс для скрытия стандартного курсора через CSS
    document.body.classList.add('custom-cursor-active');
    
    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursor.style.left = `${mouseX}px`;
        cursor.style.top = `${mouseY}px`;
        cursor.style.display = 'block';
    });
    
    function animateFollower() {
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        
        cursorFollower.style.left = `${followerX - 15}px`;
        cursorFollower.style.top = `${followerY - 15}px`;
        cursorFollower.style.display = 'block';
        
        requestAnimationFrame(animateFollower);
    }
    
    animateFollower();
    
    // Увеличение курсора на интерактивных элементах
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, .project-link');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
            cursorFollower.style.transform = 'scale(1.5)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursorFollower.style.transform = 'scale(1)';
        });
    });
}

// ============================================
// Performance Optimization: Lazy Loading Images
// ============================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ============================================
// Keyboard Navigation Enhancement
// ============================================

document.addEventListener('keydown', (e) => {
    // Escape key closes mobile menu
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
    }
    
    // Ctrl/Cmd + K to toggle theme
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        themeToggle.click();
    }
});

// ============================================
// Console Easter Egg
// ============================================

console.log('%c👋 Привет!', 'font-size: 20px; font-weight: bold; color: #667eea;');
console.log('%cИсходный код этого сайта доступен на GitHub', 'font-size: 14px; color: #6c757d;');
console.log('%cСоздано с ❤️ qwertyiisme', 'font-size: 12px; color: #adb5bd;');

// ============================================
// Background Music (Tone.js)
// ============================================

// Расслабляющая ambient композиция с использованием Tone.js
let musicEnabled = true;
let musicPlayers = [];
let isPlaying = false;

async function initStrudelBackground() {
    // Проверяем наличие Tone.js
    if (typeof Tone === 'undefined') {
        console.warn('Tone.js не загружен');
        return;
    }
    
    const musicToggleBtn = document.getElementById('musicToggleNav');
    
    // Загружаем сохраненное состояние музыки
    const savedMusicState = localStorage.getItem('musicEnabled');
    if (savedMusicState !== null) {
        musicEnabled = savedMusicState === 'true';
    }
    
    // Устанавливаем начальное состояние
    updateMusicState();
    
    // Обработчик кнопки включения/выключения музыки
    if (musicToggleBtn) {
        musicToggleBtn.addEventListener('click', toggleMusic);
    }
    
    // Инициализируем Tone.js после взаимодействия пользователя
    let userInteracted = false;
    let musicInitialized = false;
    
    const startMusic = async () => {
        if (!userInteracted && musicEnabled) {
            userInteracted = true;
            if (!musicInitialized) {
                musicInitialized = true;
                await initMusic();
            }
        }
    };
    
    // Слушаем любое взаимодействие пользователя
    document.addEventListener('click', startMusic, { once: true });
    document.addEventListener('keydown', startMusic, { once: true });
    document.addEventListener('touchstart', startMusic, { once: true });
    
    // Также инициализируем при клике на кнопку музыки
    if (musicToggleBtn) {
        const originalToggle = musicToggleBtn.onclick;
        musicToggleBtn.addEventListener('click', async () => {
            if (!musicInitialized && typeof Tone !== 'undefined') {
                musicInitialized = true;
                await initMusic();
            }
        });
    }
    
    console.log('🎵 Фоновый музыкальный плеер инициализирован');
}

async function initMusic() {
    if (typeof Tone === 'undefined') {
        console.error('Tone.js не загружен');
        return;
    }
    
    try {
        // Запускаем Tone.js контекст
        await Tone.start();
        console.log('Tone.js контекст запущен');
        
        // Создаем эффекты
        const reverb = new Tone.Reverb({
            roomSize: 0.5,
            wet: 0.2
        }).toDestination();
        await reverb.generate();
        
        // Создаем синтезированную версию "Never Gonna Give You Up"
        // Если у вас есть MP3 файл, загрузите его в папку проекта (например, music/never-gonna-give-you-up.mp3)
        // и раскомментируйте код ниже, заменив путь на ваш файл
        
        let player = null;
        
        // Попытка загрузить аудио файл (если он есть в проекте)
        // const audioFile = 'music/never-gonna-give-you-up.mp3';
        // try {
        //     player = new Tone.Player({
        //         url: audioFile,
        //         loop: true,
        //         volume: -3
        //     }).connect(reverb);
        //     await player.load();
        //     console.log('Аудио файл загружен');
        // } catch (e) {
        //     console.log('Используем синтезированную версию');
        //     player = await createNeverGonnaGiveYouUpSynth(reverb);
        // }
        
        // Пока используем синтезированную версию
        player = await createNeverGonnaGiveYouUpSynth(reverb);
        
        // Сохраняем ссылки для управления
        musicPlayers = [player, reverb];
        
        // Запускаем музыку
        if (musicEnabled) {
            startMusicPlayback();
        }
        
    } catch (error) {
        console.error('Ошибка инициализации музыки:', error);
    }
}

// Синтезированная версия "Never Gonna Give You Up"
async function createNeverGonnaGiveYouUpSynth(reverb) {
    // Основная мелодия "Never Gonna Give You Up"
    // Ноты: G4, A4, B4, D5, B4, A4, G4, E4, D4, E4, G4, A4, B4, A4, G4
    const melody = [
        'G4', 'A4', 'B4', 'D5', 'B4', 'A4', 'G4', 'E4',
        'D4', 'E4', 'G4', 'A4', 'B4', 'A4', 'G4', 'E4',
        'G4', 'A4', 'B4', 'D5', 'B4', 'A4', 'G4', 'E4',
        'D4', 'E4', 'G4', 'A4', 'B4', 'A4', 'G4', 'E4'
    ];
    
    // Бас линия
    const bass = [
        'G2', 'G2', 'G2', 'G2', 'G2', 'G2', 'G2', 'G2',
        'D2', 'D2', 'D2', 'D2', 'E2', 'E2', 'E2', 'E2',
        'G2', 'G2', 'G2', 'G2', 'G2', 'G2', 'G2', 'G2',
        'D2', 'D2', 'D2', 'D2', 'E2', 'E2', 'E2', 'E2'
    ];
    
    // Аккорды
    const chords = [
        ['G3', 'B3', 'D4'], ['G3', 'B3', 'D4'], ['G3', 'B3', 'D4'], ['G3', 'B3', 'D4'],
        ['G3', 'B3', 'D4'], ['G3', 'B3', 'D4'], ['G3', 'B3', 'D4'], ['G3', 'B3', 'D4'],
        ['D3', 'F#3', 'A3'], ['D3', 'F#3', 'A3'], ['D3', 'F#3', 'A3'], ['D3', 'F#3', 'A3'],
        ['E3', 'G3', 'B3'], ['E3', 'G3', 'B3'], ['E3', 'G3', 'B3'], ['E3', 'G3', 'B3'],
        ['G3', 'B3', 'D4'], ['G3', 'B3', 'D4'], ['G3', 'B3', 'D4'], ['G3', 'B3', 'D4'],
        ['G3', 'B3', 'D4'], ['G3', 'B3', 'D4'], ['G3', 'B3', 'D4'], ['G3', 'B3', 'D4'],
        ['D3', 'F#3', 'A3'], ['D3', 'F#3', 'A3'], ['D3', 'F#3', 'A3'], ['D3', 'F#3', 'A3'],
        ['E3', 'G3', 'B3'], ['E3', 'G3', 'B3'], ['E3', 'G3', 'B3'], ['E3', 'G3', 'B3']
    ];
    
    const synthMelody = new Tone.PolySynth(Tone.Synth, {
        oscillator: { type: 'sawtooth' },
        envelope: { attack: 0.1, decay: 0.2, sustain: 0.7, release: 0.3 },
        volume: -8
    }).connect(reverb);
    
    const synthBass = new Tone.PolySynth(Tone.Synth, {
        oscillator: { type: 'square' },
        envelope: { attack: 0.05, decay: 0.1, sustain: 0.8, release: 0.2 },
        volume: -10
    }).connect(reverb);
    
    const synthChords = new Tone.PolySynth(Tone.Synth, {
        oscillator: { type: 'triangle' },
        envelope: { attack: 0.2, decay: 0.3, sustain: 0.5, release: 0.4 },
        volume: -12
    }).connect(reverb);
    
    let melodyIndex = 0;
    let bassIndex = 0;
    let chordIndex = 0;
    
    // Запускаем Transport
    Tone.Transport.bpm.value = 113; // Оригинальный темп песни
    
    // Мелодия - восьмые ноты
    const loopMelody = new Tone.Loop((time) => {
        if (musicEnabled && isPlaying) {
            synthMelody.triggerAttackRelease(melody[melodyIndex], '8n', time);
            melodyIndex = (melodyIndex + 1) % melody.length;
        }
    }, '8n').start(0);
    
    // Бас - четвертные ноты
    const loopBass = new Tone.Loop((time) => {
        if (musicEnabled && isPlaying) {
            synthBass.triggerAttackRelease(bass[bassIndex], '4n', time);
            bassIndex = (bassIndex + 1) % bass.length;
        }
    }, '4n').start(0);
    
    // Аккорды - половинные ноты
    const loopChords = new Tone.Loop((time) => {
        if (musicEnabled && isPlaying) {
            synthChords.triggerAttackRelease(chords[chordIndex], '2n', time);
            chordIndex = (chordIndex + 1) % chords.length;
        }
    }, '2n').start(0);
    
    return {
        start: () => {
            Tone.Transport.start();
            loopMelody.start(0);
            loopBass.start(0);
            loopChords.start(0);
        },
        stop: () => {
            Tone.Transport.stop();
            loopMelody.stop();
            loopBass.stop();
            loopChords.stop();
            synthMelody.releaseAll();
            synthBass.releaseAll();
            synthChords.releaseAll();
        }
    };
}

function startMusicPlayback() {
    if (musicPlayers.length === 0 || isPlaying) return;
    
    isPlaying = true;
    
    const player = musicPlayers[0];
    
    // Если это Tone.Player
    if (player instanceof Tone.Player) {
        if (player.loaded) {
            player.start();
            console.log('🎵 Never Gonna Give You Up запущена');
        } else {
            console.log('Ожидание загрузки аудио...');
            player.onload = () => {
                if (musicEnabled && isPlaying) {
                    player.start();
                    console.log('🎵 Never Gonna Give You Up запущена');
                }
            };
        }
    } else if (typeof player.start === 'function') {
        // Если это синтезированная версия
        player.start();
        console.log('🎵 Never Gonna Give You Up (синтезированная) запущена');
    }
    
    console.log('🎵 Музыка запущена');
}

function stopMusicPlayback() {
    if (!isPlaying) return;
    
    isPlaying = false;
    
    const player = musicPlayers[0];
    
    // Если это Tone.Player
    if (player instanceof Tone.Player) {
        player.stop();
    } else if (typeof player.stop === 'function') {
        // Если это синтезированная версия
        player.stop();
    }
    
    // Останавливаем Transport если запущен
    if (Tone.Transport.state === 'started') {
        Tone.Transport.stop();
    }
    
    console.log('🔇 Музыка остановлена');
}

function toggleMusic() {
    musicEnabled = !musicEnabled;
    localStorage.setItem('musicEnabled', musicEnabled.toString());
    updateMusicState();
    
    if (musicEnabled) {
        if (musicPlayers.length > 0) {
            startMusicPlayback();
        } else {
            initMusic();
        }
        console.log('🎵 Музыка включена');
    } else {
        stopMusicPlayback();
        console.log('🔇 Музыка выключена');
    }
}

function updateMusicState() {
    const musicToggleBtn = document.getElementById('musicToggleNav');
    if (!musicToggleBtn) return;
    
    const musicIcon = musicToggleBtn.querySelector('.music-icon');
    const musicIconMuted = musicToggleBtn.querySelector('.music-icon-muted');
    
    if (musicEnabled) {
        musicToggleBtn.classList.add('active');
        if (musicIcon) musicIcon.style.display = 'block';
        if (musicIconMuted) musicIconMuted.style.display = 'none';
    } else {
        musicToggleBtn.classList.remove('active');
        if (musicIcon) musicIcon.style.display = 'none';
        if (musicIconMuted) musicIconMuted.style.display = 'block';
    }
}


// ============================================
// Initialize on Load
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Add loaded class for any additional animations
    document.body.classList.add('loaded');
    
    // Initialize Strudel background music
    initStrudelBackground();
    
    // Preload critical resources
    const criticalResources = [
        'styles.css',
        'script.js'
    ];
    
    // Log performance metrics
    if ('performance' in window) {
        window.addEventListener('load', () => {
            const perfData = performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log(`Page load time: ${pageLoadTime}ms`);
        });
    }
});

