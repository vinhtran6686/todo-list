import React, { Component } from "react";
import "./App.css";
import Tick from "./images/tick.svg";
import Ticked from "./images/ticked.svg";
import TodoItem from "./components/TodoItem";
import TodoFilter from "./components/TodoFilter";

class App extends Component {
  constructor() {
    super();
    this.state = {
      statusImgCheckAll: true,
      newItem: "",
      all: true,
      active: false,
      complete: false,
      // todoItems: [{ title: 'EAT', isComplete: true }, { title: 'CODE', isComplete: true }, { title: 'SPEEP' , isComplete: false }],
      todoItems: []
    };
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onClearAll = this.onClearAll.bind(this);
  }

  componentDidMount() {
    let v = JSON.parse(localStorage.getItem("Todos"));
    this.setState({ ...v });
  }

  componentDidUpdate() {
    localStorage.setItem("Todos", JSON.stringify({ ...this.state }));
  }

  CheckAll(items, allStatusCheck) {
    // set src img checkAll
    this.setState(state => ({ statusImgCheckAll: !state.statusImgCheckAll }));

    if (allStatusCheck) {
      this.setState({
        todoItems: [
          ...items.reduce((arr, i) => [...arr, { ...i, isComplete: true }], [])
        ],
        allStatusCheck: 0
      });
    } else {
      this.setState({
        todoItems: [
          ...items.reduce((arr, i) => [...arr, { ...i, isComplete: false }], [])
        ],
        allStatusCheck: 1
      });
    }
  }
  getImgCheckAll = () => (this.state.statusImgCheckAll ? Tick : Ticked);

  // input header
  onKeyDown(event) {
    let text = event.target.value;
    if (event.keyCode === 13) {
      if (!text) {
        return;
      }
      text = text.trim();
      if (!text) {
        return;
      }
      this.setState({
        newItem: "",
        todoItems: [
          {
            title: text,
            isComplete: false
          },
          ...this.state.todoItems
        ]
      });
    } else {
      this.setState({
        newItem: text
      });
    }
  }
  onChange(event) {
    this.setState({
      newItem: event.target.value
    });
  }

  // item click
  // trả về hàm
  onItemClicked = item => {
    return event => {
      const isComplete = item.isComplete;
      const { todoItems } = this.state;
      const index = todoItems.indexOf(item);
      this.setState({
        todoItems: [
          ...todoItems.slice(0, index),
          {
            ...item,
            isComplete: !isComplete
          },
          ...todoItems.slice(index + 1)
        ]
      });
    };
  };

  // item clear
  onClearItem = item => {
    const { todoItems } = this.state;
    const index = todoItems.indexOf(item);
    this.setState({
      todoItems: [...todoItems.slice(0, index), ...todoItems.slice(index + 1)]
    });
  };

  // show item active
  onActive = () => {
    this.setState({
      all: false,
      active: true,
      complete: false
    });
  };
  // show item complete
  onComplete = () => {
    this.setState({
      all: false,
      active: false,
      complete: true
    });
  };
  // clear all
  onClearAll = () => {
    this.setState({ todoItems: [] });
  };

  AllItems = () => {
    this.setState({
      all: true,
      active: false,
      complete: false
    });
  };
  render() {
    const {
      todoItems,
      newItem,
      allStatusCheck,
      all,
      active,
      complete
    } = this.state;
    let ItemActives = todoItems.filter(v => v.isComplete);
    let ItemComplete = todoItems.filter(v => !v.isComplete);
    const imageName = this.getImgCheckAll();
    return (
      <div className="App">
        

        {/* demo ref */}
        <div className="header clearfix">
          <span className="spanImg">
            <img
              onClick={this.CheckAll.bind(this, todoItems, allStatusCheck)}
              src={imageName}
              alt=""
            />
          </span>
          <input
            type="text"
            placeholder="Add new item"
            value={newItem}
            onChange={this.onChange}
            onKeyDown={this.onKeyDown}
          />
        </div>
        {/* {todoItems.length > 0 &&
					todoItems.map((item, index) => (
						<TodoItem key={index} item={item} onClick={this.onItemClicked(item)} />
					))}
				{todoItems.length === 0 && 'Nothing'} */}

        {todoItems.length
          ? all === true && active === false && complete === false
            ? todoItems.map((item, index) => (
                <TodoItem
                  key={index}
                  item={item}
                  onClick={this.onItemClicked(item)}
                  onClear={this.onClearItem.bind(this, item)}
                />
              ))
            : all === false && active === true && complete === false
            ? ItemActives.map((item, index) => (
                <TodoItem
                  key={index}
                  item={item}
                  onClick={this.onItemClicked(item)}
                  onClear={this.onClearItem.bind(this, item)}
                />
              ))
            : ItemComplete.map((item, index) => (
                <TodoItem
                  key={index}
                  item={item}
                  onClick={this.onItemClicked(item)}
                  onClear={this.onClearItem.bind(this, item)}
                />
              ))
          : ""}

        <TodoFilter
          task={todoItems.length}
          AllItems={this.AllItems}
          onActive={this.onActive}
          onComplete={this.onComplete}
          onClearAll={this.onClearAll}
        />
      </div>
    );
  }
}

export default App;
