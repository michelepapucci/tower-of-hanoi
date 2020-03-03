$(function () {
    let scene = new THREE.Scene();
    let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    let renderer = new THREE.WebGLRenderer();

    function createHanoiStructure() {
        let geometry = new THREE.BoxGeometry(6, 0.5, 1);
        let texture = new THREE.TextureLoader().load('texture/wood.jpg');
        let material = new THREE.MeshBasicMaterial({
            color: 0x00ff00,
            map: texture
        });
        let cube = new THREE.Mesh(geometry, material);
        scene.add(cube);
    }

    function setup() {
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        createHanoiStructure();
        camera.position.z = 5;
        camera.position.y = 1;
        renderer.render(scene, camera);
    }

    setup()


});
	