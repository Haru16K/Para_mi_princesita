// script.js

// Audio principal (botón play) con Howler
const voice = new Howl({
  src: ['audio/ssvid.net--New-West-Those-Eyes-Lyrics.mp3'],
  volume: 0.9
});
document.getElementById('btnPlay').addEventListener('click', () => {
  if (voice.playing()) {
    voice.stop();
  } else {
    voice.play();
  }
});

// función sorpresa → abre modal con imagen, mensaje y audio
function mostrarSorpresa() {
  let modal = document.getElementById("modalSorpresa");
  if (modal) {
    modal.style.display = "flex"; 

    if (voice.playing()) voice.pause();

    let audio = document.getElementById("audioSorpresa");
    if (audio) {
      audio.currentTime = 0;
      let playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log("🎵 audioSorpresa reproduciéndose");
          })
          .catch(error => {
            console.error("❌ Error al reproducir audioSorpresa:", error);
          });
      }
    }
  }
}

// cerrar modal sorpresa
function cerrarSorpresa() {
  let modal = document.getElementById("modalSorpresa");
  if (modal) {
    modal.style.display = "none";

    let audio = document.getElementById("audioSorpresa");
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }

    if (!voice.playing()) voice.play();
  }
}

// función especial → abre modal con imagen JPG y reproduce audio
function mostrarEspecial() {
  let modal = document.getElementById("modalEspecial");
  if (modal) {
    modal.style.display = "flex"; 

    if (voice.playing()) voice.pause();

    let audio = document.getElementById("audioEspecial");
    if (audio) {
      audio.currentTime = 0; 
      audio.play(); 
    }
  }
}

// cerrar modal especial y pausar audio
function cerrarEspecial() {
  let modal = document.getElementById("modalEspecial");
  if (modal) {
    modal.style.display = "none";

    let audio = document.getElementById("audioEspecial");
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }

    if (!voice.playing()) voice.play();
  }
}

// inicializar AOS y GLightbox si los usas
if (typeof AOS !== 'undefined') AOS.init({ once: true, duration: 700 });
if (typeof GLightbox !== 'undefined') GLightbox({ touchNavigation: true, loop: true });

// Inicializar Swiper solo después de que la ventana cargue
window.addEventListener("load", () => {
  const swiper = new Swiper(".mySwiper", {
    loop: true,
    slidesPerView: 1,
    centeredSlides: true,
    spaceBetween: 10,
    autoplay: { delay: 3000, disableOnInteraction: false },
    pagination: { el: ".swiper-pagination", clickable: true },
    navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
    observer: true,
    observeParents: true,
    grabCursor: true,
  });

  // Recalcular Swiper cuando cada imagen termine de cargar
  const imgs = document.querySelectorAll(".mySwiper img");
  imgs.forEach(img => {
    if (!img.complete) {
      img.addEventListener("load", () => swiper.update());
      img.addEventListener("error", () => swiper.update());
    } else {
      swiper.update();
    }
  });

  window.addEventListener("resize", () => swiper.update());
});

