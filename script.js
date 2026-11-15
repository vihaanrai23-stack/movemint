/* ==============================================================
   MOVEMINT – SCRIPT
   Sections are added session by session:
   - Session 2: showScreen() navigation, hero (sky, ticker, parallax)  ← done
   - Session 3: challenge data array  ← done
   - Session 4: renderChallenges(), openChallenge(), chooseDifficulty()  ← done
   - Session 5: startWorkout(), stopWorkout()  ← done
   - Session 6: completeChallenge(), checkAchievements(), saveData(), loadData()  ← done
   - Session 7: updateProgress()  ← done
   - Session 8: profile, settings, leaderboard  ← done
   - Session 9: every spec checked, 3 bugs fixed  ← done
   - Session 10: accessibility (focus, page titles), polish  ← done
   ============================================================== */


/* ==============================================================
   1. CHALLENGE DATA
   ONE array holds all 12 challenges (Variety spec: 3 in each of
   Bodyweight, Cardio, Core and Stretching). Each challenge is an
   object with the same properties, so later code can loop through
   the array and treat every challenge the same way:

   id            number   – unique, used to find a challenge
   name          string   – shown on the card
   category      string   – "Bodyweight", "Cardio", "Core" or "Stretching"
   instructions  array    – 2–3 short steps (strings)
   unit          string   – "reps" (count them) or "seconds" (timed)
   eachSide      boolean  – true if you do the amount on each side
   amounts       object   – how many reps/seconds for easy, medium, hard
   minutes       number   – estimated time, always 5 or less (Function spec)
   equipment     string   – always "None" (Materials/Accessibility spec)
   easier        string   – an easier version (Ergonomics + Safety specs)
   ============================================================== */

const challenges = [
  // ----- BODYWEIGHT -----
  {
    id: 1,
    name: "Squats",
    category: "Bodyweight",
    instructions: [
      "Stand with your feet shoulder-width apart.",
      "Bend your knees and push your hips back, like sitting on a chair.",
      "Push through your heels to stand back up."
    ],
    unit: "reps",
    eachSide: false,
    amounts: { easy: 10, medium: 15, hard: 20 },
    minutes: 2,
    equipment: "None",
    easier: "Half squats: only bend your knees halfway down."
  },
  {
    id: 2,
    name: "Push-ups",
    category: "Bodyweight",
    instructions: [
      "Put your hands on the floor, a little wider than your shoulders.",
      "Keep your body in a straight line and lower your chest.",
      "Push back up until your arms are straight."
    ],
    unit: "reps",
    eachSide: false,
    amounts: { easy: 5, medium: 10, hard: 15 },
    minutes: 2,
    equipment: "None",
    easier: "Knee push-ups: keep your knees on the floor."
  },
  {
    id: 3,
    name: "Lunges",
    category: "Bodyweight",
    instructions: [
      "Take a big step forward with one leg.",
      "Lower your back knee towards the floor, keeping your chest up.",
      "Push back to standing and switch legs."
    ],
    unit: "reps",
    eachSide: true,
    amounts: { easy: 6, medium: 10, hard: 14 },
    minutes: 3,
    equipment: "None",
    easier: "Half lunges: only go halfway down, with a hand on a wall for balance."
  },

  // ----- CARDIO -----
  {
    id: 4,
    name: "Jumping Jacks",
    category: "Cardio",
    instructions: [
      "Stand with your feet together and arms by your sides.",
      "Jump your feet apart while raising your arms above your head.",
      "Jump back to the start and repeat."
    ],
    unit: "seconds",
    eachSide: false,
    amounts: { easy: 20, medium: 30, hard: 45 },
    minutes: 2,
    equipment: "None",
    easier: "Step jacks: step one foot out at a time instead of jumping."
  },
  {
    id: 5,
    name: "High Knees",
    category: "Cardio",
    instructions: [
      "Run on the spot.",
      "Lift your knees up to hip height, one after the other.",
      "Pump your arms to keep a quick rhythm."
    ],
    unit: "seconds",
    eachSide: false,
    amounts: { easy: 20, medium: 30, hard: 45 },
    minutes: 2,
    equipment: "None",
    easier: "Marching on the spot: lift your knees without jumping."
  },
  {
    id: 6,
    name: "Skaters",
    category: "Cardio",
    instructions: [
      "Jump sideways onto your right foot, swinging your left leg behind you.",
      "Jump back across onto your left foot.",
      "Keep going side to side, like a speed skater."
    ],
    unit: "reps",
    eachSide: true,
    amounts: { easy: 8, medium: 12, hard: 16 },
    minutes: 2,
    equipment: "None",
    easier: "Step skaters: step side to side instead of jumping."
  },

  // ----- CORE -----
  {
    id: 7,
    name: "Plank",
    category: "Core",
    instructions: [
      "Rest on your forearms and toes.",
      "Keep your body in a straight line from head to heels.",
      "Hold still and keep breathing."
    ],
    unit: "seconds",
    eachSide: false,
    amounts: { easy: 15, medium: 30, hard: 45 },
    minutes: 1,
    equipment: "None",
    easier: "Knee plank: rest on your knees instead of your toes."
  },
  {
    id: 8,
    name: "Crunches",
    category: "Core",
    instructions: [
      "Lie on your back with your knees bent and feet flat.",
      "Lift your head and shoulders off the floor using your stomach muscles.",
      "Lower back down slowly."
    ],
    unit: "reps",
    eachSide: false,
    amounts: { easy: 10, medium: 15, hard: 20 },
    minutes: 2,
    equipment: "None",
    easier: "Small crunches: slide your hands up your thighs and only lift a little."
  },
  {
    id: 9,
    name: "Mountain Climbers",
    category: "Core",
    instructions: [
      "Start in a push-up position with straight arms.",
      "Drive one knee towards your chest, then switch legs quickly.",
      "Keep your hips low."
    ],
    unit: "seconds",
    eachSide: false,
    amounts: { easy: 15, medium: 25, hard: 40 },
    minutes: 2,
    equipment: "None",
    easier: "Slow climbers: step one knee in at a time, without jumping."
  },

  // ----- STRETCHING -----
  {
    id: 10,
    name: "Hamstring Stretch",
    category: "Stretching",
    instructions: [
      "Stand and put one heel forward with your leg straight.",
      "Bend your other knee and lean forward until you feel a gentle stretch.",
      "Hold, then switch legs."
    ],
    unit: "seconds",
    eachSide: true,
    amounts: { easy: 20, medium: 30, hard: 40 },
    minutes: 2,
    equipment: "None",
    easier: "Seated stretch: sit with one leg straight and reach gently towards your toes."
  },
  {
    id: 11,
    name: "Shoulder & Arm Stretch",
    category: "Stretching",
    instructions: [
      "Bring one arm across your chest.",
      "Use your other hand to gently pull it closer.",
      "Hold, then switch arms."
    ],
    unit: "seconds",
    eachSide: true,
    amounts: { easy: 15, medium: 25, hard: 35 },
    minutes: 2,
    equipment: "None",
    easier: "Shoulder rolls: slowly roll your shoulders backwards in circles."
  },
  {
    id: 12,
    name: "Hip Flexor Stretch",
    category: "Stretching",
    instructions: [
      "Kneel on one knee with your other foot flat in front of you.",
      "Gently push your hips forward until you feel a stretch at the front of your hip.",
      "Hold, then switch sides."
    ],
    unit: "seconds",
    eachSide: true,
    amounts: { easy: 20, medium: 30, hard: 40 },
    minutes: 2,
    equipment: "None",
    easier: "Standing hip stretch: step one foot back and gently push your hips forward."
  }
];


