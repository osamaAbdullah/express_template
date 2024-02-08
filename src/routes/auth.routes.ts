import {login} from "@controllers/auth/login.controller";
import {register} from "@controllers/auth/register.controller";
import {logout} from "@controllers/auth/logout.controller";
import {check_auth} from "@controllers/auth/check_auth.controller";

export default (router) => {
    router.post('/login', login)
    router.post('/register', register)
    router.post('/logout', logout)
    router.get('/check_auth', check_auth)
}
