import { createModel, createOneModel } from "@db/factories/index";
import { faker } from "@faker-js/faker";
import { User } from "@models/user.model";
import { createPassword } from "@utils/password.util";

export const makeUser = async (attributes: any = {}) => {
    const { salt, hash } = createPassword(attributes?.password || faker.hacker.verb());
    return {
        name: attributes?.name || faker.person.fullName(),
        email: attributes?.email || faker.internet.email(),
        role: attributes?.role || 'admin',
        password: hash,
        salt,
    }
}

export const createUsers = async (attributes = {}, count = 1) => {
    return await createModel(User, makeUser, attributes, count)
}

export const createUser = async (attributes = {}) => {
    return await createOneModel(User, makeUser, attributes)
}
