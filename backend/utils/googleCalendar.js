import {google} from "googleapis";

export const createGoogleCalendarEvent = async(user, task) => {

    const oauth2Client = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET
    );

    // set user's token
    oauth2Client.setCredentials({
        access_token: user.googleAccessToken,
        refresh_token: user.googleRefreshToken,
    });

    const calendar = google.calendar({
        version: "v3",
        auth: oauth2Client,
    });

    const event = {
        summary: task.title,
        description: task.description || "",
        start: {
            dateTime: task.deadline,
            timezone: "Asia/Kolkata",
        },
        end: {
            dateTime: new Date(
                new Date(task.deadline).getTime() + 60 * 60 * 1000
            ), // 1 hr duration
            timezone: "Asia/Kolkata",
        },
    };

    const response = await calendar.events.insert({
        calendarId: "primary",
        resource: event,
    });

    return response.data;
}