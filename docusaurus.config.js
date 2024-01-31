
const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: '读心悦',
  tagline: '记录学习，让每天过的慢一点。',
  url: 'https://qingzhuyue.github.io/',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/logo.jpg',
  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'qingzhuyue', // Usually your GitHub org/user name.
  projectName: 'qingzhuyue.github.io',
  trailingSlash: false,
  deploymentBranch: "main",
  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans'],
  },
  plugins: [
    [
      '@docusaurus/plugin-content-blog',
      {
        id: 'second-blog',
        blogSidebarTitle: '全部笔记',
        blogTitle: '技术书籍',
        routeBasePath: 'reading',
        path: './reading',
      }
    ],
    [
      "@docusaurus/plugin-content-blog",
      {
        id: "secret-garden",
        routeBasePath: "lifestyle",
        path: "./lifestyle",
        blogSidebarTitle:"生活随笔"
        // feedOptions: {
        //   type: "all",
        //   title: "",
        //   copyright: `Copyright © ${new Date().getFullYear()}  Built with Docusaurus.<p></p>`,
        // },
      },
    ],
    [
      "@docusaurus/plugin-content-blog",
      {
        id: "secret-java",
        routeBasePath: "java",
        path: "./java",
        blogSidebarTitle:"Java基础",
        blogSidebarCount: 'ALL',
      },
    ],
    [
      "@docusaurus/plugin-content-blog",
      {
        id: "secret-react",
        routeBasePath: "react",
        path: "./react",
        blogSidebarTitle:"react基础",
        blogSidebarCount: 'ALL',
      },
    ],
    [
      "@docusaurus/plugin-content-blog",
      {
        id: "secret-electron",
        routeBasePath: "electron",
        path: "./electron",
        blogSidebarTitle:"electron基础",
        blogSidebarCount: 'ALL',
      },
    ],
    [
      "@docusaurus/plugin-content-blog",
      {
        id: "secret-javascript",
        routeBasePath: "javaScript",
        path: "./javascript",
        blogSidebarTitle:"javascript基础",
        blogSidebarCount: 'ALL',
      },
    ],
    [
      "@docusaurus/plugin-content-blog",
      {
        id: "secret-css",
        routeBasePath: "css",
        path: "./css",
        blogSidebarTitle:"css基础",
        blogSidebarCount: 'ALL',
      },
    ],
  ],
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        blog: {
          path: './blog',
          routeBasePath: "/",
          blogTitle: '博客',
          blogSidebarTitle: '全部博文',
          editUrl:
            'https://github.com/qingzhuyue/blog/blob/main',
          postsPerPage: 5,
          showReadingTime: true,
          readingTime: ({ content, defaultReadingTime }) =>
            defaultReadingTime({ content, options: { wordsPerMinute: 100 } }),
          blogSidebarCount: "ALL",
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],
  // scripts: [
  //   {
  //     src:
  //       'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3022505615683714',
  //     defer: true,
  //     crossorigin: "anonymous",
  //     async:true
  //   },
  // ],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      announcementBar: {
        id: 'support_us',
        content: '⭐️ 如果这个网站能帮助到你，欢迎给一个star支持作者  <a target="_blank" rel="noopener noreferrer" href="https://github.com/qingzhuyue/blog">GitHub</a>',
        backgroundColor: '#fafbfc',
        textColor: '#091E42',
        isCloseable: true,
      },
      metadata: [{ name: "baidu-site-verification", content: "codeva-72M8DxG1za" }, {
        name: "keywords",
        content:
          "前端, react, javascript, css, react, vue, typescript, 博客，阅读，悦读,读心悦",
      },],
      algolia: {
        // Algolia 提供的应用 ID
        appId: '6SSMX931TK',
        //  公开 API 密钥：提交它没有危险
        apiKey: 'db3dc38dca391023decfec5d24b357c6',
        indexName: 'duxinyuesio',
        contextualSearch: true,
      },
      giscus: {
        repo: 'qingzhuyue/blog',
        repoId: 'MDEwOlJlcG9zaXRvcnkzNDEwOTE2NTg=',
        category: 'Announcements',
        categoryId: 'DIC_kwDOFFSlSs4CUZ-A',
        theme: 'light_high_contrast',
        darkTheme: 'dark_tritanopia',
        lang: "zh-CN",
        loading: "lazy",
        crossorigin: "anonymous",
        mapping: "title",
      },
      navbar: {
        title: '读心悦',
        logo: {
          alt: '读心悦',
          src: 'img/logo.jpg',
        },
        // hideOnScroll: true,
        items: [
          {
            to: "/",
            label: "首页",
            position: "right",
            items: [
              {
                label: "随笔",
                to: "lifestyle",
              },
            ],
          },
          {
            label: "后端",
            position: "right",
            to: "/java",
            items: [
              {
                label: "Java",
                to: "java",
              },
            ],
          },

          {
            // type: "dropdown",
            position: 'right',
            label: '前端',
            items: [
              {
                // type: "doc",
                label: "React",
                // docId: 'react/react',
                // to: 'docs/react/react',
                to: 'react',
              },
              {
                // type: "doc",
                label: "Electron",
                // docId: 'electron/electron',
                // to: 'docs/electron/electron',
                to: 'electron'
              },
              {
                // type: "doc",
                label: "CSS",
                // docId: 'electron/electron',
                // to: 'docs/electron/electron',
                to: 'css'
              },
              {
                // type: "doc",
                label: "JavaScript",
                // docId: 'electron/electron',
                // to: 'docs/electron/electron',
                to: 'javaScript'
              },
            ],
          },

          {
            to: '/reading',
            label: '技术书籍',
            position: 'right',
          },
          // {
          //   href: 'https://github.com/qingzhuyue/blog',
          //   label: 'GitHub',
          //   position: 'right',
          // },
        ],
      },
      // footer: {
      //   style: 'dark',
      //   links: [
      //     // {
      //     //   title: 'Docs',
      //     //   items: [
      //     //     {
      //     //       label: 'Tutorial',
      //     //       to: '/docs/intro',
      //     //     },
      //     //   ],
      //     // },
      //     // {
      //     //   title: 'Community',
      //     //   items: [
      //     //     {
      //     //       label: 'Stack Overflow',
      //     //       href: 'https://stackoverflow.com/questions/tagged/docusaurus',
      //     //     },
      //     //     {
      //     //       label: 'Discord',
      //     //       href: 'https://discordapp.com/invite/docusaurus',
      //     //     },
      //     //     {
      //     //       label: 'Twitter',
      //     //       href: 'https://twitter.com/docusaurus',
      //     //     },
      //     //   ],
      //     // },
      //     // {
      //     //   title: 'More',
      //     //   items: [
      //     //     {
      //     //       label: 'Blog',
      //     //       to: '/blog',
      //     //     },
      //     //     {
      //     //       label: 'GitHub',
      //     //       href: 'https://github.com/qingzhuyue/docusaurus',
      //     //     },
      //     //   ],
      //     // },
      //   ],
      //   copyright: `Copyright © ${new Date().getFullYear()} 读心悦, Inc. Built with Docusaurus.`,
      // },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
  clientModules: [require.resolve('./src/clientModules/routeModules.ts')]
};

module.exports = config;
