import { User } from "@models/user.model";
import { InferAttributes } from "@sequelize/core";

export const createModel = async (model, modelFactory, attributes: object = {}, count: number = 1) : Promise<number[]> => {
    
    const ids = [];
    
    for (let i = 0; i < count; i++) {
        const user = await model.create(await modelFactory(attributes));
        ids.push(user.id);
    }
    
    return ids;
}

export const createOneModel = async (model, modelFactory, attributes: object = {}) : Promise<InferAttributes<User>> => {
    return (await model.create(await modelFactory(attributes))).dataValues;
}
