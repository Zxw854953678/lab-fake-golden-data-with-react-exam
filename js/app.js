const App = React.createClass({
  getInitialState: function () {
    return {
      isEditor: true,
      elements:[]
    }
  },
  toggle: function () {
    this.setState({isEditor: !this.state.isEditor});
  },
  addElem:function (element) {
    const elements = this.state.elements;
    elements.push(element);
    this.setState({elements});
  },
  delElem:function (index) {
    this.state.elements.splice(index,1);
    this.setState({elements:this.state.elements});
  },
  render: function () {
    return (
      <div>
        <button onClick={this.toggle}>{this.state.isEditor ? "preview" : "edit"}</button>
        <div className={this.state.isEditor ? "" : "hidden"}>
          <Edit onAdd={this.addElem} elements={this.state.elements} onDel={this.delElem}/>
        </div>
        <div className={this.state.isEditor ? "hidden" : ""}>
          <Preview elements={this.state.elements}/>
        </div>
      </div>
    );
  }
});

const Edit = React.createClass({
  render: function () {
    return (
      <div>
        <Left  elements={this.props.elements} remove={this.props.onDel}/>
        <Right add={this.props.onAdd}/>
      </div>
    );
  }
});

const Left = React.createClass({
  remove:function (index) {
    this.props.remove(index);
  },
  render: function () {
    const elements = this.props.elements.map((element,index) => {
      return <div key={index}>
        <input type={element}/>
        <button onClick={this.remove.bind(this,index)}>X</button>
      </div>
    });
    return (
      <div>
        {elements}
      </div>
    );
  }
});

const Right = React.createClass({
  add:function () {
    const element = $("input[name=elem]:checked").val();
    this.props.add(element);
  },
  render: function () {
    return (
      <div>
        <input type="radio" name="elem" value="text"/>Text
        <input type="radio" name="elem" value="date"/>Date
        <button onClick={this.add}>+</button>
      </div>
    );
  }
});
const Preview = React.createClass({
  render: function () {
    const elements = this.props.elements.map((element,index) => {
      return <li key={index}>
        <input type={element}/>
      </li>
    });
    return (
      <div>
        {elements}
      </div>
    );
  }
});
ReactDOM.render(<App/>, document.getElementById('content'));