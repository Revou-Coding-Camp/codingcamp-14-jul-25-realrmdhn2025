document.addEventListener("DOMContentLoaded", () => {
  // === ELEMENTS ===
  const loginBtn = document.getElementById("login-btn");
  const usernameInput = document.getElementById("username");
  const loginSection = document.getElementById("login-section");
  const pageContent = document.getElementById("page-content");
  const mainSection = document.getElementById("main-section");
  const header = document.getElementById("main-header");
  const footer = document.getElementById("main-footer");
  const userNameDisplay = document.getElementById("user-name");
  const form = document.getElementById("contact-form");
  const subscribeBtn = footer?.querySelector(".btn");

  // === ANIMATE FOOTER ON SHOW ===
  const showMainContent = (name) => {
    loginSection.classList.add("opacity-0");
    setTimeout(() => {
      loginSection.classList.add("hidden");
      pageContent.classList.remove("hidden");
      header.classList.remove("hidden");

      // Show footer with animation
      if (footer) {
        footer.classList.remove("hidden");
        footer.classList.add("animate-fade-in");
      }

      // Animate greeting
      userNameDisplay.textContent = name;
      mainSection.scrollIntoView({ behavior: "smooth" });
      mainSection.classList.add("animate-fade-in", "animate-slide-pop");
      userNameDisplay.classList.add("animate-pulse-soft");

      setTimeout(() => {
        userNameDisplay.classList.remove("animate-pulse-soft");
      }, 2000);
    }, 500);
  };

  // === AUTO LOGIN ===
  const cachedName = localStorage.getItem("vintoraUsername");
  if (cachedName) {
    showMainContent(cachedName);
  }

  // === LOGIN BUTTON ===
  loginBtn?.addEventListener("click", () => {
    const name = usernameInput.value.trim();
    if (!name) {
      usernameInput.classList.add("input-error");
      usernameInput.focus();
      usernameInput.placeholder = "Name is required!";
      return;
    }

    const spinner = document.getElementById("loading-spinner");
    spinner?.classList.remove("hidden");

    localStorage.setItem("vintoraUsername", name);

    setTimeout(() => {
      spinner?.classList.add("hidden");
      showMainContent(name);
    }, 1000);
  });

  // === RESET INPUT ERROR ===
  usernameInput?.addEventListener("input", () => {
    usernameInput.classList.remove("input-error");
    usernameInput.placeholder = "Enter your name";
  });

  // === SMOOTH SCROLL TO SECTION ===
  window.scrollToSection = function (id) {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  // === LOGOUT ===
  window.logout = function () {
    const logoutModal = document.createElement("div");
    logoutModal.className = "fixed inset-0 bg-black/40 backdrop-blur-sm z-[999] flex items-center justify-center";

    logoutModal.innerHTML = `
      <div class="bg-white max-w-sm w-full p-8 rounded-2xl shadow-2xl text-center animate-fade-in space-y-5">
        <h2 class="text-2xl font-extrabold text-[#2C3A35]">Are you sure?</h2>
        <p class="text-gray-600">Do you really want to logout from <strong>VINTORA</strong>?</p>
        <div class="flex justify-center gap-4 mt-6">
        <div class="flex justify-center gap-4 mt-6">
          <button id="confirm-logout" class="btn bg-[#D6BA73] hover:bg-[#c2a350] text-[#2C3A35] font-semibold rounded-full px-6">Yes</button>
          <button id="cancel-logout" class="btn bg-gray-200 hover:bg-gray-300 text-[#2C3A35] rounded-full px-6">Cancel</button>
        </div>
      </div>
    `;

    document.body.appendChild(logoutModal);

    document.getElementById("cancel-logout").addEventListener("click", () => {
      logoutModal.remove();
    });

    document.getElementById("confirm-logout").addEventListener("click", () => {
      const spinner = document.getElementById("loading-spinner");
      spinner?.classList.remove("hidden");

      setTimeout(() => {
        localStorage.removeItem("vintoraUsername");
        location.reload();
      }, 1000);
    });
  };

  // === CONTACT FORM SUBMIT ===
  form?.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("full-name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name || !email || !message) {
      alert("⚠️ Please fill in all fields.");
      return;
    }

    const emailInput = document.getElementById("email");
    const emailErrorMsg = document.getElementById("email-error-msg");

    if (!emailRegex.test(email)) {
      emailInput.classList.add("input-error");
      emailErrorMsg.textContent = "⚠️ Please enter a valid email address";
      emailErrorMsg.classList.remove("hidden");
      emailInput.focus();

      emailInput.classList.add("shake");
      setTimeout(() => {
        emailInput.classList.remove("shake");
      }, 500);

      return;
    }

    const thankYouModal = document.createElement("div");
    thankYouModal.className = "fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[999]";
    thankYouModal.innerHTML = `
      <div class="bg-white max-w-md w-full p-8 rounded-2xl text-center shadow-xl animate-fade-in space-y-4">
        <h2 class="text-2xl font-bold text-[#2C3A35]">Thank You, ${name}!</h2>
        <p class="text-gray-600">We received your message ✨</p>
        <blockquote class="italic text-[#2C3A35]">"${message}"</blockquote>
        <button id="close-thankyou" class="btn bg-[#2C3A35] hover:bg-[#1e2824] text-white">Close</button>
      </div>
    `;
    document.body.appendChild(thankYouModal);

    document.getElementById("close-thankyou").addEventListener("click", () => {
      thankYouModal.remove();
    });

    form.reset();
  });

  const emailInput = document.getElementById("email");
  const emailErrorMsg = document.getElementById("email-error-msg");

  emailInput?.addEventListener("input", () => {
    emailInput.classList.remove("input-error");
    if (emailErrorMsg) {
      emailErrorMsg.classList.add("hidden");
      emailErrorMsg.textContent = "";
    }
  });

  // === SCROLL HEADER SHADOW ===
  window.addEventListener("scroll", () => {
    if (header) {
      header.classList.toggle("shadow-md", window.scrollY > 20);
    }
  });

  // === FOOTER HOVER LINK EFFECT ===
  document.querySelectorAll("#main-footer a").forEach(link => {
    link.addEventListener("mouseenter", () => {
      link.classList.add("underline", "decoration-[#D6BA73]");
    });
    link.addEventListener("mouseleave", () => {
      link.classList.remove("underline", "decoration-[#D6BA73]");
    });
  });

  // === SUBSCRIBE BUTTON MODAL ===
  subscribeBtn?.addEventListener("click", () => {
    const subModal = document.createElement("div");
    subModal.className = "fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[999]";
    subModal.innerHTML = `
      <div class="bg-white max-w-sm w-full p-6 rounded-2xl text-center shadow-xl space-y-4 animate-fade-in">
        <h3 class="text-xl font-semibold text-[#2C3A35]">Subscribe to VINTORA</h3>
        <p class="text-sm text-gray-500">Stay in the loop with the latest updates and inspiration!</p>
        <input type="email" id="modal-subscribe-email" placeholder="Your email" class="input input-bordered w-full" />
        <p id="modal-subscribe-error" class="text-red-500 text-sm mt-1 hidden">⚠️ Please enter a valid email address</p>
        <button id="modal-subscribe-btn" class="btn bg-[#2C3A35] hover:bg-[#1e2824] text-white w-full">Subscribe</button>
        <button class="text-sm text-[#D6BA73] underline mt-2" id="close-sub-modal">Cancel</button>
      </div>
    `;
    document.body.appendChild(subModal);

    const closeBtn = document.getElementById("close-sub-modal");
    const confirmBtn = document.getElementById("modal-subscribe-btn");
    const emailInput = document.querySelector("#modal-subscribe-email");

    closeBtn?.addEventListener("click", () => {
      subModal.remove();
    });

    const emailError = document.getElementById("modal-subscribe-error");

    emailInput.addEventListener("input", () => {
      emailInput.classList.remove("input-error");
      emailError.classList.add("hidden");
    });

    confirmBtn?.addEventListener("click", () => {
      const email = emailInput.value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(email)) {
        emailInput.classList.add("input-error");
        emailError.classList.remove("hidden");
        emailInput.focus();

        emailInput.classList.add("shake");
        setTimeout(() => {
          emailInput.classList.remove("shake");
        }, 500);

        return;
      }

      const modalBox = confirmBtn.closest("div");
      modalBox.innerHTML = `
        <div class="text-center space-y-4 animate-fade-in">
          <h3 class="text-2xl font-bold text-[#2C3A35]">🎉 You're Subscribed!</h3>
          <p class="text-sm text-gray-600">We’ll keep you updated at <strong>${email}</strong></p>
          <button class="btn bg-[#D6BA73] hover:bg-[#c2a350] text-[#2C3A35]" id="modal-close-thankyou">Close</button>
        </div>
      `;

      document.getElementById("modal-close-thankyou").addEventListener("click", () => {
        subModal.remove();
      });
    });

    document.getElementById("close-sub-modal")?.addEventListener("click", () => {
      subModal.remove();
    });
  });

  const parallaxBg = document.getElementById("parallax-bg");
  if (parallaxBg) {
    window.addEventListener("scroll", () => {
      const offset = window.scrollY;
      parallaxBg.style.transform = `translateY(${offset * 0.3}px)`;
    });
  }

  const menuToggle = document.getElementById("menu-toggle");
  const menuIcon = document.getElementById("menu-icon");
  const dropdownMenu = document.getElementById("mobile-dropdown");
  let isMenuOpen = false;

  menuToggle?.addEventListener("click", (e) => {
    e.stopPropagation();
    isMenuOpen = !isMenuOpen;

    menuIcon.classList.add("opacity-0", "scale-95");
    setTimeout(() => {
      menuIcon.textContent = isMenuOpen ? "✕" : "☰";
      menuIcon.classList.remove("opacity-0", "scale-95");
      menuIcon.classList.add("opacity-100", "scale-100");
    }, 150);

    if (dropdownMenu) {
      if (isMenuOpen) {
        dropdownMenu.classList.remove("hidden");
        setTimeout(() => {
          dropdownMenu.classList.add("opacity-100", "scale-100");
          dropdownMenu.classList.remove("opacity-0", "scale-95");
        }, 10);
      } else {
        dropdownMenu.classList.add("opacity-0", "scale-95");
        dropdownMenu.classList.remove("opacity-100", "scale-100");
        setTimeout(() => {
          dropdownMenu.classList.add("hidden");
        }, 300);
      }
    }
  });

  document.addEventListener("click", (event) => {
    const isClickInsideMenu = dropdownMenu?.contains(event.target);
    const isClickOnToggle = menuToggle?.contains(event.target);

    if (!isClickInsideMenu && !isClickOnToggle && isMenuOpen) {
      isMenuOpen = false;

      menuIcon.classList.add("opacity-0", "scale-95");
      setTimeout(() => {
        menuIcon.textContent = "☰";
        menuIcon.classList.remove("opacity-0", "scale-95");
        menuIcon.classList.add("opacity-100", "scale-100");
      }, 150);

      dropdownMenu?.classList.add("opacity-0", "scale-95");
      dropdownMenu?.classList.remove("opacity-100", "scale-100");
      setTimeout(() => {
        dropdownMenu?.classList.add("hidden");
      }, 300);
    }
  });

  const profileHeading = document.getElementById("profile-heading");
  const typewriterText = "Who We Are?";
  let i = 0;
  let isDeleting = false;

  function loopTypewriter() {
    if (!profileHeading) return;

    let currentText = profileHeading.textContent;

    if (!isDeleting && i < typewriterText.length) {
      profileHeading.textContent += typewriterText.charAt(i);
      i++;
      setTimeout(loopTypewriter, 100);
    } else if (isDeleting && i >= 0) {
      profileHeading.textContent = typewriterText.substring(0, i);
      i--;
      setTimeout(loopTypewriter, 60);
    } else {
      isDeleting = !isDeleting;
      setTimeout(loopTypewriter, isDeleting ? 1000 : 500);
    }
  }

  if (profileHeading) {
    profileHeading.textContent = "";
    
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          loopTypewriter();
          observer.unobserve(profileHeading);
        }
      });
    }, { threshold: 0.5 });

    observer.observe(profileHeading);
  }

  const processSection = document.getElementById("process-section");
  const steps = [
    document.getElementById("step-1"),
    document.getElementById("step-2"),
    document.getElementById("step-3"),
    document.getElementById("step-4"),
  ];

  const progressLine = document.getElementById("progress-line");

  if (progressLine && steps.every(Boolean)) {
    const processSection = document.getElementById("process-section");

    let hasAnimated = false;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            animateSteps();
            hasAnimated = true;
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(processSection);

    function animateSteps() {
      const durations = [0, 1000, 2000, 3000];

      steps.forEach((step, i) => {
        setTimeout(() => {
          step.classList.add("step-visible");
          const widthPercent = (i + 1) * 25;
          progressLine.style.width = `${widthPercent}%`;
        }, durations[i]);
      });
    }

    function resetSteps() {
      steps.forEach((step) => {
        step.classList.remove("step-visible");
      });
      progressLine.style.width = "0%";
    }
  }
});

