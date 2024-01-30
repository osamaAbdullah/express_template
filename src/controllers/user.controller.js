import { User } from "#models/user.model";

export async function getAll(req, res) {
    const users = await User.findAll({ include: "posts" });
    res.json({ users });
}

export async function get(req, res) {
    const user = await User.findByPk(req.params.id);
    res.json(user);
}

export async function store(req, res) {
    const { name, email, role } = req.body;
    const user = await User.create({ name, email, role });
    return res.json(user);
}

export async function update(req, res) {
    const { name, email, role } = req.body;
    const user = await User.findByPk(req.params.id);
    await user.update({ name, email, role });
    return res.json(user);
}

export async function destroy(req, res) {
    res.json({
        success: await User.destroy({ where: { id: req.params.id } }),
    });
}

export async function getPosts(req, res) {
    const user = await User.findByPk(req.params.id);
    res.json(await user.getPost());
}
