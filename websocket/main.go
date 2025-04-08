package main

import (
	"errors"
	"io/ioutil"
	"log"
	"math/rand"
	"net/http"
	"strings"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

type Word struct {
	Text string
}

var WordList []Word

func LoadWordList(filename string) error {
	dataByte, err := ioutil.ReadFile(filename)
	if err != nil {
		return err
	}
	for _, line := range strings.Split(string(dataByte), "\n") {
		if line != "" {
			WordList = append(WordList, Word{Text: line})
		}
	}
	return nil
}

func SelectRandomWord() (Word, error) {
	if len(WordList) == 0 {
		return Word{}, errors.New("word list is empty")
	}
	randomIndex := rand.Intn(len(WordList))
	return WordList[randomIndex], nil
}

type WordGame struct {
	word    Word
	guesses int
}

func (game *WordGame) play(conn *websocket.Conn) {
	defer conn.Close()
	game.restart(conn)
	for {
		_, message, err := conn.ReadMessage()
		if err != nil {
			log.Println("read:", err)
			break
		}
		command := strings.ToLower(string(message))
		switch command {
		case "restart":
			handleWebSocket(conn)
		case "quit":
			game.quit(conn)
			return
		default:
			guess := strings.ToLower(string(message))
			feedback := game.getFeedback(guess)
			conn.WriteMessage(websocket.TextMessage, []byte(feedback))
			game.guesses++
			if feedback == strings.Repeat("😁", len(game.word.Text)) {
				conn.WriteMessage(websocket.TextMessage, []byte("You won the game! 🏆 Congratulations! "))
				game.restart(conn)
			} else if game.guesses >= 6 {
				conn.WriteMessage(websocket.TextMessage, []byte("You gave it your best shot! 🎯 Don't give up! The word was " + game.word.Text))
				game.restart(conn)
			}
		}
	}
}

func (game *WordGame) restart(conn *websocket.Conn) {
	game.guesses = 0
	word, err := SelectRandomWord()
	if err != nil {
		log.Println(err)
		conn.WriteMessage(websocket.TextMessage, []byte("Error: Unable to select a new word."))
		return
	}
	game.word = word
}

func (game *WordGame) quit(conn *websocket.Conn) {
	game.guesses = 0
	conn.WriteMessage(websocket.TextMessage, []byte("Goodbye! 👋"))
}

func (game *WordGame) getFeedback(guess string) string {
	actualWord := game.word.Text
	actualWord = strings.TrimSpace(actualWord)
	if len(guess) != len(actualWord) {
		return "🚫 Guess must be 5 letters! Try again! ✏️"
	}
	feedback := ""
	for i := 0; i < len(guess); i++ {
		if guess[i] == actualWord[i] {
			feedback += "😁"
		} else if strings.Contains(actualWord, string(guess[i])) {
			feedback += "👍"
		} else {
			feedback += "😭"
		}
	}
	return feedback
}

type AdverseWordGame struct {
	wordList        []Word
	excludedLetters map[rune]bool
	guesses         int
	prevword        string
}

func (game *AdverseWordGame) play(conn *websocket.Conn) {
	defer conn.Close()
	game.restart(conn)

	for {
		_, message, err := conn.ReadMessage()
		if err != nil {
			log.Println(err)
			return
		}

		feedback := strings.TrimSpace(string(message))

		if feedback == "" || feedback == "Adverswordle" {
			continue
		}
		if feedback == "Restart" {
			handleWebSocket(conn)
			return
		}
		if !isValidFeedback(feedback){
			conn.WriteMessage(websocket.TextMessage, []byte("Invalid feedback. Please use G, Y, R."))
			continue
		}
		game.updateWordList(feedback, game.prevword)
		game.guesses++

		if feedback == strings.Repeat("G", 5) {
			conn.WriteMessage(websocket.TextMessage, []byte("I won! Thanks for playing!"))
			game.restart(conn)
		} else if game.guesses > 6 {
			conn.WriteMessage(websocket.TextMessage, []byte("I lost!💔"))
			game.restart(conn)
		} else {
			word, err := game.selectRandomWord()
			if err != nil {
				log.Println(err)
				conn.WriteMessage(websocket.TextMessage, []byte("Error: Unable to select a new word."))
				game.restart(conn)
				// return
			} else {
			conn.WriteMessage(websocket.TextMessage, []byte("My next guess: " + word.Text))
			game.prevword = word.Text
			}
		}
	}
}


func isValidFeedback(feedback string) bool {
	if len(feedback) != 5 {
		return false
	}
	for _, c := range feedback {
		if c != 'G' && c != 'Y' && c != 'R' {
			return false
		}
	}
	return true
}
func (game *AdverseWordGame) restart(conn *websocket.Conn) {
	game.excludedLetters = make(map[rune]bool)
	game.guesses = 0
	game.wordList = WordList
	if len(game.wordList) == 0 {
		conn.WriteMessage(websocket.TextMessage, []byte("Error: Word list is empty. Unable to start a new game."))
		return
	}
	
	word, err := game.selectRandomWord()
	if err != nil {
		log.Println(err)
		conn.WriteMessage(websocket.TextMessage, []byte("Error: Unable to select a new word."))
		return
	}
	conn.WriteMessage(websocket.TextMessage, []byte("Game started! Think of a 5-letter word and I'll try to guess it. My first guess: " + word.Text))
	game.prevword = word.Text

}

func (game *AdverseWordGame) updateWordList(feedback string, word string) {
	newWordList := make([]Word, 0)

	for _, w := range game.wordList {
		matchesFeedback := true

		for i, c := range feedback {
			if c == 'G' {
				if w.Text[i] != word[i] {
					matchesFeedback = false
					break
				}
			} else if c == 'R' {
				if strings.ContainsRune(w.Text, rune(word[i])) {
					matchesFeedback = false
					break
				}
				game.excludedLetters[rune(word[i])] = true
			} else if c == 'Y' {
				if w.Text[i] != word[i] && !strings.ContainsRune(w.Text, rune(word[i])) {
					matchesFeedback = false
					break
				}
			}
		}

		if matchesFeedback {
			excluded := false
			for _, letter := range w.Text {
				if game.excludedLetters[letter] {
					excluded = true
					break
				}
			}
			if !excluded {
				newWordList = append(newWordList, w)
			}
		}
	}

	game.wordList = newWordList
}

func (game *AdverseWordGame) selectRandomWord() (Word, error) {
	if len(game.wordList) == 0 {
		return Word{}, errors.New("word list is empty")
	}
	randomIndex := rand.Intn(len(game.wordList))
	return game.wordList[randomIndex], nil
}

func (game *AdverseWordGame) quit(conn *websocket.Conn) {
	game.guesses = 0
	conn.WriteMessage(websocket.TextMessage, []byte("Goodbye! "))
}

func handleWebSocket(conn *websocket.Conn) {
	defer conn.Close()

	for {
		_, message, err := conn.ReadMessage()
		if err != nil {
			log.Println("read:", err)
			return
		}
		command := strings.ToLower(string(message))

		switch command {
		case "adverswordle":
			adverseGame := &AdverseWordGame{
				wordList: WordList,
				guesses:  0,
			}
			
			adverseGame.play(conn)
			return
		case "wordle":
			word, err := SelectRandomWord()
			if err != nil {
				log.Println(err)
				conn.WriteMessage(websocket.TextMessage, []byte("Error: Unable to select a new word."))
				return
			}
			game := &WordGame{
				word:    word,
				guesses: 0,
			}
			game.play(conn)
			return
		default:
			conn.WriteMessage(websocket.TextMessage, []byte("Unknown game type. Please send 'adverswordle' or 'wordle' to start a game."))
		}
	}
}


func main() {
	err := LoadWordList("words.txt")
	if err != nil {
		log.Println(err)
		return
	}

	rand.Seed(time.Now().UnixNano())

	router := gin.Default()

	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE"},
		AllowHeaders:     []string{"Origin", "Content-Type"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	router.GET("/ws", func(c *gin.Context) {
		conn, err := upgrader.Upgrade(c.Writer, c.Request, nil)
		if err != nil {
			log.Println("upgrade:", err)
			return
		}

		handleWebSocket(conn)
	})

	router.Run(":8080")
}
