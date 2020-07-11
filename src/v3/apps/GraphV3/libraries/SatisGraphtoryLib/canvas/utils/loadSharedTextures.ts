import PIXI from 'v3/apps/GraphV3/libraries/SatisGraphtoryLib/canvas/utils/PixiProvider';
import {
  getBuildingIcon,
  getAllBuildableMachines,
} from 'v3/data/loaders/buildings';
import { getItemIcon, getMachineCraftableItems } from 'v3/data/loaders/items';
import { sgDevicePixelRatio } from 'v3/apps/GraphV3/libraries/SatisGraphtoryLib/canvas/utils/canvasUtils';
import {
  GREY,
  GREEN,
  YELLOW,
  ORANGE,
  BLUE,
  WHITE,
} from 'v3/apps/GraphV3/libraries/SatisGraphtoryLib/canvas/consts/Colors';
import {
  NODE_HEIGHT,
  NODE_WIDTH,
  BOX_THICKNESS,
  BOX_RADIUS,
  CIRCLE_RADIUS,
  CIRCLE_THICKNESS,
  ITEM_SIZE,
  MACHINE_ICON_SIZE,
  BADGE_HEIGHT,
  BADGE_RADIUS,
  BADGE_THICKNESS,
  BADGE_WIDTH,
  SMALL_BADGE_WIDTH,
} from 'v3/apps/GraphV3/libraries/SatisGraphtoryLib/canvas/consts/Sizes';

export const loadSharedTextures = (pixiRenderer: PIXI.Renderer) => {
  const gfx = new PIXI.Graphics();

  const x = 0,
    y = 0;

  // backboard
  gfx.lineStyle(BOX_THICKNESS, YELLOW, 1);
  gfx.beginFill(GREY, 1.0);
  gfx.drawRoundedRect(x, y, NODE_WIDTH, NODE_HEIGHT, BOX_RADIUS);
  gfx.endFill();
  // gfx.lineStyle(BOX_LINE_THICKNESS, YELLOW, 1);
  // gfx.moveTo(x, y + TOP_HEIGHT);
  // gfx.lineTo(x + NODE_WIDTH, y + TOP_HEIGHT);

  const bounds = gfx.getBounds();
  const backboard = pixiRenderer.generateTexture(
    gfx,
    PIXI.SCALE_MODES.LINEAR,
    sgDevicePixelRatio * 4,
    bounds
  );
  PIXI.Texture.addToCache(backboard, 'backboard');

  // badge (blue)
  gfx.clear();
  gfx.lineStyle(BADGE_THICKNESS, BLUE, 1);
  gfx.beginFill(GREY, 1.0);
  gfx.drawRoundedRect(x, y, BADGE_WIDTH, BADGE_HEIGHT, BADGE_RADIUS);
  gfx.endFill();
  const badge = pixiRenderer.generateTexture(
    gfx,
    PIXI.SCALE_MODES.LINEAR,
    sgDevicePixelRatio * 4,
    bounds
  );
  PIXI.Texture.addToCache(badge, 'badge');

  // badge (white)
  gfx.clear();
  gfx.lineStyle(BADGE_THICKNESS, WHITE, 1);
  gfx.beginFill(GREY, 1.0);
  gfx.drawRoundedRect(x, y, SMALL_BADGE_WIDTH, BADGE_HEIGHT, BADGE_RADIUS);
  gfx.endFill();
  const badge_white = pixiRenderer.generateTexture(
    gfx,
    PIXI.SCALE_MODES.LINEAR,
    sgDevicePixelRatio * 4,
    bounds
  );
  PIXI.Texture.addToCache(badge_white, 'badge_white');

  // inCircle
  gfx.clear();
  gfx.beginFill(GREEN, 1);
  gfx.lineStyle(CIRCLE_THICKNESS, GREY, 1);
  gfx.drawCircle(x, y, CIRCLE_RADIUS);
  gfx.endFill();

  const inBounds = gfx.getBounds();
  const inCircle = pixiRenderer.generateTexture(
    gfx,
    PIXI.SCALE_MODES.LINEAR,
    sgDevicePixelRatio * 4,
    inBounds
  );
  PIXI.Texture.addToCache(inCircle, 'inCircle');

  // outCircle
  gfx.clear();
  gfx.beginFill(ORANGE, 1);
  gfx.lineStyle(CIRCLE_THICKNESS, GREY, 1);
  gfx.drawCircle(x, y, CIRCLE_RADIUS);
  gfx.endFill();

  const outBounds = gfx.getBounds();
  const outCircle = pixiRenderer.generateTexture(
    gfx,
    PIXI.SCALE_MODES.LINEAR,
    sgDevicePixelRatio * 4,
    outBounds
  );
  PIXI.Texture.addToCache(outCircle, 'outCircle');

  // items and machines
  getMachineCraftableItems().forEach((element) => {
    const itemImg = getItemIcon(element, ITEM_SIZE);
    const itemIcon = new PIXI.BaseTexture(itemImg);
    const itemTex = new PIXI.Texture(itemIcon);
    PIXI.Texture.addToCache(itemTex, element);
  });

  getAllBuildableMachines().forEach((element) => {
    const machineImg = getBuildingIcon(element, MACHINE_ICON_SIZE);
    const machineIcon = new PIXI.BaseTexture(machineImg);
    const machineTex = new PIXI.Texture(machineIcon);
    PIXI.Texture.addToCache(machineTex, element);
  });
};