import * as BABYLON from '@babylonjs/core';
import { Engine } from '@babylonjs/core';

document.addEventListener('DOMContentLoaded', async () => {
  const canvas = document.getElementById('renderCanvas');
  const engine = new BABYLON.Engine(canvas);

  const createScene = async function () {
    const scene = new BABYLON.Scene(engine);

    const camera = new BABYLON.ArcRotateCamera("camera", Math.PI / 2, Math.PI / 5, 12, new BABYLON.Vector3(0, 0, 0), scene);

    camera.attachControl(canvas, true);

    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 1), scene);

    const ground = new BABYLON.MeshBuilder.CreateGroundFromHeightMap('', './xray.png', {
      height: 10,
      width: 10,
      depth: 10,
      subdivisions: 1000   
    })

    // const ground = BABYLON.MeshBuilder.CreateSphere("ground", {
    //   diameter: 20,
    //   tessellation: 100,
    //   sideOrientation: BABYLON.Mesh.FRONTSIDE
    // }, scene);
    
    
    // const heightmapTexture = new BABYLON.Texture("heightmap2.png", scene);
    
    // // Create a custom shader material
    // const customMaterial = new BABYLON.ShaderMaterial("customShader", scene, {
    //   vertex: "custom",
    //   fragment: "custom",
    // },
    // {
    //   attributes: ["position", "normal", "uv"],
    //   uniforms: ["world", "worldView", "worldViewProjection", "heightmap"],
    // });
    
    // // Set the custom shader material to the sphere
    // ground.material = customMaterial;
    // customMaterial.setTexture("heightmap", heightmapTexture);
    
    // // Vertex shader code
    // BABYLON.Effect.ShadersStore["customVertexShader"] = `
    //   attribute vec3 position;
    //   attribute vec2 uv;

    //   uniform mat4 worldViewProjection;
    //   uniform sampler2D heightmap;

    //   varying vec2 vUV;

    //   void main(void) {
    //       vUV = uv;
    //       vec3 displacedPosition = position + texture2D(heightmap, vUV).rgb * 2.0 - 1.0;
    //       gl_Position = worldViewProjection * vec4(displacedPosition, 1.0);
    //   }
    // `;

    // // Fragment shader code
    // BABYLON.Effect.ShadersStore["customFragmentShader"] = `
    //   void main(void) {
    //       gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0); // White color
    //   }
    // `;  
    

    const donut = BABYLON.MeshBuilder.CreateTorus("donut", { 
      diameter: 3,
      tessellation: 100,
      thickness: 0.2
    }, scene);
    const donut1 = BABYLON.MeshBuilder.CreateTorus("donut1", { 
      diameter: 2.33,
      tessellation: 100,
      thickness: 0.2
    }, scene);
    const donut2 = BABYLON.MeshBuilder.CreateTorus("donut2", { 
      diameter: 1.66,
      tessellation: 100,
      thickness: 0.2
    }, scene);
    const donut3 = BABYLON.MeshBuilder.CreateTorus("donut3", { 
      diameter: 1,
      tessellation: 100,
      thickness: 0.2
    }, scene);
    const disc = BABYLON.MeshBuilder.CreateSphere("disc", { 
      diameterX: 3,
      diameterY: 0.7,
      diameterZ: 3,
      tessellation: 100
    }, scene);
    const ball = BABYLON.MeshBuilder.CreateSphere("ball", { 
      tessellation: 100
    }, scene);

    const material = new BABYLON.StandardMaterial("material", scene);
    material.diffuseColor = new BABYLON.Color3(1,2,5); 
    donut.material = material;
    donut1.material = material;
    donut2.material = material;
    donut3.material = material;

    const material1 = new BABYLON.StandardMaterial("material2", scene);
    material1.diffuseColor = new BABYLON.Color3(1,5,1); 
    disc.material = material1;

    const material2 = new BABYLON.StandardMaterial("material2", scene);
    material2.diffuseColor = new BABYLON.Color3(0,1,10); 
    ball.material = material2;

    donut.position = new BABYLON.Vector3(0, 11, 0);
    donut1.position = new BABYLON.Vector3(0, 12, 0);
    donut2.position = new BABYLON.Vector3(0, 13, 0);
    donut3.position = new BABYLON.Vector3(0, 14, 0);
    disc.position = new BABYLON.Vector3(0, 15, 0);
    ball.position = new BABYLON.Vector3(0, 15.5, 0);

    return scene;
  };

  const scene = await createScene();

  BABYLON.WebXRDefaultExperience.CreateAsync(scene);

  engine.runRenderLoop(function () {
    scene.render();
  });

  window.addEventListener('resize', function () {
    engine.resize();
  });
});
