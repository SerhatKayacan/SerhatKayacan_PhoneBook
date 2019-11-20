import React from "react";
import axios from "axios";
import "./customers.css";
import Form from "./form";
import PostNew from "./postnew";

class Customers extends React.Component {
  constructor() {
    super();
    this.state = {
      customers: [
        {
          id: 1,
          first_name: "-",
          last_name: "-",
          email: "-",
          gender: "-",
          phone: "-"
        }
      ],
      searchedCustomers: [],
      currentPage: 1,
      customersPerPage: 20,
      customerToEdit: 1
    };
    this.handleClick = this.handleClick.bind(this);
    this.editt = this.editt.bind(this);
    this.updateCustomerToEdit = this.updateCustomerToEdit.bind(this);
    this.search = this.search.bind(this);
  }
  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id)
    });
  }

  getData() {
    axios.get("/api/customers").then(res => {
      this.setState({ customers: res.data.customers });
    });
  }
  componentDidMount() {
    this.getData();
  }

  search(value) {
    const newcustomers = this.state.customers.filter(
      customer => customer.first_name === value
    );
    this.setState({ searchedCustomers: newcustomers });
  }
  editt(index, firstName, LastName, email, gender, phone) {
    const editCustomers = this.state.customers;
    console.log(editCustomers[index]);

    editCustomers[index] = {
      id: editCustomers[index].id,
      first_name: firstName,
      last_name: LastName,
      email: email,
      gender: gender,
      phone: phone
    };
    this.setState({ customers: editCustomers });
  }
  updateCustomerToEdit(value) {
    this.setState({ customerToEdit: value });
  }
  render() {
    const indexOfLastCustomer =
      this.state.currentPage * this.state.customersPerPage;
    const indexOfFirstCustomer =
      indexOfLastCustomer - this.state.customersPerPage;
    const currentCustomers = this.state.customers.slice(
      indexOfFirstCustomer,
      indexOfLastCustomer
    );

    const renderCustomers = currentCustomers.map((customer, index) => {
      return (
        <div key={index}>
          <p>
            {customer.first_name} {customer.last_name} {customer.email}{" "}
            {customer.gender} {customer.phone}{" "}
            <button onClick={() => this.updateCustomerToEdit(customer.id)}>
              edit
            </button>
          </p>
        </div>
      );
    });
    // Logic for displaying page numbers
    const pageNumbers = [];
    for (
      let i = 1;
      i <= Math.ceil(this.state.customers.length / this.state.customersPerPage);
      i++
    ) {
      pageNumbers.push(i);
    }
    const renderPageNumbers = pageNumbers.map(number => {
      return (
        <span
          className="pages"
          key={number}
          id={number}
          onClick={this.handleClick}
        >
          {number + "-"}
        </span>
      );
    });

    return (
      <div className="App">
        <div className="app-top">
          <div>
            <ul>{renderCustomers}</ul>
          </div>
          <div>
            <Form
              edit={this.editt}
              name={
                this.state.customers[this.state.customerToEdit - 1].first_name
              }
              lastname={
                this.state.customers[this.state.customerToEdit - 1].last_name
              }
              number={this.state.customerToEdit}
              search={this.search}
            />
            <ul>
              {this.state.searchedCustomers.map(customer => {
                return (
                  <li key={customer.id}>
                    {customer.first_name} {customer.last_name}
                    <button
                      onClick={() => this.updateCustomerToEdit(customer.id)}
                    >
                      edit
                    </button>{" "}
                  </li>
                );
              })}
            </ul>
            <div>
              <PostNew />
            </div>
          </div>
        </div>
        <div className="pageNumbers" id="page-numbers">
          {renderPageNumbers}
        </div>
      </div>
    );
  }
}
export default Customers;
