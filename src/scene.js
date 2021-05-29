import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  // @ts-ignore
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

let renderer;
const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({
  color: 0x39ff14,
});

const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(20, 20, 20);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight);
// scene.add(pointLight, ambientLight);

const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper);

camera.position.z = 10;

export const resize = () => {
  // @ts-ignore
  renderer.setSize(window.innerWidth, window.innerHeight);
  // @ts-ignore
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
};

const addStar = () => {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  // @ts-ignore
  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
};

// @ts-ignore
Array(200).fill().forEach(addStar);

// Background
const spaceTexture = new THREE.TextureLoader().load("images/space.jpg");
scene.background = spaceTexture;

// Avatar
const doggieTexture = new THREE.TextureLoader().load("images/doggie.jpg");

const doggie = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshBasicMaterial({ map: doggieTexture })
);

scene.add(doggie);

// Moon
const sunTexture = new THREE.TextureLoader().load("images/sun.jpg");

const sun = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: sunTexture,
  })
);
sun.position.z = 30;
sun.position.x = -10;

export const moveCamera = () => {
  // @ts-ignore
  const t = document.body.getBoundingClientRect().top;

  sun.rotation.x += 0.005;
  sun.rotation.y += 0.0075;
  sun.rotation.z += 0.005;

  doggie.rotation.y += 0.01;
  doggie.rotation.z += 0.01;

  console.log(camera.rotation.y);

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
};

scene.add(sun);
// doggie.add(sun);

const animate = () => {
  // @ts-ignore
  requestAnimationFrame(animate);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.005;
  cube.rotation.z += 0.01;

  doggie.rotation.y += 0.01;
  sun.rotation.z += 0.01;

  renderer.render(scene, camera);
};

export const createScene = (el) => {
  renderer = new THREE.WebGLRenderer({ antialias: true, canvas: el });
  const controls = new OrbitControls(camera, renderer.domElement);
  // controls.update();
  resize();
  animate();
};
