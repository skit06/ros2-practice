/**
 * ROS 2 记忆练习 - 全量题库与交互逻辑 (42题完整版)
 * 完整覆盖工作区 9 份 Word 笔记中的全部命令、骨架代码、核心机制与排错要点
 */

const modules = [
  { id: 'all', name: '全部练习', icon: '✦', desc: '按循序渐进的学习路径全面练习 (共 48 题)' },
  { id: 'workspace', name: '工作空间与构建', icon: '▦', desc: '功能包创建、colcon 构建、setup.py 与 CMakeLists 配置' },
  { id: 'python', name: 'Python 节点与面向对象', icon: '🐍', desc: 'rclpy 生命周期、Node 继承、super、self 与环境变量机制' },
  { id: 'cpp', name: 'C++ 节点基础与机制', icon: '⚡', desc: 'rclcpp 四步骨架、智能指针、核心符号与 CMake 定位' },
  { id: 'topics', name: '话题通信 Pub/Sub', icon: '📡', desc: '发布者定时推送、订阅者中断回调、QoS 与外壳模板' },
  { id: 'cli', name: 'CLI 工具与反查三板斧', icon: '⌘', desc: '终端反查三板斧、话题排查命令与 rqt_graph' },
  { id: 'custom-msg', name: '自定义接口 .msg', icon: '📦', desc: '接口包 CMake 铁律、msg 规范、rosidl 宏与生态第一原则' },
  { id: 'control', name: '海龟控制与运动学', icon: '🐢', desc: 'Twist 速度通道、看门狗定时器、atan2 航向角与 P 控制原理' },
  { id: 'qt-gui', name: '上位机与 Qt 界面', icon: '🖥️', desc: 'Qt 生命周期、多线程解死循环、回调形参铁律与 setText' }
];

