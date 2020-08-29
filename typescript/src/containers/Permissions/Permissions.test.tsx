import { shallow } from 'enzyme';
import * as React from 'react';
import { Permissions } from './';

describe('Permissions test', () => {
    it('should render', () => {
        const wrapper = shallow(<Permissions />);
        expect(wrapper).toMatchSnapshot();
        expect(wrapper).toBeDefined();
    });
});
