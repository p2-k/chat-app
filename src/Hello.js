import React from 'react';

class Hello extends React.Component {
    render() {
        return (
            <div>
                <h2>Hello {this.props.name}</h2>
                <p>How's it going? The current date and time is: </p>
                <br></br><h3>{this.props.dt}</h3>
            </div>
        );
    }
}
export default Hello;