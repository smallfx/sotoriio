import React from 'react';
import { connect } from 'react-redux';
import { Link } from '../routes';
import styled from 'styled-components';

const WorksGridContainer = styled.div`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(4, 1fr);

  @media (max-width: 899px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 499px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const WorkGridItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: #fafafa;
  border: 1px solid #ededed;
  border-radius: 3px;
  box-shadow: 0 3px 3px rgba(0,0,0,0.05);
  overflow: hidden;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 5px 8px rgba(0,0,0,0.08);
  }

  span {
    line-height: 1.4em;
    font-size: 12px;
    line-height: 1.6em;
    margin-top: 10px;
    padding: 0 10px 10px;
  }
`;

const Thumbnail = styled.div`
  background-color: gray;
  background-image: url(${props => props.thumbURL});
  background-position: center;
  background-size: cover;
  border-bottom: 1px solid #ededed;
  height: 150px;
  width: 100%;
`;

const WorkGridItem = props => {
  const { data } = props;

  let thumbURL = '';

  switch(data.type) {
    case'image':
      thumbURL = data.images[0].urls.list2x;
      break;
    case'video':
      thumbURL = data.videos[0].picture_url;
      break;
  }

  return (
    <Link route='work' params={{ workID: data.id }}>
      <WorkGridItemContainer>
        <Thumbnail thumbURL={ thumbURL } />
        <span>{ data.title }</span>
      </WorkGridItemContainer>
    </Link>
  );
};

export const WorksGrid = props => (
  <WorksGridContainer>
    { props.works.map(work => <WorkGridItem { ...work } key={ work.data.id } />) }
  </WorksGridContainer>
);

export default WorksGrid;
