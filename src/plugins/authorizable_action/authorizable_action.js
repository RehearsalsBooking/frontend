import AuthorizableAction from "./AuthorizableAction";
export default function install(Vue) {
  const data = {
    showDialog: false,
    email: "",
    emailRules: [
      (v) => !!v || "Введите почтовый адрес",
      (v) => /.+@.+/.test(v) || "Неправильный почтовый адрес",
    ],
    password: "",
    passwordRules: [(v) => !!v || "Введите пароль"],
    valid: true,
    loading: false,
    title: "",
  };
  AuthorizableAction.data = () => data;

  Vue.component("AuthorizableAction", AuthorizableAction);
  Vue.prototype.$authorize = function $authorize(callback, title) {
    if (!this.$auth.check()) {
      data.showDialog = true;
      data.title = title ?? "Вход в приложение";
      return;
    }

    callback();
  };
}
