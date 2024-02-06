import {faker} from "@faker-js/faker";
import {User} from "@models/user.model";
import {createModel} from "@db/factories/index";

export const makeUser = async (attributes: any = {}) => {
    return {
        name: attributes?.name || faker.person.fullName(),
        email: attributes?.email || faker.internet.email(),
        role: attributes?.role || 'admin',
    }
}

export const createUser = async (attributes = {}, count = 1) => {
    return await createModel(User, makeUser, attributes, count)
}
