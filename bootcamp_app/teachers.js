const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant', 
  password: '123',
  host: 'localhost', 
  database: 'bootcampx' 
});


// retrieve arguments entered by user
const args = process.argv.slice(2);
const cohortName = args[0];
const values = [cohortName];
const queryString = `
SELECT DISTINCT teachers.name AS teacher, cohorts.name AS cohort
FROM teachers
JOIN assistance_requests ON teachers.id = teacher_id
JOIN students ON students.id = student_id
JOIN cohorts ON cohorts.id = cohort_id
WHERE cohorts.name = $1
ORDER BY teacher;
`;


//QUERY
pool.query(queryString, values).then(res => {
  res.rows.forEach(row => {
    console.log(`${row.cohort}: ${row.teacher}`);
  });
}).catch(err => console.error('query error', err.stack));
