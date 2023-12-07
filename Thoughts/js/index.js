// Function to fetch quotes from the text file
async function fetchQuotes() {
  const response = await fetch("./assets/Thoughts.txt");
  const text = await response.text();
  return text.split("\n").filter((quote) => quote.trim() !== "");
}

// Function to display a random quote
async function displayRandomQuote() {
  const quotes = await fetchQuotes();
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];

  // Limit the displayed quote to 1000 characters
  const truncatedQuote =
    quote.length > 1000 ? quote.slice(0, 1000) + "..." : quote;

  const quoteElement = document.createElement("div");
  quoteElement.classList.add("col-md-4", "mb-4");
  quoteElement.innerHTML = `
        <div class="card rounded-2">
            <div class="card-body">
                <p class="card-text">${truncatedQuote}</p>
            </div>
        </div>
    `;

  // Add the quote to the grid
  document.getElementById("quoteGrid").appendChild(quoteElement);
}

// Function to show the full quote
// function showFullQuote(link, fullQuote) {
//   link.parentNode.innerHTML = `<p class="card-text">${fullQuote}</p>`;
// }

// Display initial quotes
for (let i = 0; i < 18; i++) {
  displayRandomQuote();
}
