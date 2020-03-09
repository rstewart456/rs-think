import React from 'react';
import { UserContext } from '../providers/UserProvider';

const getDisplayName = (WrappedComponent) => {
    return WrappedComponent.dispalyName || WrappedComponent.name || 'Component';
}

const withUser = Component => {
    const WrappedComponent = props => {
        return (
            <UserContext.Consumer>
                {user => <Component user={user} {...props} /> }
            </UserContext.Consumer>
        );
    }

    WrappedComponent.dispalyName = `WithUser(${getDisplayName(WrappedComponent)})`

    return WrappedComponent;
}

export default withUser;