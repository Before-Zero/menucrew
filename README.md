# MenuCrew · 海外多人点餐 AI 产品

看懂菜单、各自选择、一起落单。把菜单图片、多人选择和忌口信息收拢成一份经人工确认的双语订单。

## 在线体验

- [独立交互演示](https://before-zero.github.io/menucrew/)
- [完整应用](https://menucrew-demo.vercel.app)

独立演示使用预设菜单，支持三个成员分别调整数量、确定性汇总、双语订单切换及复制。所有资源位于当前站点，无外部字体、CDN、登录或 AI 接口依赖。不会创建真实在线房间，不执行菜单识别或 AI 推荐。

完整应用支持 Next.js 服务端流程、Supabase 多人数据与 AI 能力，不能直接运行在 GitHub Pages。国内可访问性须在实际网络下验证，GitHub Pages 本身不提供国内连通性保证。

## 完整源码

`menucrew-source.zip` 是从原工作区导出的完整应用源码快照，包含应用、组件、数据库迁移及产品规格，不含 `.env.local`、密钥、Git 历史和部署缓存。下载解压后安装依赖，按变量模板配置服务端环境，再运行 `npm run dev`。数据库迁移与访问控制约定见源码内 `AGENTS.md`。

原工作区：`G:/Codex工作区/VibeCoding课程`。此仓库保留独立展示入口，完整应用继续使用原部署。

## 放进个人网站

最简单的方式是把项目按钮指向上述独立演示网址。若需与个人网站共用域名，把 `index.html`、`styles.css`、`app.js`、四张 JPG 截图及 `.nojekyll` 复制到个人网站的 `menucrew/` 目录，再链接 `/menucrew/`。文件使用相对路径，可部署在任意子目录。也可以通过 iframe 嵌入：

```html
<iframe src="https://before-zero.github.io/menucrew/" title="MenuCrew 产品演示" style="width:100%;height:900px;border:0" loading="lazy"></iframe>
```

需要国内稳定运行完整多人点餐和 AI 功能时，应另行迁移服务端并验证数据库、认证回调和 AI 连接；仅给旧 Vercel 域名设置跳转无法解决旧域名连不上的问题。
