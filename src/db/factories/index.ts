export const createModel = async (model, modelFactory, attributes: object = {}, count: number = 1) => {
    
    if (count === 1) {
        return (await model.create(await modelFactory(attributes))).dataValues;
    } else if (count > 1) {
        
        const ids = [];
        
        for (let i = 0; i < count; i++) {
            const user = await model.create(await modelFactory(attributes));
            ids.push(user.id);
        }
        
        return ids;
        
    } else {
        
        throw new Error('Invalid count');
        
    }
}
