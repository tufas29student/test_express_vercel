const cookie = process.env.COOKIE;

const headers = {
  accept: "application/json, text/javascript, */*; q=0.01",
  "accept-encoding": "gzip, deflate, br, zstd",
  "accept-language": "he-IL,he;q=0.9,en-US;q=0.8,en;q=0.7,ar;q=0.6,fr;q=0.5",
  "content-length": 182,
  "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
  cookie: cookie,
  origin: "https://www.globes.co.il",
  priority: "u=1, i",
  referer: "https://www.globes.co.il/portal/portfolio.aspx?id=760306",
  "sec-ch-ua":
    '"Not;A=Brand";v="99", "Google Chrome";v="139", "Chromium";v="139"',
  "sec-ch-ua-mobile": "?0",
  "sec-ch-ua-platform": '"Windows"',
  "sec-fetch-dest": "empty",
  "sec-fetch-mode": "cors",
  "sec-fetch-site": "same-origin",
  "user-agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36",
  "x-requested-with": "XMLHttpRequest",
};

module.exports = headers;
