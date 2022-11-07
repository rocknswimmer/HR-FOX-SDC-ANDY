import http from 'k6/http';
import { sleep, check, group } from 'k6';

export const options = {
  vus: 10,
  duration: '13s'
};

const questions = `http://localhost:3003/qa/questions/?product_id=${1}`;
const answers = `http://localhost:3003/qa/questions/${2}/answers`;
const questionsHelp = `http://localhost:3003/qa/questions/3/helpful`;
const questionsReport = `http://localhost:3003/qa/questions/2/report`;
const answersHelp = `http://localhost:3003/qa/answers/75/helpful`;
const answersReport = `http://localhost:3003/qa/answers/84/report`;
const questionsPost = `http://localhost:3003/qa/questions/`;
const answersPost = `http://localhost:3003/qa/questions/3/answers`;


export default function test() {
  group('getQuestions', () => {
    const questionsResponse = http.get(questions);
    check(questionsResponse, {
      'transaction time < 10ms': (r) => r.timings.duration < 10,
      'transaction time < 50ms': (r) => r.timings.duration < 50,
      'transaction time < 100ms': (r) => r.timings.duration < 100,
      'transaction time < 200ms': (r) => r.timings.duration < 200,
      'transaction time < 500ms': (r) => r.timings.duration < 500,
      'transaction time < 1000ms': (r) => r.timings.duration < 1000,
      'transaction time < 2000ms': (r) => r.timings.duration < 2000,
      'transaction time < 5000ms': (r) => r.timings.duration < 5000,
      'transaction time < 10s': (r) => r.timings.duration < 10000,
      'transaction time < 20s': (r) => r.timings.duration < 20000,
    });
  });
  group('getAnswers', () => {
    const answersResponse = http.get(answers);
    check(answersResponse, {
      'transaction time < 10ms': (r) => r.timings.duration < 10,
      'transaction time < 50ms': (r) => r.timings.duration < 50,
      'transaction time < 100ms': (r) => r.timings.duration < 100,
      'transaction time < 200ms': (r) => r.timings.duration < 200,
      'transaction time < 500ms': (r) => r.timings.duration < 500,
      'transaction time < 1000ms': (r) => r.timings.duration < 1000,
      'transaction time < 2000ms': (r) => r.timings.duration < 2000,
      'transaction time < 5000ms': (r) => r.timings.duration < 5000,
      'transaction time < 10s': (r) => r.timings.duration < 10000,
      'transaction time < 20s': (r) => r.timings.duration < 20000,
    });
  });
  group('questionsHelpful', () => {
    const questionsHelpResponse = http.put(questionsHelp);
    check(questionsHelpResponse, {
      'transaction time < 10ms': (r) => r.timings.duration < 10,
      'transaction time < 50ms': (r) => r.timings.duration < 50,
      'transaction time < 100ms': (r) => r.timings.duration < 100,
      'transaction time < 200ms': (r) => r.timings.duration < 200,
      'transaction time < 500ms': (r) => r.timings.duration < 500,
      'transaction time < 1000ms': (r) => r.timings.duration < 1000,
      'transaction time < 2000ms': (r) => r.timings.duration < 2000,
      'transaction time < 5000ms': (r) => r.timings.duration < 5000,
      'transaction time < 10s': (r) => r.timings.duration < 10000,
      'transaction time < 20s': (r) => r.timings.duration < 20000,
    });
  });
  group('questionsReport', () => {
    const questionsReportResponse = http.put(questionsReport);
    check(questionsReportResponse, {
      'transaction time < 10ms': (r) => r.timings.duration < 10,
      'transaction time < 50ms': (r) => r.timings.duration < 50,
      'transaction time < 100ms': (r) => r.timings.duration < 100,
      'transaction time < 200ms': (r) => r.timings.duration < 200,
      'transaction time < 500ms': (r) => r.timings.duration < 500,
      'transaction time < 1000ms': (r) => r.timings.duration < 1000,
      'transaction time < 2000ms': (r) => r.timings.duration < 2000,
      'transaction time < 5000ms': (r) => r.timings.duration < 5000,
      'transaction time < 10s': (r) => r.timings.duration < 10000,
      'transaction time < 20s': (r) => r.timings.duration < 20000,
    });
  });
  group('answerssHelpful', () => {
    const answersHelpResponse = http.put(answersHelp);
    check(answersHelpResponse, {
      'transaction time < 10ms': (r) => r.timings.duration < 10,
      'transaction time < 50ms': (r) => r.timings.duration < 50,
      'transaction time < 100ms': (r) => r.timings.duration < 100,
      'transaction time < 200ms': (r) => r.timings.duration < 200,
      'transaction time < 500ms': (r) => r.timings.duration < 500,
      'transaction time < 1000ms': (r) => r.timings.duration < 1000,
      'transaction time < 2000ms': (r) => r.timings.duration < 2000,
      'transaction time < 5000ms': (r) => r.timings.duration < 5000,
      'transaction time < 10s': (r) => r.timings.duration < 10000,
      'transaction time < 20s': (r) => r.timings.duration < 20000,
    });
  });
  group('answersReport', () => {
    const answersReportResponse = http.put(answersReport);
    check(answersReportResponse, {
      'transaction time < 10ms': (r) => r.timings.duration < 10,
      'transaction time < 50ms': (r) => r.timings.duration < 50,
      'transaction time < 100ms': (r) => r.timings.duration < 100,
      'transaction time < 200ms': (r) => r.timings.duration < 200,
      'transaction time < 500ms': (r) => r.timings.duration < 500,
      'transaction time < 1000ms': (r) => r.timings.duration < 1000,
      'transaction time < 2000ms': (r) => r.timings.duration < 2000,
      'transaction time < 5000ms': (r) => r.timings.duration < 5000,
      'transaction time < 10s': (r) => r.timings.duration < 10000,
      'transaction time < 20s': (r) => r.timings.duration < 20000,
    });
  });
  group('answersPost', () => {
    let data = {'photos': ["http://res.cloudinary.com/dqmnjwd2c/image/upload/v1666744414/bettertinycat_alwhku.jpg"], "body": 'I can add answers with photos now to db from tests', "email":'fake@test.com', "name":'and e'};
    const answersPostResponse = http.post(answersPost, data);
    check(answersPostResponse, {
      'transaction time < 10ms': (r) => r.timings.duration < 10,
      'transaction time < 50ms': (r) => r.timings.duration < 50,
      'transaction time < 100ms': (r) => r.timings.duration < 100,
      'transaction time < 200ms': (r) => r.timings.duration < 200,
      'transaction time < 500ms': (r) => r.timings.duration < 500,
      'transaction time < 1000ms': (r) => r.timings.duration < 1000,
      'transaction time < 2000ms': (r) => r.timings.duration < 2000,
      'transaction time < 5000ms': (r) => r.timings.duration < 5000,
      'transaction time < 10s': (r) => r.timings.duration < 10000,
      'transaction time < 20s': (r) => r.timings.duration < 20000,
    });
  });
  group('questionsPost', () => {
    let data = {product_id: 1, body: 'can I add to db from tests?', email:'fake@test.com', name:'and e'};
    const questionsPostResponse = http.post(questionsPost, data);
    check(questionsPostResponse, {
      'transaction time < 10ms': (r) => r.timings.duration < 10,
      'transaction time < 50ms': (r) => r.timings.duration < 50,
      'transaction time < 100ms': (r) => r.timings.duration < 100,
      'transaction time < 200ms': (r) => r.timings.duration < 200,
      'transaction time < 500ms': (r) => r.timings.duration < 500,
      'transaction time < 1000ms': (r) => r.timings.duration < 1000,
      'transaction time < 2000ms': (r) => r.timings.duration < 2000,
      'transaction time < 5000ms': (r) => r.timings.duration < 5000,
      'transaction time < 10s': (r) => r.timings.duration < 10000,
      'transaction time < 20s': (r) => r.timings.duration < 20000,
    });
  });
}