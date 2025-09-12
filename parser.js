const cheerio = require("cheerio");

const parseData = (html) => {
  try {
    const $ = cheerio.load(html);

    const results = [];

    $('tr[data-type="6"]').each((i, elem) => {
      const name = $(elem).find("a.rowLink").text().trim();
      const last = $(elem).find("td.Row.last").text().trim();
      const change = $(elem).find("span.changeP").text().trim();
      const value =
        parseFloat($(elem).find("b.valuemoney").text().trim()) * 1000;
      const profit = $(elem).find("td.Row.profitmoney").text().trim();
      const yieldValue = $(elem).find("span.changePAdd").text().trim();

      results.push({
        name,
        last,
        change,
        value,
        profit,
        yield: yieldValue,
      });
    });

    return results;
  } catch (error) {
    console.error("Parsing error:", error);
    return [];
  }
};

module.exports = parseData;