const cards = [
  // ================= 1. 工作空间与功能包构建 (Workspace & Colcon) =================
  {
    id: 'pkg-python-create',
    module: 'workspace',
    title: '创建 Python 功能包',
    question: '在工作空间根目录下，使用 ros2 pkg create 命令创建一个名为 demo_python_pkg 的 Python 功能包，指定许可证为 Apache-2.0。',
    hint: '注意区分 Python 与 C++ 包的构建类型参数。',
    answer: 'ros2 pkg create demo_python_pkg --build-type ament_python --license Apache-2.0',
    source: 'Python功能包五步流程笔记.docx',
    note: '参数 --build-type ament_python 必须牢记，若漏掉系统将默认生成 C++ 包。源码必须放置在内层同名文件夹下。'
  },
  {
    id: 'pkg-cpp-create',
    module: 'workspace',
    title: '创建 C++ 功能包',
    question: '在工作空间根目录下，使用 ros2 pkg create 命令创建一个名为 demo_cpp_pkg 的 C++ 功能包，指定许可证为 Apache-2.0。',
    hint: 'C++ 功能包使用的构建类型是基于 CMake 的。',
    answer: 'ros2 pkg create demo_cpp_pkg --build-type ament_cmake --license Apache-2.0',
    source: 'C++功能包五步流程笔记.docx',
    note: '构建类型必须为 ament_cmake。C++ 源码放置在包内的 src/ 目录中。'
  },
  {
    id: 'pkg-msg-create',
    module: 'workspace',
    title: '创建自定义接口功能包（构建类型铁律）',
    question: '写出创建名为 status_interfaces 的通信接口功能包命令，并说明构建类型为何绝不能使用 ament_python。',
    hint: '接口功能包有且仅有一种构建类型。',
    answer: 'ros2 pkg create status_interfaces --build-type ament_cmake --license Apache-2.0',
    source: 'ROS2自定义接口msg笔记.docx',
    note: '铁律：通信接口包必须是 ament_cmake！原因：跨语言代码生成器（rosidl）底层依赖 CMake 工具链来编译生成 C++ 和 Python 运行时代码。'
  },
  {
    id: 'colcon-build-root',
    module: 'workspace',
    title: '工作空间根目录统一构建',
    question: '写出从工作空间根目录统一编译构建所有 ROS 2 功能包的标准命令，并指出敲该命令的路径禁忌。',
    hint: '使用 colcon 工具，不要进入功能包内部。',
    answer: 'colcon build',
    source: 'Python功能包五步流程笔记.docx / C++功能包五步流程笔记.docx',
    note: '必须在工作空间根目录（即能看到 src/ 或各个包文件夹的位置）执行，严禁进入包内。坚决不要手动执行 mkdir build 或 cmake ..。'
  },
  {
    id: 'colcon-symlink-install',
    module: 'workspace',
    title: '软链接开发构建参数',
    question: '写出 Python 节点开发时常用的软链接安装构建命令，使得修改 Python 源码后无需重新编译即可生效。',
    hint: '在 colcon build 后面附带安装软链接选项。',
    answer: 'colcon build --symlink-install',
    source: 'Python功能包五步流程笔记.docx',
    note: '日常开发利器，把源文件软链接映射到 install/ 目录，节约大量重复构建时间。'
  },
  {
    id: 'source-setup-env',
    module: 'workspace',
    title: '激活环境变量与黄金排错反射',
    question: '写出刷新当前终端工作空间环境变量并启动 demo_python_pkg 包中 python_node 节点的两条命令。',
    hint: '先 source 脚本，再通过 ros2 run 启动。',
    answer: 'source install/setup.bash\nros2 run demo_python_pkg python_node',
    source: 'Python功能包五步流程笔记.docx',
    note: '黄金排错反射：敲 ros2 run 报 Package not found，第一反应一定是当前终端忘了敲 source install/setup.bash。每个新终端窗口都需重新激活。'
  },
  {
    id: 'setup-py-entry-points',
    module: 'workspace',
    title: 'setup.py 注册终端入口命令',
    question: '写出 setup.py 中 entry_points 的 console_scripts 配置，将终端可执行别名 python_node 映射到 demo_python_pkg 包内 python_node.py 的 main 函数。',
    hint: '记住映射公式：\'终端别名 = 包名.文件名:函数名\'。',
    answer: "entry_points={\n    'console_scripts': [\n        'python_node = demo_python_pkg.python_node:main',\n    ],\n},",
    source: 'Python功能包五步流程笔记.docx',
    note: '冒号右侧固定为 :main；左侧是未来在终端 ros2 run 包名 后面敲的名字。'
  },
  {
    id: 'package-xml-depend-tag',
    module: 'workspace',
    title: 'package.xml 报备依赖项',
    question: '写出在 package.xml 中声明依赖 rclpy 库的代码标签。',
    hint: '位于 <license> 标签下方，使用统一的 depend 标签。',
    answer: '<depend>rclpy</depend>',
    source: 'Python功能包五步流程笔记.docx',
    note: '规范工程里必须在 package.xml 报备库依赖，以便 rosdep 自动解析和团队共享构建。'
  },
  {
    id: 'cmake-four-steps',
    module: 'workspace',
    title: 'CMakeLists.txt 注册 C++ 节点四步配置',
    question: '写出在 CMakeLists.txt 中注册 C++ 节点 cpp_node（源码为 src/cpp_node.cpp）所需的 4 个固定动作：查找包、声明目标、绑定依赖、交付安装。',
    hint: '依次调用 find_package、add_executable、ament_target_dependencies、install。',
    answer: "find_package(rclcpp REQUIRED)\nadd_executable(cpp_node src/cpp_node.cpp)\nament_target_dependencies(cpp_node rclcpp)\ninstall(TARGETS\n  cpp_node\n  DESTINATION lib/${PROJECT_NAME}\n)",
    source: 'C++功能包五步流程笔记.docx',
    note: '必须有 install(TARGETS ... DESTINATION lib/${PROJECT_NAME})，可执行程序才会被拷贝到 install 目录，否则 ros2 run 会报错找不到程序。'
  },

  // ================= 2. Python 节点基础与面向对象 (Python Node & OOP) =================
  {
    id: 'py-minimal-boilerplate',
    module: 'python',
    title: 'Python 节点四步最小骨架（函数式）',
    question: '默写 Python ROS 2 最小节点的标准四步骨架：导入核心包与节点类、系统初始化通电、实例化节点实体、spin 驻留等待、关机收尾。',
    hint: '包含 rclpy 导入、from rclpy.node import Node、main 函数及入口保护。',
    answer: 'import rclpy\nfrom rclpy.node import Node\n\ndef main():\n    rclpy.init()\n    node = Node("python_node")\n    node.get_logger().info("你好 Python 节点！")\n    rclpy.spin(node)\n    rclpy.shutdown()\n\nif __name__ == "__main__":\n    main()',
    source: 'ROS2笔记.docx',
    note: 'rclpy.init() 通电 -> Node() 造实体 -> rclpy.spin() 挂起死循环 -> rclpy.shutdown() 关机退出。'
  },
  {
    id: 'py-logger-vs-print',
    module: 'python',
    title: '节点日志记录器与日志级别',
    question: '写出使用 node 的日志记录器分别输出一条 INFO（信息）与一条 WARN（警告）日志的代码，并简述为什么不用普通 print。',
    hint: 'node.get_logger().info(...) 与 warn(...)。',
    answer: 'node.get_logger().info("你好 Python 节点！")\nnode.get_logger().warn("你好 Python 节点！")',
    source: 'ROS2笔记.docx',
    note: '不用 print 是因为 ROS 2 日志工具会自动附带日志级别（INFO/WARN）、纳秒级时间戳以及节点名称，多节点协作排错必备。'
  },
  {
    id: 'py-spin-lifecycle',
    module: 'python',
    title: 'spin() 的运行机制与 KeyboardInterrupt 异常',
    question: '简述 spin() 到底运行多久、何时退出，以及在终端按 Ctrl + C 时 Python 底层抛出的是什么异常。',
    hint: '死循环等待事件、外部打断信号、异常类型名称。',
    answer: "1. spin() 是一个等待与响应事件的死循环（保持节点存活不退场），只要没有外部中断，会一直运行；\n2. 终端按下 Ctrl + C 时操作系统发送中断信号，Python 底层抛出 KeyboardInterrupt 异常打断 spin 循环，程序才会执行 shutdown() 清理退出。",
    source: 'ROS2笔记.docx',
    note: '演示代码通常省略 try-finally，因此直接按 Ctrl+C 终端可能会看到异常追踪信息。'
  },
  {
    id: 'py-ament-prefix-path',
    module: 'python',
    title: 'AMENT_PREFIX_PATH 与 ros2 run 寻路机制',
    question: '敲下 ros2 run 命令时，系统到底是如何找到并启动你的可执行程序的？环境变量 AMENT_PREFIX_PATH 起到什么作用？',
    hint: '全局代号通讯录、source 脚本追加路径。',
    answer: "环境变量是系统的全局通讯录。source install/setup.bash 会把当前功能包的 install 绝对路径追加到 $AMENT_PREFIX_PATH 中；ros2 run 会读取该环境变量，将包名和可执行程序拼成完整路径在硬盘上动态定位并执行。",
    source: 'ROS2笔记.docx',
    note: '这种机制使得 ROS 2 既能检索官方系统安装的包，也能动态检索开发者本地构建的包。'
  },
  {
    id: 'oop-inherit-and-super',
    module: 'python',
    title: '面向对象：Node 继承与 super() 出厂首行铁律',
    question: '写出自定义类 MyNode 继承官方 Node，并在 __init__ 第一行正确调用父类初始化，将节点命名为 "my_node"。',
    hint: '括号中继承 Node，__init__ 第一行必须写 super()。',
    answer: 'class MyNode(Node):\n    def __init__(self):\n        super().__init__("my_node")',
    source: '面向对象与ROS2节点模板笔记.docx',
    note: '出厂初始化第一行必喊 super()！漏掉这句，父类的通信底层底座就未激活，后续调用 ROS 2 功能会当场崩溃。'
  },
  {
    id: 'oop-self-rules',
    module: 'python',
    title: '面向对象：self 的使用红线',
    question: '在 ROS 2 节点类中，什么时候必须加 self.，什么时候绝不能加 self.？写出判定红线。',
    hint: '区分跨函数复用的成员与单次计算即抛弃的临时变量。',
    answer: "必须加 self.：跨函数复用的东西（如发布者 self.pub、订阅者 self.sub、定时器 self.timer、类成员计数器 self.count）。\n绝不加 self.：单次计算即抛弃的临时变量（如 msg = Twist()、几何差值 dx、临时速度变量、回调传入的临时形参）。",
    source: '面向对象与ROS2节点模板笔记.docx / ROS2实操笔记_终版.docx',
    note: '不加 self. 的变量在当前函数执行完毕后会被自动垃圾回收；严禁将仅用一次的临时数据挂在 self 上污染类空间。'
  },
  {
    id: 'oop-standard-template',
    module: 'python',
    title: '工业级 Python 节点标准面向对象模板',
    question: '默写工业级 ROS 2 Python 节点标准面向对象模板：包含继承 Node、super 初始化、成员属性、业务方法与 main 标准生命周期。',
    hint: '定义 class MyRobotNode(Node)，主函数中依次 init -> 实例化 -> 业务方法 -> spin -> shutdown。',
    answer: 'import rclpy\nfrom rclpy.node import Node\n\nclass MyRobotNode(Node):\n    def __init__(self, node_name: str):\n        super().__init__(node_name)\n        self.count = 0\n        self.get_logger().info(f"节点 {node_name} 初始化完成！")\n\n    def do_work(self):\n        self.count += 1\n        self.get_logger().info(f"正在执行任务，第 {self.count} 次")\n\ndef main():\n    rclpy.init()\n    node = MyRobotNode("my_node")\n    node.do_work()\n    rclpy.spin(node)\n    rclpy.shutdown()\n\nif __name__ == "__main__":\n    main()',
    source: '面向对象与ROS2节点模板笔记.docx',
    note: '调用函数和方法必须加括号 ()，漏了只会拿到指针对象，根本不会触发实际执行。'
  },

  // ================= 3. C++ 节点基础与底层机制 (C++ Node Basics) =================
  {
    id: 'cpp-standard-boilerplate',
    module: 'cpp',
    title: 'C++ ROS 2 节点标准“四步骨架”',
    question: '默写 C++ ROS 2 独立节点的标准四步骨架：头文件引入、通电开机、创建智能指针节点、打印日志、原地待命死循环与关机收尾。',
    hint: '#include "rclcpp/rclcpp.hpp"，main 函数中依次 init、make_shared、spin、shutdown。',
    answer: '#include "rclcpp/rclcpp.hpp"\n\nint main(int argc, char **argv)\n{\n    rclcpp::init(argc, argv);\n    auto node = std::make_shared<rclcpp::Node>("cpp_node");\n    RCLCPP_INFO(node->get_logger(), "节点启动成功！");\n    rclcpp::spin(node);\n    rclcpp::shutdown();\n    return 0;\n}',
    source: 'C++ROS2节点骨架笔记.docx',
    note: '一个字母都不用改的是：rclcpp::init、rclcpp::spin、rclcpp::shutdown。唯一由你填空的是双引号里的节点名字和日志文字。'
  },
  {
    id: 'cpp-three-core-symbols',
    module: 'cpp',
    title: 'C++ 3 个核心符号含义 (::, ->, ;)',
    question: '简述 C++ ROS 2 编程中 ::（双冒号）、->（箭头）、;（分号）三个符号的核心含义与使用场景。',
    hint: ':: 表示作用域，-> 表示通过指针调用，; 是语句结束符。',
    answer: "::  （双冒号）：“……家里的”（作用域），如 rclcpp::init 找 rclcpp 命名空间下的 init 工具。\n->  （箭头）：通过指针调用成员，因为 node 是 make_shared 生成的智能指针（存的是地址），必须用 node->get_logger()。\n;   （分号）：每句话的句号，C++ 不看缩进，每一行有效代码末尾必须带分号。",
    source: 'C++ROS2节点骨架笔记.docx',
    note: '智能指针不能用普通 . 访问，必须用箭头 -> 调用成员方法。'
  },
  {
    id: 'cpp-cmake-positioning',
    module: 'cpp',
    title: 'CMake 的定位与为什么不能手敲 g++',
    question: '为什么开发 ROS 2 C++ 程序不能指望直接用 g++ 命令编译？CMake（CMakeLists.txt）扮演什么角色？',
    hint: '头文件与动态库依赖量、包工头与泥瓦匠的比喻。',
    answer: "ROS 2 依赖成百上千个底层头文件和 .so 库文件，手敲 g++ 的包含路径会崩溃。CMake 是“包工头”而不是泥瓦匠，它负责生成施工方案并自动找齐头文件和动态库位置，指挥底层编译器工作；ament_target_dependencies 则全自动包揽依赖配置。",
    source: 'C++ROS2节点骨架笔记.docx',
    note: '不要脱离 ROS 2 构建系统手动编译，一切交由 CMakeLists.txt 和 colcon 统一调度。'
  },
  {
    id: 'cpp-class-name-case',
    module: 'cpp',
    title: 'Python/C++ 类名与对象实例命名规范',
    question: '为什么代码中 Node 的首字母要大写，而 node 变量要小写？',
    hint: '类（模具）与实体对象的区别。',
    answer: "在编程命名规范中，首字母大写（如 Node）代表“模板/类（Class）”，是生产节点的模具；全小写（如 node = Node(\"...\")）代表根据模板制造出来的具体“实体对象（Object）”。",
    source: 'ROS2笔记.docx',
    note: '这是所有面向对象语言的通用规范，大写看作模具，小写看作实物。'
  },

  // ================= 4. 话题通信 Pub/Sub 机制 (Topics Pub/Sub) =================
  {
    id: 'pub-create-timer',
    module: 'topics',
    title: '创建 String 发布者与定时器（领喇叭与定闹钟）',
    question: '写出在节点 __init__ 中创建 String 话题发布者（话题名为 topic_name，队列深度 10）以及 1.0 秒定时器的两行代码。',
    hint: 'create_publisher 与 create_timer。回调函数名作为参数传入时绝不加括号！',
    answer: "self.pub = self.create_publisher(String, 'topic_name', 10)\nself.timer = self.create_timer(1.0, self.timer_callback)",
    source: 'ROS2话题通信速记笔记.docx',
    note: '为什么传函数名不带括号？带括号 self.timer_callback() 会立刻执行；不带括号是把函数名片/指针递给系统，闹钟响了系统才去调。'
  },
  {
    id: 'pub-timer-callback-impl',
    module: 'topics',
    title: '发布者定时回调函数实现（装信封推信）',
    question: '写出 String 话题发布者的定时回调函数 timer_callback：实例化空消息、填充 data 为 \'要发的内容\' 并推送到 DDS 网络。',
    hint: 'msg = String() -> msg.data = ... -> self.pub.publish(msg)。',
    answer: "def timer_callback(self):\n    msg = String()\n    msg.data = '要发的内容'\n    self.pub.publish(msg)",
    source: 'ROS2话题通信速记笔记.docx',
    note: 'self.get_logger().info 只是本地终端打印，self.pub.publish(msg) 才是真正将二进制消息推向网络。'
  },
  {
    id: 'sub-create-four-args',
    module: 'topics',
    title: '创建 String 订阅者（4 参数规则与事件驱动）',
    question: '写出在节点 __init__ 中创建 String 话题订阅者的代码，订阅 topic_name，绑定回调 self.sub_callback，队列深度为 10；并说明为何必须绑定回调。',
    hint: 'create_subscription(类型, 话题名, 回调, 队列深度)。',
    answer: "self.sub = self.create_subscription(\n    String, 'topic_name', self.sub_callback, 10\n)",
    source: 'ROS2话题通信速记笔记.docx / ROS2实操笔记_终版.docx',
    note: '硬性规则：订阅者必须绑定回调函数，因为这是事件驱动中断机制（数据到达即触发中断），绝不能写成死等阻塞读取。'
  },
  {
    id: 'sub-callback-impl',
    module: 'topics',
    title: '订阅者回调函数实现（拆信封）',
    question: '写出订阅者回调函数 sub_callback：接收传入的 msg，从 msg.data 取出内容并通过日志输出“收到: 内容”。',
    hint: '必须有 msg 形参接数据，直接从 .data 取值。',
    answer: "def sub_callback(self, msg):\n    data = msg.data\n    self.get_logger().info(f'收到: {data}')",
    source: 'ROS2话题通信速记笔记.docx',
    note: '回调函数中的 msg 形参由 ROS 2 底层在收到新消息时自动传入，不可省略。'
  },
  {
    id: 'topics-qos-depth-meaning',
    module: 'topics',
    title: 'QoS 队列深度参数 (10) 的物理意义',
    question: '创建发布者和订阅者时，参数中的数字 10（队列深度 / QoS Depth）代表什么物理含义？超出后如何处理？',
    hint: '缓冲队列长度，先进先出溢出丢弃。',
    answer: "10 代表缓冲队列长度（QoS Depth）。当网络堵塞或回调来不及处理数据时，系统底层最多在内存中缓存 10 条消息，超出后会自动挤掉最旧的数据（FIFO 丢旧保新）。",
    source: 'ROS2话题通信速记笔记.docx',
    note: '队列不是越大越好，过大的队列在阻塞时会导致接收端处理严重滞后。'
  },
  {
    id: 'topics-shell-template',
    module: 'topics',
    title: '面向对象话题通信固定外壳模版',
    question: '默写面向对象话题节点的固定外壳模版：引入 String 消息类、定义继承 Node 的 MyNode 外壳以及 main 启动四步。',
    hint: 'from example_interfaces.msg import String，定义类并在 __init__ 中调用 super()。',
    answer: "import rclpy\nfrom example_interfaces.msg import String\nfrom rclpy.node import Node\n\nclass MyNode(Node):\n    def __init__(self):\n        super().__init__('node_name')\n\ndef main():\n    rclpy.init()\n    node = MyNode()\n    rclpy.spin(node)\n    rclpy.shutdown()\n\nif __name__ == '__main__':\n    main()",
    source: 'ROS2话题通信速记笔记.docx',
    note: '每次开发话题通信时直接复制这段外壳，只要在 __init__ 里塞入发布者/订阅者核心逻辑即可。'
  },
  {
    id: 'topics-compile-run-flow',
    module: 'topics',
    title: '终端编译运行固定 4 步走流程',
    question: '每次修改完话题通信节点代码后，终端必须走完的 4 步固定编译与运行命令是什么？',
    hint: '进根目录 -> 编译 -> 刷新环境 -> 启动。',
    answer: "cd ~/工作空间名\ncolcon build\nsource install/setup.bash\nros2 run 功能包名 节点别名",
    source: 'ROS2话题通信速记笔记.docx',
    note: '每次改完代码必须重新 colcon build（若是 Python 软链接模式可跳过 build），新终端必须重新 source。'
  },

  // ================= 5. CLI 工具与反查三板斧 (CLI Tools) =================
  {
    id: 'cli-reverse-three-axes',
    module: 'cli',
    title: '终端反查三板斧（绝不死记接口名）',
    question: '写出 ROS 2 终端反查三板斧的 3 条命令：分别用于查节点底牌（掀开看收发接口）、查话题通信准确类型、以及查信封里到底有哪些字段。',
    hint: '依次使用 node info、topic info、interface show。',
    answer: "ros2 node info <节点名>\nros2 topic info <话题名>\nros2 interface show <类型名>",
    source: 'ROS2实操笔记_终版.docx',
    note: '绝不死记接口名：node info 看收发；topic info 查类型（如 geometry_msgs/msg/Twist）；interface show 查字段（如 linear.x、angular.z）。'
  },
  {
    id: 'cli-topic-four-commands',
    module: 'cli',
    title: '话题排查 4 大常用命令',
    question: '写出排查话题通信时必背的 4 个命令：列出所有频道、监听某个频道内容（以 /chatter 为例）、查频道状态与类型、看通信拓扑关系图。',
    hint: 'list、echo、info 以及独立的图形工具 rqt_graph。',
    answer: "ros2 topic list\nros2 topic echo /chatter\nros2 topic info /chatter\nrqt_graph",
    source: 'ROS2话题通信速记笔记.docx',
    note: 'rqt_graph 可以直观检查节点之间的话题连线是否打通，是排查通信断裂的首选工具。'
  },
  {
    id: 'cli-run-general-syntax',
    module: 'cli',
    title: 'ros2 run 通用启动命令格式',
    question: '写出 ROS 2 运行命令的通用格式，并说明 Python 与 C++ 节点别名分别在何处配置。',
    hint: 'ros2 run <功能包名> <节点别名>。',
    answer: "ros2 run <功能包名> <节点别名>",
    source: 'ROS2话题通信速记笔记.docx / C++功能包五步流程笔记.docx',
    note: 'Python 节点别名在 setup.py 的 console_scripts 中注册；C++ 的程序名来自 CMakeLists.txt 的 add_executable。'
  },
  {
    id: 'cli-rcutils-format-export',
    module: 'cli',
    title: '自定义终端日志输出格式环境变量',
    question: '如何不改动任何 Python 或 C++ 代码，通过设置环境变量来修改 ROS 2 底层输出日志的排版格式？',
    hint: '利用 RCUTILS_CONSOLE_OUTPUT_FORMAT 环境变量。',
    answer: "export RCUTILS_CONSOLE_OUTPUT_FORMAT=\"[{severity}] [{name}]: {message}\"",
    source: 'ROS2笔记.docx',
    note: 'RCUTILS 是 ROS 2 底层的跨平台基础 C 工具库，可通过设置该环境变量自定义日志中时间戳、文件行号等的排版展示。'
  },

  // ================= 6. 自定义接口 .msg 规范 (Custom Interfaces) =================
  {
    id: 'msg-three-red-lines',
    module: 'custom-msg',
    title: '.msg 接口文件三大语法红线',
    question: '写出定义自定义接口文件（.msg）时的三大硬性语法红线：存放路径、文件命名法、字段类型与命名格式。',
    hint: '包根目录的 msg/、大驼峰命名（SystemStatus.msg）、标准 IDL 类型加小写下划线字段名。',
    answer: "1. 存放路径：必须在功能包根目录下的 msg/ 文件夹中。\n2. 文件命名：必须是大驼峰命名法（如 SystemStatus.msg），首字母大写。\n3. 字段格式：标准IDL类型 字段名（类型如 float32, float64, int32, string, bool；字段名必须用小写字母加下划线，如 cpu_percent）。",
    source: 'ROS2自定义接口msg笔记.docx',
    note: '严禁放错目录或大小写混淆，否则 CMake 构建阶段 rosidl 编译器会直接报错。'
  },
  {
    id: 'msg-cmakelists-macro',
    module: 'custom-msg',
    title: 'CMakeLists.txt 接口转译核心宏',
    question: '写出在接口包 CMakeLists.txt 中引入生成器并调用 rosidl_generate_interfaces 宏转译 msg/SystemStatus.msg 的核心配置片段。',
    hint: 'find_package(rosidl_default_generators REQUIRED) 与 rosidl_generate_interfaces(${PROJECT_NAME} ...)。',
    answer: "find_package(rosidl_default_generators REQUIRED)\nrosidl_generate_interfaces(${PROJECT_NAME}\n  \"msg/SystemStatus.msg\"\n  DEPENDENCIES builtin_interfaces\n)",
    source: 'ROS2自定义接口msg笔记.docx',
    note: '拼写必须精准：生成器是 rosidl_default_generators，宏是 rosidl_generate_interfaces。若包含时间戳需指定 DEPENDENCIES builtin_interfaces。'
  },
  {
    id: 'msg-python-import-and-stamp',
    module: 'custom-msg',
    title: 'Python 导入自定义消息与获取时间戳',
    question: '写出从 status_interfaces 包导入 SystemStatus 消息类，并在节点中为 msg.stamp 赋值当前 ROS 时间戳的代码。',
    hint: 'from <包名>.msg import <接口类名>；时间戳通过 self.get_clock().now().to_msg() 获取。',
    answer: "from status_interfaces.msg import SystemStatus\n\nmsg.stamp = self.get_clock().now().to_msg()",
    source: 'ROS2自定义接口msg笔记.docx',
    note: 'ROS 2 中自带纳秒级高精度时钟，通过 to_msg() 可以直接转成标准的 builtin_interfaces/Time 消息结构。'
  },
  {
    id: 'msg-log-vs-publish-duty',
    module: 'custom-msg',
    title: '日志打印与数据发布的本质分工',
    question: '在发送节点中，self.get_logger().info() 与 self.pub.publish(msg) 的本质分工分别是什么？',
    hint: '本地终端显示 vs 推向分布式 DDS 网络。',
    answer: "self.get_logger().info()：只在当前控制台终端打字，是给开发者肉眼调试看的；\nself.pub.publish(msg)：真正把二进制数据打包推向 DDS 网络，其他订阅者才能接收到。",
    source: 'ROS2自定义接口msg笔记.docx',
    note: '只打日志不调 publish，系统其他节点将完全感知不到任何数据产生。'
  },
  {
    id: 'msg-ecosystem-first-rule',
    module: 'custom-msg',
    title: 'ROS 2 接口生态第一原则',
    question: '简述 ROS 2 接口设计的“生态第一原则”：官方底盘速度控制和激光雷达数据分别应该使用哪个标准消息类型？',
    hint: '已有标准绝不造轮子。底盘速度 Twist，激光雷达 LaserScan。',
    answer: "官方已有标准接口时，绝对不要自己写！\n底盘速度控制：必须使用 geometry_msgs/msg/Twist\n激光雷达数据：必须使用 sensor_msgs/msg/LaserScan",
    source: 'ROS2自定义接口msg笔记.docx',
    note: '滥用自定义接口会导致 Nav2 导航栈、Rviz2 等整个开源生态无法识别你的机器人。'
  },
  {
    id: 'msg-vs-json-dict',
    module: 'custom-msg',
    title: '为什么通信要用 .msg 而不用 JSON 或 Python 字典？',
    question: '简述 ROS 2 底层通信采用 .msg 强类型接口，而不用 JSON 或 Python 字典的三大核心原因。',
    hint: '编译期强契约、微秒级零序列化开销、抹平跨语言鸿沟。',
    answer: "1. 编译期强类型契约：接口锁死字段类型和名称，防止敲错键名导致程序在运行时静默失效；\n2. 零序列化开销（微秒级通信）：底层 DDS 协议走二进制内存对齐直传，完全省去了字符串编码与反序列化的 CPU 性能浪费；\n3. 抹平跨语言鸿沟：C++ 与 Python 节点看到的是完全一致的结构体定义。",
    source: 'ROS2自定义接口msg笔记.docx',
    note: '在机器人实时控制系统中，微秒级延迟与强类型安全是系统不失控的关键保证。'
  },

  // ================= 7. 海龟控制与运动学 (Robot Control & PID) =================
  {
    id: 'turtle-cmd-vel-publisher',
    module: 'control',
    title: '海龟控制：创建速度发布者',
    question: '写出控制小海龟运动的速度发布者创建语句，消息类型使用 Twist，话题名称为 /turtle1/cmd_vel，队列深度为 10。',
    hint: 'create_publisher(Twist, \'/turtle1/cmd_vel\', 10)。',
    answer: "self.cmd_vel_pub = self.create_publisher(Twist, '/turtle1/cmd_vel', 10)",
    source: '海龟画圆开环控制笔记.docx',
    note: 'Twist 消息属于 geometry_msgs.msg 模块。话题名称注意带上前导斜杠 /turtle1/cmd_vel。'
  },
  {
    id: 'turtle-watchdog-mechanism',
    module: 'control',
    title: '定时器与底盘看门狗安全机制',
    question: '写出以 10Hz（0.1 秒间隔）频率创建定时器的代码，并解释为什么控制机器人底盘必须用定时器周期性发送速度。',
    hint: '底盘控制器自带看门狗 (Watchdog) 安全机制。',
    answer: "self.timer = self.create_timer(0.1, self.timer_callback)",
    source: '海龟画圆开环控制笔记.docx',
    note: '底盘控制器自带看门狗安全机制：如果只发一次速度，海龟走一小截就会因未收到新指令超时而自动刹停；必须用定时器以固定频率持续“喂指令”。'
  },
  {
    id: 'turtle-twist-circle-callback',
    module: 'control',
    title: 'Twist 速度通道与画圆回调实现',
    question: '写出 Twist 消息控制平面机器人运动最常用的两个通道（前后线速度与偏航角速度）；并写出画圆回调中设置线速度 1.0 m/s、角速度 1.0 rad/s 并发布的代码。',
    hint: 'linear.x 为前进后退；angular.z 为偏航角速度。其余 4 个分量在平面移动中默认全为 0。',
    answer: "# msg.linear.x：前后线速度（前进为正，后退为负，单位 m/s）\n# msg.angular.z：绕 Z 轴偏航角速度（逆时针左转为正，顺时针右转为负，单位 rad/s）\n\ndef timer_callback(self):\n    msg = Twist()\n    msg.linear.x = 1.0\n    msg.angular.z = 1.0\n    self.cmd_vel_pub.publish(msg)",
    source: '海龟画圆开环控制笔记.docx',
    note: '地面差速移动机器人只能在二维平面上前行与旋转，linear.y/z 与 angular.x/y 恒为 0。'
  },
  {
    id: 'turtle-heading-atan2-rule',
    module: 'control',
    title: '航向角计算铁律 (atan2 vs atan)',
    question: '平面移动机器人根据目标点与当前点差值 (dy, dx) 计算朝向角时，为什么必须使用 math.atan2(dy, dx) 而绝不能用 atan(dy/dx)？',
    hint: '从四个象限的正负符号判断与分母为 0 崩溃风险回答。',
    answer: "永远用 math.atan2(dy, dx)，绝不用 atan(dy/dx)：\n1. 自动处理四个象限的正负号，返回完整的 (-π, π] 角度区间；\n2. 天然避免 dx == 0（正前方/正后方）时分母为零崩溃（ZeroDivisionError）。",
    source: 'ROS2实操笔记_终版.docx',
    note: 'atan(dy/dx) 会丢失半平面方向信息，导致机器人反向倒车或在直角方位除以零崩溃。'
  },
  {
    id: 'turtle-p-control-pid-concept',
    module: 'control',
    title: 'P 控制的物理直觉与小海龟为何只需 P 控制',
    question: '简述 P（比例）控制器的物理直觉；并解释在 PID 控制体系中，为什么仿真小海龟只要 P 就能精确停住，而不需要 I 和 D 控制？',
    hint: '拿误差当油门；小海龟是理想一阶模型，无质量惯性与地面静摩擦。',
    answer: "1. P 控制物理直觉：拿“误差”当“油门”。距离误差大开得快，接近目标自动刹车；角度偏差大猛打方向盘，正对目标方向盘回正。\n2. 为什么海龟只要 P：海龟是理想的一阶运动学模型，没有真实物理机器人的质量、惯性与地面摩擦死区，给零速度立刻静止，因此不需要 I（消除静摩擦死区静差）和 D（对冲惯性防冲过头震荡）。",
    source: 'ROS2实操笔记_终版.docx',
    note: '真机（差速轮底盘）往往需要完整的 PID 或轨迹规划栈（如 Nav2），而小海龟非常适合用于快速建立比例控制直觉。'
  },

  // ================= 8. 上位机开发与 Qt 界面 (ROS 2 & Qt GUI) =================
  {
    id: 'qt-lifecycle',
    module: 'qt-gui',
    title: 'Qt 窗口生命周期的四步骨架',
    question: '默写 Qt 桌面界面启动与存活的四步标准骨架：初始化大管家、创建控件实例、显式显示窗口、启动主事件循环死循环阻塞。',
    hint: 'QApplication(sys.argv) -> QLabel() -> show() -> sys.exit(app.exec_())。',
    answer: "app = QApplication(sys.argv)\nlabel = QLabel()\nlabel.show()\nsys.exit(app.exec_())",
    source: 'ROS2上位机Qt笔记.docx',
    note: '控件创建后默认隐藏，必须显式调用 show() 才会渲染弹窗；必须有 sys.exit(app.exec_()) 启动主事件循环阻塞，否则程序执行完毕会当场闪退。'
  },
  {
    id: 'qt-ros-multithread',
    module: 'qt-gui',
    title: 'ROS 2 与 Qt 结合的多线程固定模板',
    question: '解释 Qt 的 app.exec_() 与 ROS 2 的 rclpy.spin() 放在同一个单线程中的冲突本质；并写出另起子线程启动 spin 监听的三行固定工程代码。',
    hint: '两者都是死循环阻塞主线程；使用 threading.Thread，设置 target、args 和 daemon=True。',
    answer: "# 冲突本质：Qt 的 app.exec_() 和 ROS 2 的 rclpy.spin() 都是死循环，单线程中后一个永远无法运行。\n# 固定解法：主线程专供 Qt 跑界面，另开子线程挂载 ROS 2 spin 监听：\n\nspin_thread = threading.Thread(\n    target=rclpy.spin, args=(node,), daemon=True\n)\nspin_thread.start()",
    source: 'ROS2上位机Qt笔记.docx',
    note: '细节死记：args=(node,) 末尾必须有逗号（Python 元组语法）；daemon=True 必须设为守护线程，确保关闭窗口时后台子线程随主进程一同自杀退出，防止进程残留假死。'
  },
  {
    id: 'qt-callback-params-rule',
    module: 'qt-gui',
    title: '回调函数形参铁律 (self vs self, msg)',
    question: '在上位机 ROS 2 节点中，为什么定时器回调（timer_callback）的形参只有 (self)，而话题订阅回调（status_callback）必须写 (self, msg)？',
    hint: '纯时间触发机制与 DDS 通信底层的数据推送机制区别。',
    answer: "1. 定时器回调只有 (self)：纯时间闹钟触发，系统没有塞给你任何数据包裹；\n2. 订阅回调必须写 (self, msg)：DDS 通信底层强行把接收到的网络数据包送过来，必须留一个变量位 msg 接住，否则运行时直接报参数数量不匹配崩溃。",
    source: 'ROS2上位机Qt笔记.docx',
    note: '即使在回调内部暂时不需要读取 msg，订阅者的回调签名也必须保留 msg 形参以防崩溃。'
  },
  {
    id: 'qt-label-set-text',
    module: 'qt-gui',
    title: 'Qt UI 文字刷新的唯一核心指令',
    question: '在上位机订阅回调中，收到新消息数据（如 msg.cpu_percent）后，刷新界面文字展示的核心语句是什么？写出代码示例。',
    hint: '调用 QLabel 控件的 setText 方法覆盖内容。',
    answer: "self.label.setText(f\"CPU 使用率: {msg.cpu_percent:.1f}%\")",
    source: 'ROS2上位机Qt笔记.docx',
    note: '上位机界面刷新的核心动作永远只有调用 setText() 覆盖旧字符串，Qt 会在后台自动完成重新排版和像素重绘。'
  },
  {
    id: 'qt-top-level-widget',
    module: 'qt-gui',
    title: 'Qt 顶级独立窗口判定规则',
    question: '为什么在代码中仅仅实例化一个独立的 label = QLabel() 并调用 show()，它就能作为一个独立的桌面窗口弹出，而不需要额外创建 QMainWindow？',
    hint: 'Qt 底层对没有父容器 (Parent) 控件的渲染规则。',
    answer: "Qt 底层渲染规则：任何控件（QWidget、QLabel、QPushButton 等）只要在创建时没有指定父级容器（Parent 为 None），系统就会自动为它加上操作系统的标准窗口边框、标题栏和关闭按钮，将其视为一个独立的顶级桌面窗口。",
    source: 'ROS2上位机Qt笔记.docx',
    note: '当控件指定了 parent 时，它就会变成嵌在父窗口内部的子组件，不再具有独立窗口边框。'
  },
  {
    id: 'qt-tech-selection-why-python',
    module: 'qt-gui',
    title: 'ROS 2 上位机技术选型认知 (Python Qt vs C++ Qt)',
    question: '为什么常规 ROS 2 机器人上位机监控看板首选 Python Qt（PyQt/PySide）而不是 C++ Qt？在什么场景下才需要用 C++ Qt？',
    hint: '从刷新频率、开发效率与免编译优势，以及高频三维点云渲染场景对比。',
    answer: "1. 为什么首选 Python Qt：上位机监控通常只接收 1Hz~10Hz 的轻量级状态广播，Python PyQt 性能完全过剩，且具备免编译、修改脚本即时生效的极高开发与调试效率；\n2. 什么时候必须用 C++ Qt：只有在承载海量高频三维点云渲染（如 RViz2 插件）、或对微秒级实时响应有极端要求的工业级底层控制下，才需要深入 C++ Qt。",
    source: 'ROS2上位机Qt笔记.docx',
    note: '“用对工具比用重工具更重要”：状态看板开发优先追求快速迭代，计算密集型与三维渲染才考虑 C++。'
  }
];

