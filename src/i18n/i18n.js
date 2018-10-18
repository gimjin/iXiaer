import Vue from 'vue'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)

export default new VueI18n({
  locale: 'en_US', // set local
  messages: {
    en_US: {
      message: {
        welcom: 'Welcome to iXiaer',
        hi: 'Hi I am',
        sison: 'Sison',
        larva: 'Larva',
        sison_describe: 'I recently pretty and looks like a huski.',
        larva_describe: 'My eyes are beautiful, it is golden.'
      }
    },
    zh_CN: {
      message: {
        welcom: '欢迎来到夏尔猫舍',
        hi: '嗨，我叫',
        sison: '西森',
        larva: '拉哇',
        sison_describe: '我最近很漂亮，看起来像个哈士奇。',
        larva_describe: '我的眼睛很漂亮，是金色的。'
      }
    }
  }
})
