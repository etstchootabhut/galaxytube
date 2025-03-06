const video = document.getElementById("video");
const videoContainer = document.getElementById("videoContainer");
const playBtn = document.getElementById("playBtn");
const bigPlayBtn = document.getElementById("bigPlayBtn");
const volumeBtn = document.getElementById("volumeBtn");
const volumeSlider = document.getElementById("volumeSlider");
const progressBar = document.getElementById("progressBar");
const progressContainer = document.getElementById("progressContainer");
const currentTime = document.getElementById("currentTime");
const duration = document.getElementById("duration");
const fullscreenBtn = document.getElementById("fullscreenBtn");
const rewindBtn = document.getElementById("rewindBtn");
const forwardBtn = document.getElementById("forwardBtn");
const settingsBtn = document.getElementById("settingsBtn");
const settingsMenu = document.getElementById("settingsMenu");

// 🎭 Create Volume & Skip Indicators
let volumeIndicator = document.createElement("div");
volumeIndicator.classList.add("volume-indicator");
videoContainer.appendChild(volumeIndicator);

let skipIndicator = document.createElement("div");
skipIndicator.classList.add("skip-indicator");
videoContainer.appendChild(skipIndicator);

// ⚙️ Toggle Settings Menu
settingsBtn.addEventListener("click", (e) => {
    e.stopPropagation(); // Prevents menu from closing when clicking the button
    settingsMenu.style.display = settingsMenu.style.display === "block" ? "none" : "block";
});

// ✅ Close Settings When Clicking Outside
document.addEventListener("click", (e) => {
    if (!settingsMenu.contains(e.target) && e.target !== settingsBtn) {
        settingsMenu.style.display = "none";
    }
});

// ▶️ Play/Pause functionality
function togglePlay() {
    if (video.paused) {
        video.play();
        playBtn.innerHTML = '<i class="fa-solid fa-pause fa-2x"></i>';
        bigPlayBtn.style.display = "none";
    } else {
        video.pause();
        playBtn.innerHTML = '<i class="fa-solid fa-play fa-2x"></i>';
        bigPlayBtn.style.display = "block";
    }
}

// ✅ Fix: Add Click Event Listeners for Play/Pause
playBtn.addEventListener("click", togglePlay);
bigPlayBtn.addEventListener("click", togglePlay);
video.addEventListener("click", togglePlay);

// ⏩ ⏪ Fix: Add Click Event Listeners for Rewind & Forward
rewindBtn.addEventListener("click", () => {
    video.currentTime = Math.max(video.currentTime - 5, 0);
    showSkipAnimation("rewind");
});
forwardBtn.addEventListener("click", () => {
    video.currentTime = Math.min(video.currentTime + 5, video.duration);
    showSkipAnimation("forward");
});

// 🎚 Volume Control (Mouse & Keyboard)
volumeSlider.addEventListener("input", (e) => {
    video.volume = e.target.value;
    video.muted = false; // Unmute if slider is moved
    updateVolumeIcon();
    showVolumeIndicator();
});

let lastVolume = 1; // Stores last volume before mute

volumeBtn.addEventListener("click", () => {
    if (video.muted || video.volume === 0) {
        video.muted = false;
        video.volume = lastVolume > 0 ? lastVolume : 0.5; // Restore volume
    } else {
        lastVolume = video.volume;
        video.muted = true;
        video.volume = 0;
    }
    updateVolumeIcon();
    showVolumeIndicator();
});

// ✅ Ensure Volume Button Updates Correctly
function updateVolumeIcon() {
    if (video.muted || video.volume === 0) {
        volumeBtn.innerHTML = '<i class="fa-solid fa-volume-off fa-2x"></i>';
    } else if (video.volume > 0.5) {
        volumeBtn.innerHTML = '<i class="fa-solid fa-volume-high fa-2x"></i>';
    } else {
        volumeBtn.innerHTML = '<i class="fa-solid fa-volume-low fa-2x"></i>';
    }
}

