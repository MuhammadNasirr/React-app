import { shallow } from 'enzyme';
import * as React from 'react';
import { ConfirmationModal } from './ConfirmationModal';

const defaultProps = {
    modalClose: jest.fn(),
    open: false,
    handleDone: jest.fn(),
    id: 1,
    title: '',
    description: ''
};

describe('EditLabel test', () => {
    it('should render', () => {
        const wrapper = shallow(<ConfirmationModal {...defaultProps} />);
        expect(wrapper).toMatchSnapshot();
        expect(wrapper).toBeDefined();
    });
});
