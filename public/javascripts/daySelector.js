const navDays = document.querySelectorAll(".selector.day");
const prevDayButton = document.querySelector(".nav-button.day.prev");
const nextDayButton = document.querySelector(".nav-button.day.next");
const navDayActive = document.querySelector(".selector.day.active");

let currentDayIndex = 0;

prevDayButton.addEventListener("click", () => {
  if (currentDayIndex > 0) {
    currentDayIndex--;
    selectDayButton();
    
    scrollToDay(navDays[currentDayIndex]);
  }
});

nextDayButton.addEventListener("click", () => {
  if (currentDayIndex < navDays.length - 1) {
    currentDayIndex++;
    selectDayButton();
    
    scrollToDay(navDays[currentDayIndex]);
  }
});

navDays.forEach((button, index) => {
  button.addEventListener("click", () => {
    currentDayIndex = index;
    selectDayButton();

    scrollToDay(button);
  });
});

function selectDayButton() {
  navDays.forEach((button, index) => {
    if (index === currentDayIndex) {
      button.classList.add("active");
    } else {
      button.classList.remove("active");
    }
  });
}

function scrollToDay(element) {
  element.scrollIntoView({ behavior: 'smooth', block: 'center' });
}