import path from "path";

export const storagePath = (p = '') => {
    return path.resolve('storage', ...p.split('/'));
}
