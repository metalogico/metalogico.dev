// Helper: init Lucide icons
function initIcons() {
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
        window.lucide.createIcons();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const toggle = document.getElementById('mobile-menu-toggle');
    const menu = document.getElementById('mobile-menu');
    if (toggle && menu) {
        toggle.addEventListener('click', () => menu.classList.toggle('hidden'));
    }

    // Smooth scrolling for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const href = anchor.getAttribute('href');
            if (!href) return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                if (menu) menu.classList.add('hidden');
            }
        });
    });

    // Scroll to Top functionality
    const scrollToTopBtn = document.getElementById('scroll-to-top');
    if (scrollToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.classList.remove('opacity-0', 'invisible');
                scrollToTopBtn.classList.add('opacity-100', 'visible');
            } else {
                scrollToTopBtn.classList.add('opacity-0', 'invisible');
                scrollToTopBtn.classList.remove('opacity-100', 'visible');
            }
        });
        scrollToTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }

    // Intersection Observer for animate-in
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('animate-in');
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.card-hover, .tech-item').forEach(el => observer.observe(el));

    // GSAP animations on scroll
    if (typeof window.gsap !== 'undefined') {
        // Experience cards
        window.gsap.from('#experience .card-hover', {
            duration: 0.8, y: 50, opacity: 0, stagger: 0.1,
            scrollTrigger: { trigger: '#experience', start: 'top 80%', end: 'bottom 20%', toggleActions: 'play none none reverse' }
        });
        // Projects cards
        window.gsap.from('#projects .card-hover', {
            duration: 0.8, scale: 0.9, opacity: 0, stagger: 0.2,
            scrollTrigger: { trigger: '#projects', start: 'top 80%', end: 'bottom 20%', toggleActions: 'play none none reverse' }
        });
        // Tech items
        window.gsap.from('.tech-item', {
            duration: 0.6, y: 30, opacity: 0, stagger: 0.05,
            scrollTrigger: { trigger: '.tech-item', start: 'top 90%', end: 'bottom 10%', toggleActions: 'play none none reverse' }
        });
        // Contact boxes
        window.gsap.from('#contact .bg-gray-800\\/50', {
            duration: 0.8, x: 50, opacity: 0, stagger: 0.1,
            scrollTrigger: { trigger: '#contact', start: 'top 80%', end: 'bottom 20%', toggleActions: 'play none none reverse' }
        });

        // Entry animations
        window.gsap.from('.floating-animation', { duration: 2, y: 50, opacity: 0, ease: 'bounce.out' });
        window.gsap.from('h1', { duration: 1.5, x: -100, opacity: 0, delay: 0.5 });
        window.gsap.from('.card-hover', { duration: 1, y: 30, opacity: 0, stagger: 0.2, delay: 1 });
    }

    // Particle cursor effect
    (function particleCursor() {
        let particles = [];
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = '9999';
        canvas.style.opacity = '0.6';
        document.body.appendChild(canvas);

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        function createParticle(x, y) {
            particles.push({ x, y, vx: (Math.random() - 0.5) * 2, vy: (Math.random() - 0.5) * 2, life: 60, decay: 0.98 });
        }

        function updateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = particles.length - 1; i >= 0; i--) {
                const p = particles[i];
                p.x += p.vx; p.y += p.vy; p.life *= p.decay;
                if (p.life < 0.1) { particles.splice(i, 1); continue; }
                ctx.save();
                ctx.globalAlpha = p.life / 60;
                ctx.fillStyle = `hsl(${220 + Math.random() * 40}, 70%, 60%)`;
                ctx.beginPath(); ctx.arc(p.x, p.y, 2, 0, Math.PI * 2); ctx.fill();
                ctx.restore();
            }
            requestAnimationFrame(updateParticles);
        }

        window.addEventListener('resize', resizeCanvas);
        document.addEventListener('mousemove', (e) => { if (Math.random() < 0.3) createParticle(e.clientX, e.clientY); });
        resizeCanvas();
        updateParticles();
    })();

    initIcons();

    console.log('🚀 Michele Brandolin - Personal Website Loaded Successfully!');
    console.log('💻 Built with Astro, Tailwind CSS, Three.js and GSAP');
    console.log('📧 Contact: michele.brandolin@gmail.com');
});

// Three.js background animation
function initBackground() {
    const canvas = document.getElementById('background-canvas');
    if (!canvas || typeof window.THREE === 'undefined') return;
    const scene = new window.THREE.Scene();
    const camera = new window.THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new window.THREE.WebGLRenderer({ canvas, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    const geometry = new window.THREE.BufferGeometry();
    const vertices = []; const colors = [];
    for (let i = 0; i < 100; i++) {
        vertices.push((Math.random() - 0.5) * 20, (Math.random() - 0.5) * 20, (Math.random() - 0.5) * 20);
        colors.push(Math.random() * 0.5 + 0.5, Math.random() * 0.5 + 0.5, 1);
    }
    geometry.setAttribute('position', new window.THREE.Float32BufferAttribute(vertices, 3));
    geometry.setAttribute('color', new window.THREE.Float32BufferAttribute(colors, 3));
    const material = new window.THREE.PointsMaterial({ size: 0.1, vertexColors: true, transparent: true, opacity: 0.6 });
    const points = new window.THREE.Points(geometry, material);
    scene.add(points);
    camera.position.z = 5;

    function animate() {
        requestAnimationFrame(animate);
        points.rotation.x += 0.001;
        points.rotation.y += 0.002;
        renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

window.addEventListener('load', initBackground);
