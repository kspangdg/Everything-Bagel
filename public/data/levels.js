
const levels =[
    // {
    //     title:"Level 1",
    //     slug:"level_1",
    //     id:1,
    //     code:{x:1, y:1, z:1},
    //     darkness: false,
    //     noises: false,
    //     music: {path:'public/assets/audio/elevator_bg.mp3', volume: 0.5, loop: true},
    //     scenes: [
    //         {
    //             id: 1,
    //             background: "public/assets/images/level_1/scene_1.png",
    //             click_zones: [
    //                 {x:50, y:51, width:40, height:40, image_src:'', actions: {play_sound:'public/assets/audio/elevator_bg.mp3', scene_change: 2}},
    //             ]
    //         },
    //         {
    //             id: 2,
    //             background: "public/assets/images/level_1/scene_2.png",
    //             click_zones: [
    //                 {x:60, y:61, width:50, height:50, image_src:'', actions: {scene_change: 1}},
    //             ]
    //         }
    //     ]
    // },
    {
        title:"The Tunnel",
        slug:"the_tunnel",
        id:1, // UPDATE!!!!
        code:{x:3, y:1, z:2},
        darkness: true,
        noises: true,
        music: {path:'public/assets/audio/the_tunnel/bg.mp3', volume: 0.1, loop: true},
        scenes: [
            {
                id: 1,
                background: "public/assets/images/the_tunnel/scene_1.png",
                click_zones: [
                    {x:180, y:526, width:650, height:50, image_src:'', actions: {level_change: 0}},
                    {x:620, y:240, width:40, height:170, image_src:'', actions: {scene_change: 2}}
                ]
            },
            {
                id: 2,
                background: "public/assets/images/the_tunnel/scene_2.png",
                click_zones: [
                    {x:305, y:536, width:400, height:40, image_src:'', actions: {scene_change: 1}},
                    {x:620, y:240, width:30, height:35, image_src:'public/assets/images/the_tunnel/note_1.png', actions: {add_note: 'public/assets/images/notes/note_the_tunnel_1.png'}},
                    {x:500, y:350, width:30, height:140, image_src:'public/assets/images/items/item_1_cz.png', actions: {add_item: 1}}
                ]
            }
        ]
    }
]
