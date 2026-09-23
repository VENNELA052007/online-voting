const ADMIN_EMAIL = "admin@voting.com";
const ADMIN_PASSWORD = "admin123";

function getData(key, defaultValue) {
  const savedData = localStorage.getItem(key);
  return savedData ? JSON.parse(savedData) : defaultValue;
}

function saveData(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function startApp() {
  if (!localStorage.getItem("candidates")) {
    saveData("candidates", [
      { id: 1, name: "Ananya Reddy", party: "Student Progress Group" },
      { id: 2, name: "Rahul Kumar", party: "Campus Development Group" }
    ]);
  }
  if (!localStorage.getItem("users")) saveData("users", []);
  if (!localStorage.getItem("votes")) saveData("votes", []);
  if (!localStorage.getItem("electionOpen")) localStorage.setItem("electionOpen", "false");

  const page = location.pathname.split("/").pop();
  if (page === "signup.html") setupSignup();
  if (page === "login.html") setupLogin();
  if (page === "admin.html") setupAdmin();
  if (page === "user.html") setupUser();
}

function showMessage(elementId, text) {
  const element = document.getElementById(elementId);
  if (element) element.textContent = text;
}

function setupSignup() {
  document.getElementById("signupForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const dob = document.getElementById("dob").value;
    const email = document.getElementById("email").value.trim().toLowerCase();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const birthdayNotReached = today.getMonth() < birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate());
    if (birthdayNotReached) age--;

    if (!dob || age < 18) {
      showMessage("message", "You must be 18 or above to register for voting.");
      return;
    }
    if (password !== confirmPassword) {
      showMessage("message", "Passwords do not match.");
      return;
    }

    const users = getData("users", []);
    if (users.some(user => user.email === email)) {
      showMessage("message", "An account with this email already exists.");
      return;
    }
    users.push({ name, dob, email, password });
    saveData("users", users);
    alert("Signup successful. You can now login.");
    location.href = "login.html";
  });
}

function setupLogin() {
  document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault();
    const email = document.getElementById("email").value.trim().toLowerCase();
    const password = document.getElementById("password").value;

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      saveData("currentUser", { email, role: "admin" });
      location.href = "admin.html";
      return;
    }

    const user = getData("users", []).find(item => item.email === email && item.password === password);
    if (!user) {
      showMessage("message", "Invalid email or password.");
      return;
    }
    saveData("currentUser", { email: user.email, name: user.name, role: "user" });
    location.href = "user.html";
  });
}

function loggedInAs(role) {
  const currentUser = getData("currentUser", null);
  if (!currentUser || currentUser.role !== role) {
    location.href = "login.html";
    return null;
  }
  return currentUser;
}

function logout() {
  localStorage.removeItem("currentUser");
  location.href = "index.html";
}

function setupAdmin() {
  if (!loggedInAs("admin")) return;
  document.getElementById("logoutButton").addEventListener("click", logout);
  document.getElementById("candidateForm").addEventListener("submit", addCandidate);
  document.getElementById("toggleElection").addEventListener("click", toggleElection);
  document.getElementById("candidateList").addEventListener("click", function (event) {
    if (event.target.dataset.id) deleteCandidate(Number(event.target.dataset.id));
  });
  renderAdmin();
}

function addCandidate(event) {
  event.preventDefault();
  const candidates = getData("candidates", []);
  candidates.push({
    id: Date.now(),
    name: document.getElementById("candidateName").value.trim(),
    party: document.getElementById("candidateParty").value.trim()
  });
  saveData("candidates", candidates);
  event.target.reset();
  showMessage("candidateMessage", "Candidate added successfully.");
  renderAdmin();
}

function deleteCandidate(id) {
  const candidates = getData("candidates", []).filter(candidate => candidate.id !== id);
  saveData("candidates", candidates);
  renderAdmin();
}

function toggleElection() {
  const isOpen = localStorage.getItem("electionOpen") === "true";
  localStorage.setItem("electionOpen", String(!isOpen));
  renderAdmin();
}

function renderAdmin() {
  const candidates = getData("candidates", []);
  const votes = getData("votes", []);
  const users = getData("users", []);
  const isOpen = localStorage.getItem("electionOpen") === "true";
  const status = document.getElementById("electionStatus");
  status.textContent = isOpen ? "OPEN" : "CLOSED";
  status.className = isOpen ? "status" : "status closed";
  document.getElementById("toggleElection").textContent = isOpen ? "Stop Election" : "Start Election";

  document.getElementById("candidateList").innerHTML = candidates.length ? candidates.map(candidate =>
    `<div class="candidate-card"><div><h3>${candidate.name}</h3><p>${candidate.party}</p></div><button class="button danger" data-id="${candidate.id}">Delete</button></div>`
  ).join("") : "<p>No candidates added.</p>";

  document.getElementById("voterList").innerHTML = users.length ? `<table><tr><th>Name</th><th>Email</th></tr>${users.map(user => `<tr><td>${user.name}</td><td>${user.email}</td></tr>`).join("")}</table>` : "<p>No registered voters yet.</p>";

  document.getElementById("resultList").innerHTML = candidates.length ? candidates.map(candidate => {
    const count = votes.filter(vote => vote.candidateId === candidate.id).length;
    return `<p><strong>${candidate.name}</strong>: ${count} vote(s)</p>`;
  }).join("") : "<p>No results to show.</p>";
}

function setupUser() {
  const currentUser = loggedInAs("user");
  if (!currentUser) return;
  document.getElementById("logoutButton").addEventListener("click", logout);
  document.getElementById("welcomeText").textContent = `Welcome, ${currentUser.name}.`;
  document.getElementById("voteForm").addEventListener("submit", castVote);
  renderUser(currentUser);
}

function renderUser(currentUser) {
  const isOpen = localStorage.getItem("electionOpen") === "true";
  const hasVoted = getData("votes", []).some(vote => vote.email === currentUser.email);
  const candidates = getData("candidates", []);
  document.getElementById("electionStatus").textContent = isOpen ? "Election is open" : "Election is closed";
  document.getElementById("electionStatus").className = isOpen ? "status" : "status closed";
  const list = document.getElementById("userCandidateList");

  if (hasVoted) {
    showMessage("voteMessage", "Your vote has been recorded. You can vote only once.");
  } else if (!isOpen) {
    showMessage("voteMessage", "Voting is currently closed.");
  }

  list.innerHTML = candidates.length ? candidates.map(candidate =>
    `<label class="candidate-card"><span><input type="radio" name="candidate" value="${candidate.id}" ${hasVoted || !isOpen ? "disabled" : ""}> <strong>${candidate.name}</strong> - ${candidate.party}</span></label>`
  ).join("") : "<p>No candidates are available.</p>";
  document.getElementById("voteButton").disabled = hasVoted || !isOpen || candidates.length === 0;
}

function castVote(event) {
  event.preventDefault();
  const currentUser = getData("currentUser", null);
  const selected = document.querySelector("input[name='candidate']:checked");
  const votes = getData("votes", []);
  if (localStorage.getItem("electionOpen") !== "true") {
    showMessage("voteMessage", "Voting is currently closed.");
    return;
  }
  if (!selected) {
    showMessage("voteMessage", "Please select a candidate.");
    return;
  }
  if (votes.some(vote => vote.email === currentUser.email)) {
    showMessage("voteMessage", "You have already voted.");
    return;
  }
  votes.push({ email: currentUser.email, candidateId: Number(selected.value) });
  saveData("votes", votes);
  showMessage("voteMessage", "Vote submitted successfully. Thank you for voting!");
  renderUser(currentUser);
}

document.addEventListener("DOMContentLoaded", startApp);
