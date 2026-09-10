// ==========================================
// MUST DISPENSARY - JAVASCRIPT
// ==========================================

// Change this if your backend runs on a different host/port
const API_BASE_URL = "http://localhost:5000/api";

// ==========================================
// 1. APPOINTMENT FORM
// ==========================================

const appointmentForm = document.getElementById("appointmentForm");

if (appointmentForm) {

    appointmentForm.addEventListener("submit", async function(event) {

        // Prevent page from refreshing
        event.preventDefault();

        const confirmation = document.getElementById("confirmationMessage");
        const submitBtn = appointmentForm.querySelector(".appointment-btn");

        // Collect all form fields into an object matching the backend model
        const formData = {
            fullname: document.getElementById("fullname").value,
            registration: document.getElementById("registration").value,
            phone: document.getElementById("phone").value,
            email: document.getElementById("email").value,
            gender: document.getElementById("gender").value,
            date: document.getElementById("date").value,
            time: document.getElementById("time").value,
            service: document.getElementById("service").value,
            reason: document.getElementById("reason").value,
        };

        submitBtn.disabled = true;
        submitBtn.textContent = "Submitting...";

        try {
            const response = await fetch(`${API_BASE_URL}/appointments`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (response.ok && result.success) {
                confirmation.innerHTML = `
                    <div class="success-message">
                        <h3>✅ Appointment Request Submitted!</h3>
                        <p>Thank you, <strong>${formData.fullname}</strong>.</p>
                        <p>Your appointment request for <strong>${formData.service}</strong> has been received.</p>
                        <p>Date: <strong>${formData.date}</strong></p>
                        <p>Time: <strong>${formData.time}</strong></p>
                    </div>
                `;
                appointmentForm.reset();
            } else {
                const errorMsg = result.errors
                    ? result.errors.map(e => e.msg).join(", ")
                    : result.message || "Something went wrong. Please try again.";

                confirmation.innerHTML = `
                    <div class="error-message">
                        <h3>⚠️ Could not submit appointment</h3>
                        <p>${errorMsg}</p>
                    </div>
                `;
            }
        } catch (error) {
            confirmation.innerHTML = `
                <div class="error-message">
                    <h3>⚠️ Connection error</h3>
                    <p>Could not reach the server. Please check your connection and try again.</p>
                </div>
            `;
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = "Book Appointment";
        }

    });

}


// ==========================================
// 2. CONTACT FORM
// ==========================================

const contactForm = document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", async function(event) {

        // Prevent page refresh
        event.preventDefault();

        const contactMessage = document.getElementById("contactMessage");
        const submitBtn = contactForm.querySelector('button[type="submit"]');

        const formData = {
            name: document.getElementById("name").value,
            email: document.getElementById("contactEmail").value,
            message: document.getElementById("message").value,
        };

        if (submitBtn) {
            submitBtn.disabled = true;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/contact`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (response.ok && result.success) {
                contactMessage.innerHTML = `
                    <div class="success-message">
                        <h3>✅ Message Sent Successfully!</h3>
                        <p>Thank you, <strong>${formData.name}</strong>. We have received your message.</p>
                    </div>
                `;
                contactForm.reset();
            } else {
                const errorMsg = result.errors
                    ? result.errors.map(e => e.msg).join(", ")
                    : result.message || "Something went wrong. Please try again.";

                contactMessage.innerHTML = `
                    <div class="error-message">
                        <h3>⚠️ Could not send message</h3>
                        <p>${errorMsg}</p>
                    </div>
                `;
            }
        } catch (error) {
            contactMessage.innerHTML = `
                <div class="error-message">
                    <h3>⚠️ Connection error</h3>
                    <p>Could not reach the server. Please check your connection and try again.</p>
                </div>
            `;
        } finally {
            if (submitBtn) {
                submitBtn.disabled = false;
            }
        }

    });

}


// ==========================================
// 3. SET MINIMUM APPOINTMENT DATE
// ==========================================

const appointmentDate = document.getElementById("date");

if (appointmentDate) {

    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    const todayDate = `${year}-${month}-${day}`;

    appointmentDate.min = todayDate;

}


// ==========================================
// 4. CONFIRM BEFORE LEAVING APPOINTMENT
// ==========================================

const appointmentLinks = document.querySelectorAll('a[href="appointment.html"]');

appointmentLinks.forEach(function(link) {
    link.addEventListener("click", function() {
        console.log("Opening appointment page...");
    });
});


// ==========================================
// 5. CURRENT YEAR IN FOOTER
// ==========================================

const footerYear = document.querySelector("footer p");

if (footerYear) {
    const currentYear = new Date().getFullYear();
    footerYear.innerHTML = `&copy; ${currentYear} MUST Dispensary. All Rights Reserved.`;
}
