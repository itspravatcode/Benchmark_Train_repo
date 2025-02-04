const imageArr = [
    'https://picsum.photos/id/13/600/400',
    'https://picsum.photos/id/14/600/400',
    'https://picsum.photos/id/19/600/400',
    'https://picsum.photos/id/21/600/400'
];

// Preload images for smoother transitions
imageArr.forEach((src) => {
    const img = new Image();
    img.src = src;
});

const imageElement = document.querySelector('#img');
let currentIndex = 0; // Start with the first image

// Set the default image
imageElement.src = imageArr[currentIndex];
imageElement.alt = `Image ${currentIndex + 1}`;

// Add event listener for button clicks
document.querySelector('.btn-group').addEventListener("click", (e) => {
    if (e.target.classList.contains("btn1")) {
        // Scroll to the left
        currentIndex = (currentIndex - 1 + imageArr.length) % imageArr.length;
    }
    if (e.target.classList.contains("btn2")) {
        // Scroll to the right
        currentIndex = (currentIndex + 1) % imageArr.length;
    }

    // Update the image and alt attribute
    imageElement.style.opacity = 0; // Fade out
    setTimeout(() => {
        imageElement.src = imageArr[currentIndex];
        imageElement.alt = `Image ${currentIndex + 1}`;
        imageElement.style.opacity = 1; // Fade in
    }, 300);
});
