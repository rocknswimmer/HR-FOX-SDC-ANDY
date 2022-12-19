SELECT json_build_object(
  'product_id', ${req.query.product_id},
  'results',
    (SELECT json_agg( json_build_object(
      'question_id', id,
      'question_body', body,
      'question_date', TO_CHAR(TO_TIMESTAMP(date_written / 1000), 'YYYY-MM-DD"T"HH24:MI:SS"Z"'),
      'asker_name', asker_name,
      'question_helpfulness', helpful,
      'reported', reported,
      'answers', (SELECT json_object_agg(
        id, (SELECT json_build_object(
          'id', id,
          'body', body,
          'date', TO_CHAR(TO_TIMESTAMP(date_written / 1000), 'YYYY-MM-DD"T"HH24:MI:SS"Z"'),
          'answerer_name', answerer_name,
          'helpfulness', helpful,
          'photos', COALESCE(((select json_agg(url) from photos where answer_id = answers.id)), '[]'::json)
        )
        )
      ) FROM answers WHERE answers.question_id = questions.id
      )
    )
    ) FROM questions WHERE product_id = ${req.query.product_id} AND reported = false LIMIT ${count}
  )
  )