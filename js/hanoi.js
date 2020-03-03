$(function () {
    let scene = new THREE.Scene();
    let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    let renderer = new THREE.WebGLRenderer();

    function createHanoiStructure() {
        let board_geom = new THREE.BoxGeometry(6, 0.5, 1);
        //let texture = new THREE.TextureLoader().load('texture/wood.jpg');
        let material = new THREE.MeshBasicMaterial({
            color: 0x00ff00
        });

        let board = new THREE.Mesh(board_geom, material);
        board.castShadow = true;
        board.receiveShadow = true;

        let stick_geom = new THREE.CylinderGeometry(0.25, 0.25, 3, 20);
        let first_stick = new THREE.Mesh(stick_geom, material);
        first_stick.castShadow = true;
        first_stick.receiveShadow = true;
        first_stick.position.set(-1.5, 1.5, 1);

        let second_stick = new THREE.Mesh(stick_geom, material);
        second_stick.castShadow = true;
        second_stick.receiveShadow = true;
        second_stick.position.set(0, 1.5, 1);

        let third_stick = new THREE.Mesh(stick_geom, material);
        third_stick.castShadow = true;
        third_stick.receiveShadow = true;
        third_stick.position.set(1.5, 1.5, 1);

        var geometry = new THREE.RingGeometry(0.25, 0.5, 20);
        var mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(-4, 0, 0);
        scene.add(mesh);

        scene.add(board);
        scene.add(first_stick);
        scene.add(second_stick);
        scene.add(third_stick);
    }

    function setup() {
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        createHanoiStructure();
        camera.position.z = 5;
        camera.position.y = 1;
        const light = new THREE.PointLight(0xffffff, 5, 100);
        light.position.set(0, 0, 10);
        scene.add(light);

        renderer.render(scene, camera);
    }

    setup();


});
	