require('dotenv').config();
module.exports = {
  plugins: [
    {
      resolve: '@opensumi/gatsby-theme',
      options: {
        GATrackingId: 'G-63DR4G0WD7',
        theme: {
          'primary-color': '#9f5fdb'
        },
        pwa: true,
        cname: false,
        codeSplit: true
      }
    }
  ],
  siteMetadata: {
    title: 'OpenSumi',
    description:
      '一款帮助你快速搭建本地和云端 IDE 的框架 - A framework helps you quickly build Cloud or Desktop IDE products.',
    siteUrl: 'https://opensumi.com',
    logo: {
      img:
        'https://img.alicdn.com/imgextra/i2/O1CN01dqjQei1tpbj9z9VPH_!!6000000005951-55-tps-87-78.svg',
      link: 'https://opensumi.com'
    },
    logoUrl:
      'https://img.alicdn.com/imgextra/i2/O1CN01dqjQei1tpbj9z9VPH_!!6000000005951-55-tps-87-78.svg',
    githubUrl: 'https://github.com/opensumi/core',
    docsUrl: 'https://github.com/opensumi/docs',
    navs: [
      {
        slug: 'docs/integrate/overview',
        title: {
          en: 'Documentation',
          zh: '集成文档'
        }
      },
      {
        slug: 'docs/develop/how-to-contribute',
        title: {
          en: 'Development',
          zh: '开发文档'
        }
      }
    ],
    docs: [
      {
        slug: 'integrate/quick-start',
        title: {
          zh: '快速开始',
          en: 'Quick Start'
        },
        order: 1
      },
      {
        slug: 'integrate/universal-integrate-case',
        title: {
          zh: '常见集成场景',
          en: 'Integrate Case'
        },
        order: 2
      },
      {
        slug: 'develop/basic-design',
        title: {
          zh: '基础设计',
          en: 'Basic Design'
        },
        order: 2
      },
      {
        slug: 'develop/module-apis',
        title: {
          zh: '模块 API',
          en: 'Modules API'
        },
        order: 3
      },
      {
        slug: 'develop/sample',
        title: {
          zh: '经典案例',
          en: 'Sample'
        },
        order: 5
      }
    ],
    showDingTalkQRCode: true,
    dingTalkQRCode:
      'https://img.alicdn.com/imgextra/i1/O1CN01k3gCmL1HWPjLchVv7_!!6000000000765-0-tps-200-199.jpg',
    showSearch: false, // 是否展示搜索框
    showChinaMirror: false, // 是否展示国内镜像链接
    showLanguageSwitcher: true, // 用于定义是否展示语言切换
    showGithubCorner: true, // 是否展示角落的 GitHub 图标
    docsearchOptions: {
      appId: 'SOZF8EXD5Z',
      apiKey: '614258d3f6d9bcfde76edcc8e45887af',
      indexName: 'docs'
    },
    redirects: []
  }
};
