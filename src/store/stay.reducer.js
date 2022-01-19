const initialState = {
  stays: [],
  // filterBy: {
  //   name: '',
  //   inStock: 'undefined',
  //   labels: null,
  // },
  // sort: {
  //   type: 'byName',
  //   order: 1,
  // },
}

export function stayReducer(state = initialState, action) {
  let newState = state

  switch (action.type) {
    case 'SET_STAYS':
      newState = { ...state, stays: [...action.stays] }
      break
    // case 'SET_FILTER':
    //   newState = { ...state, filterBy: { ...action.filterBy } }
    //   break
    // case 'SET_SORT':
    //   const newOrder = (state.sort.type === action.sort.type) ? state.sort.order * -1 : state.sort.order
    //   newState = { ...state, sort: { ...action.sort , order: newOrder} }
    //   break
    default:
  }
  return newState
}
