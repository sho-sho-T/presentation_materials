---
marp: true
paginate: true
style: |
  section {
    background: #ffffff;
    color: #2c3e50;
    font-family: 'Segoe UI', 'Yu Gothic UI', 'Hiragino Kaku Gothic ProN', 'Meiryo', sans-serif;
    padding: 60px;
    box-shadow: inset 0 0 100px rgba(0,0,0,0.05);
    line-height: 1.6;
  }

  /* ページ番号のスタイル */
  section::after {
    color: #7f8c8d;
    font-size: 0.9em;
    font-weight: 500;
  }

  /* メインタイトル（h1） */
  h1 {
    color: #2c3e50;
    font-size: 2.5em;
    font-weight: 700;
    margin-bottom: 30px;
    text-align: center;
    position: relative;
  }

  h1::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 4px;
    background: linear-gradient(90deg, #3498db, #e74c3c);
    border-radius: 2px;
  }

  /* セクションタイトル（h2） */
  h2 {
    color: #34495e;
    font-size: 2em;
    font-weight: 600;
    margin: 25px 0 20px 0;
    background: linear-gradient(90deg, #3498db, #e74c3c);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  /* サブタイトル（h3） */
  h3 {
    color: #7f8c8d;
    font-size: 1.4em;
    font-weight: 500;
    margin: 20px 0 15px 0;
  }

  /* 本文 */
  p {
    font-size: 1.1em;
    line-height: 1.8;
    margin: 15px 0;
  }

  /* リスト */
  ul, ol {
    font-size: 1.1em;
    line-height: 1.8;
    margin: 20px 0;
    padding-left: 20px;
  }

  li {
    margin: 8px 0;
    padding: 8px 15px;
    background: #f8f9fa;
    border-left: 4px solid #3498db;
    border-radius: 0 5px 5px 0;
    list-style: none;
  }

  /* コードブロック */
  code {
    background: #f8f9fa;
    color: #e74c3c;
    padding: 3px 8px;
    border-radius: 4px;
    border: 1px solid #dee2e6;
    font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
  }

  pre {
    background: #f8f9fa;
    padding: 20px;
    border-radius: 8px;
    border: 1px solid #dee2e6;
    overflow-x: auto;
    margin: 20px 0;
  }

  /* 引用 */
  blockquote {
    border-left: 4px solid #3498db;
    padding: 15px 20px;
    margin: 20px 0;
    background: #f8f9fa;
    font-style: italic;
    border-radius: 0 5px 5px 0;
  }

  /* テーブル */
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0;
    background: #ffffff;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }

  th, td {
    padding: 12px 15px;
    text-align: left;
    border-bottom: 1px solid #dee2e6;
  }

  th {
    background: #f8f9fa;
    font-weight: 600;
    color: #2c3e50;
  }

  tr:hover {
    background: #f8f9fa;
  }

  /* 画像 */
  img {
    max-width: 100%;
    height: auto;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    margin: 20px auto;
    display: block;
  }

  /* タイトルスライド */
  section.title-slide {
    justify-content: center;
    align-items: center;
    text-align: center;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
  }

  section.title-slide h1 {
    font-size: 3.5em;
    margin-bottom: 20px;
    color: white;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
  }

  section.title-slide h1::after {
    background: white;
    width: 150px;
  }

  section.title-slide h2 {
    font-size: 1.8em;
    color: #f0f8ff;
    font-weight: 400;
    margin-top: 30px;
    background: none;
    -webkit-text-fill-color: #f0f8ff;
  }

  section.title-slide p {
    font-size: 1.3em;
    margin-top: 20px;
    color: #e6f3ff;
  }

  /* セクション扉スライド */
  section.section-divider {
    justify-content: center;
    align-items: center;
    text-align: center;
    background: linear-gradient(45deg, #2c3e50 0%, #34495e 50%, #2c3e50 100%);
    color: white;
    position: relative;
    overflow: hidden;
  }

  section.section-divider::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(45deg, transparent 40%, rgba(255,255,255,0.05) 50%, transparent 60%);
    animation: shine 3s ease-in-out infinite;
  }

  @keyframes shine {
    0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
    100% { transform: translateX(100%) translateY(100%) rotate(45deg); }
  }

  section.section-divider h1 {
    font-size: 4em;
    margin-bottom: 30px;
    color: white;
    text-shadow: 3px 3px 6px rgba(0,0,0,0.4);
    z-index: 1;
    position: relative;
  }

  section.section-divider h1::after {
    background: linear-gradient(90deg, #3498db, #e74c3c, #f39c12);
    width: 200px;
    height: 6px;
  }

  section.section-divider h2 {
    font-size: 1.5em;
    color: #bdc3c7;
    font-weight: 300;
    margin-top: 20px;
    background: none;
    -webkit-text-fill-color: #bdc3c7;
    z-index: 1;
    position: relative;
  }

  section.section-divider .section-number {
    position: absolute;
    top: 50px;
    right: 50px;
    font-size: 8em;
    font-weight: 900;
    color: rgba(255,255,255,0.1);
    z-index: 0;
  }

  /* 中央揃えスライド */
  section.center {
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  /* 2カラムレイアウト */
  section.two-columns {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
    align-items: start;
  }

  section.two-columns h1 {
    grid-column: 1 / -1;
    text-align: center;
  }

  /* 3カラムレイアウト */
  section.three-columns {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 30px;
    align-items: start;
  }

  section.three-columns h1 {
    grid-column: 1 / -1;
    text-align: center;
  }

  /* 大きめのテキスト用 */
  section.large-text {
    font-size: 1.3em;
  }

  section.large-text h1 {
    font-size: 3em;
  }

  section.large-text h2 {
    font-size: 2.3em;
  }

  /* ハイライト要素 */
  .highlight {
    background: linear-gradient(120deg, #f39c12 0%, #f1c40f 100%);
    color: white;
    padding: 5px 10px;
    border-radius: 5px;
    font-weight: 600;
  }

  .emphasis {
    color: #e74c3c;
    font-weight: 600;
  }

  .note {
    background: #ecf0f1;
    border-left: 4px solid #3498db;
    padding: 10px 15px;
    border-radius: 0 5px 5px 0;
    font-size: 0.9em;
    margin: 15px 0;
  }
---

<!-- タイトルスライド -->
<!-- _class: title-slide -->
<!-- _paginate: false -->

## 状態の完全性(integrity)の保証

**発表者名** : 松原翔人

---

<!-- 目次スライド -->
# 目次

1. **はじめに**
2. **背景・課題**
3. **提案・解決策**
4. **結果・効果**
5. **まとめ・今後の展望**

---

<!-- セクション1の扉 -->
<!-- _class: section-divider -->
<!-- _paginate: false -->

# はじめに
## Introduction

<div class="section-number">01</div>

---

<!-- セクション1の内容 -->
# プロジェクトの概要

## 背景

- **課題の発見**: 現状分析により明らかになった問題点
- **目的の設定**: 解決すべき具体的な目標
- **アプローチ**: 採用した手法とその理由

## 重要なポイント

<div class="highlight">重要な情報はハイライトで強調</div>

<div class="note">
補足説明や注意事項はノートボックスで表示
</div>

---

# 詳細な分析結果

<!-- _class: two-columns -->

## 定量分析

- 数値データに基づく分析
- 統計的な有意性の確認
- トレンドの把握と予測

## 定性分析

- ユーザーインタビュー結果
- 観察による洞察
- 専門家の意見

---

<!-- セクション2の扉 -->
<!-- _class: section-divider -->
<!-- _paginate: false -->

# 背景・課題
## Background & Issues

<div class="section-number">02</div>

---

# 現状の課題

## 主要な問題点

1. **効率性の低下**
   - 作業時間の増加
   - リソースの無駄遣い

2. **品質の問題**
   - エラー率の増加
   - 顧客満足度の低下

3. **コスト面の課題**
   - 運用コストの増大
   - ROIの悪化

---

# 課題の詳細分析

| 項目 | 現状 | 目標 | ギャップ |
|------|------|------|----------|
| 処理時間 | 120分 | 60分 | -50% |
| エラー率 | 5.2% | 1.0% | -4.2% |
| コスト | ¥1,200万 | ¥800万 | -¥400万 |

<div class="emphasis">重要：すべての指標で改善が必要</div>

---

<!-- セクション3の扉 -->
<!-- _class: section-divider -->
<!-- _paginate: false -->

# 提案・解決策
## Proposal & Solutions

<div class="section-number">03</div>

---

# 解決策の概要

<!-- _class: large-text -->

## 3つの柱

1. **プロセスの自動化**
2. **品質管理の強化**  
3. **コスト最適化**

---

# 実装計画

<!-- _class: three-columns -->

## フェーズ1
**基盤構築**
- システム設計
- 要件定義
- 開発環境構築

## フェーズ2
**機能開発**
- 核心機能の実装
- テスト実施
- 性能最適化

## フェーズ3
**展開・運用**
- 本格運用開始
- 効果測定
- 継続改善

---

# 技術的アプローチ

## 採用技術

```python
# サンプルコード例
def process_optimization():
    """プロセス最適化の実装例"""
    efficiency = calculate_efficiency()
    if efficiency < threshold:
        apply_automation()
    return optimized_result
```

## 期待される効果

- **処理速度**: <span class="highlight">50%向上</span>
- **精度**: <span class="highlight">95%以上</span>
- **コスト削減**: <span class="highlight">30%減</span>

---

<!-- セクション4の扉 -->
<!-- _class: section-divider -->
<!-- _paginate: false -->

# 結果・効果
## Results & Impact

<div class="section-number">04</div>

---

# 実装結果

## 定量的成果

- ✅ **処理時間**: 120分 → 58分（52%改善）
- ✅ **エラー率**: 5.2% → 0.8%（85%改善）
- ✅ **運用コスト**: ¥1,200万 → ¥780万（35%削減）

## 定性的成果

- **チーム満足度の向上**
- **顧客からの評価改善**
- **業務の標準化推進**

---

# 成果の可視化

<!-- _class: center -->

## Before vs After

| **指標** | **導入前** | **導入後** | **改善率** |
|----------|------------|------------|------------|
| 効率性 | 📊 ▓▓▓░░ | 📊 ▓▓▓▓▓ | +40% |
| 品質 | 📊 ▓▓░░░ | 📊 ▓▓▓▓░ | +80% |
| 満足度 | 📊 ▓▓▓░░ | 📊 ▓▓▓▓▓ | +67% |

---

<!-- セクション5の扉 -->
<!-- _class: section-divider -->
<!-- _paginate: false -->

# まとめ・今後の展望
## Summary & Future Vision

<div class="section-number">05</div>

---

# 主要な成果

<!-- _class: center -->

## プロジェクトの成功要因

<div class="highlight">適切な計画 + 段階的実装 + 継続的改善</div>

### 学んだ教訓

1. **ステークホルダーとの密な連携**
2. **データドリブンな意思決定**
3. **柔軟性を保った実装**

---

# 今後の展望

## 短期的な計画（3-6ヶ月）

- 追加機能の開発
- 他部署への展開検討
- 効果測定の継続

## 長期的なビジョン（1-2年）

- 全社展開の実現
- 新技術の導入検討
- 業界標準化への貢献

<div class="note">
継続的な改善とイノベーションが成功の鍵
</div>

---

<!-- 終了スライド -->
<!-- _class: title-slide -->
<!-- _paginate: false -->

# ありがとうございました

## ご質問・ご討議

**Contact Information**  
📧 email@example.com  
📱 000-0000-0000

---

<!-- 補足資料の扉（必要に応じて） -->
<!-- _class: section-divider -->
<!-- _paginate: false -->

# 補足資料
## Appendix

<div class="section-number">APP</div>

---

# 参考文献・データソース

## 文献

1. 研究論文タイトル（著者名、年）
2. 業界レポート（発行機関、年）
3. 技術文書（組織名、年）

## データソース

- 社内データベース
- 業界統計
- 公開データセット

<div class="note">
すべての数値とグラフは2025年7月時点のデータに基づく
</div>