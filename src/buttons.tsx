import * as BABYLON from '@babylonjs/core';
import * as GUI from '@babylonjs/gui';

export function setDiffilcultyEasy(difficulties, elements) {
    difficulties.magnitude = 3.5;
    elements.box.scaling.x = 1.2;
    elements.box2.scaling.x = 1.2;
    difficulties.width_barre = 1.92;
    difficulties.bot_speed = 0.04;
    difficulties.type = 1;
  }

export function setDiffilcultyMedium(difficulties, elements) {
    difficulties.magnitude = 3.5;
    elements.box.scaling.x = 1;
    elements.box2.scaling.x = 1;
    difficulties.width_barre = 1.6;
    difficulties.bot_speed = 0.06;
    difficulties.type = 2;
  }
  
export function setDiffilcultyExpert(difficulties, elements, scene) {
    difficulties.magnitude = 3.6;
    elements.box.scaling.x = 0.75;
    elements.box2.scaling.x = 0.75;
    difficulties.width_barre = 0.9;
    difficulties.bot_speed = 0.09;
    difficulties.type = 3;
  
    // **** COLUMN ***
    const material_column = new BABYLON.StandardMaterial("material_column", scene);
    material_column.diffuseTexture = new BABYLON.Texture("synthetic_wood.jpeg", scene);
    material_column.diffuseColor = new BABYLON.Color3(1, 1, 1);
    elements.column = BABYLON.MeshBuilder.CreateCylinder(
      'cylinder', 
      { height: 1, diameterTop: 0.6, diameterBottom: 0.6}, 
      scene
    );
    elements.column.position.x = 1;
    if (elements.started === -1)
      elements.column.position.y = 0.5;
    else
      elements.column.position.y = 7;
    elements.column.position.z = 0;
    elements.column.material = material_column;
    elements.column.checkCollisions = true;
      
    elements.column1 = elements.column.clone();
    elements.column1.position.x = 2.5;
  
    elements.column2 = elements.column.clone();
    elements.column2.position.x = -1;
  
    elements.column3 = elements.column.clone();
    elements.column3.position.x = -2.5;
  
    if (elements.started > -1)
    {
      const animation = new BABYLON.Animation(
        'columnAnimation',
        'position.y',
        30, // Frame per second
        BABYLON.Animation.ANIMATIONTYPE_FLOAT,
        BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
      );
        const keyFrames = [
          { frame: 0, value: elements.column.position.y },
          { frame: 40, value: elements.column.position.y - 6.5 }
        ];
        animation.setKeys(keyFrames);
        
        elements.column.animations.push(animation);
        elements.column1.animations.push(animation);
        elements.column2.animations.push(animation);
        elements.column3.animations.push(animation);
      
        scene.beginAnimation(elements.column, 0, 40, false);
        scene.beginAnimation(elements.column1, 0, 40, false);
        scene.beginAnimation(elements.column2, 0, 40, false);
        scene.beginAnimation(elements.column3, 0, 40, false);
    
        scene.addMesh(elements.column);
        scene.addMesh(elements.column1);
        scene.addMesh(elements.column2);
        scene.addMesh(elements.column3);
      }
      setTimeout(() => {
        elements.column.physicsImpostor = new BABYLON.PhysicsImpostor(elements.column, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, friction: 0, restitution: 1}, scene);
        elements.column1.physicsImpostor = new BABYLON.PhysicsImpostor(elements.column1, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, friction: 0, restitution: 1}, scene);
        elements.column2.physicsImpostor = new BABYLON.PhysicsImpostor(elements.column2, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, friction: 0, restitution: 1}, scene);
        elements.column3.physicsImpostor = new BABYLON.PhysicsImpostor(elements.column3, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, friction: 0, restitution: 1}, scene);
      }, 1500);
  }

const message_count = new GUI.TextBlock();
export function displayCountdown(count, callback, advancedTexture) {  
  message_count.color = "white";
  message_count.fontSize = 100;
  message_count.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
  message_count.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER;
  message_count.top = '-200px';
  message_count.isVisible = false;
  
  advancedTexture.addControl(message_count);
  if (count >= 1) {
    message_count.text = count.toString();
    message_count.isVisible = true;
    setTimeout(function() {
      message_count.isVisible = false;
      displayCountdown(count - 1, callback, advancedTexture);
    }, 1000);
  } else {
    callback();
  }
}

