# RoseDsigns

Creative agency website built with React + Vite.

## Run locally
    npm install
    npm run dev

## Deploy on Vercel
1. Push this folder to a GitHub repository.
2. In Vercel choose **Add New → Project**, import the repo. Framework preset: Vite (auto-detected).
3. Deploy. Build command `npm run build`, output directory `dist`.

## Contact form
By default the form opens the visitor's email app addressed to `CONTACT_EMAIL` in `src/App.jsx`.
For direct sending, create a form at formspree.io and add its URL as the Vercel environment variable `VITE_FORM_ENDPOINT`.