/* ==============================================================
   2. NAVIGATION – showScreen()
   ============================================================== */

// All the screens and the four nav buttons
const screens = document.querySelectorAll(".screen");
const navButtons = document.querySelectorAll(".nav-btn");

// Shows one screen and hides the others.
// screenId is the id of the <section> to show, e.g. "challenges".
function showScreen(screenId) {
  // Remember what has keyboard focus before the old screen is hidden
  const focused = document.activeElement;

  // Leaving the workout screen stops its timer, so it can't keep
  // running in the background (timerId is in section 10)
  if (screenId !== "workout") {
    clearInterval(timerId);
  }

  // Loop through every screen: only the matching one gets "active"
  screens.forEach(function (screen) {
    screen.classList.toggle("active", screen.id === screenId);
  });

  // Screens without their own nav button (like challenge details)
  // name the button to highlight in data-nav. || means "otherwise".
  const navId = document.getElementById(screenId).dataset.nav || screenId;

  // Highlight the matching nav button
  navButtons.forEach(function (button) {
    const isCurrent = button.dataset.screen === navId;
    button.classList.toggle("active", isCurrent);

    // aria-current tells screen readers which screen you're on
    if (isCurrent) {
      button.setAttribute("aria-current", "page");
    } else {
      button.removeAttribute("aria-current");
    }
  });

  // Start every screen from the top
  window.scrollTo(0, 0);

  // Accessibility (Session 10):
  // 1. The page title says which screen is open, e.g. "Progress · MoveMint",
  //    so screen reader users know where they are.
  // 2. If the button that was used is on the screen that just closed (e.g. a
  //    challenge card), focus moves to the new screen's heading, so keyboard
  //    users aren't left on nothing. The nav bar keeps its own focus.
  const newScreen = document.getElementById(screenId);
  const heading = newScreen.querySelector("h1, h2");
  document.title = screenId === "home" ? "MoveMint" : heading.textContent + " · MoveMint";

  const oldScreen = focused.closest(".screen");
  if (oldScreen && oldScreen !== newScreen) {
    heading.setAttribute("tabindex", "-1");   // -1: can be focused by code, but not with Tab
    heading.focus({ preventScroll: true });
  }

  // Coming back to Home: put the hills back in place for the top of the
  // page. (Without this, if the page was already at the top, no scroll
  // event happened, so the hills stayed where they were when the user
  // left – found by testing in Session 9.)
  if (screenId === "home" && !reduceMotion) {
    updateParallax();
  }

  // The Progress and Profile screens are rebuilt from the saved data every time they open
  if (screenId === "progress") {
    updateProgress();
  }
  if (screenId === "profile") {
    updateProfile();
  }
}

// Event listener: anything with a data-screen attribute (the nav
// buttons, the Start Today card and the details Back button) opens
// that screen when clicked
document.querySelectorAll("[data-screen]").forEach(function (element) {
  element.addEventListener("click", function () {
    showScreen(element.dataset.screen);
  });
});


/* ==============================================================
   3. HERO – SKY AND HOUR
   ============================================================== */

const hero = document.getElementById("hero");
const heroHour = document.getElementById("hero-hour");
const skyBody = document.getElementById("sky-body");
const heroChallengeLabel = document.getElementById("hero-challenge-label");

// Picks the sky colour for the time of day, shows the hour in the
// top-right label (e.g. "HOUR 14"), moves the sun or moon, and shows
// how many minutes are left of this hour's challenge
function updateHeroTime() {
  const now = new Date();
  const hour = now.getHours();       // a number from 0 to 23
  const minutes = now.getMinutes();  // 0 to 59

  let sky;
  if (hour >= 5 && hour < 12) {
    sky = "morning";
  } else if (hour >= 12 && hour < 17) {
    sky = "afternoon";
  } else if (hour >= 17 && hour < 21) {
    sky = "evening";
  } else {
    sky = "night";
  }

  // Remove the old sky class, then add the new one (CSS has the colours)
  hero.classList.remove("sky-morning", "sky-afternoon", "sky-evening", "sky-night");
  hero.classList.add("sky-" + sky);

  // padStart adds a leading zero, so 9 becomes "09"
  heroHour.textContent = "Hour " + String(hour).padStart(2, "0");

  // Sun (5:00–21:00) or moon (21:00–5:00). progress goes from 0 when it
  // rises to 1 when it sets. % 24 wraps the night round midnight.
  const time = hour + minutes / 60;
  let progress;
  if (time >= 5 && time < 21) {
    progress = (time - 5) / 16;
  } else {
    progress = ((time - 21 + 24) % 24) / 8;
  }
  // Left to right across the sky; Math.sin makes an arch, so it is
  // highest in the middle and sinks behind the hills at both ends
  skyBody.style.left = (8 + progress * 84) + "%";
  skyBody.style.top = (60 - Math.sin(progress * Math.PI) * 48) + "%";

  heroChallengeLabel.textContent = "This hour's challenge · " + (60 - minutes) + " min left";
}

updateHeroTime();
setInterval(updateHeroTime, 60000);   // check again every minute (60,000 ms)

// Night sky: 40 stars in random places, each twinkling at its own speed.
// Math.random() gives a number from 0 to 1.
const starBox = document.getElementById("stars");
for (let i = 0; i < 40; i++) {
  const star = document.createElement("span");
  star.className = "star";
  if (Math.random() < 0.25) {
    star.classList.add("star-big");   // about 1 in 4 is a little bigger
  }
  star.style.left = Math.random() * 100 + "%";
  star.style.top = Math.random() * 100 + "%";
  star.style.setProperty("--t", (2 + Math.random() * 3) + "s");   // 2–5 s per twinkle
  star.style.setProperty("--d", (-Math.random() * 5) + "s");      // each starts at a different point
  starBox.appendChild(star);
}

// Split "MoveMint" into one <span> per letter, so CSS can make them rise
// one after another (--i is each letter's position: 0, 1, 2 ...).
// aria-label keeps the whole word for screen readers.
const heroTitle = document.getElementById("home-title");
const titleText = heroTitle.textContent;
heroTitle.setAttribute("aria-label", titleText);
heroTitle.textContent = "";
titleText.split("").forEach(function (letter, index) {
  const span = document.createElement("span");
  span.className = "title-letter";
  span.textContent = letter;
  span.style.setProperty("--i", index);
  span.setAttribute("aria-hidden", "true");
  heroTitle.appendChild(span);
});


