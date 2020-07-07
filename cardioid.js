
// ページの読み込みを待つ
window.addEventListener('load', init);

function init() {
  // サイズを指定
  const width = 960;
  const height = 540;

  // レンダラーを作成
  const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#myCanvas')
  });
  renderer.setSize(width, height);

  // シーンを作成
  const scene = new THREE.Scene();

  // カメラを作成
  const camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000000);
  // カメラの初期座標を設定
  camera.position.set(1000, 1000, 1000);

  // カメラコントローラーを作成
  const controls = new THREE.OrbitControls(camera);

  //軸を作成(緑がy軸、赤がx軸、青がz軸)
  const plane2=new THREE.AxesHelper(300);
  scene.add(plane2);


  var number = 3;
  var size = 30;

　
  const geometry1 = new THREE.Geometry();
  const geometry2 = new THREE.Geometry();


  for(let i=0;i<size;i++){

    const radius = 100;
    const speed = 360 / size;

    //点作成
    const point = new THREE.Mesh(
      new THREE.SphereGeometry(5, 100, 100),
    );
    const point2 = new THREE.Mesh(
      new THREE.SphereGeometry(5, 100, 100),
    );

    const rad = i * speed * Math.PI / 180;

    point.position.set(
      radius * Math.sin(rad) ** number,
      radius * Math.cos(rad) ** number,
      0
    );

    point2.position.set(
      0,
      radius * Math.cos(rad) ** number,
      radius * Math.sin(rad) ** number,
    );

    geometry1.mergeMesh(point);
    geometry2.mergeMesh(point2);
  }
  const material = new THREE.MeshNormalMaterial();

  const mesh1 = new THREE.Mesh(geometry1, material);
  scene.add(mesh1);


  const material2 = new THREE.MeshNormalMaterial();

  const mesh2 = new THREE.Mesh(geometry2, material2);
  scene.add(mesh2);

  tick();

  // 毎フレーム時に実行されるループイベントです
  function tick() {
    // レンダリング
    renderer.render(scene, camera);
    requestAnimationFrame(tick);
    }

  onResize();

  window.addEventListener('resize', onResize);

  function onResize(){
    const width =window.innerWidth;
    const height=window.innerHeight;

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);

    camera.aspect = width /height;
    camera.updateProjectionMatrix();
  }
}

/*気づいたこと*/


//コンパイルしてくれないから、文字の打ち間違いとかに気づかない
//タイピングのミス1つで真っ黒になる->落ち込む