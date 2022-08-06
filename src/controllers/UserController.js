const users = []
let id = 0

function index(req, res) {
    res.json(users)
}

function store({ body }, res) {
    const user = {
        id: ++id,
        name: body.name,
        email: body.email
    }

    users.push(user)

    return res.json(user)
}

function update({ params, body }, res) {
    const index = users.findIndex(u => u.id == params.id)

    if (index === -1) {
        return res.status(404).json({ response: 'ERROR' })
    }

    const user = {
        ...users[index],
        name: body.name,
        email: body.email
    }

    users[index] = user

    return res.json(user)
}

function destroy({ params }, res) {
    const index = users.findIndex(u => u.id == params.id)

    if (index === -1) {
        return res.status(404).json({ response: 'ERROR' })
    }

    users.splice(index, 1)

    return res.json({ response: 'SUCCESS' })
}

module.exports = {
    index,
    store,
    update,
    destroy
}