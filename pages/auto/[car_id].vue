<template>
  <div class="wrapper">
    <!-- Loader -->
    <div v-if="pending" class="loader-container">
      <div class="loader"></div>
      <p>Loading car details...</p>
    </div>

    <!-- Error -->
    <div v-else-if="error" class="error-container">
      <p>{{ errorMessage }}</p>
      <button @click="refresh" class="retry-btn">Retry</button>
    </div>

    <!-- Car Details -->
    <div v-else-if="car" class="container">
      <div class="content">
        <!-- Image Gallery Column -->
        <div class="image-column">
          <!-- Skeleton Loader -->
          <div v-if="!imagesLoaded" class="skeleton-wrapper">
            <div class="skeleton-main-image"></div>
            <div class="skeleton-thumbnails">
              <div v-for="n in 4" :key="n" class="skeleton-thumbnail"></div>
            </div>
          </div>

          <!-- Actual Gallery -->
          <div v-show="imagesLoaded" class="gallery-wrapper">
            <div class="main-image-wrapper">
              <transition name="fade" mode="out-in">
                <img
                  :key="currentImageIndex"
                  :src="currentImage"
                  :alt="`${car.Year} ${car.manufacturer?.Name} ${car.model}`"
                  class="car-image"
                  @load="onMainImageLoad"
                />
              </transition>
              
              <!-- Navigation Arrows -->
              <button 
                v-if="car.Photo && car.Photo.length > 1"
                @click="previousImage" 
                class="nav-arrow prev-arrow"
                aria-label="Previous image"
              >
                <i class="fa-solid fa-chevron-left"></i>
              </button>
              <button 
                v-if="car.Photo && car.Photo.length > 1"
                @click="nextImage" 
                class="nav-arrow next-arrow"
                aria-label="Next image"
              >
                <i class="fa-solid fa-chevron-right"></i>
              </button>

              <!-- Image Counter -->
              <div v-if="car.Photo && car.Photo.length > 1" class="image-counter">
                {{ currentImageIndex + 1 }} / {{ car.Photo.length }}
              </div>
            </div>
            
            <!-- Thumbnail Gallery -->
            <div v-if="car.Photo && car.Photo.length > 1" class="thumbnails">
              <button
                v-for="(photo, index) in car.Photo"
                :key="photo.id"
                @click="selectImage(index)"
                class="thumbnail"
                :class="{ active: currentImageIndex === index }"
              >
                <img 
                  :src="getThumbnail(photo)" 
                  :alt="`View ${index + 1}`"
                  loading="lazy"
                />
                <div class="thumbnail-overlay"></div>
              </button>
            </div>
          </div>
        </div>

        <!-- Info Column -->
        <div class="form-column">
          <div class="form-content">
            <!-- Car Title -->
            <h1 class="title">
              {{ car.Year }} {{ car.manufacturer?.Name }} {{ car.model }}
            </h1>

            <!-- Price -->
            <div class="price">
              <h2>${{ formatNumber(car.Downpayment) }} down - ${{ formatNumber(car.MonthlyRate) }} / month</h2>
            </div>

            <!-- Car Details -->
            <div class="car-specs">
              <div class="spec-item" v-if="car.color">
                <i class="fa-solid fa-palette"></i>
                <span>Color: {{ car.color.Color }}</span>
              </div>
              <div class="spec-item" v-if="car.engine_type">
                <i class="fa-solid fa-gas-pump"></i>
                <span>Engine: {{ car.engine_type.type }}</span>
              </div>
              <div class="spec-item" v-if="car.Mileage">
                <i class="fa-solid fa-road"></i>
                <span>Mileage: {{ car.Mileage }}k miles/year</span>
              </div>
              <div class="spec-item" v-if="car.MinimumLeaseMonths">
                <i class="fa-solid fa-calendar"></i>
                <span>Lease: {{ car.MinimumLeaseMonths }} months</span>
              </div>
            </div>

            <p class="subtitle">
              All our deals are pre-negotiated for your convenience.
            </p>

            <!-- Pre-Approval Button -->
            <button 
              @click="openPreApprovalModal" 
              class="preapproval-btn"
            >
              Apply for Pre-Approval
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Pre-Approval Modal -->
    <GenericModal
      :isVisible="isModalVisible"
      title="Astoria Motors Pre-Approval Application"
      :actions="[]"
      @close="closeModal"
    >
      <div class="modal-form-content">
        <form @submit.prevent="handlePreApprovalSubmit">
          <!-- Personal Information Section -->
          <div class="section-card">
            <h4 class="section-title">
              <i class="fa-solid fa-user"></i>
              Personal Information
            </h4>

            <div class="form-grid">
              <div class="form-group full-width">
                <label>Full Name <span class="required">*</span></label>
                <input v-model="preApprovalForm.fullName" type="text" required class="modal-input" />
              </div>

              <div class="form-group">
                <label>Date of Birth <span class="required">*</span></label>
                <input v-model="preApprovalForm.dateOfBirth" type="date" required class="modal-input" />
              </div>

              <div class="form-group">
                <label>Driver License Number <span class="required">*</span></label>
                <input v-model="preApprovalForm.driverLicense" type="text" required class="modal-input" />
              </div>

              <div class="form-group">
                <label>Email <span class="required">*</span></label>
                <input v-model="preApprovalForm.email" type="email" required class="modal-input" />
              </div>

              <div class="form-group">
                <label>Phone number <span class="required">*</span></label>
                <input v-model="preApprovalForm.phone" type="tel" required class="modal-input" placeholder="+1 (555) 123-4567" />
              </div>

              <div class="form-group full-width">
                <label>Social Security Number <span class="required">*</span></label>
                <input v-model="preApprovalForm.ssn" type="text" required class="modal-input" placeholder="XXX-XX-XXXX" />
              </div>
            </div>
          </div>

          <!-- Current Address Section -->
          <div class="section-card">
            <h4 class="section-title">
              <i class="fa-solid fa-location-dot"></i>
              Current Address
            </h4>
            
            <div class="form-grid">
              <div class="form-group full-width">
                <label>Street Address</label>
                <input v-model="preApprovalForm.currentAddress.street" type="text" class="modal-input" />
              </div>

              <div class="form-group full-width">
                <label>Address Line 2</label>
                <input v-model="preApprovalForm.currentAddress.addressLine2" type="text" class="modal-input" placeholder="Apt, Suite, etc." />
              </div>

              <div class="form-group">
                <label>City</label>
                <input v-model="preApprovalForm.currentAddress.city" type="text" class="modal-input" />
              </div>

              <div class="form-group">
                <label>State/Region</label>
                <input v-model="preApprovalForm.currentAddress.state" type="text" class="modal-input" />
              </div>

              <div class="form-group">
                <label>Postal / Zip Code</label>
                <input v-model="preApprovalForm.currentAddress.zip" type="text" class="modal-input" />
              </div>

              <div class="form-group">
                <label>Country</label>
                <select v-model="preApprovalForm.currentAddress.country" class="modal-input">
                  <option value="">Select Country...</option>
                  <option value="United States">United States</option>
                  <option value="Canada">Canada</option>
                  <option value="Mexico">Mexico</option>
                </select>
              </div>

              <div class="form-group">
                <label>Time at address <span class="required">*</span></label>
                <input v-model="preApprovalForm.yearsAtAddress" type="text" required class="modal-input" placeholder="e.g., 2 years 3 months" />
              </div>

              <div class="form-group">
                <label>Residence type <span class="required">*</span></label>
                <select v-model="preApprovalForm.residenceType" required class="modal-input">
                  <option value="">Select...</option>
                  <option value="own">Own</option>
                  <option value="rent">Rent</option>
                  <option value="relatives">Living with relatives</option>
                </select>
              </div>

              <div class="form-group full-width">
                <label>Rent / mortgage payment per month</label>
                <div class="input-with-prefix">
                  <span class="prefix">$</span>
                  <input v-model="preApprovalForm.monthlyPayment" type="number" class="modal-input with-prefix" placeholder="0" />
                </div>
              </div>
            </div>
          </div>

          <!-- Previous Address Section -->
          <div class="section-card">
            <h4 class="section-title">
              <i class="fa-solid fa-clock-rotate-left"></i>
              Previous Address <span class="optional-label">(if applicable)</span>
            </h4>
            
            <div class="form-grid">
              <div class="form-group full-width">
                <label>Street Address</label>
                <input v-model="preApprovalForm.previousAddress.street" type="text" class="modal-input" />
              </div>

              <div class="form-group full-width">
                <label>Address Line 2</label>
                <input v-model="preApprovalForm.previousAddress.addressLine2" type="text" class="modal-input" placeholder="Apt, Suite, etc." />
              </div>

              <div class="form-group">
                <label>City</label>
                <input v-model="preApprovalForm.previousAddress.city" type="text" class="modal-input" />
              </div>

              <div class="form-group">
                <label>State/Region</label>
                <input v-model="preApprovalForm.previousAddress.state" type="text" class="modal-input" />
              </div>

              <div class="form-group">
                <label>Postal / Zip Code</label>
                <input v-model="preApprovalForm.previousAddress.zip" type="text" class="modal-input" />
              </div>

              <div class="form-group">
                <label>Country</label>
                <select v-model="preApprovalForm.previousAddress.country" class="modal-input">
                  <option value="">Select Country...</option>
                  <option value="United States">United States</option>
                  <option value="Canada">Canada</option>
                  <option value="Mexico">Mexico</option>
                </select>
              </div>

              <div class="form-group full-width">
                <label>Time at previous address</label>
                <input v-model="preApprovalForm.yearsAtPreviousAddress" type="text" class="modal-input" placeholder="e.g., 1 year 6 months" />
              </div>
            </div>
          </div>

          <!-- Employment Section -->
          <div class="section-card">
            <h4 class="section-title">
              <i class="fa-solid fa-briefcase"></i>
              Employment Information
            </h4>
            
            <div class="form-grid">
              <div class="form-group">
                <label>Employment type <span class="required">*</span></label>
                <select v-model="preApprovalForm.employmentType" required class="modal-input">
                  <option value="">Select...</option>
                  <option value="fulltime">Full Time</option>
                  <option value="selfemployed">Self Employed</option>
                </select>
              </div>

              <div class="form-group">
                <label>Time at employment <span class="required">*</span></label>
                <input v-model="preApprovalForm.timeAtEmployment" type="text" required class="modal-input" placeholder="e.g., 3 years 2 months" />
              </div>

              <div class="form-group full-width">
                <label>Company Name <span class="required">*</span></label>
                <input v-model="preApprovalForm.companyName" type="text" required class="modal-input" />
              </div>

              <div class="form-group">
                <label>Position <span class="required">*</span></label>
                <input v-model="preApprovalForm.position" type="text" required class="modal-input" />
              </div>

              <div class="form-group">
                <label>Employer phone <span class="required">*</span></label>
                <input v-model="preApprovalForm.employerPhone" type="tel" required class="modal-input" placeholder="+1 (555) 123-4567" />
              </div>
            </div>

            <div class="subsection-header">Company Address</div>
            
            <div class="form-grid">
              <div class="form-group full-width">
                <label>Street Address</label>
                <input v-model="preApprovalForm.companyAddress.street" type="text" class="modal-input" />
              </div>

              <div class="form-group full-width">
                <label>Address Line 2</label>
                <input v-model="preApprovalForm.companyAddress.addressLine2" type="text" class="modal-input" placeholder="Suite, Floor, etc." />
              </div>

              <div class="form-group">
                <label>City</label>
                <input v-model="preApprovalForm.companyAddress.city" type="text" class="modal-input" />
              </div>

              <div class="form-group">
                <label>State/Region</label>
                <input v-model="preApprovalForm.companyAddress.state" type="text" class="modal-input" />
              </div>

              <div class="form-group">
                <label>Postal / Zip Code</label>
                <input v-model="preApprovalForm.companyAddress.zip" type="text" class="modal-input" />
              </div>

              <div class="form-group">
                <label>Country</label>
                <select v-model="preApprovalForm.companyAddress.country" class="modal-input">
                  <option value="">Select Country...</option>
                  <option value="United States">United States</option>
                  <option value="Canada">Canada</option>
                  <option value="Mexico">Mexico</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Income Section -->
          <div class="section-card">
            <h4 class="section-title">
              <i class="fa-solid fa-dollar-sign"></i>
              Income Information
            </h4>

            <div class="form-grid">
              <div class="form-group">
                <label>Gross Annual Income <span class="required">*</span></label>
                <div class="input-with-prefix">
                  <span class="prefix">$</span>
                  <input v-model="preApprovalForm.annualIncome" type="number" required class="modal-input with-prefix" placeholder="0" />
                </div>
              </div>

              <div class="form-group">
                <label>Other annual income</label>
                <div class="input-with-prefix">
                  <span class="prefix">$</span>
                  <input v-model="preApprovalForm.otherIncome" type="number" class="modal-input with-prefix" placeholder="0" />
                </div>
                <small class="field-help">If you have any additional income</small>
              </div>
            </div>
          </div>

          <!-- Terms Section -->
          <div class="section-card terms-section">
            <h4 class="section-title">
              <i class="fa-solid fa-file-contract"></i>
              Terms & Authorization
            </h4>

            <div class="info-box">
              <p><strong>By signing this application form, I hereby give the right to obtain a consumer credit report regarding me for this application and the car loan should my application be approved.</strong></p>
              <p>I also release from all liability all persons, companies, and corporations supplying such information. I indemnify all persons, companies, corporations and banks against any liability that might result from making such an investigation.</p>
              <p>I certify that the information above is correct to the best of my knowledge. I authorize dealer, financial institutions and banks to make inquiries as necessary to verify the accuracy of the statements made by me and to determine my creditworthiness.</p>
            </div>

            <div class="form-group checkbox-group">
              <label class="checkbox-label">
                <input v-model="preApprovalForm.creditReportPermission" type="checkbox" required />
                <span>I accept the Terms and Conditions <span class="required">*</span></span>
              </label>
            </div>

            <div class="form-group">
              <label>E-Signature <span class="required">*</span></label>
              <input v-model="preApprovalForm.signature" type="text" required class="modal-input" placeholder="Type your full name" />
              <small class="field-help">Please type your full name as your electronic signature</small>
            </div>
          </div>

          <!-- Submit Button -->
          <button type="submit" class="modal-submit-btn" :disabled="isSubmitting">
            <i class="fa-solid fa-paper-plane"></i>
            {{ isSubmitting ? 'Submitting...' : 'Submit Application' }}
          </button>

          <div v-if="submitMessage" class="message">
            <div class="alert" :class="submitSuccess ? 'alert-success' : 'alert-danger'">
              {{ submitMessage }}
            </div>
          </div>
        </form>
      </div>
    </GenericModal>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, nextTick } from 'vue';
