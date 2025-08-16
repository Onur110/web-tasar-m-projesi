const flap = document.getElementById('flap');
const note = document.getElementById('note');
const envelope = document.getElementById('envelope');
const music = document.getElementById('music');
const acceptBtn = document.getElementById('acceptBtn');
const declineBtn = document.getElementById('declineBtn');
const finalMessage = document.getElementById('finalMessage');

let isOpened = false;

// Kalp ve çiçek oluşturma
function createFalling() {
  const el = document.createElement('div');
  el.className = 'falling';
  el.textContent = Math.random() > 0.5 ? '❤️' : '🌸';
  el.style.left = Math.random() * 100 + 'vw';
  el.style.fontSize = (Math.random() * 15 + 15) + 'px';
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 6000);
}
setInterval(createFalling, 400);

envelope.addEventListener('click', () => {
  if (isOpened) return;
  flap.style.transform = 'rotateX(-150deg)';
  setTimeout(() => {
    note.classList.add('show');
    music.play().catch(() => {
      console.log('Müzik otomatik çalmadı, kullanıcı etkileşimi gerekli.');
    });
  }, 900);
  isOpened = true;
});

acceptBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  finalMessage.style.display = 'block';

  // Kabul edilince daha fazla kalp yağsın
  const fastInterval = setInterval(() => {
    createFalling();
  }, 150);

  // Bir süre sonra normale dönsün
  setTimeout(() => clearInterval(fastInterval), 5000);
});

declineBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  alert('Hilal, vazgeçemezsin! Lütfen tekrar dene 😢');
});

// Klavye ile erişim için Enter ve Space tuşları
envelope.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    envelope.click();
  }
});
envelope.addEventListener('click', () => {
  if (isOpened) return;
  flap.style.transform = 'rotateX(-150deg)';
  setTimeout(() => {
    note.classList.add('show');
    note.classList.add('shake'); // titreme efekti ekleniyor

    // titreşim bittikten sonra class kaldırılır
    setTimeout(() => {
      note.classList.remove('shake');
    }, 700);

    music.play().catch(() => {
      console.log('Müzik otomatik çalmadı, kullanıcı etkileşimi gerekli.');
    });
  }, 900);
  isOpened = true;
});
