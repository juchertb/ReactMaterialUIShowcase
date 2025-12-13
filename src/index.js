import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router";
import Authentication from "./pages/Authentication/Authentication";
import Database from "./pages/Database";
import Functions from "./pages/Functions";
import Hosting from "./pages/Hosting";
import MachineLearning from "./pages/MachineLearning";
import Storage from "./pages/Storage";
import Profile from "./pages/Profile/Profile";
import Settings from "./pages/Profile/Settings";
import Billing from "./pages/Profile/Billing";
import Sales from "./pages/Dashboard/Sales";
import Analytics from "./pages/Dashboard/Analytics";
import Products from "./pages/Ecommerce/Products";
import ProductDetails from "./pages/Ecommerce/ProductDetails";
import Orders from "./pages/Ecommerce/Orders";
import Order from "./pages/Ecommerce/Order";
import AppTheme from "./theme/AppTheme";
import { Box, CssBaseline } from "@mui/material";
import ColorModeIconDropdown from "./theme/ColorModelIconDropdown";
import { LayoutProvider } from "./context/LayoutContext";

const basename =
  process.env.NODE_ENV === "production" ? "/ReactMaterialUIShowcase" : "/";

async function enableMocking() {
  // if (process.env.NODE_ENV !== "development") {
  //   return;
  // }

  /*
   *
   * MSW worker
   *
   */
  // const { worker } = await import("./mocks/browser");

  // // `worker.start()` returns a Promise that resolves
  // // once the Service Worker is up and ready to intercept requests.
  // return worker.start();

  /*
   *
   * FakeRest worker. Uses MSW under the hood.
   *
   */
  const { worker } = await import("./mocks/fakeServer");
  return worker.start({
    quiet: false, // Instruct MSW to not log requests in the console
    onUnhandledRequest: "bypass", // Instruct MSW to ignore requests we don't handle
    serviceWorker: {
      // This is useful if your application follows
      // a strict directory structure.
      url: "./mockServiceWorker.js",
    },
  });
}

// Check if REST API mocking services are enabled before rending the app
enableMocking().then(() => {
  const root = ReactDOM.createRoot(document.getElementById("root"));

  root.render(
    <>
      <AppTheme>
        <LayoutProvider initialOpen={true}>
          <CssBaseline enableColorScheme />
          <Box
            sx={{
              position: "absolute",
              top: "1rem",
              right: "1rem",
            }}
          >
            <ColorModeIconDropdown />
          </Box>
          <BrowserRouter basename={basename}>
            <Routes>
              <Route path="/" element={<App />}>
                <Route index element={<Analytics />} />
                <Route path="authentication" element={<Authentication />} />
                <Route path="database" element={<Database />} />
                <Route path="functions" element={<Functions />} />
                <Route path="hosting" element={<Hosting />} />
                <Route path="machine-learning" element={<MachineLearning />} />
                <Route path="storage" element={<Storage />} />
                <Route path="profile" element={<Profile />} />
                <Route path="settings" element={<Settings />} />
                <Route path="billing" element={<Billing />} />
                <Route path="sales" element={<Sales />} />
                <Route path="analytics" element={<Analytics />} />
                <Route path="ecommerce" element={<Products />} />
                <Route path="ecommerce/products" element={<Products />} />
                <Route
                  path="ecommerce/products/:id"
                  element={<ProductDetails />}
                />
                <Route path="ecommerce/orders" element={<Orders />} />
                <Route path="ecommerce/orders/:id" element={<Order />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </LayoutProvider>
      </AppTheme>
    </>
  );

  // If you want to start measuring performance in your app, pass a function
  // to log results (for example: reportWebVitals(console.log))
  // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
  reportWebVitals();
});
