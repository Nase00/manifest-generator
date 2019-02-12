const Router = require("koa-router");
const Koa = require("koa");
const queryString = require("query-string");

const PORT = process.env.PORT || 3000;
const server = new Koa();
const router = new Router();

router.get("/manifest.json", async (ctx, next) => {
  const params = queryString.parse(
    ctx.originalUrl.replace("/manifest.json", "")
  );

  ctx.body = JSON.stringify(params);
});

server.use(router.routes());

const run = async () => {
  await server.listen(PORT);

  console.log(`Listening on port ${PORT}`);
};

run();
