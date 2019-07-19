import React, { Component } from 'react';
import classNames from 'classnames';
import './TodoItem.css';

import PropTypes from 'prop-types';

import check from '../images/check.svg';
import checked from '../images/checked.svg';

// class TodoItem extends Component {
// 	render() {
// 		const {item} = this.props;
//         let classN = 'TodoItem';
//         if(item.isComplete){
//             classN +=' complete';
//         }
// 		return (
// 			<div className= {classN}>
// 				<p>{this.props.item.title}</p>
// 			</div>
// 		);
// 	}
// }
class TodoItem extends Component {
	render() {
		const { item, onClick, onClear } = this.props;
		let url = check;
		if (item.isComplete) {
			url = checked;
		}
		return (
			<div className={classNames('TodoItem', { complete: item.isComplete })}>
				<p>
					<span className="spanImg" onClick={onClick}>
						<img src={url} alt="" />
					</span>
					{this.props.item.title}
					<button onClick={onClear} className="clear-item">
						x
					</button>
				</p>
			</div>
		);
	}
}

TodoItem.propTypes = {
	item: PropTypes.shape({
		isComplete: PropTypes.bool.isRequired,
		title: PropTypes.string.isRequired,
	}),
	// onClick: PropTypes.func(),
};

export default TodoItem;
