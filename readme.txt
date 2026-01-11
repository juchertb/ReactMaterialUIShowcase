Todos::
*******

1. [DONE] Example with formatting:: @mentions, #refs, [links](), **formatting**, and <del>tags</del> supported. Readme.md file how tos: [https://www.geeksforgeeks.org/what-is-readme-md-file/].
2. [DONE] Add phone validation. It should already be there with input type phone.
3. [DONE] Research how to save individual options on the settings page. Like switch settings. How is this done in React applications?
    - See bottom of the page for saving a series of switches
    - Implement "Settings\Notification" save. Need FakeApi.
4. [DONE] Work on other portions of the setup page.
5. [DONE] Make Link arrows in Settings.Sessions section similar to the `Otis template` at [https://mui.com/store/previews/otis-admin-pro-material-dashboard-react/].
6. [DONE] Anchor is not working in setting page from menu so sections.
7. [DONE] Format Drawer menu like the one in the Otis template.
8. [DONE] Add show/hide function for navigation menu like on the Otis template. 
9. [DONE] Add MUI confirmation dialog before deleting orders.
10. [DONE. Only server side Lazy loading caches the data in the Grid and useState is not required] Currently orders are cached with useState. Are they also cached in teh datagrid? I don't see example on the MUI site where the also cache in useState.
11. [DONE] I am getting a 404 resource not found error when trying to save a new order in the orders table when the id is a uuid with dashes. Why do I have to remove teh dashes from the uuid? 
12. [DONE] Images are missing from the analytics and sales page after playing wiht the MSW and FakeRest.
13. [DONE] valueGetter on date field works "valueGetter: (value) => value && new Date(value)" In the products page when I scroll to the right I get an error on dateCreated, when the column is defined as "Date". Same for the other date columns in products.js
14. Implement product details and browser pages from pages/eCommerce/Products
15. [DONE] when hitting https://localhost:3000 it should bring you to the analytics page or the logon page. Right now a blank page is displayed.
16. [DONE] Color scheme icon in top right corner moves to the right when I click it. It also disappears when I scroll down on the profile page
17. [DONE] FormGrid styled Grid2 is not working under components/StyleComponents. The components disapear in Accounts section for example under the settings page.
18. [DONE] Navigation menu: submenu closes automatically when I click an item.
19. [DONE] Work on light/dark function.
20. [DONE] Work on messages (click button at top.). Implement the same way as in the Otis template.
21. Go through all pages and make them fully responsive
    - [DONE] Analytics 
    - [DONE] Sales
    - [OK] Sign-in
    - [NO PAGE] Sign update
    - [NO PAGE] Reset Password
    - [OK] Users
    - [OK] Hosting Services
    - [OK] Storage
    - [OK] Hosting
    - [OK] Functions
    - [OK] Machine Learning
    - [OK] Products
    - [DONE] Product details
    - [DONE] Orders
    - [DONE] Order Details
    - [DONE] Scheduler. Menu is not breaking into multiple lines
    - [DONE] Scheduler details
    - [OK] Billing
    - [DONE] Settings
    - [DONE] My Profile

22. [DONE] When the application is published then the products and orders data is not served.
23. [DONE] Change the site icon to the alsacom icon
24. [DONE] I get an overlay with an error of type "Cannot read properties of undefined (reading 'url')" on the logon screen when first starting the server (npm run start).
25. [DONE] I am getting this error during deploy when done in VS Code. I had to do it from the command prompt instead.
    Error: Failed to get remote.origin.url (task must either be run in a git repository with a configured origin remote or must be configured with the "repo" option).
    Run this in Command Prompt to clear the gh cache and then try "npm run deploy" again: rmdir /s /q node_modules\.cache\gh-pages 
26. [DONE as much as I could] Cleanup code. I am getting a lot of warnings for unused imports or variables
27. [DONE] Implement Billings page from Account\Billing in sample project https://mui.com/store/previews/otis-admin-pro-material-dashboard-react/
    - [DONE] Finish footer: needs adjustments on narrow screens. Left part and right links should be layed out vertically
    - [DONE] Adjust components on page for narrow screens
28. [DONE] Add scheduler. Inspiration: https://devexpress.github.io/devextreme-reactive/react/scheduler/demos/featured/overview/
    - I used this as the base code for my own scheduler. Initial create with Github Copilot Chat from public repository: https://github.com/rouftom/react-mui-scheduler/blob/main/src/Scheduler.jsx
    - [DONE] Add event administration
    - [DONE] I have the schedulerEvents DB ready. Need to fetch it from the fake api now] Move event data to Fakerest MSW handler
    - [DONE] Why was mockServiceWorker.js updated? I haven't committed the file yet. Maybe try a separate commit and publish to gh pages to see if it still works with the new version 
    - [DONE] Make Day, Week and Month views nicer.
    - [DONE] Scheduler looses chip backround color in Dark mode.
    - [DONE] In the schedule details I am getting an error in the console when saving repeatEvery. "A component is changing from controlled to uncrontrollerd state".





