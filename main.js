const { Actor } = require('apify');
const axios = require('axios');

Actor.main(async () => {
    const input = await Actor.getInput();
    const { bearerToken, locationWoeid } = input;

    const response = await axios.get(
        `https://api.twitter.com/1.1/trends/place.json?id=${locationWoeid}`,
        {
            headers: {
                Authorization: `Bearer ${bearerToken}`,
            },
        }
    );

    const trends = response.data[0].trends.slice(0, 5);
    console.log('Top 5 Trends:', trends.map(t => t.name));

    await Actor.pushData(trends);
});
