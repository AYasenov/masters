import React, {Component} from 'react';
import axios from 'axios';

import Filter from './components/Filter';
import EstateList from './components/EstateList';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            estates: []
        };

        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit() {
        axios.post('/search', {
            radius: 1000,
            estates: this.state.estates.map(item => {
                return {id: item.id, location: item.location}
            })
        }).then(response => {
            const estates = Object.assign([], this.state.estates);

            response.data.forEach(rateObj => {
                for (let i = 0; i < estates.length; i++) {
                    if (estates[i].id === rateObj.id) {
                        Object.assign(estates[i], rateObj);
                    }
                }
            });

            estates.sort((a, b) => {
                if (a.generalMark < b.generalMark) {
                    return 1;
                }

                if (a.generalMark > b.generalMark) {
                    return -1;
                }

                return 0;
            });

            this.setState({estates: estates});
        });
    }

    componentDidMount() {
        axios.get('/estates').then(response => {
            this.setState({estates: response.data});
        });
    }

    render() {
        return (
            <div>
                <Filter infrastructureCategories={['transport', 'education', 'shop', 'medicine', 'recreation', 'other']}
                        onSubmit={this.onSubmit}/>
                <EstateList estates={this.state.estates}/>
            </div>
        );
    }
}

export default App;
