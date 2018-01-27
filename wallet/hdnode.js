// See: https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki
// See: https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki

var secp256k1 = new (require('elliptic')).ec('secp256k1');

var wordlist = (function() {
    var words = [
"的", "一", "是", "在", "不", "了", "有", "和", "人", "这",
"中", "大", "为", "上", "个", "国", "我", "以", "要", "他",
"时", "来", "用", "们", "生", "到", "作", "地", "于", "出",
"就", "分", "对", "成", "会", "可", "主", "发", "年", "动",
"同", "工", "也", "能", "下", "过", "子", "说", "产", "种",
"面", "而", "方", "后", "多", "定", "行", "学", "法", "所",
"民", "得", "经", "十", "三", "之", "进", "着", "等", "部",
"度", "家", "电", "力", "里", "如", "水", "化", "高", "自",
"二", "理", "起", "小", "物", "现", "实", "加", "量", "都",
"两", "体", "制", "机", "当", "使", "点", "从", "业", "本",
"去", "把", "性", "好", "应", "开", "它", "合", "还", "因",
"由", "其", "些", "然", "前", "外", "天", "政", "四", "日",
"那", "社", "义", "事", "平", "形", "相", "全", "表", "间",
"样", "与", "关", "各", "重", "新", "线", "内", "数", "正",
"心", "反", "你", "明", "看", "原", "又", "么", "利", "比",
"或", "但", "质", "气", "第", "向", "道", "命", "此", "变",
"条", "只", "没", "结", "解", "问", "意", "建", "月", "公",
"无", "系", "军", "很", "情", "者", "最", "立", "代", "想",
"已", "通", "并", "提", "直", "题", "党", "程", "展", "五",
"果", "料", "象", "员", "革", "位", "入", "常", "文", "总",
"次", "品", "式", "活", "设", "及", "管", "特", "件", "长",
"求", "老", "头", "基", "资", "边", "流", "路", "级", "少",
"图", "山", "统", "接", "知", "较", "将", "组", "见", "计",
"别", "她", "手", "角", "期", "根", "论", "运", "农", "指",
"几", "九", "区", "强", "放", "决", "西", "被", "干", "做",
"必", "战", "先", "回", "则", "任", "取", "据", "处", "队",
"南", "给", "色", "光", "门", "即", "保", "治", "北", "造",
"百", "规", "热", "领", "七", "海", "口", "东", "导", "器",
"压", "志", "世", "金", "增", "争", "济", "阶", "油", "思",
"术", "极", "交", "受", "联", "什", "认", "六", "共", "权",
"收", "证", "改", "清", "美", "再", "采", "转", "更", "单",
"风", "切", "打", "白", "教", "速", "花", "带", "安", "场",
"身", "车", "例", "真", "务", "具", "万", "每", "目", "至",
"达", "走", "积", "示", "议", "声", "报", "斗", "完", "类",
"八", "离", "华", "名", "确", "才", "科", "张", "信", "马",
"节", "话", "米", "整", "空", "元", "况", "今", "集", "温",
"传", "土", "许", "步", "群", "广", "石", "记", "需", "段",
"研", "界", "拉", "林", "律", "叫", "且", "究", "观", "越",
"织", "装", "影", "算", "低", "持", "音", "众", "书", "布",
"复", "容", "儿", "须", "际", "商", "非", "验", "连", "断",
"深", "难", "近", "矿", "千", "周", "委", "素", "技", "备",
"半", "办", "青", "省", "列", "习", "响", "约", "支", "般",
"史", "感", "劳", "便", "团", "往", "酸", "历", "市", "克",
"何", "除", "消", "构", "府", "称", "太", "准", "精", "值",
"号", "率", "族", "维", "划", "选", "标", "写", "存", "候",
"毛", "亲", "快", "效", "斯", "院", "查", "江", "型", "眼",
"王", "按", "格", "养", "易", "置", "派", "层", "片", "始",
"却", "专", "状", "育", "厂", "京", "识", "适", "属", "圆",
"包", "火", "住", "调", "满", "县", "局", "照", "参", "红",
"细", "引", "听", "该", "铁", "价", "严", "首", "底", "液",
"官", "德", "随", "病", "苏", "失", "尔", "死", "讲", "配",
"女", "黄", "推", "显", "谈", "罪", "神", "艺", "呢", "席",
"含", "企", "望", "密", "批", "营", "项", "防", "举", "球",
"英", "氧", "势", "告", "李", "台", "落", "木", "帮", "轮",
"破", "亚", "师", "围", "注", "远", "字", "材", "排", "供",
"河", "态", "封", "另", "施", "减", "树", "溶", "怎", "止",
"案", "言", "士", "均", "武", "固", "叶", "鱼", "波", "视",
"仅", "费", "紧", "爱", "左", "章", "早", "朝", "害", "续",
"轻", "服", "试", "食", "充", "兵", "源", "判", "护", "司",
"足", "某", "练", "差", "致", "板", "田", "降", "黑", "犯",
"负", "击", "范", "继", "兴", "似", "余", "坚", "曲", "输",
"修", "故", "城", "夫", "够", "送", "笔", "船", "占", "右",
"财", "吃", "富", "春", "职", "觉", "汉", "画", "功", "巴",
"跟", "虽", "杂", "飞", "检", "吸", "助", "升", "阳", "互",
"初", "创", "抗", "考", "投", "坏", "策", "古", "径", "换",
"未", "跑", "留", "钢", "曾", "端", "责", "站", "简", "述",
"钱", "副", "尽", "帝", "射", "草", "冲", "承", "独", "令",
"限", "阿", "宣", "环", "双", "请", "超", "微", "让", "控",
"州", "良", "轴", "找", "否", "纪", "益", "依", "优", "顶",
"础", "载", "倒", "房", "突", "坐", "粉", "敌", "略", "客",
"袁", "冷", "胜", "绝", "析", "块", "剂", "测", "丝", "协",
"诉", "念", "陈", "仍", "罗", "盐", "友", "洋", "错", "苦",
"夜", "刑", "移", "频", "逐", "靠", "混", "母", "短", "皮",
"终", "聚", "汽", "村", "云", "哪", "既", "距", "卫", "停",
"烈", "央", "察", "烧", "迅", "境", "若", "印", "洲", "刻",
"括", "激", "孔", "搞", "甚", "室", "待", "核", "校", "散",
"侵", "吧", "甲", "游", "久", "菜", "味", "旧", "模", "湖",
"货", "损", "预", "阻", "毫", "普", "稳", "乙", "妈", "植",
"息", "扩", "银", "语", "挥", "酒", "守", "拿", "序", "纸",
"医", "缺", "雨", "吗", "针", "刘", "啊", "急", "唱", "误",
"训", "愿", "审", "附", "获", "茶", "鲜", "粮", "斤", "孩",
"脱", "硫", "肥", "善", "龙", "演", "父", "渐", "血", "欢",
"械", "掌", "歌", "沙", "刚", "攻", "谓", "盾", "讨", "晚",
"粒", "乱", "燃", "矛", "乎", "杀", "药", "宁", "鲁", "贵",
"钟", "煤", "读", "班", "伯", "香", "介", "迫", "句", "丰",
"培", "握", "兰", "担", "弦", "蛋", "沉", "假", "穿", "执",
"答", "乐", "谁", "顺", "烟", "缩", "征", "脸", "喜", "松",
"脚", "困", "异", "免", "背", "星", "福", "买", "染", "井",
"概", "慢", "怕", "磁", "倍", "祖", "皇", "促", "静", "补",
"评", "翻", "肉", "践", "尼", "衣", "宽", "扬", "棉", "希",
"伤", "操", "垂", "秋", "宜", "氢", "套", "督", "振", "架",
"亮", "末", "宪", "庆", "编", "牛", "触", "映", "雷", "销",
"诗", "座", "居", "抓", "裂", "胞", "呼", "娘", "景", "威",
"绿", "晶", "厚", "盟", "衡", "鸡", "孙", "延", "危", "胶",
"屋", "乡", "临", "陆", "顾", "掉", "呀", "灯", "岁", "措",
"束", "耐", "剧", "玉", "赵", "跳", "哥", "季", "课", "凯",
"胡", "额", "款", "绍", "卷", "齐", "伟", "蒸", "殖", "永",
"宗", "苗", "川", "炉", "岩", "弱", "零", "杨", "奏", "沿",
"露", "杆", "探", "滑", "镇", "饭", "浓", "航", "怀", "赶",
"库", "夺", "伊", "灵", "税", "途", "灭", "赛", "归", "召",
"鼓", "播", "盘", "裁", "险", "康", "唯", "录", "菌", "纯",
"借", "糖", "盖", "横", "符", "私", "努", "堂", "域", "枪",
"润", "幅", "哈", "竟", "熟", "虫", "泽", "脑", "壤", "碳",
"欧", "遍", "侧", "寨", "敢", "彻", "虑", "斜", "薄", "庭",
"纳", "弹", "饲", "伸", "折", "麦", "湿", "暗", "荷", "瓦",
"塞", "床", "筑", "恶", "户", "访", "塔", "奇", "透", "梁",
"刀", "旋", "迹", "卡", "氯", "遇", "份", "毒", "泥", "退",
"洗", "摆", "灰", "彩", "卖", "耗", "夏", "择", "忙", "铜",
"献", "硬", "予", "繁", "圈", "雪", "函", "亦", "抽", "篇",
"阵", "阴", "丁", "尺", "追", "堆", "雄", "迎", "泛", "爸",
"楼", "避", "谋", "吨", "野", "猪", "旗", "累", "偏", "典",
"馆", "索", "秦", "脂", "潮", "爷", "豆", "忽", "托", "惊",
"塑", "遗", "愈", "朱", "替", "纤", "粗", "倾", "尚", "痛",
"楚", "谢", "奋", "购", "磨", "君", "池", "旁", "碎", "骨",
"监", "捕", "弟", "暴", "割", "贯", "殊", "释", "词", "亡",
"壁", "顿", "宝", "午", "尘", "闻", "揭", "炮", "残", "冬",
"桥", "妇", "警", "综", "招", "吴", "付", "浮", "遭", "徐",
"您", "摇", "谷", "赞", "箱", "隔", "订", "男", "吹", "园",
"纷", "唐", "败", "宋", "玻", "巨", "耕", "坦", "荣", "闭",
"湾", "键", "凡", "驻", "锅", "救", "恩", "剥", "凝", "碱",
"齿", "截", "炼", "麻", "纺", "禁", "废", "盛", "版", "缓",
"净", "睛", "昌", "婚", "涉", "筒", "嘴", "插", "岸", "朗",
"庄", "街", "藏", "姑", "贸", "腐", "奴", "啦", "惯", "乘",
"伙", "恢", "匀", "纱", "扎", "辩", "耳", "彪", "臣", "亿",
"璃", "抵", "脉", "秀", "萨", "俄", "网", "舞", "店", "喷",
"纵", "寸", "汗", "挂", "洪", "贺", "闪", "柬", "爆", "烯",
"津", "稻", "墙", "软", "勇", "像", "滚", "厘", "蒙", "芳",
"肯", "坡", "柱", "荡", "腿", "仪", "旅", "尾", "轧", "冰",
"贡", "登", "黎", "削", "钻", "勒", "逃", "障", "氨", "郭",
"峰", "币", "港", "伏", "轨", "亩", "毕", "擦", "莫", "刺",
"浪", "秘", "援", "株", "健", "售", "股", "岛", "甘", "泡",
"睡", "童", "铸", "汤", "阀", "休", "汇", "舍", "牧", "绕",
"炸", "哲", "磷", "绩", "朋", "淡", "尖", "启", "陷", "柴",
"呈", "徒", "颜", "泪", "稍", "忘", "泵", "蓝", "拖", "洞",
"授", "镜", "辛", "壮", "锋", "贫", "虚", "弯", "摩", "泰",
"幼", "廷", "尊", "窗", "纲", "弄", "隶", "疑", "氏", "宫",
"姐", "震", "瑞", "怪", "尤", "琴", "循", "描", "膜", "违",
"夹", "腰", "缘", "珠", "穷", "森", "枝", "竹", "沟", "催",
"绳", "忆", "邦", "剩", "幸", "浆", "栏", "拥", "牙", "贮",
"礼", "滤", "钠", "纹", "罢", "拍", "咱", "喊", "袖", "埃",
"勤", "罚", "焦", "潜", "伍", "墨", "欲", "缝", "姓", "刊",
"饱", "仿", "奖", "铝", "鬼", "丽", "跨", "默", "挖", "链",
"扫", "喝", "袋", "炭", "污", "幕", "诸", "弧", "励", "梅",
"奶", "洁", "灾", "舟", "鉴", "苯", "讼", "抱", "毁", "懂",
"寒", "智", "埔", "寄", "届", "跃", "渡", "挑", "丹", "艰",
"贝", "碰", "拔", "爹", "戴", "码", "梦", "芽", "熔", "赤",
"渔", "哭", "敬", "颗", "奔", "铅", "仲", "虎", "稀", "妹",
"乏", "珍", "申", "桌", "遵", "允", "隆", "螺", "仓", "魏",
"锐", "晓", "氮", "兼", "隐", "碍", "赫", "拨", "忠", "肃",
"缸", "牵", "抢", "博", "巧", "壳", "兄", "杜", "讯", "诚",
"碧", "祥", "柯", "页", "巡", "矩", "悲", "灌", "龄", "伦",
"票", "寻", "桂", "铺", "圣", "恐", "恰", "郑", "趣", "抬",
"荒", "腾", "贴", "柔", "滴", "猛", "阔", "辆", "妻", "填",
"撤", "储", "签", "闹", "扰", "紫", "砂", "递", "戏", "吊",
"陶", "伐", "喂", "疗", "瓶", "婆", "抚", "臂", "摸", "忍",
"虾", "蜡", "邻", "胸", "巩", "挤", "偶", "弃", "槽", "劲",
"乳", "邓", "吉", "仁", "烂", "砖", "租", "乌", "舰", "伴",
"瓜", "浅", "丙", "暂", "燥", "橡", "柳", "迷", "暖", "牌",
"秧", "胆", "详", "簧", "踏", "瓷", "谱", "呆", "宾", "糊",
"洛", "辉", "愤", "竞", "隙", "怒", "粘", "乃", "绪", "肩",
"籍", "敏", "涂", "熙", "皆", "侦", "悬", "掘", "享", "纠",
"醒", "狂", "锁", "淀", "恨", "牲", "霸", "爬", "赏", "逆",
"玩", "陵", "祝", "秒", "浙", "貌", "役", "彼", "悉", "鸭",
"趋", "凤", "晨", "畜", "辈", "秩", "卵", "署", "梯", "炎",
"滩", "棋", "驱", "筛", "峡", "冒", "啥", "寿", "译", "浸",
"泉", "帽", "迟", "硅", "疆", "贷", "漏", "稿", "冠", "嫩",
"胁", "芯", "牢", "叛", "蚀", "奥", "鸣", "岭", "羊", "凭",
"串", "塘", "绘", "酵", "融", "盆", "锡", "庙", "筹", "冻",
"辅", "摄", "袭", "筋", "拒", "僚", "旱", "钾", "鸟", "漆",
"沈", "眉", "疏", "添", "棒", "穗", "硝", "韩", "逼", "扭",
"侨", "凉", "挺", "碗", "栽", "炒", "杯", "患", "馏", "劝",
"豪", "辽", "勃", "鸿", "旦", "吏", "拜", "狗", "埋", "辊",
"掩", "饮", "搬", "骂", "辞", "勾", "扣", "估", "蒋", "绒",
"雾", "丈", "朵", "姆", "拟", "宇", "辑", "陕", "雕", "偿",
"蓄", "崇", "剪", "倡", "厅", "咬", "驶", "薯", "刷", "斥",
"番", "赋", "奉", "佛", "浇", "漫", "曼", "扇", "钙", "桃",
"扶", "仔", "返", "俗", "亏", "腔", "鞋", "棱", "覆", "框",
"悄", "叔", "撞", "骗", "勘", "旺", "沸", "孤", "吐", "孟",
"渠", "屈", "疾", "妙", "惜", "仰", "狠", "胀", "谐", "抛",
"霉", "桑", "岗", "嘛", "衰", "盗", "渗", "脏", "赖", "涌",
"甜", "曹", "阅", "肌", "哩", "厉", "烃", "纬", "毅", "昨",
"伪", "症", "煮", "叹", "钉", "搭", "茎", "笼", "酷", "偷",
"弓", "锥", "恒", "杰", "坑", "鼻", "翼", "纶", "叙", "狱",
"逮", "罐", "络", "棚", "抑", "膨", "蔬", "寺", "骤", "穆",
"冶", "枯", "册", "尸", "凸", "绅", "坯", "牺", "焰", "轰",
"欣", "晋", "瘦", "御", "锭", "锦", "丧", "旬", "锻", "垄",
"搜", "扑", "邀", "亭", "酯", "迈", "舒", "脆", "酶", "闲",
"忧", "酚", "顽", "羽", "涨", "卸", "仗", "陪", "辟", "惩",
"杭", "姚", "肚", "捉", "飘", "漂", "昆", "欺", "吾", "郎",
"烷", "汁", "呵", "饰", "萧", "雅", "邮", "迁", "燕", "撒",
"姻", "赴", "宴", "烦", "债", "帐", "斑", "铃", "旨", "醇",
"董", "饼", "雏", "姿", "拌", "傅", "腹", "妥", "揉", "贤",
"拆", "歪", "葡", "胺", "丢", "浩", "徽", "昂", "垫", "挡",
"览", "贪", "慰", "缴", "汪", "慌", "冯", "诺", "姜", "谊",
"凶", "劣", "诬", "耀", "昏", "躺", "盈", "骑", "乔", "溪",
"丛", "卢", "抹", "闷", "咨", "刮", "驾", "缆", "悟", "摘",
"铒", "掷", "颇", "幻", "柄", "惠", "惨", "佳", "仇", "腊",
"窝", "涤", "剑", "瞧", "堡", "泼", "葱", "罩", "霍", "捞",
"胎", "苍", "滨", "俩", "捅", "湘", "砍", "霞", "邵", "萄",
"疯", "淮", "遂", "熊", "粪", "烘", "宿", "档", "戈", "驳",
"嫂", "裕", "徙", "箭", "捐", "肠", "撑", "晒", "辨", "殿",
"莲", "摊", "搅", "酱", "屏", "疫", "哀", "蔡", "堵", "沫",
"皱", "畅", "叠", "阁", "莱", "敲", "辖", "钩", "痕", "坝",
"巷", "饿", "祸", "丘", "玄", "溜", "曰", "逻", "彭", "尝",
"卿", "妨", "艇", "吞", "韦", "怨", "矮", "歇" ]
})();

