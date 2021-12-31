import Profile from 'components/profile/Profile';
import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

function ProfileRoute(props) {
    const {path, url} = useRouteMatch();
    return (
        <Switch>
            <Route path={`${path}`}>
                <Profile />
            </Route>
        </Switch>
    );
}

export default ProfileRoute;