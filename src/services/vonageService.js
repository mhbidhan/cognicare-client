import * as config from '../config';

export async function createMeeting() {
  try {
    const tokenRes = await fetch(
      `https://1ed1-113-11-37-34.ap.ngrok.io/vonage/token`
    );
    const vonageToken = await tokenRes.json();
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Authorization: `Bearer ${config.TOKEN}`,
        Authorization: `Bearer ${vonageToken.token}`,
      },
      body: JSON.stringify({
        display_name: 'Testing CogniCare',
      }),
    };
    console.log(vonageToken.token);

    const url = 'https://api-eu.vonage.com/beta/meetings/rooms';

    const res = await fetch(url, options);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}
