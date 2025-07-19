type BodyType = 'sedan' | 'hatchback' | 'suv' | 'coupe' | 'wagon';
type DoorType = '2door' | '4door' | '5door';
type TireType = 'summer' | 'winter' | 'all-season';
type Color = 'black' | 'white' | 'gray' | 'red' | 'blue' | 'silver';

class Car {
  private body: BodyType;
  private doors: DoorType;
  private tires: TireType;
  private color: Color;
  private brand?: string;
  private model?: string;
  private year?: number;
  private engineSize?: number;
  private fuelType?: string;

  constructor(body: BodyType, doors: DoorType, tires: TireType, color: Color) {
    // 必須項目のnullチェック
    if (!body) {
      throw new Error('車体は必須項目です');
    }
    if (!doors) {
      throw new Error('ドアは必須項目です');
    }
    if (!tires) {
      throw new Error('タイヤは必須項目です');
    }
    if (!color) {
      throw new Error('色は必須項目です');
    }

    this.body = body;
    this.doors = doors;
    this.tires = tires;
    this.color = color;
  }

  // フル-エント・インターフェース - 自然言語のようなメソッド名
  withBrand(brand: string): Car {
    this.brand = brand;
    return this;
  }

  withModel(model: string): Car {
    this.model = model;
    return this;
  }

  fromYear(year: number): Car {
    this.year = year;
    return this;
  }

  havingEngine(size: number): Car {
    this.engineSize = size;
    return this;
  }

  runningOn(fuelType: string): Car {
    this.fuelType = fuelType;
    return this;
  }

  // 設定の変更も可能
  paintedIn(color: Color): Car {
    this.color = color;
    return this;
  }

  equippedWith(tires: TireType): Car {
    this.tires = tires;
    return this;
  }

  // 条件分岐も自然に
  ifSportsCar(): Car {
    if (this.body === 'coupe') {
      this.engineSize = this.engineSize ? Math.max(this.engineSize, 3.0) : 3.0;
    }
    return this;
  }

  ifWinterConditions(): Car {
    if (this.tires !== 'winter') {
      this.tires = 'winter';
    }
    return this;
  }

  // 情報取得
  getBody(): BodyType {
    return this.body;
  }

  getDoors(): DoorType {
    return this.doors;
  }

  getTires(): TireType {
    return this.tires;
  }

  getColor(): Color {
    return this.color;
  }

  getBrand(): string | undefined {
    return this.brand;
  }

  getModel(): string | undefined {
    return this.model;
  }

  getYear(): number | undefined {
    return this.year;
  }

  getEngineSize(): number | undefined {
    return this.engineSize;
  }

  getFuelType(): string | undefined {
    return this.fuelType;
  }

  // 最終的な情報表示
  build(): string {
    return `車体: ${this.body}, ドア: ${this.doors}, タイヤ: ${this.tires}, 色: ${this.color}
${this.brand ? `ブランド: ${this.brand}` : ''}
${this.model ? `モデル: ${this.model}` : ''}
${this.year ? `年式: ${this.year}` : ''}
${this.engineSize ? `エンジン: ${this.engineSize}L` : ''}
${this.fuelType ? `燃料: ${this.fuelType}` : ''}`;
  }

  // 情報表示（buildの別名）
  displayInfo(): string {
    return this.build();
  }
}

// フルエント・インターフェースの使用例
const myCar = new Car('sedan', '4door', 'winter', 'gray')
  .withBrand('Toyota')
  .withModel('Camry')
  .fromYear(2023)
  .havingEngine(2.0)
  .runningOn('gasoline');

console.log(myCar.build());

// より自然言語的な例
const sportsCar = new Car('coupe', '2door', 'summer', 'red')
  .withBrand('Ferrari')
  .withModel('488')
  .fromYear(2022)
  .havingEngine(3.9)
  .runningOn('premium gasoline')
  .ifSportsCar();

console.log(sportsCar.displayInfo());

// 条件に応じた設定変更
const winterCar = new Car('suv', '4door', 'summer', 'white')
  .withBrand('Subaru')
  .withModel('Outback')
  .fromYear(2024)
  .havingEngine(2.5)
  .runningOn('gasoline')
  .ifWinterConditions()  // 冬用タイヤに自動変更
  .paintedIn('silver');  // 色も変更可能

console.log(winterCar.build());