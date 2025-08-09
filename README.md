# Premium Portfolio — Local Dev

## Prereqs
- Node 18+ recommended
- npm or yarn

## Install

1. Install root deps:
   npm install
2. Install server deps:
   cd server && npm install && cd ..

## Run

Start the mock server:

  npm run server

In another terminal, start the frontend:

  npm run dev

Open http://localhost:5173

## Notes
- Uploads hit the Express mock server at port 4001 and are stored in-memory for the running session.
- Replace mock routes with real backend integration when ready. The front-end uses simple fetch/axios calls in `src/services/api.js`.
