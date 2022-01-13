from app.forms import ReviewForm
from flask import Blueprint, request, jsonify

from app.models import Review, db

review_routes = Blueprint('review_routes', __name__)


def validation_error_messages(validation_errors):
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


# READ ONE - Review
@review_routes.route('/<int:id>/')
def review(id):
    review = Review.query.get(id)
    return review.to_dict()


# READ ALL - Query by venues = Reviews
@review_routes.route('/venues/<int:venue_id>/')
def reviews_by_venues(venue_id):
    reviews = Review.query.filter_by(venue_id=venue_id).all()
    return {review.id: review.to_dict() for review in reviews}


# READ ALL - Query by users = Reviews
@review_routes.route('/users/<int:user_id>/')
def ratings_by_users(user_id):
    reviews = Review.query.filter_by(user_id=user_id).all()
    return {review.id: review.to_dict() for review in reviews}


# UPDATE - Review
@review_routes.route('/<int:id>/', methods=['PUT'])
def review_edit(id):
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        edit_review = Review.query.get(id)
        form.populate_obj(edit_review)
        db.session.commit()
        return edit_review.to_dict()
    print("Unable to validate: ", form.errors)
    return {'errors': form.errors}


# CREATE - Review
@review_routes.route('/venues/<int:id>/', methods=['POST'])
def new_review(id):
    request_json = request.get_json()
    review = Review(
        user_id=request_json["user_id"],
        venue_id=id,
        title=request_json["title"],
        body=request_json['body'],
        rating=request_json['rating']
    )
    db.session.add(review)
    db.session.commit()
    return {'review': review.to_dict()}


# DELETE - Review
@review_routes.route('/<int:id>/', methods=['DELETE'])
def delete_review_by_id(id):
    delete_review = Review.query.get(id)
    db.session.delete(delete_review)
    db.session.commit()
    # return {'delete_review': delete_review.to_dict()}
    return "Review deleted"
