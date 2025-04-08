# WordVerse


## Table Of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [File Structure](#file-structure)
- [Usage](#usage)
- [Contributors](#contributors)


## Introduction
This project is webapplication designed to play Wordle game. It features an interactive and responsive design, NPC character (bot) for user interaction, and WebSocket for integration for real-time communication.The project aims to provide an engaging and dynamic word-guessing experience with the backend implemented in Go.


## Features
- **Wordle Game**: Enjoy the classic word puzzle game.
- **NPC Character**: An interactive bot to assist users and play the game.
- **Responsive Design**: Optimized for different screen sizes.
- **Real-time Communication**: Uses WebSocket for real-time interactions.
- **Backend with Go**: Designed backend in Go language.
- **User-selected Secret Word**: Allows users to choose a secret word and let the bot make guesses.


## Technologies Used
- **Frontend**: React, CSS
- **Backend**: Go, WebSocket
- **Additional Libraries**: LaTeX, Gin

## Installation
To run this project locally, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://gitlab.com/gogrowers/wordverse.git
    cd WordVerse
    ```

2. Install dependencies for the frontend:
    ```bash
    cd frontend
    npm install
    node install
    ```
3. Install dependencies for the backend:
    ```bash
    cd backend
    go get -u github.com/gin-gonic/gin
    go get github.com/gorilla/websocket   
     ```

4. Run the frontend:
    ```bash
    cd frontend
    npm start
    ```

5. Run the backend:
    ```bash
    cd backend
    go run main.go
    ```
 
6. Other dependencies:
    ```bash
    npm install canvas-confetti 
    npm install react-icons
    ```

## File Structure
Here’s a brief overview of the directory structure for the WordVerse project:

- **frontend/**
  - **src/**
    - **components/**
    - **botcomponents/**
    - **App.js**
    - **index.js**
    - **index.css**
    - **websocket.js**
  - **public/**
  - **package.json**
  - **package-lock.json**
  - **.gitignore**
-**specs/**
- **src/websocket/**
  - **main.go**
  - **words.txt**
  - **go.mod**
  - **go.sum**

- **README.md**

## Usage
### Running the Application
1. Ensure both frontend and backend servers are running.
2. Open your browser and navigate to `http://localhost:3000`.

### Using the NPC Character
- The NPC character will pop up when you click the 'Play Now' button.
- You can interact with the NPC by typing messages in the input field.
The bot can assist with game rules, and even play the game by making guesses based on your secret word.

## Contributors
- **Sonakshi Raj**
- **Sheetal Lodhi**


