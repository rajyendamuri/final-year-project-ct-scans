import * as BABYLON from '@babylonjs/core';

document.addEventListener('DOMContentLoaded', async () => {
  const canvas = document.getElementById('renderCanvas');
  const engine = new BABYLON.Engine(canvas);

  const createScene = async function () {
    const scene = new BABYLON.Scene(engine);

    const camera = new BABYLON.ArcRotateCamera("camera", Math.PI / 2, Math.PI / 5, 12, new BABYLON.Vector3(0, 0, 0), scene);

    camera.attachControl(canvas, true);

    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 1), scene);

    // Use the correct asset path for the heightmap texture
    const ground = new BABYLON.MeshBuilder.CreateGroundFromHeightMap('ground', '/final-year-project-ct-scans/xray.png', {
      height: 10,
      width: 10,
      subdivisions: 1000,
    });

    // ... (other code)

    return scene;
  };

  const scene = await createScene();

  engine.runRenderLoop(function () {
    scene.render();
  });

  window.addEventListener('resize', function () {
    engine.resize();
  });
});
