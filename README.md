# CleanTool website

This repository is the source of truth for the public CleanTool website.

The root address forwards visitors to the product landing page at
[`/cleantool/`](./cleantool/), preserving referral query parameters. The
dedicated Gmail OAuth return page and Apple Universal Link association remain
hosted at their existing paths.

## Checkout and referral tracking

The product page uses PromoKit affiliate-link tracking with a Stripe Payment
Link checkout. See [`cleantool/README.md`](./cleantool/README.md) before
changing the checkout implementation.
