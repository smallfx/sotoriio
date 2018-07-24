import 'isomorphic-fetch';

const apiURL = 'https://api.fori.io/api/v1/';

const fetchJSON = url => (
  fetch(url).then(
    resp => {
      if (!resp.ok) throw Error(resp.statusText);
      return resp.json();
    }
  )
);

export const getUserProfile = (dispatch, userID) => {
  dispatch({ type: 'USER_PROFILE_FETCH', userID });
  return fetchJSON(`${apiURL}users/${userID}/profile`)
  .then(
    ({ profile }) => {
      dispatch({ type: 'USER_PROFILE_LOAD', userID, data: profile || {} });
    }
  )
  .catch(
    error => {
      dispatch({ type: 'USER_PROFILE_ERROR', userID });
      console.warn(`=== USER ${userID} PROFILE FETCH ERROR ===`);
      console.error(error);
    }
  );
};

export const getUserWorks = (dispatch, userID) => {
  dispatch({ type: 'USER_WORKS_FETCH', userID });
  return fetchJSON(`${apiURL}users/${userID}/works`)
  .then(
    ({ works }) => {
      dispatch({ type: 'USER_WORKS_LOAD', userID, data: works || [] });
    }
  )
  .catch(
    error => {
      dispatch({ type: 'USER_WORKS_ERROR', userID });
      console.warn(`=== USER ${userID} WORKS FETCH ERROR ===`);
      console.error(error);
    }
  );
};

export const getSingleWork = (dispatch, workID) => {
  dispatch({ type: 'SINGLE_WORK_FETCH', workID });
  return fetchJSON(`${apiURL}works/${workID}`)
  .then(
    ({ work }) => {
      dispatch({ type: 'SINGLE_WORK_LOAD', workID, data: work || {} });
    }
  )
  .catch(
    error => {
      dispatch({ type: 'SINGLE_WORK_ERROR', workID });
      console.warn(`=== WORK ${workID} FETCH ERROR ===`);
      console.error(error);
    }
  );
};

export const getUser = (dispatch, userID) => {
  return Promise.all([
    getUserProfile(dispatch, userID),
    getUserWorks(dispatch, userID)
  ]);
};