import { useRoute, useRuntimeConfig } from 'nuxt/app';
import GenericModal from '~/components/GenericModal.vue';

const route = useRoute();
const config = useRuntimeConfig();

const currentImageIndex = ref(0);
const imagesLoaded = ref(false);
const loadedImagesCount = ref(0);
const isModalVisible = ref(false);
const isSubmitting = ref(false);
const submitMessage = ref('');
const submitSuccess = ref(false);

const { data: car, pending, error, refresh } = await useLazyAsyncData(
  `car-${route.params.car_id}`,
  async () => {
    const carId = route.params.car_id;
    
    try {
      const API_URL = `${config.public.API_URL}/cars?populate=*`;
      const API_TOKEN = config.public.API_TOKEN;

      const response = await $fetch(API_URL, {
        headers: {
          'Authorization': `Bearer ${API_TOKEN}`
        }
      });

      const foundCar = response.data.find(c => {
        return c.slug_car === carId || c.documentId === carId;
      });

      if (!foundCar) {
        throw new Error('Car not found');
      }

      return {
        id: foundCar.id,
        documentId: foundCar.documentId,
        model: foundCar.model,
        Year: foundCar.Year,
        Downpayment: foundCar.Downpayment,
        MonthlyRate: foundCar.MonthlyRate,
        MinimumLeaseMonths: foundCar.MinimumLeaseMonths,
        Mileage: foundCar.Mileage,
        slug_car: foundCar.slug_car,
        manufacturer: foundCar.manufacturer,
        engine_type: foundCar.engine_type,
        color: foundCar.color,
        Photo: foundCar.Photo || []
      };
    } catch (err) {
      console.error('Error fetching car details:', err);
      throw err;
    }
  },
  {
    watch: [() => route.params.car_id]
  }
);

