let snow = [];
let gravity;

function setup() {
  createCanvas(windowWidth, windowHeight);
  gravity = createVector(0, 0.3); // y 방향으로 가속도를 0.03 주겠다

  for (let i = 0; i < 400; i++) {
    let x = random(width);
    let y = random(height);
    // let design = random(textures);
    snow.push(new Snowflake(x, y));
  }
}

function draw() {
  background(0);

  //   snow.push(new Snowflake());
  for (flake of snow) {
    flake.applyForce(gravity);
    flake.update();
    flake.render();
  }

  // flake가 화면 밖으로 나가게되면 배열에서 제거한다
  //   for (let i = snow.length - 1; i >= 0; i--) {
  //     if (snow[i].offScreen()) {
  //       snow.splice(i, 1);
  //     }
  //   }
}
