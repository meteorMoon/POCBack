export const options={
    definition:{
        openapi:"3.0.0",
        info:{
            title:"uwu",
            version:"1.0.0",
            description:"uwu v1.0"
        },
    servers:[
        {
            url:"http://localhost:80"
        }
    ]},
    apis:["src/routes/*.ts"]
}