# 在线工具箱合集 - 部署教程

一个纯前端实现的在线工具箱合集项目，包含 40+ 实用工具，原生 HTML + CSS + JavaScript 实现，无需后端服务。

---

## 📁 项目结构

```
web3/
├── index.html                  # 主页面（单页应用框架）
├── css/
│   └── style.css               # 样式文件（双主题 + 响应式）
├── js/
│   └── app.js                  # 核心逻辑（路由 + 16个工具实现）
├── data/
│   └── data.json               # 工具元数据（40条工具信息）
├── scripts/
│   └── fetch-data.js           # 数据获取脚本（Node.js）
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions 自动部署
├── package.json                # 项目配置和脚本
├── vite.config.js              # Vite 构建配置
├── .gitignore                  # Git 忽略文件
├── .nojekyll                   # GitHub Pages 禁用 Jekyll
└── DEPLOY.md                   # 本文档
```

---

## 🚀 快速开始（本地开发）

### 前置条件

- Node.js **>= 18**（推荐 v20 LTS）
- npm 或 pnpm / yarn

### 1. 安装依赖

```bash
cd web3
npm install
```

### 2. 拉取工具元数据（可选）

`data/data.json` 已默认内置 40 条工具数据，此步骤仅用于从远程 API 更新数据（远程不可用时自动回退到内置数据）：

```bash
npm run fetch
```

### 3. 启动本地开发服务器

```bash
npm run dev
```

或者：

```bash
npm run start
```

启动后浏览器会自动打开 `http://localhost:5173/`，支持热更新。

### 4. 构建生产版本

```bash
npm run build
```

构建产物输出到 `dist/` 目录，可直接部署到任何静态服务器。

### 5. 本地预览生产构建

```bash
# 使用 Vite 预览 (需要先 build)
npx vite preview
```

---

## 🌐 部署方式一：GitHub Pages（推荐，全自动）

利用项目自带的 `.github/workflows/deploy.yml` 实现一键部署 + 每日自动更新工具数据。

### 步骤

#### 1. 创建 GitHub 仓库

