import client from "./config"

export const getClasses = async () => {
  const response = await client.get("/class")
  return response.data
}

export const addClass = async (data) => {
  const response = await client.post("/class", data)
  return response.data
}

export const getClassById = async (id) => {
  const response = await client.get(`/class/${id}`)
  return response.data
}

export const deleteClass = async (id) => {
  const response = await client.delete(`/class/${id}`)
  return response.data
}

export const updateClass = async (id, data) => {
  const response = await client.put(`/class/${id}`, data)
  return response.data
}
