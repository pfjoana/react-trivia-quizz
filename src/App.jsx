import { useState, useEffect } from 'react'
import he from 'he'
import {nanoid} from "nanoid"
import QA from './components/QA'
import './App.css'

export default function App() {

  const [startScreen, setStartScreen] = useState(true)
  const [check, setCheck] = useState(false) // when check is true verify answer, add this later

  //empty QA to insert decoded data
  // const [QA, setQA] = useState([])


  // store data from API
  const [allQA, setAllQA] = useState([])
  const [decodedQA, setDecodedQA] = useState([])


  // fetch data and save it to state allQA
  useEffect(()=> {
    async function fetchData() {
      const response = await fetch("https://opentdb.com/api.php?amount=10");
      const data = await response.json();
      setAllQA(data.results);
    }
    fetchData();
    console.log("fetch done")
  }, [])

  // shuffle function with Fisher-Yates shuffle algorithm:
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
       const j = Math.floor(Math.random() * (i + 1));
       [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
   }


  //decode and insert answer
  function onStart(){
    setStartScreen(false);

    const newArray = allQA.map(item => {
      //decode question and answers
      const decQuestion = he.decode(item.question);
      const decAnswers = item.incorrect_answers.map(answer => he.decode(answer));
      const decCorrectAnswer = he.decode(item.correct_answer);

      // all answers together
      const AllAnswers = [...decAnswers, decCorrectAnswer];
      const shuffledAnswers = shuffleArray(AllAnswers);

      return {
        id: nanoid(),
        question: decQuestion,
        answers: shuffledAnswers,
        correct_answer: decCorrectAnswer
      }
    });

    setDecodedQA(newArray);

  }

  useEffect(() => {
    // Perform actions that depend on decodeQA
    console.log(decodedQA);
   }, [decodedQA]);



  //QA elements to display
  const QAelements = decodedQA.map(qa => (
    <QA
      key={qa.id}
      question={qa.question}
      answers={qa.answers}
    />
  ))




  return (
    <>
      { startScreen ?
      <div className="start-screen">
        <h1>A great Trivia Quizz</h1>
        {/* activate button only when fetch is completed */}
        <button
          className="main-button"
          onClick={onStart}
          disabled={!allQA || allQA.length === 0}
        >Start</button>
      </div>
      :
      <div>
        {QAelements}
        <button className="main-button"
          onClick={() => setCheck(true)}
        >Check answers</button>
      </div>
      }
    </>
  )
}
