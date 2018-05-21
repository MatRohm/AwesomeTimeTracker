import * as React from 'react';

import {IUser} from '../domain/User';

export default class UserComponent extends React.Component<IUser,{}> {

    constructor(props: IUser) {
        super(props);
    }
    public render() {
        return <div>
            <button onClick={e => this.props.handleClick()}>Check</button>
            <h1>User Component</h1>
            Hello, {this.props.name}
            <br/>
            You are {this.props.name} years old,
            <br/>
            You live at: {this.props.address}
            <br/>
            you were born: {this.props.dob.toDateString()}
        </div>;
    }
}
