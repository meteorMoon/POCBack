export const optionsApi={
    
    definition:{
        openapi:"3.0.0",
        info:{
            title:"store microserv",
            version:"1.0.0",
            description:"u v1.0"
        },
    servers:[
        {
            url:"http://localhost:80"
        }
    ]},
    apis:[`${__dirname}/routes/*.js`]
}

export const optionsSwagger = {
    swaggerOptions: {
      supportedSubmitMethods: []
     }
  };