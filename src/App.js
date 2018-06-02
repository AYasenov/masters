import React, {Component} from 'react';
import axios from 'axios';

import Filter from './components/Filter';

class App extends Component {
    onSubmit() {
        axios.post('/search', {
            radius: 1000,
            location: ["49.912116,36.408962", "50.059527,36.201539", "49.939402,36.378565"]
        })
    }

    render() {
        return (
            <Filter infrastructureCategories={['transport', 'education', 'shop', 'medicine', 'recreation', 'other']}
            onSubmit={this.onSubmit}/>
        );
    }
}

export default App;
