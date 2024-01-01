// import * as THREE from 'three';
// import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';


// const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

// const renderer = new THREE.WebGLRenderer();
// renderer.setSize( window.innerWidth, window.innerHeight );
// document.body.appendChild( renderer.domElement );


// const geometry = new THREE.BoxGeometry( 1, 1, 1 );
// const material = new THREE.MeshBasicMaterial( { color: 0x0000ff } );
// const cube = new THREE.Mesh( geometry, material );
// scene.add( cube );

// const orbit = new OrbitControls(camera, renderer.domElement);
// camera.position.z = 5;
// orbit.update();

// function animate() {
// 	requestAnimationFrame( animate );
//     cube.rotation.x += 0.01;
//     cube.rotation.y += 0.01;
// 	renderer.render( scene, camera );
// }
// animate();



// const geometry = new THREE.SphereGeometry(3, 64, 64);
// const material = new THREE.MeshStandardMaterial({ color: "#00ff83" });
// const mesh = new THREE.Mesh(geometry, material);
// scene.add(mesh);

// const pointLight = new THREE.PointLight(0xffffff, 1);
// pointLight.position.set(0, 10, 10);
// scene.add(pointLight);

// const orbit = new OrbitControls(camera, renderer.domElement);
// camera.position.z = 5;

// // Animation loop
// function animate() {
//     requestAnimationFrame(animate);
//     renderer.render(scene, camera);
// }
// animate();



import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import fishTexture from './model/fish-texture.png';
import glassTexture from './model/glass-texture.png';

const canvas = document.querySelector('.webgl');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement); // Append the renderer's canvas to the document body

const glasstexture = new THREE.TextureLoader().load(glassTexture);
const diamondMaterial = new THREE.MeshStandardMaterial({
   map:glasstexture
});

const diamondGeometry = new THREE.IcosahedronGeometry(5, 0);
const diamond = new THREE.Mesh(diamondGeometry, diamondMaterial);
scene.add(diamond);

// Load the fish model separately

const fishtexture = new THREE.TextureLoader().load(fishTexture);
const material = new THREE.MeshStandardMaterial({ map:fishtexture });
const loader = new OBJLoader();
let fishModel;

loader.load('model/fish5.obj', (obj) => {
    fishModel = obj.children[0].clone();
    fishModel.traverse((child) => {
        if (child instanceof THREE.Mesh) {
            child.material = material;
        }
    });
    fishModel.position.set(2, 0, 0);
    scene.add(fishModel);
});

// Add lighting, controls, camera positioning, and rendering loop...

// Add lighting to the scene
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

const orbit = new OrbitControls(camera, renderer.domElement);
camera.position.z = 15;
orbit.update();

// Render loop
function animate() {
    requestAnimationFrame(animate);
    if (diamond) {
        diamond.rotation.x += 0.01;
        diamond.rotation.y += 0.01;
    }
    renderer.render(scene, camera);
}
animate();
