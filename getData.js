const axios = require("axios");
const headers = require("./headers.js");
const parseData = require("./parser");
async function fetchData(url) {
  try {
    const response = await axios.post(
      url,
      {
        symbols:
          "1101666%2C1141571%2C1103506%2C1182591%2C587014%2C543017%2C1081843%2C566018%2C1119478%2C1173434%2C%2C%2C%2C%2C%2C%2C%2C%2C%2C%2C%2C&isIndex=0&gls=+gls%3D33052520206686x950533x",
      },
      { headers }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}
const getData = async () => {
  const url = "https://www.globes.co.il/portal/portfolio.aspx?id=760306";
  const data = await fetchData(url);
  return data ? parseData(data) : null;
};

module.exports = getData;
