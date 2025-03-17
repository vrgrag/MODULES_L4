const fs = require("node:fs");
const path = require("node:path");
const fsPromises = require("node:fs/promises");
require("dotenv").config();

const mainDir = process.env.MAIN_DIRECT;
const ALLOWED_EXTENSIONS = new Set(['.txt', '.json', '.rtf']);

function checkExtension(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (!ALLOWED_EXTENSIONS.has(ext)) {
    throw new Error(`Недопустимое расширение файла: ${ext}`);
  }
}

const readFileSync = (filePath) => {
  try {
    checkExtension(filePath);
    const data = fs.readFileSync(filePath, "utf8");
    console.log("Файл прочитан:", data);
    return data;
  } catch (err) {
    console.error("Ошибка при чтении файла:", err);
  }
};

const writeFileSync = (filePath, content) => {
  try {
    checkExtension(filePath);
    fs.writeFileSync(filePath, content);
    console.log("Файл записан");
  } catch (err) {
    console.error("Ошибка при записи файла:", err);
  }
};

const changeContentSync = (filePath, content) => {
  try {
    writeFileSync(filePath, content);
  } catch (err) {
    console.error("Ошибка при изменении содержимого файла:", err);
  }
};

const clearFileSync = (filePath) => {
  try {
    checkExtension(filePath);
    fs.writeFileSync(filePath, "");
    console.log("Содержимое файла очищено");
  } catch (err) {
    console.error("Ошибка при очистке файла:", err);
  }
};

const cleanFileSync = (filePath) => {
  try {
    checkExtension(filePath);
    let content = fs.readFileSync(filePath, "utf8");
    content = content.replace(/[0-9]/g, "").toLowerCase();
    fs.writeFileSync(filePath, content);
    console.log("Файл очищен от шума");
  } catch (err) {
    console.error("Ошибка при очистке файла:", err);
  }
};

const copyFileSync = (src, dest) => {
  try {
    checkExtension(src);
    checkExtension(dest);
    fs.copyFileSync(src, dest);
    console.log("Файл скопирован");
  } catch (err) {
    console.error("Ошибка при копировании файла:", err);
  }
};

const createCatalogSync = (name) => {
  try {
    if (!fs.existsSync(name)) {
      fs.mkdirSync(name, { recursive: true });
      console.log("Папка успешно создана");
    } else {
      console.log("Папка уже существует");
    }
  } catch (err) {
    console.error("Ошибка при создании папки:", err);
  }
};

const deleteCatalogSync = (name) => {
  try {
    fs.rmdirSync(name);
    console.log("Папка успешно удалена");
  } catch (err) {
    console.error("Ошибка при удалении папки:", err);
  }
};

const deleteMainDirsSync = (directory, ignoreDirs = mainDir) => {
  try {
    const files = fs.readdirSync(directory);
    files.forEach((file) => {
      if (!ignoreDirs.includes(file)) {
        const filePath = path.join(directory, file);
        const stats = fs.lstatSync(filePath);
        if (stats.isDirectory()) {
          deleteMainDirsSync(filePath, ignoreDirs);
          fs.rmdirSync(filePath);
        } else {
          fs.unlinkSync(filePath);
        }
      }
    });
    console.log("Файлы и папки удалены");
  } catch (err) {
    console.error("Ошибка при удалении файлов и папок:", err);
  }
};

const printFilePathSync = (directory, ignoreDirs = mainDir) => {
  try {
    const files = fs.readdirSync(directory);
    files.forEach((file) => {
      if (!ignoreDirs.includes(file)) {
        const filePath = path.join(directory, file);
        const stats = fs.lstatSync(filePath);
        if (stats.isDirectory()) {
          printFilePathSync(filePath, ignoreDirs);
        } else if (ALLOWED_EXTENSIONS.has(path.extname(file).toLowerCase())) {
          console.log(filePath);
        }
      }
    });
  } catch (err) {
    console.error("Ошибка при выводе путей к файлам:", err);
  }
};

module.exports = {
    checkExtension,
    readFileSync,
    writeFileSync,
    changeContentSync,
    clearFileSync,
    cleanFileSync,
    copyFileSync,
    createCatalogSync,
    deleteMainDirsSync,
    printFilePathSync
  };