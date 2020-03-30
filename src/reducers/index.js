
// actions
const SET_PRODUCT_LIST= 'productList/GET';
const ADD_ITEM  = 'item/ADD';
const EDIT_ITEM  = 'item/EDIT';
const REMOVE_ITEM = 'item/REMOVE';

const initialState = {
  products: [],
};

const productsReducer = (state = initialState, action = {}) =>{
  switch(action.type) {
    case SET_PRODUCT_LIST:
      return setProductsListACReducer(state, action.payload)
    case ADD_ITEM:
      return addItemReducer(state, action.payload)
    case EDIT_ITEM:
      return editItemReducer(state, action.payload)
    case REMOVE_ITEM:
      return removeItemReducer(state, action.payload)
    default:
      return state
  }
}

function setProductsListACReducer(state, payload) {
  return payload
}

function addItemReducer(state, payload) {

  return [
    ...state,
    payload
  ]
}

 function editItemReducer(state, payload) {
    var edittedItem = state.find(({_id}) => _id === payload._id)
    var newState = [...state]

    newState[state.indexOf(edittedItem)] = payload

    return [
      ...newState
    ]
}

 function removeItemReducer(state, itemId) {
  var removedItem = state.find(({_id}) => _id === itemId)
  var newState = [...state]

  newState.splice(state.indexOf(removedItem), 1)

  return [
    ...newState
  ]
 }

export function getProductReducer(state, props) {
  return state.products.find(item => item.id === props.id)
}

export function editItemAC(data) {
  return {
    type: EDIT_ITEM,
    payload: data
  }
}

export function removeItemAC(data) {
  return {
    type: REMOVE_ITEM,
    payload: data
  }
}

export function setProductsListAC(data) {
  return {
    type: SET_PRODUCT_LIST,
    payload: data
  }
}

export function addItemAC(data) {
  return {
      type: ADD_ITEM,
      payload: data
  }
}
export default productsReducer;