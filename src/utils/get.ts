import { getAll } from "./rc";
import downloadGit from "download-git-repo";

export const downloadLocal = async projectName => {
  let config = await getAll();
  let api = `${config.registry}/${config.store}`;
  return new Promise((resolve, reject) => {
    // projectName 为下载到的本地目录
    downloadGit(api, projectName, err => {
      if (err) {
        reject(err);
      }
      resolve();
    });
  });
};
