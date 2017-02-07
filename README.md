# React HGV Planner

This simple app simulates an HGV Planner in the UK

### Technologies
- ReactJS (v0.14.6)
- Redux (v3.5.2)
- ES6 (transpaling with babel v6.5.2)
- Karma (v1.4.1)
- Enzyme (v2.7.1)
- Building with Webpack (v1.12.9)

## Run
Just run the following command and it will install the npm dependencies and run the app
```sh
$ npm start
```

### Unit Testing
It's not completely done because I'm having some trouble trying to test React with Redux.

```sh
$ npm test
```

## How to use it
The app depends on Google Maps API. I'm using my own API Key, but in case that it fails, it can be changed in
> /src/js/config.js

The Origin and Destination must be selected using the Google Dropdown, IT WON'T WORK WITH JUST TYPING A DIRECTION