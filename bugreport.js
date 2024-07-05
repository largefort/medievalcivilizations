// Handle bug report form submission
document.getElementById('bug-report-form').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent default form submission
  
  // Get bug description from form
  let bugDescription = document.getElementById('bug-description').value;
  
  // You can send this bug report via email, or handle it as needed
  // For simplicity, we'll log it to console
  console.log(`Bug Report: ${bugDescription}`);
  
  // Clear the bug description field after submission (optional)
  document.getElementById('bug-description').value = '';
});
