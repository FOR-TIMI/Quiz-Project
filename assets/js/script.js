
//To get all the required elements
const startQuiz = document.querySelector('.start-quiz');
const startQuizContainer = document.querySelector('.container')
const timerInput = document.querySelector('.timer')
const usernameInput = document.querySelector('.username')



const questionSection = document.querySelector('#question-section')



startQuizContainer.addEventListener('submit',function(e){

    e.preventDefault();
    validateInput();

}) 

const setError = function(element, message){
    const errorElement= document.querySelector('#error');

    errorElement.textContent = message;
    setTimeout(() => {
        usernameInput.classList.add('error', 'animate__animated','animate__headShake');
    },50)
    usernameInput.classList.remove('error', 'animate__animated','animate__headShake');
    usernameInput.classList.remove('success');


}





const validateInput = function(){
    const username = usernameInput.value;

    if(username === ''){
       setError(username, 'Your name is required')
    }

}


let time = 5


function createQuiz(){
      startTimer();
      if(time !== 0){
      }
}


    const questions = [
        {
            question: 'What is 2 + 2',
            options:['3','7','22','4'],
            answer:3
        },
        {
            question: 'What is 2 + 2',
            options:['3','7','22','4'],
            answer:3
        },
        {
            question: 'What is 2 + 2',
            options:['3','7','22','4'],
            answer:3
        }
    ]


    //To select the timers
 const circularProgress = document.querySelector('.circular-progress'),
      progressValue = document.querySelector('.progress-value')


let progressStartValue = 75,
    progressEndValue = 0,
    speed = 1000;


function startTimer(){

    //set's the time
    let progress = setInterval(() => {
        progressStartValue--;
      
        //Set the value to the time
        progressValue.textContent = progressStartValue;
        //To set the circle
        circularProgress.style.background = `conic-gradient(#A862EA ${progressStartValue *3.6}deg,  #ededed 0deg)`
      
        //Checking when to end the timer
        if(progressStartValue === progressEndValue){
          clearInterval(progress);
        }
      },speed)
}

var id = 0;

    
function saveUsername(){
 

        if(localStorage.getItem('user') == null){
            localStorage.setItem('user','[]')
        }
    
        //Set it our input value
        const newUser = {
                username: usernameInput.value,
                id: id += 1,
                correct: 0,
                wrong: 0,
            } 
        
    
    
        var oldUser = JSON.parse(localStorage.getItem('user'));
        oldUser.push(newUser);
    
        //Save the old + new data;
        localStorage.setItem('user', JSON.stringify(oldUser));
    } 
    










