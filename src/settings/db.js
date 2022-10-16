import mysql from 'mysql';

export const db = mysql.createConnection({
    host: 'db4free.net',
    port: 3306,
    user: 'vasilyrog',
    password: 'VasilyRog1',
    database: 'expresserpaero',
})

db.connect((error) => {
    if (error) {
        console.log('Bd connection error');
    } else {
        console.log('Bd connection success');
    }
})