const errorMessage = computed(() => {
  if (!error.value) return '';
  return error.value.message === 'Car not found' 
    ? 'Car not found. Please check the URL.' 
    : 'Failed to load car details. Please try again later.';
});

const preApprovalForm = ref({
  fullName: '',
  dateOfBirth: '',
  email: '',
  phone: '',
  ssn: '',
  driverLicense: '',
  currentAddress: {
    street: '',
    addressLine2: '',
    city: '',
    state: '',
    zip: '',
    country: 'United States'
  },
  yearsAtAddress: '',
  residenceType: '',
  monthlyPayment: '',
  previousAddress: {
    street: '',
    addressLine2: '',
    city: '',
    state: '',
    zip: '',
    country: ''
  },
  yearsAtPreviousAddress: '',
  employmentType: '',
  companyName: '',
  position: '',
  employerPhone: '',
  companyAddress: {
    street: '',
    addressLine2: '',
    city: '',
    state: '',
    zip: '',
    country: ''
  },
  timeAtEmployment: '',
  annualIncome: '',
  otherIncome: '',
  creditReportPermission: false,
  signature: ''
});

const formatNumber = (num) => {
  if (!num) return '0';
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const getImageUrl = (photo, format = 'large') => {
  if (!photo) return 'https://via.placeholder.com/1200x900/cccccc/666666?text=No+Image';
  return photo.formats?.[format]?.url || photo.url;
};

const currentImage = computed(() => {
  if (!car.value?.Photo || car.value.Photo.length === 0) {
    return 'https://via.placeholder.com/1200x900/cccccc/666666?text=No+Image';
  }
  const photo = car.value.Photo[currentImageIndex.value];
  return getImageUrl(photo, 'large');
});

const getThumbnail = (photo) => {
  return getImageUrl(photo, 'thumbnail') || getImageUrl(photo, 'small') || getImageUrl(photo, 'large');
};

const selectImage = (index) => {
  if (currentImageIndex.value !== index) {
    currentImageIndex.value = index;
  }
};

const nextImage = () => {
  if (car.value?.Photo && car.value.Photo.length > 0) {
    currentImageIndex.value = (currentImageIndex.value + 1) % car.value.Photo.length;
  }
};

const previousImage = () => {
  if (car.value?.Photo && car.value.Photo.length > 0) {
    currentImageIndex.value = currentImageIndex.value === 0 
      ? car.value.Photo.length - 1 
      : currentImageIndex.value - 1;
  }
};

const onMainImageLoad = () => {
  if (!imagesLoaded.value) {
    imagesLoaded.value = true;
  }
};

const preloadImages = () => {
  if (!process.client) {
    return;
  }

  if (!car.value?.Photo || car.value.Photo.length === 0) {
    imagesLoaded.value = true;
    return;
  }

  const totalImages = car.value.Photo.length;
  loadedImagesCount.value = 0;

  car.value.Photo.forEach((photo) => {
    const img = new Image();
    img.onload = () => {
      loadedImagesCount.value++;
      if (loadedImagesCount.value === totalImages) {
        imagesLoaded.value = true;
      }
    };
    img.onerror = () => {
      loadedImagesCount.value++;
      if (loadedImagesCount.value === totalImages) {
        imagesLoaded.value = true;
      }
    };
    img.src = getImageUrl(photo, 'large');
  });
};

watch(() => car.value, (newCar) => {
  if (newCar && process.client) {
    currentImageIndex.value = 0;
    imagesLoaded.value = false;
    loadedImagesCount.value = 0;
    nextTick(() => {
      preloadImages();
    });
  }
}, { immediate: false });

onMounted(() => {
  if (car.value) {
    preloadImages();
  }
});

const openPreApprovalModal = () => {
  isModalVisible.value = true;
};

const closeModal = () => {
  isModalVisible.value = false;
};

const handlePreApprovalSubmit = async () => {
  isSubmitting.value = true;
  submitMessage.value = '';

  try {
    const API_URL = config.public.API_URL;
    const API_TOKEN = config.public.API_TOKEN;

    const orderData = {
      fullName: preApprovalForm.value.fullName,
      dateOfBirth: preApprovalForm.value.dateOfBirth,
      email: preApprovalForm.value.email,
      phone: preApprovalForm.value.phone,
      ssn: preApprovalForm.value.ssn,
      driverLicense: preApprovalForm.value.driverLicense,
      currentAddress: preApprovalForm.value.currentAddress,
      yearsAtAddress: preApprovalForm.value.yearsAtAddress,
      residenceType: preApprovalForm.value.residenceType,
      monthlyPayment: preApprovalForm.value.monthlyPayment,
      previousAddress: preApprovalForm.value.previousAddress,
      yearsAtPreviousAddress: preApprovalForm.value.yearsAtPreviousAddress,
      employmentType: preApprovalForm.value.employmentType,
      companyName: preApprovalForm.value.companyName,
      position: preApprovalForm.value.position,
      employerPhone: preApprovalForm.value.employerPhone,
      companyAddress: preApprovalForm.value.companyAddress,
      timeAtEmployment: preApprovalForm.value.timeAtEmployment,
      annualIncome: preApprovalForm.value.annualIncome,
      otherIncome: preApprovalForm.value.otherIncome,
      creditReportPermission: preApprovalForm.value.creditReportPermission,
      signature: preApprovalForm.value.signature
    };

    const response = await $fetch(`${API_URL}/pre-approvals`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: {
        data: {
          car: car.value.documentId,
          Order: orderData
        }
      }
    });

    submitSuccess.value = true;
    submitMessage.value = 'Your pre-approval application has been submitted successfully! We will contact you soon.';

    setTimeout(() => {
      closeModal();
      submitMessage.value = '';
      preApprovalForm.value = {
        fullName: '',
        dateOfBirth: '',
        email: '',
        phone: '',
        ssn: '',
        driverLicense: '',
        currentAddress: {
          street: '',
          addressLine2: '',
          city: '',
          state: '',
          zip: '',
          country: 'United States'
        },
        yearsAtAddress: '',
        residenceType: '',
        monthlyPayment: '',
        previousAddress: {
          street: '',
          addressLine2: '',
          city: '',
          state: '',
          zip: '',
          country: ''
        },
        yearsAtPreviousAddress: '',
        employmentType: '',
        companyName: '',
        position: '',
        employerPhone: '',
        companyAddress: {
          street: '',
          addressLine2: '',
          city: '',
          state: '',
          zip: '',
          country: ''
        },
        timeAtEmployment: '',
        annualIncome: '',
        otherIncome: '',
        creditReportPermission: false,
        signature: ''
      };
    }, 2000);
  } catch (error) {
    console.error('Error submitting pre-approval:', error);
    submitSuccess.value = false;
    submitMessage.value = `Error: ${error.message || 'Something went wrong. Please try again.'}`;
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.wrapper {
  min-height: 100vh;
  background-color: #f8f9fa;
  padding: 1.5rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.loader-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  gap: 20px;
}

.loader {
  width: 50px;
  height: 50px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #212529;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loader-container p {
  font-size: 16px;
  color: #666;
}

.error-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  gap: 20px;
  padding: 20px;
}

.error-container p {
  font-size: 16px;
  color: #d32f2f;
  text-align: center;
}

.retry-btn {
  background: #212529;
  color: #ffffff;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.retry-btn:hover {
  background: #1a1e21;
  transform: translateY(-1px);
}

.container {
  max-width: 1800px;
  padding: 0 20px;
  margin: 0 auto;
  width: 100%;
}

.content {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  align-items: start;
}

.image-column {
  width: 100%;
  padding: 0 1rem;
}

/* Skeleton Loader Styles */
.skeleton-wrapper {
  width: 100%;
}

.skeleton-main-image {
  width: 100%;
  height: 400px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s infinite;
  border-radius: 1rem;
  margin-bottom: 15px;
}

.skeleton-thumbnails {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.skeleton-thumbnail {
  width: 80px;
  height: 60px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s infinite;
  border-radius: 8px;
}

@keyframes skeleton-loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

/* Gallery Styles */
.gallery-wrapper {
  width: 100%;
}

.main-image-wrapper {
  position: relative;
  border-radius: 1rem;
  overflow: hidden;
  width: 100%;
  background: #fff;
  aspect-ratio: 4 / 3;
}

.car-image {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: contain;
  object-position: center;
}

/* Fade Transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Navigation Arrows */
.nav-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.9);
  border: none;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 10;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.nav-arrow:hover {
  background: rgba(255, 255, 255, 1);
  transform: translateY(-50%) scale(1.1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.nav-arrow:active {
  transform: translateY(-50%) scale(0.95);
}

.prev-arrow {
  left: 15px;
}

.next-arrow {
  right: 15px;
}

.nav-arrow i {
  font-size: 18px;
  color: #212529;
}

/* Image Counter */
.image-counter {
  position: absolute;
  bottom: 15px;
  right: 15px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  backdrop-filter: blur(10px);
}

.thumbnails {
  display: flex;
  gap: 10px;
  margin-top: 15px;
  flex-wrap: wrap;
  justify-content: flex-start;
}

.thumbnail {
  width: 80px;
  height: 60px;
  border-radius: 8px;
  overflow: hidden;
  border: 2px solid transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  background: #f5f5f5;
  padding: 0;
  position: relative;
  flex-shrink: 0;
}

.thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.thumbnail-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0);
  transition: background 0.3s ease;
  pointer-events: none;
}

.thumbnail:hover .thumbnail-overlay {
  background: rgba(0, 0, 0, 0.1);
}

.thumbnail:hover {
  border-color: #495057;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.thumbnail.active {
  border-color: #212529;
  box-shadow: 0 0 0 1px #212529;
}

.thumbnail.active .thumbnail-overlay {
  background: rgba(33, 37, 41, 0.1);
}

.form-column {
  width: 100%;
  padding: 0 1rem;
}

.form-content {
  padding: 0;
}

.title {
  font-size: 1.75rem;
  font-weight: 700;
  color: #212529;
  margin-bottom: 1rem;
  line-height: 1.2;
}

.price h2 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #212529;
  margin: 0 0 1rem 0;
  line-height: 1.3;
}

