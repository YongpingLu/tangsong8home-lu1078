const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const ASSETS = 'C:/Users/admin/WorkBuddy/2026-07-12-23-06-55/tang-song-bada/assets';
const OUT = 'C:/Users/admin/WorkBuddy/2026-07-12-23-06-55/tang-song-bada/promo';

function b64(file) {
  try {
    const ext = path.extname(file).toLowerCase();
    const mime = ext === '.png' ? 'image/png' : 'image/jpeg';
    const buf = fs.readFileSync(file);
    return `data:${mime};base64,${buf.toString('base64')}`;
  } catch (e) {
    return null;
  }
}

const icon = b64(path.join(ASSETS, 'icon.jpg'));
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

function cardHTML(r, i) {
  const idx = '①②③④⑤⑥⑦⑧⑨'[i];
  let thumb;
  if (r.key && shots[r.key]) {
    thumb = `<img class="thumb" src="${shots[r.key]}" alt="${r.role}">`;
  } else {
    thumb = `<div class="thumb ph">此岗位暂无截图<br>但活儿真是我干的</div>`;
  }
  return `<div class="card">
    <div class="chead"><span class="idx">${idx}</span><span class="rname">${r.role}</span></div>
    ${thumb}
    <div class="joke">${r.joke}</div>
  </div>`;
}

/* ---------------- POSTER ---------------- */
function posterHTML() {
  return `<!doctype html><html lang="zh"><head><meta charset="utf-8"><style>
  *{margin:0;padding:0;box-sizing:border-box;}
  html,body{background:#e7dcc4;}
  .poster{width:1080px;height:1920px;position:relative;overflow:hidden;
    background:
      radial-gradient(circle at 18% 10%, #fcf6ea 0%, rgba(252,246,234,0) 42%),
      radial-gradient(circle at 88% 82%, #f2e6cd 0%, rgba(242,230,205,0) 46%),
      linear-gradient(160deg,#f8f0e1 0%,#efe2c8 100%);
    font-family:"PingFang SC","Microsoft YaHei","Hiragino Sans GB",sans-serif;
    color:#3a2a1a;padding:60px 54px 48px;display:flex;flex-direction:column;}
  .poster::before{content:"";position:absolute;inset:0;
    background-image:radial-gradient(#0000000c 1px,transparent 1px);background-size:26px 26px;pointer-events:none;}
  .top{display:flex;align-items:center;gap:26px;position:relative;z-index:2;}
  .logo{width:132px;height:132px;border-radius:30px;object-fit:cover;
    box-shadow:0 6px 18px rgba(122,31,31,.28);border:3px solid #7A1F1F;background:#fff;}
  .titles{display:flex;flex-direction:column;}
  .tt{font-size:78px;font-weight:800;color:#7A1F1F;letter-spacing:2px;line-height:1.05;}
  .ts{font-size:30px;color:#B8860B;font-weight:700;margin-top:8px;letter-spacing:1px;}
  .stamp{position:absolute;right:0;top:-6px;width:148px;height:148px;border:5px solid #7A1F1F;
    border-radius:18px;color:#7A1F1F;font-size:62px;font-weight:800;display:flex;align-items:center;
    justify-content:center;transform:rotate(-12deg);opacity:.92;
    box-shadow:inset 0 0 0 3px rgba(122,31,31,.25);background:rgba(255,255,255,.18);}
  .intro{margin-top:34px;background:#fffaf0;border:2px dashed #c9a24a;border-radius:18px;
    padding:22px 26px;font-size:29px;line-height:1.5;color:#5a4632;position:relative;z-index:2;}
  .intro b{color:#7A1F1F;}
  .grid{flex:1;display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:30px;
    align-content:stretch;position:relative;z-index:2;min-height:0;}
  .card{background:#fffdf8;border:3px solid #7A1F1F;border-radius:18px;padding:14px 14px 16px;
    display:flex;flex-direction:column;box-shadow:0 4px 12px rgba(122,31,31,.12);}
  .chead{display:flex;align-items:center;gap:10px;margin-bottom:10px;}
  .idx{width:40px;height:40px;border-radius:50%;background:#B8860B;color:#fff;font-size:24px;
    font-weight:800;display:flex;align-items:center;justify-content:center;flex:none;}
  .rname{font-size:31px;font-weight:800;color:#7A1F1F;}
  .thumb{width:100%;height:158px;object-fit:cover;border-radius:10px;background:#eee;display:block;}
  .thumb.ph{height:158px;border:3px dashed #c9a24a;border-radius:10px;display:flex;
    align-items:center;justify-content:center;text-align:center;color:#a07d34;
    font-size:21px;line-height:1.4;background:#fff7e8;}
  .joke{margin-top:12px;font-size:22px;line-height:1.4;color:#4a3a28;flex:1;}
  .footer{margin-top:26px;display:flex;align-items:center;gap:18px;position:relative;z-index:2;
    border-top:2px solid rgba(122,31,31,.25);padding-top:20px;}
  .flogo{width:84px;height:84px;border-radius:18px;object-fit:cover;border:2px solid #7A1F1F;background:#fff;}
  .ftext{display:flex;flex-direction:column;}
  .fbrand{font-size:34px;font-weight:800;color:#7A1F1F;}
  .fsub{font-size:23px;color:#7a6450;margin-top:4px;}
  </style></head><body>
  <div class="poster">
    <div class="top">
      <img class="logo" src="${icon}" alt="icon">
      <div class="titles">
        <div class="tt">AI 时代的 OPC</div>
        <div class="ts">One Person Company · 一个人，就是一支队伍</div>
      </div>
      <div class="stamp">OPC</div>
    </div>
    <div class="intro">别人家的团队：<b>产品 / 设计 / 开发 / 测试 / 运营</b><br>
      我家的团队：以上全部，外加客服 —— <b>统统是我</b>。</div>
    <div class="grid">
      ${roles.map(cardHTML).join('')}
    </div>
    <div class="footer">
      <img class="flogo" src="${icon}" alt="icon">
      <div class="ftext">
        <div class="fbrand">唐宋八大家 · 小程序</div>
        <div class="fsub">—— 一个我，做出来的。</div>
      </div>
    </div>
  </div>
  </body></html>`;
}

