import React, { useState } from "react";

const HabitForm = ({ addHabit }) => {
  const [habit, setHabit] = useState({ name: "", reminderTime: "" });

  const handleHabitChange = (event) => {
    setHabit((prevHabit) => ({ ...prevHabit, name: event.target.value }));
  };

  const handleReminderChange = (event) => {
    setHabit((prevHabit) => ({
      ...prevHabit,
      reminderTime: event.target.value,
    }));
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (habit.name.trim() !== "") {
      addHabit(habit);
      setHabit({ name: "", reminderTime: "" });
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <input
        type='text'
        value={habit.name}
        onChange={handleHabitChange}
        placeholder='Enter a new habit'
      />
      <input
        type='text'
        value={habit.reminderTime}
        onChange={handleReminderChange}
        placeholder='Enter reminder time (e.g., 12:00)'
      />
      <button type='submit'>Add Habit</button>
    </form>
  );
};

export default HabitForm;
