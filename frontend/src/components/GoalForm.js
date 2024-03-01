import React from "react";
import useField from "../hooks/useField";
import useGoal from "../hooks/useGoal";

const GoalForm = () => {
  const textInput = useField("");
  const dueDateInput = useField("");
  const priorityInput = useField("");

  const { handleGoal } = useGoal();

  const handler = () => {
    handleGoal(textInput.value, dueDateInput.value, priorityInput.value);
  }

  return (
    <form className="create">
      <h3>Add a New Goal</h3>

      <label>Text:</label>
      <input type="text" placeholder=" Write the Goal Here " {...textInput} />
      <label>Due Date:</label>
      <input type="date" placeholder=" YYYY-MM-DD " {...dueDateInput} />
      <label>Priority:</label>
      <input type="text" placeholder="Is it High/Normaal/Low?" {...priorityInput} />
      <button onClick={handler}>Add Goal</button>
    </form>
  );
};

export default GoalForm;
