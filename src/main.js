const savedLanguage = localStorage.getItem("corporan-lang") || "es";
document.body.dataset.lang = savedLanguage;
document.documentElement.lang = savedLanguage;

const updateLanguageOptions = (language) => {
  document.querySelectorAll("option[data-es][data-en]").forEach((option) => {
    option.textContent = option.dataset[language];
  });
};

updateLanguageOptions(savedLanguage);

let favicon = document.querySelector('link[rel="icon"]');
if (!favicon) {
  favicon = document.createElement("link");
  favicon.rel = "icon";
  document.head.append(favicon);
}
favicon.type = "image/png";
favicon.href = "src/images/logo/corporan-logo.png?v=3";

document.querySelectorAll("[data-lang-toggle]").forEach((button) => {
  button.addEventListener("click", () => {
    const nextLanguage = document.body.dataset.lang === "es" ? "en" : "es";
    document.body.dataset.lang = nextLanguage;
    document.documentElement.lang = nextLanguage;
    updateLanguageOptions(nextLanguage);
    localStorage.setItem("corporan-lang", nextLanguage);
  });
});

document.querySelectorAll('header > .container-site > a[href="index.html"]').forEach((brandLink) => {
  brandLink.querySelector(":scope > span.grid")?.remove();
  brandLink.classList.add("flex", "items-center", "gap-2");
  const logo = document.createElement("img");
  logo.src = "src/images/logo/corporan-logo.png";
  logo.alt = "Corporan LLC";
  logo.className = "h-11 w-11 shrink-0 object-contain";
  brandLink.prepend(logo);
});

document.querySelectorAll('a[href^="https://wa.me/"]').forEach((whatsAppButton) => {
  whatsAppButton.innerHTML = '<svg viewBox="0 0 24 24" class="h-7 w-7" fill="currentColor" aria-hidden="true"><path d="M12.04 2a9.8 9.8 0 0 0-8.36 14.9L2.5 21.2l4.45-1.16A9.8 9.8 0 1 0 12.04 2Zm0 17.82a8.02 8.02 0 0 1-4.09-1.12l-.3-.18-2.64.69.7-2.57-.2-.32A8.03 8.03 0 1 1 12.04 19.82Zm4.4-5.98c-.24-.12-1.4-.69-1.62-.77-.21-.08-.37-.12-.52.12-.16.24-.6.77-.74.93-.14.16-.28.18-.52.06-1.4-.7-2.32-1.25-3.24-2.84-.25-.43.25-.4.69-1.32.08-.16.04-.3-.02-.42-.06-.12-.52-1.25-.71-1.71-.19-.45-.38-.39-.52-.4h-.44c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.7 2.6 4.13 3.65.58.25 1.03.4 1.38.51.58.18 1.1.15 1.51.09.46-.07 1.4-.57 1.6-1.13.2-.56.2-1.04.14-1.13-.06-.1-.22-.16-.46-.28Z"/></svg>';
  whatsAppButton.setAttribute("aria-label", "Escribir por WhatsApp");
  whatsAppButton.setAttribute("title", "WhatsApp");
});

document.querySelectorAll('a[href^="tel:"]').forEach((phoneLink) => {
  const phoneText = document.createElement("span");
  phoneText.className = phoneLink.className;
  phoneText.textContent = phoneLink.textContent;
  phoneLink.replaceWith(phoneText);
});

document.querySelectorAll("[data-copy-phone] .sr-only").forEach((text) => text.remove());

document.querySelectorAll("[data-copy-phone]").forEach((button) => {
  button.addEventListener("click", async () => {
    const phone = button.dataset.phone;
    if (!phone) return;

    try {
      await navigator.clipboard.writeText(phone);
    } catch {
      const input = document.createElement("input");
      input.value = phone;
      document.body.append(input);
      input.select();
      document.execCommand("copy");
      input.remove();
    }

    const isEnglish = document.body.dataset.lang === "en";
    button.setAttribute("aria-label", isEnglish ? "Copied" : "Número copiado");
    button.innerHTML = '<svg viewBox="0 0 24 24" style="display:block; width:1rem; height:1rem;" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><path d="m5 12 4 4L19 6"></path></svg>';
    setTimeout(() => {
      button.setAttribute("aria-label", document.body.dataset.lang === "en" ? "Copy phone number" : "Copiar número");
      button.innerHTML = '<svg viewBox="0 0 24 24" style="width:1.25rem; height:1.25rem;" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="9" y="3" width="12" height="12" rx="2"></rect><path d="M15 9v10a2 2 0 0 1-2 2H5a2 2 0 0 1 2-2h4"></path></svg><span class="sr-only"><span class="lang-es">Copiar número</span><span class="lang-en">Copy phone number</span></span>';
      button.querySelector(".sr-only")?.remove();
      const icon = button.querySelector("svg");
      if (icon) {
        icon.style.display = "block";
        icon.style.width = "1rem";
        icon.style.height = "1rem";
      }
    }, 1800);
  });
});

