// Get the necessary elements
const billInput = document.querySelector(".bill-input input");
const peopleInput = document.querySelector(".number-of-people input");
const tipButtons = document.querySelectorAll(".tip-button");
const customTipButton = document.querySelector(".custom-tip-button");
const tipAmountText = document.querySelectorAll(".price")[0];
const totalText = document.querySelectorAll(".price")[1];
const resetButton = document.querySelector(".summary-button");

// Default tip percent
let tipPercent = 0.15;

// Function to update displayed tip and total per person
function updateResults() {
  const bill = parseFloat(billInput.value);
  const people = parseInt(peopleInput.value);

  if (bill > 0 && people > 0) {
    const tipPerPerson = (bill * tipPercent) / people;
    const totalPerPerson = (bill + bill * tipPercent) / people;

    tipAmountText.textContent = `$${tipPerPerson.toFixed(2)}`;
    totalText.textContent = `$${totalPerPerson.toFixed(2)}`;
  } else {
    tipAmountText.textContent = "$0.00";
    totalText.textContent = "$0.00";
  }
}

// Add event listeners to tip buttons
tipButtons.forEach(button => {
  button.addEventListener("click", () => {
    // Remove 'active' style from all buttons
    tipButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    // If "Custom" button clicked, ask user for custom input
    if (button.classList.contains("custom-tip-button")) {
      const custom = prompt("Enter custom tip %");
      const customValue = parseFloat(custom);
      if (!isNaN(customValue) && customValue >= 0) {
        tipPercent = customValue / 100;
      } else {
        tipPercent = 0;
      }
    } else {
      // Convert button text (e.g., "10%") to a number
      tipPercent = parseFloat(button.textContent) / 100;
    }

    updateResults();
  });
});

// Update calculation when typing in bill or people inputs
billInput.addEventListener("input", updateResults);
peopleInput.addEventListener("input", updateResults);

// Reset everything
resetButton.addEventListener("click", () => {
  billInput.value = "";
  peopleInput.value = "";
  tipAmountText.textContent = "$0.00";
  totalText.textContent = "$0.00";
  tipPercent = 0.15;

  // Clear active state from all buttons
  tipButtons.forEach(btn => btn.classList.remove("active"));
});
