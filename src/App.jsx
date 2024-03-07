import { useState, useEffect } from 'react'
import he from 'he'
import {nanoid} from "nanoid"
import QA from './components/QA'
import './App.css'

export default function App() {

  const [startScreen, setStartScreen] = useState(true)
  const [check, setCheck] = useState(false) // when check is true verify answer, add this later

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
        selected_answer: ""
      }
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
      return qa.id === selectId ? {...qa, selected_answer} : qa
    }))

  }

  //QA elements to display
  const QAelements = decodedQA.map(qa => (
    <QA
      key={qa.id}
      id= {qa.id}
      question={qa.question}
      answers={qa.answers}
      handleSelect={handleSelect}
      selected_answer={qa.selected_answer}
    />
  ))

  //check answers
  function onCheck(){
    decodedQA.map(qa => {
      qa.selectedAnswer === qa.correct_answer ? console.log("correct") : console.log("incorrect")
    })
  }


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
        <button
        className="main-button"
        onClick={onCheck}
        >Check answers</button>
      </div>
      }
    </>
  )
}
