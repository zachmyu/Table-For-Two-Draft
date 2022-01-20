from flask import Blueprint, jsonify, request
from app.models import Reservation, db, Venue
from flask_login import login_required
from app.forms import ReservationForm


reservation_routes = Blueprint('reservations', __name__)


# READ ONE - Reservation
@reservation_routes.route('/<int:id>/')
def reservation(id):
    reservation = Reservation.query.get(id)
    return reservation.to_dict()


# READ ALL: Query by Users - Reservations
@reservation_routes.route('/user/<int:user_id>/')
@login_required
def reservations_of_users(user_id):
    reservations = Reservation.query.filter_by(user_id=user_id).all()
    return {reservation.id: reservation.to_dict() for reservation in reservations}


# CREATE - Reservation
@reservation_routes.route('/create/', methods=['POST'])
@login_required
def new_Reservation():
    request_json = request.get_json()
    reservation = Reservation(
        user_id=request_json['user_id'],
        venue_id=request_json['venue_id'],
        reservation_datetime=request_json['reservation_datetime'],
        party_size=request_json['party_size'],
        duration=request_json['duration']
    )
    db.session.add(reservation)
    db.session.commit()
    return {'reservation': reservation.to_dict()}


# UPDATE - Reservation
@reservation_routes.route('/<int:id>/', methods=['PUT'])
@login_required
def reservation_edit(id):
    form = ReservationForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        reservation_to_edit = Reservation.query.get(id)
        form.populate_obj(reservation_to_edit)
        db.session.commit()
        return reservation_to_edit.to_dict()
    print("Unable to validate: ", form.errors)
    return {'errors': form.errors}


# DELETE - Reservation
@reservation_routes.route('/<int:id>/', methods=['DELETE'])
@login_required
def reservation_delete(id):
    delete_reservation = Reservation.query.get(id)
    db.session.delete(delete_reservation)
    db.session.commit()
    return "Reservation Deleted"
