// 型定義
type BodyType = 'sedan' | 'hatchback' | 'suv' | 'coupe' | 'wagon' | 'pickup';
type DoorType = '2door' | '4door' | '5door';
type TireType = 'summer' | 'winter' | 'all-season';
type Color = 'black' | 'white' | 'gray' | 'red' | 'blue' | 'silver';
type FuelType = 'gasoline' | 'diesel' | 'hybrid' | 'electric' | 'premium-gasoline';
type DriveType = 'fwd' | 'rwd' | 'awd' | '4wd';
type Brand = 'Toyota' | 'Honda' | 'BMW' | 'Mercedes' | 'Ferrari' | 'Tesla';

// 完成品のCarクラス（作成後は不変）
class Car {
  // すべてのプロパティはreadonly - 完成後は変更不可
  readonly body: BodyType;
  readonly doors: DoorType;
  readonly tires: TireType;
  readonly color: Color;
  readonly year: number;
  readonly brand?: Brand;
  readonly model?: string;
  readonly engineSize?: number;
  readonly fuelType?: FuelType;
  readonly driveType?: DriveType;
  readonly price?: number;

  // コンストラクタはpublic - Builderから呼び出される
  constructor(config: CarConfiguration) {
    // 必須項目の検証
    if (!config.body || !config.doors || !config.tires || !config.color || !config.year) {
      throw new Error('必須項目が未設定です');
    }

    // すべてのプロパティを設定
    this.body = config.body;
    this.doors = config.doors;
    this.tires = config.tires;
    this.color = config.color;
    this.year = config.year;
    this.brand = config.brand;
    this.model = config.model;
    this.engineSize = config.engineSize;
    this.fuelType = config.fuelType;
    this.driveType = config.driveType;
    this.price = config.price;
  }

  // 情報を取得するメソッドのみ（Queryのみ）
  getSpecifications(): string {
    return `
=== 車両仕様書 ===
車体: ${this.body}
ドア: ${this.doors}
タイヤ: ${this.tires}
色: ${this.color}
年式: ${this.year}
ブランド: ${this.brand || '未設定'}
モデル: ${this.model || '未設定'}
エンジン: ${this.engineSize ? this.engineSize + 'L' : '未設定'}
燃料: ${this.fuelType || '未設定'}
駆動方式: ${this.driveType || '未設定'}
価格: ${this.price ? '¥' + this.price.toLocaleString() : '未設定'}
    `.trim();
  }

  // 車の価値を計算
  calculateValue(): number {
    let baseValue = 1000000; // 基本価格

    // ブランドによる価値調整
    const brandMultiplier = {
      'Ferrari': 5.0,
      'BMW': 2.0,
      'Mercedes': 2.2,
      'Tesla': 1.8,
      'Toyota': 1.2,
      'Honda': 1.1
    };

    if (this.brand && brandMultiplier[this.brand]) {
      baseValue *= brandMultiplier[this.brand];
    }

    // エンジンサイズによる調整
    if (this.engineSize) {
      baseValue += this.engineSize * 300000;
    }

    // 年式による減価償却
    const currentYear = new Date().getFullYear();
    const age = currentYear - this.year;
    baseValue *= Math.pow(0.9, age); // 年10%減価

    return Math.round(baseValue);
  }

  // 燃費計算
  calculateFuelEfficiency(): number {
    if (this.fuelType === 'electric') return 0; // 電気自動車は燃費概念なし

    let baseEfficiency = 15; // km/L

    // エンジンサイズによる影響
    if (this.engineSize) {
      baseEfficiency -= (this.engineSize - 2.0) * 2;
    }

    // 車体タイプによる影響
    const efficiencyModifier = {
      'sedan': 1.0,
      'hatchback': 1.1,
      'suv': 0.8,
      'coupe': 0.9,
      'wagon': 0.95,
      'pickup': 0.7
    };

    baseEfficiency *= efficiencyModifier[this.body];

    return Math.max(5, Math.round(baseEfficiency * 10) / 10);
  }
}

// Builderが使用する設定インターface
interface CarConfiguration {
  body: BodyType;
  doors: DoorType;
  tires: TireType;
  color: Color;
  year: number;
  brand?: Brand;
  model?: string;
  engineSize?: number;
  fuelType?: FuelType;
  driveType?: DriveType;
  price?: number;
}

// CarBuilderクラス - コンストラクタで基本項目を受け取る
class CarBuilder {
  // プライベートな設定オブジェクト - 外部からは見えない
  private config: CarConfiguration;

  // コンストラクタで必須項目を受け取る
  constructor(body: BodyType, doors: DoorType, tires: TireType, color: Color, year: number) {
    // 必須項目のバリデーション
    if (!body || !doors || !tires || !color) {
      throw new Error('必須項目が未設定です');
    }
    
    if (year < 1900 || year > new Date().getFullYear() + 2) {
      throw new Error('年式が無効です');
    }

    // 基本設定を保存
    this.config = {
      body,
      doors,
      tires,
      color,
      year
    };

    // 基本項目に基づく初期制約適用
    this.applyInitialConstraints();
  }

