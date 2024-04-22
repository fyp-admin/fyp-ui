// Get all step descriptions
const stepDescriptions = document.querySelectorAll('.step-description');

// Hide all step descriptions initially
stepDescriptions.forEach(description => {
    description.style.opacity = '0';
  });

// Display each step description one by one after each book animation
let currentIndex = 0;
const showNextDescription = () => {
  if (currentIndex < stepDescriptions.length) {
    stepDescriptions[currentIndex].style.display = 'block';
    stepDescriptions[currentIndex].style.opacity = '1';
    currentIndex++;
    stepsCompleted++;
    checkStepsCompleted()
  } else {
    clearInterval(interval);
  }
};

const interval = setInterval(showNextDescription, 4000); // Adjust timing as needed



// Assume generatedVideoUrl is the URL of the generated video
let stepsCompleted = 0;
const totalSteps = 4;

// Function to check if all steps are completed
const checkStepsCompleted = () => {
  if (stepsCompleted === totalSteps) {
    // Show video and download button
    document.getElementById('video-wrapper').classList.remove('hidden');
    document.getElementById('download-button').classList.remove('hidden');
  }
};

// Set the source of the video tag and handle download button click
window.onload = () => {
  // Set the source of the video tag
  const video = document.getElementById('generated-video');
  video.src = generatedVideoUrl;

  // Download button functionality
  const downloadButton = document.getElementById('download-button');
  downloadButton.addEventListener('click', () => {
    const a = document.createElement('a');
    a.href = generatedVideoUrl;
    a.download = 'generated_video.mp4';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  });
};

// After each step is completed, increment stepsCompleted and check if all steps are completed
// Example: after each book animation
