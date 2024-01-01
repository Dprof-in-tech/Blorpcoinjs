import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import glassTexture from './model/fish-texture.png';

// Basic Three.js setup
const scene = new THREE.Scene();
const canvas = document.querySelector('.webgl');
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create a non-reflective green material for the diamond
const glasstexture = new THREE.TextureLoader().load(glassTexture);
const diamondMaterial = new THREE.MeshBasicMaterial({
  map: glasstexture
});

// Create an icosahedron geometry (20-sided diamond)
const diamondGeometry = new THREE.IcosahedronGeometry(5, 1);
const diamond = new THREE.Mesh(diamondGeometry, diamondMaterial);

// Add the diamond to the scene
scene.add(diamond);

// Add lighting to the scene
const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(10, 5, 10);
scene.add(pointLight);

// Position the camera
const orbit = new OrbitControls(camera, renderer.domElement);
camera.position.z = 20;
orbit.update();

// Render loop
function animate() {
  requestAnimationFrame(animate);

  // Rotate the diamond
  diamond.rotation.x += 0.01;
  diamond.rotation.y += 0.01;

  renderer.render(scene, camera);
}
animate();
