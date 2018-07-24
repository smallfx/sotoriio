import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router, Link } from '../routes';
import styled from 'styled-components';

import ReactPlayer from 'react-player'

import UpdateToast from '../components/UpdateToast';
import Loading from '../components/Loading';
import NotFound from '../components/NotFound';

import { getSingleWork } from '../api.js';

const WorkDisplayContainer = styled.div`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: 1fr 1fr;
  max-width: 920px;
  margin: 0 auto 40px;
  padding: 40px 10px 0;

  @media (max-width: 899px) {
    grid-template-columns: 1fr;
  }
`;

const WorkInfoColumn = styled.div`
  h2 {
    font-weight: bold;
    font-size: 20px;
    margin-bottom: 20px;
  } 

  ul {
    padding-bottom: 20px;
    margin-bottom: 20px;
    border-bottom: 1px solid lightgray;
  }

  ul li {
    font-size: 12px;
    line-height: 1.6em;
  }

  a {
    color: black; font-weight: bold;
  }

  p {
    font-size: 14px;
    line-height: 1.6em;
    white-space: pre-line;
  }
`;

const WorkAssetColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const WorkAsset = styled.div`
  margin-bottom: 20px;

  &:last-child { margin-bottom: 0 }

  img {
    display:block;
    width: 100%;
  }

  > div {
    position: relative;
    padding-top: 56.25%;
  }
  
  > div > div {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

const Creator = props => {
  const authorRole = props.name;
  const authorID = (props.user || {}).screen_name;
  const authorName = (props.user || { profile: {} }).profile.name;

  return (
    <li>
      <Link route="user" params={{ userID: authorID }}>
        <a>{ authorName }</a>
      </Link>
      { ` - ${authorRole}` }
    </li>
  );
};

const WorkImage = props => (
  <WorkAsset>
    <img src={ props.urls.detail } />
  </WorkAsset>
);

const WorkVideo = props => (
  <WorkAsset>
    <ReactPlayer width="100%" height="100%" url={ props.url } />
  </WorkAsset>
);

const WorkDisplay = props => {
  const author = props.creative_roles[0] || {};

  return (
    <WorkDisplayContainer>
      <WorkInfoColumn>
        <h2>{ props.title }</h2>
        <ul>
          { props.creative_roles.map(role => <Creator { ...role } />) }
        </ul>
        <p>{ props.description }</p>
      </WorkInfoColumn>
      <WorkAssetColumn>
        { (props.type === 'image') &&
          props.images.map(item => <WorkImage { ...item } />)
        }
        { (props.type === 'video') &&
          props.videos.map(item => <WorkVideo { ...item } />)
        }
      </WorkAssetColumn>
    </WorkDisplayContainer>
  );
}

const grabWork = (dispatch, workID) => {
  if (!workID || workID === '') {
    Router.pushRoute('/');
    return Promise.resolve();
  }

  return getSingleWork(dispatch, workID);
};

class WorkPage extends Component {
  static async getInitialProps({ isServer, query, store }) {

    // pre-hydrate Redux server-side
    if (isServer) await grabWork(store.dispatch, query.workID);

    return { query };
  }

  componentDidMount = () => {
    const { dispatch, workID } = this.props;

    grabWork(dispatch, workID);
  }

  componentWillReceiveProps = newProps => {
    const { dispatch } = this.props;

    if (newProps.workID !== this.props.workID) grabWork(dispatch, newProps.workID);
  } 


  render = () => {
    const { props } = this;
    const { workID, work } = props;
    const { data, loading } = work;

    const workLoaded = Boolean(data);

    return (
      <div>
        <UpdateToast updating={ workLoaded && loading } />

        { workLoaded
          ? <WorkDisplay { ...data } />
          : (loading ? <Loading work /> : <NotFound work />)
        }
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const workID = ownProps.query.workID;
  const work = state.works[workID];

  return {
    workID,
    work
  };
}

export default connect(mapStateToProps)(WorkPage);
