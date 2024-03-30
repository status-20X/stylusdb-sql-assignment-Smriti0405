const parseQuery = require('./queryParser');
const readCSV = require('./csvReader');

// async function executeSELECTQuery(query) {
//     const { fields, table } = parseQuery(query);
//     const data = await readCSV(`${table}.csv`);
    
//     // Filter the fields based on the query
//     return data.map(row => {
//         const filteredRow = {};
//         fields.forEach(field => {
//             filteredRow[field] = row[field];
//         });
//         return filteredRow;
//     });
// }


// Catching error if  file not found or invalid CSV format

async function executeSELECTQuery(query) {
    try {
        const { fields, table } = parseQuery(query);
        const data = await readCSV(`${table}.csv`);
        
        // Filter the fields based on the query
        return data.map(row => {
            const filteredRow = {};
            fields.forEach(field => {
                filteredRow[field] = row[field];
            });
            return filteredRow;
        });
    } catch (error) {
        // Handle file not found error
        if (error.code === 'ENOENT') {
            return Promise.reject(`File ${table}.csv not found.`);
        }
        // Handle other errors
        return Promise.reject(error.message);
    }
}

module.exports = executeSELECTQuery;

