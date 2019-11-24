import {Error} from '../modules/common/models/Error';

const errorFormater = (exception: any): Error[] => {
  const message =
    (exception.response && exception.response.data.message) ||
    exception.message ||
    '';

  return [new Error(message)];
};

export default errorFormater;
