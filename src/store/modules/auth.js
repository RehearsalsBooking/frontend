export default {
  namespaced: true,
  state: {
    user: undefined,
    isAuthenticated: undefined,
    promise: undefined,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setPromise(state, promise) {
      state.promise = promise;
    },
    updateAuthenticatedState(state, isAuthenticated) {
      state.isAuthenticated = isAuthenticated;
    },
    clear(state) {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
  actions: {
    async loginViaOauthToken({ commit }, { provider, query }) {
      await this._vm.$http.get("sanctum/csrf-cookie");
      const { data } = await this._vm.$http.get(
        `/auth/${provider}/callback${query}`
      );
      commit("setUser", data.data);
      commit("updateAuthenticatedState", true);
      return data.data;
    },
    async loginTest({ commit }) {
      await this._vm.$http.get("sanctum/csrf-cookie");
      const { data } = await this._vm.$http.post("/login/test");
      commit("setUser", data.data);
      commit("updateAuthenticatedState", true);
      return data.data;
    },
    async fetchUser({ commit, state }) {
      if (state.user !== undefined) {
        return state.user;
      }
      let promise = this._vm.$http
        .get("/me")
        .then(({ data }) => {
          commit("setUser", data.data);
          commit("updateAuthenticatedState", true);
        })
        .catch(() => {
          commit("clear");
        });

      commit("setPromise", promise);
      return promise;
    },
    updateUser({ commit }) {
      this._vm.$http
        .get("/me")
        .then(({ data }) => {
          commit("setUser", data.data);
          commit("updateAuthenticatedState", true);
        })
        .catch(() => {
          commit("clear");
        });
    },
    async logout({ commit }) {
      await this._vm.$http.post("/logout");
      commit("clear");
    },
  },
  getters: {
    getUser(state) {
      return state.user;
    },
    isAuthenticated(state) {
      return state.isAuthenticated;
    },
  },
};