// LocalStorage 存储键与内存降级兜底
const STORAGE_KEY = 'ros2-practice-progress-v2';
let memoryProgressStore = {};

function readProgress() {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    }
  } catch (e) {
    console.warn('读取本地缓存失败，降级使用内存存储:', e);
  }
  return memoryProgressStore;
}

// 页面运行状态
let progress = readProgress();
let activeModule = 'all';
let activeStatus = 'all'; // 'all' | 'unattempted' | 'passed' | 'review'
let activeCardId = (cards && cards[0]) ? cards[0].id : 'pkg-python-create';
let searchQuery = '';
let compareMode = 'original'; // 'original' | 'diff'
let isBlurProtected = true; // 防偷看遮罩开关（默认开启）
let toastTimer = null;

// 工具函数
const $ = (id) => document.getElementById(id);

function saveProgress() {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    }
  } catch (e) {
    console.warn('保存本地进度失败:', e);
  }
  memoryProgressStore = progress;
  try { renderProgress(); } catch (e) {}
  try { renderCards(); } catch (e) {}
  try { renderQuestionMeta(); } catch (e) {}
}

function normalizeCode(str) {
  if (!str) return '';
  return str
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .split('\n')
    .map(line => line.trimEnd())
    .join('\n')
    .trim();
}

