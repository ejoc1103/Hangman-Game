//GLOBAL VARIABLES
//---------------------------------------
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
//Holds the all the words
var wordBank = ["INTERDIMENSIONAL CABLE", "CRONENBERGS","PORTAL GUN","BIRD PERSON","GEARHEAD","WHIRLY DIRLY",
      "VINDICATORS", "CITADEL OF RICKS", "SQUANCHY", "PICKLE RICK","TINY RICK","JAGUAR","MR MEESEEKS",
      "ABRADOLF LINCLER","PLUMBUS","SLEEPY GARY","MORTYS MIND BLOWERS","SCARY TERRY", "SNUFFLES","SNOWBALL"];
var wordsUsed = [];
//Holds choosenWord
var choosenWord = "";
//Holds letters in word
var lettersInWord = [];
//Holds number of blanks in word
var numBlanks = 0;
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
  //Chooses word randombly from the wordBank
  // choosenWord = wordBank[Math.floor(Math.random() * wordBank.length)];
  //  while(wordsUsed.indexOf(choosenWord) > -1){
          
  //        choosenWord = wordBank[Math.floor(Math.random() * wordBank.length)];
  //     }
      
  //     wordsUsed.push(choosenWord);
  //Splits the choosen word into individual letters
  lettersInWord = choosenWord.split('');
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
  choosenWord = wordBank[Math.floor(Math.random() * wordBank.length)];
      while(wordsUsed.indexOf(choosenWord) > -1){
          choosenWord = wordBank[Math.floor(Math.random() * wordBank.length)];
          console.log(wordsUsed.indexOf(choosenWord) + "ahhhhh im stuck");
        }
      
      wordsUsed.push(choosenWord);
  //Splits the choosen word into individual letters
  lettersInWord = choosenWord.split('');
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
  console.log(choosenWord);
  console.log(lettersInWord);
  console.log(numBlanks);
  console.log(blanksAndSuccesses);
}

function compareLetters(userKey)
{
        console.log('WORKING!');
        //If user key exist in choosen word then perform this function 
        if(choosenWord.indexOf(userKey) > -1)
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
    alert(choosenWord + ' You Win');
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
    alert( choosenWord + ' You Lose');
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