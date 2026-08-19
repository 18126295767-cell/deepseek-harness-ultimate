# 可复现安装教程

本仓库是插件安装配置，不是第三方源码的分叉。它会把清单中固定提交的上游组件获取到
本地 DSH 配置目录，并将凭据留在仓库之外。

## 环境要求

- Node.js 22 或更高版本
- Git
- 单独安装的 DeepSeek Harness 运行时
- 能访问清单中公开 GitHub 仓库的网络

## 安装精选默认集合

```bash
node scripts/audit-manifest.mjs
node scripts/install-ultimate.mjs \
  --profile-dir "$HOME/.dsh/profiles/ultimate"
```

安装器使用 `profile/manifest.json` 中的提交固定 GitHub 归档地址，以 `--ignore-scripts` 运行 npm，
只写入指定配置目录。它不会读取或传输 API 密钥、电话号码、邮箱、浏览器会话或私有文件。

## 添加可选集成

可选组件可能需要凭据、账号授权或操作系统权限。请先阅读 `COMPONENTS.md`，再显式启用：

```bash
node scripts/install-ultimate.mjs \
  --profile-dir "$HOME/.dsh/profiles/ultimate" \
  --include-optional
```

只选择一个插件：

```bash
node scripts/install-ultimate.mjs \
  --profile-dir "$HOME/.dsh/profiles/ultimate" \
  --include dsh-notifier
```

## 配置 DSH

请根据本地 DSH 运行时支持的配置机制，让它使用生成的 profile。模型供应商地址和 API
密钥应放在本地运行时的密钥存储或环境变量中，绝不要写入本仓库。

## 验证与复现

审计脚本应报告组件数量和允许的许可证。使用相同清单提交值的全新克隆应产生相同的依赖
请求。请在配置目录执行 `npm ls --depth=0`，并将 `COMPONENTS.json` 与
`profile/manifest.json` 对照。

## 许可证

安装器和清单采用 MIT 许可证。获取的插件仍受其上游许可证约束。再次分发安装后的配置时
必须保留对应声明；不得把上游代码改称 MIT 或“非商用”许可证。
