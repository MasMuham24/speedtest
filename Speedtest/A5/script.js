let currentDate = new Date();
const monthYear = document.getElementById("monthYear");
const calendar = document.getElementById("calendar");

function renderCalendar() {
    const year = currentDate.getFullYear(), month = currentDate.getMonth();
    monthYear.innerText = currentDate.toLocaleString("en-US", { month: "long", year: "numeric" });

    calendar.innerHTML = "";
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();
    const today = new Date();

    [...Array(firstDay)].forEach(() => calendar.appendChild(document.createElement("div")));

    [...Array(lastDate)].forEach((_, i) => {
        const dayCell = document.createElement("div");
        dayCell.classList.add("calendar-day");
        dayCell.innerText = i + 1;
        if (i + 1 === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
            dayCell.classList.add("today");
        }
        calendar.appendChild(dayCell);
    });
}

["prevMonth", "nextMonth"].forEach((id, i) =>
    document.getElementById(id).addEventListener("click", () => {
        currentDate.setMonth(currentDate.getMonth() + (i ? 1 : -1));
        renderCalendar();
    })
);

renderCalendar();
