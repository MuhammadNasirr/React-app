import { shallow } from 'enzyme';
import * as React from 'react';
import { Balances } from './';

describe('Balances test', () => {
    it('should render', () => {
        const wrapper = shallow(<Balances />);
        expect(wrapper).toMatchSnapshot();
        expect(wrapper).toBeDefined();
    });
});
