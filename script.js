// Theme toggle button
const themeBtn = document.getElementById("themeBtn");
themeBtn.addEventListener("click", () => {
    const themes = ["default-theme", "morning-theme", "evening-theme", "night-theme"];
    let current = document.body.className;
    let next = themes[(themes.indexOf(current) + 1) % themes.length];
    document.body.className = next;
});

// Auto theme based on time
function applyTheme() {
    const hour = new Date().getHours();
    let theme = "default-theme";
    if (hour >= 6 && hour < 12) theme = "morning-theme";
    else if (hour >= 12 && hour < 18) theme = "evening-theme";
    else if (hour >= 18 || hour < 6) theme = "night-theme";
    document.body.className = theme;
}
applyTheme();
setInterval(applyTheme, 900000); // 15 minutes

// Card open/close
function allFeatures() {
    const allElems = document.querySelectorAll(".elem");
    const allFullElems = document.querySelectorAll(".fullelem");
    const allBackBtn = document.querySelectorAll(".back");

    allElems.forEach((el) => {
        el.addEventListener("click", () => {
            allFullElems[el.id].style.display = "block";
        });
    });

    allBackBtn.forEach((el) => {
        el.addEventListener("click", () => {
            allFullElems[el.id].style.display = "none";
        });
    });
}
allFeatures();





function openFeature() {
    var allElems = document.querySelectorAll(".elem")
    var FullElemPage = document.querySelectorAll(".fullelem")
    var FullElemPageBckBtn = document.querySelectorAll(".fullelem .back")



    allElems.forEach(function (elem) {
        elem.addEventListener("click", function () {

            console.log(FullElemPage[elem.id]);
            FullElemPage[elem.id].style.display = 'block'
        })
    })

    FullElemPageBckBtn.forEach(function (back) {
        back.addEventListener("click", function () {
            FullElemPage[back.id].style.display = 'none';

        })
    })

}

openFeature()

function todoList() {
    var currentTasks = []

    if (localStorage.getItem('currentTasks')) {
        currentTasks = JSON.parse(localStorage.getItem('currentTasks'))

    } else {
        console.log('Task list is Empty');

    }

    function renderTask() {


        let allTask = document.querySelector('.alltask')

        let sum = ' '


        currentTasks.forEach(function (elem, idx) {
            sum = sum + `<div class="task">
                        <h5>${elem.task} <span class=${elem.imp}>
                        imp</span> </h5>
                            <details>
                <summary>More Info</summary>
                <p>${elem.details || 'No details added'}</p>
            </details>
                        <button id=${idx}>Mark As Done👍</button>
                    </div>`
        })
        allTask.innerHTML = sum

        localStorage.setItem('currentTasks', JSON.stringify(currentTasks))

        var markCompleteBtn = document.querySelectorAll('.alltask .task button')

        markCompleteBtn.forEach(function (btn) {
            btn.addEventListener('click', function () {
                currentTasks.splice(btn.id, 1)

                renderTask()
            })
        })
    }
    renderTask()

    let form = document.querySelector('.addtask form')
    let taskInput = document.querySelector('.addtask form input')
    let taskDetailsInput = document.querySelector('.addtask form textarea')
    let textCheckbox = document.querySelector('.addtask form #check')

    form.addEventListener('submit', function (e) {
        e.preventDefault()
        currentTasks.push(
            {
                task: taskInput.value,
                details: taskDetailsInput.value,
                imp: textCheckbox.checked
            }
        )
        renderTask()
        taskInput.value = ''
        taskDetailsInput.value = ''
        textCheckbox.checked = false

    })
}
todoList()

function dailyPlanner() {
    var dayPlannerData = JSON.parse(localStorage.getItem('dayPlannerData')) || {}

    var dayPlanner = document.querySelector('.day-planner')


    var hours = Array.from({ length: 18 }, (elem, idx) => {
        return `${6 + idx}:00 - ${7 + idx}:00`
    })

    var wholeDaySum = ''
    hours.forEach(function (elem, idx) {
        // console.log(elem);
        var saveData = dayPlannerData[idx] || ''
        wholeDaySum = wholeDaySum + `
                <div class="day-planner-time">
                    <p>${elem}</p>
                    <input id=${idx} type="text" placeholder="...." value=${saveData}>
                    </div>`

    })


    dayPlanner.innerHTML = wholeDaySum

    var dayplannerInput = document.querySelectorAll('.day-planner input')

    dayplannerInput.forEach(function (elem) {
        elem.addEventListener('input', function () {
            dayPlannerData[elem.id] = elem.value

            localStorage.setItem('dayPlannerData', JSON.stringify(dayPlannerData))
        })
    })
}
dailyPlanner()