function computeDiff(userInput, originalAnswer) {
  const userLines = userInput.replace(/\r/g, '').split('\n').map(l => l.trimEnd());
  const ansLines = originalAnswer.replace(/\r/g, '').split('\n').map(l => l.trimEnd());

  const maxLen = Math.max(userLines.length, ansLines.length);
  const diffRows = [];

  for (let i = 0; i < maxLen; i++) {
    const uLine = userLines[i] !== undefined ? userLines[i] : null;
    const aLine = ansLines[i] !== undefined ? ansLines[i] : null;

    if (uLine === null) {
      diffRows.push({ type: 'missing', expected: aLine, actual: '' });
    } else if (aLine === null) {
      diffRows.push({ type: 'extra', expected: '', actual: uLine });
    } else if (uLine === aLine) {
      diffRows.push({ type: 'equal', expected: aLine, actual: uLine });
    } else {
      diffRows.push({ type: 'diff', expected: aLine, actual: uLine });
    }
  }

  return diffRows;
}

function getFilteredCards() {
  return cards.filter(c => {
    // 模块筛选
    if (activeModule !== 'all' && c.module !== activeModule) return false;
    
    // 状态筛选
    const st = progress[c.id];
    if (activeStatus === 'passed' && st !== 'passed') return false;
    if (activeStatus === 'review' && st !== 'review') return false;
    if (activeStatus === 'unattempted' && (st === 'passed' || st === 'review')) return false;

    // 关键词搜索
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const match =
        c.title.toLowerCase().includes(q) ||
        c.question.toLowerCase().includes(q) ||
        c.answer.toLowerCase().includes(q) ||
        c.source.toLowerCase().includes(q) ||
        (c.note && c.note.toLowerCase().includes(q));
      if (!match) return false;
    }

    return true;
  });
}

