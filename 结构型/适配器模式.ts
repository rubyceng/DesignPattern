
// 适配器模式示例

// 目标接口
interface Target {
  request(): void;
}

// 被适配的类
class Adaptee {
  specificRequest(): void {
    console.log("被适配者的特殊请求");
  }
}

// 适配器类
class Adapter implements Target {
  private adaptee: Adaptee;

  constructor(adaptee: Adaptee) {
    this.adaptee = adaptee;
  }

  request(): void {
    console.log("适配器转换请求");
    this.adaptee.specificRequest();
  }
}

// 客户端代码
function clientCode(target: Target) {
  target.request();
}

// 使用示例
const adaptee = new Adaptee();
const adapter = new Adapter(adaptee);

console.log("客户端代码可以正常工作with适配器:");
clientCode(adapter);
