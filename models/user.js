module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        f_name: {
            type: Sequelize.STRING
        },
        m_name: {
            type: Sequelize.STRING
        },
        l_name: {
            type: Sequelize.STRING
        },
        user_name: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.BOOLEAN,
            defaultValue: true
        }
    });
    return User;
};
