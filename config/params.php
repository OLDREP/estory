<?php
if(YII_ENV_DEV){
    // development
    return [
        'adminEmail' => 'admin@example.com',
        'TWITTER_CONSUMER_KEY' => 'DIuqIlfEIKcrucTKukqVTHJb7',
        'TWITTER_CONSUMER_SECRET' => 'xx2iBp6jw79RqMgtvEJk9CzBXjdxQWfYKGTUOtVeLg11N8tvXN',
        'TWITTER_CALLBACK_URL' => 'http://local.ez.com/social/twitter/auth',
        'INSTAGRAM_CLIENT_ID' => '3bd4a779086f467da618c95fe4e54cb7',
        'INSTAGRAM_CLIENT_SECRET' => 'b3589f1b833445ba927058e3de9f8dd8',
        'INSTAGRAM_REDIRECT_URL' => 'http://local.ez.com/social/instagram/auth',  
        'GOOGLE_API_KEY' => 'AIzaSyBGzuh44Bn4bjG2Os9XXNCdS0ZeTLWs5Rg',
        'VIMEO_CLIENT_ID' => '8646411980dd25c1de04e8dd9470585ed69641d1',
        'VIMEO_CLIENT_SECRET' => 'oSVZ9cSdwgmmHJyyE7Zqy1xehRZxyI7uXX9P5Y7SNpImu5uBJnn9CBYSEBoAap9NcYAkk8pjTOOSo3+BPQnrEwcsT+SqcKAOgb8GNHbo041C/BSYpIUmxutVqk2fV1Ov',
        'VIMEO_REDIRECT_URL' => 'http://local.ez.com/social/vimeo/auth',
        'VIMEO_ACCESS_TOKEN' => '1ccfe8cd7bcedbc5e3d49576b2bbf9ff',
        'REDDIT_CLIENT_ID' => '6Sbpw4jNw_vW1A',
        'REDDIT_CLIENT_SECRET' => 'WGzY36fRC280qMue99FVjIOABYo',
        'REDDIT_REDIRECT_URL' => 'http://local.ez.com/social/reddit/auth'
    ];
}else{
    // production
    return [
        'adminEmail' => 'admin@example.com',
        'TWITTER_CONSUMER_KEY' => 'DIuqIlfEIKcrucTKukqVTHJb7',
        'TWITTER_CONSUMER_SECRET' => 'xx2iBp6jw79RqMgtvEJk9CzBXjdxQWfYKGTUOtVeLg11N8tvXN',
        'TWITTER_CALLBACK_URL' => 'http://local.ez.com/social/twitter/auth',
        'INSTAGRAM_CLIENT_ID' => '1bbdad644b5443829415d58f58b1e63c',
        'INSTAGRAM_CLIENT_SECRET' => 'c1893512b55649b8a3193f1d05aa678a',
        'INSTAGRAM_REDIRECT_URL' => 'http://ez.zhexiao.space/social/instagram/auth',  
        'GOOGLE_API_KEY' => 'AIzaSyBGzuh44Bn4bjG2Os9XXNCdS0ZeTLWs5Rg',
        'VIMEO_CLIENT_ID' => '8646411980dd25c1de04e8dd9470585ed69641d1',
        'VIMEO_CLIENT_SECRET' => 'oSVZ9cSdwgmmHJyyE7Zqy1xehRZxyI7uXX9P5Y7SNpImu5uBJnn9CBYSEBoAap9NcYAkk8pjTOOSo3+BPQnrEwcsT+SqcKAOgb8GNHbo041C/BSYpIUmxutVqk2fV1Ov',
        'VIMEO_REDIRECT_URL' => 'http://local.ez.com/social/vimeo/auth',
        'VIMEO_ACCESS_TOKEN' => '1ccfe8cd7bcedbc5e3d49576b2bbf9ff',
        'REDDIT_CLIENT_ID' => 'bg5YrO8dtlaqCw',
        'REDDIT_CLIENT_SECRET' => 'vscM52j92kQ8U-AAqOJ4WoC0QsI',
        'REDDIT_REDIRECT_URL' => 'http://ez.zhexiao.space/social/reddit/auth'
    ];
}