function getCurrentCard() {
  const filtered = getFilteredCards();
  if (filtered.some(c => c.id === activeCardId)) {
    return cards.find(c => c.id === activeCardId);
  }
  return filtered[0] || null;
}

// 渲染分类导航
function renderCategories() {
  const container = $('categories');
  container.innerHTML = '';

  modules.forEach(m => {
    const count = m.id === 'all'
      ? cards.length
      : cards.filter(c => c.module === m.id).length;

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `category-button ${activeModule === m.id ? 'active' : ''}`;
    btn.innerHTML = `
      <span class="cat-icon">${m.icon}</span>
      <span class="cat-name">${m.name}</span>
      <span class="cat-count">${count}</span>
    `;

    btn.addEventListener('click', () => {
      activeModule = m.id;
      const nextList = getFilteredCards();
      if (!nextList.some(c => c.id === activeCardId)) {
        activeCardId = (nextList[0] && nextList[0].id) ? nextList[0].id : null;
      }
      renderAll();
    });

    container.appendChild(btn);
  });
}

// 渲染状态筛选标签
function renderStatusFilters() {
  const container = $('status-filters');
  if (!container) return;

  const passedCount = Object.values(progress).filter(x => x === 'passed').length;
  const reviewCount = Object.values(progress).filter(x => x === 'review').length;
  const unattemptedCount = cards.length - (passedCount + reviewCount);

  const filters = [
    { id: 'all', label: '全部', count: cards.length },
    { id: 'unattempted', label: '未作答', count: unattemptedCount },
    { id: 'passed', label: '已掌握', count: passedCount },
    { id: 'review', label: '需复习', count: reviewCount },
  ];

  container.innerHTML = '';
  filters.forEach(f => {
    const pill = document.createElement('button');
    pill.type = 'button';
    pill.className = `filter-pill ${activeStatus === f.id ? 'active' : ''}`;
    pill.innerHTML = `<span>${f.label}</span><small>${f.count}</small>`;
    pill.addEventListener('click', () => {
      activeStatus = f.id;
      const nextList = getFilteredCards();
      if (!nextList.some(c => c.id === activeCardId)) {
        activeCardId = (nextList[0] && nextList[0].id) ? nextList[0].id : null;
      }
      renderAll();
    });
    container.appendChild(pill);
  });
}

