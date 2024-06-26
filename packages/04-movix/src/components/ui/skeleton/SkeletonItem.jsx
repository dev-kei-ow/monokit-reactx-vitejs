import React from 'react';

const SkeletonItem = () => (
	<div className="skeletonItem">
		<div className="posterBlock skeleton"></div>
		<div className="textBlock">
			<div className="title skeleton"></div>
			<div className="date skeleton"></div>
		</div>
	</div>
);

export default SkeletonItem;
