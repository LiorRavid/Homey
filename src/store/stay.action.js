import { stayService } from '../services/stay.service.js'

export function loadStays() {
  console.log('hio')
  return async (dispatch, getState) => {
    try {
      const stays = await stayService.query()
      dispatch({ type: 'SET_STAYS', stays })
    } catch (err) {
      console.error(err)
    }
  }
}


// export function setFilter(filterBy) {
//   return (dispatch) => {
//     dispatch({ type: 'SET_FILTER', filterBy })
//   }
// }

// export function setSort(sort) {
//   return (dispatch) => {
//     dispatch({ type: 'SET_SORT', sort })
//   }
// }
