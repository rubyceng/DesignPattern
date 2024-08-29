// 步骤上的抽象
// 模版方法模式 抽象出步骤模版，具体实现由子类进行实现
// 数据库连接等适合使用模版模式｜构造器模式
// 工厂方法模式
abstract class BuilerTemplate {
  // 具体实现由子类重写
  // 操作
  abstract init(build: Build): void;
  abstract top(build: Build): void;
  abstract bottom(build: Build): void;
  abstract middle(build: Build): void;
  // 模板方法 无法让子类重写 执行顺序是固定的
  // 模版方法
  private template(build: Build):void {
    this.init(build);
    this.top(build);
    this.middle(build);
    this.bottom(build);
  }

  getbuild(build: Build) {
    
    return this.template(build);;
  }
}
class  Build {
    top: string
    bottom: string
    middle: string
    constructor() {
        this.top = ""
        this.bottom = ""
        this.middle = ""
    }
}

class ChinaHouse extends BuilerTemplate {
  init(build: Build): void {}
  top(build: Build): void {}
  bottom(build: Build): void {}
  middle(build: Build): void {}
}