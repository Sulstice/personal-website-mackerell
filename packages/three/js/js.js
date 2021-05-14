window.onload = function(){

    if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

    var stats;

    var camera, controls, scene, renderer;

    init();
    render(); // remove when using next line for animation loop (requestAnimationFrame)
    //animate();

    function init() {

        scene = new THREE.Scene();
        scene.background = new THREE.Color( 0xcccccc );
        scene.fog = new THREE.FogExp2( 0xcccccc, 0.002 );

        renderer = new THREE.WebGLRenderer();
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( window.innerWidth, window.innerHeight );

        var light = new THREE.DirectionalLight( 0xffffff );
        light.position.set( 1, 1, 1 );
        scene.add( light );

        var light = new THREE.DirectionalLight( 0x002288 );
        light.position.set( -1, -1, -1 );
        scene.add( light );

        var light = new THREE.AmbientLight( 0x222222 );
        scene.add( light );

        var container = document.getElementById( 'container' );
        container.appendChild( renderer.domElement );

        camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 1000 );
        camera.position.z = 500;

        controls = new THREE.OrbitControls( camera, renderer.domElement );
        controls.addEventListener( 'change', render ); // remove when using animation loop
        // enable animation loop when using damping or autorotation
        //controls.enableDamping = true;
        //controls.dampingFactor = 0.25;
        //controls.enableZoom = false;

        // world


        var cubematerial = new THREE.MeshPhongMaterial( {
            color: 0xffffff,
            flatShading: true
        });
        var regularMaterial = new THREE.MeshPhongMaterial({
            color: 0x00ff00ff
        });

        var geometry = new THREE.BoxGeometry(100,100,100);
        var mesh = new THREE.Mesh(geometry, cubematerial);

        scene.add(mesh);


        var floor = new THREE.PlaneGeometry(10000,10000,100,100);
        var floorMesh = new THREE.Mesh(floor, regularMaterial);
        floorMesh.rotation.x = -90*Math.PI /180;
        floorMesh.position.y = -100;
        scene.add(floorMesh);

        window.addEventListener( 'resize', onWindowResize, false );

    }

    function onWindowResize() {

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize( window.innerWidth, window.innerHeight );

    }

    function animate() {

        requestAnimationFrame( animate );

        controls.update(); // required if controls.enableDamping = true, or if controls.autoRotate = true

        stats.update();

        render();

    }

    function render() {

        renderer.render( scene, camera );

    }
}