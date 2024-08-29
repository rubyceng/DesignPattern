// 应用的场景：树形结构表示
// 通常来说 对于树形结构   构建树状嵌套递归对象结构。
//将对象组合成树形结构来表现部分-整体的层次结构。组合模式使得客户端可以统一对待单个对象和组合对象。
// 组件接口
// 定义一个interface 声明组合中的一些实际通用操作
// 主要分为 叶子结点  和   复杂组件
interface Component {
  getName(): string;
  getSize(): number;
}

// 文件类
class FileComponet implements Component {
  private name: string;
  private size: number;

  constructor(name: string, size: number) {
    this.name = name;
    this.size = size;
  }

  getName(): string {
    return this.name;
  }

  getSize(): number {
    return this.size;
  }
}

// 文件夹类
class FolderCompoment implements Component {
  private name: string;
  private children: Component[] = [];

  constructor(name: string) {
    this.name = name;
  }

  getName(): string {
    return this.name;
  }

  getSize(): number {
    let size = 0;
    for (const child of this.children) {
      size += child.getSize();
    }
    return size;
  }

  add(child: Component): void {
    this.children.push(child);
  }

  remove(child: Component): void {
    const index = this.children.indexOf(child);
    if (index !== -1) {
      this.children.splice(index, 1);
    }
  }
}






// 客户端代码
const root = new FolderCompoment("根目录");
const folder1 = new FolderCompoment("文件夹1");
const folder2 = new FolderCompoment("文件夹2");

const file1 = new FileComponet("文件1", 100);
const file2 = new FileComponet("文件2", 200);
const file3 = new FileComponet("文件3", 300);

root.add(folder1);
root.add(folder2);

folder1.add(file1);
folder1.add(file2);

folder2.add(file3);

console.log(root.getSize()); // 输出：600



