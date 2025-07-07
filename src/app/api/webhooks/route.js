import { createOrUpdateUser } from "@/lib/actions/user";
import { verifyWebhook } from "@clerk/nextjs/webhooks";

export async function POST(req) {
  try {
    const evt = await verifyWebhook(req);

    // Do something with payload
    // For this guide, log payload to console
    const { id } = evt?.data;
    const eventType = evt?.type;
    console.log(
      `Received webhook with ID ${id} and event type of ${eventType}`
    );
    console.log("Webhook payload:", evt.data);

    if (evt.type === "user.created" || evt.type === "user.updated") {
      const {id, first_name, last_name, image_url, email_addresses, username} = evt?.data;
    }

    // if (evt.type === "user.updated") {
    //   console.log("userId:", evt.data.id);
    // }
    try {
      const user = await createOrUpdateUser(
        id,first_name,last_name,image_url,email_addresses,username
      )
    } catch (error) {
      
    }

    return new Response("Webhook received", { status: 200 });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error verifying webhook", { status: 400 });
  }
}
