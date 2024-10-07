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
    "tall_grass": "tallgrass.grass",
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
    /* LEAVES */
    "oak_leaves": "leaves.oak",
    /* STONE */
    "granite": "stone.granite",
    "andesite": "stone.andesite",
    "diorite": "stone.diorite",
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
    "mangrove_wall_sign": "mangrove_sign"
};
const BlockPrefixes = {
    "cherry_standing_sign": "item",
    "bamboo_standing_sign": "item",
    "mangrove_standing_sign": "item",
    "cherry_wall_sign": "item",
    "bamboo_wall_sign": "item",
    "mangrove_wall_sign": "item"
};
function getBlockMessage(block) {
    let text = [];
    //@ts-ignore
    let splitId = block.typeId.split(":")[1];
    text.push({ rawtext: [{ translate: `${block.typeId.startsWith("minecraft:") ? BlockPrefixes[splitId] ? BlockPrefixes[splitId] : "tile" : "tile"}.${block.typeId.startsWith("minecraft:") ? BlockNames[splitId] ? BlockNames[splitId] : splitId : block.typeId}.name` }] });
    const states = block.permutation.getAllStates();
    if (!Object.keys(states)[0])
        return text;
    text.push("\n\nStates\n----------");
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
    text.push({ rawtext: [{ translate: `entity.${entity.typeId.startsWith("minecraft:") ? entity.typeId.split(":")[1] : entity.typeId}.name` }] });
    const healthComp = entity.getComponent(EntityHealthComponent.componentId);
    if (!healthComp)
        return text;
    text.push(`\n${getHealthEmojis(healthComp.currentValue, healthComp.effectiveMax)}`);
    return text;
}
system.runInterval(() => {
    for (const player of world.getAllPlayers()) {
        const entityRaycast = player.getEntitiesFromViewDirection({ maxDistance: 8 });
        if (entityRaycast[0]) {
            player.onScreenDisplay.setActionBar(getEntityMessage(entityRaycast[0].entity));
            continue;
        }
        const blockRaycast = player.getBlockFromViewDirection({ maxDistance: 8, includeLiquidBlocks: false });
        if (!blockRaycast)
            continue;
        player.onScreenDisplay.setActionBar(getBlockMessage(blockRaycast.block));
    }
}, 2);
