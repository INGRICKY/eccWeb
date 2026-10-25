const contactForm = document.querySelector('#contact-form');
contactForm.addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(contactForm);
  document.querySelector('#contact-draft').value = `Bonjour à l’équipe de l’École Chrétienne de Cyvadier,\n\n${data.get('message').trim()}\n\n${data.get('name').trim()}\n${data.get('email').trim()}`;
  document.querySelector('#contact-result').hidden = false;
  document.querySelector('#contact-copy').textContent = 'Copier le message';
});
document.querySelector('#contact-copy').addEventListener('click', async event => {
  const draft = document.querySelector('#contact-draft');
  try { await navigator.clipboard.writeText(draft.value); event.currentTarget.textContent = 'Message copié ✓'; }
  catch { draft.focus(); draft.select(); event.currentTarget.textContent = 'Texte sélectionné : utilisez Copier ou Ctrl+C'; }
});
