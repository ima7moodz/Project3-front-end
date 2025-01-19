import client from "./config"

export const getClasses = async () => {
  const response = await client.get("/class")
  return response.data
}

export const addClass = async (data) => {
  const response = await client.post("/class", data)
  return response.data
}
