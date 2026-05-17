const form = document.getElementById('copy-form');
const outputPanel = document.getElementById('output-panel');
const result = document.getElementById('result');
const demoFillBtn = document.getElementById('demo-fill');
const resetFormBtn = document.getElementById('reset-form');
const copyAllBtn = document.getElementById('copy-all');

let latestContent = '';

function createLines(input) {
  const { productName, coreFeature, targetUser, productType, useCase } = input;

  return {
    oneLiners: [
      `有些东西一旦体验过，你会慢慢离不开 ${productName}。`,
      `最狠的不是${coreFeature}，是你开始被当成会做品牌的人。`,
      `很多人还没意识到，${targetUser} 的下一轮差距，已经从产品变成表达。`,
      `原来这才是${productType}该有的样子：不吵，但差别真的会很明显。`,
      `在 ${useCase} 里，真正离谱的是同样的货，气质可以完全不同。`
    ],
    hooks: [
      '你以为大家在拼价格？', '真正厉害的是，客户会先记住你。', '最夸张的不是功能，是气质上去了。',
      '很多人还没意识到，流量已经在挑“高级感”。', `已经有人开始用 ${productName} 抢先一整季。`,
      '用了之后很难回去，真的。', '有些差距，看一眼就知道。', '最狠的不是省事，是你更像品牌了。',
      '你会慢慢离不开这种“被看见”的感觉。', '同一个产品，为什么别人看起来更值钱？'
    ],
    script: `你以为 ${productType} 只是把${coreFeature}做得更快。

真正厉害的是，它让 ${targetUser} 在 ${useCase} 里，看起来更像“已经跑在前面的人”。

最夸张的不是效率提升，而是同样的产品，表达方式一变，用户对你价值的判断就会变。

很多人还没意识到：现在的竞争，不只是卖什么，而是谁先把“高级感”做成默认。

已经有人开始这么做了。用了之后很难回去。

因为有些东西一旦体验过，差别真的会很明显。`,
    xhs: `最近把 ${productName} 用在日常上新里，我才发现以前不是产品不行，是表达方式太“普通”。

我最喜欢它的一点是：不需要用力解释，画面和语气本身就会让人觉得你更专业。

而且它不是那种浮夸的“硬广感”，是很克制、很干净的高级。

现在再回头看以前的内容，真的会有一种“原来这才是差别”的感觉。`,
    desire: [
      '核心欲望：从“卖货的人”升级为“有审美的品牌操盘者”。',
      `身份感：让 ${targetUser} 被看作懂趋势、会表达、会定价的人。`,
      '情绪价值：减少内容焦虑，获得“我终于像专业团队”的笃定感。',
      '社交价值：在同行与用户视角里，形成更高级、更可信、更愿意被推荐的形象。'
    ]
  };
}

function renderBlock(title, content) {
  const wrap = document.createElement('div');
  wrap.className = 'output-block';
  const h3 = document.createElement('h3');
  h3.textContent = title;
  wrap.appendChild(h3);
  if (Array.isArray(content)) {
    const list = document.createElement('ul');
    content.forEach((item) => {
      const li = document.createElement('li');
      li.textContent = item;
      list.appendChild(li);
    });
    wrap.appendChild(list);
  } else {
    const p = document.createElement('div');
    p.className = 'long-copy';
    p.textContent = content;
    wrap.appendChild(p);
  }
  return wrap;
}

function showToast(text) {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = text;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 1500);
}

function stringifyResult(data) {
  return [
    '1) 一句话高张力卖点', ...data.oneLiners,
    '\n2) 抖音 3 秒钩子', ...data.hooks,
    '\n3) 高张力短视频口播文案', data.script,
    '\n4) 小红书风格文案', data.xhs,
    '\n5) 用户欲望拆解', ...data.desire
  ].join('\n');
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const input = Object.fromEntries(new FormData(form).entries());
  const data = createLines(input);
  latestContent = stringifyResult(data);

  result.innerHTML = '';
  result.appendChild(renderBlock('1) 一句话高张力卖点（5条）', data.oneLiners));
  result.appendChild(renderBlock('2) 抖音 3 秒钩子（10条）', data.hooks));
  result.appendChild(renderBlock('3) 高张力短视频口播文案（1条）', data.script));
  result.appendChild(renderBlock('4) 小红书风格文案（1条）', data.xhs));
  result.appendChild(renderBlock('5) 用户欲望拆解', data.desire));

  outputPanel.hidden = false;
  outputPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

demoFillBtn.addEventListener('click', () => {
  form.elements.productName.value = 'AI商业摄影';
  form.elements.productType.value = 'AI SaaS';
  form.elements.targetUser.value = '电商卖家';
  form.elements.useCase.value = '淘宝 / 抖音 / 小红书商品展示';
  form.elements.coreFeature.value = '上传商品图自动生成商业级大片';
});

resetFormBtn.addEventListener('click', () => {
  form.reset();
  outputPanel.hidden = true;
  result.innerHTML = '';
  latestContent = '';
});

copyAllBtn.addEventListener('click', async () => {
  if (!latestContent) {
    showToast('请先生成文案');
    return;
  }
  await navigator.clipboard.writeText(latestContent);
  showToast('已复制全部文案');
});
