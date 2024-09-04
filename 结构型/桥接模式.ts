// 桥接模式示例

// 实现部分的接口
interface Color {
  paint(): void;
}

// 具体实现类
class Red implements Color {
  paint(): void {
    console.log("使用红色绘制");
  }
}

class Blue implements Color {
  paint(): void {
    console.log("使用蓝色绘制");
  }
}

// 抽象部分
abstract class Shape {
  protected color: Color;

  constructor(color: Color) {
    this.color = color;
  }

  abstract draw(): void;
}

// 扩展抽象部分
class Circle extends Shape {
  draw(): void {
    console.log("绘制圆形");
    this.color.paint();
  }
}

class Square extends Shape {
  draw(): void {
    console.log("绘制正方形");
    this.color.paint();
  }
}

// 客户端代码
const redCircle = new Circle(new Red());
redCircle.draw();

const blueSquare = new Square(new Blue());
blueSquare.draw();
