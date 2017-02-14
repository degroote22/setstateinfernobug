import Inferno from "inferno";
import Component from "inferno-component";
import Rheostat from "rheostat";

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
  }

  logNewValue = () => {
    console.log("Child has as props", this.props.value);
    console.log("Child has as state", this.state.value);
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
    console.log("The parent class sees its state as", this.state.value);
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
    this.setState(
      {
        value: evt.values[0]
      },
      this.logNewValue
    );
  };

  render() {
    return (
      <div>
        <TestComponent value={this.state.value} />
        <Rheostat
          min={5}
          max={100}
          values={[this.state.value]}
          onChange={this.onChange}
        />
      </div>
    );
  }
}

export default App;
