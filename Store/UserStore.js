'use strict';

import WebStorage from 'react-webstorage';

let webStorage = new WebStorage(window.localStorage || window.sessionStorage);

const initialState = {
  user: 'None',
  fullName: '',
  prefName: '',
  fname: '',
  lname: '',
  admin: false,
  webStorage: webStorage,
};

const UserStore = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
    case 'UPDATE_USER_STORE_AFTER_LOGIN':
      return {
        ...state,
        user: action.user,
        admin: action.admin,
        fullName: action.fullName,
        prefName: action.prefName,
        fname: action.fname,
        lname: action.lname,
      };
    case 'UPDATE_USER_STORE_AFTER_SIGNUP':
      return{
        ...state,
        user: action.user,
        admin: action.admin,
        fullName: action.fullName,
        prefName: action.prefName
      };
  }
};

export default UserStore;
