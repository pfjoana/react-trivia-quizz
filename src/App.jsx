import { useState } from 'react'
import he from 'he'
import './App.css'

export default function App() {

  const [start, setStart] = useState(true)
  const [check, setCheck] = useState(false)

  // const quizzElements =

  return (
    <>
      { start ?
      <div className="start-screen">
        <h1>A great Trivia Quizz</h1>
        <button className="main-button" onClick={() => setStart(false)}>Start</button>
      </div>
      :
      <div>
        <button className="main-button" onClick={() => setCheck(true)}>Check answers</button>
      </div>
      }
    </>
  )
}
