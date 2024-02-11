import { protect } from "@/middlewares/auth.middleware";
import { user } from "@controllers/auth/check_auth.controller";
import { login } from "@controllers/auth/login.controller";
import { register } from "@controllers/auth/register.controller";

export default (router) => {
    router.post('/login', login)
    router.post('/register', register)
    router.get('/user', protect, user)
}
