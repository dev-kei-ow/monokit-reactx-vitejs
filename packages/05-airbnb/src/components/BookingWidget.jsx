import { UserContext } from '@/UserContext';
import axios from 'axios';
import { differenceInCalendarDays } from 'date-fns';
import { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const BookingWidget = ({ place }) => {
	const [checkIn, setCheckIn] = useState('');
	const [checkOut, setCheckOut] = useState('');
	const [numberOfGuests, setNumberOfGuests] = useState(1);
	const [name, setName] = useState('');
	const [phone, setPhone] = useState('');
	const [redirect, setRedirect] = useState('');

	const { user } = useContext(UserContext);

	useEffect(() => {
		if (user) {
			setName(user.name);
		}
	}, [user]);

	let numberOfNights = 0;

	if (checkIn && checkOut) {
		numberOfNights = differenceInCalendarDays(new Date(checkIn), new Date(checkOut));
	}
	const bookThisPlace = async () => {
		const res = await axios.post('/bookings', {
			checkIn,
			checkOut,
			numberOfGuests,
			name,
			phone,
			place: place._id,
			price: numberOfNights * place.price,
		});

		const bookingId = res.data._id;
		setRedirect(`/account/bookings/${bookingId}`);
	};

	if (redirect) {
		return <Navigate to={redirect} />;
	}

	return (
		<div className="bg-white shadow p-4 rounded-2xl">
			<div className="text-2xl text-center">Price: ${place.price} / per night</div>
			<div className="border rounded-2xl mt-4">
				<div className="flex">
					<div className="py-3 px-4">
						<label>Check in: </label>
						<input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} />
					</div>
					<div className="py-3 px-4 border-l">
						<label>Check out: </label>
						<input
							type="date"
							value={checkOut}
							onChange={(e) => setCheckOut(e.target.value)}
						/>
					</div>
				</div>
				<div>
					<div className="py-3 px-4 border-t">
						<label>Number of guests: </label>
						<input
							type="number"
							value={numberOfGuests}
							onChange={(e) => setNumberOfGuests(e.target.value)}
						/>
					</div>
				</div>

				{numberOfNights > 0 && (
					<div className="py-3 px-4 border-t">
						<label>Your full name: </label>
						<input type="text" value={name} onChange={(e) => setName(e.target.value)} />
						<label>Phone number: </label>
						<input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
					</div>
				)}
			</div>
			<button className="primary mt-4" onClick={bookThisPlace}>
				Book this place
				{numberOfNights > 0 && <span> ${numberOfNights * place.price}</span>}
			</button>
		</div>
	);
};
export default BookingWidget;
