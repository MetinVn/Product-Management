export const USER_AUTHENTICATED = "USER_AUTHENTICATED";

export function authUser(isAuthenticated) {
  localStorage.setItem("isAuthenticated", isAuthenticated ? "true" : "false");

  return {
    type: USER_AUTHENTICATED,
    payload: isAuthenticated,
  };
}
