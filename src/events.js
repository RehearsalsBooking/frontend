export default [
  {
    name: "success",
    callback: function(msg = "Успешно") {
      this.snackbar = {
        show: true,
        color: "success",
        text: msg
      };
    }
  },
  {
    name: "error",
    callback: function(msg = "Ошибка") {
      this.snackbar = {
        show: true,
        color: "error",
        text: msg
      };
    }
  }
];
