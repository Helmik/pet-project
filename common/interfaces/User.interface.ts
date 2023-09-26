interface UserInterface {
  id?: number;
  firstName: string;
  lastName?: string;
  email: string;
  password?: string;
  phone?: string;
  phoneUrl?: string;
  birthday?: Date;
  isActive?: Boolean
  createdAt?: Date;
  updatedAt?: Date;
  iat?: number;
  token?: string;
  changePasswordToken?: string;
  userRoleId: number;
}

export default UserInterface;
