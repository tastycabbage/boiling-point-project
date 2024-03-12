const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
const datesContainer = document.querySelector(".dates");
const dateButtons = document.querySelectorAll(".date-btn");
let currentIndex = 0;

prevBtn.addEventListener("click", function() {
  if (currentIndex > 0) {
    currentIndex--;
    updateSelectedDate();
    scrollToCenter();
  }
});

nextBtn.addEventListener("click", function() {
  if (currentIndex < dateButtons.length - 1) {
    currentIndex++;
    updateSelectedDate();
    scrollToCenter();
  }
});

dateButtons.forEach(function(button, index) {
  button.addEventListener("click", function() {
    currentIndex = index;
    updateSelectedDate();
    scrollToCenter();
  });
});

function updateSelectedDate() {
  dateButtons.forEach(function(button, index) {
    if (index === currentIndex) {
      button.classList.add("selected");
    } else {
      button.classList.remove("selected");
    }
  });
}

function scrollToCenter() {
  const selectedButton = dateButtons[currentIndex];
  const containerRect = datesContainer.getBoundingClientRect();
  const buttonRect = selectedButton.getBoundingClientRect();
  const offsetLeft = buttonRect.left - containerRect.left;
  const offsetRight = containerRect.width - offsetLeft - buttonRect.width;
  const scrollLeft = offsetLeft - (containerRect.width - buttonRect.width) / 2;
  datesContainer.scrollLeft += scrollLeft;
}