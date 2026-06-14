// ===== EMAILJS INITIALIZE =====
emailjs.init("MvtA58cnSEQ4xKp9s");

// ===== TYPED TEXT ANIMATION =====
const texts = [
  "Front-End Developer",
  "Web Designer",
  "JavaScript Enthusiast",
  "B.Tech CS Student",
  "UI/UX Learner"
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  const typedEl = document.getElementById("typedText");
  const current = texts[textIndex];

  if (isDeleting) {
    typedEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typedEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;
  }

  if (!isDeleting && charIndex === current.length) {
    isDeleting = true;
    setTimeout(typeEffect, 1800);
    return;
  }

  if (isDeleting && charIndex === 0) {
    isDeleting = false;
    textIndex = (textIndex + 1) % texts.length;
  }

  setTimeout(typeEffect, isDeleting ? 60 : 100);
}

typeEffect();

// ===== SIDEBAR TOGGLE =====
function toggleSidebar() {
  document.getElementById("sidebar").classList.toggle("open");
  document.getElementById("overlay").classList.toggle("active");
}

document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", () => {
    document.getElementById("sidebar").classList.remove("open");
    document.getElementById("overlay").classList.remove("active");
  });
});

// ===== ACTIVE NAV ON SCROLL =====
const sections = document.querySelectorAll(".section");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 100) {
      current = section.getAttribute("id");
    }
  });
  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});

// ===== SKILL BAR ANIMATION =====
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      document.querySelectorAll(".skill-fill").forEach(bar => {
        bar.style.width = bar.getAttribute("data-width");
      });
    }
  });
}, { threshold: 0.3 });

const skillsSection = document.getElementById("skills");
if (skillsSection) skillObserver.observe(skillsSection);

// ===== PROJECT FILTER =====
function filterProjects(category, btn) {
  document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  document.querySelectorAll(".project-card").forEach(card => {
    if (category === "all" || card.getAttribute("data-category") === category) {
      card.classList.remove("hidden");
    } else {
      card.classList.add("hidden");
    }
  });
}

// ===== CONTACT FORM WITH EMAILJS =====
function sendMessage() {
  const name = document.getElementById("cname").value.trim();
  const email = document.getElementById("cemail").value.trim();
  const subject = document.getElementById("csubject").value.trim();
  const message = document.getElementById("cmessage").value.trim();
  const msg = document.getElementById("contactMsg");
  const btn = document.querySelector(".contact-form button");

  if (!name || !email || !subject || !message) {
    msg.style.color = "#e74c3c";
    msg.innerText = "⚠ Please fill all fields!";
    return;
  }

  btn.innerText = "Sending...";
  btn.disabled = true;

  const templateParams = {
    from_name: name,
    from_email: email,
    subject: subject,
    message: message,
    to_name: "Samir Sheikh"
  };

  emailjs.send("service_7hbsx6o", "template_u985nxo", templateParams)
    .then(() => {
      msg.style.color = "#27ae60";
      msg.innerText = "✅ Message sent! I will get back to you soon.";
      btn.innerText = "Send Message ✉";
      btn.disabled = false;
      document.getElementById("cname").value = "";
      document.getElementById("cemail").value = "";
      document.getElementById("csubject").value = "";
      document.getElementById("cmessage").value = "";
      setTimeout(() => { msg.innerText = ""; }, 5000);
    })
    .catch((error) => {
      msg.style.color = "#e74c3c";
      msg.innerText = "❌ Failed to send. Please try again!";
      btn.innerText = "Send Message ✉";
      btn.disabled = false;
      console.error("EmailJS Error:", error);
    });
}

// ===== SCROLL REVEAL ANIMATION =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll(".project-card, .resume-item, .skill-item, .contact-card").forEach(el => {
  el.style.opacity = "0";
  el.style.transform = "translateY(20px)";
  el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
  revealObserver.observe(el);
});