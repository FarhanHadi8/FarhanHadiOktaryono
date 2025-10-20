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

// Chard
document.addEventListener("DOMContentLoaded", () => {
  const ctx = document.getElementById("barchart").getContext("2d");

  // Gradient colors for bars
  const gradient1 = ctx.createLinearGradient(0, 0, 0, 400);
  gradient1.addColorStop(0, "rgba(255, 99, 132, 0.8)");
  gradient1.addColorStop(1, "rgba(255, 99, 132, 0.3)");

  const gradient2 = ctx.createLinearGradient(0, 0, 0, 400);
  gradient2.addColorStop(0, "rgba(54, 162, 235, 0.8)");
  gradient2.addColorStop(1, "rgba(54, 162, 235, 0.3)");

  const gradient3 = ctx.createLinearGradient(0, 0, 0, 400);
  gradient3.addColorStop(0, "rgba(255, 206, 86, 0.8)");
  gradient3.addColorStop(1, "rgba(255, 206, 86, 0.3)");

  const gradient4 = ctx.createLinearGradient(0, 0, 0, 400);
  gradient4.addColorStop(0, "rgba(75, 192, 192, 0.8)");
  gradient4.addColorStop(1, "rgba(75, 192, 192, 0.3)");

  const gradient5 = ctx.createLinearGradient(0, 0, 0, 400);
  gradient5.addColorStop(0, "rgba(153, 102, 255, 0.8)");
  gradient5.addColorStop(1, "rgba(153, 102, 255, 0.3)");

  const gradient6 = ctx.createLinearGradient(0, 0, 0, 400);
  gradient6.addColorStop(0, "rgba(255, 159, 64, 0.8)");
  gradient6.addColorStop(1, "rgba(255, 159, 64, 0.3)");

  const chartData = {
    type: "bar",
    data: {
      labels: ["HTML", "CSS", "JS", "PHP", "LARAVEL", "MySQL"],
      datasets: [
        {
          data: [15, 15, 12, 13, 13, 15],
          backgroundColor: [gradient1, gradient2, gradient3, gradient4, gradient5, gradient6],
          borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)", "rgba(255, 206, 86, 1)", "rgba(75, 192, 192, 1)", "rgba(153, 102, 255, 1)", "rgba(255, 159, 64, 1)"],
          borderWidth: 2,
          borderRadius: 8,
          borderSkipped: false,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          padding: 12,
          titleColor: "#00d4ff",
          bodyColor: "#fff",
          borderColor: "rgba(0, 212, 255, 0.5)",
          borderWidth: 1,
          cornerRadius: 8,
          displayColors: false,
          callbacks: {
            label: function (context) {
              return "Proficiency: " + context.parsed.y + "/20";
            },
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          min: 0,
          max: 20,
          grid: {
            color: "rgba(255, 255, 255, 0.1)",
            lineWidth: 1,
          },
          ticks: {
            color: "#aaa",
            font: {
              size: 12,
            },
          },
          border: {
            color: "rgba(255, 255, 255, 0.1)",
          },
        },
        x: {
          grid: {
            display: false,
          },
          ticks: {
            color: "#fff",
            font: {
              size: 13,
              weight: "500",
            },
          },
          border: {
            color: "rgba(255, 255, 255, 0.1)",
          },
        },
      },
      animation: {
        duration: 2000,
        easing: "easeInOutQuart",
      },
    },
  };

  new Chart(ctx, chartData);

  // Intersection Observer API
  const chartContainer = document.querySelector(".chart-container");
  let chartInitialized = false;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !chartInitialized) {
          new Chart(ctx, chartData); // Inisialisasi chart ketika elemen terlihat
          chartInitialized = true; // Mencegah animasi ulang
          observer.unobserve(chartContainer); // Hentikan observasi setelah inisialisasi
        }
      });
    },
    { threshold: 0.5 } // Trigger animasi ketika 50% elemen terlihat
  );

  observer.observe(chartContainer);
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
