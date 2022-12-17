// <패턴 2: 추상화 벽>
// - 추상화 벽은 세부 구현을 감춘 함수로 이루어진 계층입니다.
// - 구현을 전혀 몰라도 함수를 쓸 수 있습니다.

// <추상화 벽을 사용해야 하는 경우>
// - 쉽게 구현을 바꾸기 위해
// - 코드를 읽고 쓰기 쉽게 만들기 위해
// - 팀 간에 조율해야 할 것을 줄이기 위해
// - 주어진 문제에 집중하기 위해

// <패턴 3: 작은 인터페이스>
// - 추상화 벽 위에 있는 계층에 구현하는 것이 아래에 구현하는 것보다 좋습니다.
// - 그 이유는 직접 구현과 하위 계층 코드가 늘어나지 않고 코드 변경에 유연합니다.

// <패턴 4: 편리한 계층>
// - 언제 패턴을 적용하고 또 언제 멈춰야 하는지 실용적인 방법을 알려줍니다.

const logAddToCart = (userId, item) => {};

const addItem = (cart, item) => objectSet(cart, item.name, item);

const removeItemByName = (cart, name) => objectDelete(cart, name);

const cartTax = (cart) => calcTax(calcTotal(cart));

const isInCart = (cart, name) => cart.hasOwnProperty(name);

const getsFreeShipping = (cart) => calcTotal(cart) >= 20;

const makeItem = (name, number) => ({ name, number });

const calcTotal = (cart) => {
  let total = 0;
  const names = Object.keys(cart);
  for (let i = 0; i < names; i++) {
    const item = cart[names[i]];
    total += item.price;
  }

  return total;
};

const setPriceByName = (cart, name, price) => {
  if (isInCart(cart, name)) {
    const item = cart[name];
    const copy = setPrice(item, price);
    return objectSet(cart, name, copy);
  } else {
    const itme = makeItem(name, price);
    return objectSet(cart, name, item);
  }
};

const freeTieClip = (cart) => {
  let hasTie = isInCart(cart, "tie");
  let hasTieClip = isInCart(cart, "tie clip");

  if (hasTie && hasTieClip) {
    const tieClip = makeItem("tie clip", 0);
    return addItem(cart, tieClip);
  }

  return cart;
};
