import {faker} from "@faker-js/faker";
import {createModel} from "@db/factories/index";
import {Post} from "@models/post.model";
import {createUser} from "@db/factories/user.factory";

export const makePost = async (attributes: any = {}) => {
    return {
        title: attributes?.title || faker.lorem.word({length: {max: 64, min: 2}}),
        body: attributes?.body || faker.lorem.word({length: {max: 1500, min: 3}}),
        role: attributes?.role || 'admin',
        userId: attributes?.userId || (await createUser()).id
    }
}

export const createPost = async (attributes = {}, count = 1) => {
    return createModel(Post, makePost, attributes, count)
}
