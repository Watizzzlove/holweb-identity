// ==========================================================================
// holweb Brand Identity Presentation Script
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {

  // 1. FILTER BUTTONS LOGIC
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.concept-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      cards.forEach(card => {
        const categories = card.getAttribute('data-category').split(' ');
        if (filterValue === 'all' || categories.includes(filterValue)) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 20);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(12px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });

  // 2. PER-CARD CONTRAST COLOR DOTS
  const colorDots = document.querySelectorAll('.color-dot');
  colorDots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      const container = e.target.closest('.card-body');
      const card = container.closest('.concept-card');
      const mediaWrapper = card.querySelector('.card-media-wrapper');
      const bg = dot.getAttribute('data-bg');

      // Update active dot in this group
      container.querySelectorAll('.color-dot').forEach(d => d.classList.remove('active'));
      dot.classList.add('active');

      // Apply background color
      mediaWrapper.style.backgroundColor = bg;
    });
  });

  // 3. LIGHTBOX MODAL LOGIC
  const modal = document.getElementById('lightbox-modal');
  const modalImg = document.getElementById('modal-img');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-desc');
  const modalImgBox = document.getElementById('modal-img-box');
  const modalCloseBtn = document.getElementById('modal-close-btn');

  function openModal(imgSrc, title, desc, currentBg) {
    if (!modal || !modalImg) return;
    modalImg.src = imgSrc;
    if (modalTitle) modalTitle.textContent = title || 'Детальный просмотр знака';
    if (modalDesc) modalDesc.textContent = desc || '';
    if (modalImgBox) {
      modalImgBox.style.backgroundColor = currentBg || '#06090E';
    }
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Trigger buttons
  document.querySelectorAll('.zoom-trigger').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      const parent = e.target.closest('.concept-card, .deliverable-card');
      if (!parent) return;
      const img = parent.querySelector('.card-img');
      const title = trigger.getAttribute('data-title');
      const desc = trigger.getAttribute('data-desc');
      const mediaBox = parent.querySelector('.card-media-wrapper, .deliv-media');
      const currentBg = mediaBox ? window.getComputedStyle(mediaBox).backgroundColor : '#06090E';

      if (img) openModal(img.src, title, desc, currentBg);
    });
  });

  // Modal close events
  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('open')) {
      closeModal();
    }
  });

  // Modal background toggle buttons
  document.querySelectorAll('.modal-bg-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      if (modalImgBox) modalImgBox.style.backgroundColor = btn.getAttribute('data-bg');
    });
  });

  // 4. INTERACTIVE TEST LAB
  const labSelect = document.getElementById('lab-logo-select');
  const labPreviewImg = document.getElementById('lab-preview-img');
  const labScaleImgs = document.querySelectorAll('.scale-img');
  const labCanvas = document.getElementById('lab-canvas');
  const labBgBtns = document.querySelectorAll('.bg-btn');

  if (labSelect) {
    labSelect.addEventListener('change', () => {
      const selectedSrc = labSelect.value;
      labPreviewImg.src = selectedSrc;
      labScaleImgs.forEach(img => {
        img.src = selectedSrc;
      });
    });
  }

  labBgBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      labBgBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const bg = btn.getAttribute('data-bg');
      labCanvas.style.backgroundColor = bg;
    });
  });

});