// 渲染练习卡片列表
function renderCards() {
  const list = $('card-list');
  const items = getFilteredCards();
  $('card-count').textContent = `${items.length} 题`;
  list.innerHTML = '';

  if (items.length === 0) {
    list.innerHTML = '<div class="empty-state">当前筛选条件下暂无卡片<br><small>请尝试调整搜索或重置筛选</small></div>';
    return;
  }

  items.forEach((c, idx) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `practice-card ${c.id === activeCardId ? 'active' : ''}`;

    const st = progress[c.id];
    let statusBadge = '<span class="status-pill unattempted">○ 未作答</span>';
    if (st === 'passed') {
      statusBadge = '<span class="status-pill passed">✓ 已掌握</span>';
    } else if (st === 'review') {
      statusBadge = '<span class="status-pill review">↻ 需复习</span>';
    }

    const mod = modules.find(m => m.id === c.module);

    btn.innerHTML = `
      <div class="card-item-top">
        <span class="card-item-title">${escapeHtml(c.title)}</span>
        <span class="card-item-seq">${String(idx + 1).padStart(2, '0')}</span>
      </div>
      <div class="card-item-meta">
        <span class="card-item-module">${mod ? mod.icon + ' ' + mod.name : ''}</span>
        ${statusBadge}
      </div>
    `;

    btn.addEventListener('click', () => {
      activeCardId = c.id;
      renderAll();
      if (window.innerWidth < 850) {
        $('practice-workspace').scrollIntoView({ behavior: 'smooth' });
      }
    });

    list.appendChild(btn);
  });
}

// 渲染当前题目详情（严密隐藏答案，防止任何提前泄露）
function renderQuestion() {
  const current = getCurrentCard();

  // 严格确保答案面板与比对区域在切题时隐藏
  hideAnswerPanel();

  if (!current) {
    $('question-title').textContent = '未找到匹配的卡片';
    $('question-prompt').textContent = '请在左侧切换模块或重置筛选条件。';
    $('hint-box').hidden = true;
    $('hint-content').textContent = '';
    $('toggle-hint-btn').style.display = 'none';
    $('answer-input').value = '';
    $('editor-char-count').textContent = '0 字符 · 1 行';
    updateLineNumbers();
    return;
  }

  // 模块与来源标签
  const mod = modules.find(m => m.id === current.module);
  $('card-category').textContent = mod ? mod.name : '练习';
  $('card-source').textContent = `出处: ${current.source}`;

  // 题目与提示
  $('question-title').textContent = current.title;
  $('question-prompt').textContent = current.question;

  if (current.hint) {
    $('toggle-hint-btn').style.display = 'inline-flex';
    $('hint-content').textContent = current.hint;
    $('hint-box').hidden = true;
    $('toggle-hint-btn').textContent = '💡 查看提示';
  } else {
    $('toggle-hint-btn').style.display = 'none';
    $('hint-box').hidden = true;
  }

  // 清空输入与比对结果
  $('answer-input').value = '';
  $('match-result').textContent = '';
  $('match-result').className = 'match-badge';

  // 准备答案数据但保持隐藏
  $('original-answer-code').textContent = current.answer;
  $('answer-note').textContent = current.note || '';

  renderQuestionMeta();
  updateLineNumbers();
}

function renderQuestionMeta() {
  const current = getCurrentCard();
  if (!current) return;

  const filtered = getFilteredCards();
  const currentIdx = filtered.findIndex(c => c.id === current.id);
  $('card-position').textContent = `${String(currentIdx + 1).padStart(2, '0')} / ${String(filtered.length).padStart(2, '0')}`;

  const st = progress[current.id];
  $('mark-passed').classList.toggle('selected', st === 'passed');
  $('mark-review').classList.toggle('selected', st === 'review');
  $('mark-unattempted').classList.toggle('selected', !st);
}

// 隐藏答案面板
function hideAnswerPanel() {
  const panel = $('answer-panel');
  if (panel) {
    panel.hidden = true;
  }
  const result = $('match-result');
  if (result) {
    result.textContent = '';
    result.className = 'match-badge';
  }
}

// 渲染总进度统计
function renderProgress() {
  const passed = Object.values(progress).filter(x => x === 'passed').length;
  const review = Object.values(progress).filter(x => x === 'review').length;
  const total = cards.length;
  const attempted = passed + review;
  const percentage = Math.round((passed / total) * 100);

  $('passed-count').textContent = passed;
  $('review-count').textContent = review;
  $('progress-count').textContent = `${attempted} / ${total}`;
  $('progress-percentage').textContent = `${percentage}% 掌握率`;
  $('progress-bar-fill').style.width = `${Math.min(100, (attempted / total) * 100)}%`;
}

