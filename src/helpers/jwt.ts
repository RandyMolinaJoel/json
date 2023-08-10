import { expressjwt } from "express-jwt";

const secretKey = "Randy"
const api = "locahost/apiv1";
const authJwt = expressjwt({
    secret: secretKey!,
    algorithms: ['HS256'],
    

}).unless({
    path: [
        {url: /\/api\/v1\/product(.*)/,methods: ['GET','OPTION']},
        `${api}/user/login`,
        `${api}/user/register'`
        
    ]
})

export default authJwt;


