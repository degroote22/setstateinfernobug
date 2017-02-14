import Inferno from "inferno";
import Component from "inferno-component";
import Rheostat from "rheostat";

class App extends Component {
  state = {
    value: 9
  };

  componentDidMount() {
    // this.setState({
    //   value: 50
    // });
    //or
    setTimeout(
      () => this.setState({
        value: 50
      }),
      500
    );
  }

  onChange = evt => {
    this.setState({ value: evt.values[0] });
  };

  render() {
    const value = this.state.value;
    return (
      <div>
        Should be 50, but it is: {this.state.value}
        <Rheostat min={0} max={100} values={[value]} onChange={this.onChange} />
      </div>
    );
  }
}

export default App;