1. 登录 [GitHub](https://github.com)
2. 点击右上角 **+** → **New repository**
3. 填写仓库名（如 `web3-toolbox`），选择 **Public**，点击 **Create repository**

#### 2. 上传项目代码

在本地 `web3/` 目录下执行：

```bash
# 初始化 Git（如果还没初始化）
git init
git branch -M main

# 添加所有文件
git add -A
git commit -m "feat: 初始化在线工具箱项目"

# 关联远程仓库（替换为你的仓库地址）
git remote add origin https://github.com/你的用户名/你的仓库名.git

# 推送代码
git push -u origin main
```

#### 3. 启用 GitHub Pages

1. 打开 GitHub 仓库页面 → 顶部菜单 **Settings**
2. 左侧菜单找到 **Pages**（在 *Code and automation* 分类下）
3. **Build and deployment** → **Source** 选择 **GitHub Actions**
4. 不需要额外设置，保存即可

#### 4. 触发首次部署

- 方式一：直接推送代码会自动触发工作流
- 方式二：手动触发：仓库页面顶部 **Actions** → 左侧 **Build & Deploy to GitHub Pages** → 右侧 **Run workflow** → 绿色按钮运行

#### 5. 访问你的站点

部署完成后（约 1~2 分钟），在 **Settings → Pages** 页面可以看到你的访问地址，类似：

```
https://你的用户名.github.io/你的仓库名/
```

### 📅 定时任务说明

工作流内置了 **每日定时任务**（`cron: '0 19 * * *'`，每天 UTC 19:00 = 北京时间次日 03:00），会：

1. 尝试从远程拉取最新的工具元数据
2. 如有更新，自动提交到仓库
3. 触发新一轮构建部署

---

## 🌐 部署方式二：Vercel 一键部署

Vercel 对前端项目有极佳的支持，国内访问速度通常比 GitHub Pages 好。

### 步骤

1. 打开 [vercel.com](https://vercel.com) 用 GitHub 账号登录
2. 点击 **Add New...** → **Project**
3. 选择你刚上传的仓库 → **Import**
4. 在配置页面：
   - **Framework Preset**: 选择 **Vite**（通常会自动识别）
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
5. 点击 **Deploy**
6. 等待 1 分钟左右部署完成，获得 `https://xxx.vercel.app` 访问地址

### 绑定自定义域名（可选）

Vercel 项目页面 → **Settings → Domains** → 输入你的域名 → 按提示配置 DNS 解析即可。

---

## 🌐 部署方式三：Cloudflare Pages

Cloudflare 提供全球 CDN + 免费 SSL，国内访问速度优秀。

### 步骤

1. 打开 [pages.cloudflare.com](https://pages.cloudflare.com) 登录
2. 点击 **Create a project** → **Connect to Git**
3. 选择 GitHub 并授权 → 选择你的仓库 → **Begin setup**
4. 构建设置：
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
5. 点击 **Save and Deploy**

---

## 🌐 部署方式四：静态文件上传（任意服务器/虚拟主机）

如果你有自己的服务器或虚拟主机（支持 Nginx / Apache / 宝塔面板等）：

### 步骤

1. 本地构建：

```bash
cd web3
npm install
npm run fetch
npm run build
```

2. 将 `dist/` 目录下的**所有文件和文件夹**上传到网站根目录：
   - 包括 `index.html`、`assets/`、`data/`、`.nojekyll` 等

3. 访问你的域名即可。

### Nginx 配置示例（可选优化）

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /var/www/web3;
    index index.html;

    # Gzip 压缩
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml;
    gzip_min_length 1024;

    # 缓存静态资源
    location /assets/ {
        expires 30d;
        add_header Cache-Control "public, immutable";
    }

    location /data/ {
        expires 7d;
    }
}
```

---

## 🌐 部署方式五：Gitee Pages（国内替代）

如果目标用户主要在国内，Gitee Pages 通常比 GitHub Pages 访问更快。

### 步骤

1. 注册/登录 [Gitee](https://gitee.com)
2. 创建仓库并推送代码（过程同 GitHub）
3. 仓库页面 → 顶部 **服务** → **Gitee Pages**
4. 部署分支选 `main`，部署目录留空（或填 `dist` 如果你在 Gitee 上构建了）
5. 点击 **启动**

> ⚠️ 注意：Gitee Pages 免费版不支持自动部署，每次更新需手动点击「更新」按钮。推荐把 Gitee 只作为镜像站点。

---

## ✨ 已实现的工具清单（16 个）

| 分类 | 工具名称 | 说明 |
|------|---------|------|
| 📝 文本工具 | 字数统计 | 统计字符、字数、行数、段落、中英文 |
| 📝 文本工具 | 大小写转换 | 全大写/小写/首字母大写/反转等 |
| 📝 文本工具 | 文本去重 | 按行去重，支持忽略大小写、排序 |
| 📝 文本工具 | Base64 编解码 | 支持中文，使用 atob/btoa |
| 🧮 计算工具 | BMI 计算器 | 健康指数 + 刻度图 + 建议 |
| 🧮 计算工具 | 房贷月供 | 等额本息/等额本金双模式 |
| 🧮 计算工具 | 百分比计算器 | 三种模式：比值/数值/增减率 |
| 🧮 计算工具 | 年龄计算器 | 精确到天 + 生肖 + 星座 |
| 🔄 编码转换 | RGB↔HEX | 双向转换 + 颜色选择器 + 预览 |
| 🔄 编码转换 | 时间戳转换 | 秒/毫秒双模式，本地/UTC双时区 |
| 🔄 编码转换 | Unicode 转码 | `\uXXXX` 格式中文互转 |
| 🔄 编码转换 | URL 编码 | encodeURI / encodeURIComponent 双模式 |
| ✨ 其他工具 | 密码生成器 | 长度滑块 + 字符选择 + 强度检测 |
| ✨ 其他工具 | QRCode 二维码 | 纯 Canvas 实现，支持纠错等级 |
| ✨ 其他工具 | Markdown 预览 | 实时预览，支持标题/列表/表格/代码 |
| ✨ 其他工具 | JSON 格式化 | 格式化/压缩/校验 + 错误定位 |

---

## 🎨 功能特性

- ✅ **纯前端实现**：所有数据本地处理，无后端，不上传服务器，安全私密
- ✅ **双主题切换**：亮色 / 暗色模式，跟随系统 + localStorage 记忆
- ✅ **响应式三断点**：桌面 > 768px 平板 > 480px 手机 完美适配
- ✅ **防抖搜索**：按工具名、描述、关键词实时筛选
- ✅ **分类筛选**：10 个分类标签快速切换，显示分类数量
- ✅ **卡片 auto-fill 网格**：自适应列数，优雅排版
- ✅ **回到顶部按钮**：滚动超过 400px 自动浮现
- ✅ **空状态 / 加载状态**：搜索无结果、数据加载中有友好提示
- ✅ **Hash 单页路由**：`#/` 首页，`#/tool/xxx` 工具详情，支持浏览器前进后退
- ✅ **Toast 提示**：复制成功等操作有即时反馈

---

## ⚙️ 自定义配置

### 修改品牌 Logo / 标题

编辑 `index.html` 中的 `<title>` 标签和 `.logo` 区域内容。

### 修改主题色

编辑 `css/style.css` 顶部的 CSS 变量：

```css
:root {
  --color-primary: #6366f1;  /* 修改此值即可更换主题色 */
  ...
}
```

### 增加工具数据

修改 `data/data.json`，每个工具字段：

```json
{
  "id": "工具唯一ID（英文，与app.js中renderToolImplementation对应）",
  "name": "工具显示名称",
  "icon": "emoji图标",
  "category": "text / calc / convert / color / time / crypto / unit / dev / other",
  "description": "工具简介",
  "hot": true,
  "complexity": "easy / medium / hard",
  "keywords": ["搜索关键词1", "搜索关键词2"]
}
```

如果要实现新工具的功能，在 `js/app.js` 中：
1. 在 `implementedTools` Set 中添加 ID
2. 添加 `renderXxx()` 函数返回 HTML
3. 添加 `initXxx()` 函数绑定事件
4. 在 `renderToolImplementation` 和 `initToolImplementation` switch 中增加对应 case

### 修改定时更新时间

编辑 `.github/workflows/deploy.yml` 中的 `cron` 字段，格式为：

```
cron: '分 时 日 月 周'
```

---

## ❓ 常见问题

**Q1: 本地打开 index.html 直接双击可以用吗？**
A: 不可以，因为 JS 代码使用了 `fetch()` 读取本地 JSON，需要通过 HTTP 服务器访问。使用 `npm run dev` 或部署后即可正常工作。

**Q2: 构建后打开 dist/index.html 空白？**
A: 同 Q1，需要通过静态服务器访问。本地可使用 `npx serve dist` 或 `npx vite preview`。

**Q3: Base64 中文乱码？**
A: 不会。项目已使用 encodeURIComponent + unescape 的方式正确处理中文 Base64。

**Q4: GitHub Pages 部署后样式丢失 404？**
A: 检查仓库根目录是否有 `.nojekyll` 文件（项目已包含），如缺失请手动创建空文件。

**Q5: 如何添加 Google Analytics / 统计？**
A: 在 `index.html` 的 `</head>` 前插入统计脚本即可。

---

## 📜 License

MIT License - 随意修改、商用、分发，保留原作者版权即可。

---

## 🙋 技术支持

如遇到部署或使用问题，可按以下步骤排查：

1. 打开浏览器 **开发者工具 (F12)** → **Console** 查看报错
2. 查看 **Network** 面板确认资源是否加载成功
3. 重新执行 `npm install && npm run build` 是否本地正常
4. 如 GitHub Actions 部署失败，查看仓库 **Actions** 页面对应 Job 的日志

祝你部署顺利！🎉
