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

**状态:** 待评估

## 统计信息

- **已识别按钮总数:** 1 组（7 个链接按钮）
- **已处理按钮数:** 0
- **待处理按钮数:** 1 组
