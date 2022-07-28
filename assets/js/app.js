
//To get all the required elements
const startQuiz = document.querySelector('.start-quiz'),
      startQuizContainer = document.querySelector('.container'),
      timerInput = document.querySelector('.timer'),
      usernameInput = document.querySelector('.username'),
      questionsContainer = document.getElementById('question-section'),
      pointsContainer = document.getElementById('points');


// Button to start the quiz
startQuizContainer.addEventListener('submit',function(e){
   
    e.preventDefault();
    validateInput();
    
    
}) 


//Error for validating username
const setError = function(element, message){
    const errorElement= document.querySelector('#error');

    errorElement.textContent = message;
    setTimeout(() => {
        usernameInput.classList.add('error', 'animate__animated','animate__headShake');
    },50)
    usernameInput.classList.remove('error', 'animate__animated','animate__headShake');
    usernameInput.classList.remove('success');


}

//Only checks to find out if a new user was created
const validateInput = function(){
    const username = usernameInput.value;

    if(username === ''){
       setError(username, 'Your name is required')
    }
    else{
       createQuiz();
    }
}

//To instatiate the createiopn of the quiz
function createQuiz(){
    setQuestion();
    startTimer();
}


//To select the timers
 const circularProgress = document.querySelector('.circular-progress'),
       progressValue = document.querySelector('.progress-value')


  // variables to start and end the timer
let progressStartValue = 35,
    progressEndValue = 0



function startTimer(){

    //set's the time
    let progress = setInterval(() => {
        progressStartValue--;
      
        //Set the value to the time
        progressValue.textContent = progressStartValue;
        //To set the circle
        circularProgress.style.background = `conic-gradient(#A862EA ${progressStartValue *3.6}deg,  #ededed 0deg)`
      
        //Checking when to end the timer
        if(progressStartValue <= progressEndValue){
          clearInterval(progress);
          showQuizDetailsContainer();
          saveUser();
          
          
        }
      },1000)
}


// An array of questions
let questions = [
    {

    question: "What does HTML stand for?",
    options: [
      "Hyper Text Preprocessor",
      "Hyper Text Markup Language",
      "Hyper Text Multiple Language",
      "Hyper Tool Multi Language"
    ],
    answer: 1
  },
    {

    question: "What does CSS stand for?",
    options: [
      "Common Style Sheet",
      "Colorful Style Sheet",
      "Computer Style Sheet",
      "Cascading Style Sheet"
    ],
    answer: 3
  },
    {

    question: "What does PHP stand for?",
    options: [
      "Hypertext Preprocessor",
      "Hypertext Programming",
      "Hypertext Preprogramming",
      "Hometext Preprocessor"
    ],
    answer: 0
  },
    {

    question: "What does SQL stand for?",
    options: [
      "Stylish Question Language",
      "Stylesheet Query Language",
      "Statement Question Language",
      "Structured Query Language"
    ],
    answer: 3,
  },
    {
    question: "What does XML stand for?",
    options: [
      "eXtensible Markup Language",
      "eXecutable Multiple Language",
      "eXTra Multi-Program Language",
      "eXamine Multiple Language"
    ],
    answer:0,
  },

];

//To set random question Number
const randomQuestionNumbers = function(){
  const arr = []
  let random;
  let counter = 0;
 const randomNumber = function(){ 
     return  Math.floor(Math.random() * questions.length)
 };
  
  while(counter < questions.length){
      random = randomNumber();
      if(!arr.includes(random)){
          arr.push(random);
          counter++
          }
}
      return arr
}
const questionSet = randomQuestionNumbers();

let numberOfQuestions = 0;
let i = questionSet[numberOfQuestions];


function setQuestion(){
  startQuizContainer.classList.remove('active');
  startQuizContainer.classList.add('inactive');


  questionsContainer.classList.add('active');
  displayQuestion(i);

}


const options = document.querySelector('.option-list'),
      totalQuestionsText = document.querySelector('.total-questions')

totalQuestionsText.innerHTML = `<span>Question<p>${numberOfQuestions + 1}</p>of<p>${questions.length}</p></span>`



//To clear out all the previous options
function clearPreviousOptions(parent) {
  while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
  }
}



let wrong = 0;
let correct = 0;

const scores = document.querySelector('.scores');
options.addEventListener('click', function(e){
 
  if(numberOfQuestions < questions.length){
    clearPreviousOptions(options);
    numberOfQuestions+= 1;
    i = questionSet[numberOfQuestions]
    displayQuestion(i);
    totalQuestionsText.innerHTML = `<span>Question<p>${numberOfQuestions + 1}</p>of<p>${questions.length}</p></span>`
  }

  else if(numberOfQuestions === questions.length){
    progressStartValue = 0;
    showQuizDetailsContainer();
  }


  else{
  showQuizDetailsContainer();
  saveUser();
  }

   
})

//To show the quiz details
function showQuizDetailsContainer(){

  //To remove the questions from the page
  questionsContainer.classList.remove('active');
  questionsContainer.classList.add('inactive');


  //To remove the inactive class from the points page
  pointsContainer.classList.remove('inactive');
  pointsContainer.classList.add('active');


  //To set the points
  setPoints();
  
}

//To select point class
const pointsInfo = document.querySelector('.point-info-list'),
      totalPoints = document.querySelector('.point')

//To set points
function setPoints(){
          totalPoints.textContent = `${correct * 50}pt`;
          pointsInfo.innerHTML = `<li><p>${numberOfQuestions /questions.length * 100}&#x25;</p>completed</li>
                                  <li><p>${questions.length}</p>Total questions</li>
                                  <li class="correct"><p>${correct}</p>correct</li>
                                  <li class="wrong"><p>${wrong}</p> wrong</li>`
}



// To display a question and it's options
function displayQuestion(i){
  scores.innerHTML = `<p class="correct">${correct}<span ></span></p>
  <p class="wrong"><span ></span>${wrong}</p>`


   const questionText = document.querySelector('.question-text');
   questionText.textContent = questions[i].question;
 
 


   for(let j= 0 ; j < questions[i].options.length; j++){
      //Create element
      let option = questions[i].options[j]
      const optionDiv = document.createElement('div');
      optionDiv.classList.add('option');
      optionDiv.innerHTML = `<span>${option}</span>`;
      optionDiv.setAttribute('onclick', 'optionSelected(this)');

      options.appendChild(optionDiv)
      
   }



}

// To keep track of selected answers to know the right and wrong
function optionSelected(answer){
  let userAnswer = answer.textContent.trim();
  let correctAns = questions[i].options[questions[i].answer];

  if(correct + wrong === questions.length - 1){
    progressStartValue = 0;
    showQuizDetailsContainer();
  }

  if(userAnswer == correctAns){
    correct+= 1;

  }
  else{
    wrong += 1

    //To subtract 10 secs from the timer
    progressStartValue -= 10
  }
}

//To save a user's details and scores to the local storage
function saveUser(){
  const username = usernameInput.value.trim()
  if(localStorage.getItem('user') == null){
      localStorage.setItem('user','[]')
  }

  //Set it our input value
  const newUser = {
          username: username,
          correct: correct,
          wrong: wrong,
          id: Date.now(),
      } 
  


  var oldUser = JSON.parse(localStorage.getItem('user'));
  oldUser.push(newUser);

  //Save the old + new data;
  localStorage.setItem('user', JSON.stringify(oldUser));
} 







 