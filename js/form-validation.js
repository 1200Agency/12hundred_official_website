// ===================================
// FORM VALIDATION MODULE
// ===================================

/**
 * ContactForm class handles form validation and submission
 */
class ContactForm {
    constructor() {
        this.form = document.querySelector('.contact-form');
        if (!this.form) return;

        this.inputs = this.form.querySelectorAll('input, textarea, select');
        this.submitBtn = this.form.querySelector('.form-submit');
        this.successMessage = document.getElementById('form-success');
        this.errorMessage = document.getElementById('form-error');

        this.init();
    }

    init() {
        this.setupValidation();
        this.setupSubmission();
    }

    /**
     * Set up real-time validation on form fields
     */
    setupValidation() {
        this.inputs.forEach(input => {
            // Validate on blur
            input.addEventListener('blur', () => this.validateField(input));

            // Clear error on input
            input.addEventListener('input', () => this.clearError(input));
        });
    }

    /**
     * Validate a single field
     * @param {HTMLElement} field - The field to validate
     * @returns {boolean} - Whether the field is valid
     */
    validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        let errorMessage = '';

        // Check if required field is empty
        if (field.hasAttribute('required') && !value) {
            errorMessage = 'This field is required';
        }
        // Email validation
        else if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                errorMessage = 'Please enter a valid email address';
            }
        }
        // Select validation
        else if (field.tagName === 'SELECT' && field.hasAttribute('required') && !value) {
            errorMessage = 'Please select an option';
        }
        // Message length validation
        else if (field.name === 'message' && value && value.length < 10) {
            errorMessage = 'Please provide more details (at least 10 characters)';
        }

        // Show or clear error
        if (errorMessage) {
            this.showError(field, errorMessage);
            return false;
        } else {
            this.clearError(field);
            return true;
        }
    }

    /**
     * Show error message for a field
     * @param {HTMLElement} field - The field with error
     * @param {string} message - Error message to display
     */
    showError(field, message) {
        const formGroup = field.closest('.form-group');
        const errorElement = formGroup.querySelector('.form-error');

        field.classList.add('error');
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
    }

    /**
     * Clear error message for a field
     * @param {HTMLElement} field - The field to clear error from
     */
    clearError(field) {
        const formGroup = field.closest('.form-group');
        const errorElement = formGroup.querySelector('.form-error');

        field.classList.remove('error');
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.style.display = 'none';
        }
    }

    /**
     * Validate all form fields
     * @returns {boolean} - Whether all fields are valid
     */
    validateAll() {
        let isValid = true;

        this.inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });

        return isValid;
    }

    /**
     * Set up form submission handling
     */
    setupSubmission() {
        this.form.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Hide any previous messages
            this.hideMessages();

            // Validate all fields
            if (!this.validateAll()) {
                // Scroll to first error
                const firstError = this.form.querySelector('.error');
                if (firstError) {
                    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
                return;
            }

            // Show loading state
            this.setLoadingState(true);

            // Submit form
            try {
                const formData = new FormData(this.form);
                const response = await fetch(this.form.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    this.showSuccess();
                    this.form.reset();
                } else {
                    this.showError();
                }
            } catch (error) {
                console.error('Form submission error:', error);
                this.showError();
            } finally {
                this.setLoadingState(false);
            }
        });
    }

    /**
     * Set loading state on submit button
     * @param {boolean} loading - Whether form is loading
     */
    setLoadingState(loading) {
        if (loading) {
            this.submitBtn.classList.add('loading');
            this.submitBtn.disabled = true;
        } else {
            this.submitBtn.classList.remove('loading');
            this.submitBtn.disabled = false;
        }
    }

    /**
     * Show success message
     */
    showSuccess() {
        this.successMessage.style.display = 'flex';
        this.successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });

        // Hide after 10 seconds
        setTimeout(() => {
            this.successMessage.style.display = 'none';
        }, 10000);
    }

    /**
     * Show error message
     */
    showError() {
        this.errorMessage.style.display = 'flex';
        this.errorMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });

        // Hide after 10 seconds
        setTimeout(() => {
            this.errorMessage.style.display = 'none';
        }, 10000);
    }

    /**
     * Hide all messages
     */
    hideMessages() {
        this.successMessage.style.display = 'none';
        this.errorMessage.style.display = 'none';
    }
}

export default ContactForm;
