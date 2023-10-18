const UserModel = require('../models/user.model');

const indexUsers = async (req, res) => {
    const [data] = await UserModel.indexUsers();
    try {
        if (data.length === 0) {
            return res.status(404).json({
                message: 'Data not found',
                data: [],
            });
        }
        res.status(200).json({
            message: 'Success indexing all users',
            data: data,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error',
            serverMessage: error,
        });
    }
};

const showUser = async (req, res) => {
    const { id } = req.params;
    const [data] = await UserModel.showUser(id);

    try {
        if (data.length === 0) {
            return res.status(404).json({
                message: 'Data not found',
                serverMessage: `User with id ${id} not found`,
            });
        } else if (isNaN(id)) {
            return res.status(400).json({
                message: 'Bad request',
                serverMessage: `${id} is not a number`,
            });
        }
        res.status(200).json({
            message: `Success show user with id ${id}`,
            data: data,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error',
            serverMessage: error,
        });
    }
};

const storeUser = async (req, res) => {
    const { body } = req;
    try {
        if (Object.keys(body).length === 0) {
            return res.status(400).json({
                message: 'Bad request',
                serverMessage: 'Request body is empty',
            });
        }
        await UserModel.storeUser(body);
        res.status(201).json({
            message: 'CREATE new user success',
            data: body,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error',
            serverMessage: error,
        });
    }
};

const updateUser = async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    const [data] = await UserModel.showUser(id);

    try {
        if (isNaN(id)) {
            return res.status(400).json({
                message: 'Bad request',
                serverMessage: `${id} is not a number`,
            });
        } else if (data.length === 0) {
            return res.status(404).json({
                message: 'Data not found',
                serverMessage: `User with id ${id} not found`,
            });
        } else if (Object.keys(body).length === 0) {
            return res.status(400).json({
                message: 'Bad request',
                serverMessage: 'Request body is empty',
            });
        } else {
            await UserModel.updateUser(body, id);
            res.status(200).json({
                message: 'UPDATE user success',
                data: {
                    id: id,
                    ...body,
                },
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error',
            serverMessage: error,
        });
    }
};

const deleteUser = async (req, res) => {
    const { id } = req.params;
    const [data] = await UserModel.showUser(id);
    try {
        if (isNaN(id)) {
            return res.status(400).json({
                message: 'Bad request',
                serverMessage: `${id} is not a number`,
            });
        } else if (data.length === 0) {
            return res.status(400).json({
                message: 'Bad request',
                serverMessage: `User with id ${id} not found`,
            });
        } else {
            await UserModel.deleteUser(id);
            res.status(200).json({
                message: 'DELETE user success',
                data: {
                    id: id,
                },
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error',
            serverMessage: error,
        });
    }
};

module.exports = {
    indexUsers,
    storeUser,
    updateUser,
    deleteUser,
    showUser,
};
