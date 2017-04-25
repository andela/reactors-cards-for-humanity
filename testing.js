/*
 * A simple React component
 */
// What is happening here?
class Why extends React.Component {
  constructor(props){
     super(props);

    // What does the state object do?
    this.state = {
      text: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event){
    this.setState({text: event.target.value})
  }

  render(){
    return (
      <div>
        <input type="text" onChange={this.handleChange} placeholder="J is?"/>
       <p>{this.state.text}</p>
      </div>
    )
}

}

// What happens here?
React.render(<Why/>, document.getElementById('app'));
