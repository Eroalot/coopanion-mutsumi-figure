# 若叶睦 · Coopanion 三服装形象包

非官方同人桌宠形象，包含常服、Mortis 演出服和深蓝格纹裙。维护 / 发布：[Eroalot](https://github.com/Eroalot)。

![深蓝格纹裙](mutsumi-navy.png)

## 安装与更新

1. 在 [Releases](https://github.com/Eroalot/coopanion-mutsumi-figure/releases/latest) 下载 `mutsumi-outfits-v0.3.0.zip`。
2. 打开 Coopanion →「装扮」→「导入」，选择 ZIP。
3. 已有若叶睦时确认替换同 ID 形象包；再选择「若叶睦」，在「服装」中切换三套服装。

这是 API 2 形象包，不是 npm World 扩展。聊天连接与人设由接收者在 Coopanion 中配置，包内不含账号或聊天设置。

## 功能与兼容性

- `manifest: 2` / `api: 2`，形象 ID：`mutsumi-casual`，版本 0.3.0。
- 三套服装即时切换，各自提供睁眼与闭眼素材；眨眼只替换头部，服装保持稳定。
- 保留呼吸、眨眼、说话口型、走跑、跳跃、点头、摇头、转身、跳舞、拖拽及抛落等宿主动作。
- 恢复得意 smug、嘟嘴 pout、认真 determined、害怕 scared、期待 excited、招手 wave、扑腾 flap，共 37 个表情与动作词。
- 招手与扑腾使用框架的整体摇摆和小跳，没有独立手臂动画。坐下通过身体下沉和压缩表现；睡觉为闭眼、倾斜和 Z 粒子。
- 二维插画驱动动画，非 Live2D；没有独立坐姿腿部或逐指动画。
- 在 Windows、Coopanion 0.2.12 的 API 2 动作系统中验证；其他平台尚未实机验证。
- 包内不请求网络、不读取账号或用户文件，运行依赖宿主提供的 kit，不附带宿主实现。

## 验证范围

独立浏览器使用真实 kit 检查三套服装的新增表情、招手/扑腾及回到待机；检查左右移动、抵达、睡眠、说话、销毁，以及官方不透明源 CSP 沙箱加载与持续出帧。三套服装表情截图已目视检查。通过检查不等于所有旧词均逐项视觉验收。

## 署名与权利

角色来自 BanG Dream! / Ave Mujica。美术按用户参考图用 AI 图像工具生成并编辑，原始参考图不随包分发。项目不代表角色官方，不宣称取得角色或参考图授权；见 [RIGHTS.md](RIGHTS.md)。

[更新记录](CHANGELOG.md) · [Coopanion 官方形象包说明](https://github.com/Pal-AI-Lab/Coopanion/tree/main/packages/cortico-world-desktop-pet#形象包)
