import Vue from "vue";
import moment from "moment";

Vue.filter("formatDate", function (value) {
  if (!value) return "";
  return moment(value).format("DD.MM.YY");
});

Vue.filter("formatDateTime", function (value) {
  if (!value) return "";
  return moment(value).format("DD MMMM, dddd, в HH.mm");
});
