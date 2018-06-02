import React, {Component} from 'react';

import './estate.css';

class Estate extends Component {
    render() {
        const infraTable = [];

        if (this.props.estate.infra) {
            for (const category in this.props.estate.infra) {
                infraTable.push(
                    <div>
                        <h4>{category.toUpperCase()}</h4>
                        <table className="table table-hover">
                            <thead>
                            <tr>
                                <th scope="col">Infrastructure object</th>
                                <th scope="col">Distance</th>
                                <th scope="col">Public rate</th>
                                <th scope="col">Calculated rate</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.props.estate.infra[category].map(obj => {
                                return <tr className="table-active">
                                    <td>{obj.name}</td>
                                    <td>{obj.distance}</td>
                                    <td>{obj.rating}</td>
                                    <td>{obj.rate}</td>
                                </tr>
                            })}
                            </tbody>
                        </table>
                    </div>);
            }
        }

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
                <div className="col-sm-3">
                    {infraTable}
                </div>
            </div>
        </div>;
    }
}

export default Estate;