// 渲染上下题导航
function renderSequenceNav() {
  const filtered = getFilteredCards();
  const current = getCurrentCard();
  const index = current ? filtered.findIndex(c => c.id === current.id) : -1;

  const prevBtn = $('prev-card-btn');
  const nextBtn = $('next-card-btn');

  if (prevBtn) prevBtn.disabled = index <= 0;
  if (nextBtn) nextBtn.disabled = index < 0 || index >= filtered.length - 1;

  const seqText = $('sequence-text');
  if (seqText) {
    seqText.textContent = index < 0
      ? '暂无卡片'
      : `顺序进度 ${String(index + 1).padStart(2, '0')} / ${String(filtered.length).padStart(2, '0')}`;
  }

  // 同步移动端吸底操作栏状态
  const mobPrev = $('mobile-prev-btn');
  const mobNext = $('mobile-next-btn');
  const mobCounter = $('mobile-counter-text');
  if (mobPrev) mobPrev.disabled = index <= 0;
  if (mobNext) mobNext.disabled = index < 0 || index >= filtered.length - 1;
  if (mobCounter) {
    mobCounter.textContent = index < 0 ? '0/0' : `${String(index + 1).padStart(2, '0')}/${String(filtered.length).padStart(2, '0')}`;
  }
}

// 渲染顶部模块标题
function renderHeaderModule() {
  const m = modules.find(x => x.id === activeModule);
  if (!m) return;
  $('module-title-icon').textContent = m.icon;
  $('module-title-name').textContent = m.name;
  $('module-title-desc').textContent = m.desc;
}

// 统一渲染入口
function renderAll() {
  renderCategories();
  renderStatusFilters();
  renderCards();
  renderQuestion();
  renderProgress();
  renderSequenceNav();
  renderHeaderModule();
}

// 行号与字符统计
function updateLineNumbers() {
  const input = $('answer-input');
  const lines = Math.max(1, input.value.split('\n').length);
  $('line-numbers').textContent = Array.from({ length: lines }, (_, i) => i + 1).join('\n');
  $('editor-char-count').textContent = `${input.value.length} 字符 · ${lines} 行`;
}

// 提示气泡
// 剪贴板兜底复制
function fallbackCopy(text) {
  try {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(ta);
    if (ok) {
      showToast('答案已成功复制到剪贴板！');
    } else {
      showToast('复制失败，请长按文本手动复制');
    }
  } catch (e) {
    showToast('复制失败，请长按文本手动复制');
  }
}


function showToast(message) {
  const toast = $('toast');
  toast.textContent = message;
  toast.classList.add('visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove('visible');
  }, 1900);
}

// 转义 HTML
function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, ch => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[ch]));
}

// 更新防偷看模糊遮罩状态
function updateBlurState() {
  const originalView = $('original-view');
  const btn = $('toggle-blur-btn');
  if (!btn || !originalView) return;
  if (isBlurProtected) {
    originalView.classList.add('blurred');
    btn.classList.add('active');
    btn.textContent = '👁 防偷看: 开 (悬停看)';
  } else {
    originalView.classList.remove('blurred');
    btn.classList.remove('active');
    btn.textContent = '👁 防偷看: 关';
  }
}

// 揭晓答案面板
function revealAnswer() {
  const current = getCurrentCard();
  if (!current) return;
  const panel = $('answer-panel');
  panel.hidden = false;
  setCompareView('original');
  updateBlurState();
  showToast('已揭晓答案标准原文');
}

// 对比答案并显示逐行 Diff
function checkAnswer() {
  const current = getCurrentCard();
  if (!current) return;

  const userInput = $('answer-input').value;
  const normalizedUser = normalizeCode(userInput);
  const normalizedAnswer = normalizeCode(current.answer);

  const resultBadge = $('match-result');

  // 防偷看保护：如果用户尚未输入任何内容，绝不提前展开答案！
  if (!normalizedUser) {
    resultBadge.textContent = '请先在上方输入框默写你的代码或命令，再点击对比';
    resultBadge.className = 'match-badge warning';
    showToast('请先试着写一写！如想直接看答案请点【直接揭晓】');
    return;
  }

  $('answer-panel').hidden = false;
  const isExactMatch = normalizedUser === normalizedAnswer;

  if (isExactMatch) {
    resultBadge.textContent = '🎉 完美匹配！与笔记原文完全一致！';
    resultBadge.className = 'match-badge exact';
    if (progress[current.id] !== 'passed') {
      progress[current.id] = 'passed';
      saveProgress();
      showToast('恭喜！已自动为你标记为【已掌握】✓');
    }
    setCompareView('original');
  } else {
    resultBadge.textContent = '⚠️ 存在差异，请查看下方逐行对照';
    resultBadge.className = 'match-badge diff';
    setCompareView('diff');
  }
}

// 切换答案查看模式：原文 vs 差异比对
function setCompareView(mode) {
  compareMode = mode;
  const originalView = $('original-view');
  const diffView = $('diff-view');
  const tabOriginal = $('tab-view-original');
  const tabDiff = $('tab-view-diff');

  if (mode === 'diff') {
    originalView.hidden = true;
    diffView.hidden = false;
    tabOriginal.classList.remove('active');
    tabDiff.classList.add('active');
    renderDiffRows();
  } else {
    originalView.hidden = false;
    diffView.hidden = true;
    tabOriginal.classList.add('active');
    tabDiff.classList.remove('active');
    updateBlurState();
  }
}

// 渲染逐行 Diff 表格
function renderDiffRows() {
  const current = getCurrentCard();
  if (!current) return;

  const userInput = $('answer-input').value;
  const diffRows = computeDiff(userInput, current.answer);
  const container = $('diff-table-body');
  container.innerHTML = '';

  diffRows.forEach((row, i) => {
    const tr = document.createElement('tr');
    tr.className = `diff-row ${row.type}`;

    let statusText = '=';
    if (row.type === 'missing') statusText = '- 缺行';
    else if (row.type === 'extra') statusText = '+ 多余';
    else if (row.type === 'diff') statusText = '≠ 不符';
    else if (row.type === 'equal') statusText = '✓ 正确';

    tr.innerHTML = `
      <td class="diff-line-no">${i + 1}</td>
      <td class="diff-status"><span class="diff-tag ${row.type}">${statusText}</span></td>
      <td class="diff-user-cell"><code>${escapeHtml(row.actual || '(空)')}</code></td>
      <td class="diff-expected-cell"><code>${escapeHtml(row.expected || '(空)')}</code></td>
    `;
    container.appendChild(tr);
  });
}

