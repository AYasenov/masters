import React, {Component} from 'react';

import Estate from './Estate';

class EstateList extends Component {
   render() {
        return this.props.estates.map(estate => {
            return <Estate estate={estate}/>
        });
    }
}

export default EstateList;