/* ==============================================================
   4. HERO – TICKER
   buildTicker() takes a list of words and fills the ticker strip.
   renderHourlyChallenge() (section 7) calls it with the real
   hourly challenge, e.g. "Squats", "10 reps", "+10 pts".
   ============================================================== */

const tickerTrack = document.getElementById("ticker-track");

function buildTicker(items) {
  tickerTrack.innerHTML = "";   // clear any old text

  // Make two identical copies (see the ticker section in style.css)
  for (let copy = 0; copy < 2; copy++) {
    const group = document.createElement("span");
    group.className = "ticker-group";

    // Screen readers should only read the text once
    if (copy === 1) {
      group.setAttribute("aria-hidden", "true");
    }

    // Repeat the message 3 times so one copy is wider than a desktop screen
    for (let repeat = 0; repeat < 3; repeat++) {
      items.forEach(function (item, index) {
        const word = document.createElement("span");
        word.textContent = item + " · ";
        if (index === 0) {
          word.className = "ticker-highlight";   // first word in peach
        }
        group.appendChild(word);
      });
    }

    tickerTrack.appendChild(group);
  }
}


/* ==============================================================
   5. HERO – PARALLAX
   Every hero layer has a data-depth from 0 (far away) to 1 (closest).
   - Scrolling: far layers are pushed down more, so they seem to
     move more slowly than near layers, like a real landscape.
   - Mouse (desktop only): near layers move more than far ones.
   Only "transform" is changed, which the browser can animate
   smoothly, and requestAnimationFrame updates at most once per
   screen refresh.
   ============================================================== */

const parallaxLayers = document.querySelectorAll("[data-depth]");
const homeScreen = document.getElementById("home");

// matchMedia checks the user's device settings
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const hasMouse = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

let mouseX = 0;              // -1 (left edge) to 1 (right edge)
let mouseY = 0;              // -1 (top) to 1 (bottom)
let frameRequested = false;  // stops us asking for more than one frame at a time

function updateParallax() {
  frameRequested = false;
  const scrollY = window.scrollY;   // how far the page has scrolled, in px

  parallaxLayers.forEach(function (layer) {
    const depth = Number(layer.dataset.depth);

    const scrollShift = scrollY * (1 - depth) * 0.5;
    const moveX = mouseX * depth * -20;
    const moveY = mouseY * depth * -8;

    // Template literal: the ${ } parts are replaced with the numbers
    layer.style.transform = `translate(${moveX}px, ${scrollShift + moveY}px)`;
  });
}

function requestParallax() {
  // Only animate while the Home screen is showing
  if (!frameRequested && homeScreen.classList.contains("active")) {
    frameRequested = true;
    requestAnimationFrame(updateParallax);
  }
}

if (!reduceMotion) {
  window.addEventListener("scroll", requestParallax, { passive: true });

  if (hasMouse) {
    hero.addEventListener("mousemove", function (event) {
      // Turn the mouse position into a number from -1 to 1
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = (event.clientY / window.innerHeight) * 2 - 1;
      requestParallax();
    });
  }
}


/* ==============================================================
   6. HOME – SCROLL CUE AND START TODAY REVEAL
   ============================================================== */

// Tapping "Scroll" glides down to the Start Today card
document.getElementById("scroll-cue").addEventListener("click", function () {
  document.querySelector(".home-content").scrollIntoView({
    behavior: reduceMotion ? "auto" : "smooth"
  });
});

// IntersectionObserver watches elements and tells us when they
// come onto the screen. Then we add "visible" so the CSS fades
// them in.
const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window && !reduceMotion) {
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);   // only animate once
      }
    });
  }, { threshold: 0.2 });   // when 20% of the card is on screen

  revealItems.forEach(function (item) {
    observer.observe(item);
  });
} else {
  // Older browsers or reduced motion: just show the card
  revealItems.forEach(function (item) {
    item.classList.add("visible");
  });
}


/* ==============================================================
   7. CHALLENGES SCREEN – renderChallenges()
   ============================================================== */

// Points for each difficulty (Motivation spec). Session 6 adds them up.
const difficultyPoints = { easy: 10, medium: 15, hard: 20 };

const categories = ["Bodyweight", "Cardio", "Core", "Stretching"];

// A small outline icon for each category, drawn as SVG
const categoryIcons = {
  Bodyweight: '<svg viewBox="0 0 24 24"><circle cx="12" cy="5" r="2"/><path d="M5 10l7 1 7-1M12 11v5l-3 5M12 16l3 5"/></svg>',
  Cardio: '<svg viewBox="0 0 24 24"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/></svg>',
  Core: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/></svg>',
  Stretching: '<svg viewBox="0 0 24 24"><path d="M3 15c3-6 6-6 9 0s6 6 9 0"/></svg>'
};

// Turns a challenge's target into words, e.g. "15 reps" or
// "30 seconds each side". level is "easy", "medium" or "hard".
function describeTarget(challenge, level) {
  // amounts[level] uses the level as the property name,
  // so amounts["medium"] is the same as amounts.medium
  let text = challenge.amounts[level] + " " + challenge.unit;
  if (challenge.eachSide) {
    text += " each side";
  }
  return text;
}

// --- This Hour's Challenge ---

// The hour (0–23) picks a challenge. % gives the remainder after
// dividing by 12, so hours 0–11 and 12–23 each go through all 12.
function getHourlyChallenge() {
  const hour = new Date().getHours();
  return challenges[hour % challenges.length];
}

let shownHour = -1;   // the hour currently shown (-1 = nothing yet)

// Fills in the hour card and the Home ticker. Only does the work
// when the hour has changed, so the ticker doesn't restart every minute.
function renderHourlyChallenge() {
  const hour = new Date().getHours();
  if (hour === shownHour) {
    return;
  }
  shownHour = hour;

  const challenge = getHourlyChallenge();
  const target = describeTarget(challenge, "easy");

  document.getElementById("hour-card-label").textContent =
    "This hour's challenge · Hour " + String(hour).padStart(2, "0");
  document.getElementById("hour-card-title").textContent = challenge.name;
  document.getElementById("hour-card-info").textContent =
    target + " · +" + difficultyPoints.easy + " pts · no equipment";

  buildTicker(["This hour", challenge.name, target, "+" + difficultyPoints.easy + " pts",
               "No equipment", challenge.minutes + " min"]);

  // The same challenge on the card in the Home sky
  document.getElementById("hero-challenge-name").textContent = challenge.name;
  document.getElementById("hero-challenge-info").textContent =
    target + " · +" + difficultyPoints.easy + " pts · no equipment";
}

// Start begins the workout straight away at the remembered difficulty,
// so a challenge can be started in 2 taps from Home
// (Start Today card → this Start button)
document.getElementById("hour-card-start").addEventListener("click", function () {
  startWorkout(getHourlyChallenge().id, selectedDifficulty);
});

// "Start now" on the Home sky card: starts it in just 1 tap from Home
document.getElementById("hero-start").addEventListener("click", function () {
  startWorkout(getHourlyChallenge().id, selectedDifficulty);
});

