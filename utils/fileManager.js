// utils/fileManager.js
const fs = require('fs/promises');
const path = require('path');

const getFilePath = (file) => path.join(__dirname, '..', 'db', file);

const readJSON = async (file) => {
  const data = await fs.readFile(getFilePath(file), 'utf-8');
  return JSON.parse(data);
};

const writeJSON = async (file, data) => {
  await fs.writeFile(getFilePath(file), JSON.stringify(data, null, 2), 'utf-8');
};

module.exports = { readJSON, writeJSON };
