import React from "react";
import axios from "axios";

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.postnewcustomer = this.postnewcustomer.bind(this);
    this.state = {
      name: "",
      lastname: "",
      email: "",
      gender: "",
      phone: ""
    };
  }
  postnewcustomer(e) {
    e.preventDefault();
    axios
      .post("/api/newcustomer", {
        first_name: this.state.name,
        last_name: this.state.lastname,
        email: this.state.email,
        gender: this.state.gender,
        phone: this.state.phone
      })
      .then(console.log("posted"));
  }
  render() {
    return (
      <div>
        <h3>Post New</h3>
        <form onSubmit={e => this.postnewcustomer(e)}>
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
          <button type="submit">Post</button>
        </form>
      </div>
    );
  }
}
export default Form;
