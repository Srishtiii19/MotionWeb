const container = document.getElementById('scrollContainer');
const words = container.querySelectorAll('.word');

const col1Wrapper = document.getElementById('col1Wrapper');
const col2Wrapper = document.getElementById('col2Wrapper');
const col1 = document.getElementById('col1');
const col2 = document.getElementById('col2');

function updateCenterWord() {
  const containerRect = container.getBoundingClientRect();
  const containerCenter = containerRect.left + containerRect.width / 2;

  words.forEach(word => {
    const wordRect = word.getBoundingClientRect();
    const wordCenter = wordRect.left + wordRect.width / 2;
    const distance = Math.abs(containerCenter - wordCenter);

    if (distance < 50) {
      word.classList.remove('opacity-40', 'blur-sm');
      word.classList.add('opacity-100', 'blur-0', 'font-sans');
    } else {
      word.classList.remove('opacity-100', 'blur-0', 'font-sans');
      word.classList.add('opacity-40', 'blur-sm');
    }
  });
}

updateCenterWord();

container.addEventListener('scroll', () => {
  requestAnimationFrame(() => {
    updateCenterWord();

    const maxHorizontalScroll = container.scrollWidth - container.clientWidth;
    const scrollRatio = container.scrollLeft / maxHorizontalScroll;

    const maxCol1Scroll = col1.scrollHeight - col1Wrapper.clientHeight;
    const maxCol2Scroll = col2.scrollHeight - col2Wrapper.clientHeight;

    col1Wrapper.scrollTop = scrollRatio * maxCol1Scroll; // Top to bottom
    col2Wrapper.scrollTop = maxCol2Scroll - scrollRatio * maxCol2Scroll; // Bottom to top
  });
});
