import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

const schema = a.schema({
  Chemicals: a
    .model({
      id: a.id(),
      name: a.string(),
      cas: a.string(),
      amount: a.string(),
      disposal: a.boolean(),
      classification: a.string(),
      floor: a.integer(),
      area: a.string(),
      location: a.json(),
      notes: a.string(),
      specialStorage: a.string(),
      aka: a.json(),
      required: a.boolean(),
      course: a.json()
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