// 🔊 Show Volume Animation
function showVolumeIndicator() {
    let volumeLevel = Math.round(video.volume * 100);
    let icon = video.muted || volumeLevel === 0 ? "🔇" : volumeLevel > 50 ? "🔊" : "🔉";

    volumeIndicator.textContent = `${icon} ${volumeLevel}%`;
    volumeIndicator.style.opacity = "1";
    volumeIndicator.style.transform = "scale(1.2)";

    clearTimeout(volumeIndicator.timeout);
    volumeIndicator.timeout = setTimeout(() => {
        volumeIndicator.style.opacity = "0";
        volumeIndicator.style.transform = "scale(1)";
    }, 1200);
}

// ⏩ ⏪ Show Skip Animation
function showSkipAnimation(type) {
    skipIndicator.textContent = type === "rewind" ? "⏪ -5s" : "⏩ +5s";
    skipIndicator.style.opacity = "1";
    skipIndicator.style.transform = "scale(1.2)";

    clearTimeout(skipIndicator.timeout);
    skipIndicator.timeout = setTimeout(() => {
        skipIndicator.style.opacity = "0";
        skipIndicator.style.transform = "scale(1)";
    }, 700);
}

// ⏳ Update Progress Bar
video.addEventListener("timeupdate", () => {
    const progress = (video.currentTime / video.duration) * 100;
    progressBar.style.width = `${progress}%`;
    currentTime.textContent = formatTime(video.currentTime);
});

// ⏩ Click on Progress Bar to Seek
if (progressContainer) {
    progressContainer.addEventListener("click", (e) => {
        const rect = progressContainer.getBoundingClientRect();
        const pos = (e.clientX - rect.left) / rect.width;
        video.currentTime = pos * video.duration;
    });
}

