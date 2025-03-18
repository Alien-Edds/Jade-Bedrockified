import { EntityHealthComponent, system, world } from "@minecraft/server";
import { BlockNames, BlockPrefixes } from "./const";
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
    for (let i = 0; i < Object.keys(states).length; i++) {
        const state = Object.keys(states)[i];
        if (i === 3)
            text.push(` & ${Object.keys(states).length - 3} more rows...`);
        if (i < 3)
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
