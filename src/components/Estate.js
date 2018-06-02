import React, {Component} from 'react';

import './estate.css';

class Estate extends Component {
    render() {
        return <div className="estate">
            <h5>{this.props.estate.name}</h5>
            <div className="row">
                <div className="col-sm-3 imgdiv">
                    <img className="myimage" src={this.props.estate.photo}/>
                </div>
                <div className="col-sm-3">
                    <ul className="list-group">
                        {this.props.estate.params.map(function (item) {
                            return <li className="list-group-item d-flex justify-content-between align-items-center">
                                {item.name}
                                <span className="badge badge-primary badge-pill">{item.value}</span>
                            </li>
                        })}
                    </ul>
                </div>
            </div>
        </div>;
    }
}

export default Estate;