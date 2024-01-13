function getRandomSize() {
  let r = pow(random(0, 1), 3);
  return constrain(r * 32, 2, 32);
  //   while (true) {
  //     // 0에서 1 사이의 무작위한 값 두 개 생성
  //     let r1 = random(1);
  //     let r2 = random(1);

  //     // 만약 r2가 r1보다 크면 조건을 만족하고 루프를 빠져나감
  //     if (r2 > r1) {
  //       return r1 * 36; // 0에서 36 사이의 랜덤 숫자
  //     }
  //   }

  // 가우스시안 분포
  //   let r = randomGaussian() * 2.5;
  // 평균이 0이고 표준편차가 1인 정규분포를 따르는 난수를 생성한다
  // 평균 근처의 값이 더 자주 나오고, 크거나 작은 값은 더 드물게 나온다
  // 2를 곱함: 난수의 범위는 -2에서 2 사이
  //   return constrain(abs(r * r), 2, 36);
  // abs(): 절대값. 음수일 경우 양수로 반환
  // constrain(): 해당 값을 2와 36 픽셀 사이로 제한한다
}

class Snowflake {
  constructor(sx, sy) {
    let x = sx || this.random(width);
    let y = sy || this.random(-100, -10);
    // this.img = img;
    this.position = createVector(x, y);
    this.velocity = createVector(0, 0); // 속도
    this.acceleration = createVector(); // 가속도
    // this.random = random(0, 36);
    this.random = getRandomSize();
    // 확률적으로 작은 눈송이가 많아짐!!
  }

  applyForce(force) {
    // Parallax Effect Hack
    let f = force.copy();
    f.mult(this.random);

    // let f = force.copy();
    // f.div(this.mass);
    this.acceleration.add(f);
  }

  randomize() {
    let x = random(width);
    let y = random(-100, -10);
    this.position = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector();
    this.random = getRandomSize();
  }

  update() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.random * 0.2);

    // 속도가 느린 눈송이가 많아질 경우 화면상 그려지는 눈송이가 너무 많아진다.
    // --> 렌더링 속도가 느려짐을 방지하기 위함
    if (this.velocity.mag() < 1) {
      // this.velocity.mag: velocity 벡터의 크기. 즉 길이
      this.velocity.normalize();
      // 벡터를 정규화하면 벡터의 방향은 그대로 유지되면서 길이가 1이 된다
      // 속도 벡터의 크기를 1로 맞춤으로써 객체가 일정한 속도로 움직이도록하는 역할
    }
    this.position.add(this.velocity);
    this.acceleration.mult(0);

    // 화면상에서 눈꽃이 벗어나면 다시 위치를 새로 얻어서 재활용한다
    if (this.position.y > height + this.random) {
      this.randomize();
    }
  }

  render() {
    stroke(255);
    strokeWeight(this.random);
    point(this.position.x, this.position.y);
  }

  //   offScreen() {
  //     return this.position.y > height + this.random;
  //   }
}
