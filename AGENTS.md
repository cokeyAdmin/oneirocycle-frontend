# 环梦篇章 AIGC 前端

- 本轮初始化任务 CAR-6；首页 CAR-5 属于后续范围。
- 使用已有全局 GSD / telegram-gsd-workflow，不安装另一套工作流。
- 先读 .planning/STATE.md、需求及阶段计划，区分已实现、待接入和待批准。
- 开发前关联 Linear；Hermes 是 Linear 唯一写入方。Codex 在 .planning/events.jsonl 回传任务编号及证据，不绕过 MCP 拒绝。
- 产品页面实现前读取对应 Stitch/Figma/图片或已批准规范；缺失才询问“是否遗漏了 UI 设计？”。工程和文档不需要页面设计。
- API 以批准 OpenAPI 为准。当前只有端口接口和未配置适配，不猜 URL 或伪造任务成功。
- 业务操作使用共享命令；不可让 Agent 靠 DOM 操作执行业务。
- 保持严格类型与状态分层；不要从普通入口导入画布/3D。
- npm run check、npm run build；不提交秘密。
- 未授权不得创建远程、推送、合并或部署，不修改后端独立仓库。
