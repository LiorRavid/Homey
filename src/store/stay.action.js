import { stayService } from '../services/stay.service.js'

export function loadStays() {
  return async (dispatch, getState) => {
    try {
      const { filterBy } = getState().toyModule
      const stays = await stayService.query(filterBy)
      dispatch({ type: 'SET_STAYS', stays })
    } catch (err) {
      console.error(err)
    }
  }
}


export function setFilter(filterBy) {
  return (dispatch) => {
    dispatch({ type: 'SET_FILTER', filterBy })
  }
}

export function setSort(sort) {
  return (dispatch) => {
    dispatch({ type: 'SET_SORT', sort })
  }
}
