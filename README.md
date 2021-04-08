# project description

## Project structure

We have 2 packages inside the project:
- **Client:** React application.
- **Server:** Node application.

Each of the packages have their own `package.json` file and they define their own dependencies.

```
|- package.json => root workspace
|--- packages
|------ client
|-------- package.json  => React App
|------ server
|-------- package.json => Node APP
```

## How to install and run the project.

1. Clone this repository locally `$ git clone {**TODO:** Add repo link}`
2. Install the dependencies. Inside the root `$ npm i`
3. Start both applications. `$ npm start`
