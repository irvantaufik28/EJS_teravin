/* eslint-disable no-console */
const swaggerAutogen = require('swagger-autogen')({ openapi: '3.0.0' });

const doc = {
  info: {
    title: 'PERPUSTAKAAN',
    description:
      'API ecommerce App for project platinum for customer, create by Maju Jaya',
    termsOfService: 'http://swagger.io/terms/',
    contact: {
      email: 'irvantaufik28@gmail.com',
    },
  },
  host: 'localhost:3000',
  schemes: ['http'],

};

const outputFile = './docs/docs.json';
const endpointsFiles = [
  './routes/employeeRouter.js',

];

/* NOTE: if you use the express Router, you must pass in the
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */

swaggerAutogen(outputFile, endpointsFiles, doc).then((r) => {
  console.log(r);
});
