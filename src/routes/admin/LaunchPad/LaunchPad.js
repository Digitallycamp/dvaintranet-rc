import React from 'react';
import VideoLaunchpad from '../../../components/VideoLaunchpad';
import { content } from '../../../utils/launchpad';
import DVABootcampLaunchpad from '../../../components/DVABootcampLaunchpad';

function LaunchPad() {
	return (
		<div>
			<DVABootcampLaunchpad />

			<VideoLaunchpad content={content} />
		</div>
	);
}

export default LaunchPad;
