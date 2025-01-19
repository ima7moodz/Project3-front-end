import client from "./config"

export const getProfile = async () => {
  const token = localStorage.getItem("authToken")
  if (!token) {
    throw new Error("Token not found")
  }
  try {
    const response = await client.get("/user/profile", {
      headers: { Authorization: `Bearer ${token}` },
    })
    return response.data
  } catch (error) {
    console.error("Error fetching profile:", error)
    throw error
  }
}
