# ReactMaterialUIShowcase

This Single Page React Application (SPA) written in Typescript uses the open-source Material UI component library (https://mui.com/material-ui) that implements Google's Material Design (https://m2.material.io/).

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

See below for screen shots.

**Logon with:** any email address and password.

**Important:** Some pages contain information sections that describes the functionality available on that particular screen.
<br>
<img src="NotesForFunctionality.jpeg" width="500px" style="margin-top:10px;margin-bottom:10px;vertical-align: top;">

## Charts

The charts on the Analytics and Sales pages have been developed using the following libraries:

- <b>Sales page</b>: Material UI Charts (https://mui.com/x/react-charts/).
- <b>Analytics page</b>: Recharts (https://recharts.org/en-US/).

## API Mocking

Uses FakeRest and Mock Service Worker (MSW). MSW is an API mocking library for browser and Node.js (https://mswjs.io/docs). FakeRest is a browser library that intercepts AJAX calls to mock a REST server based on JSON data. https://github.com/marmelab/FakeRest.

Because of this, records in the eCommerce\Products, eCommerce\Orders pages and others, can be created, updated and deleted within the current session.

Structure FakeRest data https://codesandbox.io/p/sandbox/github/okami101/vuetify-admin/tree/master/examples/demo-retail?file=%2Fsrc%2Fviews%2FDashboard.vue

Instead of the browser fetch for gets, posts and deletes, this demo uses Axios that is a promise based HTTP client for the browser and node.js. See https://www.npmjs.com/package/axios for more information.

Using @faker-js to produce random mock data https://fakerjs.dev/guide/usage.html

## Screen shots

<img src="Sign-in.jpeg" width="300px" style="margin-top:10px;margin-bottom:10px; vertical-align: top;margin-right: 50px">
<br>
<img src="Analytics.jpeg" width="500px"style="margin-top:10px;margin-bottom:10px;vertical-align: top;">
<img src="Sales.jpeg" width="500px" style="margin-top:10px;margin-bottom:10px;vertical-align: top;">
<img src="HostingServices.jpeg" width="500px" style="margin-top:10px;margin-bottom:10px;vertical-align: top;">
<img src="Functions.jpeg" width="500px" style="margin-top:10px;margin-bottom:10px;vertical-align: top;">
<br>
<img src="Products.jpeg" width="500px" style="margin-top:10px;margin-bottom:10px;vertical-align: top;">
<img src="Product.jpeg" width="500px" style="margin-top:10px;margin-bottom:10px;vertical-align: top;">
<img src="Orders.jpeg" width="500px" style="margin-top:10px;margin-bottom:10px;vertical-align: top;">
<img src="Order.jpeg" width="500px" style="margin-top:10px;margin-bottom:10px;vertical-align: top;">
<img src="OrderHistory.jpeg" width="500px" style="margin-top:10px;margin-bottom:10px;vertical-align: top;">
<br>
<img src="MyProfile.jpeg" width="500px" style="margin-top:10px;margin-bottom:10px;vertical-align: top;">
<img src="Settings.jpeg" width="500px" style="margin-top:10px;margin-bottom:10px;vertical-align: top;">
<img src="AnalyticsDarkMode.jpeg" width="500px"style="margin-top:10px;margin-bottom:10px;vertical-align: top;">

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
