COPY questions(id, product_id, body, date_written, asker_name, asker_email, reported, helpful)
FROM './data/questions.csv'
DELIMETER ','
CSV HEADER;

COPY answers(id, question_id, body, date_written, answerer_name, answerer_email, reported, helpful)
FROM './data/answers.csv'
DELIMETER ','
CSV HEADER;

COPY questions(id, answer_id, url)
FROM './data/answers_photos.csv'
DELIMETER ','
CSV HEADER;