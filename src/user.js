import {REHYDRATE} from 'redux-persist/constants'

export const types = {
    LIST: "LIST",
    REMOVE: "REMOVE",
    VISIBLE: "VISIBLE",
    EDIT: "EDIT",
    SAVE: "SAVE",
    ADD: "ADD",
    LOGIN: "LOGIN"
  };

export const actionCreators = {
  list: items => {
    return { type: types.LIST, payload: items };
  },
  remove: index => {
    return { type: types.REMOVE, payload: index };
  },
  visible: item => {
    return {type: types.VISIBLE, payload: item}
  },
  edit: index =>{
    return {type: types.EDIT, payload: index}
  },
  save: item =>{
    return {type: types.SAVE, payload: item}
  },
  add: item =>{
    return {type: types.ADD, payload: item}
  },
  login: item =>{
    return {type: types.LOGIN, payload: item}
  }
};

const initialState = {
    todos: {},
    hide:true,
    edit:'',
    token: '',
};

export const reducer = (state = initialState, action) => {

    console.log("action", action)
    const { todos,hide,edit } = state;
    const { type, payload } = action;
    console.log("TODOS",todos);
    switch (type) {
      case REHYDRATE: 
      return {
         ...state,
          ...action.payload.user
       }
        case types.LIST: {
        return {
          ...state,
          todos: payload
        };
      }
      case types.REMOVE: {
        console.log("REMOVE working",todos.filter((todo, i) => i !== payload))
        return {
          ...state,
          todos: todos.filter((todo, i) => i !== parseInt(payload))
        };
      } 
      case types.VISIBLE: {
        return {
          ...state,
          hide: !hide,
        };
      } 
      case types.EDIT: {
        return {
          ...state,
          edit: payload,
        };
      }
      case types.SAVE: {
        let itemIndex = todos.findIndex(i => i.id == payload.id)
        todos.splice(itemIndex, 1 , payload)
        return {
          ...state,
          todos: todos,
          edit: ""
        };
      } 
      case types.ADD: {
        return {
          ...state,
          todos: [...todos, payload]
        };
      } 
      case types.LOGIN: {
        return {
          ...state,
          token: payload
        };
      } 
    }
    return state;
  };
