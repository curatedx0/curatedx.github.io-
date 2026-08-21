/*
 * CleanTool checkout configuration
 *
 * Keep stripePaymentLink set to the exact live Stripe Payment Link. If it is
 * replaced in Stripe, update this value with the replacement link. It must be
 * a hosted link starting with https://buy.stripe.com/.
 * Do not put API keys, secret keys, or customer data in this file.
 */
const checkoutConfig = {
  stripePaymentLink: "https://buy.stripe.com/dRm00l2SIeroa3Q7iff7i00",
};

const checkoutButtons = [
  document.getElementById("checkout-button"),
  document.getElementById("checkout-button-secondary"),
].filter(Boolean);
const checkoutStatus = document.getElementById("checkout-status");

function isHostedStripePaymentLink(value) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" && url.hostname === "buy.stripe.com" && url.pathname.length > 1;
  } catch {
    return false;
  }
}

function checkoutUrlWithReferral(paymentLink) {
  const checkoutUrl = new URL(paymentLink);
  const referralId = window.promotekit_referral;

  if (referralId && !checkoutUrl.searchParams.has("client_reference_id")) {
    checkoutUrl.searchParams.set("client_reference_id", referralId);
  }

  return checkoutUrl.toString();
}

function updateCheckoutLinks() {
  if (!isHostedStripePaymentLink(checkoutConfig.stripePaymentLink)) {
    return false;
  }

  const checkoutUrl = checkoutUrlWithReferral(checkoutConfig.stripePaymentLink);

  checkoutButtons.forEach((button) => {
    button.href = checkoutUrl;
    button.classList.remove("button--disabled");
    button.removeAttribute("aria-disabled");
    button.textContent = "Start 3-day free trial";
  });

  if (checkoutStatus) {
    checkoutStatus.textContent = window.promotekit_referral
      ? "Your invite is ready for checkout."
      : "Secure checkout is hosted by Stripe.";
  }

  return true;
}

function startCheckoutLinkSync() {
  let attempts = 0;
  const interval = window.setInterval(() => {
    attempts += 1;
    const configured = updateCheckoutLinks();
    const referralReady = Boolean(window.promotekit_referral);

    if (!configured || referralReady || attempts >= 40) {
      window.clearInterval(interval);
    }
  }, 500);
}

checkoutButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    if (button.getAttribute("aria-disabled") === "true") {
      event.preventDefault();
    }
  });
});

updateCheckoutLinks();
startCheckoutLinkSync();
