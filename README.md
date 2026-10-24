# 若叶睦 · Coopanion 双服装形象包

非官方同人桌宠形象，包含常服与 Mortis 演出服。作者 / 发布者：[Eroalot](https://github.com/Eroalot)。

![演出服](mutsumi-stage.png)

## 安装

1. 在 [Releases](https://github.com/Eroalot/coopanion-mutsumi-figure/releases/latest) 下载 `mutsumi-outfits-v0.2.0.zip`。
2. 打开 Coopanion →「装扮」→「导入」，选择 ZIP。
3. 选择「若叶睦」，在「服装」中切换「常服」或「演出服」。

这是桌宠形象包，不是 npm World 扩展；无需在「扩展」页安装。更新已有本地版本时会提示替换同 ID 的形象包。

## 功能与兼容性

- `manifest: 2` / `api: 2`，形象 ID：`mutsumi-casual`。
- 两套服装即时切换，分别提供睁眼与闭眼画面。
- 复用 Coopanion 的身体动画：呼吸、眨眼、说话口型、走跑、跳跃、点头、摇头、转身、跳舞、拖拽及抛落。
- 坐下表现为身体下沉；睡觉为闭眼、倾斜和 Z 粒子。
- 二维图片驱动动画，非 Live2D；未制作独立坐姿腿部或手指动作。
- 在 Windows、Coopanion v0.2.8 对应的 API 2 动作系统中验证；其他平台尚未实机验证。
- 包内不请求网络、不读取账号或用户文件；依赖宿主提供的 `kit`，不附带宿主代码。

## 已验证

真实浏览器检查覆盖常服与演出服的渲染、左右行走朝向、抵达、跳跃、坐睡、拖拽、销毁、服装切换及不透明源沙箱加载。通过检查不等于所有声明表情均已逐项视觉验收。

## 署名与权利

角色来自 BanG Dream! / Ave Mujica。美术由用户提供的 Q 版参考图生成并编辑；原始参考图不随包分发。此项目不代表角色官方，不宣称取得角色或原始参考图的授权。各类内容的权利范围见 [RIGHTS.md](RIGHTS.md)。

## 官方格式说明

[Coopanion 形象包文档](https://github.com/Pal-AI-Lab/Coopanion/tree/main/packages/cortico-world-desktop-pet#形象包)。
