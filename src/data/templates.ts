// DesignerForm · 可交互编辑器的模板定义
// LiveEditor 读取这些定义动态渲染表单与实时预览。

export type EditorKind = 'ecom' | 'social' | 'logo'

export interface EditorField {
  key: string
  label: string
  type: 'text' | 'textarea'
  placeholder?: string
}

export interface EditorTemplate {
  id: string
  name: string
  kind: EditorKind
  fields: EditorField[]
  accentOptions: string[]
  defaultAccent: string
  defaults: Record<string, string>
}

export const editorTemplates: EditorTemplate[] = [
  {
    id: 'ed-ecom',
    name: '电商详情页',
    kind: 'ecom',
    accentOptions: ['#ff6b2c', '#e23b5a', '#d63384', '#2f6b4f', '#3a86ff', '#c9a227'],
    defaultAccent: '#ff6b2c',
    defaults: {
      kicker: '春季新品',
      title: '轻氧保湿精华',
      sub: '28 天可见水润透亮，敏肌也能安心用',
      price: '¥199',
    },
    fields: [
      { key: 'kicker', label: '栏目', type: 'text', placeholder: '如：春季新品' },
      { key: 'title', label: '主标题', type: 'text', placeholder: '商品主标题' },
      { key: 'sub', label: '核心卖点', type: 'textarea', placeholder: '一句话卖点' },
      { key: 'price', label: '价格', type: 'text', placeholder: '如：¥199' },
    ],
  },
  {
    id: 'ed-social',
    name: '社媒海报',
    kind: 'social',
    accentOptions: ['#ff2e63', '#ff6b2c', '#3a86ff', '#2f6b4f', '#7a4a2b', '#9b5de5'],
    defaultAccent: '#ff2e63',
    defaults: {
      kicker: '种草日记',
      title: '这杯也太好喝了吧',
      sub: '藏在巷子里的手冲，周末一定要去打卡',
    },
    fields: [
      { key: 'kicker', label: '栏目', type: 'text', placeholder: '如：种草日记' },
      { key: 'title', label: '主标题', type: 'text', placeholder: '海报主标题' },
      { key: 'sub', label: '副文案', type: 'textarea', placeholder: '补充文案' },
    ],
  },
  {
    id: 'ed-logo',
    name: '品牌标识',
    kind: 'logo',
    accentOptions: ['#1c1c1c', '#ff6b2c', '#2f6b4f', '#3a86ff', '#c9a227', '#e23b5a'],
    defaultAccent: '#1c1c1c',
    defaults: {
      word: '墨构',
      tag: 'MO GOU STUDIO',
    },
    fields: [
      { key: 'word', label: '品牌字', type: 'text', placeholder: '如：墨构' },
      { key: 'tag', label: '英文标语', type: 'text', placeholder: '如：MO GOU' },
    ],
  },
]
