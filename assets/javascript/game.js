// Used to record how many times a letter can be pressed
var doubleWord = ['A','B','C',
          'D','E','F',
          'G','H','I',
          'J','K','L',
          'M','N','O',
          'P','Q','R',
          'S','T','U',
          'V','W','X',
          'Y','Z'];
//Holds possible words
var wordBank = ["INTERDIMENSIONAL CABLE", "CRONENBERGS","PORTAL GUN","BIRD PERSON","GEARHEAD","WHIRLY DIRLY",
      "VINDICATORS", "CITADEL OF RICKS", "SQUANCHY", "PICKLE RICK","TINY RICK","JAGUAR","MR MEESEEKS",
      "ABRADOLF LINCLER","PLUMBUS","SLEEPY GARY","MORTYS MIND BLOWERS","SCARY TERRY", "SNUFFLES","SNOWBALL"];
// holds words that have been used so they can't be repeated
var wordsUsed = [];
//Holds chosenWord
var chosenWord = "";
//Holds letters in word
var lettersInWord = [];
//Holds number of blanks in word
var numBlanks = 0;
//Needed a sepearate value to account for how many they have to get right to win
var lettersNeeded = 0;
//Holds Blanks and successful guesses
var blanksAndSuccesses =[];
//Holds Wrong guesses
var wrongLetters = [];
//Counters
var winCount = 0;
var loseCount = 0;
var guessesLeft = 9;
var rightGuessCounter = 0;
//FUNCTIONS
//----------------------------------------
function reset()
{
  lettersInWord = chosenWord.split('');
  //Get the number of blanks
  numBlanks = lettersInWord.length;
  lettersNeeded = lettersInWord.length;

  for(i = 0; i < lettersInWord.length; i++){

    if(lettersInWord[i] === " ")
      lettersNeeded--;
    }
  
  //RESET
  //===========================================================
  letterGuessed = 0;
  rightGuessCounter = 0;
  guessesLeft = 9;
  wrongLetters =[];
  blanksAndSuccesses =[];
  doubleWord = ['A','B','C',
          'D','E','F',
          'G','H','I',
          'J','K','L',
          'M','N','O',
          'P','Q','R',
          'S','T','U',
          'V','W','X',
          'Y','Z'];
  test=false;
  startGame();
}
function startGame()
{
  //Chooses word randombly from the wordBank
  chosenWord = wordBank[Math.floor(Math.random() * wordBank.length)];
      while(wordsUsed.indexOf(chosenWord) > -1){
          chosenWord = wordBank[Math.floor(Math.random() * wordBank.length)];
          //testing why this isnt working
          console.log(wordsUsed.indexOf(chosenWord) + "ahhhhh im stuck");
        }
      
      wordsUsed.push(chosenWord);
  //Splits the choosen word into individual letters
  lettersInWord = chosenWord.split('');
  //Get the number of blanks
  numBlanks = lettersInWord.length;
  lettersNeeded = lettersInWord.length;

  for(i = 0; i < lettersInWord.length; i++){

    if(lettersInWord[i] === " ")
      lettersNeeded--;
    }
  
  //RESET
  //===========================================================
  rightGuessCounter = 0;
  guessesLeft = 9;
  wrongLetters =[];
  blanksAndSuccesses =[];
  doubleWord = ['A','B','C',
          'D','E','F',
          'G','H','I',
          'J','K','L',
          'M','N','O',
          'P','Q','R',
          'S','T','U',
          'V','W','X',
          'Y','Z'];

  //Populate blanks
  for(var i = 0; i< numBlanks; i++)
  {
    if(lettersInWord[i] === " "){
    blanksAndSuccesses.push("-");
    document.getElementById('wordToGuess').innerHTML = blanksAndSuccesses;
    }
    else{
    blanksAndSuccesses.push('_');
    document.getElementById('wordToGuess').innerHTML = blanksAndSuccesses;
    }
  }

  //Changes HTML 
  document.getElementById('wordToGuess').innerHTML = blanksAndSuccesses.join(' ');
  document.getElementById('numGuesses').innerHTML = guessesLeft;
  document.getElementById('winCounter').innerHTML = winCount;
  document.getElementById('lossCounter').innerHTML = loseCount;
  document.getElementById('wrongGuesses').innerHTML = wrongLetters;
  // Testing / Debugging
  console.log(chosenWord);
  console.log(lettersInWord);
  console.log(numBlanks);
  console.log(blanksAndSuccesses);
}

function compareLetters(userKey)
{
        console.log('WORKING!');
        //If user key exist in choosen word then perform this function 
        if(chosenWord.indexOf(userKey) > -1)
        {
          //Loops depending on the amount of blanks 
          for(var i = 0; i <= numBlanks; i++)
          {
            //Fills in right index with user key
            if(lettersInWord[i] === userKey)
            {
              rightGuessCounter++;
              blanksAndSuccesses[i] = userKey;
              document.getElementById('wordToGuess').innerHTML = blanksAndSuccesses.join(' ');
              console.log(rightGuessCounter + "    " +  lettersNeeded);
            } 
          }
        }
        else
        {
          wrongLetters.push(userKey);
          guessesLeft--;
          //Changes HTML
          document.getElementById('numGuesses').innerHTML = guessesLeft;
          document.getElementById('wrongGuesses').innerHTML = wrongLetters;
          //Test / Debug
          console.log('Wrong Letters = ' + wrongLetters);
          console.log('Guesses left are ' + guessesLeft);
        }
      
      
    
}
function winLose()
{
  // When number blanks if filled with right words then you win
  if(rightGuessCounter === lettersNeeded)
  {
    //Counts Wins 
    winCount++;
    //Changes HTML
    document.getElementById('winCounter').innerHTML = winCount;
    alert(chosenWord + ' You Win');
    if(winCount === wordBank.length){
      alert("Hey! Thats all the words.  We will now reset the game.")
      wordsUsed = [];
    }
    reset();
  }
  // When number of Guesses reaches 0 then You lose
  else if(guessesLeft === 0)
  {
    //Counts losses
    loseCount++;
    //Changes HTML
    document.getElementById('lossCounter').innerHTML = loseCount;
    alert( chosenWord + ' You Lose');
    reset();
  }
}

//MAIN PROCCESS
//------------------------------------------- 
//Initiates the Code
startGame();

document.onkeyup = function(event)
{
  test = true;
  var letterGuessed = event.key.toUpperCase();
  for(var i = 0; i < doubleWord.length; i++)
  { 
    if(letterGuessed === doubleWord[i] && test === true)
    {
      var spliceDword = doubleWord.splice(i,1);
      //Test / Debug
      console.log('Double word is = ' + doubleWord[i])
      console.log('Spliced Word is = ' + spliceDword);

      compareLetters(letterGuessed);
      winLose();
    }
  }   
    
}