renderHourlyChallenge();
setInterval(renderHourlyChallenge, 60000);   // check every minute for a new hour

// --- Filter tabs: Today / This Week / All ---

// Counts whole days since 1 Jan 1970 for a date (today if no date is
// given – "= new Date()" is a default value). It goes up by 1 every day,
// so it can be used to rotate challenges. Date.UTC uses the user's own
// year, month and day, so the answer is the same in every time zone.
function getDayNumber(date = new Date()) {
  const days = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
  return days / 86400000;   // 86,400,000 ms in a day
}

// Weeks run Monday to Sunday. Day 0 (1 Jan 1970) was a Thursday, so
// adding 3 makes each new week number start on a Monday.
function getWeekNumber(date = new Date()) {
  return Math.floor((getDayNumber(date) + 3) / 7);
}

// Returns the challenges for a filter:
//   "all"  – all 12
//   "week" – 2 from each category (8), a different one left out each week
//   "today"– 1 of this week's 2 from each category (4), swapping each day
function getFilteredChallenges(filter) {
  if (filter === "all") {
    return challenges;
  }

  const day = getDayNumber();
  const week = getWeekNumber();
  const result = [];

  // Which of this week's 2 to show today (0 or 1). dayOfWeek (0 = Monday
  // ... 6 = Sunday) makes it swap every day; adding week % 3 shifts the
  // pattern each week, so a Monday never repeats the Sunday before.
  const dayOfWeek = (day + 3) % 7;
  const todayIndex = (dayOfWeek + week % 3) % 2;

  categories.forEach(function (category) {
    // filter() makes a new array with only the challenges that pass the test
    const inCategory = challenges.filter(function (challenge) {
      return challenge.category === category;
    });

    // This week: leave out one of the 3 (week % 3 is 0, 1 or 2)
    const thisWeek = inCategory.filter(function (challenge, index) {
      return index !== week % 3;
    });

    if (filter === "week") {
      result.push(thisWeek[0], thisWeek[1]);
    } else {
      result.push(thisWeek[todayIndex]);
    }
  });

  return result;
}

const challengeList = document.getElementById("challenge-list");
const filterTabs = document.querySelectorAll(".filter-tab");
const listLabels = { today: "Today's challenges", week: "This week's challenges", all: "All challenges" };

let currentFilter = "today";   // the tab that is chosen

// Builds one card (a <button>) for every challenge in the chosen filter
function renderChallenges(filter) {
  currentFilter = filter;
  challengeList.innerHTML = "";   // remove the old cards

  getFilteredChallenges(filter).forEach(function (challenge) {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "challenge-card";
    card.dataset.category = challenge.category;   // CSS uses this for the icon colour

    card.innerHTML = `
      <span class="challenge-icon" aria-hidden="true">${categoryIcons[challenge.category]}</span>
      <span>
        <span class="challenge-name">${challenge.name}</span>
        <span class="challenge-meta">${challenge.category} · ${challenge.minutes} min · no equipment</span>
      </span>
      <span class="challenge-arrow" aria-hidden="true">›</span>`;

    card.addEventListener("click", function () {
      openChallenge(challenge.id);
    });

    challengeList.appendChild(card);
  });

  document.getElementById("list-label").textContent = listLabels[filter];

  // Highlight the chosen tab
  filterTabs.forEach(function (tab) {
    const isChosen = tab.dataset.filter === filter;
    tab.classList.toggle("active", isChosen);
    tab.setAttribute("aria-pressed", String(isChosen));
  });
}

filterTabs.forEach(function (tab) {
  tab.addEventListener("click", function () {
    renderChallenges(tab.dataset.filter);
  });
});

renderChallenges("today");

// If the app is left open past midnight, the Today and This Week lists
// change to the new day's challenges (found by testing in Session 9).
let shownDay = getDayNumber();

function checkNewDay() {
  if (getDayNumber() !== shownDay) {
    shownDay = getDayNumber();
    renderChallenges(currentFilter);
  }
}

setInterval(checkNewDay, 60000);   // check every minute


/* ==============================================================
   8. CHALLENGE DETAILS – openChallenge(), chooseDifficulty()
   ============================================================== */

let currentChallenge = null;      // the challenge being shown
let selectedDifficulty = "easy";  // starts on Easy (Safety spec); remembered between challenges

const levels = ["easy", "medium", "hard"];
const difficultyBar = document.getElementById("difficulty");
const difficultyButtons = document.querySelectorAll(".difficulty-btn");
const easierButton = document.getElementById("easier-btn");
const easierText = document.getElementById("easier-text");

// Finds a challenge in the array by its id number.
// find() returns the first challenge whose id matches.
function getChallenge(id) {
  return challenges.find(function (challenge) {
    return challenge.id === id;
  });
}

// "easy" → "Easy" (first letter as a capital, then the rest)
function capitalise(text) {
  return text[0].toUpperCase() + text.slice(1);
}

// Fills the details screen with one challenge and shows it.
// id is the challenge's id number from the challenges array.
function openChallenge(id) {
  currentChallenge = getChallenge(id);

  document.getElementById("details-category").textContent = currentChallenge.category;
  document.getElementById("details-title").textContent = currentChallenge.name;
  document.getElementById("details-minutes").textContent = currentChallenge.minutes;

  // One <li> for each instruction step
  const list = document.getElementById("details-instructions");
  list.innerHTML = "";
  currentChallenge.instructions.forEach(function (step) {
    const item = document.createElement("li");
    item.textContent = step;
    list.appendChild(item);
  });

  // The easier version starts hidden each time
  easierText.textContent = currentChallenge.easier;
  easierText.hidden = true;
  easierButton.setAttribute("aria-expanded", "false");

  chooseDifficulty(selectedDifficulty);   // show the target for the remembered level
  showScreen("details");
}

// Selects Easy, Medium or Hard: moves the pill and updates the target and points
function chooseDifficulty(level) {
  selectedDifficulty = level;

  // indexOf gives the position in the array: easy 0, medium 1, hard 2.
  // CSS uses --level to slide the pill along.
  difficultyBar.style.setProperty("--level", levels.indexOf(level));

  difficultyButtons.forEach(function (button) {
    button.setAttribute("aria-pressed", String(button.dataset.level === level));
  });

  document.getElementById("details-number").textContent = currentChallenge.amounts[level];
  document.getElementById("details-unit").textContent =
    currentChallenge.unit + (currentChallenge.eachSide ? " each side" : "");
  document.getElementById("details-points").textContent = "+" + difficultyPoints[level] + " pts";
}

difficultyButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    chooseDifficulty(button.dataset.level);
  });
});

// Shows or hides an easier-version box. Used on the details screen
// and the workout screen, so the code is only written once.
function toggleEasier(button, box) {
  const isOpen = button.getAttribute("aria-expanded") === "true";
  button.setAttribute("aria-expanded", String(!isOpen));
  box.hidden = isOpen;
}

easierButton.addEventListener("click", function () {
  toggleEasier(easierButton, easierText);
});

