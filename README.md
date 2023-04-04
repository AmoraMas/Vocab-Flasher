# Flashcards

> Full Stack application that mimics the flash card learning process built with React and PostgreSQL.

## Table of Contents

- [General Information](#general-information)
  - [Technologies Used](#technologies-used)
  - [Features](#features)
  - [Screenshots](#screenshots)
  - [Setup](#setup)
  - [Usage](#usage)
  - [Current Status](#current-status)
- [Room For Improvement](#room-for-improvement)
- [Acknowledgements](#acknowledgements)
- [Contact](#contact)
- [License](#license)

## General Information

> Practice building a full-stack app with React as the front-end. Simple tool to use, but I learned a lot with it. I initially tried running all the programming at the app component, but later found that drilling down through the components worked much better, letting the React components update based on state changes simplified my attempts to run asynchronous code synchronously. Also learned to use a passed down function to enable changes at each component before passing it back up.

## Technologies Used

> React, CSS3, HTML5, JavaScript, express, Docker, node.js, npm

## Features

- Quizzes the user on information they want to learn through repetition.
- Uses React and a local database to store all questions/answers.

## Screenshot(s)

> ![ScreenShot](/images/screenshot.png)

## Setup

- Requirements
  - Docker
  - npm
- Clone the repository.
- From root directory, type the following in terminal.
  - npm install
  - docker compose up
  - npm run dev
- Wait for everything to load and it should auto open the web page in your default browser once the React server stands up.

[Project Demonstration](N/A)

## Usage

- Select a category from the drop-down menu.
- Select if you want to view all questions within that category or if you only want the questions you have not mastered.
- New section pops up.
  - Select if you want to see the Question or the answer first.
  - Answer in your head or out loud.
  - Click on the blue box to show the answer.
- Top progress to the next card
  - If you got it right, click "I got it".
  - If you got it wrong, click "I missed it"
  - If you want the counter reset, click "Reset it".

## Current Status

> Side-lined until I get time to complete the Todos.

## Room For Improvement

- Ideas:
  - Needs comments for each function/component.
  - Needs ways to add new flashcards at the front-end level.
  -
- Todo:
  - Add Create Flashcard functionality to the front-end.
  - Add Edit Flashcard functionality to the front-end.
  - Add ability to import flashcards from other APIs.

## Acknowledgements

- Inspired By:
  - Class assignment to develop a full-stack React application and an idea list I found on the internet..
- Based On:
  - Real World flashcards and how to digitize them and improve on the design.
- Contributors:
  - David Ortiz made some suggestions to help out with the CORS request.

## Contact

> [amoramas1984@gmail.com](mailto:amoramas1984@gmail.com)

## License

> N/A
