// Step 1: Inside App.jsx,
// I'm directly returning a simple div with className as "container"
// inside this container div,
// - I have a header tag
// - div with className as "left-sidebar"
// main tag
// - div with className as "right-sidebar"
// footer

// ---------------------- CORE LOGIC STARTS FROM HERE :)  ---------------------- //

// i) for container div, I'm providing height, width, display as grid,
// ii) grid-template-rows: fixed_px, flexible, fixed_px --> height
// iii) grid-template-columns: fixed_px, flexible, fixed_px ---> width

// CORE LOGIC: DESKTOP

// header: I want header to span all columns ---> grid-column: 1/4
// left-sidebar (nav): I want only for one column ----> grid-column: 1/2
// main: As I'm the 2nd row and I want to span till 3rd column (Exclusive) ---> grid-column: 2/3
// right-sidebar (aside): As I'm the 3rd row, ---> grid-column: 3/4
// footer: grid-column: 1/4

// Desktop View (width > 768px):
// +-------------------+-------------------+-------------------+
// |       HEADER      |       HEADER      |       HEADER      |
// +-------------------+-------------------+-------------------+
// |   LEFT SIDEBAR   |     MAIN CONTENT  |   RIGHT SIDEBAR   |
// +-------------------+-------------------+-------------------+
// |       FOOTER      |       FOOTER      |       FOOTER      |
// +-------------------+-------------------+-------------------+

// Mobile View (width ≤ 768px):

// CORE LOGIC:

// i) inside container, make grid rows to repeat 5 with all the space (Ex: 1fr ---> 5 times)
// ii) grid-template-columns to take only 1fr (because only 1 column)
// iii) for all the tags/classNames, make grid-column: 1/2

// +-------------------+
// |       HEADER      |
// +-------------------+
// |   LEFT SIDEBAR   |
// +-------------------+
// |     MAIN CONTENT  |
// +-------------------+
// |   RIGHT SIDEBAR   |
// +-------------------+
// |       FOOTER      |
// +-------------------+
