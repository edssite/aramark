export default function decorate(block) {
    const items = [...block.children];
    const totalItems = items.length;
    const visibleItems = 3;
    const gap = 20; // Gap between items, matching CSS

    // Create left and right arrow buttons
    const leftArrow = document.createElement('button');
    leftArrow.classList.add('arrow', 'left');
    leftArrow.innerText = '‹';

    const rightArrow = document.createElement('button');
    rightArrow.classList.add('arrow', 'right');
    rightArrow.innerText = '›';

    // Append arrows to the carousel wrapper to prevent them from moving with the carousel
    const carouselWrapper = block.parentElement;
    carouselWrapper.appendChild(leftArrow);
    carouselWrapper.appendChild(rightArrow);

    let currentIndex = 0;

    function moveCarousel(index) {
        const maxIndex = totalItems - visibleItems;
        currentIndex = Math.min(Math.max(index, 0), maxIndex);

        // Calculate the width dynamically
        const cardWidth = items[0].offsetWidth;
        const offset = -(currentIndex * (cardWidth + gap));

        block.style.transform = `translateX(${offset}px)`;
    }

    leftArrow.addEventListener('click', () => {
        moveCarousel(currentIndex - 1);
    });

    rightArrow.addEventListener('click', () => {
        moveCarousel(currentIndex + 1);
    });

    // Initial setup
    moveCarousel(currentIndex);
}
