'use strict';
const {
  Model
} = require('sequelize');
const clinic = require('./clinic');
const specialty = require('./specialty');
module.exports = (sequelize, DataTypes) => {
  class Doctor_Clinic_Specialty extends Model {
    /**
     * Helper method for defining associations.
     * This method is noat a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Doctor_Clinic_Specialty.init({
   doctorID: DataTypes.INTEGER,
   clinicID: DataTypes.INTEGER,
   specialtyID: DataTypes.INTEGER

  }, {
    sequelize,
    modelName: 'Doctor_Clinic_Specialty',
  });
  return Doctor_Clinic_Specialty;
};