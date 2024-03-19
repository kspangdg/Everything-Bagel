
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
                ]
            },
            {
                id: 2,
                background: "public/assets/images/the_tunnel/scene_2.png",
                click_zones: [
                    {x:0, y:0, width:1, height:1, image_src:'', actions: {scene_change: 1}},
                ]
            }
        ]
    }
]
