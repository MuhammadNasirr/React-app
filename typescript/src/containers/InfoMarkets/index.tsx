import { History } from 'history';
import * as React from 'react';
import { RouteProps } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import { root } from '../../api/config';
import { TabBar } from '../../components';
import { AddMarkets } from '../AddMarkets';
import { OrderBooks } from '../Orderbooks';


interface OwnProps {
    // tslint:disable-next-line:no-any
    match: any;
    history: History;
    location: {
        pathname: string;
    };
}

type Props = RouteProps & OwnProps;

class InfoMarketsScreen extends React.Component<Props> {
    constructor(props: Props) {
        super(props);

        this.state = {};
    }

    private id = this.props.match.params.id;
    private tabRows = [
        {
            key: 1,
            label: 'OrderBooks',
            pathname: `${root()}/exchange/markets/${this.id}/info`
        },
        {
            key: 2,
            label: 'Configuration',
            pathname: `${root()}/exchange/markets/${this.id}/config`
        },
    ];

    private value = [
        `${root()}/exchange/markets/${this.id}/info`,
        `${root()}/exchange/markets/${this.id}/config`,
    ];

    public render() {
        const { location } = this.props;
        return (
            <React.Fragment>
                <TabBar
                    value={this.value}
                    tabRows={this.tabRows}
                    pathname={location.pathname}
                    search={location.search}
                >
                    <Switch>
                        <Route
                            path={`${root()}/exchange/markets/:id/info`}
                            render={() => <OrderBooks />}
                        />
                        <Route
                            path={`${root()}/exchange/markets/:id/config`}
                            render={() => <AddMarkets />}
                        />
                    </Switch>
                </TabBar>
            </React.Fragment>
        );
    }
}

// tslint:disable-next-line:no-any
export const InfoMarketsWrapper = InfoMarketsScreen;
