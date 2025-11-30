Todos::
*******

1. [DONE] Example with formatting:: @mentions, #refs, [links](), **formatting**, and <del>tags</del> supported. Readme.md file how tos: [https://www.geeksforgeeks.org/what-is-readme-md-file/].
2. [DONE] Add phone validation. It should already be there with input type phone.
3. Research how to save individual options on the settings page. Like switch settings. How is this done in React applications?
4. [DONE] Work on other portions of the setup page.
5. [DONE] Make Link arrows in Settings.Sessions section similar to the `Otis template` at [https://mui.com/store/previews/otis-admin-pro-material-dashboard-react/].
6. [DONE] Anchor is not working in setting page from menu so sections.
7. [DONE] Format Drawer menu like the one in the Otis template.
8. [DONE] Add show/hide function for navigation menu like on the Otis template. 
9. [DONE] Add MUI confirmation dialog before deleting orders.
10. Currently orders are cached with useState. Are they also cached in teh datagrid? I don't see example on the MUI site where the also cache in useState.
11. [DONE] I am getting a 404 resource not found error when trying to save a new order in the orders table when the id is a uuid with dashes. Why do I have to remove teh dashes from the uuid? 
12. [DONE] Images are missing from the analytics and sales page after playing wiht the MSW and FakeRest.
13. [DONE] valueGetter on date field works "valueGetter: (value) => value && new Date(value)" In the products page when I scroll to the right I get an error on dateCreated, when the column is defined as "Date". Same for the other date columns in products.js
14. Implement product details and browser pages from pages/eCommerce/Products
15. [DONE] when hitting https://localhost:3000 it should bring you to the analytics page or the logon page. Right now a blank page is displayed.
16. [DONE] Color scheme icon in top right corner moves to the right when I click it. It also disappears when I scroll down on the profile page
17. FormGrid styled Grid2 is not working under components/StyleComponents. The components disapear in Accounts section for example under the settings page.
18. [DONE] Navigation menu: submenu closes automatically when I click an item.
19. [DONE] Work on light/dark function.
20. [DONE] Work on messages (click button at top.). Implement the same way as in the Otis template.
21. Go through all pages and make them fully responsive
22. [DONE] When the application is published then the products and orders data is not served.
23. [DONE] Change the site icon to the alsacom icon
24. [DONE] I get an overlay with an error of type "Cannot read properties of undefined (reading 'url')" on the logon screen when first starting the server (npm run start).
25. [DONE] I am getting this error during deploy when done in VS Code. I had to do it from the command prompt instead.
    Error: Failed to get remote.origin.url (task must either be run in a git repository with a configured origin remote or must be configured with the "repo" option).
    Run this in Command Prompt to clear the gh cache and then try "npm run deploy" again: rmdir /s /q node_modules\.cache\gh-pages 
26. [DONE as much as I could] Cleanup code. I am getting a lot of warnings for unused imports or variables

