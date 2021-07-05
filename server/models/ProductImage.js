module.exports = (sequelize, DataTypes) => {
    const ProductImage = sequelize.define('ProductImage', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    })

    ProductImage.associate = (models) => {
        ProductImage.belongsTo(models.Product, {
            onDelete: 'cascade',
            foreignKey: 'productId',
            as: 'productImage',
        })
    }

    return ProductImage
}
