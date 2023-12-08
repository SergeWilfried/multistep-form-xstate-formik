import {Machine, assign} from 'xstate';
import {
  UserDataMachineContext,
  UserDataMachineStates,
  UserDataMachineEvents,
  UserDataStates,
  UserDataEvents,
} from './userDataMachine.types';
import {getUser} from '../data/Api';
import {updateMachine} from './updateMachine';

export const userDataMachine = Machine<
  UserDataMachineContext,
  UserDataMachineStates,
  UserDataMachineEvents
>({
  id: 'userDataMachine',
  initial: UserDataStates.init,
  context: {
    error: false,
    errorMsg: '',
    userData: null,
  },
  states: {
    [UserDataStates.init]: {
      on: {
        [UserDataEvents.BASIC]: {
          target: UserDataStates.basic,
          actions: assign({
            userData: (_, {userData}) => userData,
          }),
        },
        [UserDataEvents.ADDRESS]: {
          target: UserDataStates.address,
          actions: assign({
            userData: (_, {userData}) => userData,
          }),
        },
        [UserDataEvents.PAYMENT]: {
          target: UserDataStates.payment,
          actions: assign({
            userData: (_, {userData}) => userData,
          }),
        },
      },
      invoke: {
        src: _ => async cb => {
          try {
            const userData = await getUser();

            const {
              first_name,
              last_name,
              surname,
              email,
              phone,
              street,
              city,
              code,
              country,
              account,
              creditCardNo,
              creditCardExp,
              creditCardCvv,
            } = userData;

            switch (null) {
              case first_name && last_name && surname && email && phone:
                cb({type: UserDataEvents.BASIC, userData});
                break;
              case street && city && code && country:
                cb({type: UserDataEvents.ADDRESS, userData});
                break;
              case account && creditCardNo && creditCardExp && creditCardCvv:
                cb({type: UserDataEvents.PAYMENT, userData});
                break;
              default:
                cb({type: UserDataEvents.BASIC, userData});
                break;
            }
          } catch (e) {
            console.log(e.message);
          }
        },
      },
    },
    [UserDataStates.basic]: {
      on: {
        [UserDataEvents.NEXT]: {
          target: UserDataStates.address,
        },
      },
      invoke: {
        id: 'FormName',
        src: updateMachine,
        data: (ctx: UserDataMachineContext) => ctx,
        onDone: {
          target: UserDataStates.address,
          actions: assign({
            userData: (_, {data}) => data?.userData ?? null,
          }),
        },
      },
    },
    [UserDataStates.address]: {
      on: {
        [UserDataEvents.NEXT]: {
          target: UserDataStates.payment,
        },
        [UserDataEvents.BACK]: {
          target: UserDataStates.basic,
        },
      },
      invoke: {
        id: 'FormAddress',
        src: updateMachine,
        data: (ctx: UserDataMachineContext) => ctx,
        onDone: {
          target: UserDataStates.payment,
          actions: assign({
            userData: (_, {data}) => data?.userData ?? null,
          }),
        },
      },
    },
    [UserDataStates.payment]: {
      on: {
        [UserDataEvents.NEXT]: {
          target: UserDataStates.complete,
        },
        [UserDataEvents.BACK]: {
          target: UserDataStates.address,
        },
      },
      invoke: {
        id: 'FormPayment',
        src: updateMachine,
        data: (ctx: UserDataMachineContext) => ctx,
        onDone: {
          target: UserDataStates.complete,
          actions: assign({
            userData: (_, {data}) => data?.userData ?? null,
          }),
        },
      },
    },
    [UserDataStates.documents]: {
      on: {
        [UserDataEvents.NEXT]: {
          target: UserDataStates.complete,
        },
        [UserDataEvents.BACK]: {
          target: UserDataStates.payment,
        },
      },
      invoke: {
        id: 'FormDocumentsUpload',
        src: updateMachine,
        data: (ctx: UserDataMachineContext) => ctx,
        onDone: {
          target: UserDataStates.complete,
          actions: assign({
            userData: (_, {data}) => data?.userData ?? null,
          }),
        },
      },
    },
    [UserDataStates.liveness]: {
      on: {
        [UserDataEvents.NEXT]: {
          target: UserDataStates.complete,
        },
        [UserDataEvents.BACK]: {
          target: UserDataStates.documents,
        },
      },
      invoke: {
        id: 'FormFaceDetection',
        src: updateMachine,
        data: (ctx: UserDataMachineContext) => ctx,
        onDone: {
          target: UserDataStates.complete,
          actions: assign({
            userData: (_, {data}) => data?.userData ?? null,
          }),
        },
      },
    },
    [UserDataStates.complete]: {
      on: {
        [UserDataEvents.BACK]: {
          target: UserDataStates.payment,
        },
      },
    },
  },
});
