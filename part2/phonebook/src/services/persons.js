import axios from "axios";
const baseUrl = '/api/persons'

const getAll = () => axios.get(baseUrl)

const create = person => axios.post(baseUrl, person)

const update = (id, person) => axios.put(`${baseUrl}/${id}`, person)

const remove = id => axios.delete(`${baseUrl}/${id}`)

export default { getAll, create, update, remove }