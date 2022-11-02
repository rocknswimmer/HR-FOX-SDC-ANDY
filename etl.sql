COPY questions(id, product_id, body, date_written, asker_name, asker_email, reported, helpful)
FROM '/Users/andy/Desktop/Documents/HackReactor/SDC/HR-FOX-SDC-ANDY/data/questions.csv'
DELIMITER ','
CSV HEADER;

COPY answers(id, question_id, body, date_written, answerer_name, answerer_email, reported, helpful)
FROM '/Users/andy/Desktop/Documents/HackReactor/SDC/HR-FOX-SDC-ANDY/data/answers.csv'
DELIMITER ','
CSV HEADER;

COPY photos(id, answer_id, url)
FROM '/Users/andy/Desktop/Documents/HackReactor/SDC/HR-FOX-SDC-ANDY/data/answers_photos.csv'
DELIMITER ','
CSV HEADER;