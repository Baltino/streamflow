# Streamflow

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Challenge requirements 

Build UI app that uses Streamflow’s https://github.com/streamflow-finance/js-sdk/ and interacts with the Streamflow protocol and enables users to create token streams.

Product requirements:

User can use Phantom wallet (browser extension) to interact with the app
User can specify some parameters of a stream, others can be hardcoded
Choose 3-5 parameters and wire them with a form, hardcode anything that saves time (start, end, release amount, etc..) we are not here to build fancy date pickers, don’t waste time on that
User can choose one of the tokens to stream (usually only tokens that he has some amounts of in the wallet - don’t list tokens with 0 available amount)
After the inputs are set, user creates a stream and transaction signature is displayed
Bonus points:

Display all user’s streams
Technical requirements:

use react + typescript
work with devnet program
Hints:

use https://github.com/streamflow-finance/js-sdk
do not waste time on form validation, do not cover all edge cases, make sure a happy path works, this is the mvp
make sure you understand the concepts - wallet, solana account, token account
no need to over-engineer the code, just make it readable

### Decisions
Extracted the funcionality of the wallet into another class.