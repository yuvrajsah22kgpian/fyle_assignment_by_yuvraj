let currentIndex = 0;

function updateSliderPosition() {
    const slideWidth = document.querySelector('.slider-wrapper').offsetWidth / 3;
    const slider = document.querySelector('.slider');
    slider.style.transform = `translateX(${-slideWidth * currentIndex}px)`;

    updateIndicators();
}

function updateIndicators() {
    const indicators = document.querySelectorAll('.indicator');
    indicators.forEach((indicator, index) => {
        if (index === currentIndex) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
}

function jumpToSlide(index) {
    currentIndex = index;
    updateSliderPosition();
}

function autoSlide() {
    const totalSlides = Math.ceil(document.querySelectorAll('.card').length / 3);
    currentIndex = (currentIndex + 1) % totalSlides;
    updateSliderPosition();
}

// Initialize the first slide position
updateSliderPosition();

// Set interval for automatic sliding
setInterval(autoSlide, 3000); // Change slide every 3 seconds

document.addEventListener('DOMContentLoaded', function() {
    const divisions = document.querySelectorAll('.clickable-division');
    const image = document.getElementById("image-container");
    
    // Define the images to switch to
    const images = [
        'transparent url(corporate-management-strategy-solution-branding-concept.jpg) 0% 0% no-repeat padding-box', // Change these paths to your actual image paths
        'transparent url(Home/image.png) 0% 0% no-repeat padding-box', // Change these paths to your actual image paths
        'transparent url(hand-holding-smartphone-social-media-concept.jpg) 0% 0% no-repeat padding-box', // Change these paths to your actual image paths
    ];
    let activeDivision = null;

    divisions.forEach((division, index) => {
        division.addEventListener('click', function() {
            // Reset the color of the previously active division
            if (activeDivision && activeDivision !== division) {
                activeDivision.style.backgroundColor = ' #F6F6F6';
            }

            // Set the new active division and change its background color
            activeDivision = division;
            division.style.backgroundColor = '#FF3147'; // Change to desired color
            image.style.background = images[index];
        })
    });
});

