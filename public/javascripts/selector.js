const navMonths = document.querySelectorAll(".selector.month");
let navDays;

const prevMonthButton = document.querySelector(".nav-button.month.prev");
const nextMonthButton = document.querySelector(".nav-button.month.next");
const navMonthActive = document.querySelector(".selector.month.active");

const prevDayButton = document.querySelector(".nav-button.day.prev");
const nextDayButton = document.querySelector(".nav-button.day.next");
const navDayActive = document.querySelector(".selector.day.active");

let currentMonthIndex = startMonth + (navMonths.length - 1), currentDayIndex = 0;

prevMonthButton.addEventListener("click", async () => {
    if (currentMonthIndex > startMonth) {
        currentMonthIndex--;
        
        selectButton(navMonths, currentMonthIndex);
        await updateDayList(currentMonthIndex);
        
        scrollTo(navMonths[currentMonthIndex]);
    }
});

nextMonthButton.addEventListener("click", async () => {
    if (currentMonthIndex < navMonths.length - 1) {
        currentMonthIndex++;
        
        selectButton(navMonths, currentMonthIndex);
        await updateDayList(currentMonthIndex);
        
        scrollTo(navMonths[currentMonthIndex]);
    }
});

navMonths.forEach((button, index) => {
    button.addEventListener("click", async () => {
        currentMonthIndex = startMonth + index;
        
        selectButton(navMonths, currentMonthIndex - startMonth);
        await updateDayList(currentMonthIndex);

        scrollTo(button);
    });
});


async function updateDayList(num) {
    const days = document.querySelector(".days");
    const data = (await fetch("database").then(res => res.json()))["values"];
    
    while(days.firstChild) {
        days.removeChild(days.firstChild);
    }
    
    const uniqueDays = new Set();
    const uniqueMonths = new Set();
                        
    data.forEach(val => uniqueMonths.add(val.createdAt.month))
    
    data.filter(el => el.createdAt.month == num).forEach(val => uniqueDays.add(val.createdAt.day));
    
    uniqueDays.forEach(day => {
        let dayButton = document.createElement("div");
        dayButton.classList.add("selector", "day");
        dayButton.innerHTML = day;
        
        days.appendChild(dayButton);
    })
    
    navDays = document.querySelectorAll(".selector.day");
    
    navDays.forEach((button, index) => {
        button.addEventListener("click", () => {
            currentDayIndex = index;
            
            let allDataFromDay = data.filter(el => el.createdAt.day == Array.from(uniqueDays)[currentDayIndex]),
                tdsValue = 0, tempValue = 0;
            
            allDataFromDay.forEach(data => {
                tdsValue += Number(data.tds);
                tempValue += Number(data.temp);
            })
            
            removeMarkers();
            
            createNewMarker(
                { lng: allDataFromDay[0].lng, lat: allDataFromDay[0].lat },
                { tds: Math.round(tdsValue / allDataFromDay.length), temp: (tempValue / allDataFromDay.length).toFixed(2), createdAt: allDataFromDay[0].createdAt },
                allDataFromDay.length
            );
            
            selectButton(navDays, currentDayIndex);

            scrollTo(button);
        });
    });
    
    navDays[navDays.length - 1].click();
}

prevDayButton.addEventListener("click", () => {
    if (currentDayIndex > 0) {
        currentDayIndex--;
        selectButton(navDays, currentDayIndex);

        scrollTo(navDays[currentDayIndex]);
    }
});

nextDayButton.addEventListener("click", () => {
    if (currentDayIndex < navDays.length - 1) {
        currentDayIndex++;
        selectButton(navDays, currentDayIndex);

        scrollTo(navDays[currentDayIndex]);
    }
});

function selectButton(from, cur) {
    from.forEach((button, index) => {
        if (index === cur) {
        button.classList.add("active");
        } else {
        button.classList.remove("active");
        }
    });
}

function scrollTo(element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
}