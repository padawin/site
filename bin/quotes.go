package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"strings"
)

func main() {
	file, err := os.Open("src/quotes")
	if err != nil {
		log.Fatal(err)
	}
	defer file.Close()

	scanner := bufio.NewScanner(file)
	// optionally, resize scanner's capacity for lines over 64K, see next example
	fmt.Println(`<ul id="container" class="cols">`)
	currentQuote := []string{}
	for scanner.Scan() {
		line := scanner.Text()
		if len(line) == 0 {
			continue
		}

		source := ""
		if line[:2] == "Q:" {
			currentQuote = append(currentQuote, line[2:])
		} else if line[:2] == "S:" {
			source = line[2:]
		}

		if source != "" {
			fmt.Println(`<li class="box">`)
			fmt.Println("<blockquote>")
			fmt.Println(strings.Join(currentQuote, "\n"))
			fmt.Println("</blockquote>")
			fmt.Println("<p>")
			fmt.Println(source)
			fmt.Println("</p>")
			fmt.Println("</li>")
			currentQuote = []string{}
		}
	}
	fmt.Println("</ul>")

	if err := scanner.Err(); err != nil {
		log.Fatal(err)
	}
}