// Start on the details screen begins the workout at the chosen difficulty
document.getElementById("details-start").addEventListener("click", function () {
  startWorkout(currentChallenge.id, selectedDifficulty);
});


/* ==============================================================
   9. ON-SCREEN MESSAGE – showMessage()
   Used instead of alert() pop-ups: a friendly message appears
   above the nav bar for 6 seconds, then hides itself.
   ============================================================== */

const messageBox = document.getElementById("message");
let messageTimeoutId = null;

function showMessage(text) {
  messageBox.textContent = text;
  messageBox.hidden = false;

  // If a message is already showing, cancel its old hide-timer first
  clearTimeout(messageTimeoutId);
  messageTimeoutId = setTimeout(function () {
    messageBox.hidden = true;
  }, 6000);
}


/* ==============================================================
   10. WORKOUT – startWorkout(), stopWorkout()
   The timer counts down once a second with setInterval().
   - Timed challenges ("seconds"): the ring is the real time.
   - Rep challenges: the ring is a time guide (about 3 s per rep).
   - "Each side" challenges: the time covers both sides, with a
     "Switch sides" message halfway.
   ============================================================== */

const SECONDS_PER_REP = 3;

let timerId = null;        // the number setInterval() gives back, used to stop it
let totalSeconds = 0;      // how long this workout's timer is
let secondsLeft = 0;
let isPaused = false;

const timerRing = document.getElementById("timer-ring");
const timerTime = document.getElementById("timer-time");
const workoutStatus = document.getElementById("workout-status");
const pauseButton = document.getElementById("pause-btn");
const workoutEasierButton = document.getElementById("workout-easier-btn");
const workoutEasierText = document.getElementById("workout-easier-text");

// How many seconds the timer runs for a challenge at a difficulty
function getWorkoutSeconds(challenge, level) {
  let seconds = challenge.amounts[level];
  if (challenge.unit === "reps") {
    seconds = seconds * SECONDS_PER_REP;
  }
  if (challenge.eachSide) {
    seconds = seconds * 2;
  }
  return seconds;
}

// Turns seconds into minutes:seconds, e.g. 75 → "1:15"
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  return minutes + ":" + String(seconds % 60).padStart(2, "0");
}

// Shows the time left and sets how full the ring is (1 = full, 0 = empty)
function updateTimerDisplay() {
  timerTime.textContent = formatTime(secondsLeft);
  timerRing.style.setProperty("--progress", secondsLeft / totalSeconds);
}

// The words shown under the ring while the timer is running
function getGoMessage() {
  if (currentChallenge.unit === "reps") {
    return "Go! Do your reps at a steady pace – the ring is a time guide.";
  }
  return "Go! Keep going until the ring runs out.";
}

// Opens the workout screen and starts the timer.
// id = which challenge, level = "easy", "medium" or "hard"
function startWorkout(id, level) {
  currentChallenge = getChallenge(id);
  selectedDifficulty = level;

  totalSeconds = getWorkoutSeconds(currentChallenge, level);
  secondsLeft = totalSeconds;
  isPaused = false;

  // Fill in the screen
  document.getElementById("workout-label").textContent = "Workout · " + capitalise(level);
  document.getElementById("workout-title").textContent = currentChallenge.name;
  document.getElementById("workout-target").textContent = describeTarget(currentChallenge, level);
  document.getElementById("timer-note").textContent =
    currentChallenge.unit === "seconds" ? "left" : "time guide";
  workoutStatus.textContent = getGoMessage();

  pauseButton.textContent = "Pause";
  pauseButton.setAttribute("aria-pressed", "false");
  pauseButton.disabled = false;

  workoutEasierText.textContent = currentChallenge.easier;
  workoutEasierText.hidden = true;
  workoutEasierButton.setAttribute("aria-expanded", "false");

  updateTimerDisplay();

  // setInterval runs tick() every 1000 ms (1 second) until it's cleared
  clearInterval(timerId);
  timerId = setInterval(tick, 1000);

  showScreen("workout");
}

// Runs once a second while the timer is going
function tick() {
  secondsLeft = secondsLeft - 1;
  updateTimerDisplay();

  // Halfway through an "each side" challenge
  if (currentChallenge.eachSide && secondsLeft === Math.floor(totalSeconds / 2)) {
    workoutStatus.textContent = "Switch sides!";
  }

  // Time's up: stop the timer
  if (secondsLeft <= 0) {
    clearInterval(timerId);
    pauseButton.disabled = true;
    if (currentChallenge.unit === "seconds") {
      workoutStatus.textContent = "Time's up – great work! Tap Done.";
    } else {
      workoutStatus.textContent = "Time's up – finish your last reps, then tap Done.";
    }
  }
}

// Pause stops the timer; Resume starts it again from the same time
function togglePause() {
  isPaused = !isPaused;   // ! flips true to false and false to true

  if (isPaused) {
    clearInterval(timerId);
    pauseButton.textContent = "Resume";
    workoutStatus.textContent = "Paused – take a breath. Tap Resume when you're ready.";
  } else {
    timerId = setInterval(tick, 1000);
    pauseButton.textContent = "Pause";
    workoutStatus.textContent = getGoMessage();
  }
  pauseButton.setAttribute("aria-pressed", String(isPaused));
}

// Stop: leave the workout at any time, with no penalty (Safety spec).
// Goes back to the challenge details, where the easier options are.
function stopWorkout() {
  clearInterval(timerId);
  openChallenge(currentChallenge.id);
  showMessage("Stopped – that's completely fine, no points lost. Rest, have some water, and try an easier level whenever you're ready.");
}

pauseButton.addEventListener("click", togglePause);
document.getElementById("stop-btn").addEventListener("click", stopWorkout);

workoutEasierButton.addEventListener("click", function () {
  toggleEasier(workoutEasierButton, workoutEasierText);
});


/* ==============================================================
   11. SAVING – saveData(), loadData()
   localStorage keeps data in the browser, even after the page is
   closed. It can only store text, so JSON.stringify() turns the
   userData object into text, and JSON.parse() turns it back.
   try / catch handles errors: if something goes wrong inside
   "try", the code in "catch" runs instead of the app crashing.
   ============================================================== */

const STORAGE_KEY = "movemint-data";

// What a brand-new user starts with
function getDefaultData() {
  return {
    totalPoints: 0,
    completed: [],      // one entry per finished challenge: { id, level, points, date }
    achievements: [],   // ids of unlocked achievements, e.g. "first-move"
    badgesShown: [],    // badges already shown on Progress (so new ones flip only once)
    weeklyGoal: 5,      // challenges per week: 3, 5 or 7 (Profile settings)
    showLeaderboard: false,   // OFF by default (Competition spec)
    name: ""            // the user's name ("" until they add one)
  };
}

let userData = getDefaultData();

function saveData() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
  } catch (error) {
    // e.g. storage is switched off in the browser's privacy settings
    showMessage("Your progress couldn't be saved on this device, so it will reset when you close MoveMint.");
  }
}

