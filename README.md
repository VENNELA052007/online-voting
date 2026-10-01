# Online Voting System

This is a small student project for managing a student election. It uses HTML, CSS and JavaScript.

## Modules

- Admin: logs in, manages candidates, opens or closes the election, views voters and checks results.
- Voter: signs up, logs in, views candidates and submits one vote while the election is open.

## Run the project

Open `index.html` in a web browser. Signup, login and voting data are stored in that browser's Local Storage.

Admin demo login:

- Email: `admin@voting.com`
- Password: `admin123`

## Project demonstration

1. Login as admin and add a candidate if needed.
2. Start the election.
3. Signup as a voter using a date of birth that makes the voter 18 or older.
4. Login as that voter and submit one vote.
5. Login as admin again and show the voter list and results.

## Git deployment

The project source is hosted at [github.com/VENNELA052007/online-voting](https://github.com/VENNELA052007/online-voting). To publish later changes, commit and push them to the `main` branch:

```text
git add .
git commit -m "Describe the change"
git push origin main
```

This project is a browser demonstration and does not use a server or database.
