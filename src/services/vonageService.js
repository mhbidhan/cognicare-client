import * as config from '../config';

export async function createMeeting() {
  try {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Authorization: `Bearer ${config.TOKEN}`,
        Authorization: `Bearer ${config.VONAGE_TOKEN}`,
      },
      body: JSON.stringify({
        display_name: 'Testing Samiya',
      }),
    };

    console.log(options.headers);
    const url = 'https://api-eu.vonage.com/beta/meetings/rooms';

    const res = await fetch(url, options);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}
