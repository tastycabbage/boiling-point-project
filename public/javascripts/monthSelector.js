const navMonths = document.querySelectorAll(".selector.month");
const prevMonthButton = document.querySelector(".nav-button.month.prev");
const nextMonthButton = document.querySelector(".nav-button.month.next");
const navMonthActive = document.querySelector(".selector.month.active");

let currentMonthIndex = 0;

prevMonthButton.addEventListener("click", () => {
  if (currentMonthIndex > 0) {
    currentMonthIndex--;
    selectMonthButton();
    
    scrollToMonth(navMonths[currentMonthIndex]);
  }
});

nextMonthButton.addEventListener("click", () => {
  if (currentMonthIndex < navMonths.length - 1) {
    currentMonthIndex++;
    selectMonthButton();
    updateDayList();
    
    scrollToMonth(navMonths[currentMonthIndex]);
  }
});

navMonths.forEach((button, index) => {
  button.addEventListener("click", () => {
    currentMonthIndex = index;
    selectMonthButton();

    scrollToMonth(button);
  });
});

function selectMonthButton() {
  navMonths.forEach((button, index) => {
    if (index === currentMonthIndex) {
      button.classList.add("active");
    } else {
      button.classList.remove("active");
    }
  });
}

function scrollToMonth(element) {
  element.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function updateDayList() {
  const days = document.querySelectorAll(".days");
  days.setAttribute("now", currentMonthIndex);
}