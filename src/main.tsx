import React, { useEffect, useRef } from 'react';
import * as BABYLON from '@babylonjs/core';
import * as GUI from '@babylonjs/gui';
import { AdvancedDynamicTexture} from '@babylonjs/gui';
import {createGUI, showMessage} from './interface'
import {ConfigureTextBlocks} from './buttons'
import {createScene, restartScene} from './create_scene'
import {play_management} from './playing';
import { createintroGUI } from './intro_interface';

    const difficulties = {
      type: 2,
      magnitude: 3.5, //vitesse de l'impulsion
      width_barre: 1.6, //largeur de la barre pour le joueur et l'adversaire
      bot_speed: 0.06, //vitesse de deplacement du bot
    }
    
    const points_game = {
      me: 0,
      opponent: 0,
    }
    
    const canvas = document.getElementById("renderCanvas");

    const engine = new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true, disableWebGL2Support: false });
    var scene = new BABYLON.Scene(engine);
    const textures = {
        theme: 1,
        texture_wood_wall: new BABYLON.Texture("wooden_diff.jpg", scene),
        texture_wood_ground: new BABYLON.Texture("raw_plank.jpeg", scene),
        texture_wood_back: new BABYLON.Texture("back3.jpg", scene),
        texture_foot_wall: new BABYLON.Texture("pong3d.jpg", scene),
        texture_foot_ground: new BABYLON.Texture("grass.jpg", scene),
        texture_foot_back: new BABYLON.Texture("back15.jpg", scene),
        texture_box: new BABYLON.Texture("white_plaster.jpeg", scene),
    }

    const elements = {
      box: BABYLON.MeshBuilder,
      box2: BABYLON.MeshBuilder,
      ball: BABYLON.MeshBuilder,
      wall_left: BABYLON.MeshBuilder,
      wall_right: BABYLON.MeshBuilder,
      ground: BABYLON.MeshBuilder,
      column: BABYLON.MeshBuilder,
      column1: BABYLON.MeshBuilder,
      column2: BABYLON.MeshBuilder,
      column3: BABYLON.MeshBuilder,
      skybox: BABYLON.MeshBuilder,
      isRenderingActive: false,
      camera: undefined,
      light: undefined,
      light2: undefined,
      light3: undefined,
      lightshadow: undefined,
      textures: textures,
      started: 0,
    }

    const Interface = {
      advancedTexture: GUI.AdvancedDynamicTexture.CreateFullscreenUI('UI'),
      textBlock: new GUI.TextBlock(),
      textBlock2: new GUI.TextBlock(),
    }

    createintroGUI(elements, Interface, scene, difficulties, points_game);

    let boxDirection = "";
    function updateBoxPosition() {
      const step = 0.1;
      const originalPosition = elements.ball.position.clone();
      if (boxDirection === "left" && elements.box.position.x >= (-5 + difficulties.width_barre / 2) + step) {
        elements.box.position.x -= step;
      } else if (boxDirection === "right" && elements.box.position.x <= (5 - difficulties.width_barre / 2) - step) {
        elements.box.position.x += step;
      }
    };

    document.addEventListener("keyup", (event) => {
      if (event.key === "ArrowLeft" || event.key === "ArrowRight" || event.key === "ArrowDown" || event.key === "ArrowUp") {
        boxDirection = "";
      }
    });
    
    document.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
        boxDirection = "left";
      } else if (event.key === "ArrowRight" || event.key === "ArrowUp") {
        boxDirection = "right";
      }
    });
    

    document.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft" || event.key === "ArrowRight" || event.key === "ArrowDown" || event.key === "ArrowUp") {
        event.preventDefault();
      }
    });

    createScene(elements, difficulties, scene, canvas, Interface, points_game).then((scene) => {
      elements.isRenderingActive = false;
        engine.runRenderLoop(function () {
        if (scene) {
          updateBoxPosition();
          play_management(elements, difficulties, Interface, scene, points_game);
          scene.render();
        }
        });
        
    });
        
    window.addEventListener("resize", function () {
        engine.resize();
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });