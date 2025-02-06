const searchInput = document.getElementById("search-input");
const suggestionsDiv = document.getElementById("search-suggestions");

const movies = [
  { title: "Doraemon: The Movie Nobita In Jannat No 1", link: "cartoon/cmovie1.html" },
  { title: "Doraemon: Nobita and the Galaxy Super-express", link: "cmovie2.html" },
  { title: "Doraemon: Nobita Aur Khel Khilona Bhool Bhulaiya", link: "cmovie3.html" },
  { title: "Doraemon: Nobita the Explorer Bow! Bow!", link: "cmovie4.html" },
  { title: "Doraemon: Nobita and the New Steel Troops—Winged Angels", link: "cmovie5.html" },
  { title: "Interstellar", link: "movies/movie1.html" },
  { title: "Chhichhore", link: "movies/movie2.html" },
  { title: "3 Idiots", link: "movies/movie3.html" },
  { title: "Avengers Endgame", link: "movies/movie4.html" },
  { title: "Your Name", link: "movies/movie5.html" },
];

function searchItems() {
  const query = searchInput.value.toLowerCase().trim();
  suggestionsDiv.innerHTML = ""; // Clear previous suggestions

  if (query.length === 0) {
    suggestionsDiv.style.display = "none";
    return;
  }

  const filteredMovies = movies.filter(movie => movie.title.toLowerCase().includes(query));

  if (filteredMovies.length === 0) {
    suggestionsDiv.innerHTML = `<div class="suggestion-item">No results found.</div>`;
  } else {
    filteredMovies.forEach(movie => {
      const suggestionItem = document.createElement("a");
      suggestionItem.classList.add("suggestion-item");
      suggestionItem.href = movie.link;
      suggestionItem.textContent = movie.title;

      suggestionsDiv.appendChild(suggestionItem);
    });
  }

  suggestionsDiv.style.display = "block";
}

// Handle search button click
function performSearch() {
  const query = searchInput.value.trim();
  if (query) {
    window.location.href = `search-results.html?query=${encodeURIComponent(query)}`;
  }
}

// Hide suggestions when clicking outside
document.addEventListener("click", (e) => {
  if (!suggestionsDiv.contains(e.target) && e.target !== searchInput) {
    suggestionsDiv.style.display = "none";
  }
});

// Show suggestions while typing
searchInput.addEventListener("input", searchItems);

  document.addEventListener("fullscreenchange", async function () {
    if (document.fullscreenElement) {
      // Change to landscape when entering fullscreen
      if (screen.orientation && screen.orientation.lock) {
        try {
          await screen.orientation.lock("landscape");
        } catch (error) {
          console.warn("Orientation lock not supported:", error);
        }
      }
    } else {
      // Unlock orientation when exiting fullscreen
      if (screen.orientation && screen.orientation.unlock) {
        screen.orientation.unlock();
      }
    }
  });