// ⏳ Format Time
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    seconds = Math.floor(seconds % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

// Show Total Duration Once Metadata is Loaded
video.addEventListener("loadedmetadata", () => {
    duration.textContent = formatTime(video.duration);
});

// 🔲 Fullscreen Mode (Ensure Indicators Stay Visible)
fullscreenBtn.addEventListener("click", () => {
    if (!document.fullscreenElement) {
        videoContainer.requestFullscreen().then(() => {
            videoContainer.appendChild(volumeIndicator);
            videoContainer.appendChild(skipIndicator);
        });
    } else {
        document.exitFullscreen();
    }
});

// 🎮 YouTube-Style Keyboard Shortcuts
document.addEventListener("keydown", (event) => {
    switch (event.key) {
        case " ": // Spacebar: Play/Pause
            event.preventDefault();
            togglePlay();
            break;
        case "ArrowUp": // Volume Up
            event.preventDefault();
            video.volume = Math.min(video.volume + 0.1, 1);
            volumeSlider.value = video.volume;
            updateVolumeIcon();
            showVolumeIndicator();
            break;
        case "ArrowDown": // Volume Down
            event.preventDefault();
            video.volume = Math.max(video.volume - 0.1, 0);
            volumeSlider.value = video.volume;
            updateVolumeIcon();
            showVolumeIndicator();
            break;
        case "ArrowLeft": // Rewind 5s
            event.preventDefault();
            video.currentTime = Math.max(video.currentTime - 5, 0);
            showSkipAnimation("rewind");
            break;
        case "ArrowRight": // Forward 5s
            event.preventDefault();
            video.currentTime = Math.min(video.currentTime + 5, video.duration);
            showSkipAnimation("forward");
            break;
        case "f": // Toggle Fullscreen
            event.preventDefault();
            fullscreenBtn.click();
            break;
        case "m": // Mute/Unmute
            event.preventDefault();
            volumeBtn.click();
            break;
        default:
            if (event.key >= "0" && event.key <= "9") {
                let percent = parseInt(event.key) * 10;
                video.currentTime = (percent / 100) * video.duration;
            }
            break;
    }
});

// 🚀 Initial Setup
video.volume = 1;
volumeSlider.value = video.volume;
updateVolumeIcon();
settingsMenu.style.display = "none"; // Hide settings menu initially

const speeds = [0.5, 1, 1.5, 2];
let speedIndex = 1;
speedBtn.addEventListener('click', () => {
    speedIndex = (speedIndex + 1) % speeds.length;
    video.playbackRate = speeds[speedIndex];
    speedBtn.textContent = `Speed: ${speeds[speedIndex]}x`;
});

// Add a title with transparent background in the top-left corner
const videoTitle = document.createElement("div");
videoTitle.classList.add("video-title");
videoTitle.textContent = document.querySelector(".video-title").textContent; // Get title from HTML
videoContainer.prepend(videoTitle);

// Apply styles for title
videoTitle.style.position = "absolute";
videoTitle.style.top = "10px";
videoTitle.style.left = "5px";
videoTitle.style.color = "white";
videoTitle.style.padding = "8px 15px";
videoTitle.style.borderRadius = "5px";
videoTitle.style.fontSize = "22px";
videoTitle.style.fontWeight = "bold";

// Add loading animation in the center of the video player
const loadingIndicator = document.createElement("div");
loadingIndicator.classList.add("loading-indicator");
loadingIndicator.innerHTML = '<i class="fa-solid fa-spinner fa-spin fa-3x"></i>';
videoContainer.appendChild(loadingIndicator);

loadingIndicator.style.position = "absolute";
loadingIndicator.style.top = "50%";
loadingIndicator.style.left = "50%";
loadingIndicator.style.transform = "translate(-50%, -50%)";
loadingIndicator.style.display = "none";

// Show loading animation when buffering
video.addEventListener("waiting", () => {
    loadingIndicator.style.display = "block";
});

// Hide loading animation when video starts playing
video.addEventListener("playing", () => {
    loadingIndicator.style.display = "none";
});

// Hide cursor, controls, and title after 3 seconds of inactivity
let mouseTimeout;
videoContainer.addEventListener("mousemove", () => {
    videoContainer.style.cursor = "auto";
    document.querySelector(".controls-container").style.opacity = "1";
    videoTitle.style.opacity = "1";
    clearTimeout(mouseTimeout);
    mouseTimeout = setTimeout(() => {
        videoContainer.style.cursor = "none";
        document.querySelector(".controls-container").style.opacity = "0";
        videoTitle.style.opacity = "0";
    }, 3000);
});

document.addEventListener("fullscreenchange", () => {
    if (!document.fullscreenElement) {
        videoContainer.style.cursor = "auto"; // Reset cursor when exiting fullscreen
        document.querySelector(".controls-container").style.opacity = "1";
        videoTitle.style.opacity = "1";
        clearTimeout(mouseTimeout);
    }
});

document.addEventListener("DOMContentLoaded", function () {
    var video = document.getElementById("video");
    var captionsBtn = document.getElementById("captionsBtn");
    var qualityBtn = document.getElementById("qualityBtn");
    var settingsMenu = document.getElementById("settingsMenu");
    var qualityDropdown;

    var hls;

    // Load HLS Stream
    function loadHLS() {
        if (Hls.isSupported()) {
            hls = new Hls();
            hls.loadSource(videoSrc);
            hls.attachMedia(video);
            hls.on(Hls.Events.MANIFEST_PARSED, function () {
                console.log("HLS Loaded Successfully");
                createQualityMenu();
            });
        } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
            video.src = videoSrc;
        } else {
            console.error("HLS is not supported in this browser.");
        }
    }

    // Create Quality Menu
    function createQualityMenu() {
        if (document.querySelector(".quality-dropdown")) {
            document.querySelector(".quality-dropdown").remove();
        }

        let levels = hls.levels.map((level, index) => ({
            index: index,
            resolution: level.height + "p",
        }));

        levels.unshift({ index: -1, resolution: "Auto" }); // Add Auto option

        qualityDropdown = document.createElement("div");
        qualityDropdown.classList.add("quality-dropdown");

        levels.forEach((level) => {
            let option = document.createElement("button");
            option.innerText = level.resolution;
            option.dataset.level = level.index;
            option.addEventListener("click", function () {
                changeQuality(level.index);
                qualityBtn.innerText = "Quality: " + level.resolution;
                qualityDropdown.style.display = "none";
            });
            qualityDropdown.appendChild(option);
        });

        settingsMenu.appendChild(qualityDropdown);
    }

    // Change Video Quality
    function changeQuality(index) {
        hls.currentLevel = index;
    }

    // Toggle Captions (Show/Hide)
    captionsBtn.addEventListener("click", function () {
        let captionsTrack = video.textTracks[0]; // Access the first track (subtitles)
        if (captionsTrack) {
            if (captionsTrack.mode === "showing") {
                captionsTrack.mode = "hidden"; // Hide captions
                captionsBtn.innerText = "Captions: Off";
            } else {
                captionsTrack.mode = "showing"; // Show captions
                captionsBtn.innerText = "Captions: On";
            }
        } else {
            console.error("Captions track not found.");
        }
    });    
    

    // Show/Hide Quality Dropdown
    qualityBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        qualityDropdown.style.display = qualityDropdown.style.display === "block" ? "none" : "block";
    });

    // Close Drop-Up Menu When Clicking Outside
    document.addEventListener("click", function (e) {
        if (!qualityDropdown.contains(e.target) && e.target !== qualityBtn) {
            qualityDropdown.style.display = "none";
        }
    });

    loadHLS(); // Load the video with quality options
});

