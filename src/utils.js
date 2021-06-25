export function setToken(userToken, username) {
  sessionStorage.setItem('token', JSON.stringify(userToken));
  sessionStorage.setItem('username', JSON.stringify(username));
}

export function getToken() {
  const tokenString = sessionStorage.getItem('token');
  const userToken = JSON.parse(tokenString);
  return userToken?.access_token
}

export function getUsername() {
  const username = JSON.parse(sessionStorage.getItem('username'));
  return username
}

export function getAuthHeader() {
  const userToken = getToken()
  return {
    "authorization": `Bearer ${userToken}`
  }
}