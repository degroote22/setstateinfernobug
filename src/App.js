import Inferno from "inferno";
import Component from "inferno-component";
import Logo from "./logo";
import "./App.css";
import Rheostat from "rheostat";
function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if (new Date().getTime() - start > milliseconds) {
      break;
    }
  }
}

class TestComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value
    };
  }
  componentWillReceiveProps(nextProps) {
    const { value } = nextProps;
    this.setState({ value }, () => this.logNewValue());
    sleep(500);
  }

  logNewValue = () => {
    console.log(this.props.value, this.state.value);
  };

  render() {
    return <div>{this.state.value}</div>;
  }
}

class App extends Component {
  state = {
    value: 3
  };

  logNewValue = () => {
    console.log("parent", this.state.value);
  };
  componentDidMount() {
    this.setState(
      {
        value: 7
      },
      this.logNewValue
    );

    setTimeout(
      () => {
        this.setState(
          {
            value: 50
          },
          this.logNewValue
        );
      },
      1
    );
  }

  onChange = evt => {
    this.setState({
      value: evt.values[0]
    });
  };

  render() {
    return (
      <div className="App">
        <TestComponent value={this.state.value} />
        <div className="App-header">
          <Logo width="80" height="80" />
          <h2>Welcome to Inferno</h2>
        </div>
        <Rheostat
          min={5}
          max={100}
          values={[this.state.value]}
          onChange={this.onChange}
        />
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
