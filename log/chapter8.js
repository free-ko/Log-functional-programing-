// <계층형 설계>
// - 소프트웨어 설계 : 코드를 만들고, 테스트하고, 유지보수하기 쉬운 프로그래밍 방법을 선택하기 위해 미적 감각을 사용하는 것

// <계층형 설계 패터1 : 직접 구현>
// - 반복문이나 배열 인덱스 참조 기능은 어넝에서 제공하는 기능입니다.
// - 직접 만든 함수와 언어 기능은 추상화 수준이 다릅니다.
// - 반복문과 배열 인덱스를 참조하는 기능은 더 낮은 추상화 단계 입니다.
// - 한 함수에서 서로 다른 추상화 단계를 사용하면 코드가 명확하지 않아 읽기 어렵습니다.
// - 계층이 높은 함수는 코드상 가장 밑에 있으며, 계층이 가장 낮은(유틸과 같은) 함수는 위에서 미리 선언되어 있습니다.
// - 같은 계층에 있는 함수는 같은 목적을 가져야 합니다.
// - 직접 구현 패턴을 사용하면 모든 화살표가 '같은 길이'를 가져야 합니다.

const arraySet = (array, idx, value) => {
  const copyArray = array.slice();
  copyArray[idx] = value;

  return copyArray;
};

const indexOfItem = (cart, name) =>
  cart.findIndex((item) => item.name === name);

const addItem = (cart, item) => [...cart, item];

const makeItem = (name, number) => ({ name, number });

const isInCart = (cart, name) => cart.some((item) => item.name === name);

const setPriceByName = (cart, name, price) => {
  let cartCopy = cart.slice();

  const idx = indexOfItem(cart, name);
  const isFindItem = idx !== -1;
  if (isFindItem) {
    return arraySet(cart, idx, setPrice(cart[idx], price));
  }

  return cartCopy;
};

const removeItemByName = (cart, name) => {
  const idx = indexOfItem(cart, name);

  const isFindItem = idx !== -1;
  if (isFindItem) return removeItem(cart, idx, 1);

  return cart;
};

const calcTotal = (cart) => {
  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    let item = cart[i];
    total += item.price;
  }

  return total;
};

const cartTax = (cart) => calcTax(calcTotal(cart));

const getsFreeShipping = (cart) => calcTotal(cart) >= 20;

const freeTieClip = (cart) => {
  let hasTie = isInCart(cart, "tie");
  let hasTieClip = isInCart(cart, "tie clip");

  if (hasTie && hasTieClip) {
    const tieClip = makeItem("tie clip", 0);
    return addItem(cart, tieClip);
  }

  return cart;
};

// <직접 구편 패턴 리뷰>
// - 직접 구현한 코드는 한 단계의 구체화 수준에 관한 문제만 해결합니다.
// - 계층형 설계는 특정 구체화 단계에 집중할 수 있게 도와줍니다.
// - 호출 그래프는 구체화 단계에 대한 풍부한 단서를 보여줍니다.
// - 함수를 추출하면 더 일반적인 함수로 만들 수 있습니다.
// - 일반적인 함수가 많을 수록 재사용하기 좋습니다.
// - 복잡성을 감추지 않습니다.
