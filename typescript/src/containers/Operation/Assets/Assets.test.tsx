import { shallow } from 'enzyme';
import { createBrowserHistory } from 'history';
import * as React from 'react';
import { Assets } from './';

const history = createBrowserHistory();
// tslint:disable-next-line:no-any
const mock: any = jest.fn();

const defaultProps = {
    handleCloseFilterDrawer: jest.fn(),
    handleCloseFilterDrawerCLick: jest.fn(),
    drawerOpen: false,
    match: {
        params: {
            uid: '',
        },
    },
    history: history,
    location: mock,
};

describe('Activities test', () => {
    it('should render', () => {
        const wrapper = shallow(<Assets {...defaultProps} />);
        expect(wrapper).toMatchSnapshot();
        expect(wrapper).toBeDefined();
    });
});
