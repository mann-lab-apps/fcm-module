import puppeteer from "puppeteer";
import { db } from "../db/sqlite.js";
import { axiosToSAC } from "../libs/axios.js";

const SAC_CAL_PAGE_URL =
  "https://www.sac.or.kr/site/main/program/schedule?tab=1";

export const writeConcert = (request, response) => {
  const { title, price } = request?.body;
  const stmt = db.prepare("INSERT INTO concerts (title, price) VALUES (?, ?)");
  const result = stmt.run(title, price);
  return response
    .status(200)
    .send({ id: result.lastInsertRowid, title, price });
};

export const getConcert = (request, response) => {
  const { id } = request.body;
  const stmt = db.prepare("SELECT * FROM concerts WHERE id = ?");
  return response.status(200).send(stmt.get(id));
};

export const getConcerts = (request, response) => {
  const stmt = db.prepare("SELECT * FROM concerts");
  return response.status(200).send(stmt.all());
};

export const updateConcert = (request, response) => {
  const { id, title, price } = request.body;
  console.log("id, title, price", id, title, price);
  const stmt = db.prepare(
    "UPDATE concerts SET title = ?, price = ? WHERE id = ?"
  );
  stmt.run(title, price, id);
  return response.status(200).send({ success: true });
};

export const deleteConcert = (request, response) => {
  const { id } = request.query;
  const stmt = db.prepare("DELETE FROM concerts WHERE id = ?");
  stmt.run(id);
  return response.status(200).send({ success: true });
};

export const scrapSACConcerts = async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-accelerated-2d-canvas",
      "--no-first-run",
      "--no-zygote",
      "--disable-gpu",
    ],
  });

  const page = await browser.newPage();

  let capturedLoginRequestPayload = null;
  let capturedLoginRequestHeaders = {};

  await page.evaluateOnNewDocument(() => {
    Object.defineProperty(navigator, "webdriver", {
      get: () => undefined,
    });
  });

  const loginRequestPromise = new Promise((resolve) => {
    page.on("request", (request) => {
      if (
        request.url().includes(SAC_CAL_PAGE_URL) &&
        request.method() === "POST"
      ) {
        console.log("\n--- CAPTURING LOGIN REQUEST (for comparison) ---");
        capturedLoginRequestHeaders = request.headers();
        capturedLoginRequestPayload = request.postData(); // 페이로드 캡처
        resolve(); // 요청이 캡처되면 Promise 해결
      }
    });
  });

  try {
    await page.goto(SAC_CAL_PAGE_URL, {
      waitUntil: "networkidle2",
      timeout: 30000,
    });
    // console.log("initialResponse", initialResponse);

    // const rawInitialSetCookieHeaders = initialResponse.headers()["set-cookie"];
    // console.log("rawInitialSetCookieHeaders", rawInitialSetCookieHeaders);

    // const initialSetCookieHeadersArray =
    //   typeof rawInitialSetCookieHeaders === "string"
    //     ? rawInitialSetCookieHeaders.split("\n").map((s) => s.trim()) // \n으로 분리 후 trim
    //     : Array.isArray(rawInitialSetCookieHeaders)
    //     ? rawInitialSetCookieHeaders
    //     : [];
    // console.log("initialSetCookieHeadersArray", initialSetCookieHeadersArray);

    // const flattenedInitialCookies = initialSetCookieHeadersArray.flatMap(
    //   (header) => header.split(",").map((s) => s.trim())
    // );
    const res = await fetch(
      "https://www.sac.or.kr//site/main/program/getProgramCalList",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          "X-Requested-With": "XMLHttpRequest",
        },
        body: new URLSearchParams({
          searchYear: 2026,
          searchMonth: 9,
          searchFirstDay: 30,
          searchLastDay: 30,
          CATEGORY_PRIMARY: 2,
        }),
      }
    );
    const concerts = await res.json();
    // return concerts;
  } catch (error) {
    console.error(error);
  }
};
