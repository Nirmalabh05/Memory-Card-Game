//cards array holds all cards
let card = document.getElementsByClassName('card');
let cards = [...card];

//board of all cards
const board = document.getElementById('board');

//declare move variable
let totalMoves = 0;
let movesCounter = document.querySelector('.moves');

//declare variable for star icons
const stars = document.querySelectorAll('.fa-star');
let starsList = document.querySelectorAll('.stars li');

//declare variable for matched-cards
let matchedCard = document.getElementsByClassName('match');

//declare close icon
let closeIcon = document.querySelector('.close');

//declare popup
let popup = document.getElementById('popup');

//array of opened cards
var openedCards = [];

//To shuffle cards
function shuffle(array){
  var currentIndex = array.length, temporaryValue, randomIndex;

  while(currentIndex !== 0){
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
};

//shuffles cards when page is refreshed or loaded
document.body.onload = startGame();

//funciton to start a new game
function startGame(){
  cards = shuffle(cards);

  //remove all existing classes from each card
  for(var i = 0; i < cards.length; i++){
    board.innerHTML = "";
    [].forEach.call(cards, function(item){
        board.appendChild(item);
    });
    cards[i].classList.remove('show', 'open', 'match', 'disabled');
  }
  //to reset moves
  totalMoves = 0;
  movesCounter.innerHTML = totalMoves;

  //to reset rating
  for(var i = 0; i < stars.length; i++){
      stars[i].style.color = '#ffd700';
      stars[i].style.visibility = 'visible';
  }
  //reset timer
  second = 0;
  minute = 0;
  hour = 0;
  var timer = document.querySelector('.timer');
  timer.innerHTML = '0 mins 0 secs';
  clearInterval(interval);
}

//toggles open and show class to display cards
var displayCard = function(){
    this.classList.toggle('open');
    this.classList.toggle('show');
    this.classList.toggle('disabled');
};

//add opened cards to openedCard list and check if cards match or not
function cardOpen(){
    openedCards.push(this);
    var len = openedCards.length;
    if(len === 2){
        moveCounter();
        if(openedCards[0].type === openedCards[1].type){
            cardsMatched();
        }else{
            cardsUnmatched();
        }
    }
};

//function when cards match
function cardsMatched(){
    openedCards[0].classList.add('match', 'disabled');
    openedCards[1].classList.add('match', 'disabled');
    openedCards[0].classList.remove('show', 'open', 'no-event');
    openedCards[1].classList.remove('show', 'open', 'no-event');
    openedCards = [];
}

//function when cards don't match
function cardsUnmatched(){
    openedCards[0].classList.add('unmatched');
    openedCards[1].classList.add('unmatched');
    disable();
    setTimeout(function(){
        openedCards[0].classList.remove('show', 'open', 'no-event', 'unmatched');
        openedCards[1].classList.remove('show', 'open', 'no-event', 'unmatched');
        enable();
        openedCards = [];
    }, 1100);
}

//function to disable cards temporarily
function disable(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.add('disabled');
  });
}

//function to enable cards
function enable(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.remove('disabled');
        for(var i = 0; i < matchedCard.length; i++){
            matchedCard[i].classList.add('disabled');
        }
  });
}

//function to count number of moves
function moveCounter(){
    totalMoves++;
    movesCounter.innerHTML = totalMoves;
    //start timer on first click
    if(totalMoves == 1){
        second = 0;
        minute = 0;
        hour = 0;
        startTimer();
    }
    //to set rates based on moves
    if(totalMoves > 8 && totalMoves < 12){
        for(i = 0; i < 3; i++){
            if(i > 1){
                stars[i].style.visibility = 'collapse';
            }
        }
    }
    else if(totalMoves > 13){
        for(i = 0; i < 3; i++){
            if(i > 0){
                stars[i].style.visibility = 'collapse';
            }
        }
    }
}

//function to set timer
var second = 0, minute = 0, hour = 0;
var timer = document.querySelector('.timer');
var interval;
function startTimer(){
    interval = setInterval(function(){
        timer.innerHTML = minute+'mins '+second+'secs';
        second++;
        if(second == 60){
            minute++;
            second = 0;
        }
        if(minute == 60){
            hour++;
            minute = 0;
        }
    }, 1000);
}

//function feedback when all cards match, show popup, time and rating
function feedback(){
    if(matchedCard.length == 16){
        clearInterval(interval);
        finalTime = timer.innerHTML;

        //show popup
        popup.classList.add('show');

        var starRating = document.querySelector('.stars').innerHTML;

        document.getElementById('finalMove').innerHTML = totalMoves;
        document.getElementById('starRating').innerHTML = starRating;
        document.getElementById('totalTime').innerHTML = finalTime;

        closePopup();
    };
}

//function to close popup
function closePopup(){
    closeIcon.addEventListener('click', function(e){
        popup.classList.remove('show');
        startGame();
    });
}

//function to play game again
function playAgain(){
    popup.classList.remove('show');
    startGame();
}

//loop to add event listeners to each card
for(var i = 0; i < cards.length; i++){
    card = cards[i];
    card.addEventListener('click', displayCard);
    card.addEventListener('click', cardOpen);
    card.addEventListener('click', feedback);
};