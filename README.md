# Online Voting System

This project is a simple website for a student election. I made it using HTML, CSS and JavaScript.

## Modules

- Admin: logs in, adds or removes candidates, controls the election and checks voters and results.
- Voter: signs up, logs in, looks at candidates and votes once when voting is open.

## Run the project

Open `index.html` in a web browser. The pages use CSS Grid and Flexbox for their layout. Signup, login and voting data are saved in the browser's Local Storage.

Admin demo login:

- Email: `admin@voting.com`
- Password: `admin123`

## Demo steps

1. Login with the admin account and add a candidate.
2. Start voting from the admin page.
3. Create a voter account. Use a date of birth that makes the voter 18 or older.
4. Login as the voter and choose one candidate.
5. Login as admin again and check the results.

## What I used

The signup and login information, candidates, election status and votes are saved in Local Storage. JavaScript checks the voter's age and stops the same account from voting twice. The project is for a browser demo, so it does not have a server or database.

## Git deployment

The project source is hosted at [github.com/VENNELA052007/online-voting](https://github.com/VENNELA052007/online-voting). To publish later changes, commit and push them to the `main` branch:

```text
git add .
git commit -m "Describe the change"
git push origin main
```

This project is a browser demonstration and does not use a server or database.
