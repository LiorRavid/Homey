const initialState = {
  toys: [],
  filterBy: {
    name: '',
    inStock: 'undefined',
    labels: null,
  },
  sort: {
    type: 'byName',
    order: 1,
  },
}

export function toyReducer(state = initialState, action) {
  let newState = state

  switch (action.type) {
    case 'SET_TOYS':
      newState = { ...state, toys: [...action.toys] }
      break
    case 'ADD_TOY':
      newState = { ...state, toys: [...state.toys, action.toy] }
      break
    case 'REMOVE_TOY':
      newState = {
        ...state,
        toys: state.toys.filter((toy) => toy._id !== action.toyId),
      }
      break
    case 'UPDATE_TOY':
      newState = {
        ...state,
        toys: state.toys.map((currToy) => {
          return currToy._id === action.toy._id ? action.toy : currToy
        }),
      }
      break
    case 'SET_FILTER':
      newState = { ...state, filterBy: { ...action.filterBy } }
      break
    case 'SET_SORT':
      const newOrder = (state.sort.type === action.sort.type) ? state.sort.order * -1 : state.sort.order
      newState = { ...state, sort: { ...action.sort , order: newOrder} }
      break

    default:
  }
  return newState
}
