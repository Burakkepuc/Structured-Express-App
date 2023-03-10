export default {
  // Swagger settings

  swaggerDefinition: {
    info: {
      description: 'This is a server with basic API features',
      title: 'School Management simulation',
      version: '1.0.0',
    },
    host: 'localhost:5000',
    basePath: '/',
    produces: ['application/json', 'application/xml'],
    schemas: ['http', 'https'],
    securityDefinition: {
      JWT: {
        type: 'apiKey',
        in: 'header',
        name: 'Authorization',
        description: '',
      },
    },
  },

  basedir: __dirname,
  files: ['../../api/Controllers/**.js'],

}