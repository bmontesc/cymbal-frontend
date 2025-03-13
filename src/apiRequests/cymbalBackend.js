const user_id = 1;
BACKEND_URL = "http://localhost:3010/";

export const fetchUser = async () => {
    const response = await fetch(`${BACKEND_URL}/users/${user_id}`);
    const data = await response.json();
    console.log(data);
    return data;
};