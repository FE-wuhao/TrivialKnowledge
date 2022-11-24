/*
 * @Author: nhsoft.wh
 * @Date: 2022-11-24 10:23:44
 * @LastEditors: nhsoft.wh
 * @LastEditTime: 2022-11-24 11:05:41
 * @Description:
 * 抽象工厂模式：对开放闭合原则最好的佐证。对工厂进行抽象，抽象出抽象类，只进行扩展重写，实现纷杂的产品。
 *
 * 抽象工厂（抽象类，它不能被用于生成具体实例）：
 * 用于声明最终目标产品的共性。在一个系统里，抽象工厂可以有多个（大家可以想象我们的手机厂后来被一个更大的厂收购了，这个厂里除了手机抽象类，还有平板、游戏机抽象类等等），每一个抽象工厂对应的这一类的产品，被称为“产品族”。
 *
 * 具体工厂（用于生成产品族里的一个具体的产品）：
 * 继承自抽象工厂、实现了抽象工厂里声明的那些方法，用于创建具体的产品的类。
 *
 * 抽象产品（抽象类，它不能被用于生成具体实例）：
 * 上面我们看到，具体工厂里实现的接口，会依赖一些类，这些类对应到各种各样的具体的细粒度产品（比如操作系统、硬件等），这些具体产品类的共性各自抽离，便对应到了各自的抽象产品类。
 *
 * 具体产品（用于生成产品族里的一个具体的产品所依赖的更细粒度的产品）：
 *  比如我们上文中具体的一种操作系统、或具体的一种硬件等。
 */
// 抽象工厂（抽象类，它不能被用于生成具体实例
class GlassesFactory {
  // 生产镜片
  createLens() {
    throw new Error(
      "这是创建镜片的抽象工厂方法，不允许调用，请对该方法进行重写！"
    );
  }

  // 生产镜框
  createMirrorFrame() {
    throw new Error(
      "这是创建镜框的抽象工厂方法，不允许调用，请对该方法进行重写！"
    );
  }
}

// 抽象产品（抽象类，它不能被用于生成具体实例
// 镜片抽象类
class Lens {
  // 材质
  textureOfMaterial() {
    throw new Error(
      "这是镜片的抽象方法，不允许调用，请对该方法进行重写！"
    );
  }
}

// 镜框抽象类
class MirrorFrame {
  // 材质
  textureOfMaterial() {
    throw new Error(
      "这是镜框的抽象方法，不允许调用，请对该方法进行重写！"
    );
  }
}

// 具体产品（用于生成产品族里的一个具体的产品所依赖的更细粒度的产品
// 防蓝光镜片
class AntiBlueLens extends Lens {
  // 材质
  textureOfMaterial() {
    return "防蓝光";
  }
}

// 树脂镜片
class ResinLens extends Lens {
  // 材质
  textureOfMaterial() {
    return "树脂";
  }
}

// 钛合金镜框
class TitaniumAlloyMirrorFrame extends MirrorFrame {
  // 材质
  textureOfMaterial() {
    return "钛合金";
  }
}

// 塑料镜框
class PlasticMirrorFrame extends MirrorFrame {
  // 材质
  textureOfMaterial() {
    return "塑料";
  }
}

// 具体工厂（用于生成产品族里的一个具体的产品）
// 丹阳眼镜
class DanYangGlassesFactory extends GlassesFactory {
  createLens() {
    return new AntiBlueLens();
  }

  createMirrorFrame() {
    return new TitaniumAlloyMirrorFrame();
  }
}
// 吴良材眼镜
class WuLiangCaiGlassesFactory extends GlassesFactory {
  createLens() {
    return new ResinLens();
  }

  createMirrorFrame() {
    return new PlasticMirrorFrame();
  }
}

const wuLiangCaiObj = new WuLiangCaiGlassesFactory();

const danYangObj = new DanYangGlassesFactory();

console.log(
  "吴良材眼镜材质：",
  wuLiangCaiObj.createLens().textureOfMaterial()
);

console.log(
  "丹阳眼镜材质：",
  danYangObj.createLens().textureOfMaterial()
);
