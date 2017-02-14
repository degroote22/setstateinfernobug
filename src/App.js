import Inferno from "inferno";
import Component from "inferno-component";

class TestComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value
    };
  }

  afterUpdate = caller => () => {
    console.log(
      "On " + caller + " the child sees its state as",
      this.state.value
    );
    this.props.onChange(this.state.value);
  };

  updateValues = () => {
    this.setState(
      {
        value: this.props.value
      },
      this.afterUpdate("updateValues")
    );
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.updateValues();
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
      "On " + caller + " the parent sees its state as",
      this.state.value
    );
  };
  componentDidMount() {
    this.setState(
      {
        value: 7
      },
      this.logNewValue("componentDidMount")
    );

    setTimeout(
      () => {
        this.setState(
          {
            value: 50
          },
          this.logNewValue("timeOut componentDidMount")
        );
      },
      1
    );
  }

  onChange = value => {
    this.setState({ value }, this.logNewValue("onChange"));
  };

  render() {
    return (
      <div>
        <TestComponent value={this.state.value} onChange={this.onChange} />
      </div>
    );
  }
}

export default App;
