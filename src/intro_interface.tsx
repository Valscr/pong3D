import * as BABYLON from '@babylonjs/core';
import * as GUI from '@babylonjs/gui';
import { change_theme_wood, change_theme_foot, change_theme_futur, setDiffilcultyEasy, setDiffilcultyMedium, setDiffilcultyExpert} from './buttons';
import { animation_intro } from './animation';

export function createintroGUI(elements, Interface, scene, difficulties, points_game) {
    const playButton = GUI.Button.CreateSimpleButton('restartButton', 'PLAY');
    playButton.width = '150px';
    playButton.height = '100px';
    playButton.color = 'white';
    playButton.thickness = 6; 
    playButton.background = '#2729b0';
    playButton.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    playButton.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER;
    playButton.top = '-100px';

    const difficulties_easy_Button = GUI.Button.CreateSimpleButton('easyButton', 'EASY');
    difficulties_easy_Button.width = '100px';
    difficulties_easy_Button.height = '50px';
    if (difficulties.type === 1)
      difficulties_easy_Button.color = 'white';
    else
      difficulties_easy_Button.color = 'grey';
    difficulties_easy_Button.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    difficulties_easy_Button.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER;
    difficulties_easy_Button.top = '50px';

    const difficulties_medium_Button = GUI.Button.CreateSimpleButton('mediumButton', 'MEDIUM');
    difficulties_medium_Button.width = '100px';
    difficulties_medium_Button.height = '50px';
    if (difficulties.type === 2)
        difficulties_medium_Button.color = 'white';
    else
        difficulties_medium_Button.color = 'grey';
    difficulties_medium_Button.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    difficulties_medium_Button.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER;
    difficulties_medium_Button.top = '120px';

    const difficulties_expert_Button = GUI.Button.CreateSimpleButton('hardButton', 'EXPERT');
    difficulties_expert_Button.width = '100px';
    difficulties_expert_Button.height = '50px';
    if (difficulties.type === 3)
        difficulties_expert_Button.color = 'white';
    else
        difficulties_expert_Button.color = 'grey';
    difficulties_expert_Button.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    difficulties_expert_Button.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER;
    difficulties_expert_Button.top = '190px';
      

    const football_theme = GUI.Button.CreateImageOnlyButton("footballButton", "grass_mini.jpg");
    football_theme.width = '100px';
    football_theme.height = '100px';
    football_theme.thickness = 10; 
    if (elements.textures.theme === 2)
        football_theme.color = 'white';
    else
        football_theme.color = 'black';
    football_theme.image.stretch = GUI.Image.STRETCH_UNIFORM;
    football_theme.left = (- window.innerWidth / 4) + "px";
    football_theme.top = ((- window.innerHeight / 4)) + "px";

    const wood_theme = GUI.Button.CreateImageOnlyButton("woodButton", "raw_plank.jpeg");
    wood_theme.width = '100px';
    wood_theme.height = '100px';
    wood_theme.thickness = 10; 
    if (elements.textures.theme === 3)
        wood_theme.color = 'white';
    else
        wood_theme.color = 'black';
    wood_theme.image.stretch = GUI.Image.STRETCH_UNIFORM;
    wood_theme.left =  (- window.innerWidth / 4) + "px";
    wood_theme.top =  0 + "px"

    const futur_theme = GUI.Button.CreateImageOnlyButton("futurButton", "abstract_ground_mini.jpg");
    futur_theme.width = '100px';
    futur_theme.height = '100px';
    futur_theme.thickness = 10;
    if (elements.textures.theme === 1)
        futur_theme.color = 'white';
    else
        futur_theme.color = 'black';
    futur_theme.image.stretch = GUI.Image.STRETCH_UNIFORM;
    futur_theme.left = (- window.innerWidth / 4) + "px";
    futur_theme.top = (window.innerHeight / 4) + "px";

    wood_theme.onPointerClickObservable.add(() => {
        elements.textures.theme = 3;
        futur_theme.color = 'black';
        football_theme.color = 'black';
        wood_theme.color = 'white';
        change_theme_wood(elements, scene);
    });

    football_theme.onPointerClickObservable.add(() => {
        elements.textures.theme = 2;
        futur_theme.color = 'black';
        football_theme.color = 'white';
        wood_theme.color = 'black';
        change_theme_foot(elements, scene);
    });

    futur_theme.onPointerClickObservable.add(() => {
        futur_theme.color = 'white';
        football_theme.color = 'black';
        wood_theme.color = 'black';
        elements.textures.theme = 1;
        change_theme_futur(elements, scene);
    });

    playButton.onPointerClickObservable.add(() => {
        playButton.dispose();
        difficulties_easy_Button.dispose();
        difficulties_medium_Button.dispose();
        difficulties_expert_Button.dispose();
        wood_theme.dispose();
        football_theme.dispose();
        futur_theme.dispose();
        animation_intro(elements, scene, Interface, difficulties, points_game);
    });
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
    Interface.advancedTexture.addControl(playButton);
    Interface.advancedTexture.addControl(difficulties_expert_Button);
    Interface.advancedTexture.addControl(difficulties_medium_Button);
    Interface.advancedTexture.addControl(difficulties_easy_Button);
    Interface.advancedTexture.addControl(football_theme);
    Interface.advancedTexture.addControl(wood_theme);
    Interface.advancedTexture.addControl(futur_theme);
}