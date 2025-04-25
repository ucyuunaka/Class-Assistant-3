# Footer 组件按钮统一记录

## 概述

本文档记录了 footer 组件中的按钮元素识别与统一流程。

## 按钮实例清单

### 实例 ID: FB-001

**位置:** `components/footer/footer.html` 中的导航链接（快速链接部分）

**代码块:**

```html
<ul class="footer-links">
  <li><a href="index.html">首页</a></li>
  <li><a href="pages/schedule.html">课表</a></li>
  <li><a href="pages/grades.html">成绩管理</a></li>
  <li><a href="pages/countdown.html">考试倒计时</a></li>
  <li><a href="pages/lesson.html">课评速记</a></li>
  <li><a href="pages/profile.html">个人资料</a></li>
  <li><a href="pages/settings.html">设置</a></li>
</ul>
```

**相关 CSS:**

```css
.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-links li {
  margin-bottom: 0.75rem;
}

.footer-links a {
  color: var(--text-color);
  text-decoration: none;
  transition: color 0.2s, transform 0.2s;
  display: inline-flex;
  align-items: center;
}

/* 链接悬停效果 */
.footer-links a:hover {
  color: var(--primary-color);
  transform: translateX(5px);
}
```

**相关 JS:**

```javascript
// 文件: footer.js
setupLinkNavigation() {
  const footerLinks = document.querySelectorAll('.footer-links a');

  footerLinks.forEach(link => {
    link.addEventListener('click', (event) => {
      event.preventDefault();

      // 获取原始链接
      const href = link.getAttribute('href');

      // 构建最终的目标URL，直接使用绝对路径
      let targetUrl = href;

      // 如果链接不是以/开头且不是外部链接，添加/前缀
      if (!targetUrl.startsWith('/') && !targetUrl.startsWith('http')) {
        targetUrl = '/' + targetUrl;
      }

      // 页面跳转
      window.location.href = targetUrl;
    });
  });
}
```

**初步分析:**

1. **功能:** 这些链接元素在功能上作为导航按钮，点击后会跳转到相应页面。
2. **样式特征:**
   - 使用 `display: inline-flex` 和 `align-items: center` 进行布局
   - 有过渡效果 `transition: color 0.2s, transform 0.2s`
   - 鼠标悬停时有颜色变化和平移动画
3. **交互行为:**
   - 有自定义的点击处理，阻止默认行为并进行路径处理后跳转
4. **按钮特征匹配:**
   - cursor: pointer (链接默认特性)
   - display: inline-flex
   - 有 transition 过渡效果
   - 有悬停状态变化

**状态:** 已评估 - 需部分收录（外观）

### 评估结果

**分类:** 2.2 需部分收录（外观）

**评估理由:**

1. **独特价值分析:**

   - 这些链接按钮具有独特且有价值的外观特性，特别是悬停时的平移效果和颜色变化
   - 这种导航型链接的轻量级样式在网站中有多处应用场景
   - 平移效果增强了用户交互体验，值得在按钮系统中保留

2. **比对与标准按钮区别:**

   - 与 `buttons.css` 中的 `.btn-text` 类最为接近，但标准按钮没有平移效果
   - 标准按钮更注重突出显示，而这些导航链接强调轻量和流畅性
   - 这些链接的功能逻辑与页脚导航紧密耦合，有特定的路径处理需求

3. **功能耦合性分析:**
   - 链接的点击处理逻辑专用于页脚导航场景
   - 路径处理逻辑与页脚组件强相关，保留在原位更合适

**收录计划:**

- **新 CSS 类设计:**

  - 基础类: `btn-nav` - 为导航型按钮提供基本样式
  - 变体类: `btn-nav-slide` - 添加平移效果
  - 可选类: `btn-nav-vertical` - 提供垂直方向的变体（未来拓展）

- **原 JS 处理:**
  - 保留原 `setupLinkNavigation()` 函数的功能
  - 更新选择器以匹配新类名
  - 添加注释，明确说明使用了 `buttons.css` 中的样式

## 统计信息

- **已识别按钮总数:** 1 组（7 个链接按钮）
- **已处理按钮数:** 0
- **待处理按钮数:** 1 组（已评估，待执行更改）
- **按分类统计:**
  - 可替换: 0
  - 需部分收录: 1
  - 需完全收录: 0
