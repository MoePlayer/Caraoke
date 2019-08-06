const koa = require("koa");
const mount = require("koa-mount");
const static = require("koa-static");
const {watch} = require("fs");
const {exec} = require("child_process");

const app = new koa();
const dist = new koa();
const public = new koa();
dist.use(static("dist"));
public.use(static("test/public"));
app.use(mount("/dist",dist));
app.use(mount(public));
app.listen(8998);
watch("src/",(ev,file)=>{
    console.log(file+" changed.");
    exec("npm run compile",(err,stdout,stderr)=>{
        console.log("STDOUT:"+stdout);
        console.log("STDERR:"+stderr);
    });
})