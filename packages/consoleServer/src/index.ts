import * as Koa from "koa"
import * as Router from "koa-router"

const app = new Koa()

const router = new Router()

const port = 3001

const simulateWhislteLogUrl = `/.whistle-path.5b6af7b9884e1165/log.${port}/cgi-bin/log/set`

router.get(simulateWhislteLogUrl, async (ctx) => {
  const query = ctx.query
  console.log(
    `[${new Date(parseInt(query.add_date as string)).toLocaleString()}][seq:${
      query.add_seq
    }][id:${query.id}][${query.level}]${JSON.parse(query.text as string).join(
      " "
    )}`
  )
  ctx.body = "ctx.query"
  ctx.response.status = 200
})

app.use(router.routes())

app.listen(port, () => {
  const url = "http://127.0.0.1:" + port
  console.log(`console log server run on ${url}`)
})
