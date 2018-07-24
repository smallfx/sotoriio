import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router } from '../routes';
import styled from 'styled-components';

import Profile from '../components/Profile';
import UpdateToast from '../components/UpdateToast';
import WorksGrid from '../components/WorksGrid';
import Loading from '../components/Loading';
import NotFound from '../components/NotFound';

import { getUser } from '../api.js';

const UserPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 920px;
  padding: 0 10px;
  margin: 0 auto 40px;

  > * { width: 100%; }
`;

const grabUser = ( dispatch, userID ) => {
  if (!userID || userID === '') {
    Router.pushRoute('/');
    return Promise.resolve();
  }

  return getUser(dispatch, userID);
}

class UserPage extends Component {
  static async getInitialProps({ isServer, query, store }) {

    // pre-hydrate Redux server-side
    // i noticed that this causes the page to load a bit slow for users with a lot of works
    // (due to slow response time from '/v1/works') - leaving this in for implementation detail
    if (isServer) await grabUser(store.dispatch, query.userID);

    return { query };
  }

  componentDidMount = () => {
    const { dispatch, userID } = this.props;
    
    grabUser(dispatch, userID);
  }

  componentWillReceiveProps = newProps => {
    const { dispatch } = this.props;

    if (newProps.userID !== this.props.userID) grabUser(dispatch, newProps.userID);
  } 


  render = () => {
    const { props } = this;
    const { userID, user, works } = props;
    const { data, loading, worksLoading } = user;

    const profileLoaded = Boolean(data);

    const worksGrid = (
      (works.length > 0)
        ? <WorksGrid works={ works } key="worksgrid" />
        : (worksLoading ? <Loading works key="ldw" /> : <NotFound works key="nfw" />)
    );

    const profile = (
      profileLoaded
        ? [ <Profile user={ data } key="profile" />, worksGrid ]
        : (loading ? <Loading user key="ldu" /> : <NotFound user key="nfu" />)
    );

    return (
      <UserPageContainer>
        <UpdateToast updating={ profileLoaded && (loading || worksLoading) } />
        { profile }
      </UserPageContainer>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const userID = ownProps.query.userID;
  const user = state.users[userID] || {};
  const userIDNumber = user.data ? user.data.user.id : undefined;

  const works = Object.keys(state.works).reduce((acc, workID) => {
    const work = state.works[workID];
    if (work.data && work.data.author_id === userIDNumber) acc.push(work);
    return acc;
  }, []).reverse();

  return {
    userID,
    user,
    works
  };
}

export default connect(mapStateToProps)(UserPage);
