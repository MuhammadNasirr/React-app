import {shallow} from 'enzyme';
import * as React from 'react';
import { UserActivityData, UserActivityDataProps } from '.';
import { TableHeaderItemInterface } from '../UserData/UserData';

const defaults: UserActivityDataProps = {
    rows: {} as TableHeaderItemInterface[],
    userActivity: {},
    page: 0,
    rowsPerPage: 0,
    total: 0,
    handleChangePage: jest.fn(),
    handleChangeRowsPerPage: jest.fn(),
    goBack: jest.fn(),
    pathname: '',
    user: ''
};

describe('UserActivities component', () => {

    it('should render', () => {
        const wrapper = shallow(<UserActivityData {...defaults} />);
        expect(wrapper).toMatchSnapshot();
        expect(wrapper).toBeDefined();
    });
});
