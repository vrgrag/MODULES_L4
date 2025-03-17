async function fetchData(url) {
    const result = {
      data: [],
      isLoading: true,
      error: null,
    };
  
    try {
      console.log("Загрузка началась...");
      result.isLoading = true;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Ошибка загрузки: ${response.status}`);
      }
      result.data = await response.json();
      result.isLoading = false;
      console.log("Данные успешно загружены:", result.data);
    } catch (error) {
      result.error = error.message;
      result.isLoading = false;
      console.error("Произошла ошибка:", error.message);
    }
  
    return result;
  }
  
  module.exports = {fetchData};
  