function ayyah() {
    var motiQuote = document.querySelector('.moti2 h1');
    var motiAuthor = document.querySelector('.moti3 h2');

    let lastAyah = null; // store last fetched Ayah number

    async function fetchQuote() {
        let data;
        do {
            let response = await fetch('https://api.alquran.cloud/v1/ayah/random/en.asad?ts=' + Date.now(), { cache: 'no-store' });
            data = await response.json();
        } while (data.data.number === lastAyah); // repeat if same as last

        lastAyah = data.data.number; // save current

        motiQuote.innerHTML = data.data.text;
        motiAuthor.innerHTML = data.data.surah.name;
    }

    // Fetch new Ayah
    fetchQuote();
}
ayyah()
function pomodoro() {
    let timer = document.querySelector('.pomo-timer h1')
    var startBtn = document.querySelector('.pomo-timer .start')
    var pauseBtn = document.querySelector('.pomo-timer .pause')
    var resetBtn = document.querySelector('.pomo-timer .reset')
    var session = document.querySelector('.pomo-fullpage .session')
    var isWorkSession = true

    let timerInterval = null
    let totalSec = 1500
    function updateTime() {
        let minutes = Math.floor(totalSec / 60)
        let seconds = totalSec % 60

        timer.innerHTML = `${String(minutes).padStart('2', '0')}:${String(seconds).padStart('2', '0')}`
    }

    function startTimer() {
        clearInterval(timerInterval)

        if (isWorkSession) {

            timerInterval = setInterval(function () {
                if (totalSec > 0) {
                    totalSec--
                    updateTime()
                } else {
                    isWorkSession = false
                    clearInterval(timerInterval)
                    timer.innerHTML = '05:00'
                    session.innerHTML = 'Take a Break!!'
                    session.style.backgroundColor = 'var(--blue)'
                    totalSec = 25 * 60


                }

            }, 1000)
        } else {
            timerInterval = setInterval(function () {
                if (totalSec > 0) {
                    totalSec--
                    updateTime()
                } else {
                    isWorkSession = true
                    clearInterval(timerInterval)
                    timer.innerHTML = '25:00'
                    session.innerHTML = 'Work Session'
                    session.style.backgroundColor = 'var(--green)'
                    totalSec = 5 * 60

                }

            }, 1000)
        }


    }
    function pauseTimer() {
        clearInterval(timerInterval)
    }
    function resetTimer() {
        totalSec = 25 * 60
        clearInterval(timerInterval)
        updateTime()

    }

    startBtn.addEventListener('click', startTimer)
    pauseBtn.addEventListener('click', pauseTimer)
    resetBtn.addEventListener('click', resetTimer)







}

pomodoro()

function DailyGoals() {

    var dailyGoals = []

    // 🔹 alag localStorage key
    if (localStorage.getItem('dailyGoals')) {
        dailyGoals = JSON.parse(localStorage.getItem('dailyGoals'))
    } else {
        console.log('Daily Goals list is empty')
    }

    function renderGoals() {

        // 🔹 Daily Goals ka specific container
        let allTask = document.querySelector('.goals-fullpage .alltask')

        let sum = ''

        dailyGoals.forEach(function (elem, idx) {
            sum += `<div class="task">
            <h5>${elem.task} <span class="${elem.imp}">imp</span></h5>
            <p class="task-details">${elem.details || 'No details added'}</p>
            <button id="${idx}">Mark As Done</button>
        </div>`
        })

        allTask.innerHTML = sum

        localStorage.setItem('dailyGoals', JSON.stringify(dailyGoals))

        var markCompleteBtn = document.querySelectorAll(
            '.goals-fullpage .alltask .task button'
        )

        markCompleteBtn.forEach(function (btn) {
            btn.addEventListener('click', function () {
                dailyGoals.splice(btn.id, 1)
                renderGoals()
            })
        })
    }

    renderGoals()

    // 🔹 Daily Goals ka form
    let form = document.querySelector('.goals-fullpage .addtask form')
    let taskInput = form.querySelector('input')
    let taskDetailsInput = form.querySelector('.goals-fullpage textarea')
    let textCheckbox = form.querySelector('#check')

    form.addEventListener('submit', function (e) {
        e.preventDefault()

        dailyGoals.push({
            task: taskInput.value,
            details: taskDetailsInput.value,
            imp: textCheckbox.checked
        })

        renderGoals()

        taskInput.value = ''
        taskDetailsInput.value = ''
        textCheckbox.checked = false
    })
}

// 🔹 DOM ready ke baad run karo
document.addEventListener('DOMContentLoaded', DailyGoals)



var header1 = document.querySelector('.header1 h1');
var headerTime = document.querySelector('.header1 h2')

var header2Temp = document.querySelector('.header2 h2');
var precipitation = document.querySelector('.header2 .preci');
var humidity = document.querySelector('.header2 .humi');
var wind = document.querySelector('.header2 .wind');
var header2Condition = document.querySelector('.header2 h4'); // optional, if you add condition h4

async function weatherApiCall() {
    var apiKey = "c92aae31b608476cb2a184241252512";
    var city = "Mangaon";

    // Use HTTPS
    var response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`);
    var data = await response.json();

    // Update HTML
    header2Temp.innerHTML = `${data.current.temp_c}°C`;
    if (header2Condition) header2Condition.innerHTML = `${data.current.condition.text}`;
    precipitation.innerHTML = `Precipitation: ${data.current.precip_mm} mm`;
    humidity.innerHTML = `Humidity: ${data.current.humidity}%`;
    wind.innerHTML = `Wind: ${data.current.wind_kph} km/hr`;
}

weatherApiCall();


function timedate() {
    const dayWeek = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
    ];
    const months = [
        "January", "February", "March", "April",
        "May", "June", "July", "August",
        "September", "October", "November", "December"
    ];
    var date = new Date();
    var dayOfWeek = dayWeek[date.getDay()];
    var hours = date.getHours()
    var minutes = date.getMinutes()
    var seconds = date.getSeconds()
    var day = date.getDate()
    var month = months[date.getMonth()];
    var year = date.getFullYear()

    const ampm = new Date().getHours() >= 12 ? "PM" : "AM";

    hours = String(hours).padStart(2, "0");
    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");

    header1.innerHTML =
        `${dayOfWeek}, ${hours}:${minutes}:${seconds} ${ampm}`;
    headerTime.innerHTML = `${day} ${month}, ${year}`
}
setInterval(timedate, 1000);
timedate();

