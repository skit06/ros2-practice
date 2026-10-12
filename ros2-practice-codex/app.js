const modules = [
  { id: 'all', name: '全部练习', icon: '✦' },
  { id: 'python', name: 'Python 节点基础', icon: 'Py' },
  { id: 'oop', name: '面向对象模板', icon: '◇' },
  { id: 'topics', name: '话题发布 / 订阅', icon: '◎' },
  { id: 'cli', name: '话题排查命令', icon: '⌘' },
  { id: 'py-workspace', name: 'Python 功能包流程', icon: '▦' },
  { id: 'cpp', name: 'C++ 节点基础', icon: 'C+' },
  { id: 'cpp-workspace', name: 'C++ 功能包流程', icon: '▦' },
];

const cardData = [
  { id:'pkg-python',module:'py-workspace',title:'创建 Python 功能包',question:'写出创建 ament_python 功能包的命令，包名使用 demo_python_pkg。',hint:'在工作空间根目录执行。记得加上构建类型与许可证参数。',answer:'ros2 pkg create demo_python_pkg --build-type ament_python --license Apache-2.0',source:'Python功能包五步流程笔记.docx',note:'包源码放在内层同名文件夹中。'},
  { id:'pkg-cpp',module:'cpp-workspace',title:'创建 C++ 功能包',question:'写出创建 ament_cmake 功能包的命令，包名使用 demo_cpp_pkg。',hint:'注意 C++ 包的构建类型是 ament_cmake。',answer:'ros2 pkg create demo_cpp_pkg --build-type ament_cmake --license Apache-2.0',source:'C++功能包五步流程笔记.docx',note:'C++ 节点源码放在功能包的 src/ 目录中。'},
  { id:'colcon',module:'py-workspace',title:'构建工作空间',question:'写出从工作空间根目录构建所有 ROS 2 功能包的命令。',hint:'笔记中也提到 Python 开发时常用的软链接安装选项。',answer:'colcon build',source:'Python功能包五步流程笔记.docx',note:'可选开发命令：colcon build --symlink-install。'},
  { id:'source-run',module:'py-workspace',title:'激活环境并运行节点',question:'写出激活当前工作空间并运行 Python 节点的两条命令。包名 demo_python_pkg，节点别名 python_node。',hint:'先 source，再 ros2 run。',answer:'source install/setup.bash\nros2 run demo_python_pkg python_node',source:'Python功能包五步流程笔记.docx',note:'每个新终端都需要重新 source 当前工作空间。'},
  { id:'ros2-run',module:'cli',title:'运行功能包节点',question:'写出 ROS 2 运行命令的通用格式。',hint:'依次填写功能包名与注册的节点别名。',answer:'ros2 run <功能包名> <节点别名>',source:'ROS2话题通信速记笔记.docx',note:'Python 的节点别名在 setup.py 注册；C++ 的程序名来自 CMakeLists.txt。'},
  { id:'topic-list',module:'cli',title:'列出所有话题',question:'写出列出当前 ROS 2 系统中所有话题的命令。',hint:'使用 ros2 topic 子命令。',answer:'ros2 topic list',source:'ROS2话题通信速记笔记.docx'},
  { id:'topic-echo',module:'cli',title:'监听话题内容',question:'写出监听 /chatter 话题消息的命令。',hint:'echo 会持续显示收到的消息。',answer:'ros2 topic echo /chatter',source:'ROS2话题通信速记笔记.docx'},
  { id:'topic-info',module:'cli',title:'查看话题类型和状态',question:'写出查看 /chatter 话题信息的命令。',hint:'该命令可以查看话题状态与消息类型。',answer:'ros2 topic info /chatter',source:'ROS2话题通信速记笔记.docx'},
  { id:'rqt-graph',module:'cli',title:'查看通信拓扑',question:'写出打开 ROS 2 节点通信拓扑图的命令。',hint:'这是一个独立的图形工具命令。',answer:'rqt_graph',source:'ROS2话题通信速记笔记.docx'},
  { id:'python-main',module:'python',title:'Python 节点四步骨架',question:'默写最小 Python ROS 2 节点：初始化、创建节点、spin 等待、关闭。',hint:'请补上 rclpy 与 Node 导入，以及 main() 入口。',answer:'import rclpy\nfrom rclpy.node import Node\n\ndef main():\n    rclpy.init()\n    node = Node("python_node")\n    rclpy.spin(node)\n    rclpy.shutdown()\n\nif __name__ == "__main__":\n    main()',source:'ROS2笔记.docx',note:'话题笔记中的标准节点外壳也包含 class MyNode(Node) 与 super().__init__(...)。'},
  { id:'python-pubsub',module:'topics',title:'话题发布者回调',question:'写出 String 话题发布者的定时回调：构造消息、设置 data 并发布。',hint:'假设 self.pub 已创建，消息类 String 已导入。',answer:"def timer_callback(self):\n    msg = String()\n    msg.data = '要发的内容'\n    self.pub.publish(msg)",source:'ROS2话题通信速记笔记.docx'},
  { id:'publisher-create',module:'topics',title:'创建发布者与定时器',question:'写出创建 String 发布者和 1 秒定时器的两行代码，话题名为 topic_name。',hint:'回调函数名作为参数传入时不加括号。',answer:'self.pub = self.create_publisher(String, \'topic_name\', 10)\nself.timer = self.create_timer(1.0, self.timer_callback)',source:'ROS2话题通信速记笔记.docx',note:'队列深度设为 10。timer_callback 是函数引用，因此没有括号。'},
  { id:'subscriber-create',module:'topics',title:'创建订阅者',question:'写出创建 String 订阅者的代码，订阅 topic_name，回调名为 sub_callback，队列深度为 10。',hint:'传递回调函数名，不要加括号。',answer:'self.sub = self.create_subscription(\n    String, \'topic_name\', self.sub_callback, 10\n)',source:'ROS2话题通信速记笔记.docx'},
  { id:'subscriber-callback',module:'topics',title:'订阅者回调',question:'写出订阅者回调：接收 msg，从 .data 取出内容并用日志输出“收到: 内容”。',hint:'回调需要 msg 形参。',answer:"def sub_callback(self, msg):\n    data = msg.data\n    self.get_logger().info(f'收到: {data}')",source:'ROS2话题通信速记笔记.docx'},
  { id:'cpp-main',module:'cpp',title:'C++ 节点四步骨架',question:'默写最小 C++ ROS 2 节点：初始化、创建共享节点、spin、关闭。',hint:'包含头文件与 main 函数，节点名使用 cpp_node。',answer:'#include "rclcpp/rclcpp.hpp"\n\nint main(int argc, char **argv)\n{\n    rclcpp::init(argc, argv);\n    auto node = std::make_shared<rclcpp::Node>("cpp_node");\n    rclcpp::spin(node);\n    rclcpp::shutdown();\n    return 0;\n}',source:'C++ROS2节点骨架笔记.docx',note:'笔记还示范了 RCLCPP_INFO(node->get_logger(), "节点启动成功！"); 日志。'},
  { id:'cmake',module:'cpp-workspace',title:'CMake 注册 C++ 节点',question:'写出 CMakeLists.txt 中查找 rclcpp、声明 cpp_node 可执行文件并绑定依赖的三条指令。',hint:'源码路径为 src/cpp_node.cpp。',answer:'find_package(rclcpp REQUIRED)\nadd_executable(cpp_node src/cpp_node.cpp)\nament_target_dependencies(cpp_node rclcpp)',source:'C++功能包五步流程笔记.docx',note:'还需添加 install(TARGETS cpp_node DESTINATION lib/${PROJECT_NAME}) 才能通过 ros2 run 找到程序。'},
  { id:'oop-init',module:'oop',title:'继承 Node 并初始化父类',question:'写出 MyNode 类继承官方 Node，并在初始化第一步调用父类初始化，节点名为 my_node。',hint:'注意 super().__init__(...) 必须在 __init__ 的开头。',answer:'class MyNode(Node):\n    def __init__(self):\n        super().__init__("my_node")',source:'面向对象与ROS2节点模板笔记.docx'},
  { id:'oop-template',module:'oop',title:'面向对象节点通用模板',question:'默写 ROS 2 Python 类节点模板：导入、继承 Node、super 初始化、main 生命周期。',hint:'在主函数中依次 init、实例化、spin、shutdown。',answer:'import rclpy\nfrom rclpy.node import Node\n\nclass MyRobotNode(Node):\n    def __init__(self, node_name: str):\n        super().__init__(node_name)\n        self.count = 0\n\ndef main():\n    rclpy.init()\n    node = MyRobotNode("my_node")\n    rclpy.spin(node)\n    rclpy.shutdown()',source:'面向对象与ROS2节点模板笔记.docx',note:'课堂笔记中的完整模板还包含日志打印与 do_work() 方法。'},
];

