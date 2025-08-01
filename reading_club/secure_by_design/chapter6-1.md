---
marp: true
paginate: true
---

# セキュア・バイ・デザイン 第6章
## 状態の完全性(integrity)の保証

**発表者名** : 松原翔人

---

# 目次

1. **状態の変化とエンティティを使った状態管理**
2. **正しい状態で生成されるエンティティ**
3. **エンティティの完全性（Integrity）**

---

# 🔥 第1部: 問題提起

---

## 状態管理の重要性
### 🎯 DDDにおける状態管理の位置づけ

**エンティティ = ドメインの核心概念**
```
├── アイデンティティを持つ
├── ライフサイクルを通じて追跡される
└── 📍 常に整合性を保つ必要がある ← 今日のテーマ
```

**状態の破綻 = ビジネス価値の毀損**

---

## よくある問題シナリオ
### 🚨 現実でよく見る問題

❌ 空の注文オブジェクトが作られる  
❌ 支払い済み注文が未払いに戻る  
❌ 存在しない商品IDで注文作成  
❌ 負の残高を持つ口座  
❌ 無効な状態遷移  

→ これらは「防げる」問題です

---

## 従来のアプローチの限界
### 🏚️ よくある（危険な）実装パターン

```typescript
// 引数なしコンストラクタ + Setter地獄
Order order = new Order();
order.setCustomerId("123");
order.setAmount(1000);
// ↑ setItemsを忘れがち...

// 結果：不完全なオブジェクトが生まれる
```

---

## 状態変化の複雑さ
### 📊 荷物管理システムの例

**[受取] → [検査] → [荷下ろし] → [配送]**

各状態で：
• 可能な操作が変わる
• 必要な情報が変わる  
• ビジネスルールが変わる

→ この複雑さをどう管理する？

---

## エンティティによる状態管理
### 💡 DDDの解決アプローチ

**状態変化をエンティティでモデリング**
```
├── 状態についての理解
├── 状態変化のルール  
└── 変化の制御
```
**を同じ場所で管理 → カプセル化の威力**

---

## 2つの完全性
### 🛡️ 今日扱う2つの完全性

**1️⃣ 作成時の完全性**  
   「正しい状態で生まれる」

**2️⃣ 実行時の完全性**  
   「正しい状態を維持する」

→ 両方が揃って初めて安全

---

# エンティティを使った状態の管理

---

## システムにとっての中心となる関心事
- **状態の変化**に伴いシステムの**振る舞いがどう変わるか**
- 状態の変化を把握、**全ての変化に対して適切なルールが適用されることを保証**（**必須**）

## DDDのエンティティとしてモデリング

- **状態の変化をDDDのエンティティとしてモデリングすること**が良い
- エンティティ
  - 変わることのない識別性（Identity）
  - 生存期間中、何度も状態が変わる
- 状態の変化を扱うのは**エンティティ**が**最適**

---

## エンティティによるモデリング（効果的）

- **状態変化→エンティティが扱うようモデリング**する
- メリット
  - **状態についての理解**
  - **その状態がどのように変わるのか**
  - を**同じ場所で収集**できる

---

# 🔧 第2部: 正しい初期状態の作り方

---

## 4つのアプローチ概観
### 🏗️ 正しい初期状態を作る4つの方法

**1️⃣ 必須情報をコンストラクタで（基本）**  
**2️⃣ フルーエント・インターフェース（可読性）**  
**3️⃣ ビルダー・パターン（複雑性対応）**  
**4️⃣ 複合アプローチ（実際の選択）**

→ 段階的に複雑さに対応

---

## アプローチ1 - コンストラクタ注入
### ✅ パターン1: 必須情報をコンストラクタで

```typescript
class Order {
  constructor(
    customerId: string,
    amount: number,
    items: OrderItem[]
  ) {
    if (!customerId) throw new Error("顧客ID必須");
    if (amount <= 0) throw new Error("金額は正の値");
    // 即座にビジネスルールを適用
  }
}
```