function loadData() {
  let saved;
  try {
    saved = localStorage.getItem(STORAGE_KEY);
  } catch (error) {
    return;   // storage is blocked: keep the default data
  }

  if (saved === null) {
    return;   // first visit: nothing saved yet
  }

  try {
    const data = JSON.parse(saved);

    // Validation: only use saved data that has the right types
    const hasRightTypes = typeof data.totalPoints === "number" &&
      Array.isArray(data.completed) && Array.isArray(data.achievements);
    if (!hasRightTypes) {
      throw new Error("Saved data is in the wrong format");
    }

    // Keep only completed entries for challenges and levels that exist,
    // with numbers for the points and date
    data.completed = data.completed.filter(function (entry) {
      return getChallenge(entry.id) !== undefined && levels.includes(entry.level) &&
        typeof entry.points === "number" && typeof entry.date === "number";
    });

    // Object.assign copies the saved values over the defaults, so any
    // new settings added in later sessions still get a default value
    userData = Object.assign(getDefaultData(), data);

    // Settings must be allowed values, otherwise use the default
    if (![3, 5, 7].includes(userData.weeklyGoal)) {
      userData.weeklyGoal = 5;
    }
    if (typeof userData.showLeaderboard !== "boolean") {
      userData.showLeaderboard = false;
    }
    if (typeof userData.name !== "string" || validateName(userData.name) !== "") {
      userData.name = "";
    }
  } catch (error) {
    showMessage("Your saved progress couldn't be read, so MoveMint has started fresh.");
  }
}

loadData();


/* ==============================================================
   12. ACHIEVEMENTS – checkAchievements()
   Each achievement has an isEarned() test: it is given the user's
   data and returns true once the achievement has been earned.
   They are all based on totals – never on days in a row
   (Sustainability spec: no streaks).
   ============================================================== */

const achievementList = [
  {
    id: "first-move",
    name: "First Move",
    description: "Complete your first challenge",
    isEarned: function (data) {
      return data.completed.length >= 1;
    }
  },
  {
    id: "getting-going",
    name: "Getting Going",
    description: "Complete 5 challenges",
    isEarned: function (data) {
      return data.completed.length >= 5;
    }
  },
  {
    id: "all-rounder",
    name: "All-Rounder",
    description: "Complete a challenge from every category",
    isEarned: function (data) {
      // every() is true only if ALL 4 categories pass the test;
      // some() is true if AT LEAST ONE completed challenge is in that category
      return categories.every(function (category) {
        return data.completed.some(function (entry) {
          return getChallenge(entry.id).category === category;
        });
      });
    }
  },
  {
    id: "century",
    name: "Century",
    description: "Earn 100 points",
    isEarned: function (data) {
      return data.totalPoints >= 100;
    }
  },
  {
    id: "level-up",
    name: "Level Up",
    description: "Complete your first Hard challenge",
    isEarned: function (data) {
      return data.completed.some(function (entry) {
        return entry.level === "hard";
      });
    }
  }
];

// Unlocks any achievements that have just been earned, and returns
// the new ones so the completion screen can show them
function checkAchievements() {
  const newlyUnlocked = [];

  achievementList.forEach(function (achievement) {
    const alreadyHave = userData.achievements.includes(achievement.id);
    if (!alreadyHave && achievement.isEarned(userData)) {
      userData.achievements.push(achievement.id);
      newlyUnlocked.push(achievement);
    }
  });

  return newlyUnlocked;
}


/* ==============================================================
   13. COMPLETING A CHALLENGE – completeChallenge()
   ============================================================== */

// Medal icon for achievement cards
const medalIcon = '<svg viewBox="0 0 24 24"><circle cx="12" cy="15" r="6"/><path d="M8.5 10.5 6 3h4l2 4 2-4h4l-2.5 7.5"/></svg>';

// Confetti colours from the design system
const confettiColours = ["#3ddc97", "#ffb38a", "#a9c5a0", "#12372a", "#d6f7e8"];

// Runs when Done is tapped: adds the points, records the challenge,
// checks achievements, saves, and shows the completion screen
function completeChallenge() {
  clearInterval(timerId);

  const points = difficultyPoints[selectedDifficulty];
  userData.totalPoints += points;   // += adds to the number already there

  // Record it. Date.now() is the time in ms since 1970 – the
  // Progress screen (Session 7) uses it to count this week's challenges.
  userData.completed.push({
    id: currentChallenge.id,
    level: selectedDifficulty,
    points: points,
    date: Date.now()
  });

  const newAchievements = checkAchievements();
  saveData();

  // Fill in the completion screen
  document.getElementById("complete-points").textContent = "+" + points + " points";
  document.getElementById("points-float").textContent = "+" + points;
  document.getElementById("complete-summary").textContent =
    currentChallenge.name + " · " + capitalise(selectedDifficulty) + " · " +
    describeTarget(currentChallenge, selectedDifficulty);
  document.getElementById("complete-total").textContent = userData.totalPoints;

  // One card per new achievement, or a friendly line if there are none
  const box = document.getElementById("new-achievements");
  box.innerHTML = "";
  if (newAchievements.length === 0) {
    box.innerHTML = '<p class="keep-going">Keep going – every challenge counts.</p>';
  }
  newAchievements.forEach(function (achievement) {
    const card = document.createElement("div");
    card.className = "achievement-card";
    card.innerHTML = `
      <span class="achievement-icon" aria-hidden="true">${medalIcon}</span>
      <span>
        <span class="label">New achievement</span>
        <span class="achievement-name">${achievement.name}</span>
        <span>${achievement.description}</span>
      </span>`;
    box.appendChild(card);
  });

  showScreen("complete");
  celebrate();
}

// The "+15" floats up, and a short burst of confetti comes out of the points badge
function celebrate() {
  // Restart the float animation: remove the class, make the browser
  // notice (reading offsetWidth forces it to update), then add it back
  const float = document.getElementById("points-float");
  float.classList.remove("play");
  void float.offsetWidth;
  float.classList.add("play");

  if (reduceMotion) {
    return;   // no confetti for people who have turned on "reduce motion"
  }

  // The middle of the points badge, where the confetti starts
  const badge = document.getElementById("complete-points").getBoundingClientRect();
  const startX = badge.left + badge.width / 2;
  const startY = badge.top + badge.height / 2;

  const confetti = document.createElement("div");
  confetti.className = "confetti";
  confetti.setAttribute("aria-hidden", "true");

  for (let i = 0; i < 40; i++) {
    const piece = document.createElement("span");
    piece.className = "confetti-piece";
    piece.style.left = startX + "px";
    piece.style.top = startY + "px";
    piece.style.background = confettiColours[i % confettiColours.length];

    // Math.random() gives a number from 0 to 1, so every piece flies
    // a different distance and direction, spins differently and starts
    // at a slightly different time
    piece.style.setProperty("--dx", (Math.random() * 320 - 160) + "px");
    piece.style.setProperty("--dy", (Math.random() * 300 - 220) + "px");
    piece.style.setProperty("--spin", (Math.random() * 720 - 360) + "deg");
    piece.style.setProperty("--delay", (Math.random() * 0.15) + "s");

    confetti.appendChild(piece);
  }

  document.body.appendChild(confetti);

  // Remove the confetti once the burst has finished
  setTimeout(function () {
    confetti.remove();
  }, 1600);
}