const learningOrder = ['python-main','oop-init','oop-template','publisher-create','python-pubsub','subscriber-create','subscriber-callback','topic-list','topic-echo','topic-info','rqt-graph','pkg-python','colcon','source-run','ros2-run','cpp-main','pkg-cpp','cmake'];
const cards = learningOrder.map(id => cardData.find(card => card.id === id)).filter(Boolean);

const STORAGE_KEY = 'ros2-practice-progress-v1';
let progress = readProgress();
let activeModule = 'all';
let activeCardId = cards[0].id;
let query = '';
let toastTimer;
const $ = (id) => document.getElementById(id);
function readProgress(){try{return JSON.parse(localStorage.getItem(STORAGE_KEY)||'{}')}catch{return {}}}
function saveProgress(){localStorage.setItem(STORAGE_KEY,JSON.stringify(progress));renderProgress();renderCards()}
function filteredCards(){return cards.filter(c=>(activeModule==='all'||c.module===activeModule)&&(!query||`${c.title} ${c.question} ${c.answer} ${c.source}`.toLowerCase().includes(query.toLowerCase())))}
function renderCategories(){const root=$('categories');root.innerHTML='';modules.forEach(m=>{const count=m.id==='all'?cards.length:cards.filter(c=>c.module===m.id).length;const b=document.createElement('button');b.className=`category-button${activeModule===m.id?' active':''}`;b.type='button';b.innerHTML=`<span class="cat-icon">${m.icon}</span><span>${m.name}</span><span class="cat-count">${count}</span>`;b.addEventListener('click',()=>{activeModule=m.id;const next=filteredCards();if(!next.some(c=>c.id===activeCardId))activeCardId=next[0]?.id||null;renderAll()});root.append(b)})}
function renderCards(){const list=$('card-list'),items=filteredCards();$('card-count').textContent=`${items.length} 题`;list.innerHTML='';if(!items.length){list.innerHTML='<div class="empty-state">没有找到匹配的练习卡片</div>';return}items.forEach((c,i)=>{const b=document.createElement('button');b.type='button';b.className=`practice-card${c.id===activeCardId?' active':''}`;const status=progress[c.id];b.innerHTML=`<span class="practice-card-title">${escapeHtml(c.title)}</span><span class="practice-card-meta"><span>练习 ${String(i+1).padStart(2,'0')}</span><span class="status-mini ${status||''}">${status==='passed'?'✓ 已掌握':status==='review'?'↻ 需复习':''}</span></span>`;b.addEventListener('click',()=>{activeCardId=c.id;renderAll()});list.append(b)})}
function renderQuestion(){const item=cards.find(c=>c.id===activeCardId&&filteredCards().some(f=>f.id===c.id));if(!item){$('question').textContent='当前筛选下没有练习卡片';$('hint').textContent='试试清除搜索或选择其他模块。';$('answer-input').value='';$('answer-panel').hidden=true;return}const mod=modules.find(m=>m.id===item.module);$('card-category').textContent=mod.name;$('card-source').textContent=item.source;$('card-position').textContent=`${String(filteredCards().findIndex(c=>c.id===item.id)+1).padStart(2,'0')} / ${String(filteredCards().length).padStart(2,'0')}`;$('question').textContent=item.question;$('hint').textContent=item.hint||'';$('answer-input').value='';$('match-result').textContent='';$('match-result').className='';$('answer-panel').hidden=true;$('original-answer').textContent=item.answer;$('answer-note').textContent=item.note||'';$('mark-passed').classList.toggle('selected',progress[item.id]==='passed');$('mark-review').classList.toggle('selected',progress[item.id]==='review');updateLines()}
function renderProgress(){const passed=Object.values(progress).filter(x=>x==='passed').length,review=Object.values(progress).filter(x=>x==='review').length,done=passed+review;$('passed-count').textContent=passed;$('review-count').textContent=review;$('progress-count').textContent=`${done} / ${cards.length}`;$('progress-bar').style.width=`${Math.min(100,done/cards.length*100)}%`}
function renderSequenceNav(){const items=filteredCards(),index=items.findIndex(c=>c.id===activeCardId);$('previous-card').disabled=index<=0;$('next-card').disabled=index<0||index>=items.length-1;$('sequence-hint').textContent=index<0?'暂无练习':`学习顺序 ${String(index+1).padStart(2,'0')} / ${String(items.length).padStart(2,'0')}`}
function renderAll(){renderCategories();renderCards();renderQuestion();renderSequenceNav();const m=modules.find(x=>x.id===activeModule);$('module-name').textContent=m.name;$('module-icon').textContent=m.icon;$('module-subtitle').textContent=activeModule==='all'?'按学习顺序，从基础开始':`${filteredCards().length} 张卡片 · 按顺序练习`}
function escapeHtml(s){return s.replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]))}
function updateLines(){const lines=Math.max(1,$('answer-input').value.split('\n').length);$('line-numbers').textContent=Array.from({length:lines},(_,i)=>i+1).join('\n')}
function showToast(message){const t=$('toast');t.textContent=message;t.classList.add('visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>t.classList.remove('visible'),1800)}
function normalize(s){return s.replace(/\r/g,'').trim().split('\n').map(line=>line.trimEnd()).join('\n').trim()}
$('answer-input').addEventListener('input',updateLines);
$('answer-input').addEventListener('scroll',()=>{$('line-numbers').scrollTop=$('answer-input').scrollTop});
$('answer-input').addEventListener('keydown',e=>{if(e.key==='Tab'){e.preventDefault();const el=e.currentTarget,start=el.selectionStart,end=el.selectionEnd;el.setRangeText('    ',start,end,'end');updateLines()}});
$('search').addEventListener('input',e=>{query=e.target.value;const items=filteredCards();if(!items.some(c=>c.id===activeCardId))activeCardId=items[0]?.id||null;renderAll()});
$('reveal').addEventListener('click',()=>{$('answer-panel').hidden=false});
$('check').addEventListener('click',()=>{const item=cards.find(c=>c.id===activeCardId);if(!item)return;const result=$('match-result');if(!normalize($('answer-input').value)){result.textContent='先写一些内容再对照答案';result.className='bad';return}const same=normalize($('answer-input').value)===normalize(item.answer);result.textContent=same?'完全匹配，写得很准确！':'有差异，可以展开原文逐行检查';result.className=same?'good':'bad';$('answer-panel').hidden=false});
$('copy-answer').addEventListener('click',async()=>{try{await navigator.clipboard.writeText($('original-answer').textContent);showToast('答案已复制')}catch{showToast('复制失败，请手动选择文本')}});
$('mark-passed').addEventListener('click',()=>{if(activeCardId){progress[activeCardId]='passed';saveProgress();showToast('已标记为掌握')}});
$('mark-review').addEventListener('click',()=>{if(activeCardId){progress[activeCardId]='review';saveProgress();showToast('已加入复习列表')}});
$('previous-card').addEventListener('click',()=>{const items=filteredCards(),index=items.findIndex(c=>c.id===activeCardId);if(index>0){activeCardId=items[index-1].id;renderAll()}});
$('next-card').addEventListener('click',()=>{const items=filteredCards(),index=items.findIndex(c=>c.id===activeCardId);if(index>=0&&index<items.length-1){activeCardId=items[index+1].id;renderAll()}});
$('reset-progress').addEventListener('click',()=>{if(!Object.keys(progress).length){showToast('目前还没有练习进度');return}if(confirm('确定清空所有练习进度吗？')){progress={};saveProgress();renderAll();showToast('练习进度已清空')}});
renderAll();renderProgress();
