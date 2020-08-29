import { shallow } from 'enzyme';
import { createBrowserHistory } from 'history';
import * as React from 'react';
import {
    Router,
} from 'react-router-dom';
import { UserWrapper } from './';


const history = createBrowserHistory();
// tslint:disable-next-line:no-any
const mock: any = jest.fn();

const defaultProps = {
    match: {
        params: {
            uid: '',
        },
    },
    history: history,
    location: mock,
};

describe('UserWrapper test', () => {
    it('should render', () => {
        const wrapper = shallow(<Router history={history}><UserWrapper {...defaultProps} /></Router>);
        expect(wrapper).toMatchSnapshot();
        expect(wrapper).toBeDefined();
    });
});
