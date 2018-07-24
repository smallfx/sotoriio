const initialState = {
  users: {},
  works: {}
};

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'USER_PROFILE_FETCH': {
          const { userID } = action;

          const loadingUser = { ...state.users[userID], loading: true };
          const newUsers = { ...state.users, [userID]: loadingUser };

          return { ...state, users: newUsers };
        }
        case 'USER_PROFILE_LOAD': {
          const { userID, data } = action;

          const oldUser = state.users[userID] || {};
          const loadedUser = { ...oldUser, data, loading: false };
          const newUsers = { ...state.users, [userID]: loadedUser };

          return { ...state, users: newUsers };
        }
        case 'USER_PROFILE_ERROR': {
            const { userID } = action;
          return { ...state, users: { ...state.users, [userID]: { loading: false } } };
        }
        case 'USER_WORKS_FETCH': {
          const { userID } = action;
          const user = state.users[userID];
          const newUsers = {
            ...state.users,
            [userID]: { ...user, worksLoading: true }
          };
          return { ...state, users: newUsers };
        }
        case 'USER_WORKS_LOAD': {
          const { userID } = action;

          const worksMap = action.data.reduce((acc, work) => ({
            ...acc,
            [work.id]: { data: work }
          }),{});
          const newWorks = { ...state.works, ...worksMap }

          const user = state.users[userID];
          const newUsers = {
            ...state.users,
            [userID]: { ...user, worksLoading: false }
          };

          return { users: newUsers, works: newWorks };
        }
        case 'SINGLE_WORK_FETCH': {
          const { workID } = action;

          const loadingWork = { ...state.works[workID], loading: true };
          const newWorks = { ...state.works, [workID]: loadingWork };

          return { ...state, works: newWorks };
        }
        case 'SINGLE_WORK_LOAD': {
          const { workID, data } = action;

          const oldWork = state.works[workID] || {};
          const loadedWork = { ...oldWork, data, loading: false };
          const newWorks = { ...state.works, [workID]: loadedWork };

          return { ...state, works: newWorks };
        }
        default:
            return state
    }
};

export default reducer;
