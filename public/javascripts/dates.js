const navDates = document.querySelectorAll(".nav-date");
const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");
const navDateActive = document.querySelector(".nav-date.active");

let currentIndex = 0;

prevButton.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    selectButton();
    
    scrollTo(navDates[currentIndex]);
  }
});

nextButton.addEventListener("click", () => {
  if (currentIndex < navDates.length - 1) {
    currentIndex++;
    selectButton();
    
    scrollTo(navDates[currentIndex]);
  }
});

navDates.forEach((button, index) => {
  button.addEventListener("click", () => {
    currentIndex = index;
    selectButton();

    scrollTo(button);
  });
});

function selectButton() {
  navDates.forEach((button, index) => {
    if (index === currentIndex) {
      button.classList.add("active");
    } else {
      button.classList.remove("active");
    }
  });
}

function scrollTo(element) {
  element.scrollIntoView({ behavior: 'smooth', block: 'center' });
}