export function change_theme_wood(elements, scene) {
  var material = new BABYLON.StandardMaterial("material", scene);
  material.diffuseTexture = elements.textures.texture_wood_ground;;
  elements.ground.material = material;
  material = new BABYLON.StandardMaterial("material", scene);
  material.diffuseTexture = elements.textures.texture_wood_wall;
  elements.wall_left.material = material;
  elements.wall_right.material = material;
  material = new BABYLON.StandardMaterial("material", scene);
  material.diffuseTexture = elements.textures.texture_wood_back;
  elements.skybox.material = material;
  const texture_box = new BABYLON.Texture("white_plaster.jpeg", scene);
  const material_box = new BABYLON.StandardMaterial("material_box", scene);
  material_box.diffuseTexture = texture_box;
  material_box.diffuseColor = new BABYLON.Color3(0.1, 0.1, 1);
  material_box.specularColor = new BABYLON.Color3(0.1, 0.1, 1);
  material_box.emissiveColor = new BABYLON.Color3(0.1, 0.1, 1);
  elements.box.material = material_box;
  elements.box2.material = material_box;
  const material_ball = new BABYLON.StandardMaterial("materialName", scene);
  material_ball.alpha = 0.95;
  material_ball.diffuseColor = new BABYLON.Color3(0.3, 0, 0.8);
  material_ball.specularColor = new BABYLON.Color3(1, 1, 1);
  material_ball.emissiveColor = new BABYLON.Color3(0.3, 0, 0.8);
  elements.ball.material = material_ball;
}

export function change_theme_foot(elements, scene) {
  var material = new BABYLON.StandardMaterial("material", scene);
  material.diffuseTexture = elements.textures.texture_foot_ground;
  elements.ground.material = material;
  material = new BABYLON.StandardMaterial("material", scene);
  material.diffuseTexture = elements.textures.texture_foot_wall;
  elements.wall_left.material = material;
  elements.wall_right.material = material;
  material = new BABYLON.StandardMaterial("material", scene);
  material.diffuseTexture = elements.textures.texture_foot_back;
  elements.skybox.material = material;
  const texture_box = new BABYLON.Texture("white_plaster.jpeg", scene);
  const material_box = new BABYLON.StandardMaterial("material_box", scene);
  material_box.diffuseTexture = texture_box;
  material_box.diffuseColor = new BABYLON.Color3(0.6, 0.2, 0.1);
  material_box.specularColor = new BABYLON.Color3(1, 1, 1);
  material_box.emissiveColor = new BABYLON.Color3(0.6, 0.2, 0.1);
  elements.box.material = material_box;
  elements.box2.material = material_box;
  const material_ball = new BABYLON.StandardMaterial("materialName", scene);
  material_ball.alpha = 0.95;
  material_ball.diffuseColor = new BABYLON.Color3(1, 0.4, 0);
  material_ball.specularColor = new BABYLON.Color3(1, 1, 1);
  material_ball.emissiveColor = new BABYLON.Color3(1, 0.4, 0);
  elements.ball.material = material_ball;
}

export function change_theme_futur(elements, scene) {
  var material = new BABYLON.StandardMaterial("material", scene);
  material.diffuseTexture = new BABYLON.Texture("abstract_ground.jpg", scene);
  elements.ground.material = material;
  material = new BABYLON.StandardMaterial("material", scene);
  material.diffuseTexture = new BABYLON.Texture("back12.jpg", scene);
  elements.wall_left.material = material;
  elements.wall_right.material = material;
  material = new BABYLON.StandardMaterial("material", scene);
  material.diffuseTexture = new BABYLON.Texture("back5.jpg", scene);
  elements.skybox.material = material;
  const texture_box = new BABYLON.Texture("white_plaster.jpeg", scene);
  const material_box = new BABYLON.StandardMaterial("material_box", scene);
  material_box.diffuseTexture = texture_box;
  material_box.diffuseColor = new BABYLON.Color3(0, 1, 0);
  material_box.specularColor = new BABYLON.Color3(1, 1, 1);
  material_box.emissiveColor = new BABYLON.Color3(0, 1, 0);
  elements.box.material = material_box;
  elements.box2.material = material_box;
  const material_ball = new BABYLON.StandardMaterial("materialName", scene);
  material_ball.alpha = 0.95;
  material_ball.diffuseColor = new BABYLON.Color3(0, 1, 0);
  material_ball.specularColor = new BABYLON.Color3(1, 1, 1);
  material_ball.emissiveColor = new BABYLON.Color3(0, 1, 0);
  elements.ball.material = material_ball;
}

export function ConfigureTextBlocks(textBlock, textBlock2, advancedTexture, points_game) {
  textBlock2.text = points_game.opponent;
  textBlock2.color = "white";
  textBlock2.fontSize = 50;
  textBlock2.top = "-350px";
  textBlock2.left = "-630px";
  advancedTexture.addControl(textBlock2);

  textBlock.text = points_game.me;
  textBlock.color = "white";
  textBlock.fontSize = 50;
  textBlock.top = "-350px";
  textBlock.left = "630px";
  advancedTexture.addControl(textBlock);
}
  