/* ---------------- VIDEO ---------------- */
function videoHTML() {
  const chips = roles.map((r, i) => {
    const delay = (0.9 + i * 0.42).toFixed(2);
    const idx = '①②③④⑤⑥⑦⑧⑨'[i];
    let thumb = (r.key && shots[r.key])
      ? `<img class="vthumb" src="${shots[r.key]}" alt="">`
      : `<div class="vthumb vph">暂无截图</div>`;
    return `<div class="chip" style="animation-delay:${delay}s">${thumb}
      <div class="vrole"><span class="vidx">${idx}</span>${r.role}</div>
      <div class="vjoke">${r.joke}</div></div>`;
  }).join('');
  return `<!doctype html><html lang="zh"><head><meta charset="utf-8"><style>
  *{margin:0;padding:0;box-sizing:border-box;}
  html,body{margin:0;background:#1c140d;}
  .stage{width:1080px;height:1920px;position:relative;overflow:hidden;
    background:
      radial-gradient(circle at 18% 10%, #fcf6ea 0%, rgba(252,246,234,0) 42%),
      radial-gradient(circle at 88% 82%, #f2e6cd 0%, rgba(242,230,205,0) 46%),
      linear-gradient(160deg,#f8f0e1 0%,#efe2c8 100%);
    font-family:"PingFang SC","Microsoft YaHei","Hiragino Sans GB",sans-serif;color:#3a2a1a;}
  .vtop{position:absolute;top:90px;left:0;right:0;text-align:center;z-index:3;}
  .vtitle{font-size:92px;font-weight:800;color:#7A1F1F;letter-spacing:3px;
    animation:titleIn .7s cubic-bezier(.2,1.4,.4,1) both;animation-delay:.1s;}
  .vsub{font-size:34px;color:#B8860B;font-weight:700;margin-top:14px;
    animation:fadeUp .6s ease both;animation-delay:.55s;}
  .vgrid{position:absolute;top:330px;left:60px;right:60px;
    display:grid;grid-template-columns:repeat(3,1fr);gap:22px;z-index:2;}
  .chip{background:#fffdf8;border:3px solid #7A1F1F;border-radius:16px;padding:12px;
    display:flex;flex-direction:column;box-shadow:0 4px 12px rgba(122,31,31,.16);
    animation:pop .5s cubic-bezier(.2,1.5,.4,1) both;}
  .vthumb{width:100%;height:120px;object-fit:cover;border-radius:9px;background:#eee;display:block;}
  .vthumb.vph{height:120px;border:3px dashed #c9a24a;border-radius:9px;display:flex;
    align-items:center;justify-content:center;color:#a07d34;font-size:18px;background:#fff7e8;}
  .vrole{font-size:27px;font-weight:800;color:#7A1F1F;margin-top:10px;display:flex;align-items:center;gap:8px;}
  .vidx{width:34px;height:34px;border-radius:50%;background:#B8860B;color:#fff;font-size:20px;
    font-weight:800;display:flex;align-items:center;justify-content:center;flex:none;}
  .vjoke{font-size:19px;line-height:1.35;color:#4a3a28;margin-top:6px;}
  .vpunch{position:absolute;left:0;right:0;bottom:120px;text-align:center;z-index:4;
    animation:fadeUp .6s ease both;animation-delay:5.2s;}
  .vpk1{font-size:40px;font-weight:800;color:#7A1F1F;}
  .vpk2{font-size:58px;font-weight:800;color:#B8860B;margin-top:10px;}
  .vstamp{position:absolute;right:80px;bottom:96px;width:170px;height:170px;border:6px solid #7A1F1F;
    border-radius:20px;color:#7A1F1F;font-size:72px;font-weight:800;display:flex;align-items:center;
    justify-content:center;transform:rotate(-12deg);background:rgba(255,255,255,.2);
    box-shadow:inset 0 0 0 3px rgba(122,31,31,.25);z-index:5;
    animation:stampIn .5s cubic-bezier(.2,1.6,.4,1) both;animation-delay:5.6s;}
  @keyframes titleIn{0%{transform:scale(.3) rotate(-6deg);opacity:0}100%{transform:scale(1) rotate(0);opacity:1}}
  @keyframes fadeUp{0%{transform:translateY(46px);opacity:0}100%{transform:translateY(0);opacity:1}}
  @keyframes pop{0%{transform:scale(.2);opacity:0}70%{transform:scale(1.08)}100%{transform:scale(1);opacity:1}}
  @keyframes stampIn{0%{transform:rotate(-40deg) scale(.2);opacity:0}100%{transform:rotate(-12deg) scale(1);opacity:1}}
  </style></head><body>
  <div class="stage">
    <div class="vtop">
      <div class="vtitle">AI 时代的 OPC</div>
      <div class="vsub">One Person Company · 一个人，就是一支队伍</div>
    </div>
    <div class="vgrid">${chips}</div>
    <div class="vpunch">
      <div class="vpk1">One Person Company</div>
      <div class="vpk2">但我是满编团队</div>
    </div>
    <div class="vstamp">OPC</div>
  </div>
  </body></html>`;
}

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const posterPath = path.join(OUT, 'opc_poster.html');
  const videoPath = path.join(OUT, 'opc_video.html');
  fs.writeFileSync(posterPath, posterHTML());
  fs.writeFileSync(videoPath, videoHTML());
  console.log('HTML written.');

  const browser = await chromium.launch();

  // ---- render poster ----
  const pctx = await browser.newContext({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: 2 });
  const ppage = await pctx.newPage();
  await ppage.goto('file://' + posterPath);
  await ppage.waitForTimeout(400);
  // verify layout fits and images loaded
  const info = await ppage.evaluate(() => {
    const poster = document.querySelector('.poster');
    const imgs = [...document.querySelectorAll('img')];
    const grid = document.querySelector('.grid');
    return {
      posterH: poster.scrollHeight,
      overflow: poster.scrollHeight > 1920 + 2,
      imgsOk: imgs.map(i => ({ ok: i.complete && i.naturalWidth > 0, w: i.naturalWidth })),
      gridH: grid ? grid.getBoundingClientRect().height : 0,
    };
  });
  console.log('POSTER layout:', JSON.stringify(info));
  await ppage.screenshot({ path: path.join(OUT, 'opc_poster.png') });
  await pctx.close();
  console.log('Poster PNG saved.');

  // ---- record video ----
  const vctx = await browser.newContext({
    viewport: { width: 1080, height: 1920 },
    deviceScaleFactor: 1,
    recordVideo: { dir: OUT, size: { width: 1080, height: 1920 } },
  });
  const vpage = await vctx.newPage();
  await vpage.goto('file://' + videoPath);
  await vpage.waitForTimeout(7200); // ~7s animation
  await vctx.close();
  console.log('Video recording done.');

  await browser.close();

  // locate webm
  const files = fs.readdirSync(OUT).filter(f => f.endsWith('.webm'));
  files.sort((a, b) => fs.statSync(path.join(OUT, b)).mtimeMs - fs.statSync(path.join(OUT, a)).mtimeMs);
  console.log('WEBM files:', JSON.stringify(files));
})().catch(e => { console.error('ERROR', e); process.exit(1); });
