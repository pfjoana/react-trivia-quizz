/* eslint-disable react/prop-types */

export default function QA ({id, question, answers, handleSelect, selected_answer}) {
  return (
    <div>
      <h3>{question}</h3>
      <ul>
        {answers.map((answer, index) => (
          //handle is called inside a callback func to prevent loops
          <li
          key={index}
          className={answer === selected_answer ? "answer-selected" : "answer" }
          onClick={ ()=> handleSelect(id, answer) }
          >{answer}
          </li>
        ))}
      </ul>
    </div>
  )
}
