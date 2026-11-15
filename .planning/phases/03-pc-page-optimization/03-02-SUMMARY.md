---
phase: 03-pc-page-optimization
plan: '02'
status: complete
requirements-completed: [PC-01, PC-02, PC-03, PC-04, PC-05]
---

# 桌面接入完成

固定 banner、侧栏和 toolbar；只让右侧 main 正文滚动，修复多出横幅高度的整页溢出。受控 Waterline 导航、原色本地 Logo 玻璃显现和28px液态名称接入。输入组件保留原类型/模型及附加工具，胶囊弹性展开、自动增高、渐隐与按钮切换，共享原 prompt 状态，未接能力保持真实反馈。

浏览器已实测五组桌面视口 fixed rect / scrollTop、键盘切换、模型选择、长文增高及清空收缩、IME、Escape下一帧焦点、空blur不抢焦、侧栏/主题/横幅开关、reduced-motion、WebGL启动失败/丢失/恢复。结果与截图在 docs/assets/pc-optimization。审查发现并修复焦点、缩高、Logo原色、context-loss降级四项，读回报告active为0。

npm run check早期接入版PASS（7文件17测试）；最终版将在03-03复跑。使用Node24.6.0的Next webpack production build PASS；默认Node22.9低于项目engines22.12，Turbopack另遇本机进程端口EPERM，未改工程依赖或构建配置。
