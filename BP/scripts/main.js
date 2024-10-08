import { EntityHealthComponent, system, world } from "@minecraft/server";
world.sendMessage("§a[Bedrock Jade]§r loaded");
var Emojis;
(function (Emojis) {
    Emojis["HeartEmpty"] = "\uE10F";
    Emojis["HeartHalf"] = "\uE10E";
    Emojis["HeartFull"] = "\uE10D";
})(Emojis || (Emojis = {}));
function toWord(strings) {
    let string = undefined;
    for (const part of strings) {
        let restOfWord = "";
        for (let i = 0; i < part.length; i++) {
            if (i === 0)
                continue;
            restOfWord = restOfWord + part[i];
        }
        string = (string ? string : "") + (string ? " " : "") + (part[0].toUpperCase() + restOfWord);
    }
    return string;
}
const BlockNames = {
    /* GRASS */
    "grass_block": "grass",
    "tall_grass": "tallgrass",
    "short_grass": "tallgrass.grass",
    /* FLOWERS */
    "poppy": "red_flower.poppy",
    "dandelion": "yellow_flower.dandelion",
    "cornflower": "red_flower.cornflower",
    "lily_of_the_valley": "red_flower.lilyOfTheValley",
    "oxeye_daisy": "red_flower.oxeyeDaisy",
    "white_tulip": "red_flower.tulipWhite",
    "red_tulip": "red_flower.tulipRed",
    "orange_tulip": "red_flower.tulipOrange",
    "pink_tulip": "red_flower.tulipPink",
    "azure_bluet": "red_flower.houstonia",
    "blue_orchid": "red_flower.blueOrchid",
    "allium": "red_flower.allium",
    "crimson_roots": "crimson_roots.crimsonRoots",
    "warped_roots": "warped_roots.warpedRoots",
    /* DOUBLE PLANT */
    "peony": "double_plant.paeonia",
    "rose_bush": "double_plant.rose",
    "lilac": "double_plant.syringa",
    "sunflower": "double_plant.sunflower",
    "large_fern": "double_plant.fern",
    "fern": "tallgrass.fern",
    /* LEAVES */
    "oak_leaves": "leaves.oak",
    "birch_leaves": "leaves.birch",
    "spruce_leaves": "leaves.spruce",
    "acacia_leaves": "leaves.acacia",
    "jungle_leaves": "leaves.jungle",
    "dark_oak_leaves": "leaves.big_oak",
    /* LOGS */
    "oak_log": "log.oak",
    "spruce_log": "log.spruce",
    "birch_log": "log.birch",
    "jungle_log": "log.jungle",
    "acacia_log": "log.acacia",
    "dark_oak_log": "log.big_oak",
    /* WOOD */
    "oak_wood": "wood.oak",
    "spruce_wood": "wood.spruce",
    "birch_wood": "wood.birch",
    "jungle_wood": "wood.jungle",
    "acacia_wood": "wood.acacia",
    "dark_oak_wood": "wood.dark_oak",
    "stripped_oak_wood": "wood.stripped.oak",
    "stripped_spruce_wood": "wood.stripped.spruce",
    "stripped_birch_wood": "wood.stripped.birch",
    "stripped_jungle_wood": "wood.stripped.jungle",
    "stripped_acacia_wood": "wood.stripped.acacia",
    "stripped_dark_oak_wood": "wood.stripped.dark_oak",
    /* PLANKS */
    "oak_planks": "planks.oak",
    "spruce_planks": "planks.spruce",
    "birch_planks": "planks.birch",
    "jungle_planks": "planks.jungle",
    "acacia_planks": "planks.acacia",
    "dark_oak_planks": "planks.big_oak",
    /* WOODEN SLABS */
    "oak_slab": "wooden_slab.oak",
    "spruce_slab": "wooden_slab.spruce",
    "birch_slab": "wooden_slab.birch",
    "jungle_slab": "wooden_slab.jungle",
    "acacia_slab": "wooden_slab.acacia",
    "dark_oak_slab": "wooden_slab.big_oak",
    /* FENCES */
    "oak_fence": "fence",
    "spruce_fence": "spruceFence",
    "birch_fence": "birchFence",
    "acacia_fence": "acaciaFence",
    "jungle_fence": "jungleFence",
    "dark_oak_fence": "darkOakFence",
    /* WALLS */
    "cobblestone_wall": "cobblestone_wall.normal",
    "mossy_cobblestone_wall": "cobblestone_wall.mossy",
    "end_stone_brick_wall": "cobblestone_wall.end_brick",
    "granite_wall": "cobblestone_wall.granite",
    "andesite_wall": "cobblestone_wall.andesite",
    "diorite_wall": "cobblestone_wall.diorite",
    "prismarine_wall": "cobblestone_wall.prismarine",
    "sandstone_wall": "cobblestone_wall.sandstone",
    "red_sandstone_wall": "cobblestone_wall.red_sandstone",
    "stone_brick_wall": "cobblestone_wall.stone_brick",
    "mossy_stone_brick_wall": "cobblestone_wall.mossy_stone_brick",
    "brick_wall": "cobblestone_wall.brick",
    "nether_brick_wall": "cobblestone_wall.nether_brick",
    "red_nether_brick_wall": "cobblestone_wall.red_nether_brick",
    /* CROPS */
    "pitcher_crop": "pitcher_pod",
    "torchflower_crop": "torchflower",
    "melon_stem": "melon_seeds",
    /* SAPLINGS */
    "oak_sapling": "sapling.oak",
    "acacia_sapling": "sapling.acacia",
    "birch_sapling": "sapling.birch",
    "spruce_sapling": "sapling.spruce",
    "jungle_sapling": "sapling.jungle",
    "dark_oak_sapling": "sapling.big_oak",
    /* STONE */
    "granite": "stone.granite",
    "andesite": "stone.andesite",
    "diorite": "stone.diorite",
    "stone": "stone.stone",
    "polished_granite": "stone.graniteSmooth",
    "polished_andesite": "stone.andesiteSmooth",
    "polished_diorite": "stone.dioriteSmooth",
    /* SANDSTONE */
    "chiseled_sandstone": "sandstone.chiseled",
    "cut_sandstone": "sandstone.cut",
    "smooth_sandstone": "sandstone.smooth",
    "chiseled_red_sandstone": "red_sandstone.chiseled",
    "cut_red_sandstone": "red_sandstone.cut",
    "smooth_red_sandstone": "red_sandstone.smooth",
    /* STONE BRICKS */
    "stone_bricks": "stonebrick.default",
    "cracked_stone_bricks": "stonebrick.cracked",
    "mossy_stone_bricks": "stonebrick.mossy",
    "chiseled_stone_bricks": "stonebrick.chiseled",
    /* STONE SLABS */
    "cobblestone_slab": "stone_slab.cobble",
    "normal_stone_slab": "stone_slab",
    "smooth_stone_slab": "stone_slab.stone",
    "mossy_cobblestone_slab": "stone_slab2.mossy_cobblestone",
    "sandstone_slab": "stone_slab.sand",
    "red_sandstone_slab": "stone_slab2.red_sandstone",
    "cut_sandstone_slab": "stone_slab4.cut_sandstone",
    "cut_red_sandstone_slab": "stone_slab4.cut_red_sandstone",
    "smooth_sandstone_slab": "stone_slab2.sandstone.smooth",
    "smooth_red_sandstone_slab": "stone_slab3.red_sandstone.smooth",
    /* INFESTED STONE */
    "infested_stone_bricks": "monster_egg.brick",
    "infested_cobblestone": "monster_egg.cobble",
    "infested_stone": "monster_egg.stone",
    "infested_mossy_stone_bricks": "monster_egg.mossybrick",
    "infested_cracked_stone_bricks": "monster_egg.crackedbrick",
    "infested_chiseled_stone_bricks": "monster_egg.chiseledbrick",
    /* ORES */
    "lit_redstone_ore": "redstone_ore",
    "lit_deepslate_redstone_ore": "deepslate_redstone_ore",
    /* SIGNS */
    "wall_sign": "standing_sign",
    "spruce_wall_sign": "spruce_standing_sign",
    "acacia_wall_sign": "acacia_standing_sign",
    "darkoak_wall_sign": "darkoak_standing_sign",
    "birch_wall_sign": "birch_standing_sign",
    "jungle_wall_sign": "jungle_standing_sign",
    "cherry_standing_sign": "cherry_sign",
    "bamboo_standing_sign": "bamboo_sign",
    "mangrove_standing_sign": "mangrove_sign",
    "cherry_wall_sign": "cherry_sign",
    "bamboo_wall_sign": "bamboo_sign",
    "mangrove_wall_sign": "mangrove_sign",
    /* CORAL */
    "tube_coral_block": "coral_block.blue",
    "dead_tube_coral_block": "coral_block.blue_dead",
    "brain_coral_block": "coral_block.pink",
    "dead_brain_coral_block": "coral_block.pink_dead",
    "bubble_coral_block": "coral_block.purple",
    "dead_bubble_coral_block": "coral_block.purple_dead",
    "fire_coral_block": "coral_block.red",
    "dead_fire_coral_block": "coral_block.red_dead",
    "horn_coral_block": "coral_block.yellow",
    "dead_horn_coral_block": "coral_block.yellow_dead",
    "tube_coral": "coral.blue",
    "dead_tube_coral": "coral.blue_dead",
    "brain_coral": "coral.pink",
    "dead_brain_coral": "coral.pink_dead",
    "bubble_coral": "coral.purple",
    "dead_bubble_coral": "coral.purple_dead",
    "fire_coral": "coral.red",
    "dead_fire_coral": "coral.red_dead",
    "horn_coral": "coral.yellow",
    "dead_horn_coral": "coral.yellow_dead",
    "tube_coral_fan": "coral.blue",
    "dead_tube_coral_fan": "coral.blue_dead",
    "brain_coral_fan": "coral.pink",
    "dead_brain_coral_fan": "coral.pink_dead",
    "bubble_coral_fan": "coral.purple",
    "dead_bubble_coral_fan": "coral.purple_dead",
    "fire_coral_fan": "coral.red",
    "dead_fire_coral_fan": "coral.red_dead",
    "horn_coral_fan": "coral.yellow",
    "dead_horn_coral_fan": "coral.yellow_dead",
    "tube_coral_wall_fan": "coral.blue",
    "dead_tube_coral_wall_fan": "coral.blue_dead",
    "brain_coral_wall_fan": "coral.pink",
    "dead_brain_coral_wall_fan": "coral.pink_dead",
    "bubble_coral_wall_fan": "coral.purple",
    "dead_bubble_coral_wall_fan": "coral.purple_dead",
    "fire_coral_wall_fan": "coral.red",
    "dead_fire_coral_wall_fan": "coral.red_dead",
    "horn_coral_wall_fan": "coral.yellow",
    "dead_horn_coral_wall_fan": "coral.yellow_dead",
    /* SHULKER BOXES */
    "undyed_shulker_box": "shulkerbox",
    "white_shulker_box": "shulkerBoxWhite",
    "light_gray_shulker_box": "shulkerBoxSilver",
    "gray_shulker_box": "shulkerBoxGray",
    "black_shulker_box": "shulkerBoxBlack",
    "brown_shulker_box": "shulkerBoxBrown",
    "red_shulker_box": "shulkerBoxRed",
    "orange_shulker_box": "shulkerBoxOrange",
    "yellow_shulker_box": "shulkerBoxYellow",
    "lime_shulker_box": "shulkerBoxLime",
    "green_shulker_box": "shulkerBoxGreen",
    "cyan_shulker_box": "shulkerBoxCyan",
    "light_blue_shulker_box": "shulkerBoxLightBlue",
    "blue_shulker_box": "shulkerBoxBlue",
    "purple_shulker_box": "shulkerBoxPurple",
    "magenta_shulker_box": "shulkerBoxMagenta",
    "pink_shulker_box": "shulkerBoxPink",
    /* PURPUR */
    "purpur_block": "purpur_block.default",
    "purpur_pillar": "purpur_block.lines",
    /* PRISMARINE */
    "dark_prismarine": "prismarine.dark",
    "prismarine": "prismarine.rough",
    "prismarine_bricks": "prismarine.bricks",
    /* QUARTZ */
    "quartz_pillar": "quartz_block.lines",
    "chiseled_quartz_block": "quartz_block.chiseled",
    "smooth_quartz": "quartz_block.smooth",
    /* SLABS */
    "purpur_slab": "stone_slab2.purpur",
    /* TERRACOTTA */
    "white_terracotta": "stained_hardened_clay.white",
    "green_terracotta": "stained_hardened_clay.green",
    "lime_terracotta": "stained_hardened_clay.lime",
    "yellow_terracotta": "stained_hardened_clay.yellow",
    "orange_terracotta": "stained_hardened_clay.orange",
    "red_terracotta": "stained_hardened_clay.red",
    "brown_terracotta": "stained_hardened_clay.brown",
    "black_terracotta": "stained_hardened_clay.black",
    "gray_terracotta": "stained_hardened_clay.gray",
    "light_gray_terracotta": "stained_hardened_clay.silver",
    "cyan_terracotta": "stained_hardened_clay.cyan",
    "light_blue_terracotta": "stained_hardened_clay.lightBlue",
    "blue_terracotta": "stained_hardened_clay.blue",
    "purple_terracotta": "stained_hardened_clay.purple",
    "magenta_terracotta": "stained_hardened_clay.magenta",
    "pink_terracotta": "stained_hardened_clay.pink",
    /* GLAZED TERRACOTTA */
    "white_glazed_terracotta": "glazedTerracotta.white",
    "green_glazed_terracotta": "glazedTerracotta.green",
    "lime_glazed_terracotta": "glazedTerracotta.lime",
    "yellow_glazed_terracotta": "glazedTerracotta.yellow",
    "orange_glazed_terracotta": "glazedTerracotta.orange",
    "red_glazed_terracotta": "glazedTerracotta.red",
    "brown_glazed_terracotta": "glazedTerracotta.brown",
    "black_glazed_terracotta": "glazedTerracotta.black",
    "gray_glazed_terracotta": "glazedTerracotta.gray",
    "silver_glazed_terracotta": "glazedTerracotta.silver",
    "cyan_glazed_terracotta": "glazedTerracotta.cyan",
    "light_blue_glazed_terracotta": "glazedTerracotta.light_blue",
    "blue_glazed_terracotta": "glazedTerracotta.blue",
    "purple_glazed_terracotta": "glazedTerracotta.purple",
    "magenta_glazed_terracotta": "glazedTerracotta.magenta",
    "pink_glazed_terracotta": "glazedTerracotta.pink",
    /* CONCRETE */
    "white_concrete": "concrete.white",
    "light_gray_concrete": "concrete.silver",
    "gray_concrete": "concrete.gray",
    "brown_concrete": "concrete.brown",
    "black_concrete": "concrete.black",
    "red_concrete": "concrete.red",
    "orange_concrete": "concrete.orange",
    "yellow_concrete": "concrete.yellow",
    "lime_concrete": "concrete.lime",
    "green_concrete": "concrete.green",
    "cyan_concrete": "concrete.cyan",
    "light_blue_concrete": "concrete.lightBlue",
    "blue_concrete": "concrete.blue",
    "purple_concrete": "concrete.purple",
    "magenta_concrete": "concrete.magenta",
    "pink_concrete": "concrete.pink",
    /* CONCRETE POWDER */
    "white_concrete_powder": "concretePowder.white",
    "light_gray_concrete_powder": "concretePowder.silver",
    "gray_concrete_powder": "concretePowder.gray",
    "brown_concrete_powder": "concretePowder.brown",
    "black_concrete_powder": "concretePowder.black",
    "red_concrete_powder": "concretePowder.red",
    "orange_concrete_powder": "concretePowder.orange",
    "yellow_concrete_powder": "concretePowder.yellow",
    "lime_concrete_powder": "concretePowder.lime",
    "green_concrete_powder": "concretePowder.green",
    "cyan_concrete_powder": "concretePowder.cyan",
    "light_blue_concrete_powder": "concretePowder.lightBlue",
    "blue_concrete_powder": "concretePowder.blue",
    "purple_concrete_powder": "concretePowder.purple",
    "magenta_concrete_powder": "concretePowder.magenta",
    "pink_concrete_powder": "concretePowder.pink",
    /* WOOL */
    "white_wool": "wool.white",
    "light_gray_wool": "wool.silver",
    "gray_wool": "wool.gray",
    "brown_wool": "wool.brown",
    "black_wool": "wool.black",
    "red_wool": "wool.red",
    "orange_wool": "wool.orange",
    "yellow_wool": "wool.yellow",
    "lime_wool": "wool.lime",
    "green_wool": "wool.green",
    "cyan_wool": "wool.cyan",
    "light_blue_wool": "wool.lightBlue",
    "blue_wool": "wool.blue",
    "purple_wool": "wool.purple",
    "magenta_wool": "wool.magenta",
    "pink_wool": "wool.pink",
    /* CARPET */
    "white_carpet": "carpet.white",
    "light_gray_carpet": "carpet.silver",
    "gray_carpet": "carpet.gray",
    "brown_carpet": "carpet.brown",
    "black_carpet": "carpet.black",
    "red_carpet": "carpet.red",
    "orange_carpet": "carpet.orange",
    "yellow_carpet": "carpet.yellow",
    "lime_carpet": "carpet.lime",
    "green_carpet": "carpet.green",
    "cyan_carpet": "carpet.cyan",
    "light_blue_carpet": "carpet.lightBlue",
    "blue_carpet": "carpet.blue",
    "purple_carpet": "carpet.purple",
    "magenta_carpet": "carpet.magenta",
    "pink_carpet": "carpet.pink",
    /* STAINED GLASS */
    "white_stained_glass": "stained_glass.white",
    "light_gray_stained_glass": "stained_glass.silver",
    "gray_stained_glass": "stained_glass.gray",
    "brown_stained_glass": "stained_glass.brown",
    "black_stained_glass": "stained_glass.black",
    "red_stained_glass": "stained_glass.red",
    "orange_stained_glass": "stained_glass.orange",
    "yellow_stained_glass": "stained_glass.yellow",
    "lime_stained_glass": "stained_glass.lime",
    "green_stained_glass": "stained_glass.green",
    "cyan_stained_glass": "stained_glass.cyan",
    "light_blue_stained_glass": "stained_glass.light_blue",
    "blue_stained_glass": "stained_glass.blue",
    "purple_stained_glass": "stained_glass.purple",
    "magenta_stained_glass": "stained_glass.magenta",
    "pink_stained_glass": "stained_glass.pink",
    /* STAINED GLASS PANES */
    "white_stained_glass_pane": "stained_glass_pane.white",
    "light_gray_stained_glass_pane": "stained_glass_pane.silver",
    "gray_stained_glass_pane": "stained_glass_pane.gray",
    "brown_stained_glass_pane": "stained_glass_pane.brown",
    "black_stained_glass_pane": "stained_glass_pane.black",
    "red_stained_glass_pane": "stained_glass_pane.red",
    "orange_stained_glass_pane": "stained_glass_pane.orange",
    "yellow_stained_glass_pane": "stained_glass_pane.yellow",
    "lime_stained_glass_pane": "stained_glass_pane.lime",
    "green_stained_glass_pane": "stained_glass_pane.green",
    "cyan_stained_glass_pane": "stained_glass_pane.cyan",
    "light_blue_stained_glass_pane": "stained_glass_pane.light_blue",
    "blue_stained_glass_pane": "stained_glass_pane.blue",
    "purple_stained_glass_pane": "stained_glass_pane.purple",
    "magenta_stained_glass_pane": "stained_glass_pane.magenta",
    "pink_stained_glass_pane": "stained_glass_pane.pink",
    /* MISCELLANEOUS */
    "trip_wire": "tripwire",
    "sponge": "sponge.dry",
    "wet_sponge": "sponge.wet",
    "unpowered_repeater": "repeater",
    "powered_repeater": "repeater",
    "brown_mushroom_block": "brown_mushroom_block.cap",
    "bamboo_sapling": "bamboo",
    "seagrass": "seagrass.seagrass",
    "red_sand": "sand.red",
    "coarse_dirt": "dirt.coarse",
    "piston_arm_collision": "piston",
    "sticky_piston_arm_collision": "sticky_piston",
    "unpowered_comparator": "comparator",
    "powered_comparator": "comparator",
    "skull": "skull.char",
    "sea_lantern": "sealantern",
    "lit_redstone_lamp": "redstone_lamp",
    "chipped_anvil": "anvil.slightlyDamaged",
    "damaged_anvil": "anvil.veryDamaged",
    "lit_furnace": "furnace",
    "lit_blast_furnace": "blast_furnace",
    "lit_smoker": "smoker"
};
const BlockPrefixes = {
    "cherry_standing_sign": "item",
    "bamboo_standing_sign": "item",
    "mangrove_standing_sign": "item",
    "cherry_wall_sign": "item",
    "bamboo_wall_sign": "item",
    "mangrove_wall_sign": "item",
    "wheat": "item",
    "pitcher_crop": "item",
    "melon_stem": "item",
    "unpowered_repeater": "item",
    "powered_repeater": "item",
    "kelp": "item",
    "unpowered_comparator": "item",
    "powered_comparator": "item",
    "skull": "item",
    "flower_pot": "item",
    "glow_frame": "item",
    "frame": "item",
    "brewing_stand": "item",
    /* DOORS */
    "wooden_door": "item",
    "spruce_door": "item",
    "jungle_door": "item",
    "acacia_door": "item",
    "birch_door": "item",
    "dark_oak_door": "item",
    "cherry_door": "item",
    "bamboo_door": "item",
    "mangrove_door": "item",
    /* HANGING SIGNS */
    "oak_hanging_sign": "item",
    "birch_hanging_sign": "item",
    "spruce_hanging_sign": "item",
    "acacia_hanging_sign": "item",
    "dark_oak_hanging_sign": "item",
    "mangrove_hanging_sign": "item",
    "cherry_hanging_sign": "item",
    "bamboo_hanging_sign": "item",
    "jungle_hanging_sign": "item",
    "warped_hanging_sign": "item",
    "crimson_hanging_sign": "item"
};
function getBlockMessage(block) {
    let text = [];
    const split = block.typeId.split(":");
    //@ts-ignore
    let splitId = split[1];
    splitId = splitId.replace("double_slab", "slab");
    text.push({ rawtext: [{ translate: `${block.typeId.startsWith("minecraft:") ? BlockPrefixes[splitId] ? BlockPrefixes[splitId] : "tile" : "tile"}.${block.typeId.startsWith("minecraft:") ? BlockNames[splitId] ? BlockNames[splitId] : splitId : block.typeId}.name` }] });
    text.push(`\n§9@${toWord(split[0].split("_"))}§r`);
    const states = block.permutation.getAllStates();
    if (!Object.keys(states)[0])
        return text;
    text.push("\n----------");
    for (const state in states) {
        text.push(`\n${state.includes(":") ? toWord(state.split(":")[1].split("_")) : toWord(state.split("_"))}: ${states[state]}`);
    }
    return text;
}
function roundUp(number) {
    if (Math.floor(number) == number) {
        return number;
    }
    else
        return (Math.floor(number + 1));
}
function getHealthEmojis(current, max) {
    let hearts = "";
    let currentHealth = roundUp(current);
    let addToEnd = undefined;
    if (max > 100 && currentHealth > 100)
        return `§c${currentHealth}§f/§c${max}${Emojis.HeartFull}`;
    if (max > 100 && currentHealth <= 100)
        max = 100;
    while (currentHealth > 0) {
        if (Math.floor(currentHealth / 2) * 2 == currentHealth) {
            hearts = hearts + Emojis.HeartFull;
        }
        else
            addToEnd = Emojis.HeartHalf;
        Math.floor(currentHealth / 2) * 2 == currentHealth ? currentHealth -= 2 : currentHealth -= 1;
    }
    if (addToEnd)
        hearts += addToEnd;
    let lostHealth = Math.floor(max - current);
    while (lostHealth > 0) {
        if (Math.floor(lostHealth / 2) * 2 == lostHealth) {
            hearts = hearts + Emojis.HeartEmpty;
        }
        else if (Math.floor(max / 2) * 2 != max)
            hearts = hearts + Emojis.HeartEmpty;
        Math.floor(lostHealth / 2) * 2 == lostHealth ? lostHealth -= 2 : lostHealth -= 1;
    }
    let indents = [];
    for (let i = 0; i < hearts.length; i++) {
        if (i === 0)
            continue;
        if (Math.floor(i / 10) * 10 != i)
            continue;
        indents.push(i);
    }
    if (!indents[0])
        return hearts;
    for (let i = 0; i < indents.length; i++) {
        const indent = indents[i];
        hearts = hearts.slice(0, indent + i) + "\n" + hearts.slice(indent + i, hearts.length);
    }
    return hearts;
}
function getEntityMessage(entity) {
    let text = [];
    const split = entity.typeId.split(":");
    text.push(!entity.nameTag ? { rawtext: [{ translate: `entity.${entity.typeId.startsWith("minecraft:") ? split[1] : entity.typeId}.name` }] } : entity.nameTag);
    text.push(`\n§9@${toWord(split[0].split("_"))}§r`);
    const healthComp = entity.getComponent(EntityHealthComponent.componentId);
    if (!healthComp)
        return text;
    text.push(`\n${getHealthEmojis(healthComp.currentValue, healthComp.effectiveMax)}`);
    return text;
}
system.runInterval(() => {
    for (const player of world.getAllPlayers()) {
        const entityRaycast = player.getEntitiesFromViewDirection({ maxDistance: 7 });
        if (entityRaycast[0]) {
            player.onScreenDisplay.setActionBar(getEntityMessage(entityRaycast[0].entity));
            continue;
        }
        const blockRaycast = player.getBlockFromViewDirection({ maxDistance: 7, includeLiquidBlocks: false });
        if (!blockRaycast)
            continue;
        player.onScreenDisplay.setActionBar(getBlockMessage(blockRaycast.block));
    }
}, 2);
world.afterEvents.entityHitEntity.subscribe((data) => {
    if (data.damagingEntity.typeId != "minecraft:player")
        return;
    data.damagingEntity.onScreenDisplay.setActionBar(getEntityMessage(data.hitEntity));
});
