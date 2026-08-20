# CleanTool checkout landing page

This folder is a self-contained GitHub Pages landing page for CleanTool. It is
separate from the general CuratedX company homepage so an affiliate link has a
clear, focused destination:

`https://www.curatedx.io/cleantool/`

## Checkout configuration

1. The live Stripe Payment Link is configured in `checkout.js`. If the link is
   ever replaced in Stripe, replace it there with the new exact URL. It must
   start with `https://buy.stripe.com/`.
2. Keep the PromoKit script in `index.html`. Its supplied project identifier is
   already configured there.
3. In PromoKit, make the campaign website URL exactly
   `https://www.curatedx.io/cleantool/`. Test an affiliate link only on the
   deployed page, not on localhost.
4. When a visitor arrives through a PromoKit affiliate link,
   `checkout.js` adds PromoKit's referral value to Stripe as
   `client_reference_id` before the visitor goes to Checkout.

No Stripe secret, API key, customer email, payment data, or payout data belongs
in this static site.

## How it works

The page loads PromoKit's `pk.js` on the landing page. Once a valid Stripe
Payment Link is configured, the script reads `window.promotekit_referral` and
adds it to the Payment Link as `client_reference_id`. Stripe then carries that
reference with the Checkout Session for PromoKit's Stripe integration to use.

Use this one Payment Link path for the web checkout. Do not also add the same
referral as custom server-side Stripe Session metadata for this flow; that would
create a competing attribution path.
