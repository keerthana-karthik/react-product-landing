# react-product-landing

## Available Scripts

### `npm install`

To start server
### `npm start`

To create build for Prod
### `npm react-scripts build`

To test
### `npm test`

## Working Demo
### https://products-landing.web.app/product-landing


## Details on Code setup 

#### npm install create-react-app -g
#### create-react-app react-product-landing
EsLint for linting, Jest for testing, CSS modules for className collisions is Already included part of  Create React App

#### npm install --save husky lint-staged prettier

husky makes it possible to use githooks as if they are npm scripts.
lint-staged allows us to run scripts on staged files in git. See this blog post about lint-staged to learn more about it.
prettier is the JavaScript formatter we will run before commits.

Router
#### npm install --save react-router react-router-dom
#### npm install @types/react-router
#### npm install @types/react-router-dom

Font Awesome's entire /webfonts folder and the /css/all.css into your project’s static assets directory for icons

For HTTP
#### npm install axios

For testing Enzyme
#### npm i --save-dev enzyme enzyme-adapter-react-16