**メリット: シンプル、確実、高速**

---

## コンストラクタ注入の特徴
### 📊 コンストラクタ注入の評価

**✅ メリット**
• 学習コスト低
• 実装が簡単
• コンパイル時チェック
• パフォーマンス良好

**⚠️ 制約**
• 引数が多いと複雑
• 任意項目の扱いが難しい
• 柔軟性に限界

**適用場面: 必須項目のみ、シンプルな制約**

---

## アプローチ2 - フルーエント・インターフェース
### ✅ パターン2: フルーエント・インターフェース

```typescript
const order = new OrderBuilder()
  .withCustomer("CUST-123")
  .withAmount(15000)
  .withPriority("high")
  .withDeliveryDate(tomorrow)
  .build();
```

**メリット: 可読性、自然言語的、段階的構築**

---

## フルーエント実装例

```typescript
class OrderBuilder {
  private order: Partial<Order> = {};
  
  withCustomer(id: string): OrderBuilder {
    this.order.customerId = id;
    return this; // 自身を返してチェーン可能に
  }
  
  withAmount(amount: number): OrderBuilder {
    this.order.amount = amount;
    return this;
  }
  
  build(): Order {
    // 最終検証してからオブジェクト作成
    this.validateRequired();
    return new Order(this.order);
  }
}
```

---

## フルーエントの特徴
### 📊 フルーエント・インターフェースの評価

**✅ メリット**
• 高い可読性
• 自然な記述
• 段階的な構築
• 任意項目に強い

**⚠️ 制約**  
• 実装コスト中程度
• コマンド・クエリ分離違反
• 複雑な制約に限界

**適用場面: 任意項目多数、単純な制約**

---

## アプローチ3 - ビルダー・パターン
### ✅ パターン3: ビルダー・パターン

```typescript
// 複雑な制約例：車の設定
const car = new CarBuilder()
  .electric()        // 電気自動車選択
  .withAWD()        // AWD設定
  .withBattery(100) // バッテリー容量
  .build();         // エンジンサイズは自動で除外
```

**複雑な相互依存関係を内部で制御**

---

## ビルダー実装例

```typescript
class CarBuilder {
  private carType?: 'electric' | 'gasoline';
  private engineSize?: number;
  private batteryCapacity?: number;
  
  electric(): CarBuilder {
    this.carType = 'electric';
    this.engineSize = undefined; // 自動でエンジン除外
    return this;
  }
  
  gasoline(engineSize: number): CarBuilder {
    this.carType = 'gasoline';
    this.engineSize = engineSize;
    this.batteryCapacity = undefined; // バッテリー除外
    return this;
  }
  
  build(): Car {
    this.validateConstraints(); // 複雑な制約チェック
    return new Car(this.carType!, this.engineSize, this.batteryCapacity);
  }
}
```

---

## ビルダーの特徴
### 📊 ビルダー・パターンの評価

**✅ メリット**
• 複雑な制約に対応
• 段階的検証
• 高い型安全性
• 変更の局所化

**⚠️ 制約**
• 実装コスト高
• 学習コスト高
• オーバーヘッド

**適用場面: 複雑な相互依存、段階的構築必要**

---

## パターン選択指針
### 🎯 どのパターンを選ぶべきか？

| 条件 | 推奨パターン | 理由 |
|------|-------------|------|
| 必須のみ・単純 | コンストラクタ | シンプル |
| 任意多数・制約少 | フルーエント | 可読性 |
| 複雑な相互依存 | ビルダー | 制約管理 |
| チーム習熟度低 | コンストラクタ | 学習コスト |

---

## O/Rマッパーとの関係
### 🗄️ データベースとの関係

**問題: O/Rマッパーが引数なしコンストラクタを要求**

**解決策: ドメインモデルと永続層モデルを分離**

```typescript
// 永続層モデル（O/R用）
class OrderEntity {
  constructor() {} // フレームワーク用
}

// ドメインモデル（ビジネス用）  
class Order {
  constructor(customerId: string, amount: number) {
    // ビジネスルール適用
  }
}
```

