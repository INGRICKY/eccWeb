const slides = [
  { image: '1PIVJqRu9CceJ7WBtIlUzyX3Xs7M4tmD5', alt: 'Photo 1 de la galerie de l’École Chrétienne de Cyvadier', category: '01 / APPRENDRE', title: 'Chaque enfant,<br>un avenir à écrire.' },
  { image: '1hXWccsXFeA2f8UWdjbmC139wrjz0Xi5D', alt: 'Photo 2 de la galerie de l’École Chrétienne de Cyvadier', category: '02 / GRANDIR', title: 'La curiosité ouvre<br>de nouveaux horizons.' },
  { image: '1XIvcD8PsPmlppBWaih1l3bZCjTAo4nBB', alt: 'Photo 3 de la galerie de l’École Chrétienne de Cyvadier', category: '03 / PARTAGER', title: 'L’espérance dans la foi<br>et dans la connaissance.' },
  { image: '1LqZtoxiDyFjD6dNHB1nCumnfV4KwpH88', alt: 'Photo 4 de la galerie de l’École Chrétienne de Cyvadier', category: '04 / NOTRE ÉCOLE', title: 'La communauté ECC,<br>en images.' }
];
let current = 0;
let timer;
let paused = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const dots = [...document.querySelectorAll('.dot')];
const pauseButton = document.querySelector('#pause-slide');
const heroImage = document.querySelector('#hero-image');
heroImage.classList.add('is-visible');
const alternateImage = document.createElement('img');
alternateImage.alt = '';
alternateImage.setAttribute('aria-hidden', 'true');
alternateImage.referrerPolicy = 'no-referrer';
heroImage.after(alternateImage);
let visibleImage = heroImage;
let requestId = 0;
const slideCounter = document.createElement('span');
slideCounter.className = 'hero-counter';
slideCounter.textContent = '01 / 04';
slideCounter.setAttribute('aria-label', 'Photo 1 sur 4');
document.querySelector('.carousel-controls .dots').after(slideCounter);
function showSlide(index) {
  current = (index + slides.length) % slides.length;
  const slide = slides[current];
  const pendingId = ++requestId;
  const image = visibleImage === heroImage ? alternateImage : heroImage;
  const preload = new Image();
  preload.referrerPolicy = 'no-referrer';
  preload.onload = () => {
    if (pendingId !== requestId) return;
    image.src = preload.src;
    image.alt = slide.alt;
    image.removeAttribute('aria-hidden');
    image.classList.add('is-visible');
    visibleImage.classList.remove('is-visible');
    visibleImage.setAttribute('aria-hidden', 'true');
    visibleImage = image;
    updateSlideCaption(slide);
  };
  preload.onerror = () => { /* Keep the last readable photo if Drive is unavailable. */ };
  preload.src = `https://drive.google.com/thumbnail?id=${encodeURIComponent(slide.image)}&sz=w1600`;
}
function updateSlideCaption(slide) {
  document.querySelector('#slide-category').textContent = slide.category;
  document.querySelector('#slide-title').innerHTML = slide.title;
  dots.forEach((dot, i) => { dot.classList.toggle('active', i === current); dot.setAttribute('aria-pressed', String(i === current)); });
  slideCounter.textContent = `${String(current + 1).padStart(2, '0')} / 04`;
  slideCounter.setAttribute('aria-label', `Photo ${current + 1} sur 4`);
}
function schedule() { clearInterval(timer); if (!paused && !document.hidden) timer = setInterval(() => showSlide(current + 1), 5000); }
function navigate(index) { showSlide(index); schedule(); }
document.querySelector('#prev-slide').addEventListener('click', () => navigate(current - 1));
document.querySelector('#next-slide').addEventListener('click', () => navigate(current + 1));
dots.forEach((dot, i) => dot.addEventListener('click', () => navigate(i)));
function updatePause() { pauseButton.textContent = paused ? '▶' : 'Ⅱ'; pauseButton.setAttribute('aria-label', paused ? 'Reprendre le carrousel' : 'Mettre le carrousel en pause'); schedule(); }
pauseButton.addEventListener('click', () => { paused = !paused; updatePause(); });
document.addEventListener('visibilitychange', schedule);
document.querySelector('.hero').addEventListener('keydown', event => { if (event.key === 'ArrowLeft') navigate(current - 1); if (event.key === 'ArrowRight') navigate(current + 1); });
document.querySelector('.hero').addEventListener('focusin', event => {
  if (event.target.matches(':focus-visible')) { paused = true; updatePause(); }
});
updatePause();
const menu = document.querySelector('#navigation');
const menuToggle = document.querySelector('.menu-toggle');
function closeMenu() { menu.classList.remove('open'); menuToggle.setAttribute('aria-expanded', 'false'); menuToggle.setAttribute('aria-label', 'Ouvrir le menu'); }
menuToggle.addEventListener('click', () => { const open = menu.classList.toggle('open'); menuToggle.setAttribute('aria-expanded', String(open)); menuToggle.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu'); });
menu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape' && menu.classList.contains('open')) { closeMenu(); menuToggle.focus(); } });
document.querySelector('#year').textContent = new Date().getFullYear();

const teamTrack = document.querySelector('#team-track');
if (teamTrack) {
  const teamCards = [...teamTrack.querySelectorAll('.team-card')];
  const teamStatus = document.querySelector('#team-status');
  let teamIndex = 0;
  let teamScrollTimer;
  function visibleTeamCards() {
    if (window.matchMedia('(max-width: 520px)').matches) return 1;
    if (window.matchMedia('(max-width: 800px)').matches) return 2;
    return 3;
  }
  function updateTeamStatus() {
    const visible = visibleTeamCards();
    const first = Math.min(teamIndex + 1, teamCards.length);
    const last = Math.min(teamIndex + visible, teamCards.length);
    teamStatus.textContent = `${String(first).padStart(2, '0')}–${String(last).padStart(2, '0')} / ${teamCards.length}`;
  }
  function moveTeam(index) {
    const max = Math.max(0, teamCards.length - visibleTeamCards());
    teamIndex = Math.max(0, Math.min(index, max));
    const card = teamCards[teamIndex];
    if (card) {
      teamTrack.scrollTo({
        left: card.offsetLeft - teamCards[0].offsetLeft,
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'
      });
    }
    updateTeamStatus();
  }
  document.querySelector('#team-prev').addEventListener('click', () => moveTeam(teamIndex - 1));
  document.querySelector('#team-next').addEventListener('click', () => moveTeam(teamIndex + 1));
  teamTrack.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      moveTeam(teamIndex + (event.key === 'ArrowLeft' ? -1 : 1));
    }
  });
  teamTrack.addEventListener('scroll', () => {
    clearTimeout(teamScrollTimer);
    teamScrollTimer = setTimeout(() => {
      const firstOffset = teamCards[0].offsetLeft;
      teamIndex = teamCards.reduce((nearest, card, index) => {
        const currentDistance = Math.abs(teamCards[nearest].offsetLeft - firstOffset - teamTrack.scrollLeft);
        const candidateDistance = Math.abs(card.offsetLeft - firstOffset - teamTrack.scrollLeft);
        return candidateDistance < currentDistance ? index : nearest;
      }, 0);
      teamIndex = Math.min(teamIndex, Math.max(0, teamCards.length - visibleTeamCards()));
      updateTeamStatus();
    }, 120);
  }, { passive: true });
  new ResizeObserver(() => moveTeam(teamIndex)).observe(teamTrack);
  updateTeamStatus();
}
