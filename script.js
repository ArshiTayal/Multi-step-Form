const nextBtns = document.querySelectorAll('.next-btn');
const backBtns = document.querySelectorAll('.back-btn');
const steps = document.querySelectorAll('.form-step');
const sidebarSteps = document.querySelectorAll('.sidebar .step');
const summaryDiv = document.getElementById('summary');

let currentStep = 0;

nextBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    if (validateStep(currentStep)) {
      steps[currentStep].classList.remove('active');
      sidebarSteps[currentStep].classList.remove('active');
      currentStep++;
      steps[currentStep].classList.add('active');
      sidebarSteps[currentStep].classList.add('active');
      if (currentStep === steps.length -1) {
        showSummary();
      }
    }
  });
});

backBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    steps[currentStep].classList.remove('active');
    sidebarSteps[currentStep].classList.remove('active');
    currentStep--;
    steps[currentStep].classList.add('active');
    sidebarSteps[currentStep].classList.add('active');
  });
});

document.getElementById('multiStepForm').addEventListener('submit', e => {
  e.preventDefault();
});

function validateStep(step) {
  let valid = true;
  const currentInputs = steps[step].querySelectorAll('input');

  steps[step].querySelectorAll('.error').forEach(e => e.remove());

  currentInputs.forEach(input => {
    if (input.type === 'radio') {
      if (!document.querySelector(`input[name="${input.name}"]:checked`)) {
        showError(input, "Please select an option.");
        valid = false;
      }
    } else if (input.required && !input.value.trim()) {
      showError(input, "This field is required.");
      valid = false;
    } else if (input.name === 'email' && !/^\S+@\S+\.\S+$/.test(input.value)) {
      showError(input, "Please enter a valid email.");
      valid = false;
    } else if (input.name === 'phone' && !/^\+?\d{10,15}$/.test(input.value.replace(/\s+/g, ""))) {
      showError(input, "Enter a valid phone number (10 digits).");
      valid = false;
    } else if (input.name === 'name' && !/^[a-zA-Z\s]+$/.test(input.value)) {
      showError(input, "Name can only contain letters.");
      valid = false;
    }
  });

  return valid;
}
function showError(input, message) {
  const err = document.createElement('div');
  err.className = 'error';
  err.style.color = 'red';
  err.style.fontSize = '12px';
  err.style.marginTop = '4px';
  err.innerText = message;
  input.parentNode.appendChild(err);
}
function showSummary() {
  const form = document.getElementById('multiStepForm');
  const name = form.elements['name'].value;
  const email = form.elements['email'].value;
  const phone = form.elements['phone'].value;
  const plan = form.elements['plan'] ? form.elements['plan'].value : '';
  let addons = [];
  form.querySelectorAll('input[name="addons"]:checked').forEach(cb => addons.push(cb.value));

  summaryDiv.innerHTML = `
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Phone:</strong> ${phone}</p>
    <p><strong>Plan:</strong> ${plan}</p>
    <p><strong>Add-ons:</strong> ${addons.length ? addons.join(", ") : "None"}</p>
  `;
}
document.getElementById('multiStepForm').addEventListener('submit', e => {
  e.preventDefault();
  document.querySelector('.container').innerHTML = `
    <div class="thank-you">
      <h2>Thank You!</h2>
      <p>Your submission has been received. We will contact you soon.</p>
    </div>
  `;
});
