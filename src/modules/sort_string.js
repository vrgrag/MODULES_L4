function sortstring(items, key) {
  if (!Array.isArray(items)) {
      throw new Error("Входные данные должны быть массивом");
  }

  return items.slice().sort((a, b) => {
      const valA = String(a[key] || '').replace(/\s/g, '').toLowerCase();
      const valB = String(b[key] || '').replace(/\s/g, '').toLowerCase();

      return valA.localeCompare(valB);
  });
};

module.exports = { sortstring };