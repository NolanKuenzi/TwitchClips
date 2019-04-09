export default {
  get: () => {
    return Promise.resolve({
      data: {
        data: [
          {
            /* <displayClips /> component data */
            embed_url: 'https://clips.twitch.tv/clip1',
            title: 'Clip 1',
            creator_name: 'Clip Creator 1',
            broadcaster_name: 'Broadcaster 1',
            view_count: 37058,
            game_id: '33214',
            userId: '8967872',
            /* <topGames /> component data */
            name: 'Fortnite',
            id: '33214',
            box_art_url: 'https://box_art.twitch.tv/box_art_1',
            index: 1,
            /* <broadcasterInfo /> component data */
            broadcaster_type: 'partner',
            description: 'description 1',
            profile_image_url: 'https://user_prof_img_1.twitch.tv/',
            //  view_count: 60560, Above viewCount will suffice for testing purposes.
          },
          {
            /* <displayClips /> component data */
            embed_url: 'https://clips.twitch.tv/clip2',
            title: 'Clip 2',
            creator_name: 'Clip Creator 2',
            broadcaster_name: 'Broadcaster 2',
            view_count: 34662,
            game_id: '511224',
            userId: '1493693',
            /* <topGames /> component data */
            name: 'Apex Legends',
            id: '511224',
            box_art_url: 'https://box_art.twitch.tv/box_art_2',
            index: 2,
            /* <broadcasterInfo /> component data */
            broadcaster_type: 'affiliate',
            description: 'description 2',
            profile_image_url: 'https://user_prof_img_2.twitch.tv/',
            // View_count: 54560, Above viewCount will suffice for testing purposes.
          },
        ],
      },
    });
  },
};
