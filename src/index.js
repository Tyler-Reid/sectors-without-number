import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';

import store from 'store';
import init from 'init';

import AppWrapper from 'components/app-wrapper';
import HexBackground from 'components/hex-background';
import Home from 'components/home';
import Configure from 'components/configure';
import Changelog from 'components/changelog';
import SectorMap from 'components/sector-map';
import Sidebar from 'components/sidebar';
import OverviewList from 'components/overview-list';
import OverviewTable from 'components/overview-table';
import EmptyOverview from 'components/empty-overview';

import 'styles/global.css';
import 'react-hint/css/index.css';

init(store);

const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <IntlProvider locale="en">
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={AppWrapper}>
          <Route component={HexBackground}>
            <IndexRoute component={Home} />
            <Route path="/configure" component={Configure} />
            <Route path="/changelog" component={Changelog} />
          </Route>
          <Route path="/sector/:sector" component={SectorMap}>
            <IndexRoute component={Sidebar} />
            <Route path=":entityType/:entity" component={Sidebar} />
            <Route path="**" component={Sidebar} />
          </Route>
          <Route path="/overview/:sector" component={OverviewList}>
            <IndexRoute component={EmptyOverview} />
            <Route path=":entityType" component={OverviewTable} />
          </Route>
        </Route>
      </Router>
    </Provider>
  </IntlProvider>,
  document.getElementById('root'),
);
