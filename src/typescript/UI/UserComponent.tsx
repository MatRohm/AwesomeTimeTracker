import * as React from 'react';

import { IUser } from '../domain/User';

export default class UserComponent extends React.Component<IUser, object> {

    constructor(props: IUser) {
        super(props);
    }
    public render() {
        return <div>
            <h1>Hi h444</h1>
            <button onClick={e => this.props.handleClick()}>Check</button>
            <h1>User Component</h1>
            Hello, {this.props.name}
            <br />
            You are {this.props.name} years old,  hzghjg
            <br />
            You live at: {this.props.address}
            <br />
        </div>;
    }
}
