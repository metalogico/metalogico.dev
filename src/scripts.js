// Helper: init Lucide icons
function initIcons() {
	if (window.lucide && typeof window.lucide.createIcons === "function") {
		window.lucide.createIcons();
	}
}

document.addEventListener("DOMContentLoaded", () => {
	// Email obfuscation
	const user = "michele.brandolin";
	const domain = "gmail.com";
	const emailLink = document.getElementById("email-link");
	const footerEmailLink = document.getElementById("footer-email-link");

	if (emailLink) {
		emailLink.href = `mailto:${user}@${domain}`;
		emailLink.textContent = `${user}@${domain}`;
	}

	if (footerEmailLink) {
		footerEmailLink.href = `mailto:${user}@${domain}`;
	}

	// Mobile menu toggle
	const toggle = document.getElementById("mobile-menu-toggle");
	const menu = document.getElementById("mobile-menu");
	if (toggle && menu) {
		toggle.addEventListener("click", () =>
			menu.classList.toggle("hidden"),
		);
	}

	// Smooth scrolling for nav links
	document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
		anchor.addEventListener("click", (e) => {
			const href = anchor.getAttribute("href");
			if (!href) return;
			const target = document.querySelector(href);
			if (target) {
				e.preventDefault();
				target.scrollIntoView({
					behavior: "smooth",
					block: "start",
				});
				if (menu) menu.classList.add("hidden");
			}
		});
	});

	// Scroll to Top functionality
	const scrollToTopBtn = document.getElementById("scroll-to-top");
	if (scrollToTopBtn) {
		window.addEventListener("scroll", () => {
			if (window.pageYOffset > 300) {
				scrollToTopBtn.classList.remove("opacity-0", "invisible");
				scrollToTopBtn.classList.add("opacity-100", "visible");
			} else {
				scrollToTopBtn.classList.add("opacity-0", "invisible");
				scrollToTopBtn.classList.remove("opacity-100", "visible");
			}
		});
		scrollToTopBtn.addEventListener("click", () =>
			window.scrollTo({ top: 0, behavior: "smooth" }),
		);
	}

	// Subtle fade-in on scroll using IntersectionObserver
	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.style.opacity = "1";
					entry.target.style.transform = "translateY(0)";
				}
			});
		},
		{ threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
	);

	document.querySelectorAll(".fade-in").forEach((el) => {
		el.style.opacity = "0";
		el.style.transform = "translateY(12px)";
		el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
		observer.observe(el);
	});

	initIcons();
});
