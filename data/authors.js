// 唐宋八大家 —— 按出生年排序
// dynasty: 唐 / 宋 ; birth/death 为公元年
const authors = [
  {
    id: 'hanyu',
    name: '韩愈',
    zi: '退之',
    hao: '韩昌黎',
    dynasty: '唐',
    birth: 768,
    death: 824,
    birthplace: '河阳（今河南孟州）',
    title: '文起八代之衰',
    videos: [
      { label: '上集', title: '《宗师列传·唐宋八大家》 20231110 韩愈·上', pageUrl: 'https://tv.cctv.com/2023/12/17/VIDEufQ3133GnTDYxbqFp7sE231217.shtml', url: '' },
      { label: '下集', title: '《宗师列传·唐宋八大家》 20231117 韩愈·下', pageUrl: 'https://tv.cctv.com/2023/11/17/VIDE1KzYiSQerv2aL5sCrk9E231117.shtml', url: '' }
    ],

    intro: '唐代杰出的文学家、思想家、哲学家、政治家。倡导古文运动，主张“文以载道”，反对六朝以来骈俪浮华的文风，被苏轼誉为“文起八代之衰”。与柳宗元并称“韩柳”，是唐宋八大家中居首的唐代大家。其文气势磅礴、逻辑严密；诗风奇崛雄健，开“以文为诗”之风。',
    achievements: [
      '倡导古文运动，奠定唐宋古文基础',
      '散文《师说》《进学解》《祭十二郎文》传诵千古',
      '诗风雄奇，与孟郊并称“韩孟”',
      '教育家，培养后进，门人甚众'
    ]
  },
  {
    id: 'liuzongyuan',
    name: '柳宗元',
    zi: '子厚',
    hao: '柳河东、柳柳州',
    dynasty: '唐',
    birth: 773,
    death: 819,
    birthplace: '河东（今山西运城）',
    title: '与韩愈并称“韩柳”',
    videos: [
      { label: '单集', title: '《宗师列传·唐宋八大家》 20240515 柳宗元', pageUrl: 'https://tv.cctv.com/2024/05/16/VIDE613Gl1a5tEebWHxi4O9k240516.shtml', url: '' }
    ],

    intro: '唐代文学家、哲学家、散文家、诗人。与韩愈共同倡导古文运动，并称“韩柳”。其山水游记与寓言成就极高，《永州八记》为我国游记文学的奠基之作。诗风清峭幽远，代表作《江雪》孤绝高洁。一生辗转贬谪，情感沉郁，文风冷峻而深情。',
    achievements: [
      '古文运动核心人物，与韩愈并称“韩柳”',
      '山水游记《永州八记》开创游记文体',
      '寓言犀利深刻，《三戒》讽世',
      '诗歌清峻，《江雪》为千古绝唱'
    ]
  },
  {
    id: 'ouyangxiu',
    name: '欧阳修',
    zi: '永叔',
    hao: '醉翁、六一居士',
    dynasty: '宋',
    birth: 1007,
    death: 1072,
    birthplace: '吉州永丰（今江西永丰）',
    title: '北宋文坛领袖',
    videos: [
      { label: '上集', title: '《宗师列传·唐宋八大家》 20231208 欧阳修·上', pageUrl: 'https://tv.cctv.com/2023/12/27/VIDEIy5J03uSsQxp7NrarmI2231227.shtml', url: '' },
      { label: '下集', title: '《宗师列传·唐宋八大家》 20231215 欧阳修·下', pageUrl: 'https://tv.cctv.com/2023/12/15/VIDEdYNtCYNq1uBMKryA4xJH231215.shtml', url: '' }
    ],

    intro: '北宋政治家、文学家、史学家。北宋中叶文坛领军人物，继承韩愈古文传统，领导北宋诗文革新运动，提携苏轼、苏辙、曾巩、王安石等后进，苏洵、苏轼、苏辙、曾巩皆出其门下。散文平易流畅、情韵悠长；词风深婉，诗风清新。',
    achievements: [
      '领导北宋诗文革新运动',
      '主修《新唐书》、独撰《新五代史》',
      '提携苏轼、苏辙、曾巩、王安石等',
      '散文《醉翁亭记》千古名篇'
    ]
  },
  {
    id: 'suxun',
    name: '苏洵',
    zi: '明允',
    hao: '老泉',
    dynasty: '宋',
    birth: 1009,
    death: 1066,
    birthplace: '眉州眉山（今四川眉山）',
    title: '“三苏”之父',
    videos: [
      { label: '单集', title: '《宗师列传·唐宋八大家》 20231229 苏洵', pageUrl: 'https://tv.cctv.com/2024/01/05/VIDEiZ1lWQjX21s6DDx30J2r240105.shtml', url: '' }
    ],

    intro: '北宋文学家，与其子苏轼、苏辙并称“三苏”，均列唐宋八大家。少不喜学，年二十七始发愤读书，博通经史，文风纵横恣肆、雄辩有力。代表作《六国论》借古讽今，议论精警。教子有方，二子皆成一代大家。',
    achievements: [
      '以《六国论》等政论名世',
      '“三苏”之一，父子同列八大家',
      '文风雄健，长于策论',
      '教子有方，苏轼苏辙皆成大家'
    ]
  },
  {
    id: 'zenggong',
    name: '曾巩',
    zi: '子固',
    hao: '南丰先生',
    dynasty: '宋',
    birth: 1019,
    death: 1083,
    birthplace: '建昌军南丰（今江西南丰）',
    title: '南丰先生',
    videos: [
      { label: '单集', title: '《宗师列传·唐宋八大家》 20240308 曾巩', pageUrl: 'https://tv.cctv.com/2024/03/08/VIDENufBd8N1P6LBCtsGrirN240308.shtml', url: '' }
    ],

    intro: '北宋文学家、史学家。为欧阳修所赏识，散文成就尤高，风格平和冲淡、雍容典雅，叙事议论皆有法度，自成“曾体”。其文重在明道，少浮华而多醇正，是八大家中章法最为严谨的一家。',
    achievements: [
      '散文醇雅，自成“曾体”',
      '为欧阳修所荐，列名八大家',
      '长于记事与议论，法度谨严',
      '《墨池记》等文含蓄深远'
    ]
  },
  {
    id: 'wanganshi',
    name: '王安石',
    zi: '介甫',
    hao: '半山、王荆公',
    dynasty: '宋',
    birth: 1021,
    death: 1086,
    birthplace: '临川（今江西抚州）',
    title: '中国十一世纪的改革家',
    videos: [
      { label: '单集', title: '《宗师列传·唐宋八大家》 20240302 王安石', pageUrl: 'https://tv.cctv.com/2024/03/02/VIDEgxMk2vxcOmMK9ROgRgRa240302.shtml', url: '' }
    ],

    intro: '北宋杰出的政治家、思想家、文学家、改革家。主持“王安石变法”，力图富国强兵。文学上散文峭拔遒劲、逻辑严密；诗风遒劲清新，晚年近王维、孟浩然；词作虽少而格高，《桂枝香·金陵怀古》为宋词名篇。',
    achievements: [
      '主持熙宁变法，改革北宋弊政',
      '散文雄健峭拔，《游褒禅山记》见理',
      '诗风精工，《泊船瓜洲》千古传',
      '词作高格，《桂枝香》开豪放先声'
    ]
  },
  {
    id: 'sushi',
    name: '苏轼',
    zi: '子瞻',
    hao: '东坡居士',
    dynasty: '宋',
    birth: 1037,
    death: 1101,
    birthplace: '眉州眉山（今四川眉山）',
    title: '北宋文学巅峰',
    videos: [
      { label: '上集', title: '《宗师列传·唐宋八大家》 20240105 苏轼 苏辙·上', pageUrl: 'https://tv.cctv.com/2024/01/21/VIDEr4YmmqNgIIm5hX0LBDw8240121.shtml', url: '' }
    ],

    intro: '北宋文学家、书画家、美食家。苏洵次子，与父洵、弟辙并称“三苏”。诗、词、文、书、画俱臻一流，是宋代文学最高成就的代表。其文如行云流水，其诗清新豪健，其词开豪放一派，打破晚唐五代以来婉约藩篱。一生屡遭贬谪而旷达自适，是中国文化史上最具人格魅力的人物之一。',
    achievements: [
      '诗词文书画俱为一代宗师',
      '词开豪放一派，《念奴娇》《水调歌头》不朽',
      '散文行云流水，《前赤壁赋》绝唱',
      '胸襟旷达，贬谪中自成东坡气象'
    ]
  },
  {
    id: 'suzhe',
    name: '苏辙',
    zi: '子由',
    hao: '颍滨遗老',
    dynasty: '宋',
    birth: 1039,
    death: 1112,
    birthplace: '眉州眉山（今四川眉山）',
    title: '“三苏”之幼',
    videos: [
      { label: '下集', title: '《宗师列传·唐宋八大家》 20240126 苏轼 苏辙·下', pageUrl: 'https://tv.cctv.com/2024/01/28/VIDECQtL9QVgnNkheEqeDupK240128.shtml', url: '' }
    ],

    intro: '北宋文学家、政治家。苏轼之弟，与父洵、兄轼同列八大家，世称“三苏”。其文汪洋澹泊、温润深厚，议论文力追父兄而更沉稳。仕途起伏，晚年退居颍川，潜心著述。与苏轼手足情深，唱和甚多。',
    achievements: [
      '“三苏”之一，兄弟同列八大家',
      '散文汪洋淡泊，《黄州快哉亭记》名世',
      '政论稳健，官至尚书右丞',
      '与苏轼手足情深，唱和甚多'
    ]
  }
]

module.exports = authors
