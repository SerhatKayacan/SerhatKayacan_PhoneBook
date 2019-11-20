import React from "react";
import axios from "axios";

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.update = this.update.bind(this);
    this.state = {
      name: "",
      lastname: "",
      email: "",
      gender: "",
      phone: ""
    };
  }
  update(e) {
    e.preventDefault();
    const id = this.props.number;
    const customerToPost = {
      id: id,
      first_name: this.state.name,
      last_name: this.state.lastname,
      email: this.state.email,
      gender: this.state.gender,
      phone: this.state.phone
    };

    axios.post("/api/customers", customerToPost).then(console.log("posted"));
    this.props.edit(
      id - 1,
      this.state.name,
      this.state.lastname,
      this.state.email,
      this.state.gender,
      this.state.phone
    );
  }

  render() {
    return (
      <div>
        <h3>
          Edit user {this.props.name} {this.props.lastname}
        </h3>
        <form onSubmit={e => this.update(e)}>
          <input
            onChange={e => this.setState({ name: e.target.value })}
            placeholder="name"
            value={this.state.name}
            required
          ></input>
          <input
            onChange={e => this.setState({ lastname: e.target.value })}
            placeholder="lastname"
            value={this.state.lastname}
            required
          ></input>
          <input
            onChange={e => this.setState({ email: e.target.value })}
            placeholder="email"
            value={this.state.email}
            required
          ></input>
          <input
            onChange={e => this.setState({ gender: e.target.value })}
            placeholder="gender"
            value={this.state.gender}
            required
          ></input>
          <input
            onChange={e => this.setState({ phone: e.target.value })}
            placeholder="phone"
            value={this.state.phone}
            required
          ></input>
          <button type="submit">edit</button>
        </form>
        <div>
          Search by name
          <input
            onChange={e => this.props.search(e.target.value)}
            type="text"
          ></input>
        </div>
      </div>
    );
  }
}
export default Form;
