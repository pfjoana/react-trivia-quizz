/* eslint-disable react/prop-types */

export default function QA ({id, question, answers, handleSelect, selected_answer, checked, correct}) {
  //function to determine class name
  const class_name = (answer) => {

    if (!checked){
      return answer === selected_answer ? "answer-selected" : "answer"

    } else {

      if (answer === selected_answer && correct){
        return "answer-correct"
      } else if (answer === selected_answer && !correct){
        return "answer-incorrect"
      } else {
        return "answer"
      }
    }
  }

  return (
    <div>
      <h3>{question}</h3>
      <ul>
        {answers.map((answer, index) => (
          <li
          key={index}
          className={class_name(answer)}
          onClick={ ()=> handleSelect(id, answer) }
          >{answer}
          </li>
        ))}
      </ul>
    </div>
  )
}
