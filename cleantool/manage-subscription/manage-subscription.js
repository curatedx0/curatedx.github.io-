/*
 * CleanTool web subscription management
 *
 * Add the public Stripe Customer Portal Login Link after it is activated in
 * Stripe. It must be the exact https://billing.stripe.com/p/login/... URL.
 * This link is public by design, but it is not an API key and must never be
 * replaced with a Stripe secret key, restricted key, or customer data.
 */
const manageSubscriptionConfig = {
  stripeCustomerPortalLoginUrl: "https://billing.stripe.com/p/login/dRm00l2SIeroa3Q7iff7i00",
};

const form = document.getElementById("manage-subscription-form");
const emailInput = document.getElementById("subscription-email");
const submitButton = document.getElementById("manage-subscription-submit");
const statusMessage = document.getElementById("manage-subscription-status");

function getCustomerPortalLoginUrl(value) {
  try {
    const url = new URL(value);
    const isStripePortal = url.protocol === "https:" && url.hostname === "billing.stripe.com";
    const isCustomerPortalLogin = url.pathname.startsWith("/p/login/");

    return isStripePortal && isCustomerPortalLogin ? url : null;
  } catch {
    return null;
  }
}

function setStatus(message, isSuccess = false) {
  if (!statusMessage) {
    return;
  }

  statusMessage.textContent = message;
  statusMessage.classList.toggle("form-status--success", isSuccess);
}

function configurePortalLogin() {
  const portalLoginUrl = getCustomerPortalLoginUrl(manageSubscriptionConfig.stripeCustomerPortalLoginUrl);

  if (!portalLoginUrl || !emailInput || !submitButton) {
    setStatus("The secure subscription portal is being configured. Please contact support if you need help.");
    return null;
  }

  emailInput.disabled = false;
  submitButton.disabled = false;
  setStatus("Continue to Stripe to receive a secure sign-in link.");
  return portalLoginUrl;
}

const customerPortalLoginUrl = configurePortalLogin();

if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!customerPortalLoginUrl || !emailInput || !submitButton) {
      return;
    }

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const destination = new URL(customerPortalLoginUrl);
    destination.searchParams.set("prefilled_email", emailInput.value.trim());

    emailInput.disabled = true;
    submitButton.disabled = true;
    submitButton.textContent = "Opening secure sign-in…";
    setStatus("Taking you to Stripe to send your secure sign-in link…", true);

    window.setTimeout(() => {
      window.location.assign(destination.toString());
    }, 300);
  });
}
