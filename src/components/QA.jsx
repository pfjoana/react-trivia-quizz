/* eslint-disable react/prop-types */

export default function QA ({id, question, answers, handleSelect}) {
  return (
    <div>
      <h1>{question}</h1>
      <ul>
        {answers.map((answer, index) => (
          //handle is called inside a callback func to prevent loops
          <li key={index} onClick={ ()=> handleSelect(id, answer) }>
            {answer}
          </li>
        ))}
      </ul>
    </div>
  )
}