document.getElementById("done-btn").addEventListener("click", completeChallenge);


/* ==============================================================
   14. PROGRESS SCREEN – updateProgress()
   Runs every time the Progress screen opens (see showScreen), and
   builds the screen from userData: weekly goal ring, totals,
   badges, completed list and a quote.
   ============================================================== */

const quotes = [
  "Small steps every day add up to big changes.",
  "You don't have to be fast – you just have to keep going.",
  "Five minutes of moving is better than none.",
  "Every challenge counts, however small.",
  "Strong today, stronger tomorrow."
];

// Counts a number up from 0 to target over 0.8 seconds.
// requestAnimationFrame runs step() once per screen refresh.
function countUp(element, target) {
  if (reduceMotion || target === 0) {
    element.textContent = target;   // reduced motion: just show the number
    return;
  }

  const duration = 800;   // ms
  let startTime = null;

  // "now" is the time the browser gives each frame, in ms
  function step(now) {
    // Start the clock on the first frame. (Using performance.now() before the
    // first frame gave a start time slightly AFTER the frame's time, so the
    // first number came out negative, e.g. -4 – found by testing.)
    if (startTime === null) {
      startTime = now;
    }

    // progress goes from 0 to 1 as the time passes (Math.min stops it at 1)
    const progress = Math.min((now - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);   // fast at first, slowing down at the end
    element.textContent = Math.round(target * eased);
    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }

  element.textContent = 0;
  requestAnimationFrame(step);
}

// Turns a saved date into "Today", "Yesterday" or e.g. "Mon 2 Nov"
function formatDate(timestamp) {
  const date = new Date(timestamp);
  const daysAgo = getDayNumber() - getDayNumber(date);
  if (daysAgo === 0) {
    return "Today";
  }
  if (daysAgo === 1) {
    return "Yesterday";
  }
  return date.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" });
}

// The challenges completed in this Monday–Sunday week.
// filter() keeps only the entries whose week number is this week's.
// Used by the weekly goal ring and the leaderboard.
function getThisWeekEntries() {
  const thisWeek = getWeekNumber();
  return userData.completed.filter(function (entry) {
    return getWeekNumber(new Date(entry.date)) === thisWeek;
  });
}

function updateProgress() {
  // --- Weekly goal ---
  const doneThisWeek = getThisWeekEntries().length;
  const goal = userData.weeklyGoal;

  document.getElementById("goal-count").textContent = doneThisWeek + "/" + goal;
  document.getElementById("goal-text").textContent = goal + " challenges this week";

  // Encouraging message – never a "you failed" (Sustainability spec)
  let message;
  if (doneThisWeek === 0) {
    message = "Every challenge counts – start whenever you're ready.";
  } else if (doneThisWeek < goal) {
    message = (goal - doneThisWeek) + " more to reach your goal. Nice work so far!";
  } else {
    message = "Goal reached – brilliant work this week!";
  }
  document.getElementById("goal-message").textContent = message;

  // Ring: set it to 0, make the browser notice (offsetWidth), then set the
  // real value so the CSS transition fills it. Math.min stops it going past full.
  const ring = document.getElementById("goal-ring");
  ring.style.setProperty("--goal", 0);
  void ring.offsetWidth;
  ring.style.setProperty("--goal", Math.min(doneThisWeek / goal, 1));

  // --- Totals (count up) ---
  countUp(document.getElementById("stat-points"), userData.totalPoints);
  countUp(document.getElementById("stat-completed"), userData.completed.length);
  countUp(document.getElementById("stat-badges"), userData.achievements.length);

  // --- Leaderboard (only if switched on in Profile settings) ---
  renderLeaderboard();

  // --- Badges: one per achievement, locked ones greyed out ---
  const badgeList = document.getElementById("badges");
  badgeList.innerHTML = "";

  achievementList.forEach(function (achievement) {
    const unlocked = userData.achievements.includes(achievement.id);
    // New = unlocked, but not shown on this screen before
    const isNew = unlocked && !userData.badgesShown.includes(achievement.id);

    const badge = document.createElement("li");
    badge.className = "badge";
    if (!unlocked) {
      badge.classList.add("locked");
    }
    if (isNew) {
      badge.classList.add("flip");
    }

    badge.innerHTML = `
      <span class="achievement-icon" aria-hidden="true">${medalIcon}</span>
      <span class="badge-name">${achievement.name}</span>
      <span class="badge-description">${achievement.description}</span>
      <span class="badge-status">${unlocked ? "Unlocked" : "Locked"}</span>`;
    badgeList.appendChild(badge);
  });

  // Remember which badges have been shown, so each one only flips once.
  // slice() makes a copy of the array.
  userData.badgesShown = userData.achievements.slice();
  saveData();

  // --- Completed challenges: newest first, up to 10 ---
  const list = document.getElementById("completed-list");
  list.innerHTML = "";

  if (userData.completed.length === 0) {
    list.innerHTML = '<li class="completed-empty">No challenges yet – your first one is only 2 taps away.</li>';
  }

  // Sort newest first by date. slice() copies the array first, so the saved
  // order isn't changed, and reverse() puts later entries first in case two
  // have the same date. sort() compares two entries at a time: a negative
  // answer puts a first, so b.date - a.date puts the bigger (newer) date first.
  const newestFirst = userData.completed.slice().reverse().sort(function (a, b) {
    return b.date - a.date;
  });

  newestFirst.slice(0, 10).forEach(function (entry) {
    const item = document.createElement("li");
    item.className = "completed-item";
    item.innerHTML = `
      <span class="completed-name">${getChallenge(entry.id).name}</span>
      <span class="completed-points">+${entry.points}</span>
      <span class="completed-meta">${capitalise(entry.level)} · ${formatDate(entry.date)}</span>`;
    list.appendChild(item);
  });

  // --- Quote: a different one each day (% wraps round the list) ---
  document.getElementById("quote").textContent = '"' + quotes[getDayNumber() % quotes.length] + '"';
}


/* ==============================================================
   15. PROFILE AND SETTINGS – updateProfile()
   Runs every time the Profile screen opens (see showScreen).
   The user's name is always shown with textContent (never
   innerHTML), so even if someone typed code, it would only be
   shown as text and never run.
   ============================================================== */

const profileName = document.getElementById("profile-name");
const profileAvatar = document.getElementById("profile-avatar");
const editButton = document.getElementById("edit-profile-btn");
const editForm = document.getElementById("edit-profile-form");
const nameInput = document.getElementById("name-input");
const nameError = document.getElementById("name-error");
const leaderboardSwitch = document.getElementById("leaderboard-switch");
const goalButtons = document.querySelectorAll(".segment");
const resetButton = document.getElementById("reset-btn");
const resetConfirm = document.getElementById("reset-confirm");

// The first letter of a name, as a capital (for the avatar)
function getInitial(name) {
  return name.trim()[0].toUpperCase();
}

// Input validation: returns an error message, or "" if the name is OK
function validateName(name) {
  if (name.length === 0) {
    return "Please type your name.";
  }
  if (name.length > 20) {
    return "Names can be up to 20 characters.";
  }
  // A regular expression (a pattern) for allowed characters:
  // \p{L} = any letter in any language, \p{M} = accent and vowel marks
  // (needed for names like "विहान"), \p{N} = any number, then space,
  // apostrophe and hyphen. ^ and $ mean "the whole name".
  if (!/^[\p{L}\p{M}\p{N} '\-]+$/u.test(name)) {
    return "Please use only letters, numbers, spaces, - or '.";
  }
  // It must have at least one letter or number (so "- -" isn't a name)
  if (!/[\p{L}\p{N}]/u.test(name)) {
    return "Please include at least one letter.";
  }
  return "";
}

function updateProfile() {
  // Name and avatar
  if (userData.name) {
    profileName.textContent = userData.name;
    profileName.classList.remove("empty");
    profileAvatar.textContent = getInitial(userData.name);
  } else {
    profileName.textContent = "Add your name";
    profileName.classList.add("empty");
    profileAvatar.textContent = "?";
  }

  // Stats (no streak)
  countUp(document.getElementById("profile-completed"), userData.completed.length);
  countUp(document.getElementById("profile-points"), userData.totalPoints);
  countUp(document.getElementById("profile-badges"), userData.achievements.length);

  // Show the saved settings
  leaderboardSwitch.setAttribute("aria-checked", String(userData.showLeaderboard));
  goalButtons.forEach(function (button) {
    button.setAttribute("aria-pressed", String(Number(button.dataset.goal) === userData.weeklyGoal));
  });

  // Start with the form and the "Are you sure?" box closed
  closeEditForm();
  closeResetConfirm();
}

// --- Edit profile ---

function openEditForm() {
  nameInput.value = userData.name;
  clearNameError();
  editForm.hidden = false;
  editButton.setAttribute("aria-expanded", "true");
  nameInput.focus();
}

function closeEditForm() {
  editForm.hidden = true;
  editButton.setAttribute("aria-expanded", "false");
}

editButton.addEventListener("click", function () {
  if (editForm.hidden) {
    openEditForm();
  } else {
    closeEditForm();
  }
});

document.getElementById("cancel-edit-btn").addEventListener("click", closeEditForm);

// "submit" happens when Save is tapped or Enter is pressed in the box
editForm.addEventListener("submit", function (event) {
  event.preventDefault();   // stop the browser reloading the page (what forms normally do)

  const name = nameInput.value.trim();   // trim() removes spaces at the start and end
  const error = validateName(name);

  if (error !== "") {
    // Not valid: show the message under the box and don't save
    nameError.textContent = error;
    nameInput.setAttribute("aria-invalid", "true");
    nameInput.focus();
    return;
  }

  userData.name = name;
  saveData();
  clearNameError();
  updateProfile();
  showMessage("Name saved – nice to meet you, " + name + "!");
});

// Removes the error message and red border
function clearNameError() {
  nameError.textContent = "";
  nameInput.removeAttribute("aria-invalid");
}

// As soon as the user starts typing again, the old error goes away
nameInput.addEventListener("input", clearNameError);

// --- Leaderboard switch ---
leaderboardSwitch.addEventListener("click", function () {
  userData.showLeaderboard = !userData.showLeaderboard;
  leaderboardSwitch.setAttribute("aria-checked", String(userData.showLeaderboard));
  saveData();
  if (userData.showLeaderboard) {
    showMessage("Leaderboard on – you'll see it on the Progress screen.");
  } else {
    showMessage("Leaderboard off.");
  }
});

// --- Weekly goal: 3, 5 or 7 ---
goalButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    userData.weeklyGoal = Number(button.dataset.goal);   // "5" (text) → 5 (number)
    goalButtons.forEach(function (other) {
      other.setAttribute("aria-pressed", String(other === button));
    });
    saveData();
    showMessage("Weekly goal set to " + userData.weeklyGoal + " challenges.");
  });
});

