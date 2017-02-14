import Inferno from "inferno";
import Component from "inferno-component";

class TestComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value
    };
  }

  fireChange = caller => () => {
    const value = this.state.value;
    console.log(
      "Firing change. It was called by the callback of setState on updateValues where we set value to 50. It should be 50 but it is:",
      value
    );
    this.props.onChange(value);
  };

  updateValues = value => {
    console.log("About to update value to", value, "and call fireChange");
    this.setState(
      {
        value
      },
      this.fireChange()
    );
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.updateValues(nextProps.value);
    }
  }

  render() {
    return <div>{this.props.value}</div>;
  }
}

class App extends Component {
  state = {
    value: 9
  };

  logNewValue = caller => () => {
    console.log(
      "After " + caller + " the parent sees its state as",
      this.state.value
    );
  };
  componentDidMount() {
    setTimeout(
      () => this.setState(
        {
          value: 50
        },
        this.logNewValue("componentDidMount timeout")
      ),
      300
    );
  }

  onChange = value => {
    this.setState({ value }, this.logNewValue("onChange"));
  };

  render() {
    const value = this.state.value;
    console.log("Rendering:", value);
    return (
      <div>
        <TestComponent value={value} onChange={this.onChange} />
      </div>
    );
  }
}

export default App;
