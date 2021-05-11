var famousData = {
        "红龙":"作为烟波第一门神！我们来看看谁是最长Cd王与欧皇！？<法沙利亚喵@宇宙和音>长达10个月并且几乎每个CD都去才上钩！而<明朗@宇宙和音>是欧皇中的欧皇！他一个CD居然上了两条红龙！",
        "胸脊鲨":"<寒衣有信@紫水栈桥>钓了1800条珍珠眼都还没有钩上来！",
        "七彩天主":"<庭树@潮风亭>共计脱钩48次才上钩！而<星夜澪华@宇宙和音>能在一个鱼识里脱四杆，并在第五杆咬钩！",
        "云海蝴蝶螺":"崽种之王蝴蝶螺的保持者是<時計狸@拉诺西亚>，共计136CD才上钩！",
        "兰代勒翼龙":"<Mooi@红玉海>共计脱钩了53次才上钩！",
        "莫名熔岩鱼":"<洸哉@龙巢神殿>终于在第52个CD的时候！上钩了！可喜可贺。",
        "波太郎":"<连岸@白银乡>共计去了16CD才上钩！不愧是脱钩太郎。",
        "雷神光":"总有人卡的千奇百怪，<丝东@红玉海>居然脱钩20天才上钩！",
        "沉溺射手":"总有人卡的千奇百怪！<yomico@宇宙和音>在被拖走了40个拟饵后！终于上钩了！",
        "沉川鲑":"总有人脱的千奇百怪！<牧羊的天允@萌芽池>在被拖走了45个拟饵后！终于上钩了！",
        "温泉王":"<潇潇雨未歇@沃仙曦染>共计45个CD才上钩！不愧是在温泉里泡大的鱼王。",
        "滑溜帝王":"总有人脱的千奇百怪，<sarili@静语庄园>居然一个CD脱12杆！",
        "一家之母":"<红白的塞钱@神拳痕>在脱钩74次后终于上钩了！",
        "卷风鲨":"<谈清若风柔@神拳痕>共计投喂3300饵才上钩，并有感而发完成大型攻略《我本烟波一钓徒》",
        "百目螈":"总有人卡的千奇百怪，<Krage@神拳痕>居然钓了90CD才上钩！",
        "哲罗鲑":"我们的Bot妈妈<风屿@沃仙曦染>在连钓3个小时！共计投喂500饵才见到该鱼王！",
        "珍珠皮皮拉鱼":"总有人被套娃打败！<梦洄子时@红玉海>连钓21CD才上钩！",
        "冥河灯":"卡也能卡到心累！<洛玖九@幻影群岛>共计37CD才上钩！",
        "沙里贝涅":"无人能敌的<恶狐@沃仙曦染>经历87CD后才上钩！",
        "涅普特龙":"挥杆降龙yyds！<是巧克力啊喂@静语庄园>居然脱了70杆才上钩！",
        "倔强鲫鱼":"总有人卡的千奇百怪！<岚卡@拉诺西亚>在36CD里居然脱钩6次！",
        "冠骨鱼":"<云和海@潮风亭>在18个CD里被拖走了23个拟饵后！终于上钩了！",
        "洛克瓦卫兵":"总有人很过分！<美神狂热信徒@红玉海>一个CD钓了两条卫兵！", 
        "忍斗鱼":"总有人很过分！<喜欢青花鱼白@拂晓之间>15分钟内上了8条！其中6条是HQ！", 
        "魔法水桶":"有时候卡死人的可能不是鱼王，<晔煜@白金幻象>在6个月里连续投喂了4800个残暴水蛭后，终于上钩了。",
        "孤独杀手":"总有人过分惨烈！<徒步精灵@神意之地>居然能在5天内脱钩80次！", 
        "书记官杀手":"总有人被时间打败！<颜君行@琥珀原>这种长窗口鱼王居然能卡13CD！", 
        "异刺鲨":"谁才是真正的皇帝！<Kizuna AI@Titan>在经历2540个饵后，终于上钩了！",
        "猛犸章鱼":"总有人卡的千奇百怪！<冰冻小饭团@静语庄园>居然用了263个饵！", 
        "莫古尔古球球":"总有人能脱到自闭！<轩辕十四@沃仙曦染>居然能在拍水只剩一条鱼王的情况下脱了一整个CD！！", 
        "奇虾":"总有人脱的令人心疼！<星野良@拉诺西亚>居然能在1个CD里脱5杆！",
        "露齿鲤":"总有人卡的千奇百怪！<潤潤@宇宙和音>在喂食300饵后，终于上钩了！",
        "尼摩船长":"总有人卡的千奇百怪！<梦洄子时@红玉海>在钓上第四个魔法水桶后！才上钩！",
        "众神之爱":"在没有拍水的情况下<赛菲尔@静语庄园>居然能卡两个CD之间，连钓月神的爱宠和众神之爱！",
        "虚无鲈":"<洛家小天依@潮风亭>在第35个CD后，终于钓上来了！不愧是遁入虚无，压根没有。",
        "铁索":"总有人脱的惨不忍睹！<末怜@拂晓之间>在被拖走了47个拟饵后！终于上钩了！",
        "炼狱火角":"总有人从来都不咬钩！<龙小魄@龙巢神殿>连续钓了8个月才上钩！几乎每个CD都去！",
        "头领薄饼章鱼":"总有人特别过分！<鹿川鸣@红玉海>一个CD上了两条小可爱章鱼！",
        "无光层巨骨舌鱼":"总有人渡劫过分悲惨！<墨桑白@红玉海>在第38个CD终于上钩！并完成了烟波钓徒。",
        "元首的军扇":"<渡亡@幻影群岛>居然在一个CD里提了三条NQ！",
        "战盾剑齿龙鳖":"有些人只会更加过分！<明朗@宇宙和音>居然在一个CD里提了两条绿王八！",
        "刺鱼教父":"<草野优衣@晨曦王座>居然在一个CD里脱了14杆！",
        "猴面雀杀手":"有些悲伤是时间不能填补的，<海尔梅森@沃仙曦染>居然钓了18个CD才上钩！",
        "金鳍蝶":"天空是蔚蓝色，窗外有千纸鹤。<天青烟雨话@延夏>居然跑错钓场，白喂了200多个鱼饵！",
        "苦尔鳗":"有时候门槛也是一种磨炼，<雪野翼@琥珀原>居然能在ET0-4这个区间里脱8杆！这也太惨了吧。",
        "翻舵手":"总有人卡的千奇百怪。<鳪霭@神意之地>居然去了8个CD才上钩！",
        "石骨鱼":"<我叫梁一帆@宇宙和音>在触发第278个鱼识后！终于上钩了！",
        "哈弗古法":"<美神狂热信徒@红玉海>在一个幻海流里平钓起了两条HQ哈弗古法！",
        "盾齿龙":"<西北男孩@白银乡>居然在一个幻海流里提上了两条盾齿龙！",
        "索蒂斯":"<明朗@宇宙和音>居然在一个幻海流里提上了两条索蒂斯，一条HQ和一条NQ！",
        "烟波钓徒":"在9天内<阿篱@柔风海湾>完成了钓鱼人的传奇——烟波钓徒！",
        "海王":" <青炎@延夏>居然在一条航线里上了三条蓝鱼！自己成就了一个大鱼旗！！\n<湛@晨曦王座>的海钓分数高达31972，简直是欧皇中的欧皇！\n在一次海钓中！<高咲侑@红玉海>和<勾指起誓@海猫茶屋>居然一个人触发了三次幻海!\n<梦洄子时@红玉海>居然在幻海里爆钓21条沉寂者！其中HQ居然高达18条！\n<竹醉@神意之地>居然在触发幻海的时候八次鱼王杆里有6条都是落水面具!\n<柯·哈特@红玉海>居然提了五条幻光巨齿鲨都无法触发幻海！\n<Sterne@红玉海>居然以小钓大7条以太海龙！还是HQ！\n<AZAKA@静语庄园>居然能五连处刑者！其中有12条是HQ！\n <游鸢@红玉海>居然提了16条歼灭者，还全是HQ！\n<寒意有信@紫水栈桥>居然提了17条珊瑚海龙，其中HQ占了12条！",
        "钓鱼大赛":"第二届钓鱼大赛！\n第一名：小咪@拂晓之间\n第二名：澄原星奈@红玉海\n第三名：冬天丶@柔风海湾",
        "鸟区钓鱼大赛":"第一届陆行鸟鸟区钓鱼大赛:\n冲分300万第一名是柏木清羽@晨曦王座\n分数最高第一名是湛@晨曦王座\n新蓝鱼最多的是美神狂热信徒@红玉海",
        "猪区钓鱼大赛":"第二届莫古力区钓鱼大赛,\n第一名：余弦之光@白金幻象\n第二名：七海灯子@旅人栈桥\n第三名：三沢岳明@拂晓之间",
        "统计": `名人堂趣味统计第一期(感谢梦洄子时@红玉海的倾情制作！)\n[CQ:image,file=https://z3.ax1x.com/2021/05/11/gdFfgO.jpg]`,
        "bot统计": `bot趣味统计第一期(感谢梦洄子时@红玉海的倾情制作！)\n[CQ:image,file=https://z3.ax1x.com/2021/05/11/gdZrkj.md.jpg]`
 }
module.exports = famousData;