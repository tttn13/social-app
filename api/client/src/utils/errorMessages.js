const error_msg_notFound =
  'Sorry, this does not match our records. Please try again.';
const error_msg_network = 'Internal Server Error.Please try again later.';
const error_msg_userExisted = 'Email already exists';

export const get_error_message = (status) => {
  if (status === 404) return error_msg_notFound;
  if (status === 500) return error_msg_network;
  if (status === 409) return error_msg_userExisted;
};