window.addEventListener("load", () => {
  const globalLoader = document.getElementById("global-loader");
  if (globalLoader) {
    globalLoader.classList.add("opacity-0");
    setTimeout(() => {
      globalLoader.style.display = "none";
    }, 700);
  }

  const navLinks = document.querySelectorAll(".nav-link");
  const sections = [
    { id: "main-section", name: "Home" },
    { id: "profile-section", name: "Profile" },
    { id: "services-section", name: "Services" },
    { id: "portofolio-section", name: "Portofolio" },
    { id: "process-section", name: "Process" },
    { id: "freebies-section", name: "Freebies" },
    { id: "contact-section", name: "Contact" },
  ];

  function highlightLink(linkText) {
    navLinks.forEach((link) => {
      const text = link.textContent.trim();

      const spanBg = link.querySelector(".highlight-bg");
      const spanText = link.querySelector(".highlight-text");

      if (spanBg || spanText) {
        link.innerHTML = link.textContent.trim();
      }

      if (text === linkText) {
        link.classList.add("relative", "z-10", "group", "inline-flex", "items-center", "justify-center");
        link.innerHTML = `
          <span class="absolute inset-0 -z-10 bg-[#D6BA73] rounded-xl px-2 py-1 transition-transform duration-300 ease-out transform scale-[1.15] group-hover:scale-[1.18] animated-border"></span>
          <span class="relative z-10 text-[#1B1B1B] font-semibold tracking-wide group-hover:scale-[1.05] transition-transform duration-300">${link.textContent.trim()}</span>
        `;
      } else {
        link.classList.remove("relative", "z-10", "group");
        link.innerHTML = text;
      }
    });
  }

  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el && window.scrollY >= el.offsetTop - 100) {
        current = section.name;
      }
    });
    highlightLink(current);
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      const href = link.getAttribute("href");
      const targetId = href && href.startsWith("#") ? href.substring(1) : null;
      const targetElement = targetId ? document.getElementById(targetId) : null;

      if (targetElement) {
        document.documentElement.style.scrollBehavior = "auto";
        targetElement.scrollIntoView({ behavior: "auto" });
        setTimeout(() => {
          document.documentElement.style.scrollBehavior = "";
        }, 50);
        
        const text = link.textContent.trim();
        highlightLink(text);
      }
    });
  });
});

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}