  // 任意項目の設定メソッド群（戻り値なし - Commandのみ）
  setBrand(brand: Brand): void {
    this.config.brand = brand;
    this.applyBrandConstraints(brand);
  }

  setModel(model: string): void {
    if (!model || model.trim().length === 0) {
      throw new Error('モデル名が無効です');
    }
    this.config.model = model.trim();
  }

  setEngineSize(size: number): void {
    if (this.config.fuelType === 'electric') {
      throw new Error('電気自動車にはエンジンサイズを設定できません');
    }
    if (size <= 0 || size > 8.0) {
      throw new Error('エンジンサイズが無効です（0.1L〜8.0L）');
    }
    this.config.engineSize = size;
    this.applyEngineConstraints(size);
  }

  setFuelType(fuelType: FuelType): void {
    // ブランド制約チェック
    if (this.config.brand === 'Tesla' && fuelType !== 'electric') {
      throw new Error('テスラは電気自動車のみです');
    }
    
    this.config.fuelType = fuelType;
    this.applyFuelTypeConstraints(fuelType);
  }

  setDriveType(driveType: DriveType): void {
    this.validateDriveTypeWithBody(driveType);
    this.config.driveType = driveType;
  }

  setPrice(price: number): void {
    if (price <= 0) {
      throw new Error('価格は正の数である必要があります');
    }
    if (price > 100000000) {
      throw new Error('価格が高すぎます（上限: 1億円）');
    }
    this.config.price = price;
    this.validatePriceConsistency(price);
  }

  // 初期制約の適用
  private applyInitialConstraints(): void {
    // 車体タイプに応じた自動調整
    if (this.config.body === 'pickup') {
      this.config.driveType = '4wd'; // ピックアップは4WD推奨
    }
    
    if (this.config.body === 'coupe' && this.config.doors !== '2door') {
      console.warn('クーペには2ドアが推奨されます');
    }

    // 年式による制約
    if (this.config.year < 2015) {
      console.warn('古い年式のため、一部の最新技術は利用できない可能性があります');
    }
  }

  // ブランド制約の適用
  private applyBrandConstraints(brand: Brand): void {
    if (brand === 'Tesla') {
      this.config.fuelType = 'electric';
      this.config.engineSize = undefined;
      this.config.driveType = this.config.driveType || 'awd';
      console.log('テスラのため、電気自動車・AWDに自動設定しました');
    }
    
    if (brand === 'Ferrari') {
      this.config.fuelType = this.config.fuelType || 'premium-gasoline';
      this.config.driveType = this.config.driveType || 'rwd';
      if (this.config.engineSize && this.config.engineSize < 3.0) {
        this.config.engineSize = 3.0;
        console.log('フェラーリのため、エンジンサイズを3.0Lに調整しました');
      }
    }
    
    if (brand === 'BMW' || brand === 'Mercedes') {
      this.config.fuelType = this.config.fuelType || 'premium-gasoline';
      this.config.driveType = this.config.driveType || 'rwd';
    }
  }

  // 燃料タイプ制約の適用
  private applyFuelTypeConstraints(fuelType: FuelType): void {
    if (fuelType === 'electric') {
      this.config.engineSize = undefined;
      this.config.driveType = this.config.driveType || 'awd';
      console.log('電気自動車のため、エンジンサイズを削除し、AWDに設定しました');
    }
    
    if (fuelType === 'diesel') {
      if (this.config.body === 'coupe') {
        console.warn('ディーゼルエンジンはクーペには不適切です');
      }
      // ディーゼルの最小エンジンサイズ
      if (this.config.engineSize && this.config.engineSize < 2.0) {
        this.config.engineSize = 2.0;
        console.log('ディーゼルのため、エンジンサイズを2.0Lに調整しました');
      }
    }
  }

  // エンジン制約の適用
  private applyEngineConstraints(size: number): void {
    // 大型エンジンはプレミアムガソリン
    if (size >= 4.0 && this.config.fuelType === 'gasoline') {
      this.config.fuelType = 'premium-gasoline';
      console.log('大型エンジンのため、プレミアムガソリンに変更しました');
    }

    // 車体タイプとの整合性チェック
    if (this.config.body === 'coupe' && size < 2.0) {
      console.warn('クーペには2.0L以上のエンジンが推奨されます');
    }
    
    if (this.config.body === 'pickup' && size < 3.0) {
      console.warn('ピックアップトラックには3.0L以上のエンジンが推奨されます');
    }
  }

  // 駆動方式のバリデーション
  private validateDriveTypeWithBody(driveType: DriveType): void {
    if (this.config.body === 'pickup' && driveType === 'fwd') {
      throw new Error('ピックアップトラックにはFWDは適切ではありません');
    }
    
    if (this.config.body === 'suv' && driveType === 'fwd') {
      console.warn('SUVにはFWD以外が推奨されます');
    }
  }

