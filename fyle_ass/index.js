document.addEventListener('DOMContentLoaded', function() {
    const button = document.getElementById('switch-division-btn');
    if (button) {
        button.addEventListener('click', function() {
            const divisionContainer = document.getElementById('division-container');
            const division1 = document.getElementById('division1');

            // Remove the first division
            if (division1) {
                divisionContainer.removeChild(division1);
            }

            // Create a new division
            const division2 = document.createElement('div');
            division2.id = 'division2';
            division2.className = 'division';
            division2.innerHTML = `
                <div class="form-container">
                    <label class="form-label">Talk to us</label>
                    <form class="contact-form" id="contact-form">
                        <input type="email" placeholder="Work email*" name="e-mail" class="form-input full-width" required>
                        <div class="side-by-side">
                            <input type="text" placeholder="First name*" name="firstname" class="form-input" required>
                            <input type="text" placeholder="Last name*" name="lastname" class="form-input" required>
                        </div>
                        <label class="checkbox-container">
                            <input type="checkbox" class="form-checkbox" name="terms" required>
                            <span class="checkbox-message">I agree to Fyle's terms and conditions, and provide<br>consent to send me communication.</span>
                        </label>
                        <button type="submit" class="contact-button">Contact Us</button>
                    </form>
                </div>
            `;

            // Add the new division to the container
            divisionContainer.appendChild(division2);

            // Re-assign the form variable to the new form and add the submit event listener
            const form = document.getElementById('contact-form');
            form.addEventListener('submit', function(event) {
                event.preventDefault(); // Prevent the default form submission

                const formData = new FormData(form);

                // Convert form data to a plain object
                const data = Object.fromEntries(formData.entries());

                // Function to send form data to API endpoint with retry mechanism
                function sendDataWithRetry(data, retriesLeft = 3, delay = 1000) {
                    fetch('https://getform.io/f/paoxnneb', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(data)
                    })
                    .then(response => {
                        // Log the full response for debugging
                        console.log('Response:', response);

                        // Check if response is not JSON
                        if (!response.ok || !response.headers.get('content-type').includes('application/json')) {
                            return response.text().then(text => { // Read response as text
                                throw new Error(`Invalid response from server: ${text}`);
                            });
                        }
                        return response.json();
                    })
                    .then(data => {
                        console.log('Success:', data);
                        alert('Form submitted successfully!');
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                        alert('Form submission failed.');
                    });
                }

                // Start sending form data with retry mechanism
                sendDataWithRetry(data);
            });
        });
    }

    const nextPageButton = document.getElementById('next-page-btn');
    if (nextPageButton) {
        nextPageButton.addEventListener('click', function() {
            window.open('https://www.fylehq.com/', '_blank');
        });
    }
});
