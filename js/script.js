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
      mainSection.classList.add("fade-in-up");
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

    localStorage.setItem("vintoraUsername", name);
    showMainContent(name);
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
      localStorage.removeItem("vintoraUsername");
      location.reload();
    });
  };

  // === CONTACT FORM SUBMIT ===
  form?.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("full-name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
      alert("⚠️ Please fill in all fields.");
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

    confirmBtn?.addEventListener("click", () => {
      const email = emailInput.value.trim();

      if (!email || !email.includes("@") || !email.includes(".")) {
        emailInput.classList.add("input-error");
        emailInput.placeholder = "Please enter a valid email!";
        emailInput.focus();
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
});