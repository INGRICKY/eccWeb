const galleryRoot = 'https://drive.google.com/drive/folders/1ZbJdPyb4HYbpvHbGA32l4Ggy1-ayIuRs';
const albums = {
  tout: { id: '1kuGv26WKJetrOPDXKbapfApCa8exCpQT', title: 'Toutes les photos' },
  kinder: { id: '1zImVtYmKehYhbX1csL4lWj2vJ34RmIUo', title: 'Kinder' },
  primaire: { id: '1_rwXSUOXS2wI-3EpIZyXU3KEWj4_9fos', title: 'Primaire' },
  secondaire: { id: '1FYDzRGST2U7e1fsqZqj-5Vzoh54OwtLt', title: 'Secondaire' }
};
const recentGrid = document.querySelector('#recent-photos');
if (recentGrid) {
  const photos = [...(window.ECC_GALLERY_PHOTOS || [])].sort((a,b) => Date.parse(b.createdTime) - Date.parse(a.createdTime)).slice(0,8);
  photos.forEach((photo,index) => {
    const link = document.createElement('a');
    link.className = 'ecc-photo';
    link.href = `https://drive.google.com/file/d/${encodeURIComponent(photo.id)}/view`;
    link.target = '_blank'; link.rel = 'noopener noreferrer';
    link.setAttribute('aria-label', `Voir ${photo.title} sur Google Drive`);
    const image = document.createElement('img');
    image.src = `https://drive.google.com/thumbnail?id=${encodeURIComponent(photo.id)}&sz=w640`;
    image.alt = photo.title; image.loading = 'lazy'; image.referrerPolicy = 'no-referrer';
    const caption = document.createElement('span');
    caption.className = 'ecc-photo-caption';
    caption.textContent = `${String(index+1).padStart(2,'0')} — Vie de l’école ↗`;
    image.addEventListener('error', () => { image.hidden = true; link.classList.add('image-unavailable'); caption.textContent = 'Voir la photo sur Google Drive ↗'; });
    link.append(image,caption); recentGrid.append(link);
  });
}
const albumFrame = document.querySelector('#album-frame');
if (albumFrame) {
  const buttons = [...document.querySelectorAll('[data-album]')];
  function selectAlbum(key) {
    if (!Object.hasOwn(albums,key)) key = 'tout';
    const album = albums[key];
    albumFrame.src = `https://drive.google.com/embeddedfolderview?id=${album.id}#grid`;
    albumFrame.title = `Galerie ECC — ${album.title}`;
    document.querySelector('#album-link').href = `https://drive.google.com/drive/folders/${album.id}`;
    document.querySelector('#album-status').textContent = album.title;
    buttons.forEach(button => { const active = button.dataset.album === key; button.classList.toggle('active',active); button.setAttribute('aria-pressed',String(active)); });
  }
  buttons.forEach(button => button.addEventListener('click', () => { selectAlbum(button.dataset.album); history.replaceState(null,'',`#${button.dataset.album}`); }));
  selectAlbum(location.hash.slice(1));
  window.addEventListener('hashchange', () => selectAlbum(location.hash.slice(1)));
}
