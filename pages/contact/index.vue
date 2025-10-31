<!-- pages/index.vue -->
<template>
  <div class="landing-page">
    <div class="hero-container">
      <!-- Left Side - Image & Text -->
      <div class="hero-left">
        <div class="overlay"></div>
        <div class="hero-content">
          <p class="contact-label">Contact Our Team</p>
          <h1 class="hero-title">Getting a car has never been simpler!</h1>
          
          <div class="contact-info">
            <div class="contact-item">
              <i class="fas fa-phone"></i>
              <a href="tel:+14156194812">+1 415-619-4812</a>
            </div>
            <div class="contact-item">
              <i class="fas fa-map-marker-alt"></i>
              <span>Los Angeles, California</span>
            </div>
            <div class="contact-item">
              <i class="fas fa-globe"></i>
              <span>Serving all of CA</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Side - Form -->
      <div class="hero-right">
        <div class="form-container">
          <div class="logo">
            <i class="fas fa-plus-circle logo-icon"></i>
            <span class="logo-text">ASTORIA MOTORS</span>
          </div>

          <form @submit.prevent="handleSubmit" class="contact-form">
            <div class="form-row">
              <input
                v-model="formData.firstName"
                type="text"
                placeholder="First name*"
                required
                class="form-input"
                :disabled="loading"
              />
              <input
                v-model="formData.lastName"
                type="text"
                placeholder="Last name*"
                required
                class="form-input"
                :disabled="loading"
              />
            </div>

            <input
              v-model="formData.phone"
              type="tel"
              placeholder="Phone number*"
              required
              class="form-input full-width"
              :disabled="loading"
            />

            <textarea
              v-model="formData.preferences"
              placeholder="Do you have any specific make or model preferences?*"
              required
              class="form-textarea"
              rows="5"
              :disabled="loading"
            ></textarea>

            <div v-if="error" class="error-message">
              {{ error }}
            </div>

            <div v-if="success" class="success-message">
              ✅ Message sent successfully! We will contact you soon.
            </div>

            <button type="submit" class="submit-btn" :disabled="loading">
              {{ loading ? 'Sending...' : 'Send Message' }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRuntimeConfig } from 'nuxt/app';

useHead({
  link: [
    {
      rel: 'stylesheet',
      href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
    }
  ]
});

const config = useRuntimeConfig();

const formData = ref({
  firstName: '',
  lastName: '',
  phone: '',
  preferences: ''
});

const loading = ref(false);
const error = ref('');
const success = ref(false);

const handleSubmit = async () => {
  loading.value = true;
  error.value = '';
  success.value = false;

  try {
    const API_URL = config.public.API_URL;
    const API_TOKEN = config.public.API_TOKEN;

    const response = await $fetch(`${API_URL}/requests-forms`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: {
        data: {
          FirstName: formData.value.firstName,
          LastName: formData.value.lastName,
          Number: formData.value.phone,
          Description: formData.value.preferences
        }
      }
    });

    console.log('✅ Form submitted successfully:', response);
    
    success.value = true;
    
    // Reset form
    formData.value = {
      firstName: '',
      lastName: '',
      phone: '',
      preferences: ''
    };

    // Hide success message after 5 seconds
    setTimeout(() => {
      success.value = false;
    }, 5000);

  } catch (err) {
    console.error('❌ Form submission error:', err);
    error.value = 'Failed to send message. Please try again.';
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.landing-page {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

.hero-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 100vh;
}

.hero-left {
  position: relative;
  background-image: url('https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=1200&h=1200&fit=crop');
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px;
}

.overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
}

.hero-content {
  position: relative;
  z-index: 1;
  color: white;
  max-width: 600px;
}

.contact-label {
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 24px;
  opacity: 0.9;
}

.hero-title {
  font-size: 56px;
  font-weight: 700;
  line-height: 1.1;
  margin-bottom: 60px;
  letter-spacing: -1px;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 18px;
}

.contact-item i {
  font-size: 20px;
  width: 24px;
}

.contact-item a {
  color: white;
  text-decoration: none;
  transition: opacity 0.3s;
}

.contact-item a:hover {
  opacity: 0.8;
}

.hero-right {
  background: #f8f8f8;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px;
}

.form-container {
  width: 100%;
  max-width: 500px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 60px;
}

.logo-icon {
  font-size: 24px;
  color: #333;
}

.logo-text {
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: #333;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.form-input,
.form-textarea {
  padding: 16px 20px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 15px;
  font-family: inherit;
  background: white;
  transition: border-color 0.3s;
}

.form-input:disabled,
.form-textarea:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: #333;
}

.form-input.full-width {
  width: 100%;
}

.form-textarea {
  resize: vertical;
  min-height: 120px;
}

.error-message {
  padding: 12px 16px;
  background: #fee;
  border: 1px solid #fcc;
  border-radius: 6px;
  color: #c33;
  font-size: 14px;
}

.success-message {
  padding: 12px 16px;
  background: #efe;
  border: 1px solid #cfc;
  border-radius: 6px;
  color: #373;
  font-size: 14px;
}

.submit-btn {
  background: #2d2d2d;
  color: white;
  padding: 16px 40px;
  border: none;
  border-radius: 6px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s;
  align-self: flex-start;
}

.submit-btn:hover:not(:disabled) {
  background: #1a1a1a;
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

@media (max-width: 1024px) {
  .hero-container {
    grid-template-columns: 1fr;
  }

  .hero-left {
    min-height: 60vh;
    padding: 40px;
  }

  .hero-title {
    font-size: 42px;
  }

  .hero-right {
    padding: 40px;
  }
}

@media (max-width: 640px) {
  .hero-title {
    font-size: 32px;
  }

  .form-row {
    grid-template-columns: 1fr;
  }

  .hero-left,
  .hero-right {
    padding: 30px 20px;
  }
}
</style>