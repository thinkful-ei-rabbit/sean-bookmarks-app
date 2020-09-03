# URL
https://thinkful-ei-rabbit.github.io/sean-bookmarks-app/

# My simple bookmark app
A simple bookmarking app that stores bookmarks in an API.

#### User Story Requirements
- Can add bookmarks to my bookmark list. Bookmarks contain:
  - title
  - url link
  - description
  - rating (1-5)
- Can see a list of my bookmarks when I first open the app
- All bookmarks in the list default to a "condensed" view showing only title and rating
- Can click on a bookmark to display the "detailed" view
- Detailed view expands to additionally display description and a "Visit Site" link
- Can remove bookmarks from my bookmark list
- Receive appropriate feedback when I cannot submit a bookmark
- Can select from a dropdown (a `<select>` element) a "minimum rating" to filter the list by all bookmarks rated at or above the chosen selection
- Can edit the rating and description of a bookmark in my list

##### Technical Requirements
- Uses fetch for AJAX calls and jQuery for DOM manipulation
- Use namespacing to adhere to good architecture practices
- Minimal global variables
- Create modules in separate files to organize your code
- Logically group your functions (e.g. API methods, store methods...)
- Keep your Data out of the DOM
- No direct DOM manipulation in your event handlers!
- Follow the React-ful design pattern - change your state, re-render your component
- Use semantic HTML
- Use a responsive and mobile-first design
- Visually and functionally solid in viewports for mobile and desktop
- Follow a11y best practices
