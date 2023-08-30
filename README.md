Step 1: Install Dependencies:
- Begin by installing the required external library for
sending emails. Use the package manager (such as npm)
to install "emailjs-com".

Step 2: Prepare App Component:
- Import the "emailjs-com" library at the top of your
"App.js" file to gain access to its functionalities.

Step 3: Enhance the addHabit Function:
- Inside your addHabit function, where you're adding 
new habits, check if the habit object includes a
"reminderTime" property.
- If it does, extract the hours and minutes from the
"reminderTime" string, and calculate a reminder 
date using the current date and these values.
- Determine the time interval until the reminder
using the reminder date and current date.
- Use setTimeout to execute a function
(let's call it sendReminderEmail) after the
calculated time interval.

Step 4: Create the sendReminderEmail Function:
- Define the sendReminderEmail function. This function
will take the habit name as an argument.
- Inside sendReminderEmail, prepare an object with
parameters like "to_email" (user's email), "subject"
(e.g., "Reminder: Complete Your Habit"), and "message"
(including the habit name).
- Use emailjs.send to send the email. Pass in the
appropriate service ID, template ID, user ID, and the
parameters you prepared.
-  Handle the promises returned by the email sending
process. Log success or error messages accordingly.

Step 5: Replace Placeholders with Actual IDs:
- In the sendReminderEmail function, ensure to replace
placeholders like 'YOUR_EMAILJS_SERVICE_ID',
'YOUR_EMAILJS_TEMPLATE_ID', and 'YOUR_EMAILJS_USER_ID'
with the actual IDs provided by your email service
provider (emailjs).

Step 6: Adjust HabitForm Component:
- Inside the HabitForm component, add an input element
for users to set a reminder time. Implement an onChange
handler for this input to update the "reminderTime"
in the component's state.

Step 7: Include Reminder Time in HabitList Component:
- In your HabitList component, consider displaying the 
reminder time for each habit. To do this, modify the
component's render to include the habit's "reminderTime" 
property if it's available.
