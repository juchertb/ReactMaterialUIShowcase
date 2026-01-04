import { faker } from "@faker-js/faker/locale/en";
import { arrayIncludes } from "@mui/x-date-pickers/internals/utils/utils";

export default (db: any) => {
  let id = 1;

  return (
    Array.from(Array(1).keys())
      .map((command: any) => {
        return {
          id: id++,
          profileInvisibleMode: faker.datatype.boolean(0.3),
          // Accounts
          accountsSlack: faker.datatype.boolean(0.7),
          accountsSpotify: faker.datatype.boolean(0.7),
          accountsAtlassian: faker.datatype.boolean(0.7),
          accountsAsana: faker.datatype.boolean(0.7), 
          // Notification Mentions
          notifMentionsEmail: faker.datatype.boolean(0.7),
          notifMentionsPush: faker.datatype.boolean(0.7),
          notifMentionsSms: faker.datatype.boolean(0.7),
          // Notification Comments
          notifCommentsEmail: faker.datatype.boolean(0.7),
          notifCommentsPush: faker.datatype.boolean(0.7),
          notifCommentsSms: faker.datatype.boolean(0.7),
          // Notification Follows
          notifFollowsEmail: faker.datatype.boolean(0.7),
          notifFollowsPush: faker.datatype.boolean(0.7),
          notifFollowsSms: faker.datatype.boolean(0.7),
          // Notification Login
          notifLoginEmail: faker.datatype.boolean(0.7),
          notifLoginPush: faker.datatype.boolean(0.7),
          notifLoginSms: faker.datatype.boolean(0.7)
        };
      }
    )
  );
};
