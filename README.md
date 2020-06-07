# Trace Map

- [Usage](#Usage)
- [Project requirements](#project-requirements)
- [Author and license](#author-and-license)

## Usage

To start project simply clone it on your disc:
`git clone https://github.com/Shlizer/trace-map.git`

Then go to project directory and install all dependencies using npm or yarn:
`npm instal`
`yarn`

At last to start project simply use
`npm run start` or
`yarn start`

It's possible also to run both frontend and backend parts separately using prefixes like so:
`npm run start:frontend` or `npm run start:backend`
`yarn start:frontend` or `yarn start:backend`

It's important to have port 4000 opened for backend app. If it's impossible please change it in `backend/src/index.js` express listening port and in proxy line in `frontend/package.json`.

There is no production config yet.

## Project requirements

- [x] Draw map with points from backend
- [x] List of points on map
- [x] Filtering points on map
- [ ] Group points in close range into clusters
- [ ] Handle ~10k markers on map across tri-city

## Author and license

Author: Krzysztof 'Shlizer' Hinc\
License: MIT
