module.exports = (success, status, data, message) => {
  return {
    success,
    status,
    data: data ?? null,
    message: message ?? "",
  };
};
