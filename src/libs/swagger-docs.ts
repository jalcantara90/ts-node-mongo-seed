/* Globals */
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import path from 'path';

// Swagger definition
const swaggerDefinition = {
  openapi: "3.0.n",
  info: {
    title: "Files microservice", // Title of the documentation
    version: "1.0.0", // Version of the app
    description: "Microservice" // short description of the app
  },
  servers: [{ url: "http://localhost:3040/api", description: "Local" }]
};

// options for the swagger docs
const options = {
  // import swaggerDefinitions
  swaggerDefinition,
  // path to the API docs
  apis: [ path.join( __dirname, '../components/**/*.yaml') ]
};

const swaggerUIOptions = {
  explorer: true,
  customCss:
    ' \
        .swagger-ui .topbar .download-url-wrapper input[type=text] { border-color: #007ad9 } \
        .swagger-ui .topbar .download-url-wrapper .download-url-button { background: #007ad9 } \
        #swagger-ui > section > div.topbar > div > div > a > img { content:url("https://www.quantion.com/wp-content/uploads/2018/09/logo.png"); max-width: 215px; height: auto; } \
        .swagger-ui .topbar { background-color: #fff } \
    '
};
// initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);

export default [
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, swaggerUIOptions)
];
