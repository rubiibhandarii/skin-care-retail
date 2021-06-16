module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.DOUBLE(10, 2),
            defaultValue: 0.0,
            allowNull: false,
        },
    })

    Product.associate = (models) => {
        Product.belongsTo(models.Retailer, {
            onDelete: 'cascade',
            foreignKey: 'retailerId',
            as: 'retailer',
        })

        Product.belongsTo(models.Category, {
            onDelete: 'cascade',
            foreignKey: 'categoryId',
            as: 'category',
        })

        // Product.hasMany(models.Appointment, {
        //     onDelete: 'cascade',
        //     foreignKey: 'productId',
        //     as: 'productId',
        // })
    }

    return Product
}
