import {UserData} from 'src/types/UserData.types';
import {getRandomNumber} from '../utils/getRandomNumber';

const userEmpty: UserData = {
  first_name: 'John',
  last_name: 'Doe',
  surname: null,
  email: null,
  phone: null,
  street: null,
  city: null,
  code: null,
  country: null,
  account: null,
  creditCardNo: null,
  creditCardExp: null,
  creditCardCvv: null,
};

const userWithContact: UserData = {
  first_name: 'John',
  last_name: 'Doe',
  surname: null,
  email: 'john.doe@mail.com',
  phone: '857 254 712',
  street: null,
  city: null,
  code: null,
  country: null,
  account: null,
  creditCardNo: null,
  creditCardExp: null,
  creditCardCvv: null,
};

const userWithAddress: UserData = {
  first_name: 'John',
  last_name: 'Doe',
  surname: null,
  email: 'john.doe@mail.com',
  phone: '857 254 712',
  street: '18th Dev Street',
  city: 'South Dev City',
  code: '99-888',
  country: 'Devburg',
  account: null,
  creditCardNo: null,
  creditCardExp: null,
  creditCardCvv: null,
};

const userComplete: UserData = {
  first_name: 'John',
  last_name: 'Doe',
  surname: 'Pierre',
  email: 'john.doe@mail.com',
  phone: '857 254 712',
  street: '18th Dev Street',
  city: 'South Dev City',
  code: '99-888',
  country: 'Devburg',
  account: '23 4444 2222 3333 1112 2342',
  creditCardNo: '1231 2312 3123 1231',
  creditCardExp: '01/23',
  creditCardCvv: '123',
};

export const getUser = async (prevUser?: UserData) => {
  console.log('Pending...');

  const scenario = getRandomNumber(1, 3);

  await new Promise(res => setTimeout(res, 1000));

  if (prevUser) {
    return prevUser;
  } else {
    switch (scenario) {
      case 1:
        return userEmpty;
      case 2:
        return userWithContact;
      case 3:
        return userWithAddress;
      case 4:
        return userComplete;
      default:
        return userEmpty;
    }
  }
};

export const updateUser = async (updated: UserData) => {
  console.log('Updating...');

  await new Promise(res => setTimeout(res, 1000));

  return updated;
};
