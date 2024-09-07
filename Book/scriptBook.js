const pages = document.querySelectorAll('.page');
let currentPage = 0;

const rightArrow = document.getElementById('right-arrow');
const leftArrow = document.getElementById('left-arrow');

// Function to show only the current page
function showPage(pageIndex) {
  pages.forEach((page, index) => {
    if (index === pageIndex) {
      page.classList.add('active'); // Show the current page
    } else {
      page.classList.remove('active'); // Hide all other pages
    }
  });

  // Manage arrow visibility
  leftArrow.style.display = pageIndex > 0 ? 'block' : 'none';
  rightArrow.style.display = pageIndex < pages.length - 1 ? 'block' : 'none';
}

// Right arrow click event
rightArrow.addEventListener('click', () => {
  if (currentPage < pages.length - 1) {
    currentPage++;
    showPage(currentPage);
  }
});

// Left arrow click event
leftArrow.addEventListener('click', () => {
  if (currentPage > 0) {
    currentPage--;
    showPage(currentPage);
  }
});

// Mobile swipe functionality
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handleGesture();
});

function handleGesture() {
  if (touchEndX < touchStartX - 50) {
    // Swiped left
    if (currentPage < pages.length - 1) {
      currentPage++;
      showPage(currentPage);
    }
  }
  
  if (touchEndX > touchStartX + 50) {
    // Swiped right
    if (currentPage > 0) {
      currentPage--;
      showPage(currentPage);
    }
  }
}

// Initialize by showing the first page
showPage(currentPage);
