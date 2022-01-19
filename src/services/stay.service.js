import Axios from 'axios'
var axios = Axios.create({
    withCredentials: true
})

const labelsOptions = [
  { value: 'onWheels', label: 'On wheels' },
  { value: 'boxGame', label: 'Box game' },
  { value: 'art', label: 'Art' },
  { value: 'baby', label: 'Baby' },
  { value: 'doll', label: 'Doll' },
  { value: 'puzzle', label: 'Puzzle' },
  { value: 'outdoor', label: 'Outdoor' },
]

export const toyService = {
  query,
  getById,
  save,
  remove,
  labelsOptions,
}

async function query(filterBy, sort) {
  const { name, inStock, labels } = filterBy
  const { type, order } = sort
  try {
    const res = await axios.get(`http://localhost:3020/api/toy?name=${name}&inStock=${inStock}&labels=${JSON.stringify(labels)}&type=${type}&order=${order}`)
    return res.data
  } catch (err) {
    console.log('Cannot get toys:',  err)
    throw err
  }
  // return axios.get(`http://localhost:3020/api/toy?name=${name}&inStock=${inStock}&labels=${JSON.stringify(labels)}&type=${type}&order=${order}`).then((res) => res.data)
}

async function getById(toyId) {
  // return axios
  //   .get(`http://localhost:3020/api/toy/${toyId}`)
  //   .then((res) => res.data)
  try {
    const res = await axios.get(`http://localhost:3020/api/toy/${toyId}`)
    return res.data
  } catch (err) {
    console.log(`Cannot get toy with id: ${toyId}`)
    throw err
  }
}

async function save(toy) {
  try {
    if (toy._id) {
      const res = await axios.put(`http://localhost:3020/api/toy/${toy._id}`, toy)
      return res.data
    } else {
      const res = await axios.post('http://localhost:3020/api/toy/', toy)
      return res.data
    }
  } catch (err) {
    console.log('Cannot save toy', err)
    throw err
  }
  // if (toy._id)
  //   return axios.put(`http://localhost:3020/api/toy/${toy._id}`, toy)
  //     .then((res) => res.data)
  // else return axios.post('http://localhost:3020/api/toy/', toy).then((res) => res.data)
}

async function remove(toyId) {
  // return axios
  //   .delete(`http://localhost:3020/api/toy/${toyId}`)
  //   .then((res) => res.data)
  try {
    const res = await axios.delete(`http://localhost:3020/api/toy/${toyId}`)
    return res.data
  } catch (err) {
    console.log('Cannot remove toy:', err)
    throw err
  }
}