Saving switches:
+++++++++++++++=
In 2025, the industry standard for MUI switches (and toggles in general) is to have them take immediate effect. Users expect a digital toggle to behave like a real-world light switch: you flip it, and the action happens instantly without a "Save" button. 
However, "saving immediately" does not mean you should fire a network request for every single click. For a page with 30 switches, you should use an Immediate Auto-save pattern with specific safeguards:
1. The Immediate Auto-save Pattern
Instead of a manual "Save" button, use a debounced update. 
How it works: When a user toggles a switch, update the local React state instantly so the UI feels snappy. Behind the scenes, wait for a short pause in user activity (e.g., 500ms to 1s) before sending the "delta" of changes to the API.
Why: If a user toggles 5 switches in 3 seconds, they only trigger one API call instead of five, significantly reducing server load while maintaining the "immediate" feel. 
2. When Immediate Saving is NOT Better
While immediate saving is standard, you should stick to a Manual Save Button in these three specific scenarios: 
High-Risk Settings: If toggling a switch has a major consequence (e.g., "Delete all data" or "Disable Security"), a deliberate "Save" button acts as a safety confirmation.
Interdependent Settings: If Switch A and Switch B must be saved together to work correctly, don't save them individually.
Long-Running Processes: If the change triggers a heavy backend task that takes 5+ seconds, immediate saving will frustrate users with loading spinners or lag. It’s better to batch these and save them once. 
3. Essential UX Requirements for Auto-save
If you choose to save immediately, you must include these 2025 UX standards:
Status Indicators: Use a small "Saving..." or "All changes saved" message near the top or bottom of the page.
Error Handling: If the auto-save fails (e.g., network error), you must notify the user immediately and ideally offer a "Retry" button so they don't assume their settings were applied.
Optimistic UI: Show the switch in its new "On" state immediately, but perhaps slightly dimmed or with a small spinner if the backend confirmation is critical. 
Summary Recommendation
For 30 application settings, Auto-save with a 1-second debounce is the best choice. It provides the modern experience users expect while keeping your API usage efficient and your code clean. 

USE MUI DEBOUNCE UTILITY
+++++++++++++++++++++++=
For a page with 30 MUI switches, saving individually via API after every single click is generally discouraged due to network overhead and poor user experience if a request fails or lags. 
The best approach for 2025 depends on the "criticality" of the settings:
1. The "Immediate Action" Pattern (Autosave with Feedback)
If your application feels like a modern "live" dashboard (e.g., Slack or Notion), users expect switches to take effect immediately. 
Strategy: Use a Debounced Batch Update. Instead of sending 30 individual requests, wait 500ms–1s after the user stops clicking, then send one payload containing all changed settings.
Essential UX: You must show a visual "Saving..." or "All changes saved" status indicator. This preserves the user's sense of control without requiring a manual Save button.
Implementation:
tsx
import { debounce } from '@mui/material/utils'; //

const saveSettings = debounce((newSettings) => {
  api.put('/settings', newSettings);
}, 1000);