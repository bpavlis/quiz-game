/* 
1. Listen for click on start button
2. start the timer
    a. every one second: update countdown and check to see if questions have been answered
        - end game as a win if all questions answered
    b. end game as a loss if timer runs out
3. choose a question and answers for the user to answer from array of questions
4. display question and answers
5. listen for button press on answers
    a. verify the correct button is pressed
        - assign 10 points
    b. modify display to move on to next question
    c. have all questions been answered?
        - end game
6. once game is over:
    a. update scoreboard with initials
        - have popup asking for initials and score?
    b. display game over    

Other notes:
- no ?s on HTML
- wrong/right function will help
- how do we generate a question + answers on demand
- how do we keep track of which ? is on screen - (id each ? - #1)
- high timer to begin with
- have list of possible answers w/ custom attribute on each saying which is correct
- have array of ?s (array of objects)
*/

var questionArr = [
  { id: 1, question: "Are the Chicago Bears the best football team ever?"},
  { id: 2, question: "Are the Green Bay Packers the worst football team ever?"}
]

