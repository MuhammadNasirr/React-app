import { shallow } from 'enzyme';
import * as React from 'react';
import { TabContent } from './TabPanel';

const defaultProps = {
    value: 0,
    index: 0
};

describe('Tabs test', () => {
    it('should render', () => {
        const wrapper = shallow(<TabContent {...defaultProps} />);
        expect(wrapper).toMatchSnapshot();
        expect(wrapper).toBeDefined();
    });
});
