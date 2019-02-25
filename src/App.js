import React, {Component} from 'react';

export default class App extends Component {

	constructor(props) {
	    super(props)
	}

	render() {
	    const element = (<div>Text from Element</div>)
	    return (<div className="comptext">
	      {this.props.displaytext}
	    </div>)
	  }
}