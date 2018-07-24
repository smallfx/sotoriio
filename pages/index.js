import { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { Link } from '../routes';

const IndexPageContainer = styled.div`
  padding: 40px 0;
  text-align: center;

  h1 {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 20px;
  }

  div {
    display: flex;
    justify-content: center;
  }

  input {
    height: 30px;
    margin-right: 20px;
    padding: 0 10px;
    outline: none;
    border: 1px solid black;
    border-radius: 3px;
  }

  button {
    background: black;
    border: 1px solid black;
    color: white;
    font-size: 14px;
    height: 30px;
    padding: 0 15px;
    border-radius: 3px;
    outline: none;
    cursor: pointer;

    &:disabled {
      opacity: 0.5;
      cursor: default;
    }
  }
`;

class Index extends Component {
  constructor() {
    super();
    this.state = {
      searchVal: 'hirohito'
    };
  }

  searchFieldChange = e => {
    this.setState({ searchVal: e.target.value })
  }

  render = () => {
    const { state } = this;

    return (
      <IndexPageContainer>
        <h1>Search for User</h1>
        <div>
          <input type='text' value={ this.state.searchVal } onChange={ this.searchFieldChange } />
          <Link route='user' params={{ userID: this.state.searchVal || ' ' }}>
            <button disabled={ this.state.searchVal.length === 0 }>Go</button>
          </Link>
        </div>
      </IndexPageContainer>
    );
  }
}

export default Index;
