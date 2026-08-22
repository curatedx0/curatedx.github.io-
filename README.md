# CleanTool website

This repository is the source of truth for the public CleanTool website.

The root address forwards visitors to the product landing page at
[`/cleantool/`](./cleantool/), preserving referral query parameters. The
dedicated Gmail OAuth return page and Apple Universal Link association remain
hosted at their existing paths.

The public legal pages used by the mobile app and Google OAuth consent screen
are available at [`/privacy/`](./privacy/) and [`/terms/`](./terms/).

## Checkout and referral tracking

The product page uses PromoKit affiliate-link tracking with a Stripe Payment
Link checkout. See [`cleantool/README.md`](./cleantool/README.md) before
changing the checkout implementation.

## Managing a web subscription

Web customers can use
[`/cleantool/manage-subscription/`](./cleantool/manage-subscription/) to enter
their checkout email and continue to Stripe's hosted Customer Portal. Stripe
then emails the customer a secure sign-in link to manage their subscription.
This flow uses Stripe's public portal login URL only; no Stripe API key,
customer data, or subscription data is stored in this repository. App Store
subscriptions continue to be managed through Apple.
