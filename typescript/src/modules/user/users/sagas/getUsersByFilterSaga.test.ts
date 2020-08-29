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
    getDataByFilter,
    getUsersData,
} from '../actions';

describe('GetUserDataByFilter saga', () => {
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
        field: 'email',
        value: 'admin@admin.io',
        page: 1,
        limit: 1,
    };

    const fakeUserResponce = [{
        created_at: '',
        email: '',
        id: 0,
        level: 0,
        otp: false,
        role: '',
        state: '',
        uid: '123',
        updated_at: '',
    }];

    const fakeHeaders = { total: 1 };

    const mockGetUsersDataByFilter = () => {
        mockAxios.onGet(`/admin/users/search?field=email&value=admin@admin.io&page=1&limit=1`).reply(200, fakeUserResponce, fakeHeaders);
    };

    const expectedActionsFetch = [
        getDataByFilter(fakeCredentials),
        getUsersData({ users: fakeUserResponce, total: 1}),
    ];

    const expectedActionsNetworkError = [
        getDataByFilter(fakeCredentials),
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

    it('should get users by filter in success flow', async () => {
        mockGetUsersDataByFilter();
        const promise = new Promise(resolve => {
            store.subscribe(() => {
                const actions = store.getActions();
                if (actions.length === expectedActionsFetch.length) {
                    expect(actions).toEqual(expectedActionsFetch);
                    resolve();
                }
            });
        });

        store.dispatch(getDataByFilter(fakeCredentials));
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
        store.dispatch(getDataByFilter(fakeCredentials));
        return promise;
    });
});
