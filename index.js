const Router = require("koa-router");
const Koa = require("koa");
const queryString = require("query-string");

const PORT = process.env.PORT || 3000;
const server = new Koa();
const router = new Router();

// Requests can't be sent with #'s in them
const rehashHexCodes = params => {
  const rehashedParams = Object.assign({}, params, {
    theme_color: `#${params.theme_color}`,
    background_color: `#${params.background_color}`
  });

  if (!params.theme_color) {
    delete rehashedParams.theme_color;
  }

  if (!params.background_color) {
    delete rehashedParams.background_color;
  }

  return rehashedParams;
};

router.get("/manifest.json", (ctx, next) => {
  const rawParams = ctx.originalUrl.replace("/manifest.json", "");
  const params = queryString.parse(rawParams);

  ctx.body = rehashHexCodes(JSON.parse(params.content));
});

server.use(router.routes());

const run = async () => {
  await server.listen(PORT);

  console.log(`Listening on port ${PORT}`);
};

run();
