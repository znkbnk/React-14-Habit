import React, { useState, useEffect } from "react";
import HabitForm from "./HabitForm";
import HabitList from "./HabitList";
import DeletedHabits from "./DeletedHabits";
import FavoriteHabits from "./FavoriteHabits";
import emailjs from "emailjs-com";

function App() {
  const [habits, setHabits] = useState([]);
  const [deletedHabits, setDeletedHabits] = useState([]);
  const [showDeletedHabits, setShowDeletedHabits] = useState(false);
  const [showFavoriteHabits, setShowFavoriteHabits] = useState(false); // Controls the modal
  const [favoriteHabits, setFavoriteHabits] = useState([]); // List of favorite habits

  useEffect(() => {
    const storedHabits = JSON.parse(localStorage.getItem("habits")) || [];
    setHabits(storedHabits);
  }, []);

  useEffect(() => {
    localStorage.setItem("habits", JSON.stringify(habits));
  }, [habits]);

  const addHabit = (habit) => {
   // Assuming the habit object includes a "reminderTime"
   // property (e.g., "12:00")
   setHabits([...habits, habit]);

   // Schedule a reminder email when a new habit is added
   const reminderTime = habit.reminderTime;
   if (reminderTime) {
     const [hours, minutes] = reminderTime.split(":");
     const currentDate = new Date();
     const reminderDate = new Date(
       currentDate.getFullYear(),
       currentDate.getMonth(),
       currentDate.getDate(),
       hours,
       minutes
     );

     if (reminderDate > currentDate) {
       const timeUntilReminder = reminderDate - currentDate;
       setTimeout(() => {
         sendReminderEmail(habit.name); // Define this function
       }, timeUntilReminder);
     }
   }
 };

 const sendReminderEmail = (habitName) => {
   // Use emailjs to send a reminder email
   const templateParams = {
     to_email: "sample@email.com", // Change this to the user's email
     subject: "Reminder: Complete Your Habit",
     message: `Don't forget to complete your habit: ${habitName}`,
   };

   emailjs
     .send(
       "YOUR_EMAILJS_SERVICE_ID", 
       "YOUR_EMAILJS_TEMPLATE_ID",
       templateParams,
       "YOUR_EMAILJS_USER_ID" 
     )
     .then((response) => {
       console.log("Email sent:", response);
     })
     .catch((error) => {
       console.error("Email error:", error);
     });
 };

  const updateHabit = (index, updatedHabit) => {
    const updatedHabits = [...habits];
    updatedHabits[index] = updatedHabit;
    setHabits(updatedHabits);
  };

  const deleteHabit = (index) => {
    const deletedHabit = habits[index];
    const updatedHabits = habits.filter((_, i) => i !== index);
    setHabits(updatedHabits);
    setDeletedHabits([...deletedHabits, deletedHabit]);

    // Remove the deleted habit from favoriteHabits if it exists
    if (favoriteHabits.includes(deletedHabit)) {
      const updatedFavoriteHabits = favoriteHabits.filter(
        (habit) => habit !== deletedHabit
      );
      setFavoriteHabits(updatedFavoriteHabits);
    }
  };

   const toggleDeletedHabits = () => {
     setShowDeletedHabits(!showDeletedHabits);
   };

  const toggleFavorite = (index) => {
    const habitToFavorite = habits[index];
    if (!favoriteHabits.includes(habitToFavorite)) {
      setFavoriteHabits([...favoriteHabits, habitToFavorite]);
    } else {
      const updatedFavoriteHabits = favoriteHabits.filter(
        (habit) => habit !== habitToFavorite
      );
      setFavoriteHabits(updatedFavoriteHabits);
    }
  };

  return (
    <div className='app-container'>
      <div className='nav-menu'>
        <button onClick={() => setShowDeletedHabits(!showDeletedHabits)}>
          Deleted Habits
        </button>
        <button onClick={() => setShowFavoriteHabits(!showFavoriteHabits)}>
          Favorite Habits
        </button>
      </div>
      <h1>Habit Tracker</h1>
      <HabitForm addHabit={addHabit} />
      <HabitList
        habits={habits}
        favoriteHabits={favoriteHabits}
        updateHabit={updateHabit}
        deleteHabit={deleteHabit}
        toggleFavorite={toggleFavorite}
      />
      {showDeletedHabits && (
        <DeletedHabits
          deletedHabits={deletedHabits}
          onClose={toggleDeletedHabits}
        />
      )}
      {showFavoriteHabits && (
        <FavoriteHabits
          favoriteHabits={favoriteHabits}
          setShowFavoriteHabits={setShowFavoriteHabits}
        />
      )}
    </div>
  );
}

export default App;
