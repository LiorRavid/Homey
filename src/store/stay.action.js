import { stayService } from '../services/stay.service.js'

export function loadToys() {
  return async (dispatch, getState) => {
    try {
      const {toyModule: { filterBy, sort }} = getState()
      const toys = await toyService.query(filterBy, sort)
      dispatch({ type: 'SET_TOYS', toys })
    } catch (err) {
      console.error(err)
    }
  }
}

export function save(toy, isUpdate) {
  return (dispatch) => {
    return toyService.save(toy).then((savedToy) => {
      if (!isUpdate) {
        dispatch({ type: 'ADD_TOY', toy: savedToy })
      } else {
        dispatch({ type: 'UPDATE_TOY', toy: savedToy })
      }
    })
  }
}

export function removeToy(toyId) {
  return async (dispatch) => {
    try {
     await toyService.remove(toyId)
     dispatch({ type: 'REMOVE_TOY', toyId })
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
