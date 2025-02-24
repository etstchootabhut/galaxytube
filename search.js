const searchInput = document.getElementById("search-input");
const suggestionsDiv = document.getElementById("search-suggestions");

const movies = [
  { title: "Doraemon: The Movie Nobita In Jannat No 1", link: "cartoon/cmovie1.html" },
  { title: "Doraemon: Nobita and the Galaxy Super-express", link: "cmovie2.html" },
  { title: "Doraemon: Nobita Aur Khel Khilona Bhool Bhulaiya", link: "cmovie3.html" },
  { title: "Doraemon: Nobita the Explorer Bow! Bow!", link: "cmovie4.html" },
  { title: "Doraemon: Nobita and the New Steel Troops—Winged Angels", link: "cmovie5.html" },
  { title: "Doraemon Movie: Doraemon Nobita & Three Visionary Swordsmen", link: "cmovie6.html" },
  { title: "Doraemon: The Record of Nobita's Parallel Visit to the West", link: "cmovie7.html" },
  { title: "Doraemon: Nobita's Dorabian Nights", link: "cmovie8.html" },
  { title: "Interstellar", link: "movies/movie1.html" },
  { title: "Chhichhore", link: "movies/movie2.html" },
  { title: "3 Idiots", link: "movies/movie3.html" },
  { title: "Avengers Endgame", link: "movies/movie4.html" },
  { title: "Your Name", link: "movies/movie5.html" },
  { title: "Bahubali: The Beginning", link: "movies/movie6.html" },
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
    // Perform some action, such as hiding the suggestions
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

  document.addEventListener('DOMContentLoaded', () => {
    const video = document.querySelector('.video-container video');
    const playPauseBtn = document.querySelector('.control-btn.play-pause');
    const progressContainer = document.querySelector('.progress-container');
    const progressBar = document.querySelector('.progress-bar');
    const volumeSlider = document.querySelector('.volume-slider');
    const volumeLevel = document.querySelector('.volume-slider .volume-level');
  
    // Play/Pause Button
    playPauseBtn.addEventListener('click', () => {
      if (video.paused) {
        video.play();
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>'; // Pause icon
      } else {
        video.pause();
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>'; // Play icon
      }
    });
  
    // Update Progress Bar as Video Plays
    video.addEventListener('timeupdate', () => {
      const progress = (video.currentTime / video.duration) * 100;
      progressBar.style.width = `${progress}%`;
    });
  
    // Seek Video on Progress Bar Tap
    progressContainer.addEventListener('click', (e) => {
      const rect = progressContainer.getBoundingClientRect();
      const clickPosition = (e.clientX - rect.left) / rect.width;
      video.currentTime = clickPosition * video.duration;
    });
  
    // Volume Control
    volumeSlider.addEventListener('click', (e) => {
      const rect = volumeSlider.getBoundingClientRect();
      const clickPosition = (rect.bottom - e.clientY) / rect.height;
      video.volume = clickPosition;
      volumeLevel.style.height = `${clickPosition * 100}%`;
    });
  });