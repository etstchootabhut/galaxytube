const searchInput = document.getElementById("search-input");
const suggestionsDiv = document.getElementById("search-suggestions");

const movies = [
  { title: "Doraemon: The Movie Nobita In Jannat No 1", link: "cartoon/cmovie1.html" },
{ title: "Doraemon: Nobita and the Galaxy Super-express", link: "cartoon/cmovie2.html" },
{ title: "Doraemon: Nobita Aur Khel Khilona Bhool Bhulaiya", link: "cartoon/cmovie3.html" },
{ title: "Doraemon: Nobita the Explorer Bow! Bow!", link: "cartoon/cmovie4.html" },
{ title: "Doraemon: Nobita and the New Steel Troops—Winged Angels", link: "cartoon/cmovie5.html" },
{ title: "Doraemon Movie: Doraemon Nobita & Three Visionary Swordsmen", link: "cartoon/cmovie6.html" },
{ title: "Doraemon: The Record of Nobita's Parallel Visit to the West", link: "cartoon/cmovie7.html" },
{ title: "Doraemon: Nobita's Dorabian Nights", link: "cartoon/cmovie8.html" },
{ title: "Doraemon: Nobita and the Island of Miracles", link: "cartoon/cmovie9.html" },
{ title: "Doraemon Nobita's Secret Gadget Museum", link: "cartoon/cmovie10.html" },
{ title: "Doraemon Nobita's Diary of the Creation of the World", link: "cartoon/cmovie11.html" },
{ title: "Doraemon Nobita and the Windmasters", link: "cartoon/cmovie12.html" },
{ title: "Doraemon: Nobita and the Green Giant Legend", link: "cartoon/cmovie13.html" },
{ title: "Doraemon: Nobita's Dinosaur", link: "cartoon/cmovie14.html" },
{ title: "Doraemon: Nobita's Space Heroes", link: "cartoon/cmovie15.html" },
{ title: "Doraemon: Nobita in the Robot Kingdom", link: "cartoon/cmovie16.html" },
{ title: "Doraemon The Movie: Nobita and Ichi Mera Dost", link: "cartoon/cmovie17.html" },
{ title: "Doraemon: Nobita's Great Battle of the Mermaid King", link: "cartoon/cmovie18.html" },
{ title: "Doraemon Movie Nobita Chal Pada Antarctica", link: "cartoon/cmovie19.html" },
{ title: "Doraemon: Nobita Drifts in the Universe", link: "cartoon/cmovie20.html" },
{ title: "Doraemon: Nobita and the Winged Braves", link: "cartoon/cmovie21.html" },
{ title: "Doraemon: Nobita and the Legend of the Sun King", link: "cartoon/cmovie22.html" },
{ title: "Doraemon: Nobita's Little Star Wars", link: "cartoon/cmovie23.html" },
{ title: "Doraemon: Nobita's Great Adventure in the South Seas", link: "cartoon/cmovie24.html" },
{ title: "Doraemon: The Record of Nobita's Spaceblazer", link: "cartoon/cmovie25.html" },
{ title: "Stand by Me Doraemon", link: "cartoon/cmovie26.html" },
{ title: "Doraemon: Nobita and the Spiral City", link: "cartoon/cmovie27.html" },
{ title: "Doraemon: Nobita and the Knights on Dinosaurs", link: "cartoon/cmovie28.html" },
{ title: "Doraemon Nobita and the Birth of Japan", link: "cartoon/cmovie29.html" },
{ title: "Doraemon Movie Nobita and the Underwater Adventure", link: "cartoon/cmovie30.html" },
{ title: "Doraemon Nobita & 39s Treasure Island", link: "cartoon/cmovie31.html" },
{ title: "Doraemon Nobitas Chronicle of the Moon Exploration", link: "cartoon/cmovie32.html" },
{ title: "Doraemon the Movie 2007: Nobita’s New Great Adventure into the Underworld", link: "cartoon/cmovie33.html" },
{ title: "Doraemon 3D Movie: Stand By Me Doraemon 2", link: "cartoon/cmovie34.html" },
{ title: "HINCHAN BUNGLE IN THE JUNGLE", link: "cartoon/cmovie35.html" },
{ title: "SHINCHAN – ADVENTURES IN HENDERLAND", link: "cartoon/cmovie36.html" },
{ title: "Shinchan – Dark Tama Tama", link: "cartoon/cmovie37.html" },
{ title: "Shinchan – The Golden Sword", link: "cartoon/cmovie38.html" },
{ title: "Shinchan – The Spy", link: "cartoon/cmovie39.html" },
{ title: "Shinchan – Villian or Dulhan", link: "cartoon/cmovie40.html" },
{ title: "Shinchan – Himawari Banegi Rajkumari", link: "cartoon/cmovie41.html" },
{ title: "Shinchan – Masala Story", link: "cartoon/cmovie42.html" },
{ title: "Shinchan – Very Very Tasty", link: "cartoon/cmovie43.html" },
{ title: "Shinchan – Robot Dad", link: "cartoon/cmovie44.html" },
{ title: "Shinchan – Kanta Laga", link: "cartoon/cmovie45.html" },
{ title: "Shinchan Buri Buri Kingdom", link: "cartoon/cmovie46.html" },
{ title: "SHINCHAN in ACTION KAMEN vs HIGURE RAKSHAS", link: "cartoon/cmovie47.html" },
{ title: "Interstellar", link: "movies/movie1.html" },
{ title: "Chhichhore", link: "movies/movie2.html" },
{ title: "3 Idiots", link: "movies/movie3.html" },
{ title: "Avengers Endgame", link: "movies/movie4.html" },
{ title: "Your Name", link: "movies/movie5.html" },
{ title: "Bahubali: The Beginning", link: "movies/movie6.html" },
{ title: "Super 30", link: "movies/movie7.html" },
{ title: "One Piece Film Red", link: "movies/movie8.html" },
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

  
  
