const App = React.createClass({
  getInitialState: function () {
    return {
      isEditor: true,
      elements: []
    }
  },
  toggle: function () {
    this.setState({isEditor: !this.state.isEditor});
  },
  addElem: function (element) {
    const elements = this.state.elements;
    elements.push(element);
    this.setState({elements});
  },
  delElem: function (index) {
    this.state.elements.splice(index, 1);
    this.setState({elements: this.state.elements});
  },
  render: function () {
    return (
      <div>
        {this.props.children && React.cloneElement(this.props.children, {
          onAdd: this.addElem,
          onDel: this.delElem,
          elements: this.state.elements
        })}

      </div>
    );
  }
});

const Edit = React.createClass({
  render: function () {
    return (
      <div className="row">
        <ReactRouter.Link to="/Preview">
          <button className="btn btn-primary center-block">preview</button>
        </ReactRouter.Link>
        <div className="col-md-2"></div>
        <div className="col-md-6">
          <Left elements={this.props.elements} remove={this.props.onDel}/>
        </div>
        <div className="col-md-4">
          <Right add={this.props.onAdd}/>
        </div>
      </div>
    );
  }
});

const Left = React.createClass({
  remove: function (index) {
    this.props.remove(index);
  },
  render: function () {
    const elements = this.props.elements.map((element, index) => {
      return (
        <div key={index}>
          <p>
            <input type={element}/>
            <button onClick={this.remove.bind(this, index)}>X</button>
          </p>
        </div>)
    });
    return (
      <div className="leftPage">
        {elements}
      </div>
    );
  }
});

const Right = React.createClass({
  add: function () {
    const element = $("input[name=elem]:checked").val();
    this.props.add(element);
  },
  render: function () {
    return (
      <div className="rightPan">
        <p><input type="radio" name="elem" value="text"/>Text</p>
        <p><input type="radio" name="elem" value="date"/>Date</p>
        <p>
          <button className="btn btn-primary" onClick={this.add}> +</button>
        </p>
      </div>
    );
  }
});
const Preview = React.createClass({
  render: function () {
    const elements = this.props.elements.map((element, index) => {
      return (
        <div key={index}>
          <p><input type={element} className="center-block"/></p>
        </div>
      )
    });
    return (
      <div>
        <ReactRouter.Link to="/">
          <button className="btn btn-primary center-block">edit</button>
        </ReactRouter.Link>
        <div className="Submit">
          {elements}
        </div>
        <div className="row">
          <div className="col-md-7"></div>
          <div className=".col-md-5">
            <button className="btn btn-primary Submit">Submit</button>
          </div>
        </div>
      </div>
    );
  }
});

ReactDOM.render(
  <ReactRouter.Router>
    <ReactRouter.Route path="/" component={App}>
      <ReactRouter.IndexRoute component={Edit} />
      <ReactRouter.Route path="preview" component={Preview} />
    </ReactRouter.Route>
  </ReactRouter.Router>,
  document.getElementById('content')
);
