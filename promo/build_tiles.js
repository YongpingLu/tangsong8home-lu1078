const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const ASSETS = 'C:/Users/admin/WorkBuddy/2026-07-12-23-06-55/tang-song-bada/assets';
const OUT = 'C:/Users/admin/WorkBuddy/2026-07-12-23-06-55/tang-song-bada/promo/tiles';

function b64(file) {
  try {
    const ext = path.extname(file).toLowerCase();
    const mime = ext === '.png' ? 'image/png' : 'image/jpeg';
    return `data:${mime};base64,${fs.readFileSync(file).toString('base64')}`;
  } catch (e) { return null; }
}

const shots = {
  '需求': b64(path.join(ASSETS, '需求.png')),
  '开发': b64(path.join(ASSETS, '开发.png')),
  '版控': b64(path.join(ASSETS, '版控（版本控制）.png')),
  '测试': b64(path.join(ASSETS, '测试.png')),
  '上线': b64(path.join(ASSETS, '上线.jpg')),
  '推广': b64(path.join(ASSETS, '推广.png')),
};

const roles = [
  { role: '构思是我', key: null, joke: '半夜的灵感，记在手机备忘录里' },
  { role: '需求是我', key: '需求', joke: '我自己提，自己批，秒过' },
  { role: '设计是我', key: null, joke: '审美全靠我和我吵了一架' },
  { role: '开发是我', key: '开发', joke: '写 bug 和修 bug，是同一个我' },
  { role: '版控是我', key: '版控', joke: '提交记录写「又改了」三个字' },
  { role: '测试是我', key: '测试', joke: '生产环境，是最好的测试' },
  { role: '上线是我', key: '上线', joke: '双手合十，点击上传' },
  { role: '推广是我', key: '推广', joke: '朋友圈里唯一的甲方' },
  { role: '客服是我', key: null, joke: '亲，在的，我就是老板本人' },
];

function tileHTML(r, i) {
  const idx = '①②③④⑤⑥⑦⑧⑨'[i];
  const thumb = (r.key && shots[r.key])
    ? `<img class="thumb" src="${shots[r.key]}" alt="">`
    : `<div class="thumb ph">此岗位暂无截图<br>但活儿真是我干的</div>`;
  return `<!doctype html><html lang="zh"><head><meta charset="utf-8"><style>
  *{margin:0;padding:0;box-sizing:border-box;}
  html,body{background:#e7dcc4;}
  .tile{width:1080px;height:1080px;position:relative;overflow:hidden;
    background:radial-gradient(circle at 20% 12%,#fcf6ea 0%,rgba(252,246,234,0) 45%),
      linear-gradient(160deg,#f8f0e1 0%,#efe2c8 100%);
    font-family:"PingFang SC","Microsoft YaHei","Hiragino Sans GB",sans-serif;color:#3a2a1a;
    padding:54px 50px;display:flex;flex-direction:column;}
  .tile::before{content:"";position:absolute;inset:0;
    background-image:radial-gradient(#0000000c 1px,transparent 1px);background-size:26px 26px;}
  .head{display:flex;align-items:center;gap:18px;position:relative;z-index:2;}
  .idx{width:74px;height:74px;border-radius:50%;background:#B8860B;color:#fff;font-size:42px;
    font-weight:800;display:flex;align-items:center;justify-content:center;flex:none;
    box-shadow:0 3px 10px rgba(122,31,31,.25);}
  .rname{font-size:62px;font-weight:800;color:#7A1F1F;letter-spacing:2px;}
  .thumb{flex:1;width:100%;margin-top:34px;border-radius:18px;object-fit:cover;
    background:#eee;display:block;box-shadow:0 6px 18px rgba(122,31,31,.18);border:3px solid #7A1F1F;}
  .thumb.ph{flex:1;display:flex;align-items:center;justify-content:center;text-align:center;
    border:4px dashed #c9a24a;color:#a07d34;font-size:38px;line-height:1.4;background:#fff7e8;}
  .joke{margin-top:30px;background:#fffaf0;border-left:10px solid #7A1F1F;border-radius:0 14px 14px 0;
    padding:22px 26px;font-size:38px;line-height:1.4;color:#5a4632;position:relative;z-index:2;font-weight:600;}
  .wm{position:absolute;right:36px;bottom:30px;font-size:40px;font-weight:800;color:rgba(122,31,31,.18);
    transform:rotate(-10deg);z-index:1;}
  </style></head><body><div class="tile">
    <div class="head"><span class="idx">${idx}</span><span class="rname">${r.role}</span></div>
    ${thumb}
    <div class="joke">${r.joke}</div>
    <div class="wm">OPC</div>
  </div></body></html>`;
}

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1080, height: 1080 }, deviceScaleFactor: 2 });
  for (let i = 0; i < roles.length; i++) {
    const page = await ctx.newPage();
    const html = tileHTML(roles[i], i);
    const file = path.join(OUT, `tile_${String(i + 1).padStart(2, '0')}.html`);
    fs.writeFileSync(file, html);
    await page.goto('file://' + file);
    await page.waitForTimeout(250);
    const ok = await page.evaluate(() => {
      const t = document.querySelector('.thumb');
      return t && t.tagName === 'IMG' ? (t.complete && t.naturalWidth > 0) : true;
    });
    await page.screenshot({ path: path.join(OUT, `tile_${String(i + 1).padStart(2, '0')}.png`) });
    console.log(`tile ${i + 1} -> ${ok ? 'img ok' : 'placeholder'} saved`);
    await page.close();
  }
  await ctx.close();
  await browser.close();
  console.log('TILES done. count:', fs.readdirSync(OUT).filter(f => f.endsWith('.png')).length);
})().catch(e => { console.error('ERROR', e); process.exit(1); });
