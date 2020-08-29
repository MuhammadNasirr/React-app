import { shallow } from 'enzyme';
import * as React from 'react';
import { OpenOrdersData, OpenOrdersDataProps } from '.';
import { TableHeaderItemInterface } from '../UserData/UserData';

const defaults: OpenOrdersDataProps = {
    rows: {} as TableHeaderItemInterface[],
    openOrders: [],
    page: 0,
    rowsPerPage: 0,
    total: 0,
    handleChangePage: jest.fn(),
    handleChangeRowsPerPage: jest.fn(),
    handleCancelOpenOrders: jest.fn(),
    goBack: jest.fn(),
    pathname: '',
    user: ''
};

describe('Open Orders component', () => {

    it('should render', () => {
        const wrapper = shallow(<OpenOrdersData {...defaults} />);
        expect(wrapper).toMatchSnapshot();
        expect(wrapper).toBeDefined();
    });
});
