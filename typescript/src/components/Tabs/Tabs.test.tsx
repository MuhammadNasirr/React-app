import { shallow } from 'enzyme';
import * as React from 'react';
import { TabBar } from './Tabs';

const defaultProps = {
    value: [],
    tabRows: [],
    pathname: '',
    search: '',
};

describe('Tabs test', () => {
    it('should render', () => {
        const wrapper = shallow(<TabBar {...defaultProps} />);
        expect(wrapper).toMatchSnapshot();
        expect(wrapper).toBeDefined();
    });
});
