const schoolPhotos = [
  { id: '1w0f9LbKEyuKk1bL0Efn_VIjgnQr_fd06', title: 'Entrée de l’École Chrétienne de Cyvadier' },
  { id: '1b7-XcUpEGxWmmsMKW7i1dPI5SF7xxZwy', title: 'École Chrétienne de Cyvadier — bâtiment 1' },
  { id: '15Ul203ibdAwbmt5XUcOvIM__dRd9Jito', title: 'École Chrétienne de Cyvadier — bâtiment 2' },
  { id: '1_FgbZKM3JwPWhCq5o8DXRiZm9_auvMFR', title: 'École Chrétienne de Cyvadier — bâtiment 3' },
  { id: '1wKSc4WLaE7aIS2os4g4Xon90VL11m_bQ', title: 'École Chrétienne de Cyvadier — bâtiment 4' },
  { id: '1HCivG3tMgWlShdBhNcl12JgmtqBTAnGr', title: 'École Chrétienne de Cyvadier — bâtiment 5' }
];
const allPhotos = [...schoolPhotos, ...(window.ECC_GALLERY_PHOTOS || [])];
function renderPhotos(grid, photos, captionFor) {
  if (!grid) return;
  photos.forEach((photo, index) => {
    const link = document.createElement('a');
    link.className = 'ecc-photo';
    link.href = `https://drive.google.com/file/d/${encodeURIComponent(photo.id)}/view`;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.setAttribute('aria-label', `Voir ${photo.title} sur Google Drive`);
    const image = document.createElement('img');
    image.src = `https://drive.google.com/thumbnail?id=${encodeURIComponent(photo.id)}&sz=w640`;
    image.alt = photo.title;
    image.loading = 'lazy';
    image.referrerPolicy = 'no-referrer';
    const caption = document.createElement('span');
    caption.className = 'ecc-photo-caption';
    caption.textContent = captionFor(photo, index);
    image.addEventListener('error', () => {
      image.hidden = true;
      link.classList.add('image-unavailable');
      caption.textContent = 'Ouvrir la photo sur Google Drive ↗';
    });
    link.append(image, caption);
    grid.append(link);
  });
}
const recentGrid = document.querySelector('#recent-photos');
const recentPhotos = [...(window.ECC_GALLERY_PHOTOS || [])]
  .sort((a, b) => Date.parse(b.createdTime) - Date.parse(a.createdTime))
  .slice(0, 8);
renderPhotos(recentGrid, recentPhotos, (_, index) => `${String(index + 1).padStart(2, '0')} — Vie de l’école ↗`);
const allPhotosGrid = document.querySelector('#all-photos');
renderPhotos(allPhotosGrid, allPhotos, photo => `${photo.title} ↗`);
const photoCount = document.querySelector('#photo-count');
if (photoCount) photoCount.textContent = `${allPhotos.length} photos`;
