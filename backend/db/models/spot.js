"use strict";
module.exports = (sequelize, DataTypes) => {
  const Spot = sequelize.define(
    "Spot",
    {
      userId: DataTypes.INTEGER,
      address: DataTypes.STRING,
      city: DataTypes.STRING,
      state: DataTypes.STRING,
      country: DataTypes.STRING,
      name: DataTypes.STRING,
      price: DataTypes.DECIMAL,
      beds: DataTypes.INTEGER,
      baths: DataTypes.INTEGER,
      images: DataTypes.ARRAY(DataTypes.STRING),
    },
    {}
  );
  Spot.associate = function (models) {
    // associations can be defined here
    Spot.belongsTo(models.User, { foreignKey: "userId", onDelete: "CASCADE" });
    Spot.hasMany(models.Booking, { foreignKey: "spotId", onDelete: "CASCADE" });
    Spot.hasMany(models.Comment, { foreignKey: "spotId", onDelete: "CASCADE" });
  };
  return Spot;
};
