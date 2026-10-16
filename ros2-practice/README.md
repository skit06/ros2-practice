# ROS 2 核心记忆与默写练习站 (全量 62 题完整版)

基于工作区内 12 份 ROS 2 核心与实操 Word（`.docx`）笔记完整提炼打造的本地与在线默写练习站。

---

## 🌟 核心特色

1. **全面覆盖 12 份笔记全部知识点**：
   - 包含 **62 道深度练习卡片**，无遗漏覆盖工作区所有 12 份文档（工作空间构建、Python 节点、面向对象、C++ 节点机制、话题通信 Pub/Sub、CLI 反查三板斧、自定义接口 .msg、服务通信 Client/Server、参数系统与 Launch 启动、海龟控制与运动学、ROS 2 上位机 Qt 界面开发）。
2. **沉浸式默写与防偷看设计**：
   - 题目默认隐藏答案与比对面板，必须自主输入后才能对比；
   - 设有【💡 查看提示】折叠开关，默认不透露具体代码；
   - 新增【👁 防偷看模糊遮罩】：揭晓答案时可开启高斯模糊，只有鼠标悬停到代码行时才会局部清晰，满足主动回忆（Active Recall）训练；
   - 宽敞大代码框，100% 全宽布局，支持垂直自由拉伸；
   - 原生支持 <kbd>Tab</kbd> 键（缩进 4 空格）与 <kbd>Shift+Tab</kbd>（取消缩进）。
3. **移动端与全端专属快捷符号栏**：
   - 一键点击输入 `Tab`、`_`、`/`、`::`、`->`、`;`、`ros2`、`colcon`、`rclpy`、`rclcpp`、`self.`，手机端练习无需频繁切换符号键盘。
4. **智能逐行比对 (Diff Check)**：
   - 点击“对比我的答案”，自动高亮匹配行（✓）、缺失行（-）、多余行（+）与差异行（≠）；
   - 支持一键揭晓原文标准答案与一键复制代码。
5. **进度自动保存 (localStorage)**：
   - 评估掌握状态：已掌握（✓）、需复习（↻）、未作答（○）；
   - 支持按模块分类与按掌握状态快速筛选；
   - 数据完全保留在本地浏览器，离线无网也能随时使用。
6. **双向便捷导航**：
   - 支持快捷键：<kbd>Alt+←</kbd>（上一题）、<kbd>Alt+→</kbd>（下一题）、<kbd>Alt+1</kbd>（标记已掌握）、<kbd>Alt+2</kbd>（标记需复习）；
   - 支持关键词即时搜索。

---

## 🚀 启动与使用方式

### 方式一：Windows 免安装一键启动（推荐，无需任何依赖）
在 `ros2-practice` 目录下：
- **双击运行 `start.bat`**
- 或者在 PowerShell 中运行：
  ```powershell
  cd "c:\Users\lenovo\Desktop\ROS2 笔记\ros2-practice"
  .\start-server.ps1
  ```
系统将启动轻量本地服务并自动在默认浏览器中打开 `http://127.0.0.1:4173/`，同时输出局域网手机访问网址。

### 方式二：手机单文件免安装便携版（最适合手机刷题）
- 打开或发送工作区根目录的 [`ros2-mobile.html`](file:///c:/Users/lenovo/Desktop/ROS2%20%E7%AC%94%E8%AE%B0/ros2-mobile.html) 至手机（仅 100KB），无需开启电脑，纯离线在任意手机浏览器打开即可随时练习。

### 方式三：直接浏览器双击打开（零服务）
- 直接双击打开 `index.html` 即可在 Edge/Chrome 等浏览器中使用全部练习与本地进度保存功能。

### 方式四：Node.js 运行（若本机已装 Node.js）
```bash
node server.js
# 或
npm start
```
然后在浏览器访问 `http://127.0.0.1:4173/`。

---

## 📚 练习模块与 62 题分类一览

- **▦ 工作空间与构建 (9 题)**：`ros2 pkg create`（Python 与 C++ 区分）、自定义接口包 `ament_cmake` 铁律、`colcon build` 根目录执行原则、`--symlink-install` 软链调试、`source` 激活与排错第一反射、`setup.py` 与 `CMakeLists.txt` 配置。
- **🐍 Python 节点与面向对象 (7 题)**：`rclpy.init` 四步生命周期、`Node` 继承、`super().__init__` 首行铁律、`self.` 成员使用红线、`spin()` 与 `KeyboardInterrupt` 机制、`$AMENT_PREFIX_PATH` 寻路机制、通用面向对象模板。
- **⚡ C++ 节点基础与底层机制 (4 题)**：C++ 节点四步骨架、智能指针与日志宏、核心三符号含义（`::` 作用域、`->` 指针调用、`;` 语句分号）、CMakeLists.txt 与 g++ 的定位。
- **📡 话题通信 Pub/Sub (7 题)**：String 发布者与定时器（函数指针不带括号）、发布者定时装信推信回调、订阅者 4 参数规则与事件驱动中断、订阅者回调拆信、QoS 队列深度 10 的物理意义、固定外壳模板与终端 4 步走流程。
- **⌘ CLI 工具与反查三板斧 (4 题)**：终端反查三板斧（`node info` 掀底牌、`topic info` 查类型、`interface show` 查字段）、话题排查 4 大命令（`list`、`echo`、`info`、`rqt_graph`）、`ros2 run` 通用命令、`RCUTILS_CONSOLE_OUTPUT_FORMAT` 格式化。
- **📦 自定义接口 .msg (6 题)**：`.msg` 存放路径与大驼峰命名红线、CMake `rosidl_generate_interfaces` 核心宏、Python 导入与 `to_msg()` 时间戳、日志打印与 DDS 发布的本质分工、生态第一原则（Twist 与 LaserScan）、通信为什么用 .msg 而不用 JSON/字典。
- **🔄 服务通信 Client/Server (6 题 · 新增)**：`.srv` 文件路径与 `---` 分割线语法、`get_package_share_directory` 动态资源定位、`cv_bridge` 图像收发互转、服务端回调 `(self, request, response)` 与 `return response` 铁律、客户端异步五步走（`wait_for_service` 探活与 `call_async` 回调绑定）、终端 `ros2 service call` 联调。
- **🚀 参数系统与 Launch 启动 (8 题 · 新增)**：`declare_parameter` 声明与 `get_parameter().value` 获取、`ros2 param list/get/set` 终端排查三板斧、`--ros-args -p` 命令行注入参数、`generate_launch_description()` 入口函数与 `LaunchDescription`、`Node` 启动三要素（`package`、`executable`、`output='screen'`）、`parameters=[{...}]` 外层列表套内层字典铁律、`setup.py` `data_files` glob 安装规则、Launch 条件执行避坑与 `IfCondition` 原理。
- **🐢 海龟控制与运动学 (5 题)**：`Twist` 消息前后线速度与角速度通道、底盘看门狗与 10Hz 定时器持续喂指令机制、画圆回调发布、朝向角 `math.atan2` 避坑铁律、P 比例控制物理直觉与小海龟为何只需 P 控制。
- **🖥️ 上位机与 Qt 界面 (6 题)**：Qt 窗口生命周期四步骨架（`QApplication` -> `QLabel` -> `show` -> `exec_`）、Qt 与 ROS 2 多线程解死循环固定模板（`threading.Thread` + `daemon=True`）、回调形参铁律（定时器 `self` vs 订阅回调 `self, msg`）、UI 文字刷新唯一直接指令 `setText()`、Qt 顶级独立窗口判定规则、上位机技术选型认知。
