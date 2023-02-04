module.exports = (sequelize, dataType) => {
    const phoneBook = sequelize.define('phonebook', {
        phoneNumber: {
            type: dataType.STRING,
            allowNull: true
        },
        type: {
            type: dataType.STRING,
            allowNull: dataType.ENUM("home", "mobile", "other"),
            defaultValue: "mobile"
        }
    });

    return phoneBook;
}