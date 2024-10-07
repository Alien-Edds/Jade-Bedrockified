import { Block, Entity, EntityHealthComponent, RawText, system, world } from "@minecraft/server";

world.sendMessage("§a[Bedrock Jade]§r loaded")

enum Emojis{
    HeartEmpty = "",
    HeartHalf = "",
    HeartFull = ""
}

function toWord(strings: string[]): string | undefined {
    let string: string | undefined = undefined
    for (const part of strings) {
        let restOfWord = ""
        for (let i = 0; i < part.length; i++) {
            if (i === 0) continue
            restOfWord = restOfWord + part[i]
        }
        string = (string ? string : "") + (string ? " " : "") + (part[0].toUpperCase() + restOfWord)
    }
    return string
}

const BlockNames: {[string: string]: string} = {
    /* GRASS */
    "grass_block": "grass",
    "tall_grass": "tallgrass",
    "short_grass" : "tallgrass.grass",
    /* FLOWERS */
    "poppy" : "red_flower.poppy",
    "dandelion" : "yellow_flower.dandelion",
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
}

const BlockPrefixes: {[string: string]: string} = {
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
}

function getBlockMessage(block: Block): (string | RawText)[] {
    let text: (string | RawText)[] = []
    //@ts-ignore
    let splitId = block.typeId.split(":")[1]
    splitId = splitId.replace("double_slab", "slab")
    text.push({ rawtext: [{ translate: `${block.typeId.startsWith("minecraft:") ? BlockPrefixes[splitId] ? BlockPrefixes[splitId] : "tile" : "tile"}.${ block.typeId.startsWith("minecraft:") ? BlockNames[splitId] ? BlockNames[splitId] : splitId : block.typeId}.name` }] })
    const states = block.permutation.getAllStates()
    if (!Object.keys(states)[0]) return text
    text.push("\n----------")
    for (const state in states) {
        text.push(`\n${state.includes(":") ? toWord(state.split(":")[1].split("_")) : toWord(state.split("_"))}: ${states[state]}`)
    }

    return text
}

function roundUp(number: number): number {
    if (Math.floor(number) == number) {
        return number
    } else return (Math.floor(number + 1))
}

function getHealthEmojis(current: number, max: number): string {
    let hearts: string = ""
    let currentHealth = roundUp(current)
    let addToEnd: undefined | string = undefined
    while (currentHealth > 0) {
        if (Math.floor(currentHealth / 2) * 2 == currentHealth) {
            hearts = hearts + Emojis.HeartFull
        } else addToEnd = Emojis.HeartHalf
        Math.floor(currentHealth / 2) * 2 == currentHealth ? currentHealth -= 2 : currentHealth -= 1
    }
    if (addToEnd) hearts += addToEnd
    let lostHealth = Math.floor(max - current)
    while (lostHealth > 0) {
        if (Math.floor(lostHealth / 2) * 2 == lostHealth) {
            hearts = hearts + Emojis.HeartEmpty
        } else if (Math.floor(max / 2) * 2 != max) hearts = hearts + Emojis.HeartEmpty
        Math.floor(lostHealth / 2) * 2 == lostHealth ? lostHealth -= 2 : lostHealth -= 1
    }
    let indents: number[] = []
    for (let i = 0; i < hearts.length; i++) {
        if (i === 0) continue
        if (Math.floor(i / 10) * 10 != i) continue
        indents.push(i)
    }
    if (!indents[0]) return hearts
    for (let i = 0; i < indents.length; i++) {
        const indent = indents[i]
        hearts = hearts.slice(0, indent + i) + "\n" + hearts.slice(indent + i, hearts.length)
    }
    return hearts
}

function getEntityMessage(entity: Entity): (string | RawText)[] {
    let text: (string | RawText)[] = []
    text.push(!entity.nameTag ? {rawtext: [{translate: `entity.${entity.typeId.startsWith("minecraft:") ? entity.typeId.split(":")[1] : entity.typeId}.name`}]} : entity.nameTag)
    const healthComp = entity.getComponent(EntityHealthComponent.componentId) as EntityHealthComponent | undefined
    if (!healthComp) return text
    text.push(`\n${getHealthEmojis(healthComp.currentValue, healthComp.effectiveMax)}`)
    return text
}

system.runInterval(() => {
    for (const player of world.getAllPlayers()) {
        const entityRaycast = player.getEntitiesFromViewDirection({ maxDistance: 7 })
        if (entityRaycast[0]) {
            player.onScreenDisplay.setActionBar(getEntityMessage(entityRaycast[0].entity))
            continue
        }
        const blockRaycast = player.getBlockFromViewDirection({ maxDistance: 7, includeLiquidBlocks: false })
        if (!blockRaycast) continue
        player.onScreenDisplay.setActionBar(getBlockMessage(blockRaycast.block))
    }
}, 2)