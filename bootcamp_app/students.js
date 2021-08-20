const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant', 
  password: '123',
  host: 'localhost', 
  database: 'bootcampx' 
});

// retrieve arguments entered by user
const args = process.argv.slice(2, 4);
const cohortMonth = args[0];
const numOfResults = args[1];
const values = [`${cohortMonth}%`, numOfResults];
const queryString = `
SELECT students.id AS student_id, students.name AS name, cohorts.name AS cohort
FROM students
JOIN cohorts ON cohort_id = cohorts.id
WHERE cohorts.name LIKE $1
LIMIT $2;
`;
//QUERY
pool.query(queryString, values).then(res => {
  res.rows.forEach( user => {
    console.log(`${user.name} has an id of ${user.student_id} and was in the ${user.cohort} cohort.`);
  });
}).catch(err => console.error('query error', err.stack));