const App = React.createClass({
  getInitialState: function () {
    return {
      isEditor: true
    }
  },
  toggle:function () {
    this.setState({isEditor:!this.state.isEditor});
  },
  render: function () {
    return (
      <div>
        <button onClick={this.toggle}>{this.state.isEditor ? "preview" : "edit"}</button>
        <div className={this.state.isEditor ? "" : "hidden"}>
          <Edit />
        </div>
        <div className={this.state.isEditor ? "hidden" : ""}>
          <Preview />
        </div>
      </div>
    );
  }
});

const Edit = React.createClass({
  render: function () {
    return (
      <div>

      </div>
    );
  }
});

const Preview = React.createClass({
  render: function () {
    return (
      <div>
        
      </div>
    );
  }
});
ReactDOM.render(<App/>, document.getElementById('content'));