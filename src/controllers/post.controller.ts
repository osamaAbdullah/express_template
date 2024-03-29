import { Post } from "@models/post.model";

export async function getAll(req, res) {
    const posts = await Post.findAll();
    res.json({ posts })
}

export async function get(req, res) {
    res.json(await Post.findByPk(req.params.id, { include: 'user' }))
}

export async function store(req, res) {
    const { title, body, userId } = req.body;
    return res.json(
        await Post.create({ title, body, userId })
    )
}

export async function update(req, res) {
    const { title, body, userId } = req.body;
    const post = await Post.findByPk(req.params.id);
    await post.update({ title, body, userId })
    return res.json(post)
}

export async function destroy(req, res) {
    res.json({
        success: await Post.destroy({ where: { id: req.params.id } })
    })
}
