export const getToken = () => {
  const user = getUserFromStorage()
  return user?.token
};

export const getRefreshToken = () => {
  const user = getUserFromStorage()
  return user?.refreshToken
};

export const createAuthHeader = () => {
    return {
        authorization: `Bearer ${getToken()}`,
        "content-type": "application/json",
      }
}
  
export const updateAccessToken = (updatedToken) => {
  const user = getUserFromStorage()
  user.token = updatedToken
  localStorage.setItem("user", JSON.stringify(user));
}

export const getUserFromStorage = () => {
  return JSON.parse(localStorage.getItem("user")); 
}

export const setUserInStorage = (updatedUser) => {
  localStorage.setItem("user", JSON.stringify(updatedUser));
}

export const removeUserFromStorage = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
}