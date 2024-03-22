/* eslint-disable react/prop-types */

export default function QA ({id, question, answers, handleSelect, selected_answer, checked, correct, correct_answer}) {
  function className(answer) {

    if (!checked){
      return answer === selected_answer ? "answer-selected" : "answer";

    } else {

      if (answer === selected_answer && correct){
        return "correct";
      } else if (answer === selected_answer && !correct){
        return "incorrect";
      } else if (answer === correct_answer) {
        return "correct-answer";
      } else {
        return "answer-checked";
      }
    }
  }

  return (
    <div className="QA">
      <h3>{question}</h3>
      <ul>
        {answers.map((answer, index) => (
          <li
          key={index}
          className={className(answer)}
          onClick={ ()=> handleSelect(id, answer) }
          >{answer}
          </li>
        ))}
      </ul>
    </div>
  );
}
