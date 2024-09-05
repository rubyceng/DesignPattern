// 装饰器模式示例
// 定义装饰器和被装饰对象的基lei接口，声明需要被装饰的方法
// 在具体装饰器中重写父类方法，并且引用父类方法实现装饰
interface DataSource {
  readData(): string;
  writeData(data: string): void;
}

// 具体被装饰对象
// 提供接口中定义的默认实现
class FileDataSource implements DataSource {
    constructor(private data: string) {
        this.data = data
    }
  readData(): string {
    return this.data;
  }

  writeData(data: string): void {
    this.data = data
  }
}

// 定义抽象装饰器
class DataSourceDecorator implements DataSource {
    constructor(private dataSource: DataSource) {
        this.dataSource = dataSource
    }
    readData(): string {
        return this.dataSource.readData()
    }

    writeData(data: string): void {
        this.dataSource.writeData(data)
    }
}


// 定义具体装饰器
// 装饰在具体封装对象前或后进行
// 调用的必须是被装饰对象的方法


// 加密装饰器
class EncryptionDecorator extends DataSourceDecorator {
  encrypt(data: string): string {
    console.log("加密逻辑");
    return data.split("").reverse().join("");
  }
  decrypt(data: string): string {
    console.log("解密逻辑");
    return data.split("").reverse().join("");
  }
  readData(): string {
    const data = super.readData();
    return this.decrypt(data);
  }

  writeData(data: string): void {
    const _data = this.encrypt(data);
    super.writeData(_data);
  }
}

// 压缩装饰器
class CompressionDecorator extends DataSourceDecorator {
  compress(data: string): string {
    console.log("压缩逻辑");
    return data.split("").reverse().join("");
  }
  decompress(data: string): string {
    console.log("解压逻辑");
    return data.split("").reverse().join("");
  }
  readData(): string {
    const data = super.readData();
    return this.decompress(data);
  }
  writeData(data: string): void {
    const _data = this.compress(data);
    super.writeData(_data);
  }
}

// 在程序运行中使用装饰器

class  ApplicationConfigrator {
    configurationExample(){
        const dataSource = new FileDataSource("Hello World")
        const configDataSource = new EncryptionDecorator(
          new CompressionDecorator(dataSource)
        );
        console.log(configDataSource.readData());
        configDataSource.writeData("Goodbye World")
        console.log(configDataSource.readData());
    }
}

const app = new ApplicationConfigrator()
app.configurationExample()