document.addEventListener("DOMContentLoaded", function () {
    var video = document.getElementById("video");
    var captionsBtn = document.getElementById("captionsBtn");

    // Access the first text track (subtitles)
    let captionsTrack = video.textTracks[0];

    // Ensure captions are showing by default
    if (captionsTrack) {
        captionsTrack.mode = "showing"; // Ensure the subtitles are enabled initially
    }

    // Toggle Captions (Show/Hide)
    captionsBtn.addEventListener("click", function () {
        if (captionsTrack.mode === "showing") {
            captionsTrack.mode = "hidden"; // Hide captions
            captionsBtn.innerText = "Captions: Off";
        } else {
            captionsTrack.mode = "showing"; // Show captions
            captionsBtn.innerText = "Captions: On";
        }
    });

    
});

document.addEventListener("DOMContentLoaded", function () {
    var video = document.getElementById("video");
    var qualityBtn = document.getElementById("qualityBtn");
    var settingsMenu = document.getElementById("settingsMenu");
    var qualityDropdown;
    var hls;

    function loadHLS() {
        if (Hls.isSupported()) {
            hls = new Hls();
            hls.loadSource(videoSrc);
            hls.attachMedia(video);
            hls.on(Hls.Events.MANIFEST_PARSED, function () {
                console.log("HLS Loaded Successfully");
                createQualityMenu();
            });
        } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
            video.src = videoSrc;
        } else {
            console.error("HLS is not supported in this browser.");
        }
    }

    function createQualityMenu() {
        if (document.querySelector(".quality-dropdown")) {
            document.querySelector(".quality-dropdown").remove();
        }

        let levels = [
            { index: -1, resolution: "Auto" },
            { index: 0, resolution: "480p" },
            { index: 1, resolution: "720p" },
            { index: 2, resolution: "1080p" }
        ];

        qualityDropdown = document.createElement("div");
        qualityDropdown.classList.add("quality-dropdown");

        levels.forEach((level) => {
            let option = document.createElement("button");
            option.innerText = level.resolution;
            option.dataset.level = level.index;
            option.classList.add("quality-option");
            option.addEventListener("click", function () {
                changeQuality(level.index);
                qualityBtn.innerText = "Quality: " + level.resolution;
                qualityDropdown.style.display = "none";
            });
            qualityDropdown.appendChild(option);
        });

        settingsMenu.appendChild(qualityDropdown);
    }

    function changeQuality(index) {
        hls.currentLevel = index;
    }

    qualityBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        qualityDropdown.style.display = qualityDropdown.style.display === "block" ? "none" : "block";
    });

    document.addEventListener("click", function (e) {
        if (!qualityDropdown.contains(e.target) && e.target !== qualityBtn) {
            qualityDropdown.style.display = "none";
        }
    });

    loadHLS();
});

// CSS for better UI
const style = document.createElement("style");
style.innerHTML = `
.quality-dropdown {
    position: absolute;
    bottom: 50px;
    right: 10px;
    background: rgba(0, 0, 0, 0.8);
    border-radius: 8px;
    padding: 10px;
    display: none;
    box-shadow: 0 4px 10px rgba(255, 255, 255, 0.2);
    animation: fadeIn 0.3s ease-in-out;
}

.quality-option {
    background: none;
    color: white;
    border: none;
    padding: 8px 15px;
    cursor: pointer;
    display: block;
    width: 100%;
    text-align: left;
    font-size: 14px;
    transition: background 0.3s;
}

.quality-option:hover {
    background: rgba(255, 255, 255, 0.2);
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}`;
document.head.appendChild(style);