var utils = (function() {
    var convert = require('ethers-utils/convert.js');

    var sha2 = require('ethers-utils/sha2');

    var hmac = require('ethers-utils/hmac');

    return {
        defineProperty: require('ethers-utils/properties.js').defineProperty,

        arrayify: convert.arrayify,
        bigNumberify: require('ethers-utils/bignumber.js').bigNumberify,
        hexlify: convert.hexlify,

        toUtf8Bytes: require('ethers-utils/utf8.js').toUtf8Bytes,

        sha256: sha2.sha256,
        createSha512Hmac: hmac.createSha512Hmac,

        pbkdf2: require('ethers-utils/pbkdf2.js'),
    }
})();

// "Bitcoin seed"
var MasterSecret = utils.toUtf8Bytes('Bitcoin seed');

var HardenedBit = 0x80000000;

// Returns a byte with the MSB bits set
function getUpperMask(bits) {
   return ((1 << bits) - 1) << (8 - bits);
}

// Returns a byte with the LSB bits set
function getLowerMask(bits) {
   return (1 << bits) - 1;
}

function HDNode(keyPair, chainCode, index, depth) {
    if (!(this instanceof HDNode)) { throw new Error('missing new'); }

    utils.defineProperty(this, '_keyPair', keyPair);

    utils.defineProperty(this, 'privateKey', utils.hexlify(keyPair.priv.toArray('be', 32)));
    utils.defineProperty(this, 'publicKey', '0x' + keyPair.getPublic(true, 'hex'));

    utils.defineProperty(this, 'chainCode', utils.hexlify(chainCode));

    utils.defineProperty(this, 'index', index);
    utils.defineProperty(this, 'depth', depth);
}

