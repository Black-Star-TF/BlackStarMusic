import initLocalStorage from "./initLocalStorage";
import pkg from "../../package.json";

// 第一次使用时，要先初始化本地数据
if (localStorage.getItem("appVersion") === null) {
  localStorage.setItem("settings", JSON.stringify(initLocalStorage.settings));
  localStorage.setItem("data", JSON.stringify(initLocalStorage.data));
  localStorage.setItem("appVersion", pkg.version);
}

export default {
  settings: JSON.parse(localStorage.getItem("settings")),
  data: JSON.parse(localStorage.getItem("data")),
  player: null,
  app: {
    songDetailVisible: false,
    playlistDrawerVisible: false,
    messageDrawerVisible: false,
    searchDrawerVisible: false,
    contextMenuVisible: false,
    contextMenuOptions: {},
  },
};
