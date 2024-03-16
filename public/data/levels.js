
const levels =[
    {
        name:"Level 1",
        id:1,
        code:{x:1, y:1, z:1},
        darkness: false,
        noises: false,
        music: 'public/assets/audio/level_1.mp3',
        scenes: [
            {
                id: 1,
                background: "public/assets/images/level_1/scene_1.png",
                click_zones: [
                    {x:50, y:51, width:40, height:40, image_src:'', actions: {play_sound:'public/assets/audio/l1_bg.mp3', scene_change: 2}},
                ]
            },
            {
                id: 2,
                background: "public/assets/images/level_1/scene_2.png",
                click_zones: [
                    {x:60, y:61, width:50, height:50, image_src:'', actions: {scene_change: 1}},
                ]
            }
        ]
    },
    {
        name:"Level 2",
        id:2,
        code:{x:2, y:2, z:2},
        darkness: true,
        noises: true,
        scenes: [
            {
                id: 1,
                background: "public/assets/images/level_2/scene_1.png",
                click_zones: [
                    {x:0, y:0, width:1, height:1, image_src:'', actions: {scene_change: 1}},
                ]
            },
            {
                id: 2,
                background: "public/assets/images/level_2/scene_2.png",
                click_zones: [
                    {x:0, y:0, width:1, height:1, image_src:'', actions: {scene_change: 1}},
                ]
            }
        ]
    }
]