.car-specs {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: #ffffff;
  border-radius: 0.75rem;
  border: 1px solid #e9ecef;
}

.spec-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
  color: #495057;
}

.spec-item i {
  color: #212529;
  width: 16px;
}

.subtitle {
  color: #6c757d;
  margin-bottom: 1.5rem;
  font-size: 0.95rem;
  line-height: 1.5;
}

.preapproval-btn {
  background-color: #212529;
  color: white;
  border: none;
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: 500;
  border-radius: 0.75rem;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
}

.preapproval-btn:hover {
  background-color: #1a1e21;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(33, 37, 41, 0.2);
}

.preapproval-btn:active {
  transform: scale(0.98);
}

/* Modal Form Styles */
.modal-form-content {
  max-height: 70vh;
  overflow-y: auto;
  padding: 0.5rem;
}

.section-card {
  background: #ffffff;
  border: 1px solid #e9ecef;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.25rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.section-title {
  font-size: 17px;
  font-weight: 600;
  color: #212529;
  margin: 0 0 1.25rem 0;
  padding-bottom: 0.75rem;
  border-bottom: 2px solid #e9ecef;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.section-title i {
  color: #495057;
  font-size: 16px;
}

.optional-label {
  font-size: 13px;
  font-weight: 400;
  color: #6c757d;
  font-style: italic;
}

