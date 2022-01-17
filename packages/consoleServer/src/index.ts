import * as Koa from "koa"
import * as Router from "koa-router"

const app = new Koa()

const router = new Router()

const port = 3001

const simulateWhislteLogUrl = `/.whistle-path.5b6af7b9884e1165/log.${port}/cgi-bin/log/set`

router.get(simulateWhislteLogUrl, async (ctx) => {
  const reg = /(?<time>\d*)-(?<seq>\d*)/
  const query = ctx.query
  const timeAndSeq = Object.keys(query).find((key) => {
    return reg.test(key)
  })
  const { time, seq } = reg.exec(timeAndSeq).groups

  console.log(
    `[${new Date(parseInt(time)).toLocaleString()}][seq:${seq}][id:${
      query.id
    }][${query.level}]${JSON.parse(query.text as string).join(" ")}`
  )
  ctx.body = "ctx.query"
  ctx.response.status = 200
})

app.use(router.routes())

app.listen(port, () => {
  const url = "http://127.0.0.1:" + port
  console.log(`console log server run on ${url}`)
})
