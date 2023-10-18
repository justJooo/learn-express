const dbPool = require('../configs/db.config');

const indexUsers = () => {
    const SQLQuery = 'SELECT * FROM users';
    return dbPool.execute(SQLQuery);
};

const showUser = (id) => {
    const SQLQuery = 'SELECT * FROM users WHERE id=?';
    return dbPool.execute(SQLQuery, [id]);
};

const storeUser = (body) => {
    const SQLQuery =
        'INSERT INTO users (name, email, address) VALUES (?, ?, ?)';
    return dbPool.execute(SQLQuery, [body.name, body.email, body.address]);
};

const updateUser = (body, id) => {
    const { name, email, address } = body;
    const updateFields = [];
    const values = [];

    name ? (updateFields.push('name=?'), values.push(name)) : null;
    email ? (updateFields.push('email=?'), values.push(email)) : null;
    address ? (updateFields.push('address=?'), values.push(address)) : null;

    return dbPool.execute(
        `UPDATE users SET ${updateFields.join(', ')} WHERE id=?`,
        [...values, id]
    );
};

const deleteUser = (id) => {
    const SQLQuery = 'DELETE FROM users WHERE id=?';
    return dbPool.execute(SQLQuery, [id]);
};

module.exports = {
    indexUsers,
    showUser,
    storeUser,
    updateUser,
    deleteUser,
};
