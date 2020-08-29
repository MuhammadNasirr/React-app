import { mount } from 'enzyme';
import { createBrowserHistory } from 'history';
import * as React from 'react';
import {
    Router,
} from 'react-router-dom';
import { UserActivities } from '../../components/UserData/UserActivities';
import {
    TableHeaderItemInterface,
    UserData,
    UserDataProps,
} from '../../components/UserData/UserData';
import { CurrentUserInterface } from '../../modules';

const defaults: UserDataProps = {
    addNewLabel: jest.fn(),
    editLabel: jest.fn(),
    changeLabelName: jest.fn(),
    changeLabelScope: jest.fn(),
    changeLabelValue: jest.fn(),
    closeModal: jest.fn(),
    deleteUserLabel: jest.fn(),
    handleChangeUserState: jest.fn(),
    handleChangeRole: jest.fn(),
    handleChangeEditMode: jest.fn(),
    handleChangeProfile: jest.fn(),
    handleChangeUserOTP: jest.fn(),
    handleChangeTab: jest.fn(),
    currentTab: 0,
    newLabelName: '',
    newLabelScope: '',
    newLabelValue: '',
    isAddLabelModalOpened: false,
    isEditLabelModalOpened: false,
    openAddLabelModal: jest.fn(),
    openEditLabelModal: jest.fn(),
    user: { labels: [], phones: [], profile: { country: 'US', metadata: { nationality: 'American' } } },
    page: 0,
    rowsPerPage: 0,
    total: 0,
    handleChangePage: jest.fn(),
    documentsRows: [] as TableHeaderItemInterface[],
    handleEditLabel: jest.fn(),
    handleAddLabel: jest.fn(),
    activityRows: [] as TableHeaderItemInterface[],
    userActivity: { labels: [], phones: [], profile: { country: 'US' } },
    editMode: false,
    handleChangeRowsPerPage: jest.fn(),
    goBack: jest.fn(),
    pathname: '',
    currentUser: {} as CurrentUserInterface,
    alertPush: jest.fn(),
    handleOpenDocumentCarousel: jest.fn(),
    handleCloseDocumentCarousel: jest.fn(),
    openDocumentCarousel: false,
    documentIndex: 0,
    handleNavigateDocumentCarousel: jest.fn(),
    permissions: []
};

const history = createBrowserHistory();


describe('UserActivity component', () => {
    const setup = (props: Partial<UserDataProps> = {}) => {
        return mount(<Router history={history}><UserData {...{ ...defaults, ...props }} /></Router>);
    };

    it('should render UserActivity', () => {
        const wrapper = setup();
        expect(wrapper.find(UserActivities)).toHaveLength(1);
    });
});
