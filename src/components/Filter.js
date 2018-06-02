import React, {Component} from 'react';

class Filter extends Component {
    render() {
        return <div className="jumbotron">
            <h3>Choose search criteria</h3>
            <input className="form-control form-control-lg" type="text" placeholder="Address"/>
            <div className="row">
                <div className="col-sm-2">
                    <fieldset className="form-group">
                        <legend>Choose sale type</legend>
                        {['buy', 'rent'].map(item => {
                            return <div className="form-check">
                                <label className="form-check-label">
                                    <input type="radio" className="form-check-input" name={item} id={item}
                                           value="option1" checked=""/>
                                    {item.toUpperCase()}
                                </label>
                            </div>;
                        })}
                    </fieldset>
                </div>
                <div className="col-sm-2">
                    <fieldset className="form-group">
                        <legend>Choose search type</legend>
                        <div className="form-check">
                            <label className="form-check-label">
                                <input type="radio" className="form-check-input" name="closestObj" id="closestObj"
                                       value="closetObj" checked=""/>
                                Search by closest object
                            </label>
                        </div>
                        <div className="form-check">
                            <label className="form-check-label">
                                <input type="radio" className="form-check-input" name="allObj" id="allObj"
                                       value="allObj"/>
                                Search by all objects
                            </label>
                        </div>
                    </fieldset>
                </div>
            </div>
            {this.props.infrastructureCategories.map(category => {
                return <div className="row">
                    <div className="col-sm-2">
                        <select className="form-control" id={category + "Value"}>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                            <option>6</option>
                        </select>
                    </div>
                    <div className="col-sm-2">
                        <label className="form-check-label">
                            <input className="form-check-input" type="checkbox" value={category}/>
                            {category.toUpperCase()}
                        </label>
                    </div>
                </div>;
            })}
            <button type="button" className="btn btn-primary btn-lg" onClick={this.props.onSubmit}>Submit search and evaluation</button>
        </div>
    }
}

export default Filter;