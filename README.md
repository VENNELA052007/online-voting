# Online Voting System

A responsive student election app built with React, Vite, React Router and
Bootstrap. It has a voter module and an admin module. All data is stored in the
browser's Local Storage, so it needs no backend.

## Features

**Admin module** (login: `admin@voting.com` / `admin123`)

- Elections: create, view, edit, delete, set a voting schedule, close or reopen voting
- Candidates: add, view, edit and delete candidates for each election
- Voters: view registered voters, search them, remove a voter
- Results: monitor votes live (turnout and vote share) and announce the results to voters

**Voter module**

- Sign up (18+ only) and log in
- Dashboard listing every election with its status and candidates
- Cast one vote per election, with a vote confirmation
- Duplicate voting is blocked
- See the final results once the admin announces them

## React concepts used

- Components and props: `Header`, `Layout`, `ElectionCard`, `ResultBars`, `StatusBadge` and the admin panels
- `useState` for form fields, tabs, messages and lists
- `useEffect` for saving to Local Storage, syncing browser tabs, timers and page titles
- Custom hooks: `useLocalStorage` and `useNow`
- React Router: `HashRouter`, `Routes`, `NavLink`, `Navigate` and a role-based `ProtectedRoute`
- Controlled forms, conditional rendering, and lists with keys
- Lifting state up: `AdminDashboard` owns the data and passes it down as props

## Project structure

```
src/
  main.jsx            app entry (router + starting data)
  App.jsx             routes and the logged-in user
  pages/              Home, Login, Signup, VoterDashboard, AdminDashboard
  components/         Header, Layout, ProtectedRoute, ElectionCard, ResultBars, StatusBadge
  components/admin/   ElectionsPanel, CandidatesPanel, VotersPanel, ResultsPanel
  hooks/              useLocalStorage, useNow
  utils/              storage.js (Local Storage), elections.js (status and results)
```

Local Storage keys: `users`, `currentUser`, `elections`, `candidates`, `votes`.

## Run locally

1. Install Node.js (version 20.19 or newer).
2. Run `npm install`.
3. Run `npm run dev`, then open the local URL printed by Vite.

Create a production build with `npm run build`.

## Deploy to GitHub Pages

The GitHub Actions workflow builds the app and publishes it to the `gh-pages`
branch whenever changes are pushed to `main`. In **Settings → Pages**, choose
**Deploy from a branch**, select `gh-pages` and `/(root)`, then save. The site
URL is https://vennela052007.github.io/online-voting/.

## Demo limitations

This project is for classroom demonstration, not real elections. Local Storage
is specific to one browser and device, and passwords are not securely stored. A
real election needs a trusted backend, secure authentication, authorization and
tamper-resistant vote storage.
