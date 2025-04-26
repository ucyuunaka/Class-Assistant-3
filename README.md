# 课堂助手 (Class Assistant)

## 项目概述

课堂助手是一个为学生设计的全方位学习管理工具，旨在帮助学生更好地组织和管理他们的学习生活。该项目基于 Web 技术栈构建，提供了丰富的学习管理功能。

## 功能特点

- **课程管理**：创建和自定义课表，可视化展示每周课程安排
- **成绩管理**：记录和分析考试与作业成绩，计算 GPA 和生成趋势图表
- **考试倒计时**：为重要考试设置倒计时，轻松跟踪备考进度
- **个人资料**：定制个性化学习资料，提供更符合个人需求的服务
- **偏好设置**：调整界面主题、语言等，提供个性化用户体验
- **课评速记**：快速记录对课程的评价和反馈

## 技术栈

- 前端：HTML5, CSS3, JavaScript (ES6+)
- 构建工具：Vite
- UI/UX：自定义 CSS 框架，响应式设计
- 图标库：Font Awesome, Remix Icon
- 组件化架构：基于原生 JavaScript 的组件系统

## 目录结构

```
Class-Assistant/
│
├── components/         # 组件目录
│   ├── buttons/        # 按钮组件
│   ├── footer/         # 页脚组件
│   ├── header/         # 头部组件
│   ├── modals/         # 模态框组件
│   ├── notifications/  # 通知组件
│   ├── scrollAnimation/# 滚动动画组件
│   └── sidebar/        # 侧边栏组件
│
├── css/                # 全局CSS样式
│   ├── pages/          # 页面特定样式
│   └── themes/         # 主题样式
│
├── js/                 # JavaScript脚本
│   └── pages/          # 页面特定脚本
│       ├── countdown/  # 倒计时页面脚本
│       └── schedule/   # 课表页面脚本
│
├── pages/              # HTML页面
│   ├── countdown.html  # 倒计时页面
│   ├── grades.html     # 成绩页面
│   ├── lesson.html     # 课评页面
│   ├── login.html      # 登录页面
│   ├── profile.html    # 个人资料页面
│   ├── schedule.html   # 课表页面
│   └── settings.html   # 设置页面
│
├── public/             # 静态资源
│   └── lib/            # 第三方库
│
├── Plan/               # 开发计划文档
│
└── dist/               # 构建输出目录
```

## 安装指南

### 前提条件

- Node.js (>= 14.x)
- npm (>= 6.x)

### 安装步骤

1. 克隆仓库

```bash
git clone https://github.com/yourusername/Class-Assistant.git
cd Class-Assistant
```

2. 安装依赖

```bash
npm install
```

3. 启动开发服务器

```bash
npm run dev
```

或使用提供的批处理文件

```bash
start-dev.bat
```

4. 构建项目

```bash
npm run build
```

## 快速上手示例

### 组件使用示例

#### 使用顶部导航组件

```javascript
import { Header } from "/components/header/header.js";

// 在 DOMContentLoaded 事件中初始化组件
document.addEventListener("DOMContentLoaded", function () {
  // 初始化顶栏组件
  const header = new Header("header-container", {
    title: "页面标题",
    subtitle: "可选的副标题",
    buttons: [
      {
        text: "按钮文本",
        url: "#",
        id: "custom-button-id",
      },
    ],
  });
});
```

#### 使用侧边栏组件

```javascript
import { Sidebar } from "/components/sidebar/sidebar.js";

document.addEventListener("DOMContentLoaded", function () {
  // 初始化侧边栏组件
  const sidebar = new Sidebar("sidebar-container");
});
```

### 主题切换实现

```javascript
// 在用户界面中添加主题切换按钮
const themeToggleBtn = document.getElementById("theme-toggle");

themeToggleBtn.addEventListener("click", function () {
  // 导入主题切换功能并调用
  import("/js/main.js").then((module) => {
    const newTheme = module.toggleTheme();
    console.log(`已切换到${newTheme}主题`);
  });
});
```

### 数据存储示例

```javascript
// 导入存储API
import { Storage } from "/js/main.js";

// 存储考试数据
const examData = {
  id: "exam-123",
  name: "高等数学期末考试",
  date: "2024-06-15",
  time: "14:30",
  subject: "高等数学",
  location: "教学楼A-301",
};

// 保存数据
Storage.save("exams", examData);

// 读取数据
const savedExams = Storage.get("exams");
console.log(savedExams);

// 清除特定数据
Storage.remove("exams");
```

## 性能优化策略

项目采用了多种性能优化策略，确保应用的快速加载和流畅运行：

### Vite 构建优化

- **按需加载**：使用 `rollupOptions` 中的 `manualChunks` 配置，将代码分割为多个块
- **代码压缩**：使用 `terser` 压缩器优化生产构建
- **CSS 优化**：通过 `vite-plugin-purgecss` 移除未使用的 CSS
- **死代码消除**：使用 `vite-plugin-deadcode` 自动检测并报告未使用的代码

```javascript
// vite.config.js 示例配置
export default defineConfig({
  build: {
    minify: "terser",
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: [], // 第三方依赖
          components: [
            // 组件文件路径
          ],
          core: [
            // 核心JS文件
          ],
        },
      },
    },
  },
  plugins: [
    purgecss({
      content: [
        "./index.html",
        "./pages/**/*.html",
        "./components/**/*.js",
        "./js/**/*.js",
      ],
    }),
    deadcode({
      patterns: [
        "./index.html",
        "./pages/**/*.html",
        "./components/**/*.js",
        "./js/**/*.js",
      ],
      output: "deadcode-report.txt",
    }),
    visualizer({
      open: true,
      filename: "stats.html",
    }),
  ],
});
```

### 资源懒加载实现

- **组件按需加载**：组件样式表仅在组件初始化时加载
- **延迟加载**：非关键脚本使用 `type="module"` 和动态 import() 实现延迟加载
- **路由分离**：每个页面的 JS 独立打包，实现按页面加载所需资源

### 运行时优化

- **防抖处理**：搜索和筛选等高频操作使用防抖函数优化性能
- **事件委托**：采用事件委托模式减少事件监听器数量
- **虚拟列表**：大数据集合（如课表、考试列表）使用虚拟化技术减少 DOM 节点数量

## 开发环境搭建详解

### 开发工作流程

1. **本地开发**：使用 `start-dev.bat` 脚本启动开发服务器，它会自动打开浏览器

   ```
   # Windows系统
   ./start-dev.bat

   # 其他系统
   npm run dev
   ```

2. **组件开发流程**:

   - 在 `components/[组件名]` 目录下创建组件文件
   - 组件通常包含三个文件：`.html`, `.js`, `.css`
   - JS 文件应该导出一个类或函数供其他文件使用

3. **页面开发流程**:
   - 在 `pages` 目录下创建新的 HTML 文件
   - 在 `css/pages` 目录下创建对应的页面样式
   - 在 `js/pages` 目录下创建页面相关的脚本
   - 在 `vite.config.js` 的 `rollupOptions.input` 中添加新页面的入口

### 调试技巧

- **性能分析**：使用构建后生成的 `stats.html` 分析代码包大小和依赖关系
- **构建验证**：运行 `npm run build` 后，使用 `npm run preview` 预览构建结果
- **死代码检测**：查看 `deadcode-report.txt` 了解未使用的代码
- **局部构建**：使用 Vite 的 HMR (热模块替换) 实现局部更新，提高开发效率