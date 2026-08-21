# CleanTool subscription-management page

This static page sends **web** subscribers to Stripe's no-code Customer Portal
Login Link. Stripe, not this site, verifies the subscriber's email and manages
the subscription.

## Portal configuration

The Customer Portal Login Link is configured in
`manage-subscription.js`. If Stripe replaces or disables the login link, copy
the new public URL that starts with `https://billing.stripe.com/p/login/` and
replace only that value.

The URL is public by design. Never put a Stripe API key, restricted key,
customer identifier, payment information, or subscription data in this folder.
If the portal link is ever changed in Stripe, replace only that public URL; the
form rejects anything other than Stripe's `billing.stripe.com/p/login/` route.

This page is only for subscriptions purchased through Stripe on the web. App
Store purchases must be managed through Apple subscription settings.
