// 课表主控制器
// 协调其他课表模块，提供主要接口

import { scheduleData, loadScheduleFromStorage, saveScheduleToStorage } from "@js/data/schedule_data.js";
import { renderTimetable, renderListView } from "@js/controllers/schedule_render.js";
import { updateCoursesCache } from "@js/controllers/schedule_cache.js";
import { setupDragAndDrop } from "@js/events/schedule_drag.js";
import { initScheduleEvents, afterCourseDataChanged } from "@js/events/schedule_events.js";
import { showNotification } from "@components/notifications/notifications.js";

/**
 * 初始化课表数据和功能
 */
export function initSchedule() {
  try {
    console.log("正在初始化课表数据...");
    // 尝试从本地存储加载数据
    const loadedFromStorage = loadScheduleFromStorage();
    if (loadedFromStorage) {
      console.log("从本地存储成功加载课表数据");
    } else {
      console.log("使用默认课表数据");
    }

    // 初始化缓存
    updateCoursesCache();
    
    // 渲染界面
    renderTimetable();
    renderListView();
    
    // 初始化事件处理
    initScheduleEvents();
    
    // 初始化拖放功能（初始为非编辑模式）
    setupDragAndDrop(false);
    
    console.log("课表数据初始化成功");
    return true;
  } catch (error) {
    console.error("初始化课表数据失败:", error);
    document.getElementById("week-view-container").innerHTML = `
      <div class="alert alert-danger">
        <h4>初始化数据失败</h4>
        <p>${error.message}</p>
        <p>请检查控制台获取详细信息</p>
      </div>
    `;
    showNotification("初始化课表数据失败，请刷新页面重试", "error");
    return false;
  }
}

// 导出一些公共方法供外部使用
export { afterCourseDataChanged };
