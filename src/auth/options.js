import authBearer from "@websanova/vue-auth/drivers/auth/bearer.js";
import authHttp from "@websanova/vue-auth/drivers/http/axios.1.x";
import authRouter from "@websanova/vue-auth/drivers/router/vue-router.2.x";

authBearer.response = res => {
  return (res.data || {}).token;
};

export default {
  auth: authBearer,
  http: authHttp,
  router: authRouter,
  loginData: {
    url: "/login",
    fetchUser: false
  },
  logoutData: {
    url: "/logout",
    makeRequest: true
  },
  refreshData: {
    enabled: false
  },
  fetchData: {
    url: "/me"
  }
};
