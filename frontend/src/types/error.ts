export const ERROR_MESSAGES = {
  FailedCreateHero: 'Failed to create a hero',
  FailedUpdateHero: 'Failed to update a hero',
  FailedDeleteHero: 'Failed to delete a hero',
  FailedUploadHero: 'Failed to upload hero',
  FailedUploadHeroes: 'Failed to upload heroes',
  FailedDeleteImage: 'Failed to delete an image',
  HeroNotFound: 'Superhero not found',
  UnknownError: 'Unknown error',

  FormValidationNickname: 'Nickname is required',
  FormValidationRealName: 'Real name is required',
  FormValidationOriginDescription: 'Origin description is required',
  FormValidationSuperpowers: 'Superpowers are required',
  FormValidationCatchPhrase: 'Catch phrase is required',
  FormValidationImages: 'Please upload at least one image',
  FormSubmitFailed: 'Something went wrong. Please try again.',
} as const;

export type ErrorMessage = (typeof ERROR_MESSAGES)[keyof typeof ERROR_MESSAGES];
export type ErrorType = ErrorMessage | null;