---

## 実装パターンまとめ
### 📋 初期状態保証パターンまとめ

**共通ゴール:**  
「作成されるオブジェクトは全てビジネスルールを満たす」

**段階的適用:**
1️⃣ まずコンストラクタ注入で基礎固め  
2️⃣ 任意項目が増えたらフルーエント検討  
3️⃣ 制約が複雑になったらビルダー導入  
4️⃣ チーム成熟度に応じて選択

→ 一気に全部やる必要はない

---

# 🛡️ 第3部: 実行時の完全性保護

---

## 実行時の脅威
### ⚠️ 作成後に襲いかかる脅威

**オブジェクトは作成後も危険にさらされる：**

❌ publicなSetterによる無制限変更  
❌ 可変オブジェクトの共有による意図しない変更  
❌ コレクションの直接操作  
❌ 不正な状態遷移

→ 「作って終わり」ではない！

---

## カプセル化による防御
### 🛡️ カプセル化 = データとルールの共同防衛

**定義: データの解釈とルールをそのデータと共に囲い込んで保護すること**

**実装方針:**
```
├── publicなSetterを排除
├── 制御されたアクセスのみ提供
├── 状態変更時にルール適用
└── 外部への情報漏洩を防止
```

---

## Setter排除の実装

```typescript
class Order {
  private _status: OrderStatus = OrderStatus.DRAFT;
  
  // ❌ 危険なSetter
  // setStatus(status: OrderStatus) { this._status = status; }
  
  // ✅ 制御された状態変更
  markAsConfirmed(): void {
    if (this._status !== OrderStatus.DRAFT) {
      throw new Error("下書き状態の注文のみ確定可能");
    }
    this._status = OrderStatus.CONFIRMED;
  }
  
  markAsPaid(): void {
    if (this._status !== OrderStatus.CONFIRMED) {
      throw new Error("確定済み注文のみ支払い可能");
    }
    this._status = OrderStatus.PAID;
  }
}
```

---

## 可変オブジェクト対策
### 🔒 可変オブジェクトの安全な扱い

**問題: 内部オブジェクトが外部で変更される**

```typescript
// ❌ 危険な実装
get items() { return this._items; }

// ✅ 安全な実装
getItems(): readonly OrderItem[] {
  return Object.freeze([...this._items]); // 読み取り専用コピー
}
```

**ポイント:**  
• 直接参照を渡さない  
• 読み取り専用ビューを提供  
• 変更は内部メソッド経由のみ

---

## コレクション保護
### 📦 コレクションの完全性保護

```typescript
class Order {
  private _items: OrderItem[] = [];
  
  // ❌ 危険
  // getItems() { return this._items; }
  // setItems(items: OrderItem[]) { this._items = items; }
  
  // ✅ 安全
  getItems(): readonly OrderItem[] {
    return Collections.unmodifiableList([...this._items]);
  }
  
  addItem(item: OrderItem): void {
    if (this._status !== OrderStatus.DRAFT) {
      throw new Error("確定済み注文には項目追加不可");
    }
    this._items.push(item);
  }
  
  removeItem(itemId: string): void {
    // ビジネスルールに従った削除
  }
}
```

---

## 不変条件による総合保護
### 🔍 不変条件（Invariants）による保護

```typescript
class BankAccount {
  constructor(accountNumber: string, balance: number) {
    this.accountNumber = accountNumber;
    this.balance = balance;
    this.checkInvariants(); // 作成時チェック
  }
  
  withdraw(amount: number): void {
    this.balance -= amount;
    this.checkInvariants(); // 操作後チェック
  }
  
  private checkInvariants(): void {
    if (this.balance < 0) {
      throw new Error("残高は負になれません");
    }
    if (this.accountNumber.length !== 10) {
      throw new Error("口座番号は10桁必須");
    }
  }
}
```

---

