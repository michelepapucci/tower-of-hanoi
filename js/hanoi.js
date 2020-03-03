$(function () {
    $(window).on('resize', function () {
        camera.aspect = renderer.domElement.clientWidth / renderer.domElement.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(renderer.domElement.clientWidth, renderer.domElement.clientHeight);
    });

    let scene = new THREE.Scene();
    let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    let renderer = new THREE.WebGLRenderer();
    let n_sticks = 3;
    let stick_d = 0.25;
    let board_width = 6;
    let board_padding = 1;

    function createHanoiStructure() {
        let material;
        let board_geom = new THREE.BoxGeometry(board_width, 0.5, 1);
        let loader = new THREE.TextureLoader();
        loader.crossOrigin = "";
        loader.load('./texture/wood.jpg',
            function (texture) {
                material = new THREE.MeshBasicMaterial({
                    map: texture
                });
                let board = new THREE.Mesh(board_geom, material);
                board.castShadow = true;
                board.receiveShadow = true;
                scene.add(board);

                //Good solution but only works for odd number of sticks. Good for now.
                let stick_geom = new THREE.CylinderGeometry(stick_d, stick_d, 3, 20);
                let stick_x = (board_width - board_padding) / n_sticks;
                for(let i = - Math.floor(n_sticks/2); i < n_sticks - Math.floor(n_sticks/2); i++) {
                    let x = stick_x * i;
                    let stick = new THREE.Mesh(stick_geom, material);
                    stick.castShadow = true;
                    stick.receiveShadow = true;
                    stick.position.set(x, 1.5, 0.25);
                    scene.add(stick);
                }
            },

            function () {
            },

            function (error) {
                console.log(error);
            });
    }

    function createRing(stick_position) {
        let material = new THREE.MeshBasicMaterial({
            color: 0x00ff00
        });

        var geometry = new THREE.TorusGeometry(0.5, 0.1, 8, 20);
        var mesh = new THREE.Mesh(geometry, material);
        //Half height of board which is set to 0,0 + thickness of ring
        mesh.position.set(0, 0.25 + 0.1, 0.25);
        scene.add(mesh);
        mesh.rotation.x = Math.PI / 2;
    }

    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }

    function setup() {
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        createHanoiStructure();
        ring = createRing();

        camera.position.z = 5;
        camera.position.y = 1;

        let light = new THREE.PointLight(0xffffff, 5, 100);
        light.position.set(0, 0, 10);
        scene.add(light);

        renderer.render(scene, camera);
        animate();
    }

    setup();

});
	