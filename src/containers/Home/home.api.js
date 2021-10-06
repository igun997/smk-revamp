import request from 'utils/request';

export function getStatisicAPI() {
  return request.get('quiz/stat');
}