.subsection-header {
  font-size: 14px;
  font-weight: 600;
  color: #495057;
  margin: 1.5rem 0 1rem 0;
  padding-left: 0.25rem;
  border-left: 3px solid #212529;
  padding-left: 0.75rem;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

.form-group {
  margin-bottom: 0;
}

.form-group.full-width {
  grid-column: 1 / -1;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-size: 13px;
  font-weight: 500;
  color: #333;
}

.required {
  color: #d32f2f;
}

.modal-input {
  width: 100%;
  padding: 0.65rem 0.75rem;
  font-size: 14px;
  border: 1px solid #ced4da;
  border-radius: 8px;
  outline: none;
  transition: all 0.2s ease;
  font-family: inherit;
  background-color: #fff;
}

.modal-input:focus {
  border-color: #495057;
  box-shadow: 0 0 0 3px rgba(73, 80, 87, 0.08);
}

.modal-input::placeholder {
  color: #adb5bd;
}

.input-with-prefix {
  position: relative;
  display: flex;
  align-items: center;
}

.prefix {
  position: absolute;
  left: 0.75rem;
  font-size: 14px;
  color: #495057;
  font-weight: 500;
  pointer-events: none;
}

.with-prefix {
  padding-left: 2rem;
}

.field-help {
  display: block;
  margin-top: 0.35rem;
  font-size: 12px;
  color: #6c757d;
  line-height: 1.4;
}

.info-box {
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1.25rem;
  font-size: 13px;
  line-height: 1.6;
  color: #495057;
}

.info-box p {
  margin: 0 0 0.75rem 0;
}

.info-box p:last-child {
  margin-bottom: 0;
}

.info-box strong {
  color: #212529;
}

.checkbox-group {
  margin: 0 0 1.25rem 0;
}

.checkbox-label {
  display: flex;
  align-items: flex-start;
  gap: 0.65rem;
  cursor: pointer;
  font-weight: normal;
  font-size: 14px;
}

.checkbox-label input[type="checkbox"] {
  margin-top: 0.25rem;
  cursor: pointer;
  width: 18px;
  height: 18px;
  flex-shrink: 0;
}

.terms-section {
  background: #f8f9fa;
  border-color: #dee2e6;
}

.modal-submit-btn {
  width: 100%;
  background-color: #212529;
  color: white;
  border: none;
  padding: 1rem;
  font-size: 1rem;
  font-weight: 500;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.modal-submit-btn i {
  font-size: 0.9rem;
}

.modal-submit-btn:hover:not(:disabled) {
  background-color: #1a1e21;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(33, 37, 41, 0.15);
}

.modal-submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.message {
  margin-top: 1rem;
}

.alert {
  padding: 0.875rem 1rem;
  border-radius: 8px;
  font-size: 0.9rem;
}

.alert-success {
  background-color: #d1e7dd;
  color: #0f5132;
  border: 1px solid #badbcc;
}

.alert-danger {
  background-color: #f8d7da;
  color: #842029;
  border: 1px solid #f5c2c7;
}

@media (min-width: 480px) {
  .preapproval-btn {
    width: auto;
  }

  .form-grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (min-width: 768px) {
  .wrapper {
    padding: 3rem 1rem;
  }

  .container {
    padding: 0 1rem;
  }

  .image-column,
  .form-column {
    padding: 0;
  }
  
  .content {
    gap: 2rem;
  }

  .skeleton-main-image {
    height: 500px;
  }
  
  .main-image-wrapper {
    border-radius: 1.5rem;
  }
  
  .title {
    font-size: 2.5rem;
    margin-bottom: 1.5rem;
  }
  
  .price h2 {
    font-size: 1.75rem;
    margin-bottom: 1.5rem;
  }
  
  .subtitle {
    font-size: 1rem;
    margin-bottom: 2rem;
  }

  .form-content {
    padding: 0 1rem;
  }

  .thumbnails {
    gap: 12px;
  }

  .thumbnail {
    width: 100px;
    height: 75px;
  }

  .skeleton-thumbnail {
    width: 100px;
    height: 75px;
  }

  .nav-arrow {
    width: 50px;
    height: 50px;
  }

  .nav-arrow i {
    font-size: 20px;
  }

  .modal-form-content {
    padding: 1rem;
  }

  .section-card {
    padding: 2rem;
  }

  .section-title {
    font-size: 18px;
    margin-bottom: 1.5rem;
  }
}

@media (min-width: 992px) {
  .wrapper {
    padding: 4rem 1rem;
  }
  
  .content {
    grid-template-columns: 1.2fr 1fr;
    gap: 3rem;
    align-items: start;
  }

  .skeleton-main-image {
    height: 600px;
  }
  
  .title {
    font-size: 3rem;
  }
  
  .price h2 {
    font-size: 2rem;
  }

  .form-content {
    padding: 0 2rem;
  }

  .preapproval-btn:hover {
    transform: translateY(-2px);
  }
  
  .preapproval-btn:active {
    transform: translateY(0);
  }
}

@media (min-width: 1200px) {
  .main-image-wrapper {
    aspect-ratio: 16 / 10;
  }

  .skeleton-main-image {
    height: 650px;
  }
}

/* Custom scrollbar for modal */
.modal-form-content::-webkit-scrollbar {
  width: 8px;
}

.modal-form-content::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.modal-form-content::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

.modal-form-content::-webkit-scrollbar-thumb:hover {
  background: #555;
}

/* Keyboard Navigation */
.thumbnail:focus-visible,
.nav-arrow:focus-visible {
  outline: 2px solid #212529;
  outline-offset: 2px;
}
</style>