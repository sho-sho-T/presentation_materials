// 必須の情報を全て受け取り、任意の情報はSetterメソッドにて設定する Car クラス

type BodyType = 'sedan' | 'hatchback' | 'suv' | 'coupe' | 'wagon';
type DoorType = '2door' | '4door' | '5door';
type TireType = 'summer' | 'winter' | 'all-season';
type Color = 'black' | 'white' | 'gray' | 'red' | 'blue' | 'silver';

class Car {
  private body: BodyType;
  private doors: DoorType;
  private tires: TireType;
  private color: Color;
  private brand?: string; // optional
  private model?: string; // optional
  private year?: number; // optional
  private engineSize?: number; // optional
  private fuelType?: string; // optional

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

  // -------------- 必須プロパティのgetter -----------------
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

  // --------------- 任意プロパティのsetter ------------------
  setBrand(brand: string): void {
    this.brand = brand;
  }

  setModel(model: string): void {
    this.model = model;
  }

  setYear(year: number): void {
    this.year = year;
  }

  setEngineSize(size: number): void {
    this.engineSize = size;
  }

  setFuelType(type: string): void {
    this.fuelType = type;
  }

  // --------------- 任意プロパティのgetter---------------------
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

  // ------------------ 車の情報を表示 -----------------------------
  displayInfo(): string {
    return `車体: ${this.body}, ドア: ${this.doors}, タイヤ: ${this.tires}, 色: ${this.color}
        ${this.brand ? `ブランド: ${this.brand}` : ''}
        ${this.model ? `モデル: ${this.model}` : ''}
        ${this.year ? `年式: ${this.year}` : ''}
        ${this.engineSize ? `エンジン: ${this.engineSize}L` : ''}
        ${this.fuelType ? `燃料: ${this.fuelType}` : ''}`;
  }
}

// ------------------- 使用例 ---------------------------------------
const myCar = new Car('sedan', '4door', 'winter', 'gray');

// ----------------- 任意の情報をsetterで設定 ---------------------------
myCar.setBrand('Toyota');
myCar.setModel('Camry');
myCar.setYear(2023);
myCar.setEngineSize(2.0);
myCar.setFuelType('gasoline');

console.log(myCar.displayInfo());