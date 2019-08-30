import config from "./config";
import init from "./init";
// import config from "./config";
// 主的流程控制
let apply = (action, ...args) => {
  const actions = {
    config,
    init
  };
  actions[action](...args);
};

export default apply;
