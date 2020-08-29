import { shallow } from 'enzyme';
import * as React from 'react';
import { UserOpenOrderProps, UserOpenOrders } from '.';
import { TableHeaderItemInterface } from '../UserData';

const defaults: UserOpenOrderProps = {
    rows: {} as TableHeaderItemInterface[],
    userActivity: {},
    classes: '',
    page: 0,
    rowsPerPage: 0,
    total: 0,
    handleChangePage: jest.fn(),
    handleChangeRowsPerPage: jest.fn(),
};

describe('UserOpenOrders component', () => {

    it('should render', () => {
        const wrapper = shallow(<UserOpenOrders {...defaults} />);
        expect(wrapper).toMatchSnapshot();
        expect(wrapper).toBeDefined();
    });
});
