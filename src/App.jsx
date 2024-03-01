import { useState, useEffect } from 'react'
import he from 'he'
import './App.css'

export default function App() {

  const [startScreen, setStartScreen] = useState(true)
  const [check, setCheck] = useState(false) // when check is true verify answer, add this later

  //empty QA to insert decoded data
  // const [QA, setQA] = useState([])


  // store data from API
  const [allQA, setAllQA] = useState([])

  // call API
  useEffect(()=> {
    console.log("Effect runned")
    fetch("https://opentdb.com/api.php?amount=10")
    .then(data => data.json())
    .then(data => setAllQA(data.results))
  }, []
  )

  console.log(allQA)


  return (
    <>
      { startScreen ?
      <div className="start-screen">
        <h1>A great Trivia Quizz</h1>
        <button className="main-button" onClick={() => setStartScreen(false)}>Start</button>
      </div>
      :
      <div>
        {/* add QA elements from component */}
        <button className="main-button" onClick={() => setCheck(true)}>Check answers</button>
      </div>
      }
    </>
  )
}
