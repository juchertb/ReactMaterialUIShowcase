import { http } from "msw";
import { setupWorker } from "msw/browser";
import { getMswHandler } from "fakerest";
import generateData from "./data";

const handler = getMswHandler({
  baseUrl: "http://localhost:3001",
  data: generateData({ serializeDate: true }),
});
export const worker = setupWorker(
  // Make sure you use a RegExp to target all calls to the API
  http.all(/http:\/\/localhost:3001/, handler)
);
