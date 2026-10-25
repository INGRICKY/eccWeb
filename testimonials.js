const testimonialTrack = document.querySelector('.testimonial-grid');
const testimonialSection = document.querySelector('#temoignages');
const testimonialControls = document.querySelector('#testimonial-controls');
const testimonialPause = document.querySelector('#testimonial-pause');
const testimonialStatus = document.querySelector('#testimonial-status');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let testimonialTimer;
let testimonialPaused = reduceMotion.matches;
let testimonialHovered = false;
let testimonialIndex = 0;
let testimonialVisible = 3;
let testimonialCards = [];
function testimonialMax() { return Math.max(0, testimonialCards.length - testimonialVisible); }
function scheduleTestimonials() {
  clearInterval(testimonialTimer);
  if (testimonialMax() && !testimonialPaused && !testimonialHovered && !document.hidden) {
    testimonialTimer = setInterval(() => moveTestimonials(testimonialIndex + 1), 6000);
  }
}
function moveTestimonials(index) {
  const max = testimonialMax();
  testimonialIndex = index < 0 ? max : index > max ? 0 : index;
  const card = testimonialCards[testimonialIndex];
  if (card) testimonialTrack.scrollTo({ left: card.offsetLeft - testimonialCards[0].offsetLeft, behavior: reduceMotion.matches ? 'instant' : 'smooth' });
  scheduleTestimonials();
}
function updateTestimonialStatus() {
  testimonialStatus.textContent = `${testimonialIndex + 1}–${Math.min(testimonialIndex + testimonialVisible, testimonialCards.length)} / ${testimonialCards.length}`;
}
function refreshTestimonials() {
  testimonialCards = [...testimonialTrack.querySelectorAll('.testimonial-card')];
  testimonialVisible = window.matchMedia('(max-width: 800px)').matches ? 1 : 3;
  testimonialControls.hidden = testimonialMax() === 0;
  testimonialTrack.setAttribute('aria-roledescription', testimonialMax() ? 'carrousel' : 'liste');
  testimonialIndex = Math.min(testimonialIndex, testimonialMax());
  moveTestimonials(testimonialIndex);
  updateTestimonialStatus();
}
document.querySelector('#testimonial-prev').addEventListener('click', () => moveTestimonials(testimonialIndex - 1));
document.querySelector('#testimonial-next').addEventListener('click', () => moveTestimonials(testimonialIndex + 1));
function updateTestimonialPause() {
  testimonialPause.textContent = testimonialPaused ? '▶' : 'Ⅱ';
  testimonialPause.setAttribute('aria-label', testimonialPaused ? 'Reprendre les témoignages' : 'Mettre les témoignages en pause');
  scheduleTestimonials();
}
testimonialPause.addEventListener('click', () => { testimonialPaused = !testimonialPaused; updateTestimonialPause(); });
testimonialSection.addEventListener('mouseenter', () => { testimonialHovered = true; scheduleTestimonials(); });
testimonialSection.addEventListener('mouseleave', () => { testimonialHovered = false; scheduleTestimonials(); });
testimonialSection.addEventListener('focusin', event => {
  if (event.target.matches(':focus-visible')) { testimonialPaused = true; updateTestimonialPause(); }
});
testimonialTrack.addEventListener('keydown', event => {
  if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
    event.preventDefault();
    moveTestimonials(testimonialIndex + (event.key === 'ArrowLeft' ? -1 : 1));
  }
});
testimonialTrack.addEventListener('scroll', () => {
  if (!testimonialCards.length) return;
  let nearest = 0;
  testimonialCards.forEach((card, index) => {
    if (Math.abs(card.offsetLeft - testimonialCards[0].offsetLeft - testimonialTrack.scrollLeft) < Math.abs(testimonialCards[nearest].offsetLeft - testimonialCards[0].offsetLeft - testimonialTrack.scrollLeft)) nearest = index;
  });
  testimonialIndex = Math.min(nearest, testimonialMax());
  updateTestimonialStatus();
}, { passive: true });
testimonialTrack.addEventListener('touchstart', () => { testimonialPaused = true; updateTestimonialPause(); }, { passive: true });
document.addEventListener('visibilitychange', scheduleTestimonials);
new ResizeObserver(refreshTestimonials).observe(testimonialTrack);
new MutationObserver(refreshTestimonials).observe(testimonialTrack, { childList: true });
updateTestimonialPause();
refreshTestimonials();