// 事件监听绑定
function setupEventListeners() {
  const input = $('answer-input');

  // 输入监听
  input.addEventListener('input', updateLineNumbers);

  // 移动端快捷符号按钮点击插入
  document.querySelectorAll('.sym-key').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const toInsert = btn.getAttribute('data-insert');
      if (!toInsert) return;
      const start = input.selectionStart !== null ? input.selectionStart : input.value.length;
      const end = input.selectionEnd !== null ? input.selectionEnd : input.value.length;
      input.setRangeText(toInsert, start, end, 'end');
      input.focus();
      updateLineNumbers();
    });
  });

  // 滚动同步
  input.addEventListener('scroll', () => {
    $('line-numbers').scrollTop = input.scrollTop;
  });

  // Tab 键缩进 4 空格与 Shift+Tab 逆缩进
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = input.selectionStart;
      const end = input.selectionEnd;

      if (!e.shiftKey) {
        input.setRangeText('    ', start, end, 'end');
      } else {
        const before = input.value.substring(0, start);
        const match = before.match(/( {1,4})$/);
        if (match) {
          const cut = match[1].length;
          input.setRangeText('', start - cut, start, 'end');
        }
      }
      updateLineNumbers();
    }

    // Ctrl + Enter 快捷对照答案
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      checkAnswer();
    }
  });

  // 全局快捷键
  document.addEventListener('keydown', (e) => {
    if (e.target === input || e.target.tagName === 'INPUT') {
      return;
    }

    // Alt + Left 上一题
    if (e.altKey && e.key === 'ArrowLeft') {
      e.preventDefault();
      goToPrevCard();
    }

    // Alt + Right 下一题
    if (e.altKey && e.key === 'ArrowRight') {
      e.preventDefault();
      goToNextCard();
    }

    // Alt + 1 标记已掌握
    if (e.altKey && e.key === '1') {
      e.preventDefault();
      markCard('passed');
    }

    // Alt + 2 标记需复习
    if (e.altKey && e.key === '2') {
      e.preventDefault();
      markCard('review');
    }
  });

  // 搜索输入
  $('search-input').addEventListener('input', (e) => {
    searchQuery = e.target.value.trim();
    const filtered = getFilteredCards();
    if (!filtered.some(c => c.id === activeCardId)) {
      activeCardId = (filtered[0] && filtered[0].id) ? filtered[0].id : null;
    }
    renderAll();
  });

  // 提示显示与折叠
  $('toggle-hint-btn').addEventListener('click', () => {
    const hintBox = $('hint-box');
    const isHidden = hintBox.hidden;
    hintBox.hidden = !isHidden;
    $('toggle-hint-btn').textContent = isHidden ? '🙈 隐藏提示' : '💡 查看提示';
  });

  // 按钮交互
  $('reveal-btn').addEventListener('click', revealAnswer);
  $('check-btn').addEventListener('click', checkAnswer);

  $('tab-view-original').addEventListener('click', () => setCompareView('original'));
  $('tab-view-diff').addEventListener('click', () => setCompareView('diff'));

  const blurBtn = $('toggle-blur-btn');
  if (blurBtn) {
    blurBtn.addEventListener('click', () => {
      isBlurProtected = !isBlurProtected;
      updateBlurState();
      showToast(isBlurProtected ? '已开启防偷看模糊（鼠标悬停即可查看）' : '已关闭防偷看模糊');
    });
  }

  // 复制答案（兼容移动端沙箱与非安全协议）
  const copyBtn = $('copy-answer-btn');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const current = getCurrentCard();
      if (!current) return;
      if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
        navigator.clipboard.writeText(current.answer)
          .then(() => showToast('答案已成功复制到剪贴板！'))
          .catch(() => fallbackCopy(current.answer));
      } else {
        fallbackCopy(current.answer);
      }
    });
  }

  // 清空输入框
  $('clear-input-btn').addEventListener('click', () => {
    input.value = '';
    updateLineNumbers();
    input.focus();
    hideAnswerPanel();
    showToast('已清空当前输入');
  });

  // 填入答案（供快速学习临摹）
  $('fill-answer-btn').addEventListener('click', () => {
    const current = getCurrentCard();
    if (!current) return;
    input.value = current.answer;
    updateLineNumbers();
    showToast('已将原文标准代码填入编辑区');
  });

  // 标记状态
  $('mark-passed').addEventListener('click', () => markCard('passed'));
  $('mark-review').addEventListener('click', () => markCard('review'));
  $('mark-unattempted').addEventListener('click', () => markCard('unattempted'));

  // 上下题导航
  $('prev-card-btn').addEventListener('click', goToPrevCard);
  $('next-card-btn').addEventListener('click', goToNextCard);

  // 移动端底部吸底便捷栏
  const mobPrev = $('mobile-prev-btn');
  if (mobPrev) mobPrev.addEventListener('click', goToPrevCard);

  const mobNext = $('mobile-next-btn');
  if (mobNext) mobNext.addEventListener('click', goToNextCard);

  const mobReveal = $('mobile-reveal-btn');
  if (mobReveal) mobReveal.addEventListener('click', revealAnswer);

  // 移动端卡片列表点击折叠/展开
  const cardListPanel = document.querySelector('.card-list-panel');
  const cardListHeader = document.querySelector('.card-list-panel .panel-header');
  if (cardListHeader && cardListPanel) {
    cardListHeader.addEventListener('click', () => {
      cardListPanel.classList.toggle('expanded');
    });
  }

  // 滑动手势支持（在题目卡片区域左右滑动切题）
  setupSwipeGestures();

  // 随机抽题
  $('random-card-btn').addEventListener('click', () => {
    const filtered = getFilteredCards();
    if (filtered.length <= 1) {
      showToast('当前筛选条件下卡片不足以随机切换');
      return;
    }
    let next;
    do {
      next = filtered[Math.floor(Math.random() * filtered.length)];
    } while (next.id === activeCardId);
    activeCardId = next.id;
    renderAll();
    showToast(`已随机切换到第 ${filtered.findIndex(c => c.id === next.id) + 1} 题`);
  });

  // 清空所有进度
  $('reset-progress-btn').addEventListener('click', () => {
    if (Object.keys(progress).length === 0) {
      showToast('目前尚无任何练习进度记录');
      return;
    }
    if (confirm('确定要清空所有练习进度吗？此操作无法撤销。')) {
      progress = {};
      saveProgress();
      renderAll();
      showToast('所有练习进度已重置');
    }
  });
}

function markCard(status) {
  const current = getCurrentCard();
  if (!current) return;

  if (status === 'unattempted') {
    delete progress[current.id];
    showToast('已重置该题状态为【未作答】');
  } else if (status === 'passed') {
    progress[current.id] = 'passed';
    showToast('已标记为【已掌握】✓');
  } else if (status === 'review') {
    progress[current.id] = 'review';
    showToast('已加入【需复习】清单 ↻');
  }

  saveProgress();
}

function scrollToActiveCard() {
  if (window.innerWidth <= 850) {
    const target = $('question-title') || $('practice-workspace');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}

function goToPrevCard() {
  const filtered = getFilteredCards();
  const current = getCurrentCard();
  const index = current ? filtered.findIndex(c => c.id === current.id) : -1;
  if (index > 0) {
    activeCardId = filtered[index - 1].id;
    renderAll();
    scrollToActiveCard();
    showToast(`已切至第 ${index} / ${filtered.length} 题`);
  } else {
    showToast('已经是第一题了');
  }
}

function goToNextCard() {
  const filtered = getFilteredCards();
  const current = getCurrentCard();
  const index = current ? filtered.findIndex(c => c.id === current.id) : -1;
  if (index >= 0 && index < filtered.length - 1) {
    activeCardId = filtered[index + 1].id;
    renderAll();
    scrollToActiveCard();
    showToast(`已切至第 ${index + 2} / ${filtered.length} 题`);
  } else {
    showToast('已经是最后一题了！');
  }
}

// 触摸滑动手势支持（手指向左滑=下一题，向右滑=上一题）
function setupSwipeGestures() {
  const target = $('practice-workspace');
  if (!target) return;

  let startX = 0;
  let startY = 0;

  target.addEventListener('touchstart', (e) => {
    // 忽略在输入框、快捷符号栏或卡片列表内部的触摸滑动
    if (e.target.tagName === 'TEXTAREA' || e.target.closest('.mobile-symbols-bar') || e.target.closest('.card-items-wrap')) {
      return;
    }
    startX = e.changedTouches[0].clientX;
    startY = e.changedTouches[0].clientY;
  }, { passive: true });

  target.addEventListener('touchend', (e) => {
    if (e.target.tagName === 'TEXTAREA' || e.target.closest('.mobile-symbols-bar') || e.target.closest('.card-items-wrap')) {
      return;
    }
    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;
    const diffX = endX - startX;
    const diffY = endY - startY;

    // 水平滑动距离大于 45px 且横向幅度明显大于纵向幅度
    if (Math.abs(diffX) > 45 && Math.abs(diffX) > Math.abs(diffY) * 1.4) {
      if (diffX < -45) {
        goToNextCard(); // 左滑下一题
      } else if (diffX > 45) {
        goToPrevCard(); // 右滑上一题
      }
    }
  }, { passive: true });
}

// 多重保障初始化启动流程（兼容移动端本地文件、WebViews 与极速缓存加载）
let isAppInitialized = false;

function bootApplication() {
  if (isAppInitialized) return;

  // 1. 优先立刻渲染界面数据（即使任何监听器失败，题目必须立即可见）
  try {
    renderAll();
    isAppInitialized = true;
  } catch (err) {
    console.error('界面渲染异常:', err);
  }

  // 2. 绑定交互事件监听
  try {
    setupEventListeners();
  } catch (err) {
    console.error('事件绑定异常:', err);
  }
}

// 兼容各种加载阶段：如果已解析完成直接启动
if (document.readyState === 'interactive' || document.readyState === 'complete') {
  bootApplication();
} else {
  document.addEventListener('DOMContentLoaded', bootApplication);
  window.addEventListener('load', bootApplication);
}

// 同步立即触发一次（针对脚本位于页面底部的极速加载场景）
try {
  bootApplication();
} catch (e) {
  console.error('同步启动异常:', e);
}

// 定时兜底（防止任何微任务或环境阻塞）
setTimeout(function() {
  if (!isAppInitialized) {
    bootApplication();
  }
}, 50);

