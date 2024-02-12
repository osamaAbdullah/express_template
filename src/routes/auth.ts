import { login } from "@controllers/auth/login.controller";
import { logout } from "@controllers/auth/logout.controller";
import { register } from "@controllers/auth/register.controller";
import { user } from "@controllers/auth/user.controller";

export default (router) => {
    router.post('/login', login)
    router.post('/register', register)
    router.post('/logout', logout)
    router.get('/user', user)
}
