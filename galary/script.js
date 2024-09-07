
const images = [
    { src: '../galary/img/img1.png', width: 392, height: 698 },
    { src: '../galary/img/img2.png', width: 392, height: 698 },
    { src: '../galary/img/img3.png', width: 720, height: 720 },
    { src: '../galary/img/img4.png', width: 720, height: 720 },
    { src: '../galary/img/img5.png', width: 720, height: 720 },
    { src: '../galary/img/img6.png', width: 720, height: 720 }
];

// Infinite scrolling variables
let currentImageIndex = 0;
const galleryContainer = document.getElementById('gallery-container');


function loadImages() {
    for (let i = 0; i < 5; i++) { 
        if (currentImageIndex >= images.length) {
            currentImageIndex = 0;  
        }

        const imageFrame = document.createElement('div');
        imageFrame.classList.add('image-frame');


        const imgData = images[currentImageIndex];
        imageFrame.style.width = `${imgData.width}px`;
        imageFrame.style.height = `${imgData.height}px`;

        const img = document.createElement('img');
        img.src = imgData.src;
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = 'cover'; 

        imageFrame.appendChild(img);

      
        addThreeJsFrame(imageFrame, imgData.width, imgData.height);

        galleryContainer.appendChild(imageFrame);
        currentImageIndex++;
    }
}

window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        loadImages();
    }
});


loadImages();


function addThreeJsFrame(container, width, height) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry(width - 10, height - 10, 10); 
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true });
    const frame = new THREE.Mesh(geometry, material);
    scene.add(frame);

    camera.position.z = 500;

    const animate = function () {
        requestAnimationFrame(animate);
        frame.rotation.x += 0.01;
        frame.rotation.y += 0.01;
        renderer.render(scene, camera);
    };

    animate();
}
