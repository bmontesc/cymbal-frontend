const BACKEND_URL = 'http://localhost:4000'

export const getUserById = async (user_id) => {
  const response = await fetch(`${BACKEND_URL}/users/${user_id}`)
  return response.json()
}

export const getUsers = async () => {
    const response = await fetch(`${BACKEND_URL}/users`)
    return response.json()
}

export const getActivities = async () => {
    const response = await fetch(`${BACKEND_URL}/activities?page=1&per_page=100`)
    return response.json()
}