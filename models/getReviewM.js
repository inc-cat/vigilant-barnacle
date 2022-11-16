const db = require('../db/connection.js');

const getReviews = function () {
    const queryStr = `SELECT reviews.title, reviews.review_id, reviews.owner, reviews.category, reviews.review_img_url, reviews.created_at, reviews.votes, reviews.designer, COUNT (comments.comment_id) AS comment_count
    FROM reviews 
    LEFT JOIN comments ON reviews.review_id = comments.review_id GROUP BY
    reviews.review_id`;
    return db.query(queryStr).then(function (results) {
        return results.rows;
    });
};

const getReviewByIdentification = function (identificationDigits) {
    return db.query(`SELECT * FROM reviews WHERE review_id = ${identificationDigits}`).then(function (data) {
        return data.rows[0];
    });
};

module.exports = {
    getReviews,
    getReviewByIdentification,
};
