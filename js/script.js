//Hamburger Menu
const navbarNav = document.querySelector(".navbar-nav");
const hamburger = document.querySelector("#hamburger-menu");

// Toggle hamburger menu
hamburger.onclick = (e) => {
  e.preventDefault(); // Prevent default anchor behavior
  e.stopPropagation(); // Stop event from bubbling
  navbarNav.classList.toggle("active");
};

// Close menu when clicking outside
document.addEventListener("click", function (e) {
  if (!hamburger.contains(e.target) && !navbarNav.contains(e.target)) {
    navbarNav.classList.remove("active");
  }
});

// Smooth scroll untuk navbar links
document.querySelectorAll(".navbar-nav a").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    const targetId = link.getAttribute("href").substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      const navbarHeight = document.querySelector(".navbar").offsetHeight;
      const targetPosition = targetElement.offsetTop;
      const offsetPosition = targetPosition - navbarHeight;

      // Close mobile menu if open
      navbarNav.classList.remove("active");

      // Smooth scroll
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  });
});

//AOS
document.addEventListener("DOMContentLoaded", function () {
  AOS.init({
    once: true,
  });
});

//gsap
document.addEventListener("DOMContentLoaded", (event) => {
  gsap.from(".navbar", { duration: 1.5, y: "-100%", opacity: 0, ease: "bounce" });
  gsap.from(".content", { duration: 1.5, x: -100, opacity: 0, ease: "back" });
});

//form contact
// Seleksi elemen yang diperlukan
const form = document.forms["contact_form"];
const scriptURL = "https://script.google.com/macros/s/AKfycbzxUy8ZaMeNlbIgeDI-pwDuCLUGnIqllNPYg_rhdlBPPU6eoaOVTqgDgZ2TLzv1gxC3kQ/exec";
const MyAlert = document.getElementById("alert-message");
const loading = document.querySelector(".dots"); // Seleksi elemen loading

// Tambahkan event listener ke form untuk submit
form.addEventListener("submit", (e) => {
  e.preventDefault(); // Mencegah pengiriman form default

  // Tampilkan loading
  if (loading) {
    loading.style.display = "block"; // Tampilkan elemen loading
  }

  // Kirim data ke scriptURL
  fetch(scriptURL, { method: "POST", body: new FormData(form) })
    .then((response) => {
      console.log("Success!", response);

      // Sembunyikan loading
      if (loading) {
        loading.style.display = "none";
      }

      // Tampilkan alert
      if (MyAlert) {
        MyAlert.style.display = "block";

        // Sembunyikan alert setelah 3 detik
        setTimeout(() => {
          MyAlert.style.display = "none";
        }, 3000);
      }

      // Kosongkan form
      form.reset();
    })
    .catch((error) => {
      console.error("Error!", error.message);

      // Sembunyikan loading jika terjadi error
      if (loading) {
        loading.style.display = "none";
      }
    });
});

//navbar
document.querySelectorAll(".navbar-nav a").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault(); // Mencegah aksi default
    const targetId = e.target.getAttribute("href").substring(1); // Ambil ID target
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      const navbarHeight = document.querySelector(".navbar").offsetHeight; // Tinggi navbar
      const targetPosition = targetElement.offsetTop; // Posisi elemen target
      const offsetPosition = targetPosition - navbarHeight; // Posisi setelah dikoreksi

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth", // Scroll halus
      });
    }
  });
});