## 不変条件の設計指針
### 📏 不変条件設計のベストプラクティス

**1️⃣ 明確な定義**
   • 何が「正しい状態」かを明文化
   • ビジネスルールと直接対応

**2️⃣ 適切なタイミング**
   • オブジェクト作成時
   • 状態変更後（publicメソッド終了時）

**3️⃣ 効率的な実装**
   • 重い処理は避ける
   • 必要最小限のチェック

**4️⃣ 明確なエラー処理**
   • 分かりやすいエラーメッセージ
   • 復旧方法の示唆

---

## 実行時保護まとめ
### 🛡️ 実行時完全性保護の要点

**目標: 「オブジェクトはライフサイクル全体を通じて常に正しい状態を保つ」**

**手法:**
```
├── Setterの排除 → 制御されたアクセス
├── 可変オブジェクト保護 → 読み取り専用ビュー
├── コレクション保護 → 内部操作の強制
└── 不変条件 → 継続的な整合性チェック
```

→ 多層防御でリスクを最小化

---

# 🎯 第4部: 総合的な保護戦略

---

## 段階的導入戦略
### 🚀 チームでの段階的導入

**フェーズ1: 基礎固め（1-2ヶ月）**  
└── コンストラクタ注入の徹底

**フェーズ2: 可読性向上（2-3ヶ月）**  
└── フルーエント・インターフェース導入

**フェーズ3: 複雑性対応（3-6ヶ月）**  
└── ビルダー・パターン導入

**フェーズ4: 保護強化（継続的）**  
└── カプセル化と不変条件の徹底

→ 無理のないペースで確実に

---

## 実装チェックリスト
### 📋 実装時のチェックポイント

**🔍 作成時の完全性**  
□ 引数なしコンストラクタを避けている  
□ 必須項目は作成時に設定  
□ 作成時にビジネスルールを適用  
□ 複雑な制約にはビルダーを使用

**🛡️ 実行時の完全性**  
□ publicなSetterを排除  
□ 状態変更は制御されたメソッド経由  
□ 可変オブジェクトの直接アクセス禁止  
□ 不変条件を定義し継続的にチェック

**📐 設計の一貫性**  
□ チーム内でパターンを統一  
□ ドキュメント化  
□ レビュー観点に含める

---

## よくある落とし穴と対策
### ⚠️ よくある落とし穴

**1️⃣ 「とりあえず動く」で妥協**  
   → ビジネスルールを後回しにしない

**2️⃣ フレームワーク要件に屈服**  
   → ドメインモデルと永続層を分離

**3️⃣ パフォーマンスを過度に心配**  
   → 設計時の小コスト vs 運用時の大リスク

**4️⃣ 一気に全部やろうとする**  
   → 段階的導入で確実に

**5️⃣ チーム教育を怠る**  
   → Why/When/How/What ifを明確に

---

## まとめとアクションアイテム
### 🎯 今日のまとめ

**状態の完全性 = セキュア・バイ・デザインの実践**

**2つの完全性:**  
1️⃣ 作成時: 正しい状態で生まれる  
2️⃣ 実行時: 正しい状態を維持する

**📝 明日からのアクション**  
□ 現在のプロジェクトで問題箇所を特定  
□ 1つのエンティティでパターンを試す  
□ チームでの導入計画を検討  
□ コーディング規約への反映を検討

→ 小さく始めて、確実に広げる

---

# まとめ

## 状態の完全性保証の3つのポイント

1. **エンティティによる状態管理の一元化**
   - 状態変化をDDDのエンティティとしてモデリング
   - 状態とルールを同じ場所で管理

2. **正しい状態でのエンティティ生成**
   - 適切なコンストラクタ設計
   - フルーエント・インターフェースとビルダー・パターンの活用
   - 不変条件の確実な実装

3. **エンティティの完全性保護**
   - カプセル化によるビジネスロジックの保護
   - 可変オブジェクトとコレクションの安全な取り扱い
   - ドメイン・プリミティブの活用
