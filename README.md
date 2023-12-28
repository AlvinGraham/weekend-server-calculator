# WEEKEND-SERVER-CALCULATOR
# Imperial Roman Calculator

## Description

<!-- _Duration: 3 days_ -->

This project is a solution to the Prime Digital Academy weekend challenge of the same name. The end product meets all specs for baseline and stretch goals. The code challenge instructions are found [here](./INSTRUCTIONS.md).

Not commonly known was the desire of Roman Emporer Marcus Aurelius, always the philospher, to transition from calculations using Roman Numerals to Arabic Numerals. This simple web app reconstructs his efforts in a structured way. The first sentence in this paragraph is completely made up, but gives me an excuse to do some practice with CSS styling.

To complete this project I used the following checklist to break the problem down into steps.

Base Mode Steps
- [x] Conduct project dependencies install on server side
- [x] Test basic server function (call public assets from browser)
- [x] Create site file structure
- [x] Create basic styling
- [x] Create and test server side GET Route meeting project specs
- [x] Create and test server side POST Route meeting project specs
- [x] Implement client side form handling meeting project specs
- [x] Create client side GET route to handle display of results and results history
- [x] Create client side POST route to handle passing of data to server for calculations
- [x] Implement clear button functionality


Stretch Mode Steps
- [x] Implement server side data validation
- [ ] Implement client side data validation
- [ ] Implement clear history button functionality
- [ ] Update input interface to look like real world calculator
- [ ] Implement recall/re-run buttons on calculation history results
- [ ] Finalize CSS Styling
 
<!-- To achieve the stretch goal of adjusting the monthly total after removing an employee, I implemented a global array of employee objects keying on the ID (guaranteed to be unique) and salary.  That way whenever an employee was added or removed, an updated salary could be quickly computed at will from the existing array of employees.

The styling of the interface is heavily influenced by a J.R.R. Tolkien motif from the bad guys side. -->


## Screen Shot

<!-- ![demo1](./wsc-demo-1.png)
![demo2](./wsc-demo-2.png) -->

### Prerequisites

- [Node.js](https://nodejs.org/en/)
- [express](https://expressjs.com/)


## Installation
 
<!-- 1. Open up your editor of choice and run an `npm install`
2. Initiate the server using `node server/server.js`
3. Optionally set create a `.env` file and set the port using the `PROD` variable (will default to 5001 if not set).
5. navigate to host ip and port in browser (e.g. `127.0.0.1:5001`)
6. Enjoy!!! -->

## Usage
<!-- How does someone use this application? Tell a user story here.

1. To add an employee
  - Fill out fields in Add Employee form
  -  ID is a required alphanumeric field is enforced
  - Salary is a required positive number field and is enforced
  - Click the `Submit New Employee` button and a new record will appear in the table
2. To remove an employee
  - Click the `delete` button in the relevant table row and the employee will be removed
3. Total Monthly cost appears beneath the Employees table
  - This value automatically adjusts whenever an employee is removed or added
  - A warning will display if the monthly cost exceeds the budget of $20,000.00 -->

## Built With

1. Server Side
  - Node.js (including Express and dotenv modules)
  - javascript
2. Client Side
  - HTML
  - CSS
  - javascript
  - Axios


## Acknowledgement
Thanks to [Prime Digital Academy](www.primeacademy.io) who equipped and helped me to make this application a reality. (Thank your people)
