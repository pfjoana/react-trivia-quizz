import { useState, useEffect } from 'react';
import he from 'he';
import {nanoid} from "nanoid";
import QA from './components/QA';
import { useApi } from './useApi';
import './styles/App.scss';

export default function App() {

  const [startScreen, setStartScreen] = useState(true);
  const [checked, setChecked] = useState(false);

  // store data from API
  const [allQA, setAllQA] = useState([]);
  const [decodedQA, setDecodedQA] = useState([]);

  //fetch data from API using custom hook useApi
  const { status, data, error } = useApi("https://opentdb.com/api.php?amount=10");

  useEffect(() => {
      if (status === 'fetched') {
        console.log(data);
        setAllQA(data.results);

      } else if (status === 'error') {
        console.error(error);
      }

  }, [status, data, error]);


  // shuffle function with Fisher-Yates shuffle algorithm:
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
       const j = Math.floor(Math.random() * (i + 1));
       [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
   }


  //decode and join all answers together
  function onStart(){
    setStartScreen(false);

    const newArray = allQA.map(item => {
      //decode question and answers
      const decQuestion = he.decode(item.question);
      const decIncAnswers = item.incorrect_answers.map(answer => he.decode(answer));
      const decCorrectAnswer = he.decode(item.correct_answer);

      // all answers together
      const AllAnswers = [...decIncAnswers, decCorrectAnswer];
      const shuffledAnswers = shuffleArray(AllAnswers);

      return {
        id: nanoid(),
        question: decQuestion,
        answers: shuffledAnswers,
        correct_answer: decCorrectAnswer,
        selected_answer: "",
        correct: false
      };
    });

    setDecodedQA(newArray);
  }


  useEffect(() => {
    console.log(decodedQA);
   }, [decodedQA]);


  //component calls this with arguments
  function handleSelect(selectId, selected_answer){
    // console.log("selectedAnswer:", selected_answer);

    setDecodedQA(prevState => prevState.map(qa =>{
      return qa.id === selectId ? {...qa, selected_answer} : qa;
    }));

  }

  //QA elements to display
  const QAelements = decodedQA.map((qa,index) => {

    if (!qa) {
      console.error(`Question object at index ${index} is undefined.`);
      return null; // or some fallback UI
   }
    return(
      <QA
        key={qa.id}
        id= {qa.id}
        question={qa.question}
        answers={qa.answers}
        handleSelect={handleSelect}
        selected_answer={qa.selected_answer}
        checked={checked}
        correct={qa.correct}
        correct_answer={qa.correct_answer}
      />
    );
    });

  //check answers
  function onCheck(){
    // console.log('Before check:', decodedQA); // Log the state before the check

    setChecked(true);

    const checkedQA = decodedQA.map(qa => {
      // Check if the selected answer is correct
      const isCorrect = qa.selected_answer === qa.correct_answer;

      // Return a new object with the updated 'correct' property
      return {
        ...qa,
        correct: isCorrect
      };
   });

    // console.log('After check:', checkedQA); // Log the new state after the check

    setDecodedQA(checkedQA);
  }


  return (
    <div className="main-container">
      { startScreen ?
      <div className="start-screen">
        <h1>The Great Quiz</h1>
        <p>Get ready to flex those brain muscles!<br />Let the quiz begin!...</p>
        {/* activate button only when fetch is completed */}
        <button
          className="main-button"
          onClick={onStart}
          disabled={!allQA || allQA.length === 0}
        >
          Start quiz
        </button>
      </div>
      :
      <div className="QA-screen">
        {QAelements}
        <button
          className="main-button"
          onClick={onCheck}
        >
          Check answers
        </button>
      </div>
      }
    </div>
  );
}
