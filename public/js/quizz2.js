// Array de objetos contendo os dados do quiz
const historyQuizData = [
    {
        question: "Em que ano o Palmeiras foi fundado?", // Pergunta
        a: "1914", // Opção A
        b: "1920", // Opção B
        c: "1934", // Opção C
        d: "1942", // Opção D
        correct: "a" // Resposta correta
    },
    {
        question: "Qual era o nome original do Palmeiras?",
        a: "Palestra Itália",
        b: "Sociedade Esportiva Palmeiras",
        c: "Palmeiras Futebol Clube",
        d: "Clube Atlético Paulistano",
        correct: "a"
    },
    {
        question: "Em que ano o Palmeiras mudou seu nome de Palestra Itália para Palmeiras?",
        a: "1942",
        b: "1945",
        c: "1950",
        d: "1960",
        correct: "a"
    },
    {
        question: "Qual é o mascote oficial do Palmeiras?",
        a: "Periquito",
        b: "Leão",
        c: "Gavião",
        d: "Urubu",
        correct: "a"
    },
    {
        question: "Em que ano o Palmeiras conquistou seu primeiro Campeonato Brasileiro?",
        a: "1951",
        b: "1960",
        c: "1967",
        d: "1972",
        correct: "c"
    }
];

// Seleciona os elementos HTML
const quizContainer = document.getElementById('quiz');
const submitButton = document.getElementById('submit');
const resultsContainer = document.getElementById('results');

// Função para construir o quiz
function buildQuiz() {
    const output = [];

    // Loop através de cada questão
    for (let i = 0; i < historyQuizData.length; i++) {
        const currentQuestion = historyQuizData[i];
        const answers = [];

        // Loop através de cada opção de resposta
        for (let letter in currentQuestion) {
            if (letter !== 'question' && letter !== 'correct') {
                answers.push(
                    `<label>
                        <input type="radio" name="question${i}" value="${letter}">
                        ${letter} :
                        ${currentQuestion[letter]}
                    </label>`
                );
            }
        }

        // Adiciona a pergunta e as opções ao output
        output.push(
            `<div class="question"> ${currentQuestion.question} </div>
            <div class="answers"> ${answers.join('')} </div>`
        );
    }

    // Insere o output no contêiner do quiz
    quizContainer.innerHTML = output.join('');
}

// Função para mostrar os resultados
function showResults() {
    const answerContainers = quizContainer.querySelectorAll('.answers');
    let numCorrect = 0;

    // Loop através de cada questão
    for (let i = 0; i < historyQuizData.length; i++) {
        const answerContainer = answerContainers[i];
        const selector = `input[name=question${i}]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;

        // Verifica se a resposta do usuário está correta
        if (userAnswer === historyQuizData[i].correct) {
            numCorrect++;
            answerContainers[i].style.color = 'green'; // Marca a resposta correta com verde
        } else {
            answerContainers[i].style.color = 'red'; // Marca a resposta incorreta com vermelho
        }
    }

    // Mostra o número de respostas corretas
    resultsContainer.innerHTML = `${numCorrect} de ${historyQuizData.length} questões corretas.`;
}

// Constrói o quiz ao carregar a página
buildQuiz();

// Adiciona um evento ao botão de submit para mostrar os resultados
submitButton.addEventListener('click', showResults);
