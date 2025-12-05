import { firebaseMessaging } from "../libs/firebase";

export const sendFcmMessage = async (request, response) => {
  let { token, title, body } = request.body;

  const message = {
    notification: {
      title,
      body,
    },
    token,
  };
  firebaseMessaging
    .send(message)
    .then((res) => console.log(res))
    .catch((error) => console.error(error));

  return response.status(200).send({});
};
