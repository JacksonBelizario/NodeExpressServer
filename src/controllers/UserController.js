const Validator = require('simple-body-validator');

const users = []
let id = 0

function index(req, res) {
    res.json(users)
}

function store({ body }, res) {
    const validator = Validator.make(body, {
        name: 'required|string|min:3',
        email: 'required|email'
    });

    if (!validator.validate()) {
        return res
            .status(422)
            .json({
                response: 'ERROR',
                errors: validator.errors().all()
            })
    }

    const user = {
        id: ++id,
        name: body.name,
        email: body.email
    }

    users.push(user)

    return res.json(user)
}

function update({ params, body }, res) {
    const validator = Validator.make(body, {
        name: 'required|string|min:3',
        email: 'required|email',
    });

    if (!validator.validate()) {
        return res
            .status(422)
            .json({
                response: 'ERROR',
                errors: validator.errors().all()
            })
    }

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