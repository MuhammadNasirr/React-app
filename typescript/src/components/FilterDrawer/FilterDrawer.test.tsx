import { shallow } from 'enzyme';
import * as React from 'react';
import { FilterDrawer } from './FilterDrawer';

const defaultProps = {
    closeFilterDrawer: jest.fn(),
    open: false,
};

describe('EditLabel test', () => {
    it('should render', () => {
        const wrapper = shallow(<FilterDrawer {...defaultProps} />);
        expect(wrapper).toMatchSnapshot();
        expect(wrapper).toBeDefined();
    });
});
