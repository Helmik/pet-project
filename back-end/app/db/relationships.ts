
export function userUserRoleRelationship(userModel: any, userRoleCatModel: any) {
  // User - UserRole
  userModel.hasOne(userRoleCatModel);
  userRoleCatModel.belongsTo(userModel);
}