document.querySelectorAll(".service-card").forEach((card) => {
  const title = card.querySelector("h2, h3");
  if (!title) return;

  const quoteButton = document.createElement("a");
  quoteButton.href = "https://wa.me/12259335817";
  quoteButton.target = "_blank";
  quoteButton.rel = "noopener";
  quoteButton.className = "btn-dark mt-6 self-start";
  quoteButton.innerHTML = '<span class="lang-es">Cotizar este servicio</span><span class="lang-en">Get a quote</span> →';

  quoteButton.addEventListener("click", (event) => {
    event.preventDefault();
    const isEnglish = document.body.dataset.lang === "en";
    const serviceName = title.querySelector(isEnglish ? ".lang-en" : ".lang-es")?.textContent.trim() || title.textContent.trim();
    const message = isEnglish
      ? `Hello, I would like a quote for: ${serviceName}.`
      : `Hola, quisiera una cotización para: ${serviceName}.`;
    window.open(`https://wa.me/12259335817?text=${encodeURIComponent(message)}`, "_blank", "noopener");
  });

  card.append(quoteButton);
});

const menuButton = document.querySelector("[data-menu]");
const mobileMenu = document.querySelector("[data-mobile-menu]");
if (menuButton && mobileMenu) {
  menuButton.addEventListener("click", () => {
    const isOpen = !mobileMenu.classList.toggle("hidden");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });
}

const carousel = document.querySelector("[data-carousel]");
if (carousel) {
  const nextButton = document.querySelector("[data-next]");
  const previousButton = document.querySelector("[data-prev]");
  let isMoving = false;

  const getStep = () => {
    const firstCard = carousel.firstElementChild;
    const gap = Number.parseFloat(getComputedStyle(carousel).gap) || 0;
    return firstCard.getBoundingClientRect().width + gap;
  };

  const finishMove = (callback) => {
    carousel.addEventListener("transitionend", () => {
      callback();
      isMoving = false;
    }, { once: true });
  };

  nextButton.addEventListener("click", () => {
    if (isMoving) return;
    isMoving = true;
    carousel.style.transform = `translateX(-${getStep()}px)`;

    finishMove(() => {
      carousel.style.transition = "none";
      carousel.append(carousel.firstElementChild);
      carousel.style.transform = "translateX(0)";
      requestAnimationFrame(() => { carousel.style.transition = ""; });
    });
  });

  previousButton.addEventListener("click", () => {
    if (isMoving) return;
    isMoving = true;
    carousel.style.transition = "none";
    carousel.prepend(carousel.lastElementChild);
    carousel.style.transform = `translateX(-${getStep()}px)`;

    requestAnimationFrame(() => { carousel.style.transition = ""; carousel.style.transform = "translateX(0)"; });
    finishMove(() => { carousel.style.transform = "translateX(0)"; });
  });
}

const form = document.querySelector("[data-form]");
if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const isEnglish = document.body.dataset.lang === "en";
    const selectedService = form.elements.service.selectedOptions[0]?.textContent.trim() || data.get("service");
    const message = isEnglish
      ? `Hello, I would like a quote.\n\nName: ${data.get("name")}\nEmail: ${data.get("email")}\nPhone: ${data.get("phone")}\nService: ${selectedService}\nProject location: ${data.get("location")}\n\nProject details:\n${data.get("details")}`
      : `Hola, quisiera una cotización.\n\nNombre: ${data.get("name")}\nCorreo: ${data.get("email")}\nTeléfono: ${data.get("phone")}\nServicio: ${selectedService}\nUbicación del proyecto: ${data.get("location")}\n\nDetalles del proyecto:\n${data.get("details")}`;
    window.open(`https://wa.me/12259335817?text=${encodeURIComponent(message)}`, "_blank", "noopener");
    form.querySelector("[data-success]").classList.remove("hidden");
  });
}
