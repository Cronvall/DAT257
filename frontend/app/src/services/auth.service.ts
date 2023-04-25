import axios from "axios";

const register_URL = "http://localhost:8080/api/users"
const login_URL = "http://localhost:8080/api/authentication"



export const register = (username: string, email: string, password: string) => {
  return axios.post(register_URL, {
    username,
    email,
    password,
  });
};

export const login = (username: string, password: string) => {
  return axios
    .post(login_URL, {
      username,
      password,
    })
    .then((response) => {
      document.cookie = "user="+JSON.stringify(response.data)+"; path=/";
      console.log("User logged in",response.data);
      return response.data;
    });
};

export const logout = () => {
  document.cookie = "user="; "path=/";
  location.reload();
};

export const getCurrentUser = () => {

  let cookie = getCookie("user");
  if (cookie) {
    return JSON.parse(cookie);
  }
  return null;
};


export const getCookie = (cname: string) => {
  let name = cname + "=";
  let decodedCookie;
  try{
    decodedCookie = decodeURIComponent(document.cookie);
  } catch (e) {
    return "";
  }
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}