  // 価格の整合性チェック
  private validatePriceConsistency(price: number): void {
    if (this.config.brand === 'Ferrari' && price < 2000000) {
      console.warn('フェラーリにしては価格が安すぎます（推奨: 200万円以上）');
    }
    
    if (this.config.brand === 'Tesla' && price < 500000) {
      console.warn('テスラにしては価格が安すぎます（推奨: 50万円以上）');
    }
    
    if (this.config.fuelType === 'electric' && price < 400000) {
      console.warn('電気自動車にしては価格が安すぎます（推奨: 40万円以上）');
    }
  }

  // 全体的な整合性チェック
  private validateFinalConfiguration(): void {
    const errors: string[] = [];

    // ブランドと燃料タイプの整合性
    if (this.config.brand === 'Tesla' && this.config.fuelType !== 'electric') {
      errors.push('テスラは電気自動車である必要があります');
    }

    // 電気自動車とエンジンサイズの整合性
    if (this.config.fuelType === 'electric' && this.config.engineSize) {
      errors.push('電気自動車はエンジンサイズを持てません');
    }

    // 車体タイプとエンジンサイズの整合性
    if (this.config.body === 'pickup' && this.config.engineSize && this.config.engineSize < 3.0) {
      errors.push('ピックアップトラックには3.0L以上のエンジンが必要です');
    }

    // 年式と技術の整合性
    if (this.config.year < 2015 && this.config.fuelType === 'electric') {
      console.warn('2015年以前の電気自動車は技術的制限があります');
    }

    if (errors.length > 0) {
      throw new Error('設定エラー: ' + errors.join(', '));
    }
  }

  // 完成車を構築して返す（唯一外部にオブジェクトを公開するメソッド）
  build(): Car {
    this.validateFinalConfiguration();
    return new Car(this.config);
  }

  // 現在の設定状況を確認（デバッグ用）
  getProgress(): string {
    const optional = ['brand', 'model', 'engineSize', 'fuelType', 'driveType', 'price'];
    const completed = optional.filter(key => this.config[key as keyof CarConfiguration]);
    
    return `構築進捗: 必須項目完了、任意項目 ${completed.length}/${optional.length} 設定済み
設定済み任意項目: ${completed.length > 0 ? completed.join(', ') : 'なし'}
未設定任意項目: ${optional.filter(key => !this.config[key as keyof CarConfiguration]).join(', ')}`;
  }
}

// 使用例
console.log('=== 新しいビルダー・パターン実装例 ===\n');

// 例1: 基本的な車の構築
console.log('--- 例1: 基本的な車 ---');
const carBuilder1 = new CarBuilder('sedan', '4door', 'all-season', 'black', 2023);
console.log(carBuilder1.getProgress());

carBuilder1.setBrand('Toyota');
carBuilder1.setModel('Camry');
carBuilder1.setEngineSize(2.0);
carBuilder1.setFuelType('gasoline');
carBuilder1.setDriveType('fwd');
carBuilder1.setPrice(3500000);

const car1 = carBuilder1.build();
console.log(car1.getSpecifications());
console.log(`推定価値: ¥${car1.calculateValue().toLocaleString()}`);
console.log(`燃費: ${car1.calculateFuelEfficiency()} km/L\n`);

// 例2: テスラの構築（制約が自動適用される）
console.log('--- 例2: テスラ（制約自動適用） ---');
const carBuilder2 = new CarBuilder('sedan', '4door', 'all-season', 'white', 2024);
carBuilder2.setBrand('Tesla'); // 自動的に電気自動車設定
carBuilder2.setModel('Model S');
carBuilder2.setPrice(8000000);

const car2 = carBuilder2.build();
console.log(car2.getSpecifications());
console.log(`推定価値: ¥${car2.calculateValue().toLocaleString()}\n`);

// 例3: フェラーリの構築
console.log('--- 例3: フェラーリ ---');
const carBuilder3 = new CarBuilder('coupe', '2door', 'summer', 'red', 2022);
carBuilder3.setBrand('Ferrari');
carBuilder3.setModel('488 GTB');
carBuilder3.setEngineSize(2.8); // 3.0Lに自動調整される
carBuilder3.setDriveType('rwd');
carBuilder3.setPrice(25000000);

const car3 = carBuilder3.build();
console.log(car3.getSpecifications());
console.log(`推定価値: ¥${car3.calculateValue().toLocaleString()}\n`);

// 例4: 最小構成（任意項目なし）
console.log('--- 例4: 最小構成 ---');
const carBuilder4 = new CarBuilder('hatchback', '4door', 'winter', 'blue', 2020);
const car4 = carBuilder4.build(); // 任意項目を設定せずに構築

console.log(car4.getSpecifications());
console.log(`推定価値: ¥${car4.calculateValue().toLocaleString()}\n`);

// 例5: エラーが発生する例
console.log('--- 例5: エラー例 ---');
try {
  const carBuilder5 = new CarBuilder('sedan', '4door', 'winter', 'gray', 2023);
  carBuilder5.setBrand('Tesla');
  carBuilder5.setFuelType('gasoline'); // エラー: テスラでガソリンは不可
} catch (error) {
  console.error('エラー:', error.message);
}