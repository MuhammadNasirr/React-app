import { shallow } from 'enzyme';
import * as React from 'react';
import { ModalBox } from './';

const defaultProps = {
    handleClose: jest.fn(),
    open: false,
    label: '',
    handleEdit: jest.fn(),
    handleCreate: jest.fn(),
    mode: 0,
};

describe('EditLabel test', () => {
    it('should render', () => {
        const wrapper = shallow(<ModalBox {...defaultProps} />);
        expect(wrapper).toMatchSnapshot();
        expect(wrapper).toBeDefined();
    });
});
