import Segment from 'soya/lib/data/redux/Segment';
import Load from 'soya/lib/data/redux/Load';
import QueryResult from 'soya/lib/data/redux/QueryResult';
import update from 'react-addons-update';


const ID = 'todoSegment';
const SET_FILTER_ACTION_TYPE = `${ID}.set_filter`;
const ADD_ACTION_TYPE = `${ID}.add`;
const TOGGLE_ACTION_TYPE = `${ID}.toggle`;
const INIT_ACTION_TYPE = `${ID}.init`;
const DELETE_ACTION_TYPE = `${ID}.delete`;
const UPDATE_ACTION_TYPE = `${ID}.update`;
const EDITING_ACTION_TYPE = `${ID}.editing`;
const SET_TODOS_ACTION_TYPE = `${ID}.set`;

let nextTodoId = 0;

const ACTION_CREATOR = {
  add(text) {
    return {
      type : ADD_ACTION_TYPE,
      id : nextTodoId++,
      text : text,
      isCompleted : false
    }
  },
  filterBy(filter) {
    return {
      type : SET_FILTER_ACTION_TYPE,
      filter : filter
    }
  },
  toggleTodo(id) {
    return {
      type : TOGGLE_ACTION_TYPE,
      id : id
    }
  },
  deleteTodo(index) {
    return {
      type : DELETE_ACTION_TYPE,
      index : index
    }
  },
  updateTodo(index, newtodo) {
    return {
      type : UPDATE_ACTION_TYPE,
      index : index,
      newtodo : newtodo
    }
  },
  editTodo(id){
    return {
      type : EDITING_ACTION_TYPE,
      id : id
    }
  },
  setTodo(todos){
    return{
        type : SET_TODOS_ACTION_TYPE,
        todos : todos
    }
  },
  init() {
    return {
      type : INIT_ACTION_TYPE
    }
  }
}

const REDUCER = function( state, action ) {

  switch(action.type) {
    case ADD_ACTION_TYPE :
      state = update(
        state,
        {
          todos: {
            $push : [{
              id : action.id,
              text : action.text,
              isCompleted : action.isCompleted
            }]
          }
        }
      );
      break;
    case TOGGLE_ACTION_TYPE :
      state = update(
        state,
        {
          todos: {
            $apply : function(todos) {
              for (var i = 0; i < todos.length; i++) {
                if(todos[i].id == action.id){
                  todos[i] = update(todos[i],{
                    $set:{
                      id : todos[i].id,
                      text : todos[i].text,
                      isCompleted : !todos[i].isCompleted
                    }
                  });
                }
              }
              return todos;
            }
          }
        }
      );
      break;
    case SET_FILTER_ACTION_TYPE :
        state = update(
          state,
          {
            filter_iscomplete: {
              $set : action.filter
            }
          }
        );
      break;
    case INIT_ACTION_TYPE :
      state = update (
        state,
        {
          $set : {
            todos: [],
            filter_iscomplete : 'All',
            editing: null
          }
        }
      )
      break;
    case DELETE_ACTION_TYPE :
      state = update(
        state,
        {
          todos: {
            $splice : [
              [action.index,1]
            ]
          }
        }
      )
      break;
    case UPDATE_ACTION_TYPE :
    state = update(
      state,
      {
        todos: {
          $splice : [
            [
              action.index,
              1,
              action.newtodo
            ]
          ]
        }
      }
    );
      break;
    case EDITING_ACTION_TYPE :
      state = update(
        state,
        {
          editing: {
            $set : action.id
          }
        }
      );
      break;
    case SET_TODOS_ACTION_TYPE :
      state = update(
        state,
        {
          todos: {
            $set : action.todos
          }
        }
      );
      break;
  }

  return state;
}

export default class TodoSegment extends Segment {
  static id() {
    return ID;
  }

  static getServiceDependencies() {
    return []; // currently we don't need any service dependency
  }

  static getActionCreator() {
    return ACTION_CREATOR;
  }

  static getReducer() {
    return REDUCER;
  }

  static generateQueryId(query) {
    return query;
  }

  static queryState(query, queryId, segmentState) {
    if(segmentState == null || segmentState[queryId] == null) {
      return QueryResult.notLoaded();
    }

    return QueryResult.loaded(segmentState[queryId]);
  }

  static createLoadFromQuery(query, queryId, segmentState, services) {
    return ACTION_CREATOR.init();
  }
}
