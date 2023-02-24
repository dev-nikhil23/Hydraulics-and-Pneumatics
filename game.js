const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: ' In which type of system does power transmission takes place through compressed air?',
        choice1: 'Fluid power system',
        choice2: 'Hydraulic system',
        choice3: 'Pneumatic system',
        choice4: 'Stepper motors',
        answer: 3 ,
        
    },
    {
        question:
            "The compressed air flows to the actuator through?",
        choice1: "Pipes and valves",
        choice2: "Shafts",
        choice3: " Motors",
        choice4: "Flow control valve",
        answer: 1,
    },
    {
        question: "The compressed air is delivered to the pneumatic system through the air compressor.",
        choice1: "True",
        choice2: "False",
        choice3: "wrong question",
        choice4: "not enough info",
        answer: 2,
    },
    {
        question: " What is the function of the air dryer?",
        choice1: "Removes dirt",
        choice2: "Removes moisture",
        choice3: "Controls the rate of flow",
        choice4: "Controls the pressure",
        answer: 2,
    },
    {
        question: " Which part of the Pneumatic system stores the compressed air?",
        choice1: "Air dryer",
        choice2: "Air compressor",
        choice3: "Air receiver tank",
        choice4: "Air lubricator",
        answer: 3,
    },
    {
        question: "Which type of pumps can give discharge even at high pressure?",
        choice1: "Multistage Pumps",
        choice2: "Monoblock pumps",
        choice3: " Rotary pumps",
        choice4: "Single stage pumps",
        answer: 3,
    },
    {
        question: "Which type of component in the hydraulic system supports less vibration and noise?",
        choice1: "Flow control valve",
        choice2: "Oil reservoir",
        choice3: " Rotary pumps",
        choice4: "Pressure gauge",
        answer: 3,
    },
    {
        question: "Hydraulic systems are slower in operation.",
        choice1: "true",
        choice2: "false",
        choice3: "insufficient info",
        choice4: "true and false",
        answer: 1,
    },
    {
        question: "What prevents the leakage of oil inside an unbalanced vane pump?",
        choice1: "Vanes",
        choice2: "Cylindrical rotor",
        choice3: " Screw",
        choice4: " Difference between the pressure of inlet and outlet",
        answer: 1,
    },
    {
        question: "Which among the following are not the main selection criteria for selection of hydraulic pumps?",
        choice1: " Discharge",
        choice2: "Pressure",
        choice3: " Speed",
        choice4: "Weight",
        answer: 4,
    }

    
]

const SCORE_POINTS = 10
const MAX_QUESTIONS = 10

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()