// --- Reset progress, with an on-screen "Are you sure?" ---

function closeResetConfirm() {
  resetConfirm.hidden = true;
  resetButton.setAttribute("aria-expanded", "false");
}

resetButton.addEventListener("click", function () {
  resetConfirm.hidden = false;
  resetButton.setAttribute("aria-expanded", "true");
  document.getElementById("reset-no-btn").focus();   // the safe choice gets the focus
});

document.getElementById("reset-no-btn").addEventListener("click", closeResetConfirm);

// Clears the progress but keeps the name and settings
document.getElementById("reset-yes-btn").addEventListener("click", function () {
  userData.totalPoints = 0;
  userData.completed = [];
  userData.achievements = [];
  userData.badgesShown = [];
  saveData();
  updateProfile();
  showMessage("Progress reset – here's to a fresh start!");
});


/* ==============================================================
   16. LEADERBOARD – renderLeaderboard()
   Optional and OFF by default (Competition spec). There is no
   server, so the friends are sample data in the code (the names
   and scores from my Design 1 mockup) – a limitation I mention
   in my evaluation.
   ============================================================== */

const sampleFriends = [
  { name: "Riya", points: 28 },
  { name: "Aarav", points: 24 },
  { name: "Kabir", points: 16 },
  { name: "Ananya", points: 12 }
];

// Makes a <span> with a class and some text (textContent keeps it safe)
function makeSpan(className, text) {
  const span = document.createElement("span");
  span.className = className;
  span.textContent = text;
  return span;
}

function renderLeaderboard() {
  const box = document.getElementById("leaderboard");
  box.hidden = !userData.showLeaderboard;
  if (!userData.showLeaderboard) {
    return;
  }

  // My points this week: add up the points of this week's challenges
  let myPoints = 0;
  getThisWeekEntries().forEach(function (entry) {
    myPoints += entry.points;
  });

  // Everyone in one array: a copy of the friends, plus me
  const rows = sampleFriends.slice();
  rows.push({ name: userData.name || "You", points: myPoints, isMe: true });

  // Sort by points, highest first
  rows.sort(function (a, b) {
    return b.points - a.points;
  });

  const list = document.getElementById("leader-list");
  list.innerHTML = "";

  rows.forEach(function (row, index) {
    const item = document.createElement("li");
    item.className = "leader-row";

    let shownName = row.name;
    if (row.isMe) {
      item.classList.add("me");   // highlighted row
      shownName = userData.name ? userData.name + " (you)" : "You";
    }

    // The avatar letter is decoration, so screen readers skip it
    const avatar = makeSpan("avatar avatar-small", getInitial(row.name));
    avatar.setAttribute("aria-hidden", "true");

    // index starts at 0, so the rank is index + 1
    item.append(
      makeSpan("leader-rank", index + 1),
      avatar,
      makeSpan("leader-name", shownName),
      makeSpan("leader-points", row.points + " pts")
    );
    list.appendChild(item);
  });
}
