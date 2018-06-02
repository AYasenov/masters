import React, {Component} from 'react';

import Filter from './components/Filter';

class App extends Component {
    render() {
        return (
            <Filter infrastructureCategories={['transport', 'education', 'shop', 'medicine', 'recreation', 'other']}/>
        );
    }
}

export default App;
