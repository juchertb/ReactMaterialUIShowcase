# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Todos

<input type="checkbox" checked> <del>Example with formatting:: @mentions, #refs, [links](), **formatting**, and <del>tags</del> supported. Readme.md file how tos: [https://www.geeksforgeeks.org/what-is-readme-md-file/].</del> \
<input type="checkbox" checked> <del>Add phone validation. It should already be there with input type phone.</del> \
 <input type="checkbox"> Research how to save individual options on the settings page. Like switch settings. How is this done in React applications? \
 <input type="checkbox" checked> <del>Work on other portions of the setup page.</del> \
<input type="checkbox" checked> <del>Make Link arrows in Settings.Sessions section similar to the `Otis template` at [https://mui.com/store/previews/otis-admin-pro-material-dashboard-react/].</del> \
<input type="checkbox" checked> <del>Anchor is not working in setting page from menu so sections.</del> \
<input type="checkbox" checked> <del>Format Drawer menu like the one in the Otis template.</del> \
<input type="checkbox"> Add show/hide function for navigation menu like on the Otis template. \
<input type="checkbox" checked> <del>Add MUI confirmation dialog before deleting orders.</del> \
<input type="checkbox"> Currently orders are cached with useState. Are they also cached in teh datagrid? I don't see example on the MUI site where the also cache in useState. \
<input type="checkbox"> I am getting a 404 resource not found error when trying to save a new order in the orders table when the id is a uuid with dashes. Why do I have to remove teh dashes from the uuid? \
<input type="checkbox" checked> <del>Images are missing from the analytics and sales page after playing wiht the MSW and FakeRest.</del> \
<input type="checkbox" checked> <del>[valueGetter on date field works "valueGetter: (value) => value && new Date(value)") In the products page when I scroll to the right I get an error on dateCreated, when the column is defined as "Date". Same for the other date columns in products.js</del> \
<input type="checkbox"> Implement product details and browser pages from pages/eCommerce/Products \
<input type="checkbox" checked> <del>when hitting https://localhost:3000 it should bring you to the analytics page or the logon page. Right now a blank page is displayed.</del> \
<input type="checkbox" checked> <del>Color scheme icon in top right corner moves to the right when I click it. It also disappears when I scroll down on the profile page</del> \
<input type="checkbox"> FormGrid styled Grid2 is not working under components/StyleComponents. The components disapear in Accounts section for example under the settings page. \
<input type="checkbox" checked> <del>Navigation menu: submenu closes automatically when I click an item.</del> \
<input type="checkbox" checked> <del>Work on light/dark function.</del> \
<input type="checkbox" checked> <del>Work on messages (click button at top.). Implement the same way as in the Otis template.</del> \
<input type="checkbox">Go through all pages and make them fully responsive

## API Mocking

Uses FakeRest and Mock Service Worker (MSW). MSW is an API mocking library for browser and Node.js (https://mswjs.io/docs). FakeRest is a browser library that intercepts AJAX calls to mock a REST server based on JSON data. https://github.com/marmelab/FakeRest.

Structure FakeRest data https://codesandbox.io/p/sandbox/github/okami101/vuetify-admin/tree/master/examples/demo-retail?file=%2Fsrc%2Fviews%2FDashboard.vue

Nice FakeRest demo at https://marmelab.com/react-admin-demo

Instead of the browser fetch for gets, posts and deletes, this demo uses Axios that is a promise based HTTP client for the browser and node.js. See https://www.npmjs.com/package/axios for more information.

Using @faker-js to produce random mock data https://fakerjs.dev/guide/usage.html

## User Interface

The application uses the open-source Material UI component library (https://mui.com/material-ui) that implements Google's Material Design (https://m2.material.io/).

## Charts

The charts on the Analytics and Sales pages have been developed using the following libraries:

- <b>Sales page</b>: Material UI Charts (https://mui.com/x/react-charts/).
- <b>Analytics page</b>: Recharts (https://recharts.org/en-US/).

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
