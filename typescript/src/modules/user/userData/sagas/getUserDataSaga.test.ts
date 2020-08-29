import MockAdapter from 'axios-mock-adapter';
import { MockStoreEnhanced } from 'redux-mock-store';
import createSagaMiddleware, { SagaMiddleware } from 'redux-saga';
import { rootSaga } from '../../../';
import {
    mockNetworkError,
    setupMockAxios,
    setupMockStore,
} from '../../../../helpers';
import {
    alertData,
    alertDelete,
    alertPush,
} from '../../../alert';
import {
    getUserData,
    getUserDataSuccess,
} from '../actions';

describe('GetUserData saga', () => {
    let store: MockStoreEnhanced;
    let sagaMiddleware: SagaMiddleware<{}>;
    let mockAxios: MockAdapter;

    beforeEach(() => {
        mockAxios = setupMockAxios();
        sagaMiddleware = createSagaMiddleware();
        store = setupMockStore(sagaMiddleware, false)();
        sagaMiddleware.run(rootSaga);
    });

    afterEach(() => {
        mockAxios.reset();
    });

    const fakeCredentials = {
        uid: '123',
    };

    const fakeUserResponce = {
        created_at: '',
        email: '',
        id: 0,
        level: 0,
        otp: false,
        role: '',
        state: '',
        uid: '123',
        updated_at: '',
    };

    const mockGetUserData = () => {
        mockAxios.onGet(`/admin/users/${fakeCredentials.uid}`).reply(200, fakeUserResponce);
    };

    const expectedActionsFetch = [
        getUserData(fakeCredentials),
        getUserDataSuccess(fakeUserResponce),
    ];

    const expectedActionsNetworkError = [
        getUserData(fakeCredentials),
        alertPush({
            code: 500,
            message: ['Server error'],
            type: 'error',
        }),
        alertData({
            code: 500,
            message: ['Server error'],
            type: 'error',
        }),
        alertDelete(),
    ];

    it('should get user data in success flow', async () => {
        mockGetUserData();
        const promise = new Promise(resolve => {
            store.subscribe(() => {
                const actions = store.getActions();
                if (actions.length === expectedActionsFetch.length) {
                    expect(actions).toEqual(expectedActionsFetch);
                    resolve();
                }
            });
        });

        store.dispatch(getUserData(fakeCredentials));
        return promise;
    });

    it('should trigger network error', async () => {
        mockNetworkError(mockAxios);
        const promise = new Promise(resolve => {
            store.subscribe(() => {
                const actions = store.getActions();
                if (actions.length === expectedActionsNetworkError.length) {
                    expect(actions).toEqual(expectedActionsNetworkError);
                    resolve();
                }
            });
        });
        store.dispatch(getUserData(fakeCredentials));
        return promise;
    });
});
