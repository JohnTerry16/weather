import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

import './list.css';

const List = () => {
	const [reports, setReports] = useState([]);

	const getCachedReports = () => {
		const cachedReports = localStorage.getItem('lastWeatherReports');
		if (cachedReports) {
			setReports(JSON.parse(cachedReports));

			return true;
		}
		return false;
	};

	const getLastReports = async () => {
		try {
			const response = await axios.get(`https://weather-m0vk.onrender.com/weather/last-reports`);
			setReports(response.data);

			localStorage.setItem('lastWeatherReports', JSON.stringify(response.data));
		} catch (error) {
			console.error('Error fetching last weather reports', error);
		}
	};

	useEffect(() => {
		if (!getCachedReports()) {
			getLastReports();
		}
	}, []);

	return (
		<section className='list'>
			<motion.div
				className="list__inner"
				initial={{ opacity: 0, x: '-200px' }}
				animate={{ opacity: 1, x: 0 }}
				exit={{ opacity: 0, x: '-200px' }}
				transition={{ duration: 0.3 }}
			>
				<div className="list__header">
					<Link to="/" className='back__link'>
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
							<path d="M19 11H7.83005L12.71 6.12001C13.1 5.73001 13.1 5.09001 12.71 4.70001C12.6175 4.6073 12.5076 4.53375 12.3867 4.48357C12.2657 4.43339 12.136 4.40756 12.005 4.40756C11.8741 4.40756 11.7444 4.43339 11.6234 4.48357C11.5024 4.53375 11.3926 4.6073 11.3 4.70001L4.71005 11.29C4.61734 11.3825 4.5438 11.4924 4.49361 11.6134C4.44343 11.7344 4.4176 11.864 4.4176 11.995C4.4176 12.126 4.44343 12.2557 4.49361 12.3766C4.5438 12.4976 4.61734 12.6075 4.71005 12.7L11.3 19.29C11.3926 19.3826 11.5025 19.456 11.6235 19.5061C11.7445 19.5562 11.8741 19.582 12.005 19.582C12.136 19.582 12.2656 19.5562 12.3866 19.5061C12.5076 19.456 12.6175 19.3826 12.71 19.29C12.8026 19.1974 12.8761 19.0875 12.9262 18.9665C12.9763 18.8456 13.0021 18.7159 13.0021 18.585C13.0021 18.4541 12.9763 18.3244 12.9262 18.2035C12.8761 18.0825 12.8026 17.9726 12.71 17.88L7.83005 13H19C19.55 13 20 12.55 20 12C20 11.45 19.55 11 19 11Z" fill="#1C242B" />
						</svg>
					</Link>
					<h2 className='list__title'>Weather history</h2>
				</div>

				{reports.length ? (
					<ul className='list__wrapper'>
						{reports.map(report => (
							<li key={report.timestamp} className='list__item'>
								<div className="list__item--left">
									<p className='list__item--city'>
										{report.city}
									</p>
									<p className="list__item--descr">
										{report.description.charAt(0).toUpperCase() + report.description.slice(1)}
									</p>
								</div>
								<div className="list__item--right">
									<p className="list__item--temp">
										{Math.floor(report.temperature)}°
									</p>
									<img className='list__item--icon' src={`/${report.icon}.svg`} alt={report.description} />
								</div>
							</li>
						))}
					</ul>
				) : (
					<p className='no-weather'>
						Your request history is empty, make a weather request and your most recent requests will be displayed here
					</p>
				)}

			</motion.div>
		</section>
	);
};

export default List;