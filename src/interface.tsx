import * as BABYLON from '@babylonjs/core';
import * as GUI from '@babylonjs/gui';
import {restartScene} from './create_scene'
import {setDiffilcultyEasy, setDiffilcultyMedium, setDiffilcultyExpert,
change_theme_foot, change_theme_futur, change_theme_wood, ConfigureTextBlocks} from './buttons'

export function createGUI(elements, Interface, scene, difficulties, points_game) {
  
  const restartButton = GUI.Button.CreateSimpleButton('restartButton', 'PLAY');
  restartButton.width = '150px';
  restartButton.height = '40px';
  restartButton.color = 'white';
  restartButton.background = '#2729b0';
  restartButton.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
  restartButton.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
  restartButton.top = '100px';

  const changeModeOrigin = GUI.Button.CreateSimpleButton('ChangeModeOrigin', 'ORIGINAL');
  changeModeOrigin.width = '100px';
  changeModeOrigin.height = '40px';
  changeModeOrigin.color = 'white';
  changeModeOrigin.background = '#000000';
  changeModeOrigin.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
  changeModeOrigin.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
  changeModeOrigin.top = '20px';
  changeModeOrigin.left = '200px';

  const changeModeFps = GUI.Button.CreateSimpleButton('ChangeModeFps', 'FPS');
  changeModeFps.width = '100px';
  changeModeFps.height = '40px';
  changeModeFps.color = 'white';
  changeModeFps.background = '#000000';
  changeModeFps.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
  changeModeFps.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
  changeModeFps.top = '20px';
  changeModeFps.left = '-200px';

  const football_theme = GUI.Button.CreateImageOnlyButton("footballButton", "grass_mini.jpg");
  football_theme.width = '30px';
  football_theme.height = '30px';
  football_theme.image.stretch = GUI.Image.STRETCH_UNIFORM;
  football_theme.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
  football_theme.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
  football_theme.top = '50px';

  const wood_theme = GUI.Button.CreateImageOnlyButton("woodButton", "raw_plank.jpeg");
  wood_theme.width = '30px';
  wood_theme.height = '30px';
  wood_theme.image.stretch = GUI.Image.STRETCH_UNIFORM;
  wood_theme.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
  wood_theme.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
  wood_theme.top = '125px';
  
  const futur_theme = GUI.Button.CreateImageOnlyButton("futurButton", "abstract_ground_mini.jpg");
  futur_theme.width = '30px';
  futur_theme.height = '30px';
  futur_theme.image.stretch = GUI.Image.STRETCH_UNIFORM;
  futur_theme.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
  futur_theme.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
  futur_theme.top = '200px';

  const difficulties_easy_Button = GUI.Button.CreateSimpleButton('easyButton', 'EASY');
  difficulties_easy_Button.width = '100px';
  difficulties_easy_Button.height = '40px';
  if (difficulties.type === 1)
    difficulties_easy_Button.color = 'white';
  else
    difficulties_easy_Button.color = 'grey';
  difficulties_easy_Button.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
  difficulties_easy_Button.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
  difficulties_easy_Button.top = '50px';

  const difficulties_medium_Button = GUI.Button.CreateSimpleButton('mediumButton', 'MEDIUM');
  difficulties_medium_Button.width = '100px';
  difficulties_medium_Button.height = '40px';
  if (difficulties.type === 2)
    difficulties_medium_Button.color = 'white';
  else
    difficulties_medium_Button.color = 'grey';
  difficulties_medium_Button.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
  difficulties_medium_Button.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
  difficulties_medium_Button.top = '100px';

  const difficulties_expert_Button = GUI.Button.CreateSimpleButton('hardButton', 'EXPERT');
  difficulties_expert_Button.width = '100px';
  difficulties_expert_Button.height = '40px';
  if (difficulties.type === 3)
    difficulties_expert_Button.color = 'white';
  else
    difficulties_expert_Button.color = 'grey';
  difficulties_expert_Button.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
  difficulties_expert_Button.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
  difficulties_expert_Button.top = '150px';

  ConfigureTextBlocks(Interface.textBlock, Interface.textBlock2, Interface.advancedTexture, points_game)
  difficulties_easy_Button.onPointerClickObservable.add(() => {
    if (elements.isRenderingActive === false  && difficulties.type != 1) {
      difficulties_easy_Button.color = 'white';
      difficulties_expert_Button.color = 'grey';
      difficulties_medium_Button.color = 'grey';
      if (difficulties.type === 3)
      {
        elements.column.dispose();
        elements.column1.dispose();
        elements.column2.dispose();
        elements.column3.dispose();
      }
      setDiffilcultyEasy(difficulties, elements);
    }
  });

  difficulties_medium_Button.onPointerClickObservable.add(() => {
    if (elements.isRenderingActive === false  && difficulties.type != 2) {
      difficulties_easy_Button.color = 'grey';
      difficulties_expert_Button.color = 'grey';
      difficulties_medium_Button.color = 'white';
      if (difficulties.type === 3)
      {
        elements.column.dispose();
        elements.column1.dispose();
        elements.column2.dispose();
        elements.column3.dispose();
      }
      setDiffilcultyMedium(difficulties, elements);  
    }
  });

  difficulties_expert_Button.onPointerClickObservable.add(() => {
    if (elements.isRenderingActive === false && difficulties.type != 3) {
      difficulties_easy_Button.color = 'grey';
      difficulties_expert_Button.color = 'white';
      difficulties_medium_Button.color = 'grey';
      setDiffilcultyExpert(difficulties, elements, scene);
    }
  });
  wood_theme.onPointerClickObservable.add(() => {
    change_theme_wood(elements, scene);
  });

  football_theme.onPointerClickObservable.add(() => {
    change_theme_foot(elements, scene);
  });

  futur_theme.onPointerClickObservable.add(() => {
    change_theme_futur(elements, scene);
  });

  changeModeOrigin.onPointerClickObservable.add(() => {
    /*elements.camera.alpha = -Math.PI / 2;
  elements.camera.beta = Math.PI / 2.5;
  elements.camera.radius = 3;*/
  elements.camera.position = new BABYLON.Vector3(0, 20, 0);
  elements.lightshadow.intensity = 0.15;
  elements.camera.alpha = -Math.PI;
  elements.light.intensity = 0.1;
  elements.light2.intensity = 0.1;
  elements.light3.intensity = 0.1;
  });

  changeModeFps.onPointerClickObservable.add(() => {
  elements.camera.position = new BABYLON.Vector3(0, 3.25, -15.657);
  elements.lightshadow.intensity = 2;
  elements.light.intensity = 0.5;
  elements.light2.intensity = 0.5;
  elements.light3.intensity = 0.5;
  });
  
  restartButton.onPointerClickObservable.add(() => {
    if (elements.started < 1)
    {
      restartScene(elements, difficulties, Interface.advancedTexture);
      elements.started += 1;
    }
    });
  Interface.advancedTexture.addControl(difficulties_expert_Button);
  Interface.advancedTexture.addControl(difficulties_medium_Button);
  Interface.advancedTexture.addControl(difficulties_easy_Button);
  if (elements.started < 1)
    Interface.advancedTexture.addControl(restartButton);
  Interface.advancedTexture.addControl(changeModeOrigin);
  Interface.advancedTexture.addControl(changeModeFps);
  Interface.advancedTexture.addControl(football_theme);
  Interface.advancedTexture.addControl(wood_theme);
  Interface.advancedTexture.addControl(futur_theme);
}

const message = new GUI.TextBlock();
export function showMessage(text, scene, advancedTexture) {
  message.text = text;
  message.color = 'white';
  message.fontSize = 48;
  message.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
  message.textVerticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER;
  message.isVisible = true;
  advancedTexture.addControl(message);
  setTimeout(function() {
    message.isVisible = false;
  }, 3000); 
}