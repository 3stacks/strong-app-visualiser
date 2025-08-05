# Strong App Visualiser

This is an alternative visualiser for [Strong](https://www.strong.app/), the popular workout tracker. I started tracking my workouts on spreadsheets because it was easier, but I wanted to retain my historical data. 

## Getting started

- Clone this repository
- Run `pnpm i`
- Export your data as CSV from the Strong app
- Put the csv file into the `scripts` directory and name it `workouts.csv`
- Run `node scripts/index.js` (this will parse the csv into usable JSON and deposit it in the `app/api/db` directory)
- Run `pnpm dev`, Open [http://localhost:3000](http://localhost:3000)
