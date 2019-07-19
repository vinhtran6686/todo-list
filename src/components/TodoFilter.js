import React, { Component } from 'react';

class TodoFilter extends Component {
	render() {
		let { task, AllItems, onActive, onComplete, onClearAll } = this.props;
		return (
			<div className="TodoFilter">
				<span>{task} task</span>
				<button onClick={AllItems}>All</button>
				<button onClick={onActive}>Active</button>
				<button onClick={onComplete}>Complete</button>
				<button onClick={onClearAll}>Clear All</button>
			</div>
		);
	}
}

export default TodoFilter;
