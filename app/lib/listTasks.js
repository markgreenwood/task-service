module.exports = ({ esStore }) => () => {
  return esStore.list();
};