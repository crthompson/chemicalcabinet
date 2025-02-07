import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

const schema = a.schema({
  Chemicals: a
    .model({
      id: a.id(),
      name: a.string(),
      classification: a.string(),
      course: a.json(),
      location: a.json(),
      notes: a.string(),
      required: a.boolean(),
    })
    .authorization((allow) => [allow.publicApiKey()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'apiKey',
    apiKeyAuthorizationMode: { expiresInDays: 30 }
  },
});
