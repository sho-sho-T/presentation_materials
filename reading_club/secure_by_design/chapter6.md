---
marp: true
paginate: true
style: |
  section {
    background: #ffffff;
    color: #2c3e50;
    font-family: 'Segoe UI', 'Yu Gothic UI', 'Hiragino Kaku Gothic ProN', 'Meiryo', sans-serif;
    padding: 40px;
    box-shadow: inset 0 0 100px rgba(0,0,0,0.05);
    line-height: 1.4;
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
    font-size: 1.8em;
    font-weight: 700;
    margin-bottom: 20px;
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
    font-size: 1.4em;
    font-weight: 600;
    margin: 15px 0 10px 0;
    background: linear-gradient(90deg, #3498db, #e74c3c);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  /* サブタイトル（h3） */
  h3 {
    color: #7f8c8d;
    font-size: 1.1em;
    font-weight: 500;
    margin: 12px 0 8px 0;
  }

  /* 本文 */
  p {
    font-size: 0.9em;
    line-height: 1.5;
    margin: 8px 0;
  }

  /* リスト */
  ul, ol {
    font-size: 0.85em;
    line-height: 1.4;
    margin: 10px 0;
    padding-left: 15px;
  }

  li {
    margin: 4px 0;
    padding: 6px 10px;
    background: #f8f9fa;
    border-left: 3px solid #3498db;
    border-radius: 0 3px 3px 0;
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
    padding: 10px;
    border-radius: 6px;
    border: 1px solid #dee2e6;
    overflow-x: auto;
    margin: 10px 0;
    font-size: 0.7em;
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
    margin: 10px 0;
    background: #ffffff;
    border-radius: 6px;
    overflow: hidden;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    font-size: 0.75em;
  }

  th, td {
    padding: 6px 8px;
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
    font-size: 2.5em;
    margin-bottom: 15px;
    color: white;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
  }

  section.title-slide h1::after {
    background: white;
    width: 150px;
  }

  section.title-slide h2 {
    font-size: 1.3em;
    color: #f0f8ff;
    font-weight: 400;
    margin-top: 20px;
    background: none;
    -webkit-text-fill-color: #f0f8ff;
  }

  section.title-slide p {
    font-size: 1.0em;
    margin-top: 15px;
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
    font-size: 2.8em;
    margin-bottom: 20px;
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
    font-size: 1.1em;
    color: #bdc3c7;
    font-weight: 300;
    margin-top: 15px;
    background: none;
    -webkit-text-fill-color: #bdc3c7;
    z-index: 1;
    position: relative;
  }

  section.section-divider .section-number {
    position: absolute;
    top: 30px;
    right: 30px;
    font-size: 5em;
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
    font-size: 1.0em;
  }

  section.large-text h1 {
    font-size: 2.2em;
  }

  section.large-text h2 {
    font-size: 1.6em;
  }

  /* ハイライト要素 */
  .highlight {
    background: linear-gradient(120deg, #f39c12 0%, #f1c40f 100%);
    color: white;
    padding: 3px 6px;
    border-radius: 3px;
    font-weight: 600;
    font-size: 0.9em;
  }

  .emphasis {
    color: #e74c3c;
    font-weight: 600;
  }

  .note {
    background: #ecf0f1;
    border-left: 3px solid #3498db;
    padding: 6px 10px;
    border-radius: 0 3px 3px 0;
    font-size: 0.75em;
    margin: 8px 0;
  }
---

<!-- タイトルスライド -->
<!-- _class: title-slide -->
<!-- _paginate: false -->

# 状態の完全性（Integrity）の保証
## 〜エンティティを正しく作り、正しく保つ〜

**発表者名** : 松原翔人

---

# ゴール
## この発表で得られるもの


1. **エンティティの状態管理における課題の理解**
2. **段階的なセキュリティ強化手法の習得**（抽象的かも）
3. **実践パターンの使い分けスキル**
4. **明日から使える具体的なコード例**

---

# 目次


1. **なぜ状態管理が重要なのか**
2. **正しい状態のエンティティの作り方**
3. **エンティティの完全性**
4. **総合的な保護戦略**

---

<!-- _class: section-divider -->
<!-- _paginate: false -->

# 問題定義

<div class="section-number">01</div>

---

# DDDにおける状態管理の位置付け

### エンティティ
- 識別性(Identity)を持つ
- ライフサイクルを通じて追跡される（よくわからん）
- ↑ **常に整合性を保つ必要がある** ← 今日のテーマ

<div class="highlight">状態の破綻 = ビズネス価値の毀損</div>

---

# よくある問題シナリオ

- ❌ 空の注文オブジェクトが作られる
- ❌ 支払い済み注文が未払いに戻る
- ❌ 存在しない商品IDで注文作成
- ❌ 負の残高を持つ口座
- ❌ 無効な状態遷移

<div class="emphasis">これらは「防げる」問題</div>

---

# レガシーな「引数なしコンストラクタ」

## 「空っぽの箱を先に作って、後から中身を詰める方式」
###  　　↑使う価値なし

<img src="./imgs/image_1.png" width="600">

---
具体的なソースコード

---
# 状態変化の複雑さ

<img src="./imgs/image_2.png" width="400">

- 各状態で**可能な操作**、**必要な情報**、**ビジネスルール**が変わる

---

# エンティティによる状態管理



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

# 正しいエンティティ作成のアプローチ

| 手法 | 適用ケース | メリット | デメリット |
|------|------|------|----------|
| 必須情報を全てコンストラクタ引数 | シンプルなエンティティ | 確実性 | 引数が多いと複雑 |
| フルーエントインターフェース | 任意フィールドが多い | 可読性 | 複数フィールド制約に対応困難 |
| ビルダーパターン | 複雑な制約あり | 柔軟性 | 実装が複雑 |

<div class="emphasis">目標：作成されるオブジェクトは全てビジネスルールを満たしていることを保証</div>

---

<!-- セクション3の扉 -->
<!-- _class: section-divider -->
<!-- _paginate: false -->

# 実践的な設計パターン
## Practical Design Patterns

<div class="section-number">03</div>

---

# ビルダーパターンの活用

<!-- _class: large-text -->

## 基本的な考え方

1. **複雑な制約をビルダー内で隠蔽**
2. **オブジェクト作成完了まで外部アクセス禁止**  
3. **フルーエントインターフェースとの組み合わせ**

---

# フルーエントインターフェースの特徴

<!-- _class: three-columns -->

## メリット
**可読性の向上**
- 自然言語のようなコード
- メソッドチェーンによる流暢性
- 理解しやすいAPI

## デメリット
**制約の問題**
- コマンド・クエリ分離原則違反
- 複数フィールド制約対応困難
- 不完全な状態の可能性

## 解決策
**ビルダーパターン**
- 複雑な制約の隠蔽
- 完成まで外部アクセス禁止
- 内部クラスでの実装

---

# TypeScriptでのビルダーパターン実装

## Carエンティティの例

```typescript
class Car {
  private constructor(
    private readonly brand: string,
    private readonly isElectric: boolean,
    private readonly engineSize?: number
  ) {
    this.validateInvariants();
  }

  static builder(): CarBuilder {
    return new CarBuilder();
  }

  private validateInvariants(): void {
    if (this.isElectric && this.engineSize) {
      throw new Error('電気自動車にエンジンサイズは設定できません');
    }
  }

  getBrand(): string { return this.brand; }
  isElectricVehicle(): boolean { return this.isElectric; }
  getEngineSize(): number | undefined { return this.engineSize; }
}

class CarBuilder {
  private brand?: string;
  private isElectric: boolean = false;
  private engineSize?: number;

  setBrand(brand: string): CarBuilder {
    this.brand = brand;
    return this;
  }

  setElectric(): CarBuilder {
    this.isElectric = true;
    this.engineSize = undefined; // 電気車はエンジンサイズなし
    return this;
  }

  setEngineSize(size: number): CarBuilder {
    if (this.isElectric) {
      throw new Error('電気自動車にエンジンサイズは設定できません');
    }
    this.engineSize = size;
    return this;
  }

  build(): Car {
    if (!this.brand) {
      throw new Error('ブランドは必須です');
    }
    return new Car(this.brand, this.isElectric, this.engineSize);
  }
}
```

## 期待される効果

- **安全性**: <span class="highlight">不正な状態のオブジェクト作成を防止</span>
- **保守性**: <span class="highlight">制約をコードで明示的に表現</span>
- **可読性**: <span class="highlight">ビジネスルールの可視化</span>

---

<!-- セクション4の扉 -->
<!-- _class: section-divider -->
<!-- _paginate: false -->

# エンティティの完全性保護
## Entity Integrity Protection

<div class="section-number">04</div>

---

# カプセル化と完全性保護

## Getter/Setterの問題点

- ❗ **public setterの危険性**: データフィールドがprivateでも外部から自由に変更可能
- ❗ **ビジネスルールを無視**: 制約をスキップして状態変更
- ❗ **一貫性の破綱**: 状態管理ロジックが分散

## 解決策

- **一方向の変更メソッド**: `setPaid()`ではなく`markPaid()`
- **ドメインプリミティブの活用**: 不変オブジェクトで安全な共有
- **カプセル化**: データとルールを同じ場所で管理

---

# コレクションの完全性保護

<!-- _class: center -->

## コレクションの問題と対策

| **問題** | **危険性** | **対策** | **効果** |
|----------|------------|------------|------------|
| 内部Listを直接返す | 🚫 外部から変更可能 | 読み取り専用ビュー返却 | ✅ 安全性向上 |
| SetterでList一括設定 | 🚫 ビジネスルールスキップ | エンティティ内でのみ操作 | ✅ ルール遵守 |
| 可変オブジェクト共有 | 🚫 意図しない変更 | Collections.unmodifiableList | ✅ 不変性保証 |

---

<!-- セクション5の扉 -->
<!-- _class: section-divider -->
<!-- _paginate: false -->

# まとめ・重要なポイント
## Summary & Key Points

<div class="section-number">05</div>

---

# 状態完全性保証の核心原則

<!-- _class: center -->

## 3つの柱

<div class="highlight">正しい状態での生成 + 完全性の保護 + 適切な設計パターン</div>

### 重要なポイント

1. **エンティティによる状態管理の一元化**
2. **ビジネスルールをコードで表現**
3. **不変条件の維持とカプセル化**

---

# 実践での選択指針

## シンプルなケース

- 必須情報を全てコンストラクタ引数に
- 任意情報はSetterメソッドで設定
- コンストラクタ内でnullチェック実施

## 複雑な制約があるケース

- ビルダーパターンの採用
- 内部クラスでのカプセル化
- フルーエントインターフェースとの組み合わせ

<div class="note">
ビルダーの生存期間は短く、一度のリクエスト内で完結させる
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

# 追加のTypeScriptコード例

## コレクションの安全な取り扱い

```typescript
class Order {
  private orderItems: OrderItem[] = [];

  // 外部に直接Listを渡さない
  getOrderItems(): readonly OrderItem[] {
    return Object.freeze([...this.orderItems]);
  }

  // エンティティ内でのみ操作を許可
  addOrderItem(item: OrderItem): void {
    if (this.orderItems.length >= 10) {
      throw new Error('注文アイテムは10個までです');
    }
    this.orderItems.push(item);
  }

  removeOrderItem(itemId: string): boolean {
    const index = this.orderItems.findIndex(item => item.getId() === itemId);
    if (index >= 0) {
      this.orderItems.splice(index, 1);
      return true;
    }
    return false;
  }

  getTotalAmount(): number {
    return this.orderItems.reduce((sum, item) => sum + item.getPrice(), 0);
  }
}

class OrderItem {
  constructor(
    private readonly id: string,
    private readonly name: string,
    private readonly price: number
  ) {
    if (price <= 0) {
      throw new Error('価格は0より大きい値である必要があります');
    }
  }

  getId(): string { return this.id; }
  getName(): string { return this.name; }
  getPrice(): number { return this.price; }
}
```

<div class="note">
セキュア・バイ・デザイン 第6章「状態の完全性の保証」より
</div>