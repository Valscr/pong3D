import * as BABYLON from '@babylonjs/core';
import * as GUI from '@babylonjs/gui';
import {displayCountdown} from './buttons'
import {createGUI} from './interface'
import { animation_intro } from './animation';


export function restartScene(elements, difficulties, advancedTexture) {
    elements.ball.physicsImpostor.setLinearVelocity(new BABYLON.Vector3(0, 0, 0));
    elements.ball.position.x = 0;
    elements.ball.position.y = 0.16;
    elements.ball.position.z = 0;
    elements.ball.isVisible = true;
    elements.isRenderingActive = false;
    var impulseDirection = new BABYLON.Vector3(0, 0, -3);
    var impulseMagnitude = difficulties.magnitude;
    displayCountdown(3, function() {
      // impulsion sur la balle au lancement de la partie
      elements.ball.physicsImpostor.applyImpulse(impulseDirection.scale(impulseMagnitude), elements.ball.getAbsolutePosition());
      elements.isRenderingActive = true;
    }, advancedTexture);
  };

  export const createScene = async function (elements, difficulties, scene, canvas, Interface, points_game) {
      
    elements.camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 3, new BABYLON.Vector3(75, 21.2, 21.2));
    //elements.camera = new BABYLON.ArcRotateCamera("camera", 0, 0, 0, new BABYLON.Vector3(0, 2.5, -16));
    elements.camera.setTarget(BABYLON.Vector3.Zero());
    scene.clearColor = BABYLON.Color3.Black();
    
    //elements.camera.attachControl(canvas, true);
    animation_intro(elements, scene, Interface, difficulties, points_game);

    elements.light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 10, 0), scene);
    elements.light2 = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 10, -6), scene);
    elements.light3 = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 10, 6), scene);
    elements.lightshadow = new BABYLON.DirectionalLight("lightshadow", new BABYLON.Vector3(0, -10, 0), scene);
    var generator = new BABYLON.ShadowGenerator(512, elements.lightshadow);
    elements.lightshadow.position = new BABYLON.Vector3(0, 5, 0);
    elements.lightshadow.intensity = 2;
    elements.light.intensity = 0.5;
    elements.light2.intensity = 0.5;
    elements.light3.intensity = 0.5;
    elements.light.shadowEnabled = true;
    elements.light2.shadowEnabled = true;
    elements.light3.shadowEnabled = true;
    
    scene.collisionsEnabled = true;
    // **** WALLS *****
    const material_wall = new BABYLON.StandardMaterial("material", scene);
    material_wall.diffuseTexture = new BABYLON.Texture("back12.jpg", scene);
  
    elements.wall_right = BABYLON.MeshBuilder.CreateBox('wall_right', { width: 10, height: 2.25, depth: 20});
    elements.wall_right.position.x = 10;
    elements.wall_right.position.y = 0.875;
    elements.wall_right.checkCollisions = true;
    elements.wall_right.receiveShadows = false;
    elements.wall_right.material = material_wall;
  
    elements.wall_left = BABYLON.MeshBuilder.CreateBox('wall_left', { width: 10, height: 2.25, depth: 20});
    elements.wall_left.position.x = -10;
    elements.wall_left.position.y = 0.875;
    elements.wall_left.checkCollisions = true;
    elements.wall_left.receiveShadows = false;
    elements.wall_left.material = material_wall;

    
    // *** BALL ***
    elements.ball = BABYLON.Mesh.CreateSphere("Ball", 32, 0.3, scene);
    elements.ball.position.y = 0.16;
    const material_ball = new BABYLON.StandardMaterial("materialName", scene);
    material_ball.alpha = 0.95;
    material_ball.diffuseColor = new BABYLON.Color3(0, 1, 0);
    material_ball.specularColor = new BABYLON.Color3(1, 1, 1);
    material_ball.emissiveColor = new BABYLON.Color3(0, 1, 0);
    elements.ball.material = material_ball;
    elements.ball.checkCollisions = true;
    elements.ball.material.specularPower = 100; 
   generator.addShadowCaster(elements.ball);
    // ****  BARRES ***
    elements.box = BABYLON.MeshBuilder.CreateBox('myBox', {
      size:0.1,
      width: difficulties.width_barre,
      height: 0.35,
      depth : 0.4
    });
    elements.box.position.y = 0.35 / 2;
    elements.box.position.z = -7;
    const texture_box = new BABYLON.Texture("white_plaster.jpeg", scene);
    const material_box = new BABYLON.StandardMaterial("material_box", scene);
    material_box.diffuseTexture = texture_box;
    material_box.diffuseColor = new BABYLON.Color3(0, 1, 0);
    material_box.specularColor = new BABYLON.Color3(1, 1, 1);
    material_box.emissiveColor = new BABYLON.Color3(0, 1, 0);
    elements.box.material = material_box;
    elements.box.checkCollisions = true;

    elements.box2 = BABYLON.MeshBuilder.CreateBox('barre', {
      size:0.1,
      width: difficulties.width_barre,
      height: 0.35,
      depth : 0.4
    });
    elements.box2.position.y = 0.35 / 2;
    elements.box2.position.z = 7;
    elements.box2.material = material_box;
    elements.box2.checkCollisions = true;

    // **** GROUND ****
    elements.ground = BABYLON.MeshBuilder.CreateBox("Ground", {width: 10, height: 0.25, depth: 20}, scene);
    elements.ground.position.y = -0.125;
    var texture = new BABYLON.Texture("abstract_ground.jpg", scene);
    const material = new BABYLON.StandardMaterial("material", scene);
    material.diffuseTexture = texture;
    elements.ground.material = material;
    elements.ground.material.shadowLevel = 0.4;
    elements.ground.receiveShadows = true;
    
    elements.skybox = BABYLON.Mesh.CreateBox("BackgroundSkybox", 100, scene, undefined, BABYLON.Mesh.DOUBLESIDE);
    //var texture = new BABYLON.Texture("grass.jpg", scene);
    var background_material= new BABYLON.StandardMaterial("backgroundMaterial", scene);
    background_material.diffuseTexture = new BABYLON.Texture("back5.jpg", scene);
    elements.skybox.material = background_material;
    // **** PHYSICS ****
    scene.enablePhysics(new BABYLON.Vector3(0, 0, 0), new BABYLON.CannonJSPlugin(), {iterations: 10});
    elements.ball.physicsImpostor = new BABYLON.PhysicsImpostor(elements.ball, BABYLON.PhysicsImpostor.SphereImpostor, { mass: 0.6, friction: 0, restitution: 1}, scene);
    elements.wall_right.physicsImpostor = new BABYLON.PhysicsImpostor(elements.wall_right, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, friction: 0, restitution: 1}, scene);
    elements.wall_left.physicsImpostor = new BABYLON.PhysicsImpostor(elements.wall_left, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, friction: 0, restitution: 1}, scene);
    elements.box.physicsImpostor = new BABYLON.PhysicsImpostor(elements.box, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, friction: 0, restitution: 1}, scene);
    elements.box2.physicsImpostor = new BABYLON.PhysicsImpostor(elements.box2, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, friction: 0, restitution: 1}, scene);
    elements.ground.physicsImpostor = new BABYLON.PhysicsImpostor(elements.ground, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, friction: 0, restitution: 0 }, scene);

    const ballbounce = new BABYLON.Sound("ball", "BallBounce.wav", scene);

    var ballPosition = 0;
    var boxPosition = 0;
    function applyImpulseToBall() {
      elements.ball.physicsImpostor.setLinearVelocity(new BABYLON.Vector3(0, 0, 0));
      var impulseDirection = new BABYLON.Vector3(2 / difficulties.width_barre * (ballPosition.x - boxPosition.x), 0, 2 - Math.abs(2 / difficulties.width_barre * (ballPosition.x - boxPosition.x)));
      var impulseMagnitude = difficulties.magnitude;
      elements.ball.physicsImpostor.applyImpulse(impulseDirection.scale(impulseMagnitude), ballPosition);
    }
    
    function applyImpulseToBall2() {
      elements.ball.physicsImpostor.setLinearVelocity(new BABYLON.Vector3(0, 0, 0));
      var impulseDirection = new BABYLON.Vector3(2 / difficulties.width_barre * (ballPosition.x - boxPosition.x), 0, -1 * (2 - Math.abs(2 / difficulties.width_barre * (ballPosition.x - boxPosition.x))));
      var impulseMagnitude = difficulties.magnitude;
      elements.ball.physicsImpostor.applyImpulse(impulseDirection.scale(impulseMagnitude), ballPosition);
    }
  
    elements.box.physicsImpostor.registerOnPhysicsCollide(elements.ball.physicsImpostor, function(main, collided) {
      if (collided.object === elements.ball) {
        ballbounce.play();
        ballPosition = elements.ball.getAbsolutePosition();
        boxPosition = elements.box.getAbsolutePosition();
        applyImpulseToBall();
      }
    });

    elements.wall_right.physicsImpostor.registerOnPhysicsCollide(elements.ball.physicsImpostor, function(main, collided) {
      ballbounce.play();
    });

    elements.wall_left.physicsImpostor.registerOnPhysicsCollide(elements.ball.physicsImpostor, function(main, collided) {
      ballbounce.play();
    });

    elements.box2.physicsImpostor.registerOnPhysicsCollide(elements.ball.physicsImpostor, function(main, collided) {
      if (collided.object === elements.ball) {
        ballbounce.play();
        ballPosition = elements.ball.getAbsolutePosition();
        boxPosition = elements.box2.getAbsolutePosition();
        applyImpulseToBall2();
      }
    });
    return scene;
  };
  