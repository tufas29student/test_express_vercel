const cheerio = require("cheerio");

const parseData = (html) => {
  try {
    const $ = cheerio.load(html);

    const precentChange = $('section[id="section_yields"]')
      .find("tbody")
      .find("tr")
      .eq(1)
      .find("td")
      .eq(4)
      .text()
      .trim();

    const totalProfit = $('section[id="section_total"]')
      .find("tbody")
      .find("tr")
      .eq(1)
      .find("td")
      .eq(2)
      .text()
      .trim();

    const stocks = [];

    $('tr[data-type="6"]').each((i, elem) => {
      const name = $(elem).find("a.rowLink").text().trim();
      const last = $(elem).find("td.Row.last").text().trim();
      const change = $(elem).find("span.changeP").text().trim();
      const value =
        parseFloat($(elem).find("b.valuemoney").text().trim()) * 1000;
      const profit = $(elem).find("td.Row.profitmoney").text().trim();
      const yieldValue = $(elem).find("span.changePAdd").text().trim();

      stocks.push({
        name,
        last,
        change,
        value,
        profit,
        yield: yieldValue,
      });
    });

    return {
      stocks,
      totalProfit,
      precentChange: parseFloat(precentChange.replace(",", "")),
    };
  } catch (error) {
    console.error("Parsing error:", error);
    return [];
  }
};

module.exports = parseData;
