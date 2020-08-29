import { shallow } from 'enzyme';
import * as React from 'react';
import { PermissionModal } from './PermissionModal';

const defaultProps = {
    modalClose: jest.fn(),
    open: false,
    editPermission: jest.fn(),
    createPermission: jest.fn(),
    mode: 0,
    id: 1,
    role: '',
    path: '',
    topic: '',
    verb: '',
    action: '',
    handleChangeRole: jest.fn(),
    handleChangePath: jest.fn(),
    handleChangeTopic: jest.fn(),
    handleChangeVerb: jest.fn(),
    handleChangeAction: jest.fn(),
    handleChange: jest.fn()
};

describe('EditLabel test', () => {
    it('should render', () => {
        const wrapper = shallow(<PermissionModal {...defaultProps} />);
        expect(wrapper).toMatchSnapshot();
        expect(wrapper).toBeDefined();
    });
});
