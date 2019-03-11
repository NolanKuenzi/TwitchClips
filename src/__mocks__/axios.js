export default {
  get: () => {
    return Promise.resolve({
      data: {
        data: [
          {
            embed_url: 'https://clips.twitch.tv/clip1',
            title: 'Clip 1',
            creator_name: 'Clip Creator 1',
            broadcaster_name: 'Broadcaster 1',
            view_count: 37058,
            game_id: '33214',
            name: 'Fortnite',
            id: '33214',
            box_art_url: 'https://box_art.twitch.tv/box_art_1',
            index: 1,
          },
          {
            embed_url: 'https://clips.twitch.tv/clip2',
            title: 'Clip 2',
            creator_name: 'Clip Creator 2',
            broadcaster_name: 'Broadcaster 2',
            view_count: 34662,
            game_id: '511224',
            name: 'Apex Legends',
            id: '511224',
            box_art_url: 'https://box_art.twitch.tv/box_art_2',
            index: 2,
          },
        ],
      },
    });
  },
};