utils.defineProperty(HDNode.prototype, '_derive', function(index) {

    // Public parent key -> public child key
    if (!this.privateKey) {
        if (index >= HardenedBit) { throw new Error('cannot derive child of neutered node'); }
        throw new Error('not implemented');
    }

    var data = new Uint8Array(37);

    if (index & HardenedBit) {
        // Data = 0x00 || ser_256(k_par)
        data.set(utils.arrayify(this.privateKey), 1);

    } else {
        // Data = ser_p(point(k_par))
        data.set(this._keyPair.getPublic().encode(null, true));
    }

    // Data += ser_32(i)
    for (var i = 24; i >= 0; i -= 8) { data[33 + (i >> 3)] = ((index >> (24 - i)) & 0xff); }

    var I = utils.arrayify(utils.createSha512Hmac(this.chainCode).update(data).digest());
    var IL = utils.bigNumberify(I.slice(0, 32));
    var IR = I.slice(32);

    var ki = IL.add('0x' + this._keyPair.getPrivate('hex')).mod('0x' + secp256k1.curve.n.toString(16));

    return new HDNode(secp256k1.keyFromPrivate(utils.arrayify(ki)), I.slice(32), index, this.depth + 1);
});

utils.defineProperty(HDNode.prototype, 'derivePath', function(path) {
    var components = path.split('/');

    if (components.length === 0 || (components[0] === 'm' && this.depth !== 0)) {
        throw new Error('invalid path');
    }

    if (components[0] === 'm') { components.shift(); }

    var result = this;
    for (var i = 0; i < components.length; i++) {
        var component = components[i];
        if (component.match(/^[0-9]+'$/)) {
            var index = parseInt(component.substring(0, component.length - 1));
            if (index >= HardenedBit) { throw new Error('invalid path index - ' + component); }
            result = result._derive(HardenedBit + index);
        } else if (component.match(/^[0-9]+$/)) {
            var index = parseInt(component);
            if (index >= HardenedBit) { throw new Error('invalid path index - ' + component); }
            result = result._derive(index);
        } else {
            throw new Error('invlaid path component - ' + component);
        }
    }

    return result;
});

utils.defineProperty(HDNode, 'fromMnemonic', function(mnemonic) {
    // Check that the checksum s valid (will throw an error)
    mnemonicToEntropy(mnemonic);

    return HDNode.fromSeed(mnemonicToSeed(mnemonic));
});

utils.defineProperty(HDNode, 'fromSeed', function(seed) {
    seed = utils.arrayify(seed);
    if (seed.length < 16 || seed.length > 64) { throw new Error('invalid seed'); }

    var I = utils.arrayify(utils.createSha512Hmac(MasterSecret).update(seed).digest());

    return new HDNode(secp256k1.keyFromPrivate(I.slice(0, 32)), I.slice(32), 0, 0, 0);
});

function mnemonicToSeed(mnemonic, password) {

    if (!password) {
        password = '';

    } else if (password.normalize) {
        password = password.normalize('NFKD');

    } else {
        for (var i = 0; i < password.length; i++) {
            var c = password.charCodeAt(i);
            if (c < 32 || c > 127) { throw new Error('passwords with non-ASCII characters not supported in this environment'); }
        }
    }

    mnemonic = utils.toUtf8Bytes(mnemonic, 'NFKD');
    var salt = utils.toUtf8Bytes('mnemonic' + password, 'NFKD');

    return utils.hexlify(utils.pbkdf2(mnemonic, salt, 2048, 64, utils.createSha512Hmac));
}

function mnemonicToEntropy(mnemonic) {
   var words = mnemonic.toLowerCase().split(' ');
   if ((words.length % 3) !== 0) { throw new Error('invalid mnemonic'); }

   var entropy = utils.arrayify(new Uint8Array(Math.ceil(11 * words.length / 8)));

   var offset = 0;
   for (var i = 0; i < words.length; i++) {
       var index = wordlist.indexOf(words[i]);
       if (index === -1) { throw new Error('invalid mnemonic'); }

       for (var bit = 0; bit < 11; bit++) {
           if (index & (1 << (10 - bit))) {
               entropy[offset >> 3] |= (1 << (7 - (offset % 8)));
           }
           offset++;
       }
   }

   var entropyBits = 32 * words.length / 3;

   var checksumBits = words.length / 3;
   var checksumMask = getUpperMask(checksumBits);

   var checksum = utils.arrayify(utils.sha256(entropy.slice(0, entropyBits / 8)))[0];
   checksum &= checksumMask;

   if (checksum !== (entropy[entropy.length - 1] & checksumMask)) {
       throw new Error('invalid checksum');
   }

   return utils.hexlify(entropy.slice(0, entropyBits / 8));
}

function entropyToMnemonic(entropy) {
    entropy = utils.arrayify(entropy);

    if ((entropy.length % 4) !== 0 || entropy.length < 16 || entropy.length > 32) {
        throw new Error('invalid entropy');
    }

    var words = [0];

    var remainingBits = 11;
    for (var i = 0; i < entropy.length; i++) {

        // Consume the whole byte (with still more to go)
        if (remainingBits > 8) {
            words[words.length - 1] <<= 8;
            words[words.length - 1] |= entropy[i];

            remainingBits -= 8;

        // This byte will complete an 11-bit index
        } else {
            words[words.length - 1] <<= remainingBits;
            words[words.length - 1] |= entropy[i] >> (8 - remainingBits);

            // Start the next word
            words.push(entropy[i] & getLowerMask(8 - remainingBits));

            remainingBits += 3;
        }
    }

    // Compute the checksum bits
    var checksum = utils.arrayify(utils.sha256(entropy))[0];
    var checksumBits = entropy.length / 4;
    checksum &= getUpperMask(checksumBits);

    // Shift the checksum into the word indices
    words[words.length - 1] <<= checksumBits;
    words[words.length - 1] |= (checksum >> (8 - checksumBits));

    // Convert indices into words
    for (var i = 0; i < words.length; i++) {
        words[i] = wordlist[words[i]];
    }

    return words.join(' ');
}

function isValidMnemonic(mnemonic) {
    try {
        mnemonicToEntropy(mnemonic);
        return true;
    } catch (error) { }

    return false;
}

module.exports = {
    fromMnemonic: HDNode.fromMnemonic,
    fromSeed: HDNode.fromSeed,

    mnemonicToEntropy: mnemonicToEntropy,
    entropyToMnemonic: entropyToMnemonic,
    mnemonicToSeed: mnemonicToSeed,

    isValidMnemonic: isValidMnemonic,
};
