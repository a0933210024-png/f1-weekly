# 🏎️ Formula1 Weekly

每週深度解析 F1 賽事，由真正的車迷撰寫。

## 🌐 網站

**Live URL:** https://f1-weekly.vercel.app

## ✨ 功能

- 📰 **文章系統** - 賽季預覽、賽事報告、技術分析
- 📅 **賽事日曆** - 2026 完整賽程（24 站）
- ⏱️ **即時倒數** - 最近三站比賽倒數計時
- 📧 **電子報訂閱** - 整合 Beehiiv
- 🤖 **AI 預測** - 即將推出
- 📱 **完全 RWD** - 手機/平板/電腦全適配

## 🎨 設計語言

- **主色**: #E10600 (F1 官方紅)
- **背景**: #0a0a0a (近黑)
- **字體**: 系統字體 stack (快速載入)
- **風格**: 現代、乾淨、有速度感

## 🛠️ 技術棧

- **框架**: Astro
- **樣式**: 純 CSS (手寫，無框架)
- **圖片**: Unsplash Source API
- **部署**: Vercel
- **CMS**: Astro Content Collections

## 📄 頁面結構

- `/` - 首頁 (Hero + 倒數 + 最新文章)
- `/articles` - 文章列表
- `/articles/[slug]` - 文章內頁
- `/calendar` - 2026 賽事日曆
- `/about` - 關於我們
- `/predictions` - AI 預測 (Coming Soon)

## 🚀 開發

```bash
# 安裝依賴
npm install

# 開發模式
npm run dev

# Build
npm run build

# 預覽
npm run preview
```

## 📊 部署狀態

- ✅ GitHub: https://github.com/a0933210024-png/f1-weekly
- ✅ Vercel: https://f1-weekly.vercel.app
- ✅ 所有頁面 HTTP 200
- ✅ Build 零錯誤

## 📱 RWD 斷點

- 375px (iPhone SE) ✅
- 768px (iPad) ✅
- 1280px (Desktop) ✅

## 📢 社群

- Twitter: [@MiniBot_AI](https://twitter.com/MiniBot_AI)
- Newsletter: [Beehiiv](https://formula1-weekly.beehiiv.com/subscribe)

## 📝 License

MIT
