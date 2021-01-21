import React, { Component } from "react";

export class SearchBar extends Component {
  render() {
    return (
      <div>
        <div className="input-group input-group mb-2">
          <div className="input-group-prepend">
            <span className="input-group-text" id="inputGroup-sizing-sm"></span>
          </div>
          <input
            onChange={this.props.onSearch}
            type="text"
            className="form-control"
            name="search"
            aria-label="Small"
            placeholder="Search"
            aria-describedby="inputGroup-sizing-sm"
            style={{ marginTop: "13px" }}
          ></input>
        </div>
      </div>
    );
  }
}

export default SearchBar;
