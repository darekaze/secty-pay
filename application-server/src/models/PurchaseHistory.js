module.exports = (sequelize, DataTypes) => {
  const PurchaseHistory = sequelize.define('PurchaseHistory', {
    name: DataTypes.STRING,
    price: DataTypes.INTEGER, /* $1.00 would be stored as 100. */
  });

  PurchaseHistory.associate = (models) => {
    PurchaseHistory.belongsTo(models.User);
  };

  return PurchaseHistory;
};
