export const updateUserStoreAfterLogin = (user, result) => {
  return {
    type: 'UPDATE_USER_STORE',
    user: user,
    admin: result.admin,
    fullName: result.fullName,
    prefName: result.prefName
  }
};
export const updateUserStoreAfterSignup = (user, admin, fname, pname) => {
  return {
    user: user,
    admin: admin,
    fullName: fname,
    prefName: pname
  }
};
