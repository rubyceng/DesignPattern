// --------------------------状态-------------------------------

// 房源状态接口
abstract class ResourceState {
  // 记录房源实体的引用
  house: HouseResouce;
  //打印当前状态
  log() {
    console.log(this.house.state.toString());
  }
  abstract toString(): string;
  constructor(house: HouseResouce) {
    this.house = house;
    this.log();
  }
  // 房源状态图中可能发生的一切行为

  // --------------------- 行为 ---------------------------
  // 订房
  booking() {
    this.house.state.booking();
  }
  // 付款
  paying() {
    this.house.state.paying();
  }
  // 确认入住
  checking() {
    this.house.state.checking();
  }
  // 入住结束
  over() {
    this.house.state.over();
  }
  //未付款
  timeout() {
    this.house.state.timeout();
  }
  // --------------------- 行为 ---------------------------
}
// 实现各个对应的状态
//房态空置状态
class ResourceEmpty extends ResourceState {
  // 状态变更初始化
  constructor(house: HouseResouce) {
    super(house);
  }
  // 订房
  booking() {
    // 在这里执行相关的业务逻辑 做事务
    console.log("客户进行了订房行为");
    console.log("写入数据库");

    // 状态变更为锁房
    this.house.setState(new ResourceLock(this.house));
  }
  toString(): string {
    return "empty";
  }
}
//锁房状态
class ResourceLock extends ResourceState {
  // 状态变更初始化
  constructor(house: HouseResouce) {
    super(house);
  }
  // 超时付款行为
  timeout(): void {
    console.log("客户付款超时间行为");
    this.house.setState(new ResourceEmpty(this.house));
  }
  // 付款行为
  paying(): void {
    // 状态变更为待入住
    this.house.setState(new ResourceWait(this.house));
  }

  toString(): string {
    return "lock";
  }
}
// 待入住状态
class ResourceWait extends ResourceState {
  // 状态变更初始化
  constructor(house: HouseResouce) {
    super(house);
  }
  toString(): string {
    return "wait";
  }
  // 确认入住行为
  checking(): void {
    console.log("客户确认入住行为");

    this.house.setState(new ResourceCheck(this.house));
  }
}
// 入住状态
class ResourceCheck extends ResourceState {
  // 状态变更初始化
  constructor(house: HouseResouce) {
    super(house);
  }
  toString(): string {
    return "wait";
  }

  // 入住结束行为
  over(): void {
    console.log("客户入住行为");

    this.house.setState(new ResourceEmpty(this.house));
  }
}

// --------------------------状态-------------------------------

// --------------------------实体-------------------------------

// 业务主体类
class HouseResouce {
  state: ResourceState;
  setState(newState: ResourceState) {
    this.state = newState;
  }
  constructor() {
    // 初始化
    this.setState(new ResourceEmpty(this));
  }
  // 订房请求
  bookARoom(): HouseResouce {
    this.state.booking();
    return this;
  }
  // 前端取消付款
  cancelPay(): HouseResouce {
    this.state.timeout();
    return this;
  }

  // ....请求同理
}

// 不用关心 HouseResouce的内部实现 只需要调用，由HouseResouce内部自行实现，解耦
// HouseResouce内部充血模型
class Service {
  // 模拟实际跨领域业务行为
  Business(house: HouseResouce): boolean {
    console.log("用户定了房子");
    console.log("用户取消了付款");

    house.bookARoom().cancelPay();
    return true;
  }
}

// --------------------------实体-------------------------------
/**
 * 分层状态机
　　所谓分层状态机，是指状态可以像类的继承那样，自上而下包含多个层级。例如在白天夜晚状态机里面，白天状态包含吃饭、上班、运动等行为，起初这些行为可通过简单的代码进行描述，吃饭就是“吃饭”，上班就是“上班”，运动就是“运动”，但是随着业务的深入，逻辑会变得越来越复杂，吃饭不再是简单地描述为“吃饭”，而是需要描述清楚“吃的什么菜，吃了多少，和谁一起吃的”，上班不再是简单地描述为“上班”，而是要描述清楚“上班干了些什么，有没有会议，是正常上班还是加班”，运动也不再是简单地描述为“运动”，而是要描述清楚“做的那种类型的运动，运动时长是多少，消耗了多少热量”，试想一下，如果把这些逻辑继续放在白天状态里面，那么白天状态的逻辑会变得越来越复杂、越来越臃肿，甚至混乱出错，此时，我们可以考虑将白天状态进一步拆分，我们可以根据不同的行为，将白天状态拆分为吃饭状态、上班状态、运动状态等子状态，每一种子状态各自管理自己的业务，这样拆分之后，白天状态臃肿的逻辑被划分到了每个子状态中，一下子就变得清爽干净了！

并发状态机
　　所谓并发状态机，是指不止存在一种状态机，而是多种状态机并存。例如代码里面既有维护日夜交替的白天夜晚状态机，又有维护四季变迁的春夏秋冬状态机，两种状态机包含不同的状态以及状态转换逻辑，相互独立、互不干涉，但也不排除在某些情况下，状态机之间会进行交互，例如夏天的夜晚看星星、冬天的白天堆雪人等等。

下推自动机
　　所谓下推自动机，是指通过在状态机内部维护一个存储状态的栈来记录状态入栈和出栈的顺序，状态完成转换后，新的状态被压入栈中，位于栈顶，前一个状态并没有被新的状态直接覆盖，而是在栈中位于新状态的下面。在某些场景下，如果我们需要将当前状态恢复为之前的状态，那么我们就可以将栈顶的状态弹出，此时前一个状态又回到了栈顶的位置，我们拿到栈顶的状态也就是前一个状态后，将当前状态设置为前一个状态，便完成了状态的恢复。
 */
