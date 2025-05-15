let pickedWord = "";
let lives = 6;

// Get word from the backend
async function pickWord() {
  try {
    const res = await fetch("http://localhost:8080/api/word");
    pickedWord = (await res.text()).toLowerCase();
  } catch (e) {
    alert("Failed to fetch word");
  }
}

// Guess word function
function guess() {
  if (!pickedWord) {
    Swal.fire({ icon: 'info', title: 'Please wait', text: 'Word not loaded yet. Please wait a minute for the backend to start.', confirmButtonColor: '#3085d6' });
  }

  const input = document.getElementById("value");
  const text = input.value.toLowerCase().trim();
  if (text.length !== 5) {
    alert("Please enter exactly 5 letters.");
    return;
  }
  input.value = "";
  const guesses = [...text];
  const word = [...pickedWord];
  const colors = Array(5).fill("#3a3a3c");
  const guessed = Array(5).fill("");

  for (let i = 0; i < 5; i++) {
    if (guesses[i] === word[i]) {
      colors[i] = "#6aaa64";
      guessed[i] = word[i];
    }
  }

  for (let i = 0; i < 5; i++) {
    if (colors[i] === "#6aaa64")
      continue;
    for (let j = 0; j < 5; j++) {
      if (i !== j && word[j] === guesses[i] && guessed[j] === "") {
        colors[i] = "#c9b458";
        guessed[j] = guesses[i];
        break;
      }
    }
  }

  const row = document.createElement("div");
  colors.forEach((color, i) => {
    const box = document.createElement("div");
    box.textContent = guesses[i].toUpperCase();
    box.style.backgroundColor = color;
    row.appendChild(box);
  });

  document.getElementById("guesses").appendChild(row);
  if (text !== pickedWord) {
    lives--;
    if (lives <= 0) {
      Swal.fire({ icon: 'info', title: 'Out of lives!', text: `The word was "${pickedWord.toUpperCase()}`, confirmButtonColor: '#3085d6' });
      location.reload();
    }
  }
  else {
    document.getElementById("value").disabled = true;
    document.querySelector("button").disabled = true;
    document.getElementById("namePopup").style.display = "block";
  }
}

// Update the player scores
async function submitName() {
  const name = document.getElementById("playerName").value.trim();
  if (!name) {
    Swal.fire({ icon: 'info', title: 'Name cannot be empty.', confirmButtonColor: '#3085d6' });
    return;
  }
  try {
    await fetch("http://localhost:8080/api/player", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name })
    });
    await fetch(`http://localhost:8080/api/player/${encodeURIComponent(name)}/increment`, {
      method: "PUT"
    });
    Swal.fire({ icon: 'info', title: 'Score saved! Reloading...', confirmButtonColor: '#3085d6' });
    location.reload();
  } catch (e) {
    alert("Failed to save score: " + e.message);
  }
}

// Fetch leaderboard at each reload
async function fetchLeaderboard() {
  try {
    const res = await fetch("http://localhost:8080/api/players/top");
    const players = await res.json();
    const list = document.getElementById("leaderboard-list");
    list.innerHTML = "";
    players.forEach(p => {
      const li = document.createElement("li");
      li.textContent = `${p.name}: ${p.score}`;
      list.appendChild(li);
    });
  } catch (e) {
    console.error("Failed to fetch leaderboard", e);
  }
}

window.onload = async () => {
  await pickWord();
